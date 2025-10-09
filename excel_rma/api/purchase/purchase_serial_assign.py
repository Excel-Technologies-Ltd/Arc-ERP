from excel_rma.utils.constants import EVENT_TYPE
from excel_rma.utils.mongo import get_db
import frappe


@frappe.whitelist()
def assign_serial(**payload):
    """
    Assigns serial numbers to purchase invoice items and creates purchase receipt.
    Uses batch processing for validation and insertion.
    """
    data = frappe.parse_json(payload)

    # Constants
    BATCH_SIZE = 30000

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

    # Extract and validate serials
    serials = _extract_serials(items)
    if serials:
        _validate_serials_batched(serials, serial_coll, BATCH_SIZE)

    # Prepare payloads
    pr_payload = _build_pr_payload(items, pi_name, po_ref, data)
    mongo_docs = _build_mongo_docs(items, data)

    # ===== PHASE 2: EXECUTION =====
    return _execute_transaction(
        serial_coll, pr_payload, mongo_docs, pi_name, BATCH_SIZE
    )


def _extract_serials(items):
    """Extract unique serial numbers from items."""
    return [
        sn.strip()
        for item in items
        if item.get("has_serial_no") == 1
        for sn in item.get("serial_no", [])
        if sn.strip() and sn.strip() != "Non Serial Item"
    ]


def _validate_serials_batched(serials, collection, batch_size):
    """Validate serials in batches for duplicates and existence."""

    # Check input duplicates
    seen = set()
    duplicates = {s for s in serials if s in seen or seen.add(s)}

    # Check existing serials in MongoDB (batched)
    existing = set()
    for i in range(0, len(serials), batch_size):
        batch = serials[i : i + batch_size]
        batch_existing = {
            doc["serial_no"]
            for doc in collection.find(
                {"serial_no": {"$in": batch}}, {"serial_no": 1, "_id": 0}
            )
        }
        existing.update(batch_existing)

    # Report all duplicates
    all_dups = duplicates | existing
    if all_dups:
        frappe.throw(f"Duplicate serial numbers: {', '.join(sorted(all_dups))}")


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
    return [
        {
            "serial_no": sn.strip(),
            "item_code": item.get("item_code"),
            "item_name": item.get("item_name"),
            "purchase_time": data["posting_time"],
            "warehouse": data["warehouse"],
            "purchase_date": data["posting_date"],
        }
        for item in items
        if item.get("has_serial_no") == 1
        for sn in item.get("serial_no", [])
        if sn.strip() and sn.strip() != "Non Serial Item"
    ]


def _insert_batched(collection, docs, batch_size, session):
    """Insert documents in batches within transaction."""
    total = 0
    for i in range(0, len(docs), batch_size):
        batch = docs[i : i + batch_size]
        result = collection.insert_many(batch, ordered=False, session=session)
        total += len(result.inserted_ids)
    return total


def _execute_transaction(serial_coll, pr_payload, mongo_docs, pi_name, batch_size):
    """Execute transaction with proper rollback handling."""

    session = serial_coll.database.client.start_session()
    pr_doc = None

    try:
        session.start_transaction()

        # Create Purchase Receipt
        pr_doc = frappe.get_doc(pr_payload)
        pr_doc.insert()

        # Insert serials in batches
        inserted = 0
        if mongo_docs:
            inserted = _insert_batched(serial_coll, mongo_docs, batch_size, session)

        # Commit both transactions
        session.commit_transaction()
        frappe.db.commit()

        # Make Purchase Invoice completed if all items are fully assigned
        __Make_Purchase_Invoice_Completed(pi_name)

        # Create Serial History into MongoDB using frappe queue
        frappe.enqueue(
            __create_serial_history,
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
        # Rollback
        if session.in_transaction:
            session.abort_transaction()
        frappe.db.rollback()

        # Cleanup PR if created
        if pr_doc and pr_doc.name:
            try:
                frappe.delete_doc(
                    "Purchase Receipt",
                    pr_doc.name,
                    force=True,
                )
                frappe.db.commit()
            except:
                pass

        frappe.throw(f"Transaction failed: {str(e)}")

    finally:
        session.end_session()


def __Make_Purchase_Invoice_Completed(pi_name):
    """Make Purchase Invoice completed if all items are fully assigned."""
    from excel_rma.api.purchase.purchase_invoice import get_purchase_invoice_details

    # Get full invoice details with receipt data
    invoice_data = get_purchase_invoice_details(pi_name)

    if not invoice_data or not invoice_data.get("items"):
        frappe.throw("Purchase Invoice does not have any items")

    # Check if ALL items are fully assigned (remaining_qty == 0)
    all_items_complete = all(
        item.get("remaining_qty", item.get("qty")) == 0
        for item in invoice_data["items"]
    )

    if not all_items_complete:
        return

    # All items are complete, update status
    frappe.db.set_value("Purchase Invoice", pi_name, "custom_excel_status", "Completed")

    frappe.msgprint(f"Purchase Invoice {pi_name} marked as Completed")


def __create_serial_history(mongo_docs, pi_name):
    """
    Create serial history records in MongoDB for each serial number.
    Uses batch processing for efficient insertion.
    """
    if not mongo_docs:
        return

    # Get MongoDB connection
    mongo_db = get_db()
    serial_history_coll = mongo_db["serial_no_history"]

    # Constants
    BATCH_SIZE = 30000

    # Get Purchase Invoice document for reference
    pi_doc = frappe.get_doc("Purchase Invoice", pi_name)

    # Get current user and timestamp
    current_user = frappe.session.user
    current_datetime = frappe.utils.now()

    # Build serial history documents
    history_docs = []
    for doc in mongo_docs:
        history_doc = {
            "eventDate": current_datetime,
            "eventType": EVENT_TYPE[
                "SerialPurchased"
            ],  # Event type for purchase receipt creation
            "serial_no": doc.get("serial_no"),
            "document_no": pi_doc.name,  # Purchase Invoice name
            "transaction_from": pi_doc.supplier,  # From supplier
            "transaction_to": doc.get("warehouse"),  # To warehouse
            "document_type": "Purchase Receipt",
            "parent_document": pi_name,
            "created_on": current_datetime,
            "created_by": current_user,
            "item_code": doc.get("item_code"),
            "item_name": doc.get("item_name"),
        }
        history_docs.append(history_doc)

    # Insert history records in batches
    try:
        total_inserted = 0
        for i in range(0, len(history_docs), BATCH_SIZE):
            batch = history_docs[i : i + BATCH_SIZE]
            result = serial_history_coll.insert_many(batch, ordered=False)
            total_inserted += len(result.inserted_ids)

        frappe.logger().info(
            f"Created {total_inserted} serial history records for Purchase Invoice {pi_name}"
        )

    except Exception as e:
        # Log error but don't fail the main transaction
        frappe.log_error(
            f"Failed to create serial history for {pi_name}: {str(e)}",
            "Serial History Creation Error",
        )
