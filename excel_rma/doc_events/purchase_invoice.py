import frappe

CANCELLED_STATUS = "Cancelled"


def update_custom_status_on_cancel(doc, method):
    """
    Update custom_excel_status to 'Cancelled' when Purchase Invoice is cancelled
    This ensures the status is updated even when cancelled through Frappe UI

    Args:
        doc: Purchase Invoice document object
        method: The method name ('on_cancel')
    """
    # Update the custom_excel_status field
    # Using db_set to update the field directly in the database
    # This is more reliable during the cancellation process
    frappe.db.set_value(
        "Purchase Invoice",
        doc.name,
        "custom_excel_status",
        CANCELLED_STATUS,
        update_modified=False,
    )
    doc.custom_excel_status = CANCELLED_STATUS
