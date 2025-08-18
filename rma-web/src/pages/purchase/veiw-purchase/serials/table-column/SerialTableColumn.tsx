import { type TableProps } from 'antd/es/table';
import { SerialItemType } from '../Serials';
import { Popconfirm } from 'antd';
import { QuestionCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import Button from '@/components/Base/Button';
import AntDatePicker from '@/components/DatePicker/AntDatePicker';
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
    title: 'Serial No',
    dataIndex: 'serial_no',
    key: 'serial_no',
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
          value={record.serials}
          placeholder='Enter Serial Number'
          size='small'
        />
      );
    },
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (_, record) => {
      return (
        <Popconfirm
          title='Delete'
          description='Are you sure?'
          onConfirm={() => console.log(record)}
          okText='Delete'
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
        >
          <Button variant='outline-danger' size='sm'>
            <DeleteOutlined />
          </Button>
        </Popconfirm>
      );
    },
  },
];
