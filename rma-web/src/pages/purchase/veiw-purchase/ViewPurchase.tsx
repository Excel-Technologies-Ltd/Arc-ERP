import { useParams } from 'react-router-dom';
import {
  getPurchaseInvoiceDetails,
  postSerialAssign,
  postSerialCancel,
} from '@/services/purchase/purchase';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { useMemo, useEffect } from 'react';
import { AssignSerialFormData } from '@/types/pages/purchase';
import { PurchaseDetailsCard, PurchaseDetailsSerialTables } from '@/features/purchase';
import { useNotify } from '@/hooks/useNotify';
import { calculateRangeTotal, Extract_Frappe_Error } from '@/utils/helper';
import LottieLoader from '@/components/Loader/LottieLoder';
import { PurchaseInvoice } from '@/types/Accounts/PurchaseInvoice';
import SerialAssignForm from '@/features/shared/SerialAssignForm';
import { clearAllSerialTableData, selectSerialTableData } from '@/stores/serialSlice';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import AntButton from '@/components/Base/Button/AntButton';
import { handleModal } from '@/stores/modalSlice';
import AntModal from '@/components/Modal/AntModal';
import { makeSerialTableDataMergeItems } from '@/features/helpers/utils';
import { MODAL_TYPE, PURCHASE_CUSTOM_STATUS } from '@/constants/app-strings';
import AlertComponent from '@/components/Base/Alert';
import AntCustomTable from '@/components/Table/AntCustomTable';
import { PurchaseInvoiceItem } from '@/types/Accounts/PurchaseInvoiceItem';
import DeliveredSerialUi from '@/features/shared/DeliveredSerialUi';
import { ResetSerialModalUi } from '@/features/shared/modal-ui';
import { ColumnCurrency, ColumnSerialNumber } from '@/components/Table/TableColumnUi';
import { DetailsTitle } from '@/features/shared/details-title';

const mapApiToForm = (pi?: PurchaseInvoice): AssignSerialFormData => ({
  warehouse: pi?.set_warehouse ?? undefined,
  date: pi?.posting_date ? dayjs(`${pi.posting_date} ${pi.posting_time || '00:00:00'}`) : dayjs(),
  file: undefined,
  fromRange: '',
  toRange: '',
  totalRangeValue: '',
});

