import AntTags from '@/components/Base/Tag/AntTag';
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
      render: (status) => {
        const getColor = (status: string) => {
          switch (status) {
            case 'Cancelled':
              return 'red';
            case 'Submitted':
              return 'green';
            default:
              return 'blue';
          }
        };
        const getText = (status: string) => {
          switch (status) {
            case 'Cancelled':
              return 'Cancelled';
            case 'Submitted':
              return 'Submitted';
            default:
              return status;
          }
        };
        return <AntTags color={getColor(status.toString())}>{getText(status.toString())}</AntTags>;
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
