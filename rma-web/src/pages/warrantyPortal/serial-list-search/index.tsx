import AntButton from '@/components/Base/Button/AntButton';
import CustomTable from '@/components/Table/CustomTable';
import { MODAL_TYPE } from '@/constants/app-strings';
import DumpModalUi from '@/features/shared/modal-ui/DumpModalUi';
import { SerialListSearchFilterForm, SerialListSearchtableColumns } from '@/features/warranty';
import { getSerialsList } from '@/services/warranty/serials';
import { useAppDispatch } from '@/stores/hooks';
import { handleModal } from '@/stores/modalSlice';
import { SerialListSearchFilterFormData, SerialNoDataType } from '@/types/pages/warranty';
import {
  ClearOutlined,
  CloudDownloadOutlined,
  ReloadOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const SerialListSearch = () => {
  const dispatch = useAppDispatch();
  const [filterKey, setFilterKey] = useState<number>(0);
  const [appliedFilterData, setAppliedFilterData] = useState<SerialListSearchFilterFormData | null>(
    null
  );
  const [shouldFetchData, setShouldFetchData] = useState(false);

  // Api Call Start - will automatically refetch when appliedFilterData changes
  const { data, isLoading, mutate } = getSerialsList(appliedFilterData, {
    isPaused: () => !shouldFetchData,
  });
  // Api Call End

  // Refetch Call
  useEffect(() => {
    if (shouldFetchData) {
      mutate();
    }
  }, [shouldFetchData, mutate]);

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
    setShouldFetchData(true);
  };

  const handleDownloadClick = () => {
    dispatch(handleModal({ type: MODAL_TYPE.DOWNLOAD_SERIAL_LIST_SEARCH, isOpen: true }));
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
          <AntButton
            icon={<CloudDownloadOutlined />}
            disabled={(data?.message.count ?? 0) === 0}
            onClick={handleDownloadClick}
          >
            Download CSV
          </AntButton>
          <AntButton onClick={handleClear} icon={<ClearOutlined />}>
            Clear
          </AntButton>
          <AntButton icon={<ReloadOutlined />} onClick={() => mutate()}></AntButton>
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

      {/* Modal */}
      <DumpModalUi<SerialNoDataType>
        data={data?.message?.data ?? []}
        dumpDefaultColumns={['item_name', 'serial_no']}
        modalType={MODAL_TYPE.DOWNLOAD_SERIAL_LIST_SEARCH}
      />
    </>
  );
};

export default SerialListSearch;
