import Button from '@/components/Base/Button';
import AntInput from '@/components/Base/Form/FormInput/AntInput';
import { getPurchaseInvoiceList, getSupplierList } from '@/services/purchase/purchase';
import { DatePicker, Select, Space, Spin, Table, Tag } from 'antd';
import { TableProps } from 'antd/es/table';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface DataType {
  key: string;
  invoice_number: string;
  status: string;
  progress: string;
  posting_date: string;
  supplier_name: string;
  total_amount: number;
  created_by: string;
  delivered_by: string;
}

const Purchase = () => {
  const [supplierSearch, setSupplierSearch] = useState<string | null>(null);

  // API Call to get suppliers based on search
  const { data: suppliers, isLoading: isLoadingSuppliers } = getSupplierList(supplierSearch);
  const { data: purchaseInvoices, isLoading: isLoadingPurchaseInvoices } = getPurchaseInvoiceList();

  console.log(purchaseInvoices);

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Invoice Number',
      dataIndex: 'invoice_number',
      key: 'invoice_number',
      render: (text) => (
        <Link to={`/`} className='text-blue-800 font-bold underline underline-offset-2'>
          {text}
        </Link>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Progress',
      dataIndex: 'progress',
      key: 'progress',
    },
    {
      title: 'Posting Date',
      key: 'posting_date',
      dataIndex: 'posting_date',
    },
    {
      title: 'Supplier Name',
      dataIndex: 'supplier_name',
      key: 'supplier_name',
    },
    {
      title: 'Total Amount',
      dataIndex: 'total_amount',
      key: 'total_amount',
    },
    {
      title: 'Created By',
      dataIndex: 'created_by',
      key: 'created_by',
    },
    {
      title: 'Delivered By',
      dataIndex: 'delivered_by',
      key: 'delivered_by',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <a>Edit</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className='flex items-center gap-2 py-5'>
        <h1 className='text-xl font-semibold w-full'>Purchase Invoice</h1>
        <AntInput placeholder='Purchase Invoice Number' type='text' />
        <Select
          placeholder='Status'
          allowClear={true}
          className='w-full'
          size='large'
          options={[
            { value: 'pending', label: 'Pending' },
            { value: 'approved', label: 'Approved' },
            { value: 'rejected', label: 'Rejected' },
          ]}
        />
        <Select
          onSearch={(value) => setSupplierSearch(value)} // Trigger the search on input change
          placeholder='Select Supplier'
          className='w-full'
          showSearch={true}
          allowClear={true}
          size='large'
          onChange={() => {
            setSupplierSearch(null);
          }}
          loading={isLoadingSuppliers}
          notFoundContent={isLoadingSuppliers ? <Spin /> : undefined}
          options={suppliers?.map((supplier) => ({
            value: supplier.supplier_name, // Search by supplier name
            label: supplier.supplier_name,
          }))}
        />
        <DatePicker.RangePicker allowClear={true} size='large' className='w-full' />
        <div className='flex items-center gap-2'>
          <Button variant='outline-primary'>Search</Button>
          <Button variant='outline-primary'>Clear</Button>
        </div>
      </div>

      <Table<DataType>
        columns={columns}
        dataSource={purchaseInvoices?.map((invoice) => ({
          key: invoice.name,
          invoice_number: invoice.name,
          status: invoice.status,
          progress: invoice.progress,
          posting_date: invoice.posting_date,
          supplier_name: invoice.supplier_name,
          total_amount: invoice.grand_total,
          created_by: invoice.owner,
          delivered_by: invoice.modified_by,
        }))}
        loading={{
          spinning: isLoadingPurchaseInvoices,
          tip: 'Loading',
        }}
      />
    </div>
  );
};

export default Purchase;
