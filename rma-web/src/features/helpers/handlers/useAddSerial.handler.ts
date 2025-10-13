import { PurchaseInvoiceItem } from '@/types/Accounts/PurchaseInvoiceItem';
import {
  generateSerialItems,
  generateSerialNumbersFromRange,
  validateQuantityAssignment,
} from '../utils';
import { AssignSerialFormData, SerialItemType, SerialWithMacTypes } from '@/types/pages/purchase';
import { addSerials } from '@/stores/serialSlice';
import { useAppDispatch } from '@/stores/hooks';
import { useNotify } from '@/hooks/useNotify';
import { Control, useWatch } from 'react-hook-form';
import { Dayjs } from 'dayjs';

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
  const { fromRange, toRange, totalRangeValue, date } = useWatch({ control });

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

    // Make Warrenty Date using warranty months
    const warrantyDate = (date as Dayjs).add(
      Number(record.custom_purchase_warranty_period_in_months),
      'month'
    );

    // For range-based serial generation:
    if (fromRange && toRange) {
      const serials = generateSerialNumbersFromRange(fromRange, toRange);

      if (serials.length === 0) {
        notify.error({ message: 'Invalid range' });
        return;
      }

      // Convert serials to SerialWithMacTypes format
      const serialWithMac: SerialWithMacTypes[] = serials.map((serial) => ({
        serial_no: serial,
        mac_no: '', // Empty MAC for range generation
      }));

      dispatch(
        addSerials({
          serials: [
            {
              key: `${record.item_name}_${record.item_code}`,
              item_code: record.item_code || '',
              item_name: record.item_name,
              qty: Number(totalRangeValue),
              has_serial_no: record.custom_has_excel_serial === 'Yes' ? true : false,
              warranty_date: warrantyDate,
              serial_with_mac: serialWithMac, // Use new structure
              rate: record.rate,
              amount: Number(record.rate) * Number(totalRangeValue) || 0,
              brand_name: record.brand || '',
            },
          ],
          recordName: record.name,
        })
      );
      return;
    }

    // For non-serialized items:
    if (record.custom_has_excel_serial === 'No') {
      dispatch(
        addSerials({
          serials: [
            {
              key: `${record.item_name}_${record.item_code}`,
              item_code: record.item_code || '',
              item_name: record.item_name,
              qty: Number(inputValue),
              has_serial_no: false,
              warranty_date: warrantyDate,
              serial_with_mac: [], // Empty for non-serialized
              rate: record.rate,
              amount: Number(record.rate) * Number(inputValue) || 0,
              brand_name: record.brand || '',
            },
          ],
          recordName: record.name,
        })
      );
      return;
    }

    // Generate serials using utility function
    const newSerials = generateSerialItems(record, assignedQuantity, serialTableData, warrantyDate);
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
