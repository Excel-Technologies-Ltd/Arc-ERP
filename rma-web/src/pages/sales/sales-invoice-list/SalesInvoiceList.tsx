import Button from '@/components/Base/Button';
import CustomTable from '@/components/Table/CustomTable';
import SalesListFilterForm from '@/features/sales/SalesListFilterForm';
import { URLSalesDetails } from '@/router/routes.url';
import { SalesInvoice } from '@/types/Accounts/SalesInvoice';
import { SalesInvoiceListFilterFormData } from '@/types/pages/sales';
import { TableColumn } from '@/types/Table/table-types';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const SalesInvoiceList = () => {
  const { control, reset } = useForm<SalesInvoiceListFilterFormData>({
    mode: 'onChange',
  });

  const handleClear = () => {
    reset();
  };

  const Column: TableColumn<SalesInvoice>[] = [
    {
      key: 'sl',
      title: 'SL',
      render: (_, __, index) => <span>{index + 1}</span>,
    },

    {
      key: 'invoice_no',
      title: 'Invoice No',
      render: (text) => (
        <Link
          to={`${URLSalesDetails(text.toString())}`}
          className='underline decoration-dotted whitespace-nowrap'
        >
          {text}
        </Link>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${value === 'Paid' ? 'bg-green-100 text-green-800' : value === 'Partly Paid' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}
        >
          {value}
        </span>
      ),
    },
    {
      key: 'invoice_date',
      title: 'Invoice Date',
    },
    {
      key: 'customer_name',
      title: 'Customer Name',
    },
    {
      key: 'invoice_amount',
      title: 'Invoice Amount',
      render: (value) => `$${Number(value).toFixed(2)}`,
    },
    {
      key: 'progress',
      title: 'Progress',
      render: () => (
        <div className='w-full bg-gray-200 rounded-full h-1.5'>
          <div
            className={`h-1.5 rounded-full ${Math.random() > 0.5 ? 'bg-green-500' : 'bg-orange-500'}`}
            style={{ width: `${Math.random() * 99}%` }}
          ></div>
        </div>
      ),
    },
    {
      key: 'territory',
      title: 'Territory',
    },
    {
      key: 'remarks',
      title: 'Remarks',
    },
    {
      key: 'delivered_by',
      title: 'Delivered By',
    },
    {
      key: 'posting_date',
      title: 'Posting Date',
    },
  ];

  return (
    <>
      <div className='flex flex-col lg:flex-row items-center gap-2 justify-between mt-5 intro-y'>
        <h2 className='text-lg font-medium whitespace-nowrap'>Sales Invoices</h2>
        <SalesListFilterForm
          control={control}
          className='w-full flex flex-col lg:flex-row items-center gap-2'
        />
        <div className='flex items-center gap-2'>
          <Button variant='outline-primary'>Search</Button>
          <Button onClick={handleClear} variant='outline-primary'>
            Clear
          </Button>
        </div>
      </div>

      <div className='mt-5'>
        <CustomTable<SalesInvoice>
          data={
            Array.from({ length: 10 }, (_, index) => ({
              sl: index + 1,
              invoice_no: `INV-00${index + 1}`,
              invoice_date: '2021-01-01',
              customer_name: 'N.S. COMPUTER AND ENGINEERING - MOTIJHEEL',
              invoice_amount: Math.random() * 10000,
              progress: Math.random() * 100,
              territory: Math.random() > 0.5 ? 'Territory 1' : 'Territory 2',
              remarks: 'Remarks 1',
              delivered_by: Math.random() > 0.5 ? 'Delivered By 1' : 'Delivered By 2',
              posting_date: '2021-01-01',
              status: Math.random() > 0.5 ? 'Paid' : 'Partly Paid',
            })) as any
          }
          tableHeader={Column}
          loading={false}
          totalItems={1}
        />
      </div>
    </>
  );
};

export default SalesInvoiceList;
