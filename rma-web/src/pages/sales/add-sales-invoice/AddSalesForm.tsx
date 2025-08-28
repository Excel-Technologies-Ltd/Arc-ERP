import { Control } from 'react-hook-form';
import { AddSalesFormData } from './AddSalesInvoice';
import { RenderController } from '@/lib/hook-form/RenderController';
import AntSelect from '@/components/Base/Form/FormSelect/AntSelect';
import AntDatePicker from '@/components/Base/DatePicker/AntDatePicker';
import AntInput from '@/components/Base/Form/FormInput/AntInput';

const AddSalesForm = ({ control }: { control: Control<AddSalesFormData> }) => {
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
          options={Array.from({ length: 100 }, (_, i) => ({
            value: `Customer ${i + 1}`,
            label: `Customer ${i + 1}`,
          }))}
          loading={false}
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
          options={Array.from({ length: 100 }, (_, i) => ({
            value: `Warehouse ${i + 1}`,
            label: `Warehouse ${i + 1}`,
          }))}
          loading={false}
          notFoundText='No Warehouse Found'
        />
      )}

      {RenderController<AddSalesFormData>(
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
      {RenderController<AddSalesFormData>(
        control,
        'customer_address',
        <AntSelect
          placeholder='Select Address'
          options={Array.from({ length: 100 }, (_, i) => ({
            value: `Address ${i + 1}`,
            label: `Address ${i + 1}`,
          }))}
          loading={false}
          notFoundText='No Address Found Found'
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

export default AddSalesForm;
