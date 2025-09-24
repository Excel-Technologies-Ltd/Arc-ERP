import { PurchaseInvoiceItem } from '@/types/Accounts/PurchaseInvoiceItem';
import { generateSerialItems, validateQuantityAssignment } from '../utils';
import { AssignSerialFormData, SerialItemType } from '@/types/pages/purchase';
import { addSerials } from '@/stores/serialSlice';
import { useAppDispatch } from '@/stores/hooks';
import { useNotify } from '@/hooks/useNotify';
import { Control, useWatch } from 'react-hook-form';

export const useAddSerialHandler = ({
  inputValues,
  serialTableData,
  control,
}: {
  inputValues: Record<string, string>;
  serialTableData: SerialItemType[];
  control: Control<AssignSerialFormData>;
}) => {
  const dispatch = useAppDispatch();
  const notify = useNotify();
  const { fromRange, toRange, totalRangeValue } = useWatch({ control });

  const handleAddSerial = (record: PurchaseInvoiceItem) => {
    const inputValue = inputValues?.[record.name] || '';
    const assignedQuantity =
      Number(totalRangeValue) > 0 ? Number(totalRangeValue) : parseInt(inputValue || '0');

    console.log(assignedQuantity);

    // Use centralized validation
    const validation = validateQuantityAssignment(record, assignedQuantity, serialTableData);

    if (!validation.isValid) {
      return notify.warning({
        message: validation.error,
      });
    }

    // Generate serials using utility function
    const newSerials = generateSerialItems(record, assignedQuantity, serialTableData);

    // if fromRange and toRange are provided, generate serials using utility function
    if (fromRange && toRange) {
      const serials = `${fromRange} - ${toRange}`;
      // dispatch the prepared serials
      dispatch(
        addSerials({
          serials: [
            {
              key: `${record.item_name}_${record.item_code}`,
              item_code: record.item_code || '',
              item_name: record.item_name,
              quantity: Number(totalRangeValue),
              has_serial: record.custom_has_excel_serial === 'Yes' ? true : false,
              warranty_date: new Date(),
              serials: serials,
            },
          ],
          recordName: record.name,
        })
      );
    } else {
      // if fromRange and toRange are not provided, generate serials using utility function
      // Dispatch the prepared serials
      dispatch(
        addSerials({
          serials: newSerials,
          recordName: record.name,
        })
      );
    }

    notify.success({
      message: `Successfully added ${assignedQuantity} serial items for ${record.item_name}`,
    });
  };

  return { handleAddSerial };
};
