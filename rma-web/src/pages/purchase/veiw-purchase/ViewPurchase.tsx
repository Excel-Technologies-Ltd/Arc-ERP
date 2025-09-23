import { useParams } from 'react-router-dom';
import { getPurchaseInvoiceDetails } from '@/services/purchase/purchase';
import Button from '@/components/Base/Button';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { useMemo, useEffect } from 'react';
import { AssignSerialFormData } from '@/types/pages/purchase';
import { PurchaseDetailsCard, PurchaseDetailsSerialTables } from '@/features/purchase';
import { useNotify } from '@/hooks/useNotify';
import { calculateRangeTotal } from '@/utils/helper';
import LottieLoader from '@/components/Loader/LottieLoder';
import { PurchaseInvoice } from '@/types/Accounts/PurchaseInvoice';
import SerialAssignForm from '@/features/shared/SerialAssignForm';
import { selectSerialTableData } from '@/stores/serialSlice';
import { useAppSelector } from '@/stores/hooks';

const mapApiToForm = (pi?: PurchaseInvoice): AssignSerialFormData => ({
  warehouse: pi?.set_warehouse ?? undefined,
  date: pi?.posting_date ? dayjs(pi.posting_date) : dayjs(),
  file: undefined,
  fromRange: '',
  toRange: '',
});

const ViewPurchase = () => {
  const { invoice_number } = useParams();
  const notify = useNotify();

  // Api Call
  const {
    data: purchaseInvoiceDetails,
    isLoading,
    isValidating,
  } = getPurchaseInvoiceDetails(invoice_number ?? '');

  // Build reactive "values" from API data
  const formValues = useMemo(() => mapApiToForm(purchaseInvoiceDetails), [purchaseInvoiceDetails]);

  // From Handel
  const { control, watch, handleSubmit } = useForm<AssignSerialFormData>({
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

  // Handle Submit
  const onSubmit = (data: AssignSerialFormData) => {
    console.log({ data, serialTableData });
  };

  // Render Loader
  if (isLoading || isValidating) return <LottieLoader pageLoader />;

  return (
    <>
      <div className='flex flex-col items-center mt-8 intro-y sm:flex-row'>
        <h2 className='mr-auto text-lg font-medium'>Transaction Details</h2>
        <div className='flex w-full mt-4 sm:w-auto sm:mt-0'>
          <Button variant='primary' className='mr-2 shadow-md' onClick={handleSubmit(onSubmit)}>
            Submit
          </Button>
        </div>
      </div>
      {/* BEGIN: Transaction Details */}
      <div className='grid grid-cols-11 gap-5 mt-5'>
        <div className='col-span-12 lg:col-span-4 2xl:col-span-3 intro-y'>
          {/* Purchase Details Box */}
          {purchaseInvoiceDetails && <PurchaseDetailsCard data={purchaseInvoiceDetails} />}
          {/* Serial Details Box */}
          <div className='p-5 rounded-md box mt-5'>
            <div className='flex items-center pb-5 mb-5 border-b border-slate-200/60 dark:border-darkmode-400'>
              <div className='text-base font-medium truncate'>Serial Assign</div>
            </div>
            <div className='space-y-4 w-full'>
              <SerialAssignForm control={control} items={purchaseInvoiceDetails?.items || []} />
              <p className='text-lg text-primary'>Total : {total}</p>
            </div>
          </div>
        </div>
        <div className='col-span-12 lg:col-span-7 2xl:col-span-8 intro-x'>
          <PurchaseDetailsSerialTables data={purchaseInvoiceDetails} control={control} />
        </div>
      </div>
      {/* END: Transaction Details */}
    </>
  );
};

export default ViewPurchase;
