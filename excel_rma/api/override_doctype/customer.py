import frappe
from erpnext.selling.doctype.customer.customer import Customer


class CustomCustomer(Customer):
    """
    Override Customer Doctype controller.
    This replaces ERPNext's customer.py.
    """

    def get_list(self, args):
        """
        Override the default get_list for Customer.
        Add a new virtual field new_field='Arif Jahan'
        """
        # Call parent get_list (normal Frappe behaviour)
        # result = super().get_list(args)

        # print(result)

        # # Inject new_field into each row
        # if isinstance(result, list):
        #     for row in result:
        #         if isinstance(row, dict):
        #             row["new_field"] = "Arif Jahan"

        return []
