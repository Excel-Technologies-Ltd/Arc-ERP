import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import AntButton from '@/components/Base/Button/AntButton';
import { ClearOutlined, DeleteOutlined, PlusOutlined, SendOutlined } from '@ant-design/icons';
import { useNotify } from '@/hooks/useNotify';
import AntCustomTable from '@/components/Table/AntCustomTable';
import { useState } from 'react';
import Button from '@/components/Base/Button';
import AntDrawer from '@/components/Drawer/AntDrawer';
import { useAppDispatch } from '@/stores/hooks';
import { handleDrawer } from '@/stores/drawerSlice';
import { AddSalesFormData, AddSalesItemTableDataType } from '@/types/pages/sales';
import { AddSalesDetailsForm, AddSalesTableColumns } from '@/features/sales';

const AddSalesInvoice = () => {
  const notify = useNotify();
  const dispatch = useAppDispatch();
  const [tableData, setTableData] = useState<AddSalesItemTableDataType[]>([]);
  const {
    control,
    reset,
    watch,
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
  const { customer_name } = watch();

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
    const newItem: AddSalesItemTableDataType = {
      item_name: `Item ${tableData.length + 1}`,
      available_stock: 'First Select Item Name',
      quantity: Math.ceil(Math.random() * 10),
      rate: Math.ceil(Math.random() * 100),
      total: Math.ceil(Math.random() * 10000),
    };
    setTableData([...tableData, newItem]);
  };

  const handleDeleteItem = (record: AddSalesItemTableDataType) => {
    setTableData(tableData.filter((item) => item !== record));
  };

  return (
    <div>
      {/* Details Section */}
      <div className='flex justify-between items-center mt-5'>
        <h2 className='text-2xl text-primary font-bold'>Details</h2>
        <div className='flex gap-2 items-center'>
          <div className='text-lg text-primary font-semibold'>Remaining Balance : 0</div>
          <AntButton
            label='Limit Details'
            icon={<ClearOutlined />}
            color='cyan'
            variant='solid'
            disabled={!customer_name}
            onClick={() => {
              dispatch(handleDrawer({ type: 'limit-details', isOpen: true }));
            }}
          />
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
      <AddSalesDetailsForm control={control} />

      {/* Table Section */}
      <AntCustomTable<AddSalesItemTableDataType>
        className='mt-5 drop-shadow-md intro-y'
        columns={[
          ...(AddSalesTableColumns || []),
          {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
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

      <AntDrawer title='Brand Wise Credit Limit'>
        <div className='bg-white rounded-lg shadow-md overflow-hidden'>
          {/* Table Header */}
          <div className='grid grid-cols-12 bg-gray-50 px-4 py-3 border-b border-gray-200 font-semibold text-gray-700'>
            <div className='col-span-5'>Brand</div>
            <div className='col-span-3'>Limit</div>
            <div className='col-span-4 text-right'>Invoice Amount</div>
          </div>

          {/* Table Body */}
          <div className='divide-y divide-gray-100'>
            {Array.from({ length: 50 }).map((_, index: number) => (
              <div
                key={index}
                className='grid grid-cols-12 px-4 py-3 items-center hover:bg-gray-50 transition-colors duration-150'
              >
                <div className='col-span-5 flex items-center'>
                  <div className='font-medium text-gray-900'>Brand Name {index + 1}</div>
                </div>
                <div className='col-span-3 font-medium text-gray-700'>$1,000,000</div>
                <div className='col-span-4 text-right'>
                  <span className='font-medium text-green-600'>$850,000</span>
                  <div className='text-xs text-gray-500 mt-1'>Due: 05/15/2023</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AntDrawer>
    </div>
  );
};

export default AddSalesInvoice;
