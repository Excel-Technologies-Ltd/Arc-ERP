import frappe
from erpnext.buying.doctype.purchase_order.purchase_order import make_purchase_invoice


def create_purchase_invoice(doc, method):
    """Create Purchase Invoice from Purchase Order - Simple version"""

    # Only if submitted
    if doc.docstatus != 1:
        return

    # Check if already created
    if frappe.db.exists("Purchase Invoice Item", {"purchase_order": doc.name}):
        return

    try:
        # Use ERPNext's built-in function
        pi = make_purchase_invoice(doc.name)
        pi.insert(ignore_permissions=True)
        pi.submit()  # Remove this line if you want draft

        frappe.msgprint(f"Purchase Invoice {pi.name} created", alert=True)

    except Exception as e:
        frappe.log_error(message=str(e), title=f"PI Creation Failed: {doc.name}")
