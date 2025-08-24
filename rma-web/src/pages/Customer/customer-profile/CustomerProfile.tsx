import Button from '@/components/Base/Button';
import AntModal from '@/components/Modal/AntModal';
import AntPagination from '@/components/Pagination/AntPagination';
import CustomTable from '@/components/Table/CustomTable';
import { getCustomerDocument, getCustomerList } from '@/services/customer/customer';
import { handleModal } from '@/stores/modalSlice';
import { BrandWiseAllocations } from '@/types/ExcelERPNext/BrandWiseAllocations';
import { Customer } from '@/types/Selling/Customer';
import { TableColumn } from '@/types/Table/table-types';
import { formatCurrency } from '@/utils/helper';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const CustomerProfile = () => {
  const dispatch = useDispatch();
  const [customerName, setCustomerName] = useState<string>('');

  // Api Call
  const { data: customerList, isLoading: isLoadingCustomerList, total } = getCustomerList();
  const {
    data: customerDocument,
    isLoading: isLoadingCustomerDocument,
    mutate,
  } = getCustomerDocument(customerName);

  useEffect(() => {
    if (customerName) {
      mutate(); // Trigger the customer document fetch
    }
  }, [customerName, mutate]);

  // Table Column
  const Column: TableColumn<Customer>[] = [
    {
      key: 'Sl',
      title: 'SL',
      render: (_, __, index) => <span>{index + 1}</span>,
    },
    {
      key: 'customer_name',
      title: 'Customer Name',
    },
    {
      key: 'territory',
      title: 'Territory Name',
    },
    {
      key: 'excel_remaining_balance',
      title: 'Credit Limit',
      render: (value) => formatCurrency(value),
    },
    {
      key: 'current_outstanding',
      title: 'Current Outstanding',
      render: (value) => formatCurrency(value),
    },
    {
      key: 'custom_other_brands_limit',
      title: 'Remaining Credit',
      render: (value) => formatCurrency(value),
    },
    {
      key: 'brand_wise_limit',
      title: 'Brand Wise Limit',
      render: (_, record) => {
        return (
          <Button
            variant='secondary'
            size='sm'
            onClick={() => {
              setCustomerName(record.customer_name);
              dispatch(handleModal({ type: 'brand-wise-limit', isOpen: true }));
            }}
          >
            Details
          </Button>
        );
      },
    },
  ];
  return (
    <>
      <div className='mt-5'>
        <CustomTable
          tableHeader={Column || []}
          data={customerList || []}
          loading={isLoadingCustomerList}
          totalItems={total || 0}
        />
      </div>

      <AntModal
        title={
          <div className='text-xl font-semibold text-center border-b border-gray-200 pb-2'>
            Brand Wise Limit - {customerName}
          </div>
        }
        loading={isLoadingCustomerDocument}
        width={800}
      >
        <div className='bg-white dark:bg-darkmode rounded-lg'>
          <div className='flex justify-between items-center my-4'>
            <div className='text-lg font-semibold'>
              Total Remaining Balance:{' '}
              <span className='text-lg font-bold'>
                {formatCurrency(customerDocument?.excel_remaining_balance || 0)}
              </span>
            </div>
            <div className='text-lg font-semibold'>
              Brand Wise Allocated Limit:{' '}
              <span className='text-lg font-bold'>
                {formatCurrency(
                  customerDocument?.custom_brand_wise_allocations?.reduce(
                    (acc, item) => acc + item.limit,
                    0
                  ) || 0
                )}
              </span>
            </div>
          </div>

          <div className='overflow-x-auto rounded-lg border'>
            <table className='min-w-full table-auto'>
              <thead className='bg-primary text-white'>
                <tr>
                  <th className='px-6 py-3 text-left'>Brand Name</th>
                  <th className='px-6 py-3 text-left'>Limit Amount</th>
                </tr>
              </thead>
              <tbody className='bg-gray-50'>
                {customerDocument?.custom_brand_wise_allocations?.map(
                  (item: BrandWiseAllocations) => (
                    <tr key={item.name}>
                      <td className='px-6 py-4 text-left'>{item.brand}</td>
                      <td className='px-6 py-4 text-left'>{formatCurrency(item.limit)}</td>
                    </tr>
                  )
                )}
                <tr>
                  <td className='px-6 py-4 text-left'>Others</td>
                  <td className='px-6 py-4 text-left'>
                    {formatCurrency(customerDocument?.custom_other_brands_limit || 0)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </AntModal>
    </>
  );
};

export default CustomerProfile;
