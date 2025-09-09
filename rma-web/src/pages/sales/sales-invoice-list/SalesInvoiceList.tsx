import AntButton from '@/components/Base/Button/AntButton';
import CustomTable from '@/components/Table/CustomTable';
import { SalesListFilterForm, SalesListTableColumn } from '@/features/sales';
import { getSalesInvoiceList } from '@/services/sales/SalesInvoice';
import { SalesInvoice } from '@/types/Accounts/SalesInvoice';
import { SalesInvoiceListFilterFormData } from '@/types/pages/sales';
import { ClearOutlined, SearchOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';

const SalesInvoiceList = () => {
  const { control, reset } = useForm<SalesInvoiceListFilterFormData>({
    mode: 'onChange',
  });

  // Api Call Start
  const { data: salesInvoiceList, isLoading: isLoadingSalesInvoiceList } = getSalesInvoiceList();
  // Api Call End

  // Handle Clear
  const handleClear = () => {
    reset();
  };

  // Table Column
  const Column = SalesListTableColumn();

  return (
    <>
      <div className='flex flex-col lg:flex-row items-center gap-2 justify-between mt-5 intro-y'>
        <h2 className='text-lg font-medium whitespace-nowrap'>Sales Invoices</h2>
        <SalesListFilterForm control={control} />
        <div className='flex items-center gap-2'>
          <AntButton icon={<SearchOutlined />}>Search</AntButton>
          <AntButton icon={<ClearOutlined />} onClick={handleClear}>
            Clear
          </AntButton>
        </div>
      </div>

      <div className='mt-5'>
        <CustomTable<SalesInvoice>
          data={salesInvoiceList || []}
          tableHeader={Column}
          loading={isLoadingSalesInvoiceList}
          totalItems={salesInvoiceList?.length || 0}
        />
      </div>
    </>
  );
};

export default SalesInvoiceList;
