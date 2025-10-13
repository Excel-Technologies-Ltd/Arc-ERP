import AntRangePicker from '@/components/Base/DatePicker/AntRangePicker';
import { AntCheckBox, AntInput, AntSelect } from '@/components/Base/Form';
import useDebouncedSearch from '@/hooks/debounce/useDebounceSearch';
import { RenderController } from '@/lib/hook-form/RenderController';
import {
  getBrandDropdownList,
  getItemDropdownList,
  getWarehouseDropdownList,
} from '@/services/common/dropdownApi';
import { SerialListSearchFilterFormData } from '@/types/pages/warranty';
import { Control, useWatch } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

const SerialListSearchFilterForm = ({
  control,
  className,
}: {
  control: Control<SerialListSearchFilterFormData>;
  className?: string;
}) => {
  // Form Watch
  const { is_purchase, is_sold } = useWatch({ control });

  // API Call start
  // Item Dropdown Fetch
  const {
    setSearchInput: setItemSearch,
    data: { data: Items, isLoading: isLoadingItems },
  } = useDebouncedSearch({
    fetchFunction: getItemDropdownList,
  });

  // Warehouse Dropdown Fetch
  const {
    setSearchInput: setWarehouseSearch,
    data: { data: Warehouses, isLoading: isLoadingWarehouses },
  } = useDebouncedSearch({
    fetchFunction: getWarehouseDropdownList,
  });

  // Brand Dropdown Fetch
  const {
    setSearchInput: setBrandSearch,
    data: { data: Brands, isLoading: isLoadingBrands },
  } = useDebouncedSearch({
    fetchFunction: getBrandDropdownList,
  });
  // Api Call end
  return (
    <div className={twMerge(className)}>
      {RenderController<SerialListSearchFilterFormData>(
        control,
        'serial_no',
        <AntInput type='text' placeholder='Serial Number' />
      )}
      {RenderController<SerialListSearchFilterFormData>(
        control,
        'mac_address',
        <AntInput type='text' placeholder='Mac Address' />
      )}
      {RenderController<SerialListSearchFilterFormData>(
        control,
        'item_name',
        <AntSelect
          placeholder='Select Item Name'
          notFoundText='No Item Found'
          onSearch={(value: string) => setItemSearch(value)}
          loading={isLoadingItems}
          options={Items?.map((i) => ({
            value: i.name,
            label: i.item_name,
          }))}
          onClear={() => setItemSearch(null)}
          filterOption={false}
        />
      )}
      {RenderController<SerialListSearchFilterFormData>(
        control,
        'warehouse',
        <AntSelect
          placeholder='Select Warehouse Name'
          onSearch={(value: string) => setWarehouseSearch(value)}
          notFoundText='No Warehouse Found'
          loading={isLoadingWarehouses}
          options={Warehouses?.map((w) => ({
            value: w.name,
            label: w.warehouse_name,
          }))}
          onClear={() => setWarehouseSearch(null)}
          filterOption={false}
        />
      )}
      {RenderController<SerialListSearchFilterFormData>(
        control,
        'brand_name',
        <AntSelect
          placeholder='Select Brand Name'
          onSearch={(value: string) => setBrandSearch(value)}
          notFoundText='No Brand Found'
          loading={isLoadingBrands}
          options={Brands?.map((w) => ({
            value: w.name,
            label: w.brand,
          }))}
          onClear={() => setBrandSearch(null)}
          filterOption={false}
        />
      )}

      {RenderController<SerialListSearchFilterFormData>(
        control,
        'date_range',
        <AntRangePicker placeholder={['Start Date', 'End Date']} />
      )}
      <div className='w-full'>
        {RenderController<SerialListSearchFilterFormData>(
          control,
          'is_sold',
          <AntCheckBox label='Is Sold' className='min-w-fit' checked={is_sold} />
        )}
        {RenderController<SerialListSearchFilterFormData>(
          control,
          'is_purchase',
          <AntCheckBox label='Is Purchase' className='min-w-fit' checked={is_purchase} />
        )}
      </div>
    </div>
  );
};

export default SerialListSearchFilterForm;
