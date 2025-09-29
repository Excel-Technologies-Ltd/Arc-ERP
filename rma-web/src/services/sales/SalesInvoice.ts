import { useFrappeCreateDoc, useFrappeGetCall, useFrappeGetDocList } from 'frappe-react-sdk';
import { GET_REMAINING_BALANCE } from '@/constants/api-strings';
import { COMPANY_NAME } from '@/constants/app-strings';
import { SalesInvoice } from '@/types/Accounts/SalesInvoice';
import { SALES_INVOICE } from '@/constants/doctype-strings';

// Add Sales Invoice
export const addSalesInvoice = () => {
  return useFrappeCreateDoc();
};

// get Customer Remaining Balance
export const getCustomerRemainingBalance = ({
  party_type,
  party,
}: {
  party_type: string;
  party: string;
}) => {
  return useFrappeGetCall<{ message: number }>(
    GET_REMAINING_BALANCE,
    {
      party_type,
      party,
      company: COMPANY_NAME,
      ignore_account_permission: true,
    },
    undefined,
    {
      isPaused: () => {
        return !party_type || !party;
      },
    }
  );
};

// get Sales Invoice List
export const getSalesInvoiceList = () => {
  return useFrappeGetDocList<SalesInvoice>(SALES_INVOICE, {
    fields: [
      'name',
      'status',
      'creation',
      'customer_name',
      'total',
      'territory',
      'remarks',
      'posting_date',
    ],
  });
};
