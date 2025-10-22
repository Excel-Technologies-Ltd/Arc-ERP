import AntButton from '@/components/Base/Button/AntButton';
import AntCustomTable from '@/components/Table/AntCustomTable';
import { SerialSearchDetailsCard, SerialSearchDetailsTableColumns } from '@/features/warranty';
import { getSerialDetails, getSerialHistory } from '@/services/warranty/serials';
import { SerialNoHistoryType } from '@/types/pages/warranty';
import { SnippetsOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ViewSerialSearch = () => {
  const params = useParams();
  const serial_no = params.serial_no;
  const [shouldFetchHistory, setShouldFetchHistory] = useState(false);
  const [searchValue, setSearchValue] = useState(serial_no ?? '');
  const [activeSerialNo, setActiveSerialNo] = useState(serial_no ?? ''); // This triggers the API

  // Api Call Start Here
  const { data: serialDetails, isLoading: serialDetailsLoading } = getSerialDetails(activeSerialNo);

  const {
    data: serialHistory,
    isLoading: serialHistoryLoading,
    mutate: mutateSerialHistory,
  } = getSerialHistory(activeSerialNo, {
    isPaused: () => !shouldFetchHistory,
  });
  // Api Call End Here

  // Serial Items table Columns
  const Column = SerialSearchDetailsTableColumns();

  // Refetch Call
  useEffect(() => {
    if (shouldFetchHistory) {
      mutateSerialHistory();
      setShouldFetchHistory(false);
    }
  }, [shouldFetchHistory, mutateSerialHistory]);

  const handleGetSerialHistory = () => {
    setShouldFetchHistory(true);
  };

  const handleSearch = (value: string) => {
    setActiveSerialNo(value); // This automatically triggers the API call via SWR
    setShouldFetchHistory(false); // Reset history fetch state
  };

  return (
    <>
      <div className='flex flex-col lg:flex-row items-center gap-2 justify-between mt-5 intro-y'>
        <h1 className='text-xl font-medium'>Serial Detail Search</h1>
        <Input.Search
          placeholder='Serial Number'
          size='large'
          value={searchValue}
          style={{ width: 300 }}
          onSearch={handleSearch}
          onChange={(e) => {
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
                disabled={!activeSerialNo}
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

export default ViewSerialSearch;
