import frappe
from excel_rma.utils.mongo import get_db


@frappe.whitelist(allow_guest=True)
def test():
    db = get_db()
    customer = db.customer.aggregate(
        [
            {"$skip": 0},
            {"$limit": 10},
            {"$project": {"_id": 0}},
        ]
    )
    return customer
