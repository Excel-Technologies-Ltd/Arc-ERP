import { ColumnLink } from '@/components/Table/TableColumnUi';
import { URLSerialDetailSearch } from '@/router/routes.url';
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
      render: (value) =>
        ColumnLink(`${URLSerialDetailSearch()}?serial_no=${value.toString()}`, value.toString()),
    },
    {
      key: 'item_name',
      title: 'ITEM NAME',
    },
    {
      key: 'item_code',
      title: 'ITEM CODE',
    },
    {
      key: 'warehouse',
      title: 'WAREHOUSE',
    },
    {
      key: 'purchase_document_no',
      title: 'PURCHASE RECEIPT',
    },
    {
      key: 'delivary_note',
      title: 'DELIVARY NOTE',
    },
    {
      key: 'customer',
      title: 'CUSTOMER',
    },
    {
      key: 'supplier',
      title: 'SUPPLIER',
    },
  ];
};
