import { SerialNoDataType } from '@/types/pages/warranty';
import { formatDate } from '@/utils/helper';
import { TableProps } from 'antd';

export const DeliveredSerialsTableColumn = (): TableProps<SerialNoDataType>['columns'] => {
  return [
    {
      key: 'sl',
      title: 'Sl',
      render: (_, __, index) => <span>{index + 1}</span>,
    },
    {
      key: 'serial_no',
      title: 'Serial No',
      dataIndex: 'serial_no',
    },
    {
      key: 'item_name',
      title: 'Item Name',
      dataIndex: 'item_name',
    },
    {
      key: 'warehouse',
      title: 'Warehouse',
      dataIndex: 'warehouse',
    },

    {
      key: 'warranty_date',
      title: 'Warranty Date',
      dataIndex: 'warranty',
      render: (value) => {
        return value.purchaseWarrantyDate;
      },
    },
    {
      key: 'purchased_on',
      title: 'Purchased On',
      dataIndex: 'warranty',
      render: (value) => {
        return value?.purchasedOn ? formatDate(value.purchasedOn, 'DD MMM, YYYY') : '-';
      },
    },
  ];
};
