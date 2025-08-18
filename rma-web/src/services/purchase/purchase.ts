import { useFrappeGetDoc, useFrappeGetDocList } from 'frappe-react-sdk';

// Purchase Invoice Single Document Interface
export interface PurchaseInvoiceType {
  name: string;
  supplier: string;
  posting_date: string;
  set_warehouse: string;
  status: string;
  items: {
    purchase_order: string;
    name: string;
    item_group: string;
    item_name: string;
    qty: number;
    rate: number;
    amount: number;
  }[];
}

// Purchase Invoice List Document Interface
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
  const conditions: Array<[string, 'like', string]> = [];

  if (purchase_invoice_number) {
    conditions.push(['name', 'like', `%${purchase_invoice_number}%`]);
  }
  if (status) {
    conditions.push(['status', 'like', `%${status}%`]);
  }
  if (supplier) {
    conditions.push(['supplier', 'like', `%${supplier}%`]);
  }
  return useFrappeGetDocList('Purchase Invoice', {
    fields: ['*'],
    filters: conditions,
  });
};

// API Call to get purchase invoice details
export const getPurchaseInvoiceDetails = (invoice_number: string) => {
  return useFrappeGetDoc<PurchaseInvoiceType>('Purchase Invoice', invoice_number);
};
