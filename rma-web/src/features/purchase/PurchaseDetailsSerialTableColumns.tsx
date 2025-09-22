import AntDatePicker from '@/components/Base/DatePicker/AntDatePicker';
import { AntInput } from '@/components/Base/Form';
import { type TableProps } from 'antd';
import dayjs from 'dayjs';
import { SerialItemType } from '@/types/pages/purchase';
import {
  deleteSerialTableItem,
  selectSerialTableData,
  updateSerialTableItem,
} from '@/stores/serialSlice';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import Button from '@/components/Base/Button';
import { DeleteOutlined } from '@ant-design/icons';

export const PurchaseDetailsSerialTableColumns = (): TableProps<SerialItemType>['columns'] => {
  const dispatch = useAppDispatch();
  const serialTableData = useAppSelector(selectSerialTableData);

  // Serial Delete
  const handleSerialDelete = (key: string) => {
    dispatch(deleteSerialTableItem(key));
  };

  // Handle Enter key press to move to next row
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>, currentKey: string) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      // Find current row index
      const currentIndex = serialTableData.findIndex((item) => item.key === currentKey);

      // Check if there's a next row
      if (currentIndex < serialTableData.length - 1) {
        const nextRowKey = serialTableData[currentIndex + 1].key;

        // Find and focus the next row's input
        setTimeout(() => {
          const nextInput = document.querySelector(
            `input[data-serial-key="${nextRowKey}"]`
          ) as HTMLInputElement;
          if (nextInput) {
            nextInput.focus();
            nextInput.select(); // Optional: select all text in the input
          }
        }, 10);
      }
    }
  };

  return [
    {
      title: 'Item Code',
      dataIndex: 'item_code',
      key: 'item_code',
    },
    {
      title: 'Item Name',
      dataIndex: 'item_name',
      key: 'item_name',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Warranty Date',
      dataIndex: 'warranty_date',
      key: 'warranty_date',
      render: (_, record) => {
        return (
          <AntDatePicker
            value={dayjs(record.warranty_date)}
            placeholder='Select Date'
            size='small'
            onChange={(date) => {
              if (date) {
                dispatch(
                  updateSerialTableItem({
                    key: record.key,
                    field: 'warranty_date',
                    value: date.toDate(),
                  })
                );
              }
            }}
          />
        );
      },
    },
    {
      title: 'Serials',
      key: 'serials',
      dataIndex: 'serials',
      render: (_, record) => {
        return (
          <AntInput
            type='text'
            value={record.serials || ''}
            placeholder='Enter Serial Number'
            size='small'
            onKeyUp={(e) => handleKeyUp(e, record.key)}
            data-serial-key={record.key}
            onChange={(e) => {
              dispatch(
                updateSerialTableItem({
                  key: record.key,
                  field: 'serials',
                  value: e.target.value,
                })
              );
            }}
          />
        );
      },
    },

    {
      title: 'Actions',
      key: 'actions',
      width: 80,
      render: (_, record) => {
        return (
          <Button onClick={() => handleSerialDelete(record.key)} variant='outline-danger' size='sm'>
            <DeleteOutlined />
          </Button>
        );
      },
    },
  ];
};
