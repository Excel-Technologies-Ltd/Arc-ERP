import AntInput from '@/components/Base/Form/FormInput/AntInput';
import AntSelect from '@/components/Base/Form/FormSelect/AntSelect';
import { type TableProps } from 'antd/es/table';
import { AddSalesItemTableDataType } from '@/types/pages/sales';

export const AddSalesTableColumns: TableProps<AddSalesItemTableDataType>['columns'] = [
  {
    title: 'Item',
    dataIndex: 'item_name',
    key: 'item_name',
    render: () => <AntSelect placeholder='Select Item' options={itemOptions} size='middle' />,
  },
  {
    title: 'Available Stock',
    dataIndex: 'available_stock',
    key: 'available_stock',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
    render: () => <AntInput type='number' placeholder='Enter Quantity' size='middle' />,
  },
  {
    title: 'Rate',
    dataIndex: 'rate',
    key: 'rate',
    render: () => <AntInput type='number' placeholder='Enter Rate' size='middle' />,
  },
  {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
  },
];

// Mock data for items
export const itemOptions = [
  {
    id: 1,
    value: 'item_001',
    label: 'Laptop Pro 15"',
    rate: 1299.99,
    available_stock: 42,
  },
  {
    id: 2,
    value: 'item_002',
    label: 'Wireless Mouse',
    rate: 29.99,
    available_stock: 156,
  },
  {
    id: 3,
    value: 'item_003',
    label: 'Mechanical Keyboard',
    rate: 89.99,
    available_stock: 78,
  },
  {
    id: 4,
    value: 'item_004',
    label: 'Monitor 27" 4K',
    rate: 499.99,
    available_stock: 23,
  },
  {
    id: 5,
    value: 'item_005',
    label: 'Webcam HD',
    rate: 59.99,
    available_stock: 91,
  },
];
