import { parsePaginationParams } from '@/components/Pagination/pagination.utils';
import { Customer } from '@/types/Selling/Customer';
import { useFrappeGetDoc, useFrappeGetDocCount, useFrappeGetDocList } from 'frappe-react-sdk';
import { useSearchParams } from 'react-router-dom';

// Api Call to get customer list
export const getCustomerList = () => {
  const [searchParams] = useSearchParams();
  const { limit_start, pageSize } = parsePaginationParams(searchParams);

  // get Customer Get Data
  const {
    data: customerList,
    isLoading: isLoadingCustomerList,
    isValidating: isValidatingCustomerList,
    error: errorCustomerList,
  } = useFrappeGetDocList<Customer>('Customer', {
    fields: [
      'name',
      'customer_name',
      'territory',
      'excel_remaining_balance',
      'custom_other_brands_limit',
    ],
    orderBy: {
      field: 'name',
      order: 'asc',
    },
    limit: pageSize,
    limit_start: limit_start,
  });

  // get Customer Count Data
  const {
    data: Customercount,
    isLoading: isLoadingCustomercount,
    isValidating: isValidatingCustomercount,
    error: errorCustomercount,
  } = useFrappeGetDocCount('Customer');

  // return data
  return {
    data: customerList,
    isLoading: isLoadingCustomerList || isLoadingCustomercount,
    isValidating: isValidatingCustomerList || isValidatingCustomercount,
    error: errorCustomerList || errorCustomercount,
    total: Customercount,
  };
};

// Api Call to get customer document
export const getCustomerDocument = (name: string) => {
  return useFrappeGetDoc<Customer>('Customer', name, `name:${name}`, {
    isPaused: () => !name,
  });
};
