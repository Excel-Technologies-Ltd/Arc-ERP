from excel_rma.utils.mongo import get_db
import frappe
import json


@frappe.whitelist(methods="GET")
def get_serials_list(skip=0, limit=10, sort=None, filter_query=None):

    # Connect to MongoDB
    mongo_db = get_db()
    serial_collection = mongo_db["serial_no"]

    # Build pipeline
    pipeline = []

    # Match stage (filter)
    if filter_query:
        pipeline.append({"$match": json.loads(filter_query)})

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
