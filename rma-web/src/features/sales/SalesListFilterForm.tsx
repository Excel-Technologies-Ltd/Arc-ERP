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
    <div
      className={twMerge(
        'grid grid-cols-1 md:grid-cols-2 lg:flex lg:items-center gap-2 w-full',
        className
      )}
    >
      <div className='md:col-span-2 lg:flex-1'>
        {RenderController<SalesInvoiceListFilterFormData>(
          control,
          'invoice_number',
          <AntInput type='text' placeholder='Invoice Number' />
        )}
      </div>

      <div className='lg:flex-1'>
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
      </div>

      <div className='lg:flex-1'>
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
      </div>

      <div className='lg:flex-1'>
        {RenderController<SalesInvoiceListFilterFormData>(
          control,
          'sales_person_name',
          <AntInput type='text' placeholder='Sales Person' />
        )}
      </div>

      <div className='lg:flex-1'>
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
      </div>

      <div className='md:col-span-2 lg:flex-1'>
        {RenderController<SalesInvoiceListFilterFormData>(
          control,
          'date_range',
          <AntRangePicker placeholder={['Start Date', 'End Date']} />
        )}
      </div>
    </div>
  );
};

export default SalesListFilterForm;
