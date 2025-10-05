from excel_rma.utils.mongo import get_db
import frappe

# PURCHASES_SERIAL_DATA = {
#     "company": "Excel Technologies Ltd.",
#     "naming_series": "PINV-.YYYY.-",
#     "posting_date": "2025-05-09",
#     "posting_time": "12:17:47",
#     "purchase_invoice_name": "PINV-2025-00808",
#     "supplier": "ETLSUP-00084",
#     "total": 20152.92,
#     "total_qty": 10,
#     "items": [
#         {
#             "warehouse": "Baridhara Bad Stock - ETL",
#             "serial_no": ["Non Serial Item", "Non Serial Item"],
#             "qty": 6,
#             "amount": 12000,
#             "rate": 2000,
#             "item_code": "H-M810",
#             "has_serial_no": 0,
#             "warranty_date": "2025-09-24T18:00:00.000Z",
#             "item_name": "DIGITALX SPEAKER H-M810",
#         },
#         {
#             "warehouse": "Baridhara Bad Stock - ETL",
#             "serial_no": [
#                 "22492Xty00111182",
#                 "56231ty3",
#                 "22492tyX00sdf111182",
#                 "562gty313",
#                 "22492tyX00ddd111182",
#                 "56231ty443",
#             ],
#             "qty": 4,
#             "amount": 8152.92,
#             "rate": 2038.23,
#             "item_code": "ARCHER C64",
#             "has_serial_no": 1,
#             "warranty_date": "2027-09-30",
#             "item_name": "TP-LINK ARCHER C64 AC1200 WIRELESS MU-MIMO WIFI ROUTER",
#         },
#     ],
# }


@frappe.whitelist(allow_guest=True)
def assign_serial(**payload):
    PURCHASES_SERIAL_DATA = frappe.parse_json(payload)
    purchase_invoice_name = PURCHASES_SERIAL_DATA["purchase_invoice_name"]
    items = PURCHASES_SERIAL_DATA["items"]

    # Connect to MongoDB
    mongo_db = get_db()
    serial_no_collection = mongo_db["serial_no"]

    # Get and validate Purchase Invoice
    purchase_invoice = frappe.get_doc(
        "Purchase Invoice",
        purchase_invoice_name,
    )
    if not purchase_invoice:
        frappe.throw("Purchase Invoice does not exist in the database")

    # Get and validate Purchase Order
    purchase_order = (
        purchase_invoice.items[0].purchase_order if purchase_invoice.items else None
    )
    if not purchase_order:
        frappe.throw("Purchase Order does not exist for this Purchase Invoice")

    # Extract and validate serial numbers in one pass
    serial_numbers = [
        sn.strip()
        for item in items
        if item.get("has_serial_no") == 1
        for sn in item.get("serial_no", [])
        if sn.strip() and sn.strip() != "Non Serial Item"
    ]

    # Check for duplicates
    if serial_numbers:
        # Find input duplicates
        input_duplicates = {sn for sn in serial_numbers if serial_numbers.count(sn) > 1}

        # Find existing serials in MongoDB
        existing_serials = {
            doc["serial_no"]
            for doc in serial_no_collection.aggregate(
                [
                    {"$match": {"serial_no": {"$in": serial_numbers}}},
                    {"$project": {"serial_no": 1, "_id": 0}},
                ]
            )
        }

        # Combine and check duplicates
        all_duplicates = input_duplicates | existing_serials
        if all_duplicates:
            frappe.throw(
                f"Duplicate serial numbers found: {', '.join(sorted(all_duplicates))}"
            )

    # Create Purchase Receipt payload
    purchase_receipt_payload = {
        "doctype": "Purchase Receipt",
        "docstatus": 1,
        "items": [
            {
                **item,
                "purchase_invoice": purchase_invoice_name,
                "purchase_order": purchase_order,
                "serial_no": "",
            }
            for item in items
        ],
        "against_purchase_order": purchase_order,
        "supplier": PURCHASES_SERIAL_DATA["supplier"],
        "posting_date": PURCHASES_SERIAL_DATA["posting_date"],
        "posting_time": PURCHASES_SERIAL_DATA["posting_time"],
        "purchase_invoice_name": purchase_invoice_name,
        "total": PURCHASES_SERIAL_DATA["total"],
        "total_qty": PURCHASES_SERIAL_DATA["total_qty"],
        "set_posting_time": 1,
    }

    try:
        # Create and save Purchase Receipt
        purchase_receipt_doc = frappe.get_doc(purchase_receipt_payload)
        purchase_receipt_doc.insert(ignore_permissions=True)

        # Create MongoDB serial number payload in one comprehension
        mongo_serial_no_payload = [
            {
                "serial_no": sn.strip(),
                "item_code": item.get("item_code"),
                "item_name": item.get("item_name"),
                "purchase_time": PURCHASES_SERIAL_DATA["posting_time"],
                "warehouse": item.get("warehouse"),
                "purchase_date": PURCHASES_SERIAL_DATA["posting_date"],
            }
            for item in items
            if item.get("has_serial_no") == 1
            for sn in item.get("serial_no", [])
            if sn.strip() and sn.strip() != "Non Serial Item"
        ]

        # Bulk insert to MongoDB
        if mongo_serial_no_payload:
            try:
                serial_insert_result = serial_no_collection.insert_many(
                    mongo_serial_no_payload, ordered=False
                )
                print(
                    f"Successfully inserted {len(serial_insert_result.inserted_ids)} serial numbers to MongoDB"
                )
            except Exception as e:
                print(f"Error inserting serial numbers to MongoDB: {str(e)}")

        # Commit the transaction
        frappe.db.commit()

        return frappe.as_json(
            {
                "success": True,
                "purchase_invoice_name": purchase_invoice_name,
                "purchase_receipt_name": purchase_receipt_doc.name,
                "message": "Purchase Receipt created successfully",
            }
        )

    except Exception as e:
        frappe.db.rollback()
        frappe.throw(f"Failed to create Purchase Receipt: {str(e)}")
