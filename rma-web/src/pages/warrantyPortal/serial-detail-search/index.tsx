import AntButton from '@/components/Base/Button/AntButton';
import AntCustomTable from '@/components/Table/AntCustomTable';
import { SerialSearchDetailsCard, SerialSearchDetailsTableColumns } from '@/features/warranty';
import { getSerialDetails, getSerialHistory } from '@/services/warranty/serials';
import { SerialNoHistoryType } from '@/types/pages/warranty';
import { SnippetsOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const SerialDetailSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [fetchHistory, setFetchHistory] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const serial_no = searchParams.get('serial_no');

  // Api Call Start Here
  const {
    data: serialDetails,
    isLoading: serialDetailsLoading,
    mutate: refetchDetails,
  } = getSerialDetails(serial_no ?? null);

  const {
    data: serialHistory,
    isLoading: serialHistoryLoading,
    mutate: refetchHistory,
  } = getSerialHistory(fetchHistory && serial_no ? serial_no : null);
  // Api Call End Here

  // Set initial search value from URL params
  useEffect(() => {
    if (serial_no) {
      setSearchValue(serial_no);
    }
  }, [serial_no]);

  // Serial Items table Columns
  const Column = SerialSearchDetailsTableColumns();

  // Handle On Search
  const handleOnSearch = () => {
    if (searchValue) {
      setSearchParams({ serial_no: searchValue });
      setTimeout(() => {
        refetchDetails();
      }, 0);
    }
  };

  // Handle On Change Search
  const handleOnChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  // Handle Serial History Call
  const handleSerialHistoryCall = () => {
    if (serial_no) {
      setFetchHistory(true);
      setTimeout(() => {
        refetchHistory();
      }, 0);
    }
  };

  return (
    <>
      <div className='flex flex-col lg:flex-row items-center gap-2 justify-between mt-5 intro-y'>
        <h1 className='text-xl font-medium'>Serial Detail Search</h1>
        <Input.Search
          placeholder='Serial Number'
          allowClear
          size='large'
          value={searchValue}
          style={{ width: 300 }}
          onSearch={handleOnSearch}
          onChange={handleOnChangeSearch}
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
          title={() => (
            <div className='flex justify-between items-center'>
              <div className='text-lg font-bold text-center'>Serial Items</div>
              <AntButton
                onClick={handleSerialHistoryCall}
                type='primary'
                icon={<SnippetsOutlined />}
                size='middle'
                disabled={!serial_no}
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
