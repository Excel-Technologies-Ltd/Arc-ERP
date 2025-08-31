import { useState } from 'react';
import Button from '@/components/Base/Button';
import AntInput from '@/components/Base/Form/FormInput/AntInput';
import AntSelect from '@/components/Base/Form/FormSelect/AntSelect';
import AntRangePicker from '@/components/Base/DatePicker/AntRangePicker';
import { getPurchaseInvoiceList } from '@/services/purchase/purchase';
import type { Dayjs } from 'dayjs';
import { PURCHASE_SELECT_STATUS } from '@/constants/app-strings';
import CustomTable from '@/components/Table/CustomTable';
import { PurchaseInvoice } from '@/types/Accounts/PurchaseInvoice';
import { PurchaseTableColumn } from './TableColumn';
import { getSupplierList } from '@/services/common/commonApi';

const Purchase = () => {
  const [supplierSearch, setSupplierSearch] = useState<string | null>(null);

  // Filter
  const [purchaseInvoiceNumber, setPurchaseInvoiceNumber] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [supplier, setSupplier] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs] | null>(null);

  // API Call to get suppliers based on search
  const { data: suppliers, isLoading: isLoadingSuppliers } = getSupplierList(supplierSearch);
  const {
    data: purchaseInvoices,
    isLoading: isLoadingPurchaseInvoices,
    total,
  } = getPurchaseInvoiceList({
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

  // Table Column
  const Column = PurchaseTableColumn();

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
            tableHeader={Column}
            loading={isLoadingPurchaseInvoices}
            totalItems={total}
          />
        </div>
        {/* END: Data List */}
      </div>
    </>
  );
};

export default Purchase;
