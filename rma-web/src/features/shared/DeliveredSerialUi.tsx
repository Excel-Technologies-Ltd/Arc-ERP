import AntCustomTable from '@/components/Table/AntCustomTable';
import { DeliveredSerialsTableColumn } from './DeliveredSerialsTableColumn';
import { AntSearchInput } from '@/components/Base/Form';
import AntButton from '@/components/Base/Button/AntButton';
import { getDeliveredSerials } from '@/services/warranty/serials';
import { useParams } from 'react-router-dom';
import { SerialNoDataType } from '@/types/pages/warranty';
import { useEffect, useState } from 'react';
import { usePagination } from '@/hooks/usePagination';

const DeliveredSerialUi = () => {
  const params = useParams();
  const [fetchData, setFetchData] = useState(false);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const { page, pageSize, limitStart, handlePageChange } = usePagination();

  // APi Call Start Here
  const { data, isLoading, mutate } = getDeliveredSerials(
    {
      ...(params?.invoice_number && { purchase_invoice_name: params?.invoice_number }),
      ...(searchValue && { serial_no: searchValue }),
    },
    limitStart,
    pageSize,
    {
      isPaused: () => !fetchData,
    }
  );
  // Api Call End Here

  // Refetch Call
  useEffect(() => {
    if (fetchData) {
      mutate();
    }
  }, [fetchData, mutate, page]);

  const deliveredSerialsColumn = DeliveredSerialsTableColumn();
  return (
    <>
      <AntCustomTable<SerialNoDataType>
        columns={deliveredSerialsColumn}
        data={data?.message.data ?? []}
        loading={isLoading}
        rowKey={'_id'}
        pagination={{
          pageSize: pageSize,
          current: page,
          total: data?.message.count ?? 0,
          size: 'default',
          onChange: (page, pageSize) => {
            handlePageChange(page, pageSize);
          },
        }}
        title={() => (
          <div className='flex justify-between items-center'>
            <div className='text-lg font-bold'>Delivered Serials</div>
            <div className='flex gap-2 items-center'>
              <AntSearchInput
                placeholder='Search Serial'
                size='middle'
                style={{ width: '300px' }}
                enterButton
                onSearch={(value) => {
                  setSearchValue(value);
                }}
              />
              <AntButton disabled size='middle' type='primary'>
                Download CSV
              </AntButton>
              <AntButton
                size='middle'
                type='primary'
                loading={isLoading}
                onClick={() => {
                  setFetchData(true);
                }}
              >
                Get Serials
              </AntButton>
            </div>
          </div>
        )}
        size='small'
      />
    </>
  );
};

export default DeliveredSerialUi;
