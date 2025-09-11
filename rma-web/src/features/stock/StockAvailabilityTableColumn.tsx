import { StockEntryDetail } from '@/types/Stock/StockEntryDetail';
import { TableColumn } from '@/types/Table/table-types';

export const StockAvailabilityTableColumn = (): TableColumn<StockEntryDetail>[] => {
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
      key: 'item_group',
      title: 'Item Group',
    },
    {
      key: 'item_brand',
      title: 'Item Brand',
    },
    {
      key: 'warehouse',
      title: 'Warehouse',
    },
    {
      key: 'actual_quantity',
      title: 'Actual Quantity',
    },
  ];
};
