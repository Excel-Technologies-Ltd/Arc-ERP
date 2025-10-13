from excel_rma.utils.constants import DOCUMENT_TYPE, EVENT_TYPE, SERIAL_BATCH_SIZE
from excel_rma.utils.mongo import get_db
import frappe
from concurrent.futures import ThreadPoolExecutor, as_completed


@frappe.whitelist()
def assign_serial(**payload):
    """
    Assigns serial numbers to purchase invoice items and creates purchase receipt.
    Optimized for large databases (12.5M+ records).
    """
    data = frappe.parse_json(payload)

    # Extract data
    pi_name = data["purchase_invoice_name"]
    items = data["items"]

    # Connect to MongoDB
    mongo_db = get_db()
    serial_coll = mongo_db["serial_no"]

    # ===== PHASE 1: VALIDATION =====
    pi_doc = frappe.get_doc("Purchase Invoice", pi_name)
    if not pi_doc:
        frappe.throw("Purchase Invoice does not exist")

    po_ref = pi_doc.items[0].purchase_order if pi_doc.items else None
    if not po_ref:
        frappe.throw("Purchase Order not found")

    # Extract and validate serials and MACs (optimized for large DB)
    serials, macs = _extract_serials_and_macs(items)
    if serials or macs:
        _validate_serials_and_macs_optimized(serials, macs, serial_coll)

    # Prepare payloads
    pr_payload = _build_pr_payload(items, pi_name, po_ref, data)
    mongo_docs = _build_mongo_docs(items, data)

    # ===== PHASE 2: EXECUTION =====
    return _execute_transaction(serial_coll, pr_payload, mongo_docs, pi_name)


def _extract_serials_and_macs(items):
    """Extract serial numbers and MAC addresses from items."""
    serials = []
    macs = []

    for item in items:
        if item.get("has_serial_no") != 1:
            continue

        for sn_obj in item.get("serial_with_mac", []):
            serial = sn_obj.get("serial_no", "").strip()
            if serial and serial != "Non Serial Item":
                serials.append(serial)

            mac = sn_obj.get("mac_no", "").strip()
            if mac:
                macs.append(mac)

    return serials, macs


def _validate_serials_and_macs_optimized(serials, macs, collection):
    """
    OPTIMIZED for 12.5M+ records using separate indexed queries with parallelism.

    Performance: ~20-50ms per batch with proper indexes

    Required MongoDB Indexes:
    - db.serial_no.createIndex({"serial_no": 1}, {unique: true})
    - db.serial_no.createIndex({"mac_no": 1}, {sparse: true})
    """

    # Step 1: Fast in-memory duplicate check
    serial_seen = set()
    serial_input_dups = {s for s in serials if s in serial_seen or serial_seen.add(s)}

    mac_seen = set()
    mac_input_dups = {m for m in macs if m in mac_seen or mac_seen.add(m)}

    # Early exit if input duplicates found
    if serial_input_dups or mac_input_dups:
        _throw_validation_errors(serial_input_dups, mac_input_dups, set(), set())

    # Step 2: Check database existence using separate indexed queries
    existing_serials = set()
    existing_macs = set()

    # Process in batches with parallel queries
    for i in range(0, max(len(serials), len(macs)), SERIAL_BATCH_SIZE):
        serial_batch = serials[i : i + SERIAL_BATCH_SIZE] if i < len(serials) else []
        mac_batch = macs[i : i + SERIAL_BATCH_SIZE] if i < len(macs) else []

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


def _check_existence_parallel(collection, serial_batch, mac_batch):
    """
    Execute separate queries in parallel for optimal index usage.
    Each query uses its dedicated index for fastest performance.
    """
    existing_serials = set()
    existing_macs = set()

    with ThreadPoolExecutor(max_workers=2) as executor:
        futures = {}

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
            query_type = futures[future]
            try:
                result = future.result()
                if query_type == "serial":
                    existing_serials = result
                else:
                    existing_macs = result
            except Exception as e:
                frappe.log_error(f"Query failed for {query_type}: {str(e)}")

    return existing_serials, existing_macs


def _query_serials(collection, serial_batch):
    """Query serials using dedicated index. Uses index-only scan."""
    return {
        doc["serial_no"]
        for doc in collection.find(
            {"serial_no": {"$in": serial_batch}}, {"serial_no": 1, "_id": 0}
        ).hint(
            [("serial_no", 1)]
        )  # Force index usage
    }


def _query_macs(collection, mac_batch):
    """Query MACs using dedicated index. Uses index-only scan."""
    return {
        doc["mac_no"]
        for doc in collection.find(
            {"mac_no": {"$in": mac_batch}}, {"mac_no": 1, "_id": 0}
        ).hint(
            [("mac_no", 1)]
        )  # Force index usage
    }


def _throw_validation_errors(
    input_serial_dups, input_mac_dups, db_serial_dups, db_mac_dups
):
    """Throw formatted validation errors."""
    errors = []

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


def _build_pr_payload(items, pi_name, po_ref, data):
    """Build Purchase Receipt payload."""
    return {
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
        "supplier": data["supplier"],
        "posting_date": data["posting_date"],
        "posting_time": data["posting_time"],
        "purchase_invoice_name": pi_name,
        "total": data["total"],
        "total_qty": data["total_qty"],
        "set_posting_time": 1,
    }


