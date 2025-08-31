import AntRangePicker from '@/components/Base/DatePicker/AntRangePicker';
import AntInput from '@/components/Base/Form/FormInput/AntInput';
import AntSelect from '@/components/Base/Form/FormSelect/AntSelect';
import { RenderController } from '@/lib/hook-form/RenderController';
import { SalesInvoiceListFilterFormData } from '@/types/pages/sales';
import { Control } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

const SalesListFilterForm = ({
  control,
  className,
}: {
  control: Control<SalesInvoiceListFilterFormData>;
  className?: string;
}) => {
  return (
    <div className={twMerge(className)}>
      {RenderController<SalesInvoiceListFilterFormData>(
        control,
        'invoice_number',
        <AntInput type='text' placeholder='Invoice Number' />
      )}
      {RenderController<SalesInvoiceListFilterFormData>(
        control,
        'customer_name',
        <AntSelect
          placeholder='Select Customer'
          options={Array.from({ length: 100 }, (_, i) => ({
            value: `Customer ${i + 1}`,
            label: `Customer ${i + 1}`,
          }))}
          loading={false}
          notFoundText='No Customer Found'
        />
      )}
      {RenderController<SalesInvoiceListFilterFormData>(
        control,
        'territory_name',
        <AntSelect
          placeholder='Select Territory'
          options={Array.from({ length: 100 }, (_, i) => ({
            value: `Territory ${i + 1}`,
            label: `Territory ${i + 1}`,
          }))}
          loading={false}
          notFoundText='No Territory Found'
        />
      )}
      {RenderController<SalesInvoiceListFilterFormData>(
        control,
        'sales_person_name',
        <AntInput type='text' placeholder='Sales Person' />
      )}
      {RenderController<SalesInvoiceListFilterFormData>(
        control,
        'status',
        <AntSelect
          placeholder='Select Status'
          options={Array.from({ length: 100 }, (_, i) => ({
            value: `Status ${i + 1}`,
            label: `Status ${i + 1}`,
          }))}
          loading={false}
          notFoundText='No Status Found'
        />
      )}
      {RenderController<SalesInvoiceListFilterFormData>(
        control,
        'date_range',
        <AntRangePicker placeholder={['Start Date', 'End Date']} />
      )}
    </div>
  );
};

export default SalesListFilterForm;
