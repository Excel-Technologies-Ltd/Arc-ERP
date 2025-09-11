import { AntSelect } from '@/components/Base/Form';
import { RenderController } from '@/lib/hook-form/RenderController';
import { StockAvailabilityListFilterFormData } from '@/types/pages/sales';
import { Control } from 'react-hook-form';

const StockAvailabilityFilterForm = ({
  control,
  className,
}: {
  control: Control<StockAvailabilityListFilterFormData>;
  className?: string;
}) => {
  return (
    <div className={className}>
      {RenderController<StockAvailabilityListFilterFormData>(
        control,
        'item_name',
        <AntSelect
          placeholder='Item Name'
          notFoundText='No Item Found'
          options={Array.from({ length: 100 }, (_, i) => ({
            value: `Item ${i + 1}`,
            label: `Item ${i + 1}`,
          }))}
        />
      )}
      {RenderController<StockAvailabilityListFilterFormData>(
        control,
        'warehouse_name',
        <AntSelect
          placeholder='Warehouse Name'
          notFoundText='No Warehouse Found'
          options={Array.from({ length: 100 }, (_, i) => ({
            value: `Warehouse ${i + 1}`,
            label: `Warehouse ${i + 1}`,
          }))}
        />
      )}
      {RenderController<StockAvailabilityListFilterFormData>(
        control,
        'item_group',
        <AntSelect
          placeholder='Item Group'
          notFoundText='No Item Group Found'
          options={Array.from({ length: 100 }, (_, i) => ({
            value: `Item Group ${i + 1}`,
            label: `Item Group ${i + 1}`,
          }))}
        />
      )}
      {RenderController<StockAvailabilityListFilterFormData>(
        control,
        'brand_name',
        <AntSelect
          placeholder='Brand Name'
          notFoundText='No Brand Found'
          options={Array.from({ length: 100 }, (_, i) => ({
            value: `Brand ${i + 1}`,
            label: `Brand ${i + 1}`,
          }))}
        />
      )}
    </div>
  );
};

export default StockAvailabilityFilterForm;
