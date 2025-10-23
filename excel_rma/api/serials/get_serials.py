from typing import Optional
from excel_rma.rma_api_helpers.serials.serials_helper import parse_serial_filter_query
from excel_rma.utils.mongo import get_db
import frappe
import json


@frappe.whitelist(methods="GET")
def get_serials_list(skip=0, limit=10, sort=None, filter_query=None):
    """
    Get list of serial numbers from MongoDB
    Args:
        skip (int): Number of documents to skip
        limit (int): Number of documents to return
        sort (str): Sort order JSON string
        filter_query (str): Filter query JSON string
    """

    # If no filter query, return empty list
    if not filter_query:
        return {
            "data": [],
            "count": 0,
            "offset": 0,
        }

    # Connect to MongoDB
    mongo_db = get_db()
    serial_collection = mongo_db["serial_no"]

    # Parse sort order
    try:
        order = json.loads(sort) if sort else {}
    except (json.JSONDecodeError, TypeError):
        order = {"_id": -1}

    if not order or len(order) == 0:
        order = {"_id": -1}

    # Parse filter query
    show_both = False
    try:
        filter_dict = json.loads(filter_query) if filter_query else {}
        show_both = filter_dict.get("bothChecked", False)
    except (json.JSONDecodeError, TypeError):
        filter_dict = {}

    # Parse filter query to build where clause
    where = parse_serial_filter_query(filter_dict) if filter_dict else {}

    # Handle purchase_invoice_name edge case
    if "purchase_invoice_name" in where and not where["purchase_invoice_name"].get(
        "$exists"
    ):
        del where["purchase_invoice_name"]

    print(where)
    # Handle showBoth logic
    if show_both:
        # Remove these fields if they exist
        where.pop("purchase_invoice_name", None)
        where.pop("sales_invoice_name", None)
        where.pop("sales_return_name", None)
        where.pop("delivery_note", None)

        # Build the $and + $or structure
        where = {
            "$and": [
                where,
                {
                    "$or": [
                        {"purchase_invoice_name": {"$exists": True}},
                        {"sales_invoice_name": {"$exists": True}},
                        {"sales_return_name": {"$exists": True}},
                    ]
                },
            ]
        }

    # Build aggregation pipeline
    pipeline = [
        {"$match": where},
        {
            "$facet": {
                "docs": [
                    {"$sort": order},
                    {"$skip": int(skip)},
                    {"$limit": int(limit)},
                    {"$addFields": {"_id": {"$toString": "$_id"}}},
                ],
                "count": [{"$count": "total"}],
            }
        },
    ]

    # Execute aggregation
    result = list(serial_collection.aggregate(pipeline))[0]

    return {
        "data": result["docs"],
        "count": result["count"][0]["total"] if result["count"] else 0,
        "offset": int(skip),
    }


@frappe.whitelist(methods="GET")
def get_serial_details(serial_no):
    """
    Get serial number details from MongoDB
    Args:
        serial_no (str): Serial number to fetch details for
    Returns:
        dict: Serial number details
    """
    try:
        mongo_db = get_db()
        serial_collection = mongo_db["serial_no"]

        serial_details = serial_collection.find_one(
            {"serial_no": serial_no}, {"_id": 0}
        )

        if not serial_details:
            frappe.throw(f"Serial number {serial_no} not found")

        return dict(serial_details)

    except Exception as e:
        frappe.throw(f"Error fetching serial details: {str(e)}")


@frappe.whitelist(methods="GET")
def get_serial_history(serial_no):
    """
    Get serial number history from MongoDB
    Args:
        serial_no (str): Serial number to fetch history for
    Returns:
        list: List of history records for the serial number
    Raises:
        frappe.throw: If serial history not found or error occurs
    """
    try:
        mongo_db = get_db()
        serial_history_collection = mongo_db["serial_no_history"]

        serial_history = serial_history_collection.find(
            {"serial_no": serial_no}, {"_id": 0}
        )

        if not serial_history:
            frappe.throw(f"Serial history not found for {serial_no}")

        return list(serial_history)

    except Exception as e:
        frappe.throw(f"Error fetching serial history: {str(e)}")


@frappe.whitelist(methods=["GET"])
def get_delivered_serials(
    skip: int = 0,
    limit: int = 20,
    sort: Optional[str] = None,
    filter_query: Optional[str] = None,
):
    """
    Get paginated list of delivered serial numbers from MongoDB
    Optimized with $facet for single-pass aggregation
    """

    if not filter_query:
        return frappe.throw("Filter query is required")

    try:
        # Parse JSON parameters
        try:
            filter_dict = json.loads(filter_query) if filter_query else {}
            sorting = json.loads(sort) if sort else {"serial_no": -1}
        except json.JSONDecodeError as e:
            frappe.throw(f"Invalid JSON in parameters: {str(e)}")

        # Get MongoDB connection
        mongo_db = get_db()
        serial_collection = mongo_db["serial_no"]

        # Convert to int once
        skip_val = int(skip)
        limit_val = int(limit)

        pipeline = [
            {"$match": filter_dict},
            {
                "$facet": {
                    "docs": [
                        {"$sort": sorting},
                        {"$skip": skip_val},
                        {"$limit": limit_val},
                        {"$addFields": {"_id": {"$toString": "$_id"}}},
                    ],
                    "count": [{"$count": "total"}],
                }
            },
        ]

        # Execute aggregation with allowDiskUse for large datasets
        result = list(serial_collection.aggregate(pipeline, allowDiskUse=True))[0]

        total = result["count"][0]["total"] if result["count"] else 0

        # Return structured response
        return {
            "data": result["docs"],
            "count": total,
            "offset": skip_val,
        }

    except frappe.exceptions.ValidationError:
        raise
    except Exception as e:
        frappe.log_error(f"Error in get_delivered_serials: {str(e)}")
        frappe.throw(f"Error fetching delivered serial numbers: {str(e)}")
