import { parsePaginationParams } from '@/components/Pagination/pagination.utils';
import {
  GET_DELIVERED_SERIALS,
  GET_SERIAL_DETAILS,
  GET_SERIAL_HISTORY,
  GET_SERIAL_LIST,
} from '@/constants/api-strings';
import {
  FrappeGetCallDocResponse,
  FrappeGetCallListResponseWithCount,
  GetDeliveredSerialsFilterQueryType,
  MongoFilter,
  MongoOperators,
} from '@/types/common.types';
import {
  SerialListSearchFilterFormData,
  type SerialListSearchMongoQueryFilterTypes,
  SerialNoDataType,
  SerialNoHistoryType,
} from '@/types/pages/warranty';
import dayjs from 'dayjs';
import { SWRConfiguration, useFrappeGetCall } from 'frappe-react-sdk';
import { useSearchParams } from 'react-router-dom';

export const getSerialsList = (
  filterData: SerialListSearchFilterFormData | null,
  options?: SWRConfiguration
) => {
  const [searchParams] = useSearchParams();
  const { limit_start, pageSize } = parsePaginationParams(searchParams);

  const filterQuery = buildGetSerialMongoQuery(filterData);

  return useFrappeGetCall<FrappeGetCallListResponseWithCount<SerialNoDataType>>(
    GET_SERIAL_LIST,
    {
      filter_query: filterQuery,
      skip: limit_start,
      limit: pageSize,
    },
    `${GET_SERIAL_LIST}_${JSON.stringify(filterData)}`,
    options
  );
};

export const getSerialDetails = (serial_no: string, options?: SWRConfiguration) => {
  return useFrappeGetCall<FrappeGetCallDocResponse<SerialNoDataType>>(
    GET_SERIAL_DETAILS,
    {
      ...(serial_no && { serial_no: serial_no }),
    },
    `${GET_SERIAL_DETAILS}_${serial_no}`,
    options
  );
};

export const getSerialHistory = (serial_no: string | null, options?: SWRConfiguration) => {
  return useFrappeGetCall<FrappeGetCallDocResponse<SerialNoHistoryType[]>>(
    GET_SERIAL_HISTORY,
    {
      serial_no: serial_no,
    },
    `${GET_SERIAL_HISTORY}_${serial_no}`,
    options
  );
};

// Build MongoDB query for get serial list
const buildGetSerialMongoQuery = (filterData: SerialListSearchFilterFormData | null) => {
  if (!filterData) return null;

  const query: MongoFilter<SerialListSearchMongoQueryFilterTypes> = {
    item_code: null,
    warehouse: null,
  };

  // Text fields with regex
  if (filterData.serial_no) {
    query.serial_no = filterData.serial_no.trim();
  }
  if (filterData.item_name) {
    query.item_code = filterData.item_name.trim();
  }
  if (filterData.warehouse) {
    query.warehouse = filterData.warehouse.trim();
  }
  if (filterData.mac_address) {
    query.mac_no = filterData.mac_address.trim();
  }
  if (filterData.brand_name) {
    query.brand = filterData.brand_name.trim();
  }
  if (filterData.is_purchase) {
    query.purchase_invoice_name = { $exists: true };
    query.sales_invoice_name = { $exists: false };
  }
  if (filterData.is_sold) {
    query.sales_invoice_name = { $exists: true };
    query.purchase_invoice_name = { $exists: false };
  }

  // Date range
  if (filterData.date_range && filterData.date_range.length > 0) {
    const startDate = dayjs(filterData.date_range[0]).format('YYYY-MM-DD');
    const endDate = dayjs(filterData.date_range[1]).format('YYYY-MM-DD');

    query.purchase_date = { $gte: startDate, $lte: endDate } as MongoOperators<string>;
  }

  return Object.keys(query).length > 0 ? JSON.stringify(query) : null;
};

export const getDeliveredSerials = (
  filterQuery: GetDeliveredSerialsFilterQueryType,
  limitStart: number,
  pageSize: number,
  options?: SWRConfiguration
) => {
  return useFrappeGetCall<FrappeGetCallListResponseWithCount<SerialNoDataType>>(
    GET_DELIVERED_SERIALS,
    {
      filter_query: filterQuery,
      skip: limitStart,
      limit: pageSize,
    },
    `${GET_DELIVERED_SERIALS}_${JSON.stringify(filterQuery)}_${limitStart}_${pageSize}`,
    options
  );
};
