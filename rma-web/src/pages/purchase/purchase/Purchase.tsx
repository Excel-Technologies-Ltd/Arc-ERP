import Button from '@/components/Base/Button';
import AntInput from '@/components/Base/Form/FormInput/AntInput';
import AntSelect from '@/components/Base/Form/FormSelect/AntSelect';
import AntRangePicker from '@/components/DatePicker/AntRangePicker';
import AntCustomTable from '@/components/Table/AntCustomTable';
import { URLPurchaseDetails } from '@/router/routes.url';
import { getPurchaseInvoiceList, getSupplierList } from '@/services/purchase/purchase';
import { DatePicker, Progress, TimeRangePickerProps } from 'antd';
import { TableProps } from 'antd/es/table';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface DataType {
  key: string;
  invoice_number: string;
  status: string;
  progress: string;
  posting_date: string;
  supplier_name: string;
  total_amount: number;
  created_by: string;
  delivered_by: string;
}

const Purchase = () => {
  const [supplierSearch, setSupplierSearch] = useState<string | null>(null);

  // Filter
  const [purchaseInvoiceNumber, setPurchaseInvoiceNumber] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [supplier, setSupplier] = useState<string | null>(null);

  // API Call to get suppliers based on search
  const { data: suppliers, isLoading: isLoadingSuppliers } = getSupplierList(supplierSearch);
  const { data: purchaseInvoices, isLoading: isLoadingPurchaseInvoices } = getPurchaseInvoiceList({
    purchase_invoice_number: purchaseInvoiceNumber ?? '',
    status: status ?? '',
    supplier: supplier ?? '',
  });

  const handleClear = () => {
    setPurchaseInvoiceNumber(null);
    setStatus(null);
    setSupplier(null);
  };

  return (
    <div>
      <div className='flex items-center gap-2 py-5'>
        <h1 className='text-xl font-semibold w-full'>Purchase Invoice</h1>
        <AntInput
          placeholder='Purchase Invoice Number'
          type='text'
          onChange={(e) => setPurchaseInvoiceNumber(e.target.value)}
          value={purchaseInvoiceNumber ?? ''}
        />
        <AntSelect
          placeholder='Status'
          value={status ?? undefined}
          onChange={(value) => setStatus(value)}
          options={[
            { value: 'completed', label: 'Completed' },
            { value: 'cancelled', label: 'Cancelled' },
            { value: 'submitted', label: 'Submitted' },
            { value: 'all', label: 'All' },
          ]}
          showSearch={false}
        />
        <AntSelect
          placeholder='Select Supplier'
          value={supplier ?? undefined}
          onChange={(value) => {
            setSupplier(value);
            setSupplierSearch(null);
          }}
          onSearch={(value) => setSupplierSearch(value)}
          loading={isLoadingSuppliers}
          options={suppliers?.map((s) => ({
            value: s.name,
            label: s.supplier_name,
          }))}
          notFoundText='No Supplier Found'
        />
        {/* <DatePicker.RangePicker allowClear={true} size='large' className='w-full' /> */}
        <AntRangePicker allowClear={true} size='large' placeholder={['Start Date', 'End Date']} />
        <div className='flex items-center gap-2'>
          <Button variant='outline-primary'>Search</Button>
          <Button onClick={handleClear} variant='outline-primary'>
            Clear
          </Button>
        </div>
      </div>

      <AntCustomTable<DataType>
        columns={columns}
        data={purchaseInvoices?.map((invoice) => ({
          key: invoice.name,
          invoice_number: invoice.name,
          status: invoice.status,
          progress: invoice.progress,
          posting_date: invoice.posting_date,
          supplier_name: invoice.supplier_name,
          total_amount: invoice.grand_total,
          created_by: invoice.owner,
          delivered_by: invoice.modified_by,
        }))}
        loading={isLoadingPurchaseInvoices}
      />
    </div>
  );
};

export default Purchase;

// Table Columns
const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Invoice Number',
    dataIndex: 'invoice_number',
    key: 'invoice_number',
    render: (text) => (
      <Link
        to={URLPurchaseDetails(text)}
        className='text-primary font-semibold underline underline-offset-2 hover:text-primary/80 hover:underline text-xs'
      >
        <span>{text}</span>
      </Link>
    ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (text) => {
      const makeColor = (status: string) => {
        switch (status) {
          case 'Overdue':
            return 'text-blue-500';
          case 'Unpaid':
            return 'text-red-500';
        }
      };

      return <span className={makeColor(text)}>{text}</span>;
    },
  },
  {
    title: 'Progress',
    dataIndex: 'progress',
    key: 'progress',
    render: (text) => {
      return <Progress percent={60} size='small' status='active' showInfo={false} />;
    },
  },
  {
    title: 'Posting Date',
    key: 'posting_date',
    dataIndex: 'posting_date',
  },
  {
    title: 'Supplier Name',
    dataIndex: 'supplier_name',
    key: 'supplier_name',
  },
  {
    title: 'Total Amount',
    dataIndex: 'total_amount',
    key: 'total_amount',
    render: (amount) => {
      return amount ? amount?.toLocaleString() : '0';
    },
  },
  {
    title: 'Created By',
    dataIndex: 'created_by',
    key: 'created_by',
  },
  {
    title: 'Delivered By',
    dataIndex: 'delivered_by',
    key: 'delivered_by',
  },
];
