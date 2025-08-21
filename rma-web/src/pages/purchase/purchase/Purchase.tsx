import { useState } from 'react';
import Button from '@/components/Base/Button';
import AntInput from '@/components/Base/Form/FormInput/AntInput';
import AntSelect from '@/components/Base/Form/FormSelect/AntSelect';
import AntRangePicker from '@/components/Base/DatePicker/AntRangePicker';
import { getPurchaseInvoiceList, getSupplierList } from '@/services/purchase/purchase';
import type { Dayjs } from 'dayjs';
import { PURCHASE_SELECT_STATUS } from '@/constants/app-strings';
import AntPagination from '@/components/Pagination/AntPagination';
import CustomTable from '@/components/Table/CustomTable';
import { PurchaseInvoice } from '@/types/Accounts/PurchaseInvoice';
import { TableColumn } from '@/types/Table/table-types';
import { Link } from 'react-router-dom';

const Purchase = () => {
  const [supplierSearch, setSupplierSearch] = useState<string | null>(null);

  // Filter
  const [purchaseInvoiceNumber, setPurchaseInvoiceNumber] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [supplier, setSupplier] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs] | null>(null);

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
    setDateRange(null);
  };

  const TableHeader: TableColumn<PurchaseInvoice>[] = [
    {
      key: 'sl',
      title: 'SL',
      render: (_, __, index) => <span>{index + 1}</span>,
    },
    {
      key: 'name',
      title: 'INVOICE NO',
      render: (text) => (
        <Link
          to={`/purchase/view-purchase-invoice/${text}`}
          className='underline decoration-dotted whitespace-nowrap'
        >
          {text}
        </Link>
      ),
    },
    {
      key: 'status',
      title: 'STATUS',
      render: (status) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            status === 'completed'
              ? 'bg-green-100 text-green-800'
              : status === 'pending'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      key: 'progress',
      title: 'PROGRESS',
      render: () => (
        <div className='w-full bg-gray-200 rounded-full h-1.5'>
          <div
            className='bg-orange-500 h-1.5 rounded-full'
            style={{ width: `${Math.random() * 99}%` }}
          ></div>
        </div>
      ),
    },
    { key: 'posting_date', title: 'POSTING DATE' },
    { key: 'supplier', title: 'SUPPLIER' },
    {
      key: 'total',
      title: 'TOTAL',
      render: (total) => `$${Number(total).toFixed(2)}`,
    },
    { key: 'owner', title: 'CREATED BY' },
    { key: 'owner', title: 'DELIVERED BY' },
  ];

  return (
    <>
      <div className='grid grid-cols-12 gap-6 mt-5'>
        {/* Filter Options */}
        <div className='flex flex-wrap items-center col-span-12 mt-2 intro-y xl:flex-nowrap gap-3'>
          <h2 className='text-lg font-medium intro-y whitespace-nowrap'>Purchase List</h2>
          <div className='flex w-full gap-2 flex-wrap lg:flex-nowrap'>
            <AntInput
              placeholder='Purchase Invoice Number'
              type='text'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPurchaseInvoiceNumber(e.target.value)
              }
              value={purchaseInvoiceNumber ?? ''}
            />
            <AntSelect
              placeholder='Status'
              value={status ?? undefined}
              onChange={(value: string) => setStatus(value)}
              options={PURCHASE_SELECT_STATUS}
              showSearch={false}
            />
            <AntSelect
              placeholder='Select Supplier'
              value={supplier ?? undefined}
              onChange={(value: string) => {
                setSupplier(value);
                setSupplierSearch(null);
              }}
              onSearch={(value: string) => setSupplierSearch(value)}
              loading={isLoadingSuppliers}
              options={suppliers?.map((s) => ({
                value: s.name,
                label: s.supplier_name,
              }))}
              notFoundText='No Supplier Found'
            />
            {/* <DatePicker.RangePicker allowClear={true} size='large' className='w-full' /> */}
            <AntRangePicker
              allowClear={true}
              value={dateRange}
              size='large'
              placeholder={['Start Date', 'End Date']}
              onChange={(value) => setDateRange(value as [Dayjs, Dayjs])}
            />
            <div className='flex items-center gap-2'>
              <Button variant='outline-primary'>Search</Button>
              <Button onClick={handleClear} variant='outline-primary'>
                Clear
              </Button>
            </div>
          </div>
        </div>
        {/* BEGIN: Data List */}
        <div className='col-span-12 overflow-auto intro-y 2xl:overflow-visible'>
          <CustomTable<PurchaseInvoice>
            data={purchaseInvoices || []}
            tableHeader={TableHeader}
            loading={isLoadingPurchaseInvoices}
            showAction={false}
          />
        </div>
        {/* END: Data List */}
        {/* BEGIN: Pagination */}
        <div className='flex flex-wrap justify-between items-center col-span-12 intro-y sm:flex-row sm:flex-nowrap'>
          <div className='hidden xl:block text-slate-500'>Showing 1 to 10 of 150 entries</div>
          <AntPagination totalItems={150} />
        </div>
        {/* END: Pagination */}
      </div>
    </>
  );
};

export default Purchase;
