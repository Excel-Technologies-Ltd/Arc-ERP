import frappe


PERMISSIONS = [
    "read",
    "write",
    "create",
    "delete",
    "submit",
    "cancel",
    "amend",
    "report",
    "export",
    "import",
]


@frappe.whitelist()
def user_details_with_permission(doctypes=None):

    # Normalize doctypes
    if not doctypes:
        rma = frappe.get_cached_doc("RMA Settings")
        doctypes = [row.doctype_name for row in (rma.doctype_list or [])]
    elif isinstance(doctypes, str):
        doctypes = [doctypes]

    # Per-doctype permissions
    user_permissions = {}
    for dt in doctypes:
        try:
            user_permissions[dt] = {
                p: bool(frappe.has_permission(dt, p)) for p in PERMISSIONS
            }
        except Exception as e:
            user_permissions[dt] = {"error": str(e), "has_access": False}

    # Extras (guarded by permissions where it makes sense)
    roles = frappe.get_roles() if frappe.has_permission("Role", "read") else []
    territories = (
        frappe.db.get_list("Territory", pluck="name")
        if frappe.has_permission("Territory", "read")
        else []
    )
    warehouses = (
        frappe.db.get_list("Warehouse", pluck="name")
        if frappe.has_permission("Warehouse", "read")
        else []
    )

    return {
        "user": frappe.session.user,
        "roles": roles,
        "territory": territories,
        "warehouse": warehouses,
        "permissions": user_permissions,
    }
