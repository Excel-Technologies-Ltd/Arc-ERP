import AntDatePicker from '@/components/Base/DatePicker/AntDatePicker';
import AntSelect from '@/components/Base/Form/FormSelect/AntSelect';
import AntInput from '@/components/Base/Form/FormInput/AntInput';
import { RenderController } from '@/lib/hook-form/RenderController';
import { AddStockFormData } from '@/types/pages/stock';
import { StockEntryType } from '@/utils/enums';
import { Control, useWatch } from 'react-hook-form';
import { AntUpload } from '@/components/Base/Form';

const AddStockForm = ({ control }: { control: Control<AddStockFormData> }) => {
  const watch = useWatch({ control, name: 'entry_type' });
  return (
    <div className='bg-white dark:bg-darkmode-800 p-5 rounded-md drop-shadow-md'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 w-full '>
        {RenderController<AddStockFormData>(
          control,
          'territory_name',
          <AntSelect
            placeholder='Select Territory'
            notFoundText='No Territory Found'
            options={Array.from({ length: 100 }, (_, i) => ({
              value: `Territory ${i + 1}`,
              label: `Territory ${i + 1}`,
            }))}
          />
        )}
        {RenderController<AddStockFormData>(
          control,
          'entry_type',
          <AntSelect
            placeholder='Select Entry Type'
            notFoundText='No Entry Type Found'
            options={Object.entries(StockEntryType).map(([, value]) => ({
              value: value,
              label: value,
            }))}
          />
        )}
        {watch &&
          watch !== StockEntryType.MATERIAL_TRANSFER &&
          RenderController<AddStockFormData>(
            control,
            'account_name',
            <AntSelect
              placeholder='Select Account'
              notFoundText='No Account Found'
              options={Array.from({ length: 100 }, (_, i) => ({
                value: `Account ${i + 1}`,
                label: `Account ${i + 1}`,
              }))}
            />
          )}
        {watch &&
          (watch === StockEntryType.MATERIAL_ISSUE || watch === StockEntryType.R_D_PRODUCTS) &&
          RenderController<AddStockFormData>(
            control,
            'customer_name',
            <AntSelect
              placeholder='Select Customer'
              notFoundText='No Customer Found'
              options={Array.from({ length: 100 }, (_, i) => ({
                value: `Customer ${i + 1}`,
                label: `Customer ${i + 1}`,
              }))}
            />
          )}
        {RenderController<AddStockFormData>(
          control,
          'posting_date',
          <AntDatePicker placeholder='Select Posting Date' />
        )}
        {RenderController<AddStockFormData>(
          control,
          'remarks',
          <AntInput type='text' placeholder='Enter Remarks' />
        )}
        {watch &&
          (watch === StockEntryType.MATERIAL_ISSUE || watch === StockEntryType.R_D_PRODUCTS) &&
          RenderController<AddStockFormData>(
            control,
            'project_name',
            <AntSelect
              placeholder='Select Project'
              notFoundText='No Project Found'
              options={Array.from({ length: 100 }, (_, i) => ({
                value: `Project ${i + 1}`,
                label: `Project ${i + 1}`,
              }))}
            />
          )}

        {RenderController<AddStockFormData>(control, 'file', <AntUpload size='large' />)}
        {RenderController<AddStockFormData>(
          control,
          'from_range',
          <AntInput type='number' placeholder='From Range' />
        )}
        {RenderController<AddStockFormData>(
          control,
          'to_range',
          <AntInput type='number' placeholder='To Range' />
        )}
      </div>
      <h3 className='text-primary text-lg font-bold mt-5'>Warehouse</h3>
      <div className='flex gap-2 w-full'>
        {RenderController<AddStockFormData>(
          control,
          'source_warehouse',
          <AntSelect
            disabled={watch && watch === StockEntryType.MATERIAL_RECEIPT}
            placeholder='Select Source Warehouse'
            notFoundText='No Source Warehouse Found'
            options={Array.from({ length: 100 }, (_, i) => ({
              value: `Source Warehouse ${i + 1}`,
              label: `Source Warehouse ${i + 1}`,
            }))}
          />
        )}
        {RenderController<AddStockFormData>(
          control,
          'target_warehouse',
          <AntSelect
            disabled={
              watch &&
              (watch === StockEntryType.MATERIAL_ISSUE || watch === StockEntryType.R_D_PRODUCTS)
            }
            placeholder='Select Target Warehouse'
            notFoundText='No Target Warehouse Found'
            options={Array.from({ length: 100 }, (_, i) => ({
              value: `Target Warehouse ${i + 1}`,
              label: `Target Warehouse ${i + 1}`,
            }))}
          />
        )}
      </div>
    </div>
  );
};

export default AddStockForm;
