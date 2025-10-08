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


@frappe.whitelist()
def get_purchase_invoice_details(purchase_invoice: str) -> Dict[str, Union[Dict, List]]:
    """
    Get detailed information about a specific purchase invoice including related receipt data for each item.

    Args:
        purchase_invoice: Name/ID of the Purchase Invoice document

    Returns:
        Dictionary containing invoice data with receipt_data attached to each item

    Raises:
        frappe.DoesNotExistError: If purchase invoice doesn't exist
        frappe.PermissionError: If user doesn't have permission to view the invoice
    """
    try:
        # Fetch the Purchase Invoice document
        invoice_doc = frappe.get_doc("Purchase Invoice", purchase_invoice)

        # Check if user has permission to view this document
        invoice_doc.check_permission("read")

        # Convert document to dictionary for JSON serialization
        invoice_data = invoice_doc.as_dict()

        # Get all item codes from the invoice in one go
        item_codes = [item.get("item_code") for item in invoice_data["items"]]

        # Fetch all receipt data in a single query
        if item_codes:
            receipt_data = frappe.db.get_all(
                "Purchase Receipt Item",
                filters={
                    "item_code": ["in", item_codes],
                    "purchase_invoice": purchase_invoice,
                    "docstatus": 1,
                },
                fields=[
                    "item_code",
                    "qty",
                    "modified_by",
                    "name",
                    "parent",
                    "creation",
                    "modified",
                ],
            )

            # Group receipt data by item_code for O(1) lookup
            receipt_map = {}
            for receipt in receipt_data:
                item_code = receipt.pop("item_code")
                if item_code not in receipt_map:
                    receipt_map[item_code] = []
                receipt_map[item_code].append(receipt)

            # Attach receipt_data to each invoice item
            for item in invoice_data["items"]:
                item["receipt_data"] = receipt_map.get(item.get("item_code"), [])
                item["assign_qty"] = sum(
                    receipt.get("qty") for receipt in item["receipt_data"]
                )
                item["remaining_qty"] = item.get("qty") - sum(
                    receipt.get("qty") for receipt in item["receipt_data"]
                )
        else:
            # No items in invoice
            for item in invoice_data["items"]:
                item["receipt_data"] = []

        return invoice_data

    except frappe.DoesNotExistError:
        frappe.throw(
            f"Purchase Invoice {purchase_invoice} does not exist",
            frappe.DoesNotExistError,
        )
    except frappe.PermissionError:
        frappe.throw(
            f"You do not have permission to view Purchase Invoice {purchase_invoice}",
            frappe.PermissionError,
        )
    except Exception as e:
        frappe.log_error(
            message=frappe.get_traceback(),
            title=f"Error fetching Purchase Invoice details: {purchase_invoice}",
        )
        frappe.throw(f"An error occurred while fetching invoice details: {str(e)}")
