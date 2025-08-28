import SummaryCard from '@/components/Cards/SummaryCard/SummaryCard';
import AntCustomTable from '@/components/Table/AntCustomTable';
import { PurchaseInvoice } from '@/types/Accounts/PurchaseInvoice';
import { type TableProps } from 'antd/es/table';

interface DataType {
  key: string;
  item_group: string;
  item_name: string;
  quantity: number;
  rate: number;
  total: number;
}

const PurchaseDetails = ({ data }: { data: PurchaseInvoice }) => {
  // Table Columns
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Item Group',
      dataIndex: 'item_group',
      key: 'item_group',
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
      title: 'Rate',
      dataIndex: 'rate',
      key: 'rate',
    },

    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },
  ];

  return (
    <div className='mt-5'>
      <SummaryCard
        supplier={data?.supplier ?? ''}
        invoiceNo={data?.name ?? ''}
        postingDate={data?.posting_date ?? ''}
        warehouse={data?.set_warehouse ?? ''}
        status={data?.status ?? ''}
        poNumber={data?.items.map((i) => i.purchase_order).join(', ') ?? ''}
      />

      <div className='mt-5 w-full'>
        <AntCustomTable<DataType>
          columns={columns}
          data={data?.items?.map((invoice) => ({
            key: invoice.name,
            item_group: invoice.item_group ?? '',
            item_name: invoice.item_name ?? '',
            quantity: invoice.qty,
            rate: invoice.rate,
            total: invoice.amount,
          }))}
          loading={false}
          title={() => <div className='text-lg font-bold text-center'>Purchased Items</div>}
        />
      </div>
    </div>
  );
};

export default PurchaseDetails;
