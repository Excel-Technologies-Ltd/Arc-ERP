import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import AntButton from '@/components/Base/Button/AntButton';
import { ClearOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useNotify } from '@/hooks/useNotify';
import AntCustomTable from '@/components/Table/AntCustomTable';
import { useState } from 'react';
import AntDrawer from '@/components/Drawer/AntDrawer';
import { useAppDispatch } from '@/stores/hooks';
import { handleDrawer } from '@/stores/drawerSlice';
import {
  AddSalesFormData,
  AddSalesItemTableDataType,
  AddSalesTaxesAndChargesTableDataType,
} from '@/types/pages/sales';
import {
  AddSalesDetailsForm,
  AddSalesTableColumns,
  AddSalesTaxesAndChargesColumns,
} from '@/features/sales';
import { addSalesInvoice } from '@/services/sales/SalesInvoice';
import { SALES_INVOICE } from '@/constants/doctype-strings';
import { SalesInvoice } from '@/types/Accounts/SalesInvoice';
import { COMPANY_NAME } from '@/constants/app-strings';
import { BrandWiseAllocations } from '@/types/ExcelERPNext/BrandWiseAllocations';
import { formatCurrency } from '@/utils/helper';
import { AiOutlineSave } from 'react-icons/ai';
import { CgDanger } from 'react-icons/cg';
import { DetailsTitle } from '@/features/shared/details-title';
import AddSalesAdditionalDetailsForm from '@/features/sales/AddSalesAdditionalDetailsForm';

const AddSalesInvoice = () => {
  const notify = useNotify();
  const dispatch = useAppDispatch();
  const [tableData, setTableData] = useState<AddSalesItemTableDataType[]>([]);
  const [taxesAndChargesTableData, setTaxesAndChargesTableData] = useState<
    AddSalesTaxesAndChargesTableDataType[]
  >([]);
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
  const { customer_name, customer_details, remaining_balance, territory_name } = watch();

  // Api Call Start
  const { createDoc: CreateSalesInvoice, loading: CreateSalesLoading } = addSalesInvoice();
  // Api Call End

  const handleClear = () => {
    reset();
    setTableData([]);
  };

  const handleSubmit = (data: AddSalesFormData) => {
    console.log(data);
    return;
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
          title: 'Sales Invoice Submitted Successfully',
        });
        handleClear();
      })
      .catch((err) => {
        notify.error({
          title: err.message,
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

  const handleAddTaxesAndCharges = () => {
    const newTaxesAndCharges: AddSalesTaxesAndChargesTableDataType = {
      sl: taxesAndChargesTableData.length + 1,
    };
    setTaxesAndChargesTableData([...taxesAndChargesTableData, newTaxesAndCharges]);
    notify.success({
      title: 'Taxes and Charges Added Successfully',
    });
  };

  // Table Columns
  const Columns = AddSalesTableColumns({ tableData, setTableData, watch });
  const TaxesAndChargesTableColumns = AddSalesTaxesAndChargesColumns({
    taxesAndChargesTableData,
    setTaxesAndChargesTableData,
  });
  return (
    <div>
      {/* Details Section */}
      <div className='flex justify-between items-center mt-5'>
        <DetailsTitle title='Add Sales Invoice' />
        <div className='flex gap-2 items-center'>
          <div className='text-lg text-primary font-semibold'>
            Remaining Balance : {remaining_balance}
          </div>
          <AntButton
            label='Limit Details'
            icon={<CgDanger />}
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
            icon={<AiOutlineSave />}
            type='primary'
            onClick={submitForm(handleSubmit)}
            loading={CreateSalesLoading}
          />
        </div>
      </div>
      {/* Form Section */}
      <AddSalesDetailsForm control={control} setValue={setValue} />
      {territory_name && territory_name === 'CORPORATE' && (
        <AddSalesAdditionalDetailsForm control={control} />
      )}
      {/* Table Section */}
      {/* Items Table */}
      <AntCustomTable<AddSalesItemTableDataType>
        className='mt-5 drop-shadow-md intro-y'
        columns={Columns || []}
        data={tableData}
        loading={false}
        title={() => (
          <>
            <div className='flex justify-between items-center px-2'>
              <div className='text-lg font-bold'>Items</div>
              <AntButton
                label='Add Item'
                icon={<PlusCircleOutlined />}
                onClick={handleAddItem}
                type='primary'
                size='middle'
              />
            </div>
          </>
        )}
        footer={() => (
          <div className='flex justify-end items-center text-primary'>
            <div className='text-lg font-bold'>Total Amount : </div>
            <div className='text-lg font-bold ml-2'>
              {formatCurrency(tableData.reduce((acc, curr) => acc + (curr.total ?? 0), 0))}
            </div>
          </div>
        )}
        scroll={{ y: tableData.length > 7 ? 400 : undefined, x: 1000 }}
        pagination={false}
      />

      {/* Sales taxes and Charges table */}
      <AntCustomTable<AddSalesTaxesAndChargesTableDataType>
        className='mt-5 drop-shadow-md intro-y'
        columns={TaxesAndChargesTableColumns}
        data={taxesAndChargesTableData}
        loading={false}
        title={() => (
          <>
            <div className='flex justify-between items-center px-2'>
              <div className='text-lg font-bold'>Sales Taxes and Charges</div>
              <AntButton
                label='Add Taxes and Charges'
                icon={<PlusCircleOutlined />}
                onClick={handleAddTaxesAndCharges}
                type='primary'
                size='middle'
              />
            </div>
          </>
        )}
        footer={() => (
          <div className='flex justify-end items-center text-primary'>
            <div className='text-lg font-bold'>Total Amount : </div>
            <div className='text-lg font-bold ml-2'>
              {formatCurrency(
                taxesAndChargesTableData.reduce((acc, curr) => acc + (curr.tax_amount ?? 0), 0)
              )}
            </div>
          </div>
        )}
        scroll={{ y: taxesAndChargesTableData.length > 7 ? 400 : undefined, x: 1000 }}
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
