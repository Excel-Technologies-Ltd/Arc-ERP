import { PurchaseInvoice } from '@/types/Accounts/PurchaseInvoice';
import { TableColumn } from '@/types/Table/table-types';
import { Link } from 'react-router-dom';

export const PurchaseTableColumn = () => {
  const TableHeader: TableColumn<PurchaseInvoice>[] = [
    {
      key: 'sl',
      title: 'SL',
      render: (_, __, index) => <span>{index + 1}</span>,
    },
    {
      key: 'name',
      title: 'INVOICE NO',
      render: (text) => (
        <Link
          to={`/purchase/view-purchase-invoice/${text}`}
          className='underline decoration-dotted whitespace-nowrap'
        >
          {text}
        </Link>
      ),
    },
    {
      key: 'status',
      title: 'STATUS',
      render: (status) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            status === 'completed'
              ? 'bg-green-100 text-green-800'
              : status === 'pending'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      key: 'progress',
      title: 'PROGRESS',
      render: () => (
        <div className='w-full bg-gray-200 rounded-full h-1.5'>
          <div
            className='bg-orange-500 h-1.5 rounded-full'
            style={{ width: `${Math.random() * 99}%` }}
          ></div>
        </div>
      ),
    },
    { key: 'posting_date', title: 'POSTING DATE' },
    { key: 'supplier', title: 'SUPPLIER' },
    {
      key: 'total',
      title: 'TOTAL',
      render: (total) => `$${Number(total).toFixed(2)}`,
    },
    { key: 'owner', title: 'CREATED BY' },
    { key: 'owner', title: 'DELIVERED BY' },
  ];

  return TableHeader;
};
