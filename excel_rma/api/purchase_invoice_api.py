
import frappe

@frappe.whitelist(allow_guest=True)
def get_purchase_invoices(filters=None, fields=None, order_by=None, limit=None, start=None):
    """
    Get list of purchase invoices with filters like get_list
    
    Args:
        filters (dict): Filter conditions (e.g., {"name": "PINV-001", "status": "Draft"})
        fields (list): List of fields to select (e.g., ["name", "supplier", "total"])
        order_by (str): Order by clause (e.g., "creation desc")
        limit (int): Maximum number of records to return
        start (int): Starting record index for pagination
    """
    # Default fields if not specified
    if not fields:
        fields = ["pi.name", "pii.parent", "pii.purchase_order"]
    
    # Base SQL query
    sql = f"""
         select
            {', '.join(fields)}
        from
            `tabPurchase Invoice` as pi
            inner join `tabPurchase Invoice Item` as pii on pi.name = pii.parent
            inner join `tabPurchase Receipt Item` as pri on pii.purchase_order = pri.purchase_order
        """

    # Add WHERE clause if filters are provided
    where_conditions = []
    values = []
    
    if filters:
        # Parse filters if they're provided as JSON string
        if isinstance(filters, str):
            import json
            filters = json.loads(filters)

        # Handle Frappe's standard filter format: [["field", "operator", "value"], ...]
        if isinstance(filters, list):
            for filter_condition in filters:
                if len(filter_condition) == 3:
                    field, operator, value = filter_condition
                    
                    # Handle different operators
                    if operator.lower() == "in":
                        # Handle IN conditions
                        if isinstance(value, (list, tuple)):
                            placeholders = ', '.join(['%s'] * len(value))
                            where_conditions.append(f"{field} in ({placeholders})")
                            values.extend(value)
                        else:
                            # Single value for IN
                            where_conditions.append(f"{field} = %s")
                            values.append(value)
                    elif operator.lower() == "not in":
                        # Handle NOT IN conditions
                        if isinstance(value, (list, tuple)):
                            placeholders = ', '.join(['%s'] * len(value))
                            where_conditions.append(f"{field} not in ({placeholders})")
                            values.extend(value)
                        else:
                            where_conditions.append(f"{field} != %s")
                            values.append(value)
                    elif operator.lower() in ["like", "not like"]:
                        # Handle LIKE conditions
                        where_conditions.append(f"{field} {operator} %s")
                        values.append(value)
                    elif operator.lower() in ["=", "!=", "<", ">", "<=", ">="]:
                        # Handle comparison operators
                        where_conditions.append(f"{field} {operator} %s")
                        values.append(value)
                    else:
                        # Default to equality
                        where_conditions.append(f"{field} = %s")
                        values.append(value)
        
        # Handle dictionary format filters (backward compatibility)
        elif isinstance(filters, dict):
            for field, value in filters.items():
                if isinstance(value, (list, tuple)):
                    # Handle IN conditions
                    placeholders = ', '.join(['%s'] * len(value))
                    where_conditions.append(f"{field} in ({placeholders})")
                    values.extend(value)
                else:
                    # Simple equality condition
                    where_conditions.append(f"{field} = %s")
                    values.append(value)
    
    # Add WHERE clause to SQL
    if where_conditions:
        sql += " WHERE " + " AND ".join(where_conditions)
    
    # Add ORDER BY clause
    if order_by:
        sql += f" ORDER BY {order_by}"
    
    # Add LIMIT clause
    if limit:
        if start:
            sql += f" LIMIT {start}, {limit}"
        else:
            sql += f" LIMIT {limit}"
    else:
        # Default limit if not specified
        sql += " LIMIT 500"
    
    
    # Execute query
    purchase_invoices = frappe.db.sql(sql, values, as_dict=True)

    return {"purchase_invoices": purchase_invoices}
    
