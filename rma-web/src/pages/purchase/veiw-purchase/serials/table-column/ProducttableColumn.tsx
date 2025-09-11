import { type TableProps } from 'antd/es/table';
import { ProductDataType } from '../Serials';

export const ProductTableColumns: TableProps<ProductDataType>['columns'] = [
  {
    title: 'Item Name',
    dataIndex: 'item_name',
    key: 'item_name',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Assigned',
    dataIndex: 'assigned',
    key: 'assigned',
  },
  {
    title: 'Remaining',
    dataIndex: 'remaining',
    key: 'remaining',
  },
  {
    title: 'Has Serial',
    dataIndex: 'has_serial',
    key: 'has_serial',
    render: (_, record) => (record.has_serial ? 'Yes' : 'No'),
  },
  {
    title: 'Warrenty Months',
    dataIndex: 'warrenty_months',
    key: 'warrenty_months',
  },
];
