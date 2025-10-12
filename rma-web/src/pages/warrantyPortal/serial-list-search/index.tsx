import AntButton from '@/components/Base/Button/AntButton';
import CustomTable from '@/components/Table/CustomTable';
import { SerialListSearchFilterForm } from '@/features/warranty';
import { useNotify } from '@/hooks/useNotify';
import { SerialListSearchFilterFormData } from '@/types/pages/warranty';
import { ClearOutlined, CloudDownloadOutlined, SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const SerialListSearch = () => {
  const [filterKey, setFilterKey] = useState<number>(0);
  const [appliedFilterData, setAppliedFilterData] = useState<SerialListSearchFilterFormData | null>(
    null
  );

  console.log(appliedFilterData);

  const notify = useNotify();
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

  // handle Submit
  const onSubmit = (data: SerialListSearchFilterFormData) => {
    setAppliedFilterData(data);
    notify.open({
      message: 'Serial List Search',
      description: JSON.stringify(data),
    });
  };

  return (
    <>
      <div className='flex flex-col lg:flex-row items-center gap-2 justify-between mt-5 intro-y'>
        <h2 className='text-lg font-medium whitespace-nowrap'>Serial</h2>
        <SerialListSearchFilterForm
          key={filterKey}
          control={control}
          className='w-full flex flex-col lg:flex-row items-center gap-2'
        />
        <div className='flex items-center gap-2'>
          <AntButton icon={<SearchOutlined />} onClick={handleSubmit(onSubmit)}>
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
        <CustomTable<any> data={[]} tableHeader={[]} loading={false} totalItems={0} />
      </div>
      {/* END: Data List */}
    </>
  );
};

export default SerialListSearch;
