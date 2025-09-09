import { Control, UseFormSetValue, useWatch } from 'react-hook-form';
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
import useDebouncedSearch from '@/hooks/debounce/useDebounceSearch';
import dayjs from 'dayjs';
import { getCustomerRemainingBalance } from '@/services/sales/SalesInvoice';
import { CUSTOMER } from '@/constants/doctype-strings';

const AddSalesDetailsForm = ({
  control,
  setValue,
}: {
  control: Control<AddSalesFormData>;
  setValue: UseFormSetValue<AddSalesFormData>;
}) => {
  const [customerName] = useWatch({
    control,
    name: ['customer_name'],
  });
  const [customerDetails, setCustomerDetails] = useState<Customer | undefined>(undefined);
  const [customerAddress, setCustomerAddress] = useState<string | null>(null);

  // Api Call Start
  const { data: warehouseList, isLoading: isLoadingWarehouseList } = getWarehouseDropdownList();
  const { mutate } = getCustomerDocument(customerName);
  const { mutate: mutateRemainingBalance } = getCustomerRemainingBalance({
    party_type: CUSTOMER,
    party: customerName ?? '',
  });
  // Api Call End

  // Use debounced search for customer and territory dropdowns
  const {
    setSearchInput: setCustomerSearch,
    data: { data: customerList, isLoading: isLoadingCustomerList, mutate: mutateCustomerList },
  } = useDebouncedSearch({
    fetchFunction: getCustomerDropdownList,
  });

  const {
    setSearchInput: setTerritorySearch,
    data: { data: territoryList, isLoading: isLoadingTerritoryList },
  } = useDebouncedSearch({
    fetchFunction: getTerritoryDropdownList,
  });

  // Revalidate Customer Details
  useEffect(() => {
    if (customerName) {
      mutate()
        .then((data) => {
          setCustomerDetails(data);
          setValue('customer_details', data);
          setCustomerAddress(data?.customer_primary_address ?? null);
        })
        .finally(() => {
          mutateRemainingBalance().then((data) => {
            const total_brandLimit =
              customerDetails?.credit_limits?.reduce(
                (acc, curr) => acc + (curr.credit_limit || 0),
                0
              ) ?? 0;

            const remaining_balance = total_brandLimit - (data?.message || 0);
            setValue('remaining_balance', remaining_balance);
          });
        });
      // Revalidate Customer List
      mutateCustomerList();
    }
  }, [customerName, mutate, mutateCustomerList, setValue, customerDetails, mutateRemainingBalance]);

  return (
    <div className='mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 w-full bg-white dark:bg-darkmode-800 p-5 rounded-md drop-shadow-md intro-y'>
      {RenderController<AddSalesFormData>(
        control,
        'posting_date',
        <AntDatePicker placeholder='Select Posting Date' minDate={dayjs()} />
      )}

      {/* Customer Name */}
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
          onSearch={(value: string) => setCustomerSearch(value)}
          onClear={() => setCustomerSearch(null)}
        />
      )}

      {/* Due Date */}
      {RenderController<AddSalesFormData>(
        control,
        'due_date',
        <AntDatePicker placeholder='Select Due Date' />
      )}

      {/* Warehouse Name */}
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

      {/* Territory Name */}
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
          onSearch={(value: string) => setTerritorySearch(value)}
          onClear={() => setTerritorySearch(null)}
        />
      )}

      {/* Customer Address */}
      {RenderController<AddSalesFormData>(
        control,
        'customer_address',
        <AntSelect
          placeholder='Select Address'
          options={customerAddress ? [{ value: customerAddress, label: customerAddress }] : []}
          notFoundText='No Address Found'
          disabled={!customerName}
        />
      )}

      {/* Remarks */}
      {RenderController<AddSalesFormData>(
        control,
        'remarks',
        <AntInput type='text' placeholder='Enter Remarks' />
      )}
    </div>
  );
};

export default AddSalesDetailsForm;
