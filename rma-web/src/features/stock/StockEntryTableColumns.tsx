import { URLStockEntryDetails } from '@/router/routes.url';
import { StockEntry } from '@/types/Stock/StockEntry';
import { TableColumn } from '@/types/Table/table-types';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

export const StockEntryTableColumns = (): TableColumn<StockEntry>[] => {
  return [
    {
      key: 'sl',
      title: 'SL',
      render: (_, __, index) => <span>{index + 1}</span>,
      width: '50px',
    },

    {
      key: 'name',
      title: 'Name',
      render: (value) => (
        <Link
          to={`${URLStockEntryDetails(value.toString())}`}
          className='underline decoration-dotted whitespace-nowrap underline-offset-2 text-info dark:text-light font-semibold'
        >
          {value}
        </Link>
      ),
    },
    {
      key: 'from_warehouse',
      title: 'From Warehouse',
    },
    {
      key: 'to_warehouse',
      title: 'To Warehouse',
    },
    {
      key: 'status',
      title: 'Status',
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            value === 'Pending'
              ? 'bg-yellow-100 text-yellow-800'
              : value === 'Posted'
                ? 'bg-green-100 text-green-800'
                : value === 'Cancelled'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-red-100 text-red-800'
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: 'created_by',
      title: 'Created By',
    },
    {
      key: 'territory',
      title: 'Territory',
    },
    {
      key: 'posting_date',
      title: 'Posting Date',
      render: (value) => (
        <div className='flex flex-col text-xs'>
          <span className='font-medium'>{dayjs(value).format('DD MMM, YYYY')}</span>
          <span className='text-primary dark:text-darkmode-50'>
            {dayjs(value).format('hh:mm A')}
          </span>
        </div>
      ),
    },
    {
      key: 'territory',
      title: 'Territory',
    },
    {
      key: 'remarks',
      title: 'Remarks',
    },
  ];
};
