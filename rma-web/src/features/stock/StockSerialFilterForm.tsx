import { AntSelect } from '@/components/Base/Form';
import { RenderController } from '@/lib/hook-form/RenderController';
import { StockSerialQuantityFilterFormData } from '@/types/pages/stock';
import { Control } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

export const StockSerialFilterForm = ({
  control,
  className,
}: {
  control: Control<StockSerialQuantityFilterFormData>;
  className?: string;
}) => {
  return (
    <div className={twMerge(className)}>
      {RenderController<StockSerialQuantityFilterFormData>(
        control,
        'item_name',
        <AntSelect
          placeholder='Item Name'
          notFoundText='No Item Name Found'
          options={Array.from({ length: 100 }, (_, i) => ({
            value: `Item Name ${i + 1}`,
            label: `Item Name ${i + 1}`,
          }))}
        />
      )}
      {RenderController<StockSerialQuantityFilterFormData>(
        control,
        'warehouse_name',
        <AntSelect
          placeholder='Warehouse Name'
          notFoundText='No Warehouse Name Found'
          options={Array.from({ length: 100 }, (_, i) => ({
            value: `Warehouse Name ${i + 1}`,
            label: `Warehouse Name ${i + 1}`,
          }))}
        />
      )}
    </div>
  );
};
