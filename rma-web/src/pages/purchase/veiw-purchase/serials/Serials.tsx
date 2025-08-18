import { useState } from 'react';
import { Input } from 'antd';
import { useForm } from 'react-hook-form';
import { getWarehouseList } from '@/services/common/commonApi';
import AntSelect from '@/components/Base/Form/FormSelect/AntSelect';
import AntInput from '@/components/Base/Form/FormInput/AntInput';
import AntDatePicker from '@/components/DatePicker/AntDatePicker';
import { RenderController } from '@/lib/hook-form/RenderController';
import AntCustomTable from '@/components/Table/AntCustomTable';
import { type PurchaseInvoiceType } from '@/services/purchase/purchase';
import { ProductTableColumns } from './table-column/ProducttableColumn';
import { SerialTableColumns } from './table-column/SerialTableColumn';
import Button from '@/components/Base/Button';

type FormData = {
  warehouse: string | undefined;
  date: string;
  file: FileList | undefined;
  fromRange: string;
  toRange: string;
};

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

const Serials = ({ data }: { data: PurchaseInvoiceType }) => {
  // Api Call
  const { data: warehouseList, isLoading: isLoadingWarehouses } = getWarehouseList();

  // State
  const [SerialtableData, setSerialtableData] = useState<SerialItemType[]>([]);

  // From Handel
  const { control, watch } = useForm<FormData>({
    defaultValues: {
      warehouse: undefined,
      date: undefined,
      file: undefined,
      fromRange: '',
      toRange: '',
    },
  });

  const [from, to] = watch(['fromRange', 'toRange']);
  const total = from && to && +from <= +to ? +to - +from + 1 : 0;

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
      {/* Form Data Working */}
      <div className='p-5 bg-white rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4'>
        {RenderController<FormData>(
          control,
          'warehouse',
          <AntSelect
            placeholder='Select Warehouse'
            options={warehouseList?.map((w) => ({ value: w.name, label: w.warehouse_name }))}
            loading={isLoadingWarehouses}
            showSearch={false}
            notFoundText='No Warehouse Found'
          />
        )}

        {RenderController<FormData>(control, 'date', <AntDatePicker placeholder='Select Date' />)}
        {RenderController<FormData>(control, 'file', <Input type='file' />)}
        {RenderController<FormData>(
          control,
          'fromRange',
          <AntInput type='number' placeholder='From Range' />
        )}
        {RenderController<FormData>(
          control,
          'toRange',
          <AntInput type='number' placeholder='To Range' />
        )}
        <p className='text-lg text-primary'>Total : {total}</p>
      </div>

      {/* Products table Working */}
      <div className='mt-5 w-full'>
        <AntCustomTable<ProductDataType>
          columns={ProductTableColumns || []}
          data={data?.items?.map((i) => ({
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

      {/* Serial Table Working */}

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
        />
      </div>
    </div>
  );
};

export default Serials;
