import {
  type Filter,
  useFrappeGetDoc,
  useFrappeGetDocCount,
  useFrappeGetDocList,
} from 'frappe-react-sdk';
import { PurchaseInvoice } from '@/types/Accounts/PurchaseInvoice';
import { parsePaginationParams } from '@/components/Pagination/pagination.utils';
import { useSearchParams } from 'react-router-dom';
import { PURCHASE_INVOICE } from '@/constants/doctype-strings';
import { PurchaseListFilterFormData } from '@/types/pages/purchase';
import dayjs from 'dayjs';

// API Call to get purchase orders
export const getPurchaseInvoiceList = ({
  invoice_number,
  status,
  supplier,
  date_range,
}: Pick<PurchaseListFilterFormData, 'invoice_number' | 'status' | 'supplier' | 'date_range'>) => {
  const [searchParams] = useSearchParams();
  const { limit_start, pageSize } = parsePaginationParams(searchParams);
  const formDate = date_range ? dayjs(date_range[0]).format('YYYY-MM-DD') : null;
  const toDate = date_range ? dayjs(date_range[1]).format('YYYY-MM-DD') : null;

  const conditions = [
    ...(invoice_number ? [['name', 'like', `%${invoice_number}%`] as Filter] : []),
    ...(status ? [['status', 'like', `%${status}%`] as Filter] : []),
    ...(supplier ? [['supplier', 'like', `%${supplier}%`] as Filter] : []),
    ...(formDate && toDate ? [['posting_date', 'between', [formDate, toDate]] as Filter] : []),
  ];

  const {
    data: purchaseInvoiceList,
    isLoading: isLoadingPurchaseInvoiceList,
    isValidating: isValidatingPurchaseInvoiceList,
    error: errorPurchaseInvoiceList,
  } = useFrappeGetDocList<PurchaseInvoice>(PURCHASE_INVOICE, {
    fields: ['*'],
    filters: conditions,
    limit: pageSize,
    limit_start: limit_start,
    orderBy: {
      field: 'creation',
      order: 'desc',
    },
  });

  const {
    data: PurchaseInvoicecount,
    isLoading: isLoadingPurchaseInvoicecount,
    isValidating: isValidatingPurchaseInvoicecount,
    error: errorPurchaseInvoicecount,
  } = useFrappeGetDocCount(PURCHASE_INVOICE, conditions);

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
  return useFrappeGetDoc<PurchaseInvoice>(PURCHASE_INVOICE, invoice_number);
};
