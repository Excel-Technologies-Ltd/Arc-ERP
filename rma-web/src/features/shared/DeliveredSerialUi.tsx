import AntCustomTable from '@/components/Table/AntCustomTable';
import { DeliveredSerialsTableColumn } from './DeliveredSerialsTableColumn';
import { AntSearchInput } from '@/components/Base/Form';
import AntButton from '@/components/Base/Button/AntButton';
import { getDeliveredSerials } from '@/services/warranty/serials';
import { useParams } from 'react-router-dom';
import { SerialNoDataType } from '@/types/pages/warranty';
import { useEffect, useState } from 'react';
import { usePagination } from '@/hooks/usePagination';
import { useAppDispatch } from '@/stores/hooks';
import { handleModal } from '@/stores/modalSlice';
import { MODAL_TYPE } from '@/constants/app-strings';
import DumpModalUi from './modal-ui/DumpModalUi';
import { useSWRConfig } from 'frappe-react-sdk';
import { GET_DELIVERED_SERIALS } from '@/constants/api-strings';

const DeliveredSerialUi = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const [fetchData, setFetchData] = useState(false);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const { page, pageSize, limitStart, handlePageChange } = usePagination();
  const { mutate: globalMutate } = useSWRConfig();

  // APi Call Start Here
  const { data, isLoading, mutate } = getDeliveredSerials(
    {
      ...(params?.invoice_number && { purchase_invoice_name: params?.invoice_number }),
      ...(searchValue && { serial_no: searchValue }),
    },
    limitStart,
    pageSize
    // {
    //   isPaused: () => !fetchData,
    // }
  );
  // Api Call End Here

  // // Clear all delivered serials cache on unmount
  // useEffect(() => {
  //   return () => {
  //     globalMutate((key) => Array.isArray(key) && key[0] === GET_DELIVERED_SERIALS, undefined, {
  //       revalidate: false,
  //     });
  //   };
  // }, []); // Empty dependency array - only run on mount/unmount

  // // Refetch Call
  // useEffect(() => {
  //   if (fetchData) {
  //     mutate();
  //   }
  // }, [fetchData, mutate, page]);

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
              <AntButton
                disabled={(data?.message.data?.length ?? 0) === 0}
                size='middle'
                type='primary'
                onClick={() =>
                  dispatch(
                    handleModal({
                      type: MODAL_TYPE.DOWNLOAD_DELIVERED_CSV,
                      isOpen: true,
                    })
                  )
                }
              >
                Download CSV
              </AntButton>
              <AntButton
                size='middle'
                type='primary'
                loading={isLoading}
                onClick={() => {
                  mutate();
                  // setFetchData(true);
                }}
              >
                Get Serials
              </AntButton>
            </div>
          </div>
        )}
        size='small'
      />

      {/* Modal */}
      <DumpModalUi<SerialNoDataType>
        data={data?.message?.data ?? []}
        dumpDefaultColumns={['item_name', 'serial_no']}
        modalType={MODAL_TYPE.DOWNLOAD_DELIVERED_CSV}
      />
    </>
  );
};

export default DeliveredSerialUi;
