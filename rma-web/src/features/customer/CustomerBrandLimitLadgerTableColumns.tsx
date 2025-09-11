import { TableColumn } from '@/types/Table/table-types';
import { BrandWiseAllocations } from '@/types/ExcelERPNext/BrandWiseAllocations';
import dayjs from 'dayjs';

export const CustomerBrandLimitLadgerTableColumns = (): TableColumn<BrandWiseAllocations>[] => {
  return [
    {
      key: 'sl',
      title: 'SL',
      render: (_, __, index) => <span>{index + 1}</span>,
    },
    {
      key: 'date',
      title: 'Date',
      render: (value) => dayjs(value).format('DD MMM, YYYY'),
    },
    {
      key: 'brand',
      title: 'Brand',
    },
    {
      key: 'transactions',
      title: 'Transactions',
    },
    {
      key: 'remaining_limit',
      title: 'Remaining Limit',
    },
    {
      key: 'doctype',
      title: 'Doctype',
    },
    {
      key: 'doc_id',
      title: 'Doc Id',
    },
  ];
};
