from excel_rma.utils.query_utils import get_paginated_list
import frappe
from typing import Dict, List, Optional, Union


@frappe.whitelist()
def get_purchase_invoice_list(
    filters: Optional[Dict] = None,
    fields: Optional[List[str]] = None,
    limit_start: int = 0,
    limit: int = 10,
    order_by: str = "creation desc",
) -> Dict[str, Union[List[Dict], int]]:

    # Fetch paginated purchase invoices using the utility function
    invoices = get_paginated_list(
        "Purchase Invoice",
        fields=fields,
        filters=filters,
        limit_start=limit_start,
        limit=limit,
        order_by=order_by,
    )

    if invoices["data"]:
        # Extract invoice names for batch querying receipt items
        invoice_names = [inv.get("name") for inv in invoices["data"]]

        # Fetch all related receipt items in a single query to optimize performance
        receipt_items = frappe.db.get_all(
            "Purchase Receipt Item",
            filters={"purchase_invoice": ["in", invoice_names], "docstatus": 1},
            fields=["purchase_invoice", "qty", "modified_by"],
            order_by="modified desc",
        )

        # Group receipt items by purchase invoice for efficient lookup
        receipt_map = {}
        for item in receipt_items:
            pi_name = item.pop("purchase_invoice")
            receipt_map.setdefault(pi_name, []).append(item)

        # Assign receipt data to invoices
        for invoice in invoices["data"]:
            invoice["receipt_data"] = receipt_map.get(invoice.get("name"), [])

    return {
        "data": invoices["data"],
        "count": invoices["total"],
    }
