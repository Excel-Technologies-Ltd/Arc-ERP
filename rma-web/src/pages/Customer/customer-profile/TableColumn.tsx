import Button from '@/components/Base/Button';
import { useAppDispatch } from '@/stores/hooks';
import { handleModal } from '@/stores/modalSlice';
import { Customer } from '@/types/Selling/Customer';
import { TableColumn } from '@/types/Table/table-types';
import { formatCurrency } from '@/utils/helper';
import { useMemo } from 'react';

export const CustomerProfileTableColumn = (setCustomerName: (name: string) => void) => {
  const dispatch = useAppDispatch();
  const Column: TableColumn<Customer>[] = useMemo(
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
    ],
    [setCustomerName, dispatch]
  );

  return Column;
};
