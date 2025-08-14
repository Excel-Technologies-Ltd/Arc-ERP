import frappe
@frappe.whitelist(allow_guest=True)
def user_details_with_permission(doctypes=None):
    if isinstance(doctypes, str):
        doctypes = [doctypes]
    if not doctypes:
        usable_doctype_list=frappe.get_doc("RMA Settings").doctype_list
        doctypes=[ doctype.doctype_name for doctype in usable_doctype_list]
    user_permissions = {}
    
    for doctype in doctypes:
        try:
            permissions = {
                "read": frappe.has_permission(doctype, "read") if frappe.has_permission(doctype, "read") else False,
                "write": frappe.has_permission(doctype, "write") if frappe.has_permission(doctype, "write") else False,
                "create": frappe.has_permission(doctype, "create") if frappe.has_permission(doctype, "create") else False,
                "delete": frappe.has_permission(doctype, "delete") if frappe.has_permission(doctype, "delete") else False,
                "submit": frappe.has_permission(doctype, "submit") if frappe.has_permission(doctype, "submit") else False,
                "cancel": frappe.has_permission(doctype, "cancel") if frappe.has_permission(doctype, "cancel") else False,
                "amend": frappe.has_permission(doctype, "amend") if frappe.has_permission(doctype, "amend") else False,
                "report": frappe.has_permission(doctype, "report") if frappe.has_permission(doctype, "report") else False,
                "export": frappe.has_permission(doctype, "export") if frappe.has_permission(doctype, "export") else False,
                "import": frappe.has_permission(doctype, "import") if frappe.has_permission(doctype, "import") else False
            }
            
            user_permissions[doctype] = permissions
            
        except Exception as e:
            user_permissions[doctype] = {
                "error": str(e),
                "has_access": False
            }
    # get roles
    user_role = frappe.get_roles()
    territory= frappe.db.get_list("Territory",pluck="name")
    warehouse= frappe.db.get_list("Warehouse",pluck="name")
    
    return {
        "user": frappe.session.user,
        "roles": user_role,
        "territory": territory,
        "warehouse": warehouse,
        "permissions": user_permissions
    }