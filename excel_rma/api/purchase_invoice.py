# excel_rma/api/purchase_invoice.py
import frappe
import json
from frappe.utils import cint

@frappe.whitelist(allow_guest=True)
def get_purchase_invoice_list(
    filters=None,
    fields=None,
    limit_start=0,
    limit_page_length=20,
    order_by="creation desc",
):
    """Return list + total for Purchase Invoice with safe parsing of query args."""
    # Parse JSON strings if needed
    if isinstance(filters, str):
        try:
            filters = json.loads(filters)
        except Exception:
            filters = frappe.parse_json(filters)  # fallback
    if isinstance(fields, str):
        try:
            fields = json.loads(fields)
        except Exception:
            fields = frappe.parse_json(fields)

    filters = filters or []  # allow empty
    fields = fields or [
        "name", "supplier", "status", "posting_date",
        "grand_total", "rounded_total", "currency", "creation"
    ]

    limit_start = cint(limit_start)
    limit_page_length = cint(limit_page_length)

    rows = frappe.db.get_list(
        "Purchase Invoice",
        fields=fields,
        filters=filters,
        limit_start=limit_start,
        limit_page_length=limit_page_length,
        order_by=order_by,
        as_list=False,
    )
    total = frappe.db.count("Purchase Invoice", filters=filters)

    return {"data": rows, "total": total}
