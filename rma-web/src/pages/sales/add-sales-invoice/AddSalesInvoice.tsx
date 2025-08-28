import dayjs, { Dayjs } from 'dayjs';
import { useForm } from 'react-hook-form';
import AddSalesForm from './AddSalesForm';
import AntButton from '@/components/Base/Button/AntButton';
import { ClearOutlined, DeleteOutlined, PlusOutlined, SendOutlined } from '@ant-design/icons';
import { useNotify } from '@/hooks/useNotify';
import AntCustomTable from '@/components/Table/AntCustomTable';
import { useState } from 'react';
import Button from '@/components/Base/Button';
import { AddSalesTableColumns } from './AddSalesTableColumns';

export type AddSalesFormData = {
  customer_name: string;
  posting_date: Dayjs | undefined;
  customer_address: string;
  warehouse_name: string;
  due_date: Dayjs | undefined;
  branch_name: string;
  remarks: string;
};

export interface TableDataType {
  item_name: string;
  available_stock: number | string;
  quantity: number;
  rate: number;
  total: number;
}

const AddSalesInvoice = () => {
  const notify = useNotify();
  const [tableData, setTableData] = useState<TableDataType[]>([]);
  const {
    control,
    watch,
    reset,
    handleSubmit: submitForm,
  } = useForm<AddSalesFormData>({
    mode: 'onChange',
    resetOptions: {
      keepDirtyValues: true,
    },
    defaultValues: {
      posting_date: dayjs(),
    },
  });

  const handleClear = () => {
    reset();
  };

  const handleSubmit = (data: AddSalesFormData) => {
    notify.open({
      message: 'Sales Invoice Submitted',
      description: `Selected Values: ${JSON.stringify(data)}`,
    });
  };

  const handleAddItem = () => {
    const newItem: TableDataType = {
      item_name: `Item ${tableData.length + 1}`,
      available_stock: 'First Select Item Name',
      quantity: Math.ceil(Math.random() * 10),
      rate: Math.ceil(Math.random() * 100),
      total: Math.ceil(Math.random() * 10000),
    };
    setTableData([...tableData, newItem]);
  };

  const handleDeleteItem = (record: TableDataType) => {
    setTableData(tableData.filter((item) => item !== record));
  };

  return (
    <div>
      {/* Details Section */}
      <div className='flex justify-between items-center mt-5'>
        <h2 className='text-2xl font-bold'>Details</h2>
        <div className='flex gap-2 items-center'>
          <div className='text-lg font-semibold'>Remaining Balance : 0</div>
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
            onClick={submitForm(handleSubmit)}
          />
        </div>
      </div>
      {/* Form Section */}
      <AddSalesForm control={control} />

      {/* Table Section */}
      <AntCustomTable<TableDataType>
        className='mt-5 drop-shadow-md'
        columns={[
          ...(AddSalesTableColumns || []),
          {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
              <Button onClick={() => handleDeleteItem(record)} variant='outline-danger' size='sm'>
                <DeleteOutlined />
              </Button>
            ),
          },
        ]}
        data={tableData}
        loading={false}
        title={() => (
          <>
            <div className='flex justify-between items-center px-2'>
              <div className='text-lg font-bold'>Items</div>
              <AntButton label='Add Item' icon={<PlusOutlined />} onClick={handleAddItem} />
            </div>
          </>
        )}
        footer={() => (
          <div className='flex justify-end items-center'>
            <div className='text-lg font-bold'>Total : </div>
            <div className='text-lg font-bold ml-2'>
              {tableData.reduce((acc, curr) => acc + curr.total, 0)}
            </div>
          </div>
        )}
        scroll={{ y: 400 }}
        pagination={false}
      />
    </div>
  );
};

export default AddSalesInvoice;
