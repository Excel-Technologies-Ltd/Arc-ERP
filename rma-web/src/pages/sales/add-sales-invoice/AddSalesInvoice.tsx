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
import { addSalesInvoice } from '@/services/sales/SalesInvoice';
import { SALES_INVOICE } from '@/constants/doctype-strings';
import { SalesInvoice } from '@/types/Accounts/SalesInvoice';
import { COMPANY_NAME } from '@/constants/app-strings';
import { BrandWiseAllocations } from '@/types/ExcelERPNext/BrandWiseAllocations';
import { formatCurrency } from '@/utils/helper';

const AddSalesInvoice = () => {
  const notify = useNotify();
  const dispatch = useAppDispatch();
  const [tableData, setTableData] = useState<AddSalesItemTableDataType[]>([]);
  const {
    control,
    reset,
    watch,
    handleSubmit: submitForm,
    setValue,
  } = useForm<AddSalesFormData>({
    mode: 'onChange',
    resetOptions: {
      keepDirtyValues: true,
    },
    defaultValues: {
      posting_date: dayjs(),
      customer_details: undefined,
      remaining_balance: 0,
    },
  });
  const { customer_name, customer_details, remaining_balance } = watch();

  // Api Call Start
  const { createDoc: CreateSalesInvoice, loading: CreateSalesLoading } = addSalesInvoice();
  // Api Call End

  const handleClear = () => {
    reset();
    setTableData([]);
  };

  const handleSubmit = (data: AddSalesFormData) => {
    const payload = {
      creation: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      modified: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      docstatus: 1,
      customer: data.customer_name,
      customer_name: data.customer_name,
      company: COMPANY_NAME,
      company_address: data.customer_details?.customer_primary_address,
      posting_date: dayjs(data.posting_date).format('YYYY-MM-DD'),
      set_posting_time: 1,
      due_date: dayjs(data.due_date).format('YYYY-MM-DD'),
      territory: data.territory_name,
      total_qty: tableData.reduce((acc, curr) => acc + (curr.quantity ?? 0), 0),
      update_stock: 0,
      total: tableData.reduce((acc, curr) => acc + (curr.total ?? 0), 0),
      items: tableData.map((item) => ({
        name: item.item_name,
        item_name: item.item_name,
        item_code: item.item_name,
        qty: item.quantity,
        rate: item.rate,
        amount: item.total,
      })),
      remarks: data.remarks,
      sales_team: data.customer_details?.sales_team,
    } as SalesInvoice;

    CreateSalesInvoice(SALES_INVOICE, payload)
      .then(() => {
        notify.success({
          message: 'Sales Invoice Submitted Successfully',
        });
        handleClear();
      })
      .catch((err) => {
        notify.error({
          message: err.message,
          description: err.exception,
        });
      });
  };

  const handleAddItem = () => {
    const newItem: AddSalesItemTableDataType = {
      item_name: '',
      available_stock: 'Select Item Name',
      quantity: 0,
      rate: 0,
      total: 0,
    };
    setTableData([...tableData, newItem]);
  };

  const handleDeleteItem = (record: AddSalesItemTableDataType) => {
    setTableData(tableData.filter((item) => item !== record));
  };

  // Table Columns
  const Columns = AddSalesTableColumns({ tableData, setTableData, watch });

  return (
    <div>
      {/* Details Section */}
      <div className='flex justify-between items-center mt-5'>
        <h2 className='text-2xl text-primary font-bold'>Details</h2>
        <div className='flex gap-2 items-center'>
          <div className='text-lg text-primary font-semibold'>
            Remaining Balance : {remaining_balance}
          </div>
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
            loading={CreateSalesLoading}
          />
        </div>
      </div>
      {/* Form Section */}
      <AddSalesDetailsForm control={control} setValue={setValue} />

      {/* Table Section */}
      <AntCustomTable<AddSalesItemTableDataType>
        className='mt-5 drop-shadow-md intro-y'
        columns={[
          ...(Columns || []),
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
              {tableData.reduce((acc, curr) => acc + (curr.total ?? 0), 0)}
            </div>
          </div>
        )}
        scroll={{ y: 400 }}
        pagination={false}
      />

      <AntDrawer title='Brand Wise Credit Limit'>
        <div className='bg-white rounded-lg shadow-md overflow-hidden'>
          <div className='overflow-x-auto rounded-lg border'>
            <table className='min-w-full table-auto'>
              <thead className='bg-primary text-white'>
                <tr>
                  <th className='px-6 py-3 text-left'>Brand Name</th>
                  <th className='px-6 py-3 text-left'>Limit Amount</th>
                </tr>
              </thead>
              <tbody className='bg-gray-50'>
                {customer_details?.custom_brand_wise_allocations?.map(
                  (item: BrandWiseAllocations) => (
                    <tr key={item.name}>
                      <td className='px-6 py-4 text-left'>{item.brand}</td>
                      <td className='px-6 py-4 text-left'>{formatCurrency(item.limit)}</td>
                    </tr>
                  )
                )}
                <tr>
                  <td className='px-6 py-4 text-left'>Others</td>
                  <td className='px-6 py-4 text-left'>
                    {formatCurrency(customer_details?.custom_other_brands_limit || 0)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </AntDrawer>
    </div>
  );
};

export default AddSalesInvoice;
