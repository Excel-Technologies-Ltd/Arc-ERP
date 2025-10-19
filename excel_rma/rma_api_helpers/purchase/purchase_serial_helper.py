from excel_rma.rma_api_helpers.models.purchase_serial_model import (
    ItemInput,
    MongoSerialDocument,
    PurchaseReceiptData,
    PurchaseReceiptPayload,
    SerialHistoryDocument,
    ValidationInput,
)
from excel_rma.rma_api_helpers.models.validate_pydentic_model import (
    validate_pydantic_model,
)
from excel_rma.utils.constants import (
    DOCUMENT_TYPE,
    EVENT_TYPE,
    PURCHASE_SERIAL_CANCEL_BATCH_SIZE,
    PURCHASE_SERIAL_CANCEL_MAX_WORKERS,
    SERIAL_BATCH_SIZE,
)
from concurrent.futures import ThreadPoolExecutor, as_completed, Future
from typing import List, Dict, Any, Set, Tuple, Optional
import frappe
from excel_rma.utils.mongo import get_db
from pymongo.collection import Collection
from pymongo.client_session import ClientSession


def extract_serials_and_macs(
    items: List[Dict[str, Any]],
) -> Tuple[List[str], List[str]]:
    """Extract serial numbers and MAC addresses from items."""
    # Validate items structure
    try:
        validated_items = [ItemInput(**item) for item in items]
    except Exception as e:
        frappe.throw(f"Invalid item structure: {str(e)}")

    serials: List[str] = []
    macs: List[str] = []

    for item in validated_items:
        if item.has_serial_no != 1:
            continue

        for sn_obj in item.serial_with_mac:
            if sn_obj.serial_no and sn_obj.serial_no != "Non Serial Item":
                serials.append(sn_obj.serial_no)

            if sn_obj.mac_no:
                macs.append(sn_obj.mac_no)

    return serials, macs


def validate_serials_and_macs_optimized(
    serials: List[str], macs: List[str], collection: Collection
) -> None:
    """
    OPTIMIZED for 12.5M+ records using separate indexed queries with parallelism.

    Performance: ~20-50ms per batch with proper indexes

    Required MongoDB Indexes:
    - db.serial_no.createIndex({"serial_no": 1}, {unique: true})
    - db.serial_no.createIndex({"mac_no": 1}, {sparse: true})
    """
    # Validate inputs using Pydantic
    validation_input = validate_pydantic_model(
        ValidationInput,
        {"serials": serials, "macs": macs},
        "validate_serials_and_macs_optimized",
    )

    serials = validation_input.serials
    macs = validation_input.macs

    # Step 1: Fast in-memory duplicate check
    serial_seen: Set[str] = set()
    serial_input_dups: Set[str] = {
        s for s in serials if s in serial_seen or serial_seen.add(s)
    }

    mac_seen: Set[str] = set()
    mac_input_dups: Set[str] = {m for m in macs if m in mac_seen or mac_seen.add(m)}

    # Early exit if input duplicates found
    if serial_input_dups or mac_input_dups:
        _throw_validation_errors(serial_input_dups, mac_input_dups, set(), set())

    # Step 2: Check database existence using separate indexed queries
    existing_serials: Set[str] = set()
    existing_macs: Set[str] = set()

    # Process in batches with parallel queries
    for i in range(0, max(len(serials), len(macs)), SERIAL_BATCH_SIZE):
        serial_batch: List[str] = (
            serials[i : i + SERIAL_BATCH_SIZE] if i < len(serials) else []
        )
        mac_batch: List[str] = macs[i : i + SERIAL_BATCH_SIZE] if i < len(macs) else []

        if not serial_batch and not mac_batch:
            continue

        # Run separate queries in parallel for better index utilization
        batch_serials, batch_macs = _check_existence_parallel(
            collection, serial_batch, mac_batch
        )

        existing_serials.update(batch_serials)
        existing_macs.update(batch_macs)

    # Step 3: Report all duplicates
    if existing_serials or existing_macs:
        _throw_validation_errors(set(), set(), existing_serials, existing_macs)


