import { RenderController } from '@/lib/hook-form/RenderController';
import { StockEntryListFilterFormData } from '@/types/pages/stock';
import { StockEntryType } from '@/utils/enums';
import { Control } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import AntRangePicker from '@/components/Base/DatePicker/AntRangePicker';
import { AntInput, AntSelect } from '@/components/Base/Form';

const StockEntryFilterForm = ({
  control,
  className,
}: {
  control: Control<StockEntryListFilterFormData>;
  className?: string;
}) => {
  return (
    <div className={twMerge(className)}>
      {RenderController<StockEntryListFilterFormData>(
        control,
        'stock_id',
        <AntInput type='text' placeholder='Stock ID' />
      )}
      {RenderController<StockEntryListFilterFormData>(
        control,
        'status',
        <AntSelect
          placeholder='Status'
          notFoundText='No Status Found'
          options={Array.from({ length: 100 }, (_, i) => ({
            value: `Status ${i + 1}`,
            label: `Status ${i + 1}`,
          }))}
        />
      )}
      {RenderController<StockEntryListFilterFormData>(
        control,
        'from_warehouse',
        <AntSelect
          placeholder='From Warehouse'
          notFoundText='No From Warehouse Found'
          options={Array.from({ length: 100 }, (_, i) => ({
            value: `From Warehouse ${i + 1}`,
            label: `From Warehouse ${i + 1}`,
          }))}
        />
      )}
      {RenderController<StockEntryListFilterFormData>(
        control,
        'to_warehouse',
        <AntSelect
          placeholder='To Warehouse'
          notFoundText='No To Warehouse Found'
          options={Array.from({ length: 100 }, (_, i) => ({
            value: `To Warehouse ${i + 1}`,
            label: `To Warehouse ${i + 1}`,
          }))}
        />
      )}
      {RenderController<StockEntryListFilterFormData>(
        control,
        'stock_entry_type',
        <AntSelect
          placeholder='Stock Entry Type'
          notFoundText='No Stock Entry Type Found'
          options={Object.entries(StockEntryType).map(([, value]) => ({
            value: value,
            label: value,
          }))}
        />
      )}
      {RenderController<StockEntryListFilterFormData>(
        control,
        'date_range',
        <AntRangePicker placeholder={['Start Date', 'End Date']} />
      )}
    </div>
  );
};

export default StockEntryFilterForm;
