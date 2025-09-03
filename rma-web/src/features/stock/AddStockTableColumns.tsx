import AntInput from '@/components/Base/Form/FormInput/AntInput';
import { Tag } from 'antd';
import AntButton from '@/components/Base/Button/AntButton';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { type TableProps } from 'antd/es/table';
import { UseFieldArrayRemove } from 'react-hook-form';

interface ItemTableColumnsProps {
  handleItemChange: (index: number, field: string, value: string) => void;
  appendTransferSerials: (record: any) => void;
  remove: UseFieldArrayRemove;
}

// Item Table Columns
export const ItemTableColumns = ({
  handleItemChange,
  appendTransferSerials,
  remove,
}: ItemTableColumnsProps): TableProps<any>['columns'] => {
  return [
    { key: 'item_name', title: 'Item Name', dataIndex: 'item_name' },
    { key: 'available_stock', title: 'Available Stock', dataIndex: 'available_stock' },
    { key: 'assigned', title: 'Assigned', dataIndex: 'assigned' },
    {
      key: 'qty',
      title: 'Qty',
      dataIndex: 'qty',
      render: (_, __, index) => (
        <AntInput
          type='number'
          placeholder='Enter Quantity'
          onChange={(e) => {
            handleItemChange(index, 'qty', e.target.value);
          }}
          size='small'
        />
      ),
    },
    {
      key: 'has_serial',
      title: 'Has Serial',
      dataIndex: 'has_serial',
      render: (_, record) => (
        <Tag color={record.has_serial ? 'green' : 'red'}>{record.has_serial ? 'Yes' : 'No'}</Tag>
      ),
    },
    {
      key: 'add_serials',
      title: 'Add Serials',
      dataIndex: 'add_serials',
      render: () => (
        <AntButton
          size='middle'
          icon={<PlusOutlined />}
          onClick={() =>
            appendTransferSerials({
              source_warehouse: 'Baridhara Warehouse',
              item_name: 'Tp Link',
              quantity: '10',
              serials: '1234567890',
              warranty_date: '10/10/2025',
            })
          }
        />
      ),
    },
    {
      key: 'actions',
      title: 'Actions',
      dataIndex: 'actions',
      render: (_, record) => (
        <div className='flex gap-2'>
          <AntButton
            size='small'
            icon={<DeleteOutlined />}
            color='danger'
            variant='solid'
            onClick={() => remove(record.id)}
          />
        </div>
      ),
    },
  ];
};

// Serial Table Columns
export const SerialTableColumn = ({
  removeTransferSerials,
}: {
  removeTransferSerials: UseFieldArrayRemove;
}): TableProps<any>['columns'] => {
  return [
    { key: 'source_warehouse', title: 'Source Warehouse', dataIndex: 'source_warehouse' },
    { key: 'item_name', title: 'Item Name', dataIndex: 'item_name' },
    { key: 'quantity', title: 'Quantity', dataIndex: 'quantity' },
    { key: 'serials', title: 'Serials', dataIndex: 'serials' },
    { key: 'warranty_date', title: 'Warranty Date', dataIndex: 'warranty_date' },
    {
      key: 'actions',
      title: 'Actions',
      dataIndex: 'actions',
      render: (_, record) => (
        <div className='flex gap-2'>
          <AntButton
            size='small'
            icon={<DeleteOutlined />}
            color='danger'
            variant='solid'
            onClick={() => removeTransferSerials(record.id)}
          />
        </div>
      ),
    },
  ];
};
