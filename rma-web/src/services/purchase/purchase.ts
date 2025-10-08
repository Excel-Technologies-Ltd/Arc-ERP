import { type Filter, useFrappeGetCall, useFrappePostCall } from 'frappe-react-sdk';
import { type PurchaseInvoice, type PurchaseReceiptItem } from '@/types/Accounts/PurchaseInvoice';
import { parsePaginationParams } from '@/components/Pagination/pagination.utils';
import { useSearchParams } from 'react-router-dom';
import { PurchaseListFilterFormData } from '@/types/pages/purchase';
import dayjs from 'dayjs';
import {
  GET_PURCHASE_INVOICE_DETAILS,
  GET_PURCHASE_INVOICE_LIST,
  POST_SERIAL_ASSIGN,
} from '@/constants/api-strings';
import { FrappeGetCallDocResponse, FrappeGetCallListResponseWithCount } from '@/types/common.types';
import { PURCHASE_INVOICE_LIST_FIELDS } from '@/constants/api-fields';

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
    ...(status ? [['custom_excel_status', 'like', `%${status}%`] as Filter] : []),
    ...(supplier ? [['supplier', 'like', `%${supplier}%`] as Filter] : []),
    ...(formDate && toDate ? [['posting_date', 'between', [formDate, toDate]] as Filter] : []),
  ];

  const {
    data: purchaseInvoiceList,
    isLoading: isLoadingPurchaseInvoiceList,
    isValidating: isValidatingPurchaseInvoiceList,
    error: errorPurchaseInvoiceList,
  } = useFrappeGetCall<FrappeGetCallListResponseWithCount<PurchaseInvoice>>(
    GET_PURCHASE_INVOICE_LIST,
    {
      fields: PURCHASE_INVOICE_LIST_FIELDS,
      filters: conditions,
      limit: pageSize,
      limit_start: limit_start,
      orderBy: {
        field: 'creation',
        order: 'desc',
      },
    }
  );

  return {
    data: purchaseInvoiceList?.message.data,
    isLoading: isLoadingPurchaseInvoiceList,
    isValidating: isValidatingPurchaseInvoiceList,
    error: errorPurchaseInvoiceList,
    total: purchaseInvoiceList?.message.count,
  };
};

// API Call to get purchase invoice details
export const getPurchaseInvoiceDetails = (invoice_number: string) => {
  const callData = useFrappeGetCall<FrappeGetCallDocResponse<PurchaseInvoice>>(
    GET_PURCHASE_INVOICE_DETAILS,
    {
      purchase_invoice: invoice_number,
    }
  );
  return callData;
};

// Api Call to post serial assign
export const postSerialAssign = () => {
  return useFrappePostCall(POST_SERIAL_ASSIGN);
};
