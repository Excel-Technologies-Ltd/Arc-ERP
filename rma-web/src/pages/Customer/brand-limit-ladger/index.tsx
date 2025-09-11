import AntButton from '@/components/Base/Button/AntButton';
import CustomTable from '@/components/Table/CustomTable';
import {
  CustomerBrandLimitLadgerFilterForm,
  CustomerBrandLimitLadgerTableColumns,
} from '@/features/customer';
import { BrandWiseAllocations } from '@/types/ExcelERPNext/BrandWiseAllocations';
import { CustomerBrandLimitLadgerFilterFormData } from '@/types/pages/customer';
import { ClearOutlined, CloudDownloadOutlined, SearchOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';

const CustomerBrandLimitLadger = () => {
  const { control, reset } = useForm<CustomerBrandLimitLadgerFilterFormData>({
    mode: 'onChange',
  });

  // Table Columns
  const Column = CustomerBrandLimitLadgerTableColumns();
  return (
    <>
      <div className='flex flex-col lg:flex-row items-center gap-2 justify-between mt-5 intro-y'>
        <h2 className='text-lg font-medium whitespace-nowrap'>Stock Availability</h2>
        <CustomerBrandLimitLadgerFilterForm
          control={control}
          className='w-full flex flex-col lg:flex-row items-center gap-2'
        />
        <div className='flex items-center gap-2'>
          <AntButton icon={<SearchOutlined />}>Search</AntButton>
          <AntButton icon={<CloudDownloadOutlined />}>Download CSV</AntButton>
          <AntButton
            onClick={() => {
              reset();
            }}
            icon={<ClearOutlined />}
          >
            Clear
          </AntButton>
        </div>
      </div>

      {/* Table */}
      <div className='mt-5'>
        <CustomTable<BrandWiseAllocations>
          data={
            Array.from({ length: 8 }, (_, index) => ({
              date: new Date(),
              brand: `Brand ${index + 1}`,
              transactions: `Transactions ${index + 1}`,
              remaining_limit: `Remaining Limit ${index + 1}`,
              doctype: `Doctype ${index + 1}`,
              doc_id: `Doc Id ${index + 1}`,
            })) as any
          }
          tableHeader={Column || []}
          loading={false}
          totalItems={10}
        />
      </div>
    </>
  );
};

export default CustomerBrandLimitLadger;
