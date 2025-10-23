import time
from excel_rma.rma_api_helpers.purchase.purchase_serial_helper import (
    build_mongo_docs,
    build_pr_payload,
    execute_transaction,
    extract_serials_and_macs,
    validate_purchase_cancelation_serial,
    validate_serials_and_macs_optimized,
)
from excel_rma.utils.constants import PURCHASE_INVOICE_CUSTOM_STATUS
from excel_rma.utils.mongo import get_db
import frappe
from frappe.desk.form.linked_with import (
    cancel_all_linked_docs,
    get_submitted_linked_docs,
)
from pymongo.collection import Collection


@frappe.whitelist(methods="POST")
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
    serials, macs = extract_serials_and_macs(items)
    if serials or macs:
        validate_serials_and_macs_optimized(serials, macs, serial_coll)

    # Prepare payloads
    pr_payload = build_pr_payload(items, pi_name, po_ref, data)
    mongo_docs = build_mongo_docs(items, data)

    # ===== PHASE 2: EXECUTION =====
    return execute_transaction(serial_coll, pr_payload, mongo_docs, pi_name)


@frappe.whitelist(methods="POST")
def cancel_serial(**payload):
    try:
        payload_data = frappe.parse_json(payload)
        pi_name = payload_data.get("purchase_invoice_name")

        # Validation
        if not pi_name:
            frappe.throw("Purchase Invoice name is required")

        pi_doc = frappe.get_doc("Purchase Invoice", pi_name)

        if (
            pi_doc.custom_excel_status == PURCHASE_INVOICE_CUSTOM_STATUS["CANCELED"]
            or pi_doc.docstatus == 2
        ):
            frappe.throw("Purchase Invoice is already canceled")

        po_ref = pi_doc.items[0].purchase_order if pi_doc.items else None
        if not po_ref:
            frappe.throw("Purchase Order not found")

        po_doc = frappe.get_doc("Purchase Order", po_ref)
        if po_doc.docstatus == 2:
            frappe.throw("Canceled Purchase order cannot be reset.")

        # Get MongoDB collections
        mongo_db = get_db()
        serial_collection: Collection = mongo_db["serial_no"]
        history_collection: Collection = mongo_db["serial_no_history"]

        # Validate purchase serial cancelation
        validate_purchase_cancelation_serial(
            pi_name=pi_name,
            serial_collection=serial_collection,
            history_collection=history_collection,
        )

        submitted_linked_docs = get_submitted_linked_docs(
            doctype="Purchase Order", name=po_ref
        )

        # Use Frappe transaction to ensure atomicity
        frappe.db.begin()

        try:
            # Cancel linked documents if any
            if submitted_linked_docs["count"] > 0:
                cancel_all_linked_docs(
                    frappe.as_json(submitted_linked_docs["docs"]),
                    ignore_doctypes_on_cancel_all=[
                        "Unreconcile Payment",
                        "Unreconcile Payment Entries",
                    ],
                )

            # Cancel Purchase Order Document
            po_doc_new = frappe.get_doc("Purchase Order", po_ref)
            po_doc_new.cancel()

            # Delete MongoDB records
            serial_collection.delete_many({"purchase_invoice_name": pi_name})
            history_collection.delete_many({"parent_document": pi_name})

            # Commit Frappe transaction
            frappe.db.commit()

            return {
                "success": True,
                "message": "Purchase Serial Canceled Successfully",
            }

        except Exception as e:
            # Rollback Frappe transaction on error
            frappe.db.rollback()
            frappe.log_error(
                title="Cancel Serial Transaction Error", message=frappe.get_traceback()
            )
            raise

    except Exception as e:
        frappe.log_error(title="Cancel Serial Error", message=frappe.get_traceback())
        frappe.throw(f"Error canceling purchase serial: {str(e)}", exc=e)