def _check_existence_parallel(
    collection: Collection, serial_batch: List[str], mac_batch: List[str]
) -> Tuple[Set[str], Set[str]]:
    """
    Execute separate queries in parallel for optimal index usage.
    Each query uses its dedicated index for fastest performance.
    """

    if not isinstance(serial_batch, list) or not all(
        isinstance(s, str) for s in serial_batch
    ):
        frappe.throw("Type Error: 'serial_batch' must be a list of strings")

    if not isinstance(mac_batch, list) or not all(
        isinstance(m, str) for m in mac_batch
    ):
        frappe.throw("Type Error: 'mac_batch' must be a list of strings")

    existing_serials: Set[str] = set()
    existing_macs: Set[str] = set()

    with ThreadPoolExecutor(max_workers=2) as executor:
        futures: Dict[Any, str] = {}

        # Submit serial query
        if serial_batch:
            future_serial = executor.submit(_query_serials, collection, serial_batch)
            futures[future_serial] = "serial"

        # Submit MAC query
        if mac_batch:
            future_mac = executor.submit(_query_macs, collection, mac_batch)
            futures[future_mac] = "mac"

        # Collect results as they complete
        for future in as_completed(futures):
            query_type: str = futures[future]
            try:
                result: Set[str] = future.result()
                if query_type == "serial":
                    existing_serials = result
                else:
                    existing_macs = result
            except Exception as e:
                frappe.log_error(f"Query failed for {query_type}: {str(e)}")

    return existing_serials, existing_macs


def _query_serials(collection: Collection, serial_batch: List[str]) -> Set[str]:
    """Query serials using dedicated index. Uses index-only scan."""
    return {
        doc["serial_no"]
        for doc in collection.find(
            {"serial_no": {"$in": serial_batch}}, {"serial_no": 1, "_id": 0}
        ).hint([("serial_no", 1)])
    }


def _query_macs(collection: Collection, mac_batch: List[str]) -> Set[str]:
    """Query MACs using dedicated index. Uses index-only scan."""
    return {
        doc["mac_no"]
        for doc in collection.find(
            {"mac_no": {"$in": mac_batch}}, {"mac_no": 1, "_id": 0}
        ).hint([("mac_no", 1)])
    }


def _throw_validation_errors(
    input_serial_dups: Set[str],
    input_mac_dups: Set[str],
    db_serial_dups: Set[str],
    db_mac_dups: Set[str],
) -> None:
    """Throw formatted validation errors."""
    errors: List[str] = []

    if input_serial_dups:
        errors.append(
            f"Duplicate serial numbers in input: {', '.join(sorted(input_serial_dups))}"
        )

    if input_mac_dups:
        errors.append(
            f"Duplicate MAC addresses in input: {', '.join(sorted(input_mac_dups))}"
        )

    if db_serial_dups:
        errors.append(
            f"Serial numbers already exist: {', '.join(sorted(db_serial_dups))}"
        )

    if db_mac_dups:
        errors.append(f"MAC addresses already exist: {', '.join(sorted(db_mac_dups))}")

    frappe.throw("<br>".join(errors))


def build_pr_payload(
    items: List[Dict[str, Any]], pi_name: str, po_ref: str, data: Dict[str, Any]
) -> Dict[str, Any]:
    """Build Purchase Receipt payload."""
    # Validate data using Pydantic
    validated_data = validate_pydantic_model(
        PurchaseReceiptData, data, "build_pr_payload - data"
    )

    # Validate items
    try:
        validated_items = [ItemInput(**item) for item in items]
    except Exception as e:
        frappe.throw(f"Invalid items in build_pr_payload: {str(e)}")

    if not isinstance(pi_name, str) or not pi_name.strip():
        frappe.throw("Type Error: 'pi_name' must be a non-empty string")

    if not isinstance(po_ref, str) or not po_ref.strip():
        frappe.throw("Type Error: 'po_ref' must be a non-empty string")

    payload_data = {
        "doctype": "Purchase Receipt",
        "docstatus": 1,
        "items": [
            {
                **item,
                "purchase_invoice": pi_name,
                "purchase_order": po_ref,
                "serial_no": "",
            }
            for item in items
        ],
        "against_purchase_order": po_ref,
        "supplier": validated_data.supplier,
        "posting_date": validated_data.posting_date,
        "posting_time": validated_data.posting_time,
        "purchase_invoice_name": pi_name,
        "total": validated_data.total,
        "total_qty": validated_data.total_qty,
        "set_posting_time": 1,
    }

    # Validate the final payload
    validated_payload = validate_pydantic_model(
        PurchaseReceiptPayload, payload_data, "build_pr_payload - payload"
    )

    return validated_payload.dict()


