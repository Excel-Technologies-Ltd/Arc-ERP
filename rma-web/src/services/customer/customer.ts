import { Customer } from '@/types/Selling/Customer';
import { useFrappeGetDoc, useFrappeGetDocList } from 'frappe-react-sdk';

// Api Call to get customer list
export const getCustomerList = () => {
  return useFrappeGetDocList<Customer>('Customer', {
    fields: ['*'],
  });
};

// Api Call to get customer document
export const getCustomerDocument = (name: string) => {
  return useFrappeGetDoc<Customer>('Customer', name);
};
