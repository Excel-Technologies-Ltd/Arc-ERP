import AntButton from '@/components/Base/Button/AntButton';
import CustomTable from '@/components/Table/CustomTable';
import { StockEntryFilterForm, StockEntryTableColumns } from '@/features/stock';
import { StockEntry } from '@/types/Stock/StockEntry';
import { StockEntryListFilterFormData } from '@/types/pages/stock';
import { ClearOutlined, SearchOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';

const StockEntryList = () => {
  const { control, reset } = useForm<StockEntryListFilterFormData>({
    mode: 'onChange',
  });

  // Table Columns
  const Column = StockEntryTableColumns();

  return (
    <>
      <div className='flex flex-col lg:flex-row items-center gap-2 justify-between mt-5 intro-y'>
        <h2 className='text-lg font-medium whitespace-nowrap'>Stock Entry List</h2>
        <StockEntryFilterForm
          control={control}
          className='w-full flex flex-col lg:flex-row items-center gap-2'
        />
        <div className='flex items-center gap-2'>
          <AntButton icon={<SearchOutlined />}>Search</AntButton>
          <AntButton
            icon={<ClearOutlined />}
            onClick={() => {
              reset();
            }}
          >
            Clear
          </AntButton>
        </div>
      </div>

      {/* Entry List Table */}
      <div className='mt-5'>
        <CustomTable<StockEntry>
          data={
            Array.from({ length: 8 }, (_, index) => ({
              name: `Stock Entry ${index + 1}`,
              from_warehouse: `From Warehouse ${index + 1}`,
              to_warehouse: `To Warehouse ${index + 1}`,
              status: `Status ${index + 1}`,
              created_by: `Created By ${index + 1}`,
              territory: `Territory ${index + 1}`,
              posting_date: new Date(),
              remarks: `Remarks ${index + 1}`,
            })) as any
          }
          tableHeader={Column || []}
          loading={false}
          totalItems={1}
        />
      </div>
    </>
  );
};

export default StockEntryList;