const ViewPurchase = () => {
  const { invoice_number } = useParams();
  const notify = useNotify();
  const dispatch = useAppDispatch();

  // Api Call start
  const {
    data: purchaseInvoiceDetails,
    isLoading,
    error: purchaseInvoiceError,
    mutate,
  } = getPurchaseInvoiceDetails(invoice_number ?? '');
  const { call: SerialAssignCall, loading: isLoadingSerialAssign } = postSerialAssign();
  const { call: SerialCancelCall, loading: isLoadingSerialCancel } = postSerialCancel();
  // Api Call end

  // Build reactive "values" from API data
  const formValues = useMemo(
    () => mapApiToForm(purchaseInvoiceDetails?.message),
    [purchaseInvoiceDetails]
  );

  // From Handel
  const { control, watch, handleSubmit, setValue, reset } = useForm<AssignSerialFormData>({
    values: formValues,
    mode: 'onChange',
    resetOptions: {
      keepDirtyValues: true,
    },
  });

  // Calculate Total Range safely without notifications during render
  const [from, to] = watch(['fromRange', 'toRange']);
  const { total } = useMemo(() => calculateRangeTotal(from, to), [from, to]);
  const serialTableData = useAppSelector(selectSerialTableData);

  // Update totalRange field whenever fromRange or toRange changes
  useEffect(() => {
    if (from && to) {
      setValue('totalRangeValue', total.toString(), {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [from, to, setValue, total]);

  // handle clear
  const handleClear = () => {
    reset();
    dispatch(clearAllSerialTableData());
  };

  // Handle Submit
  const onSubmit = async (data: AssignSerialFormData) => {
    const MakeMergeItems = makeSerialTableDataMergeItems(serialTableData);

    if (Object.values(MakeMergeItems).length === 0) {
      notify.error({ message: 'No items to assign' });
      return;
    }

    // Make Payload
    const payload: Record<string, any> = {
      posting_date: dayjs(data.date || new Date()).format('YYYY-MM-DD'),
      posting_time: dayjs(data.date || new Date()).format('HH:mm:ss'),
      purchase_invoice_name: purchaseInvoiceDetails?.message.name,
      supplier: purchaseInvoiceDetails?.message.supplier,
      total: serialTableData.reduce((acc, curr) => acc + (curr.amount ?? 0), 0),
      total_qty: serialTableData.reduce((acc, curr) => acc + (curr.qty ?? 0), 0),
      warehouse: data.warehouse,
      items: Object.values(MakeMergeItems),
      warranty_date:
        dayjs(serialTableData[0]?.warranty_date).format('YYYY-MM-DD') ||
        dayjs(data.date).format('YYYY-MM-DD'),
    };

    await SerialAssignCall(payload)
      .then((res) => {
        notify.success({ message: JSON.parse(res.message)?.message });
        mutate();
        handleClear();
      })
      .catch((err) => {
        notify.error({ message: 'ERROR', description: Extract_Frappe_Error(err) });
      });
  };

  // Handle Cancel Serial
  const handleCancelSerial = () => {
    SerialCancelCall({ purchase_invoice_name: purchaseInvoiceDetails?.message.name })
      .then((res) => {
        notify.success({ message: res.message.message });
        mutate();
        handleClear();
        dispatch(handleModal({ type: '', isOpen: false }));
      })
      .catch((err) => {
        notify.error({ message: 'ERROR', description: Extract_Frappe_Error(err) });
      });
  };

  // Render Loader
  if (isLoading) return <LottieLoader pageLoader />;
  if (purchaseInvoiceError)
    return (
      <AlertComponent variant='soft-danger' className='text-center text-2xl font-bold mt-5'>
        {Extract_Frappe_Error(purchaseInvoiceError)}
      </AlertComponent>
    );

  const isCompleted =
    purchaseInvoiceDetails?.message.custom_excel_status === PURCHASE_CUSTOM_STATUS.COMPLETED;

  const isCancelled =
    purchaseInvoiceDetails?.message.custom_excel_status === PURCHASE_CUSTOM_STATUS.CANCELLED;
  const isSubmitted =
    purchaseInvoiceDetails?.message.custom_excel_status === PURCHASE_CUSTOM_STATUS.SUBMITTED;

  const hasReceiptDataWithQuantity = purchaseInvoiceDetails?.message.items.some((item) =>
    item.receipt_data?.some((r) => r.qty > 0)
  );

  return (
    <>
      <div className='flex flex-col items-center mt-8 intro-y sm:flex-row'>
        <DetailsTitle title='Purchase Details' className='mr-auto' />
        <div className='flex w-full mt-4 sm:w-auto sm:mt-0'>
          {!isCancelled && (
            <AntButton
              color='red'
              variant='solid'
              className='mr-2'
              onClick={() =>
                dispatch(
                  handleModal({
                    isOpen: true,
                    type: MODAL_TYPE.PURCHASE_SERIAL_RESET,
                  })
                )
              }
            >
              Reset
            </AntButton>
          )}
          {isSubmitted && (
            <AntButton
              color='primary'
              variant='solid'
              onClick={handleSubmit(onSubmit)}
              loading={isLoadingSerialAssign}
            >
              Submit
            </AntButton>
          )}
        </div>
      </div>
      {/* BEGIN: Transaction Details */}
      <div className='mt-5'>
        <div className='col-span-12 lg:col-span-4 2xl:col-span-3 intro-y'>
          {isCompleted && (
            <AlertComponent variant='soft-primary' className='text-center text-2xl font-bold mb-5'>
              All serials assigned
            </AlertComponent>
          )}
          {/* Purchase Details Box */}
          {purchaseInvoiceDetails && <PurchaseDetailsCard data={purchaseInvoiceDetails?.message} />}

          {/* Serial Details Box */}
          {isSubmitted && (
            <div className='p-5 rounded-md box mt-5 relative dark:bg-darkmode-800'>
              <div className='flex items-center justify-between pb-5 mb-5 border-b border-primary/30 dark:border-darkmode-400'>
                <div className='text-xl font-medium truncate text-primary'>Serial Assign</div>
                {total > 0 && (
                  <span className='text-xl font-medium truncate text-primary border border-primary/30 dark:border-darkmode-400 rounded-md px-2 '>
                    Total Qty : <span className='text-orange-600'>{total}</span>
                  </span>
                )}
              </div>
              <div className='space-y-4 w-full'>
                <SerialAssignForm
                  control={control}
                  items={purchaseInvoiceDetails?.message.items || []}
                />
              </div>
            </div>
          )}
        </div>

        <div className='col-span-12 lg:col-span-7 2xl:col-span-8 intro-x mt-5'>
          {isSubmitted && (
            <PurchaseDetailsSerialTables
              data={purchaseInvoiceDetails?.message}
              control={control}
              setValue={setValue}
            />
          )}

          {(isCompleted || hasReceiptDataWithQuantity) && (
            <div className='mt-5 w-full'>
              <DeliveredSerialUi />
            </div>
          )}
          {isCancelled && (
            <div className='w-full'>
              <AntCustomTable<PurchaseInvoiceItem>
                columns={[
                  { title: 'SL', key: 'sl', render: (_, __, index) => ColumnSerialNumber(index) },
                  { title: 'Item Name', dataIndex: 'item_name', key: 'item_name' },
                  { title: 'Quantity', dataIndex: 'qty', key: 'qty' },
                  {
                    title: 'Rate',
                    dataIndex: 'rate',
                    key: 'rate',
                    render: (value) => ColumnCurrency(value),
                  },
                  {
                    title: 'Amount',
                    dataIndex: 'amount',
                    key: 'amount',
                    render: (value) => ColumnCurrency(value),
                  },
                ]}
                rowKey={(record) => record.name}
                data={purchaseInvoiceDetails?.message.items || []}
                title={() => <div className='text-lg font-bold text-primary'>Product Items</div>}
              />
            </div>
          )}
        </div>
      </div>
      {/* END: Transaction Details */}

      {/* Modal */}
      <AntModal
        modalType={MODAL_TYPE.PURCHASE_SERIAL_RESET}
        okText={isLoadingSerialCancel ? 'Resetting...' : 'Reset'}
        onOk={handleCancelSerial}
        okButtonProps={{ loading: isLoadingSerialCancel }}
      >
        <ResetSerialModalUi
          bulletPoints={[
            'Purchase Order',
            'Purchase Invoice',
            'Purchase Receipts',
            'Linked/Assigned Serials',
            'Serial History',
          ]}
        />
      </AntModal>
    </>
  );
};

export default ViewPurchase;
