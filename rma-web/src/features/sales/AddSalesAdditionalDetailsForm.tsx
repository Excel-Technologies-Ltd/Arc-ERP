import { Control, useWatch } from 'react-hook-form';
import { AddSalesFormData } from '@/types/pages/sales';
import { RenderController } from '@/lib/hook-form/RenderController';
import { AntInput, AntSelect } from '@/components/Base/Form';
import AntDatePicker from '@/components/Base/DatePicker/AntDatePicker';
import { SALES_INVOICE_TYPE } from '@/constants/app-strings';
import { SalesInvoice } from '@/types/Accounts/SalesInvoice';
import useDebouncedSearch from '@/hooks/debounce/useDebounceSearch';
import { getProjectDropdownList } from '@/services/common/dropdownApi';

const AddSalesAdditionalDetailsForm = ({ control }: { control: Control<AddSalesFormData> }) => {
  const { invoice_type } = useWatch({ control });
  console.log(invoice_type);
  const {
    setSearchInput: setProjectSearch,
    data: { data: projectList, isLoading: isLoadingProjectList },
  } = useDebouncedSearch({
    fetchFunction: getProjectDropdownList,
  });
  return (
    <div className='mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-2 w-full bg-white dark:bg-darkmode-800 p-5 rounded-md drop-shadow-md border dark:border-darkmode-800 intro-y'>
      {RenderController<AddSalesFormData>(
        control,
        'customer_mfs_name',
        <AntInput type='text' placeholder='Enter Customer MFS Name' label='Customer MFS Name' />
      )}
      {RenderController<AddSalesFormData>(
        control,
        'project_name',
        <AntSelect
          label='Project Name'
          placeholder='Select Project'
          options={projectList?.map((p) => ({
            value: p.name,
            label: p.project_name,
          }))}
          loading={isLoadingProjectList}
          notFoundText='No Project Found'
          onSearch={(value: string) => setProjectSearch(value)}
          onClear={() => setProjectSearch(null)}
        />
      )}
      {RenderController<AddSalesFormData>(
        control,
        'customer_purchase_order',
        <AntInput
          type='text'
          placeholder='Enter Customer Purchase Order'
          label='Customer Purchase Order'
        />
      )}
      {RenderController<AddSalesFormData>(
        control,
        'customer_purchase_order_date',
        <AntDatePicker
          placeholder='Select Customer Purchase Order Date'
          label='Customer Purchase Order Date'
        />
      )}
      {RenderController<AddSalesFormData>(
        control,
        'invoice_type',
        <AntSelect
          label='Invoice Type'
          placeholder='Select Invoice Type'
          options={Object.values(SALES_INVOICE_TYPE).map((value) => ({
            value: value as SalesInvoice['excel_invoice_type'],
            label: value as string,
          }))}
        />
      )}
      {invoice_type === SALES_INVOICE_TYPE.COMPLETED_PROJECT && (
        <>
          {RenderController<AddSalesFormData>(
            control,
            'hand_over_date',
            <AntDatePicker label='Hand Over Date' placeholder='Select Hand Over Date' />
          )}
        </>
      )}
    </div>
  );
};

export default AddSalesAdditionalDetailsForm;
