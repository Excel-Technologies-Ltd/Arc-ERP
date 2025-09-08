import { useFrappeCreateDoc, useFrappeGetCall } from 'frappe-react-sdk';
import { GET_REMAINING_BALANCE } from '@/constants/url-strings';
import { COMPANY_NAME } from '@/constants/app-strings';

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
