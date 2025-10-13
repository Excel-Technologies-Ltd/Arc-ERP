import { GET_SERIAL_LIST } from '@/constants/api-strings';
import { FrappeGetCallListResponseWithCount } from '@/types/common.types';
import { SerialListSearchFilterFormData, SerialNoDataType } from '@/types/pages/warranty';
import { useFrappeGetCall } from 'frappe-react-sdk';

export const getSerialsList = (filterData: SerialListSearchFilterFormData | null) => {
  const { serial_no, item_name, warehouse } = filterData || {};

  // Build MongoDB query object
  let filter_query: any;

  if (serial_no) {
    filter_query = '{"warehouse": "Bogura Bad Stock - ETL", "item_code": "ARCHER C20 AC750"}';
  }
  //   if (item_name) {
  //     filters.item_name = { $regex: item_name, $options: 'i' }; // Case-insensitive search
  //   }
  //   if (warehouse) {
  //     filters.warehouse = warehouse; // Exact match
  //   }

  // Only set filter_query if at least one filter exists
  //   const filter_query = Object.keys(filters).length > 0 ? JSON.stringify(filters) : undefined;

  // Create unique SWR key based on filter_query for proper caching
  const swrKey = filter_query ? `${GET_SERIAL_LIST}-${filter_query}` : null;

  return useFrappeGetCall<FrappeGetCallListResponseWithCount<SerialNoDataType>>(
    GET_SERIAL_LIST,
    {
      filter_query: filter_query,
      skip: 0,
      limit: 10,
    },
    swrKey
  );
};
