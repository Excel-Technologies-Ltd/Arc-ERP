import {
  type Filter,
  useFrappeGetDoc,
  useFrappeGetDocCount,
  useFrappeGetDocList,
} from 'frappe-react-sdk';
import { PurchaseInvoice } from '@/types/Accounts/PurchaseInvoice';
import { parsePaginationParams } from '@/components/Pagination/pagination.utils';
import { useSearchParams } from 'react-router-dom';

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
  const [searchParams] = useSearchParams();
  const { limit_start, pageSize } = parsePaginationParams(searchParams);

  const conditions: Filter[] = [
    ...(purchase_invoice_number
      ? [['name', 'like', `%${purchase_invoice_number}%`] as Filter]
      : []),
    ...(status ? [['status', 'like', `%${status}%`] as Filter] : []),
    ...(supplier ? [['supplier', 'like', `%${supplier}%`] as Filter] : []),
  ];

  const {
    data: purchaseInvoiceList,
    isLoading: isLoadingPurchaseInvoiceList,
    isValidating: isValidatingPurchaseInvoiceList,
    error: errorPurchaseInvoiceList,
  } = useFrappeGetDocList<PurchaseInvoice>('Purchase Invoice', {
    fields: ['*'],
    filters: conditions,
    limit: pageSize,
    limit_start: limit_start,
  });

  const {
    data: PurchaseInvoicecount,
    isLoading: isLoadingPurchaseInvoicecount,
    isValidating: isValidatingPurchaseInvoicecount,
    error: errorPurchaseInvoicecount,
  } = useFrappeGetDocCount('Purchase Invoice', conditions);

  return {
    data: purchaseInvoiceList,
    isLoading: isLoadingPurchaseInvoiceList || isLoadingPurchaseInvoicecount,
    isValidating: isValidatingPurchaseInvoiceList || isValidatingPurchaseInvoicecount,
    error: errorPurchaseInvoiceList || errorPurchaseInvoicecount,
    total: PurchaseInvoicecount,
  };
};

// API Call to get purchase invoice details
export const getPurchaseInvoiceDetails = (invoice_number: string) => {
  return useFrappeGetDoc<PurchaseInvoice>('Purchase Invoice', invoice_number);
};