def _build_mongo_docs(items, data):
    """Build MongoDB documents for serial numbers."""
    purchased_on = (
        frappe.utils.get_datetime(
            f"{data['posting_date']} {data['posting_time']}"
        ).isoformat()
        + "Z"
    )

    return [
        {
            "serial_no": sn_obj.get("serial_no").strip(),
            "mac_no": sn_obj.get("mac_no", "").strip() or None,
            "brand": item.get("brand_name", None),
            "item_code": item.get("item_code"),
            "item_name": item.get("item_name"),
            "purchase_time": data["posting_time"],
            "warehouse": data["warehouse"],
            "purchase_date": data["posting_date"],
            "purchase_rate": item.get("rate"),
            "supplier": data["supplier"],
            "purchase_document_type": DOCUMENT_TYPE["PurchaseReceipt"],
            "purchase_invoice_name": data["purchase_invoice_name"],
            "warranty": {
                "purchaseWarrantyDate": data["warranty_date"],
                "purchasedOn": purchased_on,
            },
        }
        for item in items
        if item.get("has_serial_no") == 1
        for sn_obj in item.get("serial_with_mac", [])
        if sn_obj.get("serial_no")
        and sn_obj.get("serial_no").strip()
        and sn_obj.get("serial_no").strip() != "Non Serial Item"
    ]


def _insert_batched(collection, docs, session):
    """Insert documents in batches. Throws error if insert fails."""
    if not docs:
        return 0

    total = 0
    try:
        for i in range(0, len(docs), SERIAL_BATCH_SIZE):
            batch = docs[i : i + SERIAL_BATCH_SIZE]
            result = collection.insert_many(batch, ordered=False, session=session)
            total += len(result.inserted_ids)

        if total != len(docs):
            frappe.throw(
                f"MongoDB insert incomplete: Expected {len(docs)}, inserted {total}"
            )

        return total

    except Exception as e:
        frappe.throw(f"Failed to save serial numbers: {str(e)}")


def _execute_transaction(serial_coll, pr_payload, mongo_docs, pi_name):
    """Execute transaction with proper rollback handling."""
    session = serial_coll.database.client.start_session()
    pr_doc = None

    try:
        session.start_transaction()

        # Create Purchase Receipt
        pr_doc = frappe.get_doc(pr_payload)
        pr_doc.insert()

        # Add PR name to mongo documents
        for doc in mongo_docs:
            doc["purchase_document_no"] = pr_doc.name

        # Insert serials in batches
        inserted = 0
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

        return frappe.as_json(
            {
                "success": True,
                "purchase_invoice_name": pi_name,
                "purchase_receipt_name": pr_doc.name,
                "serials_inserted": inserted,
                "message": "Purchase Receipt and serials created successfully",
            }
        )

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


def _make_purchase_invoice_completed(pi_name):
    """Mark Purchase Invoice as completed if all items are fully assigned."""
    from excel_rma.api.purchase.purchase_invoice import get_purchase_invoice_details

    invoice_data = get_purchase_invoice_details(pi_name)

    if not invoice_data or not invoice_data.get("items"):
        return

    all_complete = all(
        item.get("remaining_qty", item.get("qty")) == 0
        for item in invoice_data["items"]
    )

    if all_complete:
        frappe.db.set_value(
            "Purchase Invoice", pi_name, "custom_excel_status", "Completed"
        )
        frappe.msgprint(f"Purchase Invoice {pi_name} marked as Completed")


def _create_serial_history(mongo_docs, pi_name):
    """Create serial history records in MongoDB using batch processing."""
    if not mongo_docs:
        return

    mongo_db = get_db()
    serial_history_coll = mongo_db["serial_no_history"]

    pi_doc = frappe.get_doc("Purchase Invoice", pi_name)
    current_user = frappe.session.user
    current_datetime = frappe.utils.now()

    history_docs = [
        {
            "eventDate": current_datetime,
            "eventType": EVENT_TYPE["SerialPurchased"],
            "serial_no": doc.get("serial_no"),
            "mac_no": doc.get("mac_no"),
            "brand": doc.get("brand"),
            "document_no": pi_doc.name,
            "transaction_from": pi_doc.supplier,
            "transaction_to": doc.get("warehouse"),
            "document_type": "Purchase Receipt",
            "parent_document": pi_name,
            "created_on": current_datetime,
            "created_by": current_user,
            "item_code": doc.get("item_code"),
            "item_name": doc.get("item_name"),
        }
        for doc in mongo_docs
    ]

    try:
        total = 0
        for i in range(0, len(history_docs), SERIAL_BATCH_SIZE):
            batch = history_docs[i : i + SERIAL_BATCH_SIZE]
            result = serial_history_coll.insert_many(batch, ordered=False)
            total += len(result.inserted_ids)

        frappe.logger().info(f"Created {total} serial history records for PI {pi_name}")

    except Exception as e:
        frappe.log_error(
            f"Failed to create serial history for {pi_name}: {str(e)}",
            "Serial History Creation Error",
        )


# TODO Wok in later
# @frappe.whitelist()
# def cancel_purchase_serial():
#     return frappe.as_json({"success": True, "message": "Purchase Serial Canceled"})
