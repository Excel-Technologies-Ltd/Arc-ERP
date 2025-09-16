import { ColumnCurrency, ColumnLink, ColumnProgress } from '@/components/Table/TableColumnUi';
import { URLPurchaseDetails } from '@/router/routes.url';
import { PurchaseInvoice } from '@/types/Accounts/PurchaseInvoice';
import { TableColumn } from '@/types/Table/table-types';

export const PurchaseListTableColumn = () => {
  const TableHeader: TableColumn<PurchaseInvoice>[] = [
    {
      key: 'sl',
      title: 'SL',
      render: (_, __, index) => <span>{index + 1}</span>,
    },
    {
      key: 'name',
      title: 'INVOICE NO',
      render: (value) => ColumnLink(URLPurchaseDetails(value.toString()), value.toString()),
    },
    {
      key: 'status',
      title: 'STATUS',
      render: (status, record) => {
        console.log(record);
        return (
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
        );
      },
    },
    {
      key: 'progress',
      title: 'PROGRESS',
      render: () => ColumnProgress(0.5),
    },
    { key: 'posting_date', title: 'POSTING DATE' },
    { key: 'supplier_name', title: 'SUPPLIER' },
    {
      key: 'total',
      title: 'TOTAL',
      render: (value) => ColumnCurrency(Number(value)),
    },
    { key: 'owner', title: 'CREATED BY' },
    { key: 'delivered_by', title: 'DELIVERED BY' },
  ];

  return TableHeader;
};
