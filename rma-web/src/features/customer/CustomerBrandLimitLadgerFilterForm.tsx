import AntRangePicker from '@/components/Base/DatePicker/AntRangePicker';
import { AntInput, AntSelect } from '@/components/Base/Form';
import { RenderController } from '@/lib/hook-form/RenderController';
import { CustomerBrandLimitLadgerFilterFormData } from '@/types/pages/customer';
import { Control } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

export const CustomerBrandLimitLadgerFilterForm = ({
  control,
  className,
}: {
  control: Control<CustomerBrandLimitLadgerFilterFormData>;
  className?: string;
}) => {
  return (
    <div className={twMerge(className)}>
      {RenderController<CustomerBrandLimitLadgerFilterFormData>(
        control,
        'customer_name',
        <AntSelect
          placeholder='Customer Name'
          notFoundText='No Customer Name Found'
          options={Array.from({ length: 100 }, (_, i) => ({
            value: `Customer Name ${i + 1}`,
            label: `Customer Name ${i + 1}`,
          }))}
        />
      )}
      {RenderController<CustomerBrandLimitLadgerFilterFormData>(
        control,
        'brand_name',
        <AntSelect
          placeholder='Brand Name'
          notFoundText='No Brand Name Found'
          options={Array.from({ length: 100 }, (_, i) => ({
            value: `Brand Name ${i + 1}`,
            label: `Brand Name ${i + 1}`,
          }))}
        />
      )}
      {RenderController<CustomerBrandLimitLadgerFilterFormData>(
        control,
        'doc_id',
        <AntInput type='text' placeholder='Doc ID' />
      )}
      {RenderController<CustomerBrandLimitLadgerFilterFormData>(
        control,
        'date_range',
        <AntRangePicker placeholder={['Start Date', 'End Date']} />
      )}
    </div>
  );
};
