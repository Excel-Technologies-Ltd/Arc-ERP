import { type Filter, useFrappeGetDoc, useFrappeGetDocList } from 'frappe-react-sdk';
import { PurchaseInvoice } from '@/types/Accounts/PurchaseInvoice';

export interface PurchaseInvoiceFilters {
  purchase_invoice_number?: string;
  status?: string;
  supplier?: string;
}

// API Call to get suppliers based on search
export const getSupplierList = (supplierSearch: string | null) => {
  return useFrappeGetDocList('Supplier', {
    fields: ['name', 'supplier_name'],
    filters: supplierSearch ? [['supplier_name', 'like', `%${supplierSearch}%`]] : undefined,
  });
};

// API Call to get purchase orders
export const getPurchaseInvoiceList = ({
  purchase_invoice_number,
  status,
  supplier,
}: PurchaseInvoiceFilters) => {
  const conditions: Filter[] = [
    ...(purchase_invoice_number
      ? [['name', 'like', `%${purchase_invoice_number}%`] as Filter]
      : []),
    ...(status ? [['status', 'like', `%${status}%`] as Filter] : []),
    ...(supplier ? [['supplier', 'like', `%${supplier}%`] as Filter] : []),
  ];
  return useFrappeGetDocList<PurchaseInvoice>('Purchase Invoice', {
    fields: ['*'],
    filters: conditions,
  });
};

// API Call to get purchase invoice details
export const getPurchaseInvoiceDetails = (invoice_number: string) => {
  return useFrappeGetDoc<PurchaseInvoice>('Purchase Invoice', invoice_number);
};
