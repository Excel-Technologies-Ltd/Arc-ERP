from excel_rma.utils.mongo import get_db
import frappe

PURCHASES_SERIAL_DATA = {
    "company": "Excel Technologies Ltd.",
    "naming_series": "PINV-.YYYY.-",
    "posting_date": "30-9-2025",
    "posting_time": "12:17:47",
    "purchase_invoice_name": "PINV-2025-00808",
    "supplier": "ETLSUP-00084",
    "total": 20152.92,
    "total_qty": 10,
    "items": [
        {
            "warehouse": "Baridhara Bad Stock - ETL",
            "serial_no": ["Non Serial Item", "Non Serial Item"],
            "qty": 6,
            "amount": 12000,
            "rate": 2000,
            "item_code": "H-M810",
            "has_serial_no": 0,
            "warranty_date": "2025-09-24T18:00:00.000Z",
            "item_name": "DIGITALX SPEAKER H-M810",
        },
        {
            "warehouse": "Baridhara Bad Stock - ETL",
            "serial_no": [
                "22492X00111182",
                "562313",
                "56sd2313",
            ],
            "qty": 4,
            "amount": 8152.92,
            "rate": 2038.23,
            "item_code": "ARCHER C64",
            "has_serial_no": 1,
            "warranty_date": "2027-09-30",
            "item_name": "TP-LINK ARCHER C64 AC1200 WIRELESS MU-MIMO WIFI ROUTER",
        },
    ],
}


@frappe.whitelist(allow_guest=True)
def assign_serial():
    purchase_invoice_name = PURCHASES_SERIAL_DATA["purchase_invoice_name"]

    # Check if Purchase Invoice exists
    if not frappe.db.exists("Purchase Invoice", purchase_invoice_name):
        frappe.throw(
            f"Purchase Invoice {purchase_invoice_name} does not exist in the database"
        )

    # Get the Purchase Invoice document
    purchase_invoice = frappe.get_doc("Purchase Invoice", purchase_invoice_name)
    purchase_order = (
        purchase_invoice.items[0].purchase_order if purchase_invoice.items else None
    )

    # Check if Purchase Order exists
    if not purchase_order:
        frappe.throw(
            f"Purchase Order does not exist for Purchase Invoice {purchase_invoice_name}"
        )

    # Filter items with has_serial_no = 1, trim, and flatten serial numbers
    serial_numbers = []
    for item in PURCHASES_SERIAL_DATA["items"]:
        if item.get("has_serial_no") == 1:
            serial_numbers.extend(
                [
                    sn.strip()
                    for sn in item.get("serial_no", [])
                    if sn.strip() != "Non Serial Item"
                ]
            )

    # Check for duplicate serial numbers within input
    input_duplicates = [
        sn for sn in set(serial_numbers) if serial_numbers.count(sn) > 1
    ]

    if serial_numbers:
        # Connect to MongoDB
        mongo_db = get_db()
        serial_no_collection = mongo_db["serial_no"]

        # MongoDB aggregation to find existing serial numbers
        pipeline = [
            {"$match": {"serial_no": {"$in": serial_numbers}}},
            {"$group": {"_id": "$serial_no", "count": {"$sum": 1}}},
            {"$match": {"count": {"$gt": 0}}},
            {"$project": {"serial_no": "$_id", "_id": 0}},
        ]

        # Execute aggregation query
        existing_serials = [
            doc["serial_no"] for doc in serial_no_collection.aggregate(pipeline)
        ]

        # Combine duplicates from input and MongoDB
        all_duplicates = list(set(input_duplicates + existing_serials))

        # If duplicates are found, throw error
        if all_duplicates:
            frappe.throw(f"Duplicate serial numbers found: {', '.join(all_duplicates)}")

        return frappe.as_json(
            {
                "purchase_invoice_name": purchase_invoice_name,
                "serial_numbers": serial_numbers,
            }
        )

    return frappe.as_json({"purchase_invoice_name": purchase_invoice_name})
