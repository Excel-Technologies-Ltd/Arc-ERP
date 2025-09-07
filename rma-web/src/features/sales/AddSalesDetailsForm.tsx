import { Control, useWatch } from 'react-hook-form';
import { RenderController } from '@/lib/hook-form/RenderController';
import AntSelect from '@/components/Base/Form/FormSelect/AntSelect';
import AntDatePicker from '@/components/Base/DatePicker/AntDatePicker';
import AntInput from '@/components/Base/Form/FormInput/AntInput';
import { AddSalesFormData } from '@/types/pages/sales';
import {
  getCustomerDropdownList,
  getWarehouseDropdownList,
  getTerritoryDropdownList,
} from '@/services/common/dropdownApi';
import { getCustomerDocument } from '@/services/customer/customer';
import { useEffect, useState } from 'react';
import { Customer } from '@/types/Selling/Customer';

const AddSalesDetailsForm = ({ control }: { control: Control<AddSalesFormData> }) => {
  const [customerName] = useWatch({
    control,
    name: ['customer_name'],
  });
  const [customerDetails, setCustomerDetails] = useState<Customer | undefined>(undefined);
  const [customerAddress, setCustomerAddress] = useState<string[]>([]);
  console.log(customerDetails);

  // Api Call Start
  const {
    data: customerList,
    isLoading: isLoadingCustomerList,
    mutate: mutateCustomerList,
  } = getCustomerDropdownList(customerName);
  const { data: warehouseList, isLoading: isLoadingWarehouseList } = getWarehouseDropdownList();
  const { data: territoryList, isLoading: isLoadingTerritoryList } = getTerritoryDropdownList();
  const { mutate } = getCustomerDocument(customerName);
  // Api Call End

  useEffect(() => {
    if (customerName) {
      mutate().then((data) => {
        setCustomerDetails(data);
        setCustomerAddress((prev) => [...prev, data?.primary_address ?? '']);
      });
      mutateCustomerList();
    }
  }, [customerName, mutate, mutateCustomerList]);

  return (
    <div className='mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 w-full bg-white dark:bg-darkmode-800 p-5 rounded-md drop-shadow-md intro-y'>
      {RenderController<AddSalesFormData>(
        control,
        'posting_date',
        <AntDatePicker placeholder='Select Posting Date' />
      )}

      {RenderController<AddSalesFormData>(
        control,
        'customer_name',
        <AntSelect
          placeholder='Select Customer'
          options={customerList?.map((c) => ({
            value: c.name,
            label: c.customer_name,
          }))}
          loading={isLoadingCustomerList}
          notFoundText='No Customer Found'
        />
      )}
      {RenderController<AddSalesFormData>(
        control,
        'due_date',
        <AntDatePicker placeholder='Select Due Date' />
      )}

      {RenderController<AddSalesFormData>(
        control,
        'warehouse_name',
        <AntSelect
          placeholder='Select Warehouse'
          options={warehouseList?.map((w) => ({
            value: w.name,
            label: w.warehouse_name,
          }))}
          loading={isLoadingWarehouseList}
          notFoundText='No Warehouse Found'
        />
      )}

      {RenderController<AddSalesFormData>(
        control,
        'territory_name',
        <AntSelect
          placeholder='Select Territory'
          options={territoryList?.map((t) => ({
            value: t.name,
            label: t.territory_name,
          }))}
          loading={isLoadingTerritoryList}
          notFoundText='No Territory Found'
        />
      )}
      {RenderController<AddSalesFormData>(
        control,
        'customer_address',
        <AntSelect
          placeholder='Select Address'
          options={customerAddress.map((address) => ({
            value: address,
            label: address,
          }))}
          notFoundText='No Address Found'
          disabled={!customerName}
        />
      )}
      {RenderController<AddSalesFormData>(
        control,
        'remarks',
        <AntInput type='text' placeholder='Enter Remarks' />
      )}
    </div>
  );
};

export default AddSalesDetailsForm;
