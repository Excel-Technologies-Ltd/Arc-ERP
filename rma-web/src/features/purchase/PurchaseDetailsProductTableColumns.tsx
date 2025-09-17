import { Popconfirm, Tag, type TableProps } from 'antd';
import { PurchaseInvoiceItem } from '@/types/Accounts/PurchaseInvoiceItem';
import Button from '@/components/Base/Button';
import { PlusOutlined } from '@ant-design/icons';
import { AntInput } from '@/components/Base/Form';
import { useNotify } from '@/hooks/useNotify';
import {
  addSerials,
  updateInputValue,
  selectSerialTableData,
  selectInputValues,
} from '@/stores/serialSlice';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';

export const PurchaseDetailsProductTableColumns =
  (): TableProps<PurchaseInvoiceItem>['columns'] => {
    const dispatch = useAppDispatch();
    const notify = useNotify();

    // Call Selectors
    const serialTableData = useAppSelector(selectSerialTableData);
    const inputValues = useAppSelector(selectInputValues);

    // Helper functions that use the data from selectors
    const getAddedSerialsCount = (itemName: string) => {
      return serialTableData.filter((serial) => serial.item_name === itemName).length;
    };

    const getInputValue = (name: string) => {
      return inputValues[name] || '';
    };

    const getRemainingQty = (record: PurchaseInvoiceItem) => {
      const addedSerials = getAddedSerialsCount(record.item_name);
      return record.qty - (record.received_qty || 0) - addedSerials;
    };

    const handleAddSerial = (record: PurchaseInvoiceItem) => {
      const inputValue = getInputValue(record.name);
      const assignedQuantity = parseInt(inputValue || '0');
      const remaining = getRemainingQty(record);

      if (assignedQuantity <= 0) {
        return notify.warning({
          message: 'Please enter a valid number greater than 0',
        });
      }

      if (assignedQuantity > remaining) {
        return notify.warning({
          message: `Cannot assign ${assignedQuantity}. Only ${remaining} items remaining.`,
        });
      }

      dispatch(addSerials({ record, quantity: assignedQuantity }));

      notify.success({
        message: `Successfully added ${assignedQuantity} serial items for ${record.item_name}`,
      });
    };

    return [
      { title: 'Item Name', dataIndex: 'item_name', key: 'item_name' },
      { title: 'Quantity', dataIndex: 'qty', key: 'qty' },
      {
        title: 'Assigned',
        key: 'assigned',
        render: (_, record) => (record.received_qty || 0) + getAddedSerialsCount(record.item_name),
      },
      {
        title: 'Remaining',
        key: 'remaining',
        render: (_, record) => {
          const remaining = getRemainingQty(record);
          return (
            <span className={remaining <= 0 ? 'text-green-600 font-medium' : ''}>{remaining}</span>
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
          const inputValue = getInputValue(record.name);

          return (
            <Popconfirm
              title='Enter Assigned Numbers!'
              description={
                <AntInput
                  type='number'
                  placeholder='Enter Assigned Number'
                  size='middle'
                  value={inputValue}
                  onChange={(e) =>
                    dispatch(
                      updateInputValue({
                        name: record.name,
                        value: e.target.value,
                      })
                    )
                  }
                />
              }
              onConfirm={() => handleAddSerial(record)}
              okText='Submit'
              showCancel={false}
              placement='left'
            >
              <Button
                disabled={record.custom_has_excel_serial !== 'Yes' || getRemainingQty(record) <= 0}
                variant='outline-primary'
              >
                <PlusOutlined />
              </Button>
            </Popconfirm>
          );
        },
      },
    ];
  };
