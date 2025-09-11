import AntButton from '@/components/Base/Button/AntButton';
import CustomTable from '@/components/Table/CustomTable';
import { StockAvailabilityFilterForm, StockAvailabilityTableColumn } from '@/features/stock';
import { StockAvailabilityListFilterFormData } from '@/types/pages/sales';
import { StockEntryDetail } from '@/types/Stock/StockEntryDetail';
import { ClearOutlined, CloudDownloadOutlined, SearchOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';

const StockAvailability = () => {
  const { control, reset } = useForm<StockAvailabilityListFilterFormData>({
    mode: 'onChange',
  });

  // Table Column
  const Column = StockAvailabilityTableColumn();
  return (
    <>
      <div className='flex flex-col lg:flex-row items-center gap-2 justify-between mt-5 intro-y'>
        <h2 className='text-lg font-medium whitespace-nowrap'>Stock Availability</h2>
        <StockAvailabilityFilterForm
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
        <CustomTable<StockEntryDetail>
          data={
            Array.from({ length: 8 }, (_, index) => ({
              item_name: `Stock Entry ${index + 1}`,
              item_code: `Item Code ${index + 1}`,
              item_group: `Item Group ${index + 1}`,
              item_brand: `Item Brand ${index + 1}`,
              warehouse: `Warehouse ${index + 1}`,
              actual_quantity: parseInt((Math.random() * 100).toString()),
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

export default StockAvailability;
