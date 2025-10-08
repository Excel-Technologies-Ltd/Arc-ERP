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
  const {
    data: purchaseInvoices,
    isLoading: isLoadingPurchaseInvoices,
    total,
  } = getPurchaseInvoiceList({
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
      <div className='grid grid-cols-12 gap-6 mt-5'>
        {/* Filter Options */}
        <div className='flex flex-wrap items-center col-span-12 mt-2 intro-y xl:flex-nowrap gap-3'>
          <h2 className='text-lg font-medium intro-y whitespace-nowrap'>Purchase List</h2>
          {/* Purchase List Filter Form */}
          <PurchaseListFilterForm key={filterKey} control={control} />
          <div className='flex items-center gap-2'>
            <AntButton icon={<SearchOutlined />} onClick={onSubmit}>
              Search
            </AntButton>
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
