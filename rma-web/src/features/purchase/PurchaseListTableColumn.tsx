import AntTags from '@/components/Base/Tag/AntTag';
import {
  ColumnCurrency,
  ColumnDateTime,
  ColumnLink,
  ColumnProgress,
  ColumnSerialNumber,
} from '@/components/Table/TableColumnUi';
import { URLPurchaseDetails } from '@/router/routes.url';
import { PurchaseInvoice } from '@/types/Accounts/PurchaseInvoice';
import { TableColumn } from '@/types/Table/table-types';
import { getProgress, getStatusColor, getStatusText } from '@/utils/tableUtils';

export const PurchaseListTableColumn = (): TableColumn<PurchaseInvoice>[] => {
  return [
    {
      key: 'sl',
      title: 'SL',
      render: (_, __, index) => ColumnSerialNumber(index),
    },
    {
      key: 'name',
      title: 'Invoice No',
      render: (value) => ColumnLink(URLPurchaseDetails(value.toString()), value.toString()),
    },
    {
      key: 'custom_excel_status',
      title: 'Status',
      render: (value) => {
        const color = getStatusColor(value.toString());
        const text = getStatusText(value.toString());
        return <AntTags color={color}>{text}</AntTags>;
      },
    },
    {
      key: 'progress',
      title: 'Progress',
      render: (_, record) => {
        const progress = getProgress(record.total_qty ?? 0, record.receipt_data);
        return ColumnProgress(progress, record.status);
      },
    },
    {
      key: 'posting_date',
      title: 'Posting Date',
      render: (_, record) => {
        const value = `${record.posting_date} ${record.posting_time}`;
        return ColumnDateTime(value);
      },
    },
    { key: 'supplier_name', title: 'Supplier Name' },
    {
      key: 'total',
      title: 'Total',
      render: (value) => {
        return ColumnCurrency(Number(value));
      },
    },
    { key: 'owner', title: 'Created By' },
    {
      key: 'delivered_by',
      title: 'Completed By',
      render: (_, record) => {
        return record.receipt_data?.[0]?.modified_by ?? <div className='text-center'>-</div>;
      },
    },
  ];
};
