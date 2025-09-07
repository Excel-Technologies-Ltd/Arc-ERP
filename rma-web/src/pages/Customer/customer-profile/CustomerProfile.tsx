import AntModal from '@/components/Modal/AntModal';
import CustomTable from '@/components/Table/CustomTable';
import { getCustomerDocument, getCustomerList } from '@/services/customer/customer';
import { useEffect, useState } from 'react';
import AntInput from '@/components/Base/Form/FormInput/AntInput';
import AntSelect from '@/components/Base/Form/FormSelect/AntSelect';
import AntButton from '@/components/Base/Button/AntButton';
import { ClearOutlined, SearchOutlined } from '@ant-design/icons';
import { CustomerDetailsModal, CustomerProfileTableColumns } from '@/features/customer';
import { getTerritoryDropdownList } from '@/services/common/dropdownApi';

const CustomerProfile = () => {
  const [customerName, setCustomerName] = useState<string>('');
  const [searchCustomerName, setSearchCustomerName] = useState<string | null>(null);
  const [searchBranchName, setSearchBranchName] = useState<string | null>(null);
  const [selectedBranchName, setSelectedBranchName] = useState<string | null>(null);

  // Api Call
  const {
    data: customerList,
    isLoading: isLoadingCustomerList,
    total,
  } = getCustomerList({
    customer_name: searchCustomerName ?? '',
    territory: selectedBranchName ?? '',
  });
  const {
    data: customerDocument,
    isLoading: isLoadingCustomerDocument,
    mutate,
  } = getCustomerDocument(customerName);
  const { data: territoryList, isLoading: isLoadingTerritoryList } =
    getTerritoryDropdownList(searchBranchName);

  // Recall Customer Document when customer name changes
  useEffect(() => {
    if (customerName) {
      mutate(); // Trigger the customer document fetch
    }
  }, [customerName, mutate]);

  // Table Column
  const Column = CustomerProfileTableColumns(setCustomerName);

  // Clear Functions
  const handleClear = () => {
    setSearchCustomerName(null);
    setSearchBranchName(null);
  };

  return (
    <>
      <div className='flex flex-wrap items-center col-span-12 mt-5 intro-y xl:flex-nowrap gap-3'>
        <h2 className='text-lg font-medium intro-y whitespace-nowrap'>Customer Profile</h2>
        <div className='flex w-full gap-2 flex-wrap lg:flex-nowrap'>
          <AntInput
            placeholder='Customer Name'
            type='text'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchCustomerName(e.target.value)
            }
            value={searchCustomerName ?? ''}
          />
          <AntSelect
            placeholder='Select Territory'
            value={selectedBranchName ?? undefined}
            onChange={(value: string) => {
              setSelectedBranchName(value);
              setSearchBranchName(null);
            }}
            onSearch={(value: string) => setSearchBranchName(value)}
            loading={isLoadingTerritoryList}
            options={territoryList?.map((b) => ({
              value: b.name,
              label: b.territory_name,
            }))}
            notFoundText='No Territory Found'
          />
          <div className='flex items-center gap-2'>
            <AntButton icon={<SearchOutlined />}>Search</AntButton>
            <AntButton icon={<ClearOutlined />} onClick={handleClear}>
              Clear
            </AntButton>
          </div>
        </div>
      </div>
      <div className='mt-5'>
        <CustomTable
          tableHeader={Column || []}
          data={customerList || []}
          loading={isLoadingCustomerList}
          totalItems={total || 0}
        />
      </div>

      <AntModal
        footer={false}
        title={
          <div className='text-xl font-semibold text-center border-b border-gray-200 pb-2'>
            Brand Wise Limit - {customerName}
          </div>
        }
        loading={isLoadingCustomerDocument}
        width={800}
      >
        <CustomerDetailsModal customerDocument={customerDocument} />
      </AntModal>
    </>
  );
};

export default CustomerProfile;
