import AntButton from '@/components/Base/Button/AntButton';
import AntCustomTable from '@/components/Table/AntCustomTable';
import { AddStockForm } from '@/features/stock';
import { useNotify } from '@/hooks/useNotify';
import { AddStockFormData } from '@/types/pages/stock';
import { ClearOutlined, PlusOutlined, SaveOutlined, SendOutlined } from '@ant-design/icons';
import { type TableProps } from 'antd';
import { useForm } from 'react-hook-form';

const AddStockEntry = () => {
  const notify = useNotify();
  const {
    control,
    watch,
    reset,
    handleSubmit: handleSubmitForm,
  } = useForm<AddStockFormData>({
    mode: 'onChange',
  });

  const [from, to] = watch(['from_range', 'to_range']);
  const total = from && to && +from <= +to ? +to - +from + 1 : 0;

  const handleClear = () => {
    reset();
  };

  const handleSubmit = (data: AddStockFormData) => {
    notify.open({
      message: 'Stock Entry Added Successfully',
      description: JSON.stringify(data),
    });
  };

  const ItemColumns: TableProps<any>['columns'] = [
    { key: 'item_name', title: 'Item Name', dataIndex: 'item_name' },
    { key: 'available_stock', title: 'Available Stock', dataIndex: 'available_stock' },
    { key: 'assigned', title: 'Assigned', dataIndex: 'assigned' },
    { key: 'qty', title: 'Qty', dataIndex: 'qty' },
    { key: 'has_serial', title: 'Has Serial', dataIndex: 'has_serial' },
    { key: 'add_serials', title: 'Add Serials', dataIndex: 'add_serials' },
    { key: 'actions', title: 'Actions', dataIndex: 'actions' },
  ];

  const TransferSerialColumns: TableProps<any>['columns'] = [
    { key: 'source_warehouse', title: 'Source Warehouse', dataIndex: 'source_warehouse' },
    { key: 'item_name', title: 'Item Name', dataIndex: 'item_name' },
    { key: 'quantity', title: 'Quantity', dataIndex: 'quantity' },
    { key: 'serials', title: 'Serials', dataIndex: 'serials' },
    { key: 'warranty_date', title: 'Warranty Date', dataIndex: 'warranty_date' },
    { key: 'actions', title: 'Actions', dataIndex: 'actions' },
  ];

  return (
    <div className='intro-y'>
      {/* Details Section */}
      <div className='flex justify-between items-center mt-5'>
        <h2 className='text-2xl text-primary font-bold'>Add Stock Entry</h2>
        <div className='flex gap-2 items-center'>
          <div className='text-lg text-primary font-semibold'>Total : {total}</div>
          <AntButton label='Save' icon={<SaveOutlined />} color='orange' variant='solid' />
          <AntButton
            label='Clear'
            icon={<ClearOutlined />}
            color='red'
            variant='solid'
            onClick={handleClear}
          />
          <AntButton
            label='Submit'
            icon={<SendOutlined />}
            type='primary'
            onClick={handleSubmitForm(handleSubmit)}
          />
        </div>
      </div>

      {/* Form Section */}
      <div className='mt-4'>
        <AddStockForm control={control} />
      </div>

      {/* Item Table */}
      <AntCustomTable
        className='mt-5'
        data={[]}
        columns={ItemColumns}
        title={() => (
          <div className='flex justify-between items-center'>
            <h3 className='text-lg font-bold text-center'>Items</h3>
            <AntButton label='Add Item' icon={<PlusOutlined />} />
          </div>
        )}
        pagination={false}
      />

      {/* Transfer Serial Columns*/}
      <AntCustomTable
        className='mt-5'
        data={[]}
        columns={TransferSerialColumns}
        title={() => <h3 className='text-lg font-bold'>Transfer Serials</h3>}
        pagination={false}
      />
    </div>
  );
};

export default AddStockEntry;
