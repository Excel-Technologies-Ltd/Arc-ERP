import AntButton from '@/components/Base/Button/AntButton';
import CustomTable from '@/components/Table/CustomTable';
import { StockEntryFilterForm } from '@/features/stock';
import { URLStockEntryDetails } from '@/router/routes.url';
import { StockEntryListFilterFormData } from '@/types/pages/stock';
import { StockEntry } from '@/types/Stock/StockEntry';
import { TableColumn } from '@/types/Table/table-types';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const StockEntryList = () => {
  const { control, reset } = useForm<StockEntryListFilterFormData>({
    mode: 'onChange',
  });

  const Column: TableColumn<StockEntry>[] = [
    {
      key: 'sl',
      title: 'SL',
      render: (_, __, index) => <span>{index + 1}</span>,
      width: '50px',
    },

    {
      key: 'name',
      title: 'Name',
      render: (value) => (
        <Link
          to={`${URLStockEntryDetails(value.toString())}`}
          className='underline decoration-dotted whitespace-nowrap underline-offset-2 text-info dark:text-light font-semibold'
        >
          {value}
        </Link>
      ),
    },
    {
      key: 'from_warehouse',
      title: 'From Warehouse',
    },
    {
      key: 'to_warehouse',
      title: 'To Warehouse',
    },
    {
      key: 'status',
      title: 'Status',
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            value === 'Pending'
              ? 'bg-yellow-100 text-yellow-800'
              : value === 'Posted'
                ? 'bg-green-100 text-green-800'
                : value === 'Cancelled'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-red-100 text-red-800'
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: 'created_by',
      title: 'Created By',
    },
    {
      key: 'territory',
      title: 'Territory',
    },
    {
      key: 'posting_date',
      title: 'Posting Date',
      render: (value) => (
        <div className='flex flex-col text-xs'>
          <span className='font-medium'>{dayjs(value).format('DD MMM, YYYY')}</span>
          <span className='text-primary dark:text-darkmode-50'>
            {dayjs(value).format('hh:mm A')}
          </span>
        </div>
      ),
    },
    {
      key: 'territory',
      title: 'Territory',
    },
    {
      key: 'remarks',
      title: 'Remarks',
    },
  ];
  return (
    <>
      <div className='flex flex-col lg:flex-row items-center gap-2 justify-between mt-5 intro-y'>
        <h2 className='text-lg font-medium whitespace-nowrap'>Stock Entry List</h2>
        <StockEntryFilterForm
          control={control}
          className='w-full flex flex-col lg:flex-row items-center gap-2'
        />
        <div className='flex items-center gap-2'>
          <AntButton type='default'>Search</AntButton>
          <AntButton
            onClick={() => {
              reset();
            }}
            type='default'
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
