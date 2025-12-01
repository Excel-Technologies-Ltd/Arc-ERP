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
  const [appliedFilterData, setAppliedFilterData] = useState<PurchaseListFilterFormData | null>(
    null
  );

  const { control, reset, handleSubmit } = useForm<PurchaseListFilterFormData>({
    mode: 'onChange',
  });

  // API Call start
  const { data: purchaseInvoices, isLoading: isLoadingPurchaseInvoices } = getPurchaseInvoiceList({
    invoice_number: appliedFilterData?.invoice_number ?? '',
    status: appliedFilterData?.status ?? '',
    supplier: appliedFilterData?.supplier ?? '',
    date_range: appliedFilterData?.date_range ?? null,
  });
  // Api Call end

  // handle Clear
  const handleClear = () => {
    reset();
    setAppliedFilterData(null);
    setFilterKey(filterKey + 1);
  };

  // Table Column
  const Column = PurchaseListTableColumn();

  // handle Submit
  const onSubmit = handleSubmit((data) => {
    setAppliedFilterData(data);
  });

  return (
    <>
      <div className='grid grid-cols-12 gap-2 mt-5'>
        {/* Filter Options */}
        <h2 className='text-2xl text-primary dark:text-white/80 font-bold intro-y whitespace-nowrap col-span-full'>
          Purchase List
        </h2>
        <div className='flex flex-wrap items-center col-span-12 intro-y xl:flex-nowrap gap-3 bg-white dark:bg-darkmode-800 py-5 px-3 rounded-lg border dark:border-darkmode-500'>
          {/* Purchase List Filter Form */}
          <PurchaseListFilterForm key={filterKey} control={control} />
          <div className='flex items-center gap-2'>
            <AntButton icon={<SearchOutlined />} onClick={onSubmit} variant='solid' color='primary'>
              Search
            </AntButton>
            <AntButton
              icon={<ClearOutlined />}
              onClick={handleClear}
              variant='solid'
              color='volcano'
            >
              Clear
            </AntButton>
          </div>
        </div>
        {/* BEGIN: Data List */}
        <div className='col-span-12 intro-y dark:text-slate-300'>
          <CustomTable<PurchaseInvoice>
            data={purchaseInvoices?.message.data || []}
            tableHeader={Column}
            loading={isLoadingPurchaseInvoices}
            totalItems={purchaseInvoices?.message.count}
          />
        </div>
        {/* END: Data List */}
      </div>
    </>
  );
};

export default Purchase;
