import { useParams } from 'react-router-dom';
import { getPurchaseInvoiceDetails } from '@/services/purchase/purchase';
import Button from '@/components/Base/Button';
import { Tag, Flex } from 'antd';
import { useForm } from 'react-hook-form';
import Serials from './serials/Serials';
import SerialAssignForm from './serials/SerialAssignForm';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { LiaFileInvoiceSolid } from '@/components/Base/Icons';
import { AssignSerialFormData } from '@/types/pages/purchase';

const mapApiToForm = (pi?: any): AssignSerialFormData => ({
  warehouse: pi?.set_warehouse ?? undefined,
  date: pi?.posting_date ? dayjs(pi.posting_date) : dayjs(),
  file: undefined,
  fromRange: '',
  toRange: '',
});

const ViewPurchase = () => {
  const { invoice_number } = useParams();
  // Api Call
  const {
    data: purchaseInvoiceDetails,
    isLoading,
    isValidating,
  } = getPurchaseInvoiceDetails(invoice_number ?? '');

  // Build reactive "values" from API data
  const formValues = useMemo(() => mapApiToForm(purchaseInvoiceDetails), [purchaseInvoiceDetails]);

  // From Handel
  const { control, watch } = useForm<AssignSerialFormData>({
    values: formValues,
    mode: 'onChange',
    resetOptions: {
      keepDirtyValues: true,
    },
  });

  const [from, to] = watch(['fromRange', 'toRange']);
  const total = from && to && +from <= +to ? +to - +from + 1 : 0;

  if (isLoading || isValidating) return <div>loading...</div>;

  return (
    <>
      <div className='flex flex-col items-center mt-8 intro-y sm:flex-row'>
        <h2 className='mr-auto text-lg font-medium'>Transaction Details</h2>
        <div className='flex w-full mt-4 sm:w-auto sm:mt-0'>
          <Button variant='primary' className='mr-2 shadow-md'>
            Submit
          </Button>
        </div>
      </div>
      {/* BEGIN: Transaction Details */}
      <div className='grid grid-cols-11 gap-5 mt-5'>
        <div className='col-span-12 lg:col-span-4 2xl:col-span-3 intro-y'>
          {/* Purchase Details Box */}
          <div className='p-5 rounded-md box'>
            <div className='flex items-center pb-5 mb-5 border-b border-slate-200/60 dark:border-darkmode-400'>
              <div className='text-base font-medium truncate'>Purchase Details</div>
            </div>
            <div className='flex items-center'>
              <LiaFileInvoiceSolid className='w-4 h-4 mr-2 text-slate-500' />
              Invoice:
              <span className='ml-1 underline decoration-dotted'>
                {purchaseInvoiceDetails?.name}
              </span>
            </div>
            <div className='flex items-center mt-3'>
              <LiaFileInvoiceSolid className='w-4 h-4 mr-2 text-slate-500' />
              Order:
              <span className='ml-1 underline decoration-dotted'>
                {purchaseInvoiceDetails?.items[0]?.purchase_order}
              </span>
            </div>

            <div className='flex items-center mt-3'>
              <LiaFileInvoiceSolid className='w-4 h-4 mr-2 text-slate-500' />
              Supplier: {purchaseInvoiceDetails?.supplier_name}
            </div>
            <div className='flex items-center mt-3'>
              <LiaFileInvoiceSolid className='w-4 h-4 mr-2 text-slate-500' />
              Posting Date: {purchaseInvoiceDetails?.posting_date}
            </div>
            <div className='flex items-center mt-3'>
              <LiaFileInvoiceSolid className='w-4 h-4 mr-2 text-slate-500' />
              Warehouse: {purchaseInvoiceDetails?.set_warehouse}
            </div>
            <div className='flex items-center mt-3'>
              <LiaFileInvoiceSolid className='w-4 h-4 mr-2 text-slate-500' />
              <span className='mr-2'>Status:</span>
              <Flex gap='4px 0' wrap>
                <Tag color='blue'>{purchaseInvoiceDetails?.status}</Tag>
              </Flex>
            </div>
          </div>
          {/* Serial Details Box */}
          <div className='p-5 rounded-md box mt-5'>
            <div className='flex items-center pb-5 mb-5 border-b border-slate-200/60 dark:border-darkmode-400'>
              <div className='text-base font-medium truncate'>Serial Assign</div>
            </div>
            <div className='space-y-4 w-full'>
              <SerialAssignForm control={control} />
              <p className='text-lg text-primary'>Total : {total}</p>
            </div>
          </div>
        </div>
        <div className='col-span-12 lg:col-span-7 2xl:col-span-8 intro-x'>
          <Serials data={purchaseInvoiceDetails} />
        </div>
      </div>
      {/* END: Transaction Details */}
    </>
  );
};

export default ViewPurchase;
