import { type TableProps } from 'antd/es/table';
import { SerialItemType } from '../Serials';
import AntDatePicker from '@/components/Base/DatePicker/AntDatePicker';
import dayjs from 'dayjs';
import AntInput from '@/components/Base/Form/FormInput/AntInput';

export const SerialTableColumns: TableProps<SerialItemType>['columns'] = [
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
        <AntDatePicker value={dayjs(record.warranty_date)} placeholder='Select Date' size='small' />
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
          value={record.serials || undefined}
          placeholder='Enter Serial Number'
          size='small'
        />
      );
    },
  },
];
