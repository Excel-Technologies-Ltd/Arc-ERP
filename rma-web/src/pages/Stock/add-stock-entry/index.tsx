import AntButton from '@/components/Base/Button/AntButton';
import AntInput from '@/components/Base/Form/FormInput/AntInput';
import AntSelect from '@/components/Base/Form/FormSelect/AntSelect';
import AntCustomTable from '@/components/Table/AntCustomTable';
import { AddStockForm } from '@/features/stock';
import { useNotify } from '@/hooks/useNotify';
import { AddStockFormData } from '@/types/pages/stock';
import {
  ClearOutlined,
  DeleteOutlined,
  PlusOutlined,
  SaveOutlined,
  SendOutlined,
} from '@ant-design/icons';
import { Tag, type TableProps } from 'antd';
import { useFieldArray, useForm } from 'react-hook-form';

const AddStockEntry = () => {
  const notify = useNotify();
  const {
    control,
    watch,
    reset,
    handleSubmit: handleSubmitForm,
    setValue,
    getValues,
  } = useForm<AddStockFormData>({
    mode: 'onChange',
    defaultValues: {
      items: [],
      transferSerials: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const {
    fields: transferSerialsFields,
    append: appendTransferSerials,
    remove: removeTransferSerials,
  } = useFieldArray({
    control,
    name: 'transferSerials',
  });

  const [from, to] = watch(['from_range', 'to_range']);
  const total = from && to && +from <= +to ? +to - +from + 1 : 0;

  const handleClear = () => {
    reset({
      items: [],
      transferSerials: [],
    });
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
            onClick={() => handleRemoveItem(record.id)}
          />
        </div>
      ),
    },
  ];

  const TransferSerialColumns: TableProps<any>['columns'] = [
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

  const handleAddItem = (itemValue: string) => {
    const newItem: any = {
      id: Date.now().toString(),
      item_name: itemValue,
      available_stock: '0',
      assigned: '0',
      qty: '1',
      has_serial: false,
      add_serials: false,
    };

    append(newItem);
  };

  const handleRemoveItem = (index: number) => {
    remove(index);
  };

  const handleItemChange = (index: number, field: keyof any, value: any) => {
    const currentItems = getValues('items');
    const updatedItems = [...currentItems];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    };
    setValue('items', updatedItems);
  };

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
        data={fields}
        columns={ItemColumns}
        title={() => (
          <div className='flex justify-between items-center'>
            <h3 className='text-lg font-bold text-center'>Items</h3>
            <AntSelect
              placeholder='Add Item'
              notFoundText='No Item Found'
              style={{
                width: 200,
              }}
              options={Array.from({ length: 100 }, (_, i) => ({
                value: `Item ${i + 1}`,
                label: `Item ${i + 1}`,
              }))}
              onSelect={handleAddItem}
            />
          </div>
        )}
        pagination={false}
      />

      {/* Transfer Serial Columns*/}
      <AntCustomTable
        className='mt-5'
        data={transferSerialsFields}
        columns={TransferSerialColumns}
        title={() => <h3 className='text-lg font-bold'>Transfer Serials</h3>}
        pagination={false}
      />
    </div>
  );
};

export default AddStockEntry;
