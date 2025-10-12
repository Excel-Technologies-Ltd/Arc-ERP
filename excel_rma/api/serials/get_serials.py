from excel_rma.utils.mongo import get_db
import frappe
from typing import Dict, Any, List
import json


@frappe.whitelist()
def get_serials_list(skip=0, take=20, sort=None, filter_query=None):
    """Fetch serials using aggregation pipeline"""
    collection = get_db()["serial_no"]

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
                    {"$limit": int(take)},
                    {"$project": {"_id": 0}},
                ],
                "count": [{"$count": "total"}],
            }
        }
    )

    result = list(collection.aggregate(pipeline))[0]

    return {
        "docs": result["docs"],
        "length": result["count"][0]["total"] if result["count"] else 0,
        "offset": int(skip),
    }
