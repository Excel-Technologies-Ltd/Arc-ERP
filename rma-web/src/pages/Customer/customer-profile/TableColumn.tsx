import AntButton from '@/components/Base/Button/AntButton';
import { useAppDispatch } from '@/stores/hooks';
import { handleModal } from '@/stores/modalSlice';
import { Customer } from '@/types/Selling/Customer';
import { TableColumn } from '@/types/Table/table-types';
import { formatCurrency } from '@/utils/helper';
import { useMemo } from 'react';

export const CustomerProfileTableColumn = (
  setCustomerName: (name: string) => void
): TableColumn<Customer>[] => {
  const dispatch = useAppDispatch();
  return useMemo(
    () => [
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
            <AntButton
              size='small'
              type='primary'
              onClick={() => {
                setCustomerName(record.customer_name);
                dispatch(handleModal({ type: 'brand-wise-limit', isOpen: true }));
              }}
            >
              Details
            </AntButton>
          );
        },
      },
    ],
    [setCustomerName, dispatch]
  );
};
