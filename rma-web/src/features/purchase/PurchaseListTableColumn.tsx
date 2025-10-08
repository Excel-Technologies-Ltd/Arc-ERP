import AntTags from '@/components/Base/Tag/AntTag';
import { ColumnCurrency, ColumnLink, ColumnProgress } from '@/components/Table/TableColumnUi';
import { URLPurchaseDetails } from '@/router/routes.url';
import { PurchaseInvoice } from '@/types/Accounts/PurchaseInvoice';
import { TableColumn } from '@/types/Table/table-types';
import { getProgress, getStatusColor, getStatusText } from '@/utils/tableUtils';

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
      key: 'custom_excel_status',
      title: 'STATUS',
      render: (value) => {
        // const progress = getProgress(record.total_qty ?? 0, record.receipt_data);
        const color = getStatusColor(value.toString());
        const text = getStatusText(value.toString());
        return <AntTags color={color}>{text}</AntTags>;
      },
    },
    {
      key: 'progress',
      title: 'PROGRESS',
      render: (_, record) => {
        const progress = getProgress(record.total_qty ?? 0, record.receipt_data);
        return ColumnProgress(progress, record.status);
      },
    },
    { key: 'posting_date', title: 'POSTING DATE' },
    { key: 'supplier_name', title: 'SUPPLIER' },
    {
      key: 'total',
      title: 'TOTAL',
      render: (value) => ColumnCurrency(Number(value)),
    },
    { key: 'owner', title: 'CREATED BY' },
    {
      key: 'delivered_by',
      title: 'DELIVERED BY',
      render: (_, record) => {
        return record.receipt_data?.[0]?.modified_by ?? <div className='text-center'>-</div>;
      },
    },
  ];

  return TableHeader;
};
