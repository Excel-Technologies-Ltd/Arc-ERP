import { useState } from 'react';
import { getWarehouseList } from '@/services/common/commonApi';
import AntCustomTable from '@/components/Table/AntCustomTable';
import { ProductTableColumns } from './table-column/ProducttableColumn';
import { SerialTableColumns } from './table-column/SerialTableColumn';
import Button from '@/components/Base/Button';

export interface ProductDataType {
  key: string;
  item_name: string;
  quantity: number;
  assigned: number;
  remaining: number;
  has_serial: boolean;
  warrenty_months: number;
}

export interface SerialItemType extends Pick<ProductDataType, 'key' | 'item_name' | 'quantity'> {
  serial_no: string;
  item_code: string;
  warranty_date: Date;
  serials: string;
}

const Serials = ({ data }: { data: any }) => {
  // Api Call
  const { data: warehouseList, isLoading: isLoadingWarehouses } = getWarehouseList();

  // State
  const [SerialtableData, setSerialtableData] = useState<SerialItemType[]>([]);

  const handleAddSerial = () => {
    const newSerial: SerialItemType = {
      key: Math.random().toString(36).substring(2, 15),
      item_code: '1521252',
      serial_no: `SN-${Date.now()}`,
      item_name: 'Tp-Link Archer C20',
      quantity: 1,
      warranty_date: new Date(),
      serials: '',
    };

    setSerialtableData([...SerialtableData, newSerial]);
  };

  return (
    <div>
      <div className='mt-5 w-full'>
        <AntCustomTable<ProductDataType>
          columns={ProductTableColumns || []}
          data={data?.items?.map((i: any) => ({
            key: i.name,
            item_name: i.item_name,
            quantity: i.qty,
            assigned: 0,
            remaining: 0,
            has_serial: false,
            warrenty_months: 12,
          }))}
          loading={false}
          title={() => <div className='text-lg font-bold text-center'>Product Items</div>}
        />
      </div>

      <Button variant='primary' size='sm' onClick={handleAddSerial}>
        Add Serial
      </Button>

      <div className='mt-5 w-full'>
        <AntCustomTable<SerialItemType>
          columns={SerialTableColumns}
          data={SerialtableData?.map((i) => ({
            key: i.key,
            item_code: i.item_code,
            serial_no: i.serial_no,
            item_name: i.item_name,
            quantity: i.quantity,
            warranty_date: i.warranty_date,
            serials: i.serials,
          }))}
          loading={false}
          title={() => <div className='text-lg font-bold text-center'>Serial Items</div>}
          size='small'
          pagination={false}
          scroll={{ y: 300 }}
        />
      </div>
    </div>
  );
};

export default Serials;
