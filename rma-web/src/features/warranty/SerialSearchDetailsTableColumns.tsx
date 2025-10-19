import { SerialNoHistoryType } from '@/types/pages/warranty';
import { TableProps } from 'antd';
import dayjs from 'dayjs';

const SerialSearchDetailsTableColumns = (): TableProps<SerialNoHistoryType>['columns'] => {
  return [
    {
      key: 'event_type',
      title: 'Event Type',
      dataIndex: 'eventType',
    },
    {
      key: 'transaction_from',
      title: 'Transaction From',
      dataIndex: 'transaction_from',
    },
    {
      key: 'transaction_to',
      title: 'Transaction To',
      dataIndex: 'transaction_to',
    },
    {
      key: 'document_type',
      title: 'Document Type',
      dataIndex: 'document_type',
    },
    {
      key: 'doc_no',
      title: 'Doc No',
      dataIndex: 'document_no',
    },
    {
      key: 'created_by',
      title: 'Created By',
      dataIndex: 'created_by',
    },
    {
      key: 'parent_doc',
      title: 'Parent Doc',
      dataIndex: 'parent_document',
    },
    {
      key: 'created_on',
      title: 'Created On',
      dataIndex: 'eventDate',
      render: (value) => dayjs(value).format('D MMM, YYYY'),
    },
  ];
};

export default SerialSearchDetailsTableColumns;
