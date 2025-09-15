import { getPurchaseInvoiceList } from '@/services/purchase/purchase';
import CustomTable from '@/components/Table/CustomTable';
import { PurchaseInvoice } from '@/types/Accounts/PurchaseInvoice';
import AntButton from '@/components/Base/Button/AntButton';
import { ClearOutlined, SearchOutlined } from '@ant-design/icons';
import { PurchaseListFilterForm, PurchaseListTableColumn } from '@/features/purchase';
import { useForm } from 'react-hook-form';
import { PurchaseListFilterFormData } from '@/types/pages/purchase';
import { useState } from 'react';

const Purchase = () => {
  const [filterKey, setFilterKey] = useState<number>(0);
  const { control, reset, watch } = useForm<PurchaseListFilterFormData>({
    mode: 'onChange',
  });

  const watchPurchaseInvoiceNumber = watch('invoice_number');
  const watchStatus = watch('status');
  const watchSupplier = watch('supplier');

  // API Call start
  const {
    data: purchaseInvoices,
    isLoading: isLoadingPurchaseInvoices,
    total,
  } = getPurchaseInvoiceList({
    purchase_invoice_number: watchPurchaseInvoiceNumber ?? '',
    status: watchStatus ?? '',
    supplier: watchSupplier ?? '',
  });
  // Api Call end

  const handleClear = () => {
    reset();
    setFilterKey(filterKey + 1);
  };

  // Table Column
  const Column = PurchaseListTableColumn();

  return (
    <>
      <div className='grid grid-cols-12 gap-6 mt-5'>
        {/* Filter Options */}
        <div className='flex flex-wrap items-center col-span-12 mt-2 intro-y xl:flex-nowrap gap-3'>
          <h2 className='text-lg font-medium intro-y whitespace-nowrap'>Purchase List</h2>
          {/* Purchase List Filter Form */}
          <PurchaseListFilterForm key={filterKey} control={control} />
          <div className='flex items-center gap-2'>
            <AntButton icon={<SearchOutlined />}>Search</AntButton>
            <AntButton icon={<ClearOutlined />} onClick={handleClear}>
              Clear
            </AntButton>
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
