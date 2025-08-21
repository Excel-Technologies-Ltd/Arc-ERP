import Button from '@/components/Base/Button';
import AntModal from '@/components/Modal/AntModal';
import CustomTable from '@/components/Table/CustomTable';
import { getCustomerDocument, getCustomerList } from '@/services/customer/customer';
import { handleModal } from '@/stores/modalSlice';
import { Customer } from '@/types/Selling/Customer';
import { TableColumn } from '@/types/Table/table-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const CustomerProfile = () => {
  const dispatch = useDispatch();
  const [customerName, setCustomerName] = useState<string>('');
  // Api Call
  const { data: customerList, isLoading: isLoadingCustomerList } = getCustomerList();
  const { data: customerDocument, isLoading: isLoadingCustomerDocument } =
    getCustomerDocument(customerName);

  console.log(customerDocument);
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
    },
    {
      key: 'current_outstanding',
      title: 'Current Outstanding',
    },
    {
      key: 'custom_other_brands_limit',
      title: 'Remaining Credit',
    },
    {
      key: 'brand_wise_limit',
      title: 'Brand Wise Limit',
      render: (_, record) => {
        return (
          <Button
            variant='outline-secondary'
            size='sm'
            onClick={() => {
              setCustomerName(record.customer_name);
              dispatch(handleModal({ type: 'brand-wise-limit', isOpen: true }));
            }}
          >
            View
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
          showAction={false}
        />
      </div>

      <AntModal title='Brand Wise Limit' width={600}>
        <h1>text</h1>
      </AntModal>
    </>
  );
};

export default CustomerProfile;
