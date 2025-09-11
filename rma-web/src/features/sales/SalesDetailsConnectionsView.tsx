import { useState } from 'react';
import Tab from '@/components/Base/Headless/Tab';
import AntCustomTable from '@/components/Table/AntCustomTable';
import { type TableProps } from 'antd/es/table';

const SalesDetailsConnectionsView = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const tabItems = [
    {
      key: '1',
      label: 'Accounts',
      content: <AccountsTab />,
    },
    {
      key: '2',
      label: 'Returns',
      content: <ReturnsTab />,
    },
    {
      key: '3',
      label: 'Warrenty',
      content: <WarrentyTab />,
    },
  ];

  return (
    <div>
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List variant='boxed-tabs'>
          {tabItems.map((item) => (
            <Tab key={item.key}>
              <Tab.Button className='text-center font-semibold'>{item.label}</Tab.Button>
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {tabItems.map((item) => (
            <Tab.Panel className='mt-5' key={item.key}>
              {item.content}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default SalesDetailsConnectionsView;

// Accounts Tab Design
export const AccountsTab = () => {
  const Columns: TableProps<any>['columns'] = [
    { key: 'rv_name', title: 'RV name', dataIndex: 'rv_name' },
    { key: 'posting_date', title: 'Posting Date', dataIndex: 'posting_date' },
    { key: 'paid_amount', title: 'Paid Amount', dataIndex: 'paid_amount' },
    { key: 'payment_type', title: 'Payment Type', dataIndex: 'payment_type' },
    { key: 'company_name', title: 'Company Name', dataIndex: 'company_name' },
    { key: 'mode_of_pay', title: 'Mode of Pay', dataIndex: 'mode_of_pay' },
    { key: 'party_type', title: 'Party type', dataIndex: 'party_type' },
    { key: 'party_name', title: 'Party Name', dataIndex: 'party_name' },
    { key: 'party_balance', title: 'Party Balance', dataIndex: 'party_balance' },
    { key: 'created_by', title: 'Created By', dataIndex: 'created_by' },
    { key: 'modified_by', title: 'Modified By', dataIndex: 'modified_by' },
  ];
  return (
    <div className='w-full'>
      <AntCustomTable
        data={Array.from({ length: 5 }, (_, index) => ({
          rv_name: `RV ${index + 1}`,
          posting_date: `2021-01-01`,
          paid_amount: 1000,
          payment_type: 'Cash',
          company_name: `Company ${index + 1}`,
          mode_of_pay: 'Cash',
          party_type: 'Customer',
          party_name: `Customer ${index + 1}`,
          party_balance: 1000,
          created_by: `Created By ${index + 1}`,
          modified_by: `Modified By ${index + 1}`,
        }))}
        columns={Columns}
        size='large'
      />
    </div>
  );
};

// Returns Tab Design
export const ReturnsTab = () => {
  const Columns: TableProps<any>['columns'] = [
    {
      key: 'sl',
      title: 'SL',
      dataIndex: 'sl',
      render: (_, __, index) => index + 1,
      width: '100px',
    },
    { key: 'serial_no', title: 'Serial No', dataIndex: 'serial_no', width: '300px' },
    {
      key: 'item_name',
      title: 'Item Name',
      dataIndex: 'item_name',
    },
  ];
  return (
    <>
      <AntCustomTable
        data={Array.from({ length: 5 }, (_, index) => ({
          sl: index + 1,
          serial_no: `Serial No ${index + 1}`,
          item_name: `Item Name ${index + 1}`,
        }))}
        columns={Columns}
        size='large'
      />
    </>
  );
};

// Warrenty Tab Design
export const WarrentyTab = () => {
  const Columns: TableProps<any>['columns'] = [
    { key: 'claim_no', title: 'Claim No', dataIndex: 'claim_no', width: '180px' },
    { key: 'claimed_item', title: 'Claimed Item', dataIndex: 'claimed_item', width: '220px' },
    { key: 'serial', title: 'Serial', dataIndex: 'serial', width: '220px' },
    {
      key: 'claims_received_date',
      title: 'Claims Received Date',
      dataIndex: 'claims_received_date',
      width: '180px',
    },
    { key: 'status', title: 'Status', dataIndex: 'status', width: '140px' },
    { key: 'delivery_date', title: 'Delivery Date', dataIndex: 'delivery_date', width: '160px' },
    { key: 'created_by', title: 'Created By', dataIndex: 'created_by', width: '160px' },
  ];
  return (
    <>
      <AntCustomTable
        data={Array.from({ length: 5 }, (_, index) => ({
          sl: index + 1,
          claim_no: `Claim No ${index + 1}`,
          claimed_item: `Claimed Item ${index + 1}`,
          serial: `Serial ${index + 1}`,
          claims_received_date: `Claims Received Date ${index + 1}`,
          status: `Status ${index + 1}`,
          delivery_date: `Delivery Date ${index + 1}`,
          created_by: `Created By ${index + 1}`,
          item_name: `Item Name ${index + 1}`,
        }))}
        columns={Columns}
        size='large'
      />
    </>
  );
};
