import AntInput from '@/components/Base/Form/FormInput/AntInput';
import AntSelect from '@/components/Base/Form/FormSelect/AntSelect';
import { type TableProps } from 'antd/es/table';
import { AddSalesFormData, AddSalesItemTableDataType } from '@/types/pages/sales';
import { getItemDropdownList } from '@/services/common/dropdownApi';
import useDebouncedSearch from '@/hooks/debounce/useDebounceSearch';
import { UseFormWatch } from 'react-hook-form';
import { getBinList } from '@/services/bin/bin';
import { useEffect, useState } from 'react';
import { useNotify } from '@/hooks/useNotify';

export const AddSalesTableColumns = ({
  tableData,
  setTableData,
  watch,
}: {
  tableData: AddSalesItemTableDataType[];
  setTableData: (data: AddSalesItemTableDataType[]) => void;
  watch: UseFormWatch<AddSalesFormData>;
}): TableProps<AddSalesItemTableDataType>['columns'] => {
  const notify = useNotify();
  const { warehouse_name } = watch();
  const [itemSelect, setItemSelect] = useState<string>('');
  // Api Call
  const {
    setSearchInput,
    data: { data: itemList, isLoading: isLoadingItemList },
  } = useDebouncedSearch({
    fetchFunction: getItemDropdownList,
  });
  const { mutate: mutateBinList } = getBinList(itemSelect, warehouse_name ?? '');
  // Api Call End

  // Update Table Data on Change
  const handleTableDataChange = (
    fieldName: keyof AddSalesItemTableDataType,
    index: number,
    value: string | number
  ) => {
    setTableData(
      tableData.map((item, i) => {
        if (i !== index) return item;
        const updatedItem = { ...item, [fieldName]: value };

        // Ensure numeric values
        const quantity = Number(updatedItem.quantity) || 0;
        const rate = Number(updatedItem.rate) || 0;

        // Recalculate total
        updatedItem.total = quantity * rate;

        return updatedItem;
      })
    );
  };

  // Handle Item Change
  useEffect(() => {
    if (itemSelect) {
      mutateBinList().then((data) => {
        setTableData(
          tableData.map((item) => ({
            ...item,
            available_stock: data?.message?.actual_qty || '0',
          }))
        );
      });
    }
  }, [itemSelect, warehouse_name, mutateBinList]);

  return [
    {
      title: 'Item',
      dataIndex: 'item_name',
      key: 'item_name',
      render: () => (
        <AntSelect
          placeholder='Select Item'
          options={itemList?.map((i) => ({
            value: i.name,
            label: i.item_name,
          }))}
          loading={isLoadingItemList}
          size='middle'
          notFoundText='No Item Found'
          onSearch={(value) => setSearchInput(value)}
          onClear={() => setSearchInput(null)}
          onChange={(value) => {
            if (!warehouse_name) {
              notify.error({
                message: 'Error',
                description: 'Please select warehouse first',
              });
            }
            setItemSelect(value);
          }}
        />
      ),
    },
    {
      title: 'Available Stock',
      dataIndex: 'available_stock',
      key: 'available_stock',
      render(value) {
        return (
          <span className={`${value === 'Select Item Name' ? 'text-red-500 font-semibold' : ''}`}>
            {value || ''}
          </span>
        );
      },
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_, __, index) => (
        <AntInput
          type='number'
          placeholder='Enter Quantity'
          size='middle'
          onChange={(e) => {
            handleTableDataChange('quantity', index, e.target.value);
          }}
        />
      ),
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
      key: 'rate',
      render: (_, __, index) => (
        <AntInput
          type='number'
          placeholder='Enter Rate'
          size='middle'
          onChange={(e) => handleTableDataChange('rate', index, e.target.value)}
        />
      ),
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (value) => <div>{value || '0'}</div>,
    },
  ];
};
