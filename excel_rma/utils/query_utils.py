import frappe
import json
from frappe.utils import cint


def parse_list_params(
    filters=None,
    fields=None,
    limit_start=0,
    limit=10,
    order_by="creation desc",
):
    """
    Parse and normalize common list query parameters.

    Args:
        filters: Dict or JSON string of filters
        fields: List or JSON string of fields to return
        limit_start: Starting index for pagination
        limit: Number of records per page
        order_by: Sort order string

    Returns:
        dict: Normalized parameters ready for frappe.db.get_list
    """
    # Parse filters
    if isinstance(filters, str):
        try:
            filters = json.loads(filters)
        except Exception:
            filters = frappe.parse_json(filters)
    filters = filters or []

    # Parse fields
    if isinstance(fields, str):
        try:
            fields = json.loads(fields)
        except Exception:
            fields = frappe.parse_json(fields)
    fields = fields or ["*"]

    # Normalize pagination
    limit_start = cint(limit_start)
    limit = cint(limit)

    print(limit, "sdfsdfsdfkhsdjfhksakfhjkasfasfjksdhj")

    return {
        "filters": filters,
        "fields": fields,
        "limit_start": limit_start,
        "limit": limit,
        "order_by": order_by,
    }


def get_paginated_list(doctype, **kwargs):
    """
    Get paginated list with total count for any doctype.

    Args:
        doctype: DocType name
        **kwargs: filters, fields, limit_start, limit, order_by

    Returns:
        dict: {"data": list of records, "total": total count}
    """
    params = parse_list_params(**kwargs)

    rows = frappe.db.get_list(
        doctype,
        fields=params["fields"],
        filters=params["filters"],
        limit_start=params["limit_start"],
        limit=params["limit"],
        order_by=params["order_by"],
        as_list=False,
    )

    total = frappe.db.count(doctype, filters=params["filters"])

    return {"data": rows, "total": total}
