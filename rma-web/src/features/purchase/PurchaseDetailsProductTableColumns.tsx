import { Popconfirm, Tag, type TableProps } from 'antd';
import { PurchaseInvoiceItem } from '@/types/Accounts/PurchaseInvoiceItem';
import Button from '@/components/Base/Button';
import { PlusOutlined } from '@ant-design/icons';
import { AntInput } from '@/components/Base/Form';
import {
  updateInputValue,
  selectSerialTableData,
  selectInputValues,
  resetInputValues,
} from '@/stores/serialSlice';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { getAddedSerialsCount, getRemainingQty } from '@/features/helpers/utils';
import { useAddSerialHandler } from '../helpers/handlers/useAddSerial.handler';
import { Control, UseFormSetValue, useWatch } from 'react-hook-form';
import { AssignSerialFormData } from '@/types/pages/purchase';

export const PurchaseDetailsProductTableColumns = (
  control: Control<AssignSerialFormData>,
  setValue: UseFormSetValue<AssignSerialFormData>
): TableProps<PurchaseInvoiceItem>['columns'] => {
  const dispatch = useAppDispatch();
  const { fromRange, toRange } = useWatch({ control });

  // Call Selectors
  const serialTableData = useAppSelector(selectSerialTableData);
  const inputValues = useAppSelector(selectInputValues);

  // Add Serial Handler
  const { handleAddSerial } = useAddSerialHandler({ inputValues, serialTableData, control });

  return [
    { title: 'Item Name', dataIndex: 'item_name', key: 'item_name' },
    { title: 'Quantity', dataIndex: 'qty', key: 'qty' },
    {
      title: 'Assigned',
      key: 'assigned_qty',
      dataIndex: 'assign_qty',
      render: (value, record) => {
        return (value || 0) + getAddedSerialsCount(record.item_name, serialTableData);
      },
    },
    {
      title: 'Remaining',
      key: 'remaining',
      render: (_, record) => {
        const remaining = getRemainingQty(record, serialTableData);
        return (
          <span className={remaining <= 0 ? 'text-red-600 font-medium' : ''}>{remaining}</span>
        );
      },
    },
    {
      title: 'Has Serial',
      dataIndex: 'custom_has_excel_serial',
      key: 'custom_has_excel_serial',
      render: (value) => {
        const hasSerial = value === 'Yes';
        return <Tag color={hasSerial ? 'green' : 'red'}>{hasSerial ? 'Yes' : 'No'}</Tag>;
      },
    },
    { title: 'Warranty Months', dataIndex: 'warrenty_months', key: 'warrenty_months' },
    {
      title: 'Add Serial',
      key: 'add_serial',
      render: (_, record) => {
        const inputValue = inputValues?.[record?.name]?.[0] || ''; // Access first element
        const isDisabled = getRemainingQty(record, serialTableData) <= 0;
        const onlyButtonClick = fromRange && toRange;

        if (onlyButtonClick) {
          return (
            <Button
              disabled={isDisabled}
              variant='outline-primary'
              onClick={() => {
                setValue('fromRange', '');
                setValue('toRange', '');
                setValue('totalRangeValue', '');
                handleAddSerial(record);
              }}
            >
              <PlusOutlined />
            </Button>
          );
        }

        return (
          <Popconfirm
            title='Enter Assigned Numbers!'
            description={
              <AntInput
                type='number'
                placeholder='Enter Assigned Number'
                size='middle'
                value={inputValue}
                onPressEnter={() => handleAddSerial(record)}
                onChange={(e) =>
                  dispatch(
                    updateInputValue({
                      name: record.name,
                      value: [e.target.value],
                    })
                  )
                }
              />
            }
            onConfirm={() => handleAddSerial(record)}
            onOpenChange={(open) => open && dispatch(resetInputValues())}
            okText='Submit'
            showCancel={false}
            placement='left'
          >
            <Button disabled={isDisabled} variant='outline-primary'>
              <PlusOutlined />
            </Button>
          </Popconfirm>
        );
      },
    },
  ];
};
