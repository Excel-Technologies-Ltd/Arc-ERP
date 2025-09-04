import { TableColumn } from '@/types/Table/table-types';

export const StockSerialTableColumn = (): TableColumn<any>[] => {
  return [
    {
      key: 'sl',
      title: 'SL',
      render: (_, __, index) => <span>{index + 1}</span>,
      width: '50px',
    },
    {
      key: 'item_name',
      title: 'Item Name',
    },
    {
      key: 'item_code',
      title: 'Item Code',
    },
    {
      key: 'warehouse',
      title: 'Warehouse',
    },
    {
      key: 'serial_quantity',
      title: 'Serial Quantity',
    },
  ];
};
