import Button from '@/components/Base/Button';
import { AntInput, AntSelect } from '@/components/Base/Form';
import { ColumnSerialNumber } from '@/components/Table/TableColumnUi';
import { SALES_INVOICE_TYPE } from '@/constants/app-strings';
import useDebouncedSearch from '@/hooks/debounce/useDebounceSearch';
import { getAccountHeadDropdownList } from '@/services/common/dropdownApi';
import { AddSalesTaxesAndChargesTableDataType } from '@/types/pages/sales';
import { DeleteOutlined } from '@ant-design/icons';
import { TableProps } from 'antd';

export const AddSalesTaxesAndChargesColumns = ({
  taxesAndChargesTableData,
  setTaxesAndChargesTableData,
}: {
  taxesAndChargesTableData: AddSalesTaxesAndChargesTableDataType[];
  setTaxesAndChargesTableData: (data: AddSalesTaxesAndChargesTableDataType[]) => void;
}): TableProps<AddSalesTaxesAndChargesTableDataType>['columns'] => {
  const handleDeleteItem = (record: AddSalesTaxesAndChargesTableDataType) => {
    const updatedData = taxesAndChargesTableData.filter((item) => item.sl !== record.sl);
    setTaxesAndChargesTableData(updatedData);
  };

  // Api Call
  const {
    setSearchInput,
    data: { data: accountHeadList, isLoading: isLoadingAccountHeadList },
  } = useDebouncedSearch({
    fetchFunction: getAccountHeadDropdownList,
  });
  // Api Call End
  return [
    {
      title: 'SL',
      key: 'sl',
      render: (_, __, index) => ColumnSerialNumber(index),
      width: 10,
    },
    {
      title: 'Type',
      dataIndex: 'charge_type',
      render: (_, __, index) => {
        console.log(index);
        return (
          <AntSelect
            placeholder='Select Type'
            options={Object.values(SALES_INVOICE_TYPE)?.map((i) => ({
              value: i,
              label: i,
            }))}
            showSearch={false}
            size='middle'
          />
        );
      },
      width: 20,
    },
    {
      title: 'Account Head',
      render: () => {
        return (
          <AntSelect
            placeholder='Select Account Head'
            loading={isLoadingAccountHeadList}
            options={accountHeadList?.map((i) => ({
              value: i.name,
              label: i.account_name,
            }))}
            onClear={() => setSearchInput(null)}
            showSearch={{
              onSearch: (value) => setSearchInput(value),
              filterOption: false,
            }}
            notFoundText='No Account Head Found'
            size='middle'
          />
        );
      },
    },
    {
      title: 'Tax Rate',
      render: () => (
        <AntInput type='number' placeholder='Enter Tax Rate' size='middle' onChange={() => {}} />
      ),
    },
    {
      title: 'Amount',
      render: () => (
        <AntInput type='number' placeholder='Enter Amount' size='middle' onChange={() => {}} />
      ),
    },
    {
      title: 'Total',
      render: () => '0',
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button onClick={() => handleDeleteItem(record)} variant='outline-danger' size='sm'>
          <DeleteOutlined />
        </Button>
      ),
    },
  ];
};
