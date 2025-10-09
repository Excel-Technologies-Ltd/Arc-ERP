import { PurchaseInvoiceItem } from '@/types/Accounts/PurchaseInvoiceItem';
import {
  generateSerialItems,
  generateSerialNumbersFromRange,
  validateQuantityAssignment,
} from '../utils';
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
  inputValues: Record<string, string[]>; // Change from string to string[]
  serialTableData: SerialItemType[];
  control: Control<AssignSerialFormData>;
}) => {
  const dispatch = useAppDispatch();
  const notify = useNotify();
  const { fromRange, toRange, totalRangeValue } = useWatch({ control });

  const handleAddSerial = (record: PurchaseInvoiceItem) => {
    const inputValue = inputValues?.[record.name]?.[0] || ''; // Access first element of array
    const assignedQuantity =
      Number(totalRangeValue) > 0 ? Number(totalRangeValue) : parseInt(inputValue || '0');

    // Use centralized validation
    const validation = validateQuantityAssignment(record, assignedQuantity, serialTableData);

    if (!validation.isValid) {
      return notify.warning({
        message: validation.error,
      });
    }

    // if fromRange and toRange are provided, generate serials using utility function
    if (fromRange && toRange) {
      const serials = generateSerialNumbersFromRange(fromRange, toRange);

      // check if serials length is 0
      if (serials.length === 0) {
        notify.error({
          message: 'Invalid range',
        });
        return;
      }

      // dispatch the prepared serials
      dispatch(
        addSerials({
          serials: [
            {
              key: `${record.item_name}_${record.item_code}`,
              item_code: record.item_code || '',
              item_name: record.item_name,
              qty: Number(totalRangeValue),
              has_serial_no: record.custom_has_excel_serial === 'Yes' ? true : false,
              warranty_date: new Date(),
              serial_no: serials,
              rate: record.rate,
              amount: Number(record.rate) * Number(totalRangeValue) || 0,
            },
          ],
          recordName: record.name,
        })
      );
      return;
    }

    if (record.custom_has_excel_serial === 'No') {
      // dispatch the prepared serials
      dispatch(
        addSerials({
          serials: [
            {
              key: `${record.item_name}_${record.item_code}`,
              item_code: record.item_code || '',
              item_name: record.item_name,
              qty: Number(inputValue),
              has_serial_no: false,
              warranty_date: new Date(),
              serial_no: [],
              rate: record.rate,
              amount: Number(record.rate) * Number(inputValue) || 0,
            },
          ],
          recordName: record.name,
        })
      );
      return;
    }

    // Generate serials using utility function
    const newSerials = generateSerialItems(record, assignedQuantity, serialTableData);
    // if fromRange and toRange are not provided, generate serials using utility function
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
