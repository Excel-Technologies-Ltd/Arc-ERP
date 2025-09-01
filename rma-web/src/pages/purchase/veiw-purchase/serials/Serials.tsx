import { useState } from 'react';
import AntCustomTable from '@/components/Table/AntCustomTable';
import { ProductTableColumns } from './table-column/ProducttableColumn';
import { SerialTableColumns } from './table-column/SerialTableColumn';
import Button from '@/components/Base/Button';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { PurchaseInvoice } from '@/types/Accounts/PurchaseInvoice';

export interface ProductDataType {
  key: string;
  item_code?: string;
  item_name: string;
  quantity: number;
  assigned: number;
  remaining: number;
  has_serial: boolean;
  warrenty_months: number;
}

export interface SerialItemType extends Pick<ProductDataType, 'key' | 'item_name' | 'quantity'> {
  item_code: string;
  warranty_date: Date;
  serials: string;
}

const Serials = ({ data }: { data: PurchaseInvoice | undefined }) => {
  // State
  const [SerialtableData, setSerialtableData] = useState<SerialItemType[]>([]);

  const handleAddSerial = (record: ProductDataType) => {
    console.log(record);
    const newSerial: SerialItemType = {
      key: record.key,
      item_code: record.item_code || '',
      item_name: record.item_name,
      quantity: record.quantity,
      warranty_date: new Date(),
      serials: '',
    };

    setSerialtableData([...SerialtableData, newSerial]);
  };

  const handleSerialDelete = (key: string) => {
    setSerialtableData(SerialtableData.filter((i) => i.key !== key));
  };

  return (
    <>
      <div className='w-full'>
        <AntCustomTable<ProductDataType>
          columns={[
            ...(ProductTableColumns || []),
            {
              title: 'Add Serial',
              key: 'add_serial',
              render: (_, record) => (
                <Button variant='outline-primary' onClick={() => handleAddSerial(record)}>
                  <PlusOutlined />
                </Button>
              ),
            },
          ]}
          data={
            data?.items?.map((i) => ({
              ...i,
              key: i.name,
              item_name: i.item_name,
              quantity: i.qty,
              assigned: 0,
              remaining: 0,
              has_serial: false,
              warrenty_months: 12,
            })) || []
          }
          loading={false}
          title={() => <div className='text-lg font-bold text-center'>Product Items</div>}
          pagination={false}
        />
      </div>

      <div className='mt-5 w-full'>
        <AntCustomTable<SerialItemType>
          columns={[
            ...(SerialTableColumns || []),
            {
              title: 'Actions',
              key: 'actions',
              render: (_, record) => {
                return (
                  <Button
                    onClick={() => handleSerialDelete(record.key)}
                    variant='outline-danger'
                    size='sm'
                  >
                    <DeleteOutlined />
                  </Button>
                );
              },
            },
          ]}
          data={SerialtableData?.map((i) => ({
            key: i.key,
            item_code: i.item_code,
            item_name: i.item_name,
            quantity: i.quantity,
            warranty_date: i.warranty_date,
            serials: i.serials,
          }))}
          loading={false}
          title={() => <div className='text-lg font-bold text-center'>Serial Items</div>}
          size='small'
        />
      </div>
    </>
  );
};

export default Serials;