def build_mongo_docs(
    items: List[Dict[str, Any]], data: Dict[str, Any]
) -> List[Dict[str, Any]]:
    """Build MongoDB documents for serial numbers."""
    # Validate data using Pydantic
    validated_data = validate_pydantic_model(
        PurchaseReceiptData, data, "build_mongo_docs - data"
    )

    # Validate items
    try:
        validated_items = [ItemInput(**item) for item in items]
    except Exception as e:
        frappe.throw(f"Invalid items in build_mongo_docs: {str(e)}")

    purchased_on: str = (
        frappe.utils.get_datetime(
            f"{validated_data.posting_date} {validated_data.posting_time}"
        ).isoformat()
        + "Z"
    )

    mongo_docs = []

    for item in validated_items:
        if item.has_serial_no != 1:
            continue

        for sn_obj in item.serial_with_mac:
            if not sn_obj.serial_no or sn_obj.serial_no == "Non Serial Item":
                continue

            doc_data = {
                "serial_no": sn_obj.serial_no,
                "mac_no": sn_obj.mac_no,
                "brand": item.brand_name,
                "item_code": item.item_code,
                "item_name": item.item_name,
                "purchase_time": validated_data.posting_time,
                "warehouse": validated_data.warehouse,
                "purchase_date": validated_data.posting_date,
                "purchase_rate": item.rate,
                "supplier": validated_data.supplier,
                "purchase_document_type": DOCUMENT_TYPE["PurchaseReceipt"],
                "purchase_invoice_name": validated_data.purchase_invoice_name,
                "warranty": {
                    "purchaseWarrantyDate": validated_data.warranty_date,
                    "purchasedOn": purchased_on,
                },
            }

            # Validate each document
            validated_doc = validate_pydantic_model(
                MongoSerialDocument,
                doc_data,
                f"build_mongo_docs - serial {sn_obj.serial_no}",
            )

            mongo_docs.append(validated_doc.dict())

    return mongo_docs


def _insert_batched(
    collection: Collection, docs: List[Dict[str, Any]], session: ClientSession
) -> int:
    """Insert documents in batches. Throws error if insert fails."""

    if not docs:
        return 0

    total: int = 0
    try:
        for i in range(0, len(docs), SERIAL_BATCH_SIZE):
            batch: List[Dict[str, Any]] = docs[i : i + SERIAL_BATCH_SIZE]
            result = collection.insert_many(batch, ordered=False, session=session)
            total += len(result.inserted_ids)

        if total != len(docs):
            frappe.throw(
                f"MongoDB insert incomplete: Expected {len(docs)}, inserted {total}"
            )

        return total

    except Exception as e:
        frappe.throw(f"Failed to save serial numbers: {str(e)}")


def execute_transaction(
    serial_coll: Collection,
    pr_payload: Dict[str, Any],
    mongo_docs: List[Dict[str, Any]],
    pi_name: str,
) -> str:
    """Execute transaction with proper rollback handling."""
    # Type validations

    if not isinstance(pi_name, str) or not pi_name.strip():
        frappe.throw("Type Error: 'pi_name' must be a non-empty string")

    session: ClientSession = serial_coll.database.client.start_session()
    pr_doc: Optional[Any] = None

    try:
        session.start_transaction()

        # Create Purchase Receipt
        pr_doc = frappe.get_doc(pr_payload)
        pr_doc.insert()

        # Add PR name to mongo documents
        for doc in mongo_docs:
            doc["purchase_document_no"] = pr_doc.name

        # Insert serials in batches
        inserted: int = 0
        if mongo_docs:
            inserted = _insert_batched(serial_coll, mongo_docs, session)

        # Commit both transactions
        session.commit_transaction()
        frappe.db.commit()

        # Update Purchase Invoice status
        _make_purchase_invoice_completed(pi_name)

        # Queue serial history creation
        frappe.enqueue(
            _create_serial_history,
            queue="long",
            mongo_docs=mongo_docs,
            pi_name=pi_name,
        )

        # Build and validate response
        response_data = {
            "success": True,
            "purchase_invoice_name": pi_name,
            "purchase_receipt_name": pr_doc.name,
            "serials_inserted": inserted,
            "message": "Purchase Receipt and serials created successfully",
        }

        return frappe.as_json(response_data)

    except Exception as e:
        if session.in_transaction:
            session.abort_transaction()
        frappe.db.rollback()

        if pr_doc and pr_doc.name:
            try:
                frappe.delete_doc("Purchase Receipt", pr_doc.name, force=True)
                frappe.db.commit()
            except:
                pass

        frappe.throw(f"Transaction failed: {str(e)}")

    finally:
        session.end_session()


