import { useFrappeGetDocList } from 'frappe-react-sdk';

// API Call to get suppliers based on search
export const getSupplierList = (supplierSearch: string | null) => {
  return useFrappeGetDocList('Supplier', {
    fields: ['name', 'supplier_name'],
    filters: supplierSearch ? [['supplier_name', 'like', `%${supplierSearch}%`]] : undefined,
  });
};

// API Call to get purchase orders
export const getPurchaseInvoiceList = () => {
  return useFrappeGetDocList('Purchase Invoice', {
    fields: ['*'],
  });
};
