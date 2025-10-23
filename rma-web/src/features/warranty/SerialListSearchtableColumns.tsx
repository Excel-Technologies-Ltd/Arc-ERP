import { ColumnLink } from '@/components/Table/TableColumnUi';
import { URLViewSerialSearch } from '@/router/routes.url';
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
      render: (value) => ColumnLink(`${URLViewSerialSearch(value.toString())}`, value.toString()),
    },
    {
      key: 'mac_no',
      title: 'MAC NO',
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
      key: 'brand',
      title: 'BRAND',
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
    {
      key: 'purchase_date',
      title: 'PURCHASE DATE',
    },
  ];
};