def _make_purchase_invoice_completed(pi_name: str) -> None:
    """Mark Purchase Invoice as completed if all items are fully assigned."""
    if not isinstance(pi_name, str) or not pi_name.strip():
        frappe.throw("Type Error: 'pi_name' must be a non-empty string")

    from excel_rma.api.purchase.purchase_invoice import get_purchase_invoice_details

    invoice_data: Optional[Dict[str, Any]] = get_purchase_invoice_details(pi_name)

    if not invoice_data or not invoice_data.get("items"):
        return

    all_complete: bool = all(
        item.get("remaining_qty", item.get("qty")) == 0
        for item in invoice_data["items"]
    )

    if all_complete:
        frappe.db.set_value(
            "Purchase Invoice", pi_name, "custom_excel_status", "Completed"
        )
        frappe.msgprint(f"Purchase Invoice {pi_name} marked as Completed")


def _create_serial_history(mongo_docs: List[Dict[str, Any]], pi_name: str) -> None:
    """Create serial history records in MongoDB using batch processing."""

    if not mongo_docs:
        return

    mongo_db = get_db()
    serial_history_coll: Collection = mongo_db["serial_no_history"]

    # pi_doc = frappe.get_doc("Purchase Invoice", pi_name)
    current_user: str = frappe.session.user
    current_datetime: str = frappe.utils.now()

    history_docs: List[Dict[str, Any]] = []

    for doc in mongo_docs:
        history_data = {
            "eventDate": doc.get("purchase_date"),
            "eventType": EVENT_TYPE["SerialPurchased"],
            "serial_no": doc.get("serial_no"),
            "mac_no": doc.get("mac_no"),
            "brand": doc.get("brand"),
            "document_no": doc.get("purchase_document_no"),
            "transaction_from": doc.get("supplier"),
            "transaction_to": doc.get("warehouse"),
            "document_type": "Purchase Receipt",
            "parent_document": pi_name,
            "created_on": current_datetime,
            "created_by": current_user,
            "item_code": doc.get("item_code"),
            "item_name": doc.get("item_name"),
        }

        # Validate each history document
        try:
            validated_history = validate_pydantic_model(
                SerialHistoryDocument,
                history_data,
                f"_create_serial_history - serial {doc.get('serial_no')}",
            )
            history_docs.append(validated_history.dict())
        except Exception as e:
            frappe.log_error(
                f"Failed to validate history for serial {doc.get('serial_no')}: {str(e)}",
                "Serial History Validation Error",
            )
            continue

    try:
        total: int = 0
        for i in range(0, len(history_docs), SERIAL_BATCH_SIZE):
            batch: List[Dict[str, Any]] = history_docs[i : i + SERIAL_BATCH_SIZE]
            result = serial_history_coll.insert_many(batch, ordered=False)
            total += len(result.inserted_ids)

        frappe.logger().info(f"Created {total} serial history records for PI {pi_name}")

    except Exception as e:
        frappe.log_error(
            f"Failed to create serial history for {pi_name}: {str(e)}",
            "Serial History Creation Error",
        )


def validate_purchase_cancelation_serial(
    pi_name: str,
    serial_collection: Collection,
    history_collection: Collection,
    max_workers: int = PURCHASE_SERIAL_CANCEL_MAX_WORKERS,
    batch_size: int = PURCHASE_SERIAL_CANCEL_BATCH_SIZE,
) -> List[str]:
    """Validate purchase serial cancelation."""
    serials: List[str] = [
        s["serial_no"]
        for s in serial_collection.find(
            {"purchase_invoice_name": pi_name}, {"serial_no": 1, "_id": 0}
        )
    ]
    if not serials:
        return

    batches: List[List[str]] = [
        serials[i : i + batch_size] for i in range(0, len(serials), batch_size)
    ]

    def check_batch(batch: List[str]) -> List[Dict[str, Any]]:
        """Check batch of serials."""
        pipeline = [
            {"$match": {"serial_no": {"$in": batch}}},
            {"$group": {"_id": "$serial_no", "count": {"$sum": 1}}},
            {"$match": {"count": {"$gt": 1}}},
            {"$limit": 50},
        ]
        return [
            {"serial_no": r["_id"], "historyEvents": r["count"]}
            for r in history_collection.aggregate(pipeline)
        ]

    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        problems: List[Dict[str, Any]] = []
        futures: List[Future[List[Dict[str, Any]]]] = [
            executor.submit(check_batch, batch) for batch in batches
        ]

        for future in as_completed(futures):
            batch_problems: List[Dict[str, Any]] = future.result()
            problems.extend(batch_problems)
            if len(problems) >= 50:
                break

    if problems:
        msg = ", ".join(
            f"{p['serial_no']} has {p['historyEvents']}" for p in problems[:50]
        )
        frappe.throw(f"Serials with multiple events: {msg}")
