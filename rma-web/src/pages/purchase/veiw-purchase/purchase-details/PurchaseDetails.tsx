import SummaryCard from '@/components/Cards/SummaryCard/SummaryCard';
import AntCustomTable from '@/components/Table/AntCustomTable';
import { getPurchaseInvoiceDetails } from '@/services/purchase/purchase';
import { Spin } from 'antd';
import { type TableProps } from 'antd/es/table';
import { useParams } from 'react-router-dom';

interface DataType {
  key: string;
  item_group: string;
  item_name: string;
  quantity: number;
  rate: number;
  total: number;
}

const PurchaseDetails = () => {
  const { invoice_number } = useParams();
  const {
    data: purchaseInvoiceDetails,
    isLoading,
    isValidating,
  } = getPurchaseInvoiceDetails(invoice_number ?? '');

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
      <Spin spinning={isLoading || isValidating}>
        <SummaryCard
          supplier={purchaseInvoiceDetails?.supplier ?? ''}
          invoiceNo={purchaseInvoiceDetails?.name ?? ''}
          postingDate={purchaseInvoiceDetails?.posting_date ?? ''}
          warehouse={purchaseInvoiceDetails?.set_warehouse ?? ''}
          status={purchaseInvoiceDetails?.status ?? ''}
          poNumber={purchaseInvoiceDetails?.items.map((i) => i.purchase_order).join(', ') ?? ''}
        />

        <div className='mt-5 w-full'>
          <AntCustomTable<DataType>
            columns={columns}
            data={purchaseInvoiceDetails?.items?.map((invoice) => ({
              key: invoice.name,
              item_group: invoice.item_group,
              item_name: invoice.item_name,
              quantity: invoice.qty,
              rate: invoice.rate,
              total: invoice.amount,
            }))}
            loading={false}
            title={() => <div className='text-lg font-bold text-center'>Purchased Items</div>}
          />
        </div>
      </Spin>
    </div>
  );
};

export default PurchaseDetails;
