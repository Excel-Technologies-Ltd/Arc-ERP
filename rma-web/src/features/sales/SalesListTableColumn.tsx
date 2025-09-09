import { ColumnDateTime, ColumnLink, ColumnProgress } from '@/components/Table/TableColumnUi';
import { URLSalesDetails } from '@/router/routes.url';
import { SalesInvoice } from '@/types/Accounts/SalesInvoice';
import { TableColumn } from '@/types/Table/table-types';
import { formatCurrency } from '@/utils/helper';

export const SalesListTableColumn = (): TableColumn<SalesInvoice>[] => {
  return [
    {
      key: 'sl',
      title: 'SL',
      render: (_, __, index) => <span>{index + 1}</span>,
    },

    {
      key: 'name',
      title: 'Invoice No',
      render: (text) => ColumnLink(URLSalesDetails(text.toString()), text.toString()),
    },
    {
      key: 'status',
      title: 'Status',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs text-lime-800 bg-lime-50`}>{value}</span>
      ),
    },
    {
      key: 'creation',
      title: 'Invoice Date',
      render: (value) => ColumnDateTime(value.toString()),
    },
    {
      key: 'customer_name',
      title: 'Customer Name',
    },
    {
      key: 'total',
      title: 'Invoice Amount',
      render: (value) => formatCurrency(value),
    },
    {
      key: 'progress',
      title: 'Progress',
      render: () => ColumnProgress(Math.random() * 0.9),
    },
    {
      key: 'territory',
      title: 'Territory',
    },
    {
      key: 'remarks',
      title: 'Remarks',
    },
    {
      key: 'delivered_by',
      title: 'Delivered By',
    },
    {
      key: 'posting_date',
      title: 'Posting Date',
      render: (value) => ColumnDateTime(value.toString()),
    },
  ];
};
