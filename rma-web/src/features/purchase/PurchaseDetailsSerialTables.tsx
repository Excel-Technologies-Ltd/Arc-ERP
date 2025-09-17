import { useState } from 'react';
import AntCustomTable from '@/components/Table/AntCustomTable';
import Button from '@/components/Base/Button';
import { DeleteOutlined } from '@ant-design/icons';
import { PurchaseInvoice } from '@/types/Accounts/PurchaseInvoice';
import {
  PurchaseDetailsProductTableColumns,
  PurchaseDetailsSerialTableColumns,
} from '@/features/purchase';
import { PurchaseInvoiceItem } from '@/types/Accounts/PurchaseInvoiceItem';

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

const PurchaseDetailsSerialTables = ({ data }: { data: PurchaseInvoice | undefined }) => {
  // State
  const [SerialtableData, setSerialtableData] = useState<SerialItemType[]>([]);

  // Serial Delete
  const handleSerialDelete = (key: string) => {
    setSerialtableData(SerialtableData.filter((i) => i.key !== key));
  };

  // Table Columns
  const ProductTableColumns = PurchaseDetailsProductTableColumns({
    setSerialtableData,
    SerialtableData,
  });
  const SerialTableColumns = PurchaseDetailsSerialTableColumns();

  return (
    <>
      <div className='w-full'>
        <AntCustomTable<PurchaseInvoiceItem>
          columns={ProductTableColumns}
          data={data?.items || []}
          title={() => <div className='text-lg font-bold text-center'>Product Items</div>}
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
          title={() => <div className='text-lg font-bold text-center'>Serial Items</div>}
          size='small'
        />
      </div>
    </>
  );
};

export default PurchaseDetailsSerialTables;
