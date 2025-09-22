from erpnext.accounts.doctype.purchase_invoice.purchase_invoice import PurchaseInvoice
import frappe

class CustomPurchaseInvoice(PurchaseInvoice):
    def before_save(self):
        """Called before saving the document"""
        frappe.msgprint("This is from custom purchase invoice before_save")
        # Add your custom logic here
        # Example: Auto-calculate something, validate custom fields, etc.
        return super().before_save()
    
    def before_submit(self):
        """Called before submitting the document"""
        frappe.msgprint("This is from custom purchase invoice before_submit")
        # Add your custom logic here
        # Example: Final validations, calculations, notifications, etc.
        return super().before_submit()
    
    def after_submit(self):
        """Called after submitting the document"""
        frappe.msgprint("This is from custom purchase invoice after_submit")
        # Add your custom logic here
        # Example: Create related documents, send notifications, etc.
        return super().after_submit()
    
    def before_cancel(self):
        """Called before cancelling the document"""
        frappe.msgprint("This is from custom purchase invoice before_cancel")
        # Add your custom logic here
        # Example: Check if cancellation is allowed, cleanup, etc.
        return super().before_cancel()
    
    def after_cancel(self):
        """Called after cancelling the document"""
        frappe.msgprint("This is from custom purchase invoice after_cancel")
        # Add your custom logic here
        # Example: Cleanup related data, send notifications, etc.
        return super().after_cancel()
    
    def on_update(self):
        """Called when document is updated"""
        frappe.msgprint("This is from custom purchase invoice on_update")
        # Add your custom logic here
        # Example: Track changes, update related documents, etc.
        return super().on_update()
    
    def on_submit(self):
        """Called when document is submitted (same as after_submit)"""
        frappe.msgprint("This is from custom purchase invoice on_submit")
        # Add your custom logic here
        return super().on_submit()
    
    def on_cancel(self):
        """Called when document is cancelled (same as after_cancel)"""
        frappe.msgprint("This is from custom purchase invoice on_cancel")
        # Add your custom logic here
        return super().on_cancel()
    
    def validate(self):
        """Called during document validation"""
        frappe.msgprint("This is from custom purchase invoice validate")
        # Add your custom logic here
        # Example: Custom field validations, business rules, etc.
        return super().validate()
    
    def list_print(self):
        """Called when printing from list view"""
        frappe.msgprint("This is from custom purchase invoice list print")
        return super().list_print()
       