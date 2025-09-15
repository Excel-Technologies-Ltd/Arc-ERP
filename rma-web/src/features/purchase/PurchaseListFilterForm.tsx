import AntRangePicker from '@/components/Base/DatePicker/AntRangePicker';
import { AntInput, AntSelect } from '@/components/Base/Form';
import { PURCHASE_SELECT_STATUS } from '@/constants/app-strings';
import useDebouncedSearch from '@/hooks/debounce/useDebounceSearch';
import { RenderController } from '@/lib/hook-form/RenderController';
import { getSupplierDropdownList } from '@/services/common/dropdownApi';
import { PurchaseListFilterFormData } from '@/types/pages/purchase';
import { Control } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

const PurchaseListFilterForm = ({
  control,
  className,
}: {
  control: Control<PurchaseListFilterFormData>;
  className?: string;
}) => {
  // API Call start
  const {
    setSearchInput: setSupplierSearch,
    data: { data: suppliers, isLoading: isLoadingSuppliers },
  } = useDebouncedSearch({
    fetchFunction: getSupplierDropdownList,
  });
  // Api Call end

  return (
    <div
      className={twMerge(
        'grid grid-cols-1 md:grid-cols-2 lg:flex lg:items-center gap-2 w-full',
        className
      )}
    >
      {RenderController<PurchaseListFilterFormData>(
        control,
        'invoice_number',
        <AntInput type='text' placeholder='Invoice Number' />
      )}
      {RenderController<PurchaseListFilterFormData>(
        control,
        'status',
        <AntSelect placeholder='Status' options={PURCHASE_SELECT_STATUS} showSearch={false} />
      )}
      {RenderController<PurchaseListFilterFormData>(
        control,
        'supplier',
        <AntSelect
          placeholder='Select Supplier'
          onSearch={(value: string) => setSupplierSearch(value)}
          loading={isLoadingSuppliers}
          options={suppliers?.map((s) => ({
            value: s.name,
            label: s.supplier_name,
          }))}
          notFoundText='No Supplier Found'
          onClear={() => setSupplierSearch(null)}
          filterOption={false}
        />
      )}
      {RenderController<PurchaseListFilterFormData>(
        control,
        'date_range',
        <AntRangePicker placeholder={['Start Date', 'End Date']} />
      )}
    </div>
  );
};

export default PurchaseListFilterForm;
