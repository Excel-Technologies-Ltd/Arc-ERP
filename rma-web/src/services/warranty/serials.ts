import { parsePaginationParams } from '@/components/Pagination/pagination.utils';
import { GET_SERIAL_DETAILS, GET_SERIAL_HISTORY, GET_SERIAL_LIST } from '@/constants/api-strings';
import {
  FrappeGetCallDocResponse,
  FrappeGetCallListResponseWithCount,
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
import { useFrappeGetCall } from 'frappe-react-sdk';
import { useSearchParams } from 'react-router-dom';

export const getSerialsList = (filterData: SerialListSearchFilterFormData | null) => {
  const [searchParams] = useSearchParams();
  const { limit_start, pageSize } = parsePaginationParams(searchParams);

  // Build MongoDB query directly
  const buildMongoQuery = () => {
    if (!filterData) return null;

    const query: MongoFilter<SerialListSearchMongoQueryFilterTypes> = {};

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
      query.purchase_document_no = { $exists: true };
      query.purchase_invoice_name = { $exists: true };
    }
    if (filterData.is_sold) {
      query.sales_invoice_name = { $exists: true };
      query.delivery_note = { $exists: true };
      query.customer = { $exists: true };
    }

    // Date range
    if (filterData.date_range && filterData.date_range.length > 0) {
      const startDate = dayjs(filterData.date_range[0]).format('YYYY-MM-DD');
      const endDate = dayjs(filterData.date_range[1]).format('YYYY-MM-DD');

      query.purchase_date = { $gte: startDate, $lte: endDate } as MongoOperators<string>;
    }

    return Object.keys(query).length > 0 ? JSON.stringify(query) : null;
  };

  const filterQuery = buildMongoQuery();

  return useFrappeGetCall<FrappeGetCallListResponseWithCount<SerialNoDataType>>(GET_SERIAL_LIST, {
    filter_query: filterQuery,
    skip: limit_start,
    limit: pageSize,
  });
};

export const getSerialDetails = (serial_no: string | null) => {
  return useFrappeGetCall<FrappeGetCallDocResponse<SerialNoDataType>>(
    GET_SERIAL_DETAILS,
    {
      serial_no: serial_no,
    },
    undefined,
    {
      isPaused: () => !serial_no,
    }
  );
};

export const getSerialHistory = (serial_no: string | null) => {
  return useFrappeGetCall<FrappeGetCallDocResponse<SerialNoHistoryType[]>>(
    GET_SERIAL_HISTORY,
    {
      serial_no: serial_no,
    },
    undefined,
    {
      isPaused: () => !serial_no,
    }
  );
};
