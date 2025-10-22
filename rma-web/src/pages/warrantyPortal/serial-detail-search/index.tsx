import AntButton from '@/components/Base/Button/AntButton';
import { AntSearchInput } from '@/components/Base/Form';
import AntCustomTable from '@/components/Table/AntCustomTable';
import { SerialSearchDetailsCard, SerialSearchDetailsTableColumns } from '@/features/warranty';
import { getSerialDetails, getSerialHistory } from '@/services/warranty/serials';
import { SerialNoHistoryType } from '@/types/pages/warranty';
import { SnippetsOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

const SerialDetailSearch = () => {
  const [shouldFetchHistory, setShouldFetchHistory] = useState(false);
  const [shouldFetchDetails, setShouldFetchDetails] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  // Api Call Start Here
  const {
    data: serialDetails,
    isLoading: serialDetailsLoading,
    mutate: mutateSerialDetails,
  } = getSerialDetails(searchValue, {
    isPaused: () => !shouldFetchDetails,
  });

  const {
    data: serialHistory,
    isLoading: serialHistoryLoading,
    mutate: mutateSerialHistory,
  } = getSerialHistory(searchValue, {
    isPaused: () => !shouldFetchHistory,
  });
  // Api Call End Here

  // Trigger details fetch when search is performed
  useEffect(() => {
    if (shouldFetchDetails && searchValue) {
      mutateSerialDetails();
      setShouldFetchDetails(false);
    }
  }, [shouldFetchDetails, searchValue, mutateSerialDetails]);

  // Trigger history fetch when button is clicked
  useEffect(() => {
    if (shouldFetchHistory && searchValue) {
      mutateSerialHistory();
      setShouldFetchHistory(false);
    }
  }, [shouldFetchHistory, searchValue, mutateSerialHistory]);

  // Serial Items table Columns
  const Column = SerialSearchDetailsTableColumns();

  const handleGetSerialHistory = () => {
    setShouldFetchHistory(true);
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    setShouldFetchDetails(true);
  };

  return (
    <>
      <div className='flex flex-col lg:flex-row items-center gap-2 justify-between mt-5 intro-y w-full'>
        <h1 className='text-xl font-medium w-full'>Serial Detail Search</h1>
        <AntSearchInput
          placeholder='Serial Number'
          size='large'
          value={searchValue}
          style={{ width: 400 }}
          onSearch={handleSearch}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchValue(e.target.value);
          }}
        />
      </div>
      {/* Details Card */}
      <SerialSearchDetailsCard data={serialDetails?.message} loading={serialDetailsLoading} />

      {/* Table */}
      <div className='mt-3'>
        <AntCustomTable<SerialNoHistoryType>
          columns={Column}
          data={serialHistory?.message ?? []}
          loading={serialHistoryLoading}
          rowKey={(record) => record.serial_no}
          title={() => (
            <div className='flex justify-between items-center'>
              <div className='text-lg font-bold text-center'>Serial Items</div>
              <AntButton
                onClick={handleGetSerialHistory}
                type='primary'
                icon={<SnippetsOutlined />}
                size='middle'
                disabled={!searchValue}
                loading={serialHistoryLoading}
              >
                Get Serial History
              </AntButton>
            </div>
          )}
          size='small'
        />
      </div>
    </>
  );
};

export default SerialDetailSearch;
