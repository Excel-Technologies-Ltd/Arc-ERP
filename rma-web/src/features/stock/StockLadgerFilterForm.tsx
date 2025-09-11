import { AntInput } from '@/components/Base/Form';
import { RenderController } from '@/lib/hook-form/RenderController';
import { StockLadgerFilterFormData } from '@/types/pages/stock';
import { Control } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

export const StockLadgerFilterForm = ({
  control,
  className,
}: {
  control: Control<StockLadgerFilterFormData>;
  className?: string;
}) => {
  return (
    <div className={twMerge(className)}>
      {RenderController<StockLadgerFilterFormData>(
        control,
        'item_name',
        <AntInput type='text' placeholder='Item Name' />
      )}
    </div>
  );
};
