from excel_rma.utils.mongo import get_db
import frappe
import json


SERIAL_FILTER_KEYS = [
    "item_code",
    "warehouse",
    "serial_no",
    "sales_invoice_name",
    "purchase_invoice_name",
    "sales_return_name",
]


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


def parse_serial_filter_query(filter_query):
    """
    Parse and clean the filter query
    Args:
        filter_query (dict): The filter query dictionary
    Returns:
        dict: Cleaned filter query
    """
    # Create a copy to avoid modifying the original
    cleaned_query = filter_query.copy()

    # Remove keys that are not in SERIAL_FILTER_KEYS (except $or)
    keys_to_remove = []
    for key in cleaned_query.keys():
        if key != "$or" and key not in SERIAL_FILTER_KEYS:
            keys_to_remove.append(key)

    for key in keys_to_remove:
        del cleaned_query[key]

    # Remove item_code and warehouse if they are empty/falsy
    if "item_code" in cleaned_query and not cleaned_query["item_code"]:
        del cleaned_query["item_code"]
    if "warehouse" in cleaned_query and not cleaned_query["warehouse"]:
        del cleaned_query["warehouse"]

    return cleaned_query


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
