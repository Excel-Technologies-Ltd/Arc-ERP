import AntButton from '@/components/Base/Button/AntButton';
import CustomTable from '@/components/Table/CustomTable';
import { SerialListSearchFilterForm, SerialListSearchtableColumns } from '@/features/warranty';
import { getSerialsList } from '@/services/warranty/serials';
import { SerialListSearchFilterFormData, SerialNoDataType } from '@/types/pages/warranty';
import { ClearOutlined, CloudDownloadOutlined, SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const SerialListSearch = () => {
  const [filterKey, setFilterKey] = useState<number>(0);
  const [appliedFilterData, setAppliedFilterData] = useState<SerialListSearchFilterFormData | null>(
    null
  );

  // Api Call Start - will automatically refetch when appliedFilterData changes
  const { data, isLoading } = getSerialsList(appliedFilterData);
  // Api Call End

  const { control, reset, handleSubmit } = useForm<SerialListSearchFilterFormData>({
    mode: 'onChange',
    defaultValues: {
      is_purchase: true,
      is_sold: false,
    },
  });

  // handle Clear
  const handleClear = () => {
    reset();
    setAppliedFilterData(null);
    setFilterKey(filterKey + 1);
  };

  // Table Column
  const Column = SerialListSearchtableColumns();

  // handle Submit - just update state, the hook will automatically refetch
  const onSubmit = (data: SerialListSearchFilterFormData) => {
    setAppliedFilterData(data);
  };

  return (
    <>
      <div className='flex flex-col lg:flex-row items-start gap-2 justify-between mt-5 intro-y'>
        <h2 className='text-lg font-medium whitespace-nowrap'>Serial</h2>
        <SerialListSearchFilterForm
          key={filterKey}
          control={control}
          className='w-full grid grid-cols-3 items-center gap-2'
        />
        <div className='flex items-center gap-2'>
          <AntButton icon={<SearchOutlined />} onClick={handleSubmit(onSubmit)} loading={isLoading}>
            Search
          </AntButton>
          <AntButton icon={<CloudDownloadOutlined />}>Download CSV</AntButton>
          <AntButton onClick={handleClear} icon={<ClearOutlined />}>
            Clear
          </AntButton>
        </div>
      </div>

      {/* BEGIN: Data List */}
      <div className='col-span-12 overflow-auto intro-y 2xl:overflow-visible'>
        <CustomTable<SerialNoDataType>
          data={data?.message.data || []}
          tableHeader={Column}
          loading={isLoading}
          totalItems={data?.message.count || 0}
        />
      </div>
      {/* END: Data List */}
    </>
  );
};

export default SerialListSearch;
