import AntButton from '@/components/Base/Button/AntButton';
import AntDrawer from '@/components/Drawer/AntDrawer';
import AntModal from '@/components/Modal/AntModal';
import { PurchaseDetailsSerialTables } from '@/features/purchase';
import { SalesDetailsCard, SalesDetailsConnectionsView } from '@/features/sales';
import ResetSerialUi from '@/features/shared/ResetSerialUi';
import SerialAssignForm from '@/features/shared/SerialAssignForm';
import { handleDrawer } from '@/stores/drawerSlice';
import { useAppDispatch } from '@/stores/hooks';
import { handleModal } from '@/stores/modalSlice';
import { AssignSerialFormData } from '@/types/pages/purchase';
import { useForm } from 'react-hook-form';

const ViewSalesInvoice = () => {
  const dispatch = useAppDispatch();
  const { control, watch, setValue } = useForm<AssignSerialFormData>({
    mode: 'onChange',
    resetOptions: {
      keepDirtyValues: true,
    },
  });
  const [from, to] = watch(['fromRange', 'toRange']);
  const total = from && to && +from <= +to ? +to - +from + 1 : 0;
  return (
    <>
      <div className='flex flex-col items-center mt-8 intro-y sm:flex-row'>
        <h2 className='mr-auto text-lg font-medium'>Sales Details</h2>
        <div className='flex w-full mt-4 sm:w-auto sm:mt-0'>
          <AntButton
            color='volcano'
            variant='solid'
            className='mr-2'
            onClick={() =>
              dispatch(
                handleDrawer({
                  isOpen: true,
                  type: 'sale_serial_assign',
                })
              )
            }
          >
            Connections
          </AntButton>
          <AntButton
            color='magenta'
            variant='solid'
            className='mr-2'
            onClick={() =>
              dispatch(
                handleModal({
                  isOpen: true,
                  type: 'sales_serial_reset',
                })
              )
            }
          >
            Reset
          </AntButton>
          <AntButton color='primary' variant='solid' className='mr-2'>
            Submit
          </AntButton>
        </div>
      </div>

      <div className='grid grid-cols-11 gap-5 mt-5'>
        <div className='col-span-12 lg:col-span-4 2xl:col-span-3 intro-y'>
          {/* Sales Details Card */}
          <SalesDetailsCard />

          {/* Serial Details Box */}
          <div className='p-5 rounded-md box mt-5'>
            <div className='flex items-center pb-5 mb-5 border-b border-slate-200/60 dark:border-darkmode-400'>
              <div className='text-base font-medium truncate'>Serial Assign</div>
            </div>
            {/* Serial Assign Form */}
            <div className='space-y-4 w-full'>
              <SerialAssignForm control={control} items={[]} />
              <p className='text-lg text-primary'>Total : {total}</p>
            </div>
          </div>
        </div>
        {/* Serial Details Table */}
        <div className='col-span-12 lg:col-span-7 2xl:col-span-8 intro-x'>
          <PurchaseDetailsSerialTables
            setValue={setValue}
            control={control}
            data={
              {
                items: [
                  {
                    key: 'Item 1',
                    name: 'Item 1',
                    item_name: 'Item 1',
                    item_code: 'Item 1',
                    qty: 1,
                  },
                  {
                    key: 'Item 2',
                    name: 'Item 2',
                    item_name: 'Item 2',
                    item_code: 'Item 2',
                    qty: 2,
                  },
                  {
                    key: 'Item 3',
                    name: 'Item 3',
                    item_name: 'Item 3',
                    item_code: 'Item 3',
                    qty: 3,
                  },
                ] as any,
              } as any
            }
          />
        </div>
      </div>
      {/* Drawer */}
      <AntDrawer title='Connections' placement='bottom' height={'70%'}>
        <SalesDetailsConnectionsView />
      </AntDrawer>

      {/* Modal */}
      <AntModal title='Reset Serial' okText='Reset'>
        <ResetSerialUi
          bulletPoints={[
            'Sales Invoice',
            'Delivery Notes',
            'Sales Returns',
            'Credit Notes',
            'Linked/Assigned Serials',
            'Serial History',
          ]}
        />
      </AntModal>
    </>
  );
};

export default ViewSalesInvoice;
