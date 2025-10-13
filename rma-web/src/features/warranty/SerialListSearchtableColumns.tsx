import { SerialNoDataType } from '@/types/pages/warranty';
import { TableColumn } from '@/types/Table/table-types';

export const SerialListSearchtableColumns = (): TableColumn<SerialNoDataType>[] => {
  return [
    {
      key: 'sl',
      title: 'SL',
      render: (_, __, index) => <span>{index + 1}</span>,
    },
    {
      key: 'serial_no',
      title: 'SERIAL NO',
      render: (value) => value,
    },
    {
      key: 'item_name',
      title: 'ITEM NAME',
      render: (value) => value,
    },
    {
      key: 'item_code',
      title: 'ITEM CODE',
      render: (value) => value,
    },
    {
      key: 'warehouse',
      title: 'WAREHOUSE',
      render: (value) => value,
    },
    {
      key: 'purchase_document_no',
      title: 'PURCHASE RECEIPT',
      render: (value) => value,
    },
    {
      key: 'delivary_note',
      title: 'DELIVARY NOTE',
      render: (value) => value,
    },
    {
      key: 'customer',
      title: 'CUSTOMER',
      render: (value) => value,
    },
    {
      key: 'supplier',
      title: 'SUPPLIER',
      render: (value) => value,
    },
  ];
};
