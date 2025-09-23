import { PurchaseInvoiceItem } from '@/types/Accounts/PurchaseInvoiceItem';
import { generateSerialItems, validateQuantityAssignment } from '../utils';
import { SerialItemType } from '@/types/pages/purchase';
import { addSerials } from '@/stores/serialSlice';
import { useAppDispatch } from '@/stores/hooks';
import { useNotify } from '@/hooks/useNotify';

export const useAddSerialHandler = ({
  inputValues,
  serialTableData,
}: {
  inputValues: Record<string, string>;
  serialTableData: SerialItemType[];
}) => {
  const dispatch = useAppDispatch();
  const notify = useNotify();

  const handleAddSerial = (record: PurchaseInvoiceItem) => {
    console.log('trigger');
    const inputValue = inputValues[record.name] || '';
    const assignedQuantity = parseInt(inputValue || '0');

    // Use centralized validation
    const validation = validateQuantityAssignment(record, assignedQuantity, serialTableData);

    if (!validation.isValid) {
      return notify.warning({
        message: validation.error,
      });
    }

    // Generate serials using utility function
    const newSerials = generateSerialItems(record, assignedQuantity, serialTableData);

    // Dispatch the prepared serials
    dispatch(
      addSerials({
        serials: newSerials,
        recordName: record.name,
      })
    );

    notify.success({
      message: `Successfully added ${assignedQuantity} serial items for ${record.item_name}`,
    });
  };

  return { handleAddSerial };
};
