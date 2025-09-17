import { Popconfirm, Tag, type TableProps } from 'antd';
import { PurchaseInvoiceItem } from '@/types/Accounts/PurchaseInvoiceItem';
import Button from '@/components/Base/Button';
import { PlusOutlined } from '@ant-design/icons';
import { SerialItemType } from './PurchaseDetailsSerialTables';
import { AntInput } from '@/components/Base/Form';

export const PurchaseDetailsProductTableColumns = ({
  setSerialtableData,
  SerialtableData,
}: {
  setSerialtableData: (data: SerialItemType[]) => void;
  SerialtableData: SerialItemType[];
}): TableProps<PurchaseInvoiceItem>['columns'] => {
  const handleAddSerial = (record: PurchaseInvoiceItem) => {
    const newSerial: SerialItemType = {
      key: record.name,
      item_code: record.item_code || '',
      item_name: record.item_name,
      quantity: record.qty,
      warranty_date: new Date(),
      serials: '',
    };

    setSerialtableData([...SerialtableData, newSerial]);
  };

  return [
    {
      title: 'Item Name',
      dataIndex: 'item_name',
      key: 'item_name',
    },
    {
      title: 'Quantity',
      dataIndex: 'qty',
      key: 'qty',
    },
    {
      title: 'Assigned',
      dataIndex: 'received_qty',
      key: 'received_qty',
    },
    {
      title: 'Remaining',
      dataIndex: 'remaining',
      key: 'remaining',
      render: (_, record) => {
        return record.qty - (record.received_qty || 0);
      },
    },
    {
      title: 'Has Serial',
      dataIndex: 'custom_has_excel_serial',
      key: 'custom_has_excel_serial',
      render: (value) => {
        const yes = value === 'Yes';
        return <Tag color={yes ? 'green' : 'red'}>{yes ? 'Yes' : 'No'}</Tag>;
      },
    },
    {
      title: 'Warrenty Months',
      dataIndex: 'warrenty_months',
      key: 'warrenty_months',
    },
    {
      title: 'Add Serial',
      key: 'add_serial',
      render: (_, record) => (
        <Popconfirm
          title='Enter Assigned Numbers!'
          description={() => {
            return <AntInput type='number' placeholder='Enter Assigned Number' size='middle' />;
          }}
          onConfirm={() => handleAddSerial(record)}
          okText='Submit'
          showCancel={false}
          placement='left'
        >
          <Button
            disabled={
              record.custom_has_excel_serial === 'No' || record.custom_has_excel_serial === ''
            }
            variant='outline-primary'
          >
            <PlusOutlined />
          </Button>
        </Popconfirm>
      ),
    },
  ];
};
