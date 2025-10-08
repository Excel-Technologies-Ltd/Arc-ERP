import { useParams } from 'react-router-dom';
import { getPurchaseInvoiceDetails, postSerialAssign } from '@/services/purchase/purchase';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { useMemo, useEffect } from 'react';
import { AssignSerialFormData, SerialItemType } from '@/types/pages/purchase';
import { PurchaseDetailsCard, PurchaseDetailsSerialTables } from '@/features/purchase';
import { useNotify } from '@/hooks/useNotify';
import { calculateRangeTotal } from '@/utils/helper';
import LottieLoader from '@/components/Loader/LottieLoder';
import { PurchaseInvoice } from '@/types/Accounts/PurchaseInvoice';
import SerialAssignForm from '@/features/shared/SerialAssignForm';
import { clearAllSerialTableData, selectSerialTableData } from '@/stores/serialSlice';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import AntButton from '@/components/Base/Button/AntButton';
import { useFrappeEventListener } from 'frappe-react-sdk';

const mapApiToForm = (pi?: PurchaseInvoice): AssignSerialFormData => ({
  warehouse: pi?.set_warehouse ?? undefined,
  date: pi?.posting_date ? dayjs(pi.posting_date) : dayjs(),
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
    isValidating,
  } = getPurchaseInvoiceDetails(invoice_number ?? '');
  const { call: SerialAssignCall, loading: isLoadingSerialAssign } = postSerialAssign();
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
  const { total, error } = useMemo(() => calculateRangeTotal(from, to), [from, to]);
  const serialTableData = useAppSelector(selectSerialTableData);

  // Handle notifications in useEffect to avoid setState during render
  useEffect(() => {
    if (error && from && to) {
      notify.error({ message: error });
    }
  }, [error, from, to, notify]);

  // Update totalRange field whenever fromRange or toRange changes
  useEffect(() => {
    if (from && to) {
      setValue('totalRangeValue', total.toString(), {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [from, to, setValue, total]);

  useFrappeEventListener('serial_assign_process', (event) => {
    notify.info({
      message: 'Processing...',
      key: 'processing',
      description: <li>{event.message}</li>,
      duration: 0,
    });
  });

  // handle clear
  const handleClear = () => {
    reset();
    dispatch(clearAllSerialTableData());
  };

  // Item Merge
  const MakeMergeItems = useMemo(() => {
    return serialTableData.reduce(
      (acc, curr) => {
        const key = curr.item_name;
        if (!acc[key]) {
          acc[key] = { ...curr };
        } else {
          // Sum the quantities for items with same name and amount
          acc[key].qty += curr.qty;
          // Sum the amounts for merged items
          acc[key].amount += curr.amount;
          // Merge serials arrays
          acc[key].serial_no = [...acc[key].serial_no, ...curr.serial_no];
        }
        return acc;
      },
      {} as Record<string, SerialItemType>
    );
  }, [serialTableData]);

  // Handle Submit
  const onSubmit = async (data: AssignSerialFormData) => {
    if (Object.values(MakeMergeItems).length === 0) {
      notify.error({ message: 'No items to assign' });
      return;
    }

    const payload: Record<string, any> = {
      posting_date: dayjs(data.date).format('YYYY-MM-DD'),
      posting_time: dayjs(data.date).format('HH:mm:ss'),
      purchase_invoice_name: purchaseInvoiceDetails?.message.name,
      supplier: purchaseInvoiceDetails?.message.supplier,
      total: serialTableData.reduce((acc, curr) => acc + (curr.amount ?? 0), 0),
      total_qty: serialTableData.reduce((acc, curr) => acc + (curr.qty ?? 0), 0),
      warehouse: data.warehouse,
      items: Object.values(MakeMergeItems),
    };
    await SerialAssignCall(payload)
      .then((res) => {
        notify.success({ message: JSON.parse(res.message)?.message });
        handleClear();
      })
      .catch((err) => {
        notify.error({ message: 'ERROR', description: err.exception });
      })
      .finally(() => {
        notify.close('processing');
      });
  };

  // Render Loader
  if (isLoading || isValidating) return <LottieLoader pageLoader />;

  return (
    <>
      <div className='flex flex-col items-center mt-8 intro-y sm:flex-row'>
        <h2 className='mr-auto text-lg font-medium'>Transaction Details</h2>
        <div className='flex w-full mt-4 sm:w-auto sm:mt-0'>
          <AntButton
            color='primary'
            variant='solid'
            onClick={handleSubmit(onSubmit)}
            loading={isLoadingSerialAssign}
          >
            Submit
          </AntButton>
        </div>
      </div>
      {/* BEGIN: Transaction Details */}
      <div className='grid grid-cols-11 gap-5 mt-5'>
        <div className='col-span-12 lg:col-span-4 2xl:col-span-3 intro-y'>
          {/* Purchase Details Box */}
          {purchaseInvoiceDetails && <PurchaseDetailsCard data={purchaseInvoiceDetails?.message} />}
          {/* Serial Details Box */}
          <div className='p-5 rounded-md box mt-5'>
            <div className='flex items-center pb-5 mb-5 border-b border-slate-200/60 dark:border-darkmode-400'>
              <div className='text-base font-medium truncate'>Serial Assign</div>
            </div>
            <div className='space-y-4 w-full'>
              <SerialAssignForm
                control={control}
                items={purchaseInvoiceDetails?.message.items || []}
              />
              <p className='text-lg text-primary'>Total : {total}</p>
            </div>
          </div>
        </div>
        <div className='col-span-12 lg:col-span-7 2xl:col-span-8 intro-x'>
          <PurchaseDetailsSerialTables
            data={purchaseInvoiceDetails?.message}
            control={control}
            setValue={setValue}
          />
        </div>
      </div>
      {/* END: Transaction Details */}
    </>
  );
};

export default ViewPurchase;
