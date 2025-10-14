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
        sort (str): Sort order
        filter_query (str): Filter query
    """

    if not filter_query:
        return frappe.throw("Filter query is required")

    # Connect to MongoDB
    mongo_db = get_db()
    serial_collection = mongo_db["serial_no"]

    # Build pipeline
    pipeline = []

    # Parse and add filter directly
    if filter_query:
        match_query = json.loads(filter_query)
        pipeline.append({"$match": match_query})

    # Facet for parallel execution
    pipeline.append(
        {
            "$facet": {
                "docs": [
                    {"$sort": json.loads(sort) if sort else {"_id": -1}},
                    {"$skip": int(skip)},
                    {"$limit": int(limit)},
                    {"$addFields": {"_id": {"$toString": "$_id"}}},
                ],
                "count": [{"$count": "total"}],
            }
        }
    )

    # get the result
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
