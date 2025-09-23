import { PurchaseInvoiceItem } from '@/types/Accounts/PurchaseInvoiceItem';
import { ParseResult } from '@/types/common.types';
import { SerialItemType } from '@/types/pages/purchase';
import { validateFileUploadQuantities } from './file-validation.utils';
import { addSerials } from '@/stores/serialSlice';
import { NotifyType } from '@/components/Notification/NotificationProvider';
import { AppDispatch } from '@/stores/store';

/**
 * Helper function to get added serials count for a specific item
 * @param itemName - The item name to count serials for
 * @param serialTableData - The current serial table data
 * @returns The total count of added serials for the item
 */
export const getAddedSerialsCount = (
  itemName: string,
  serialTableData: SerialItemType[]
): number => {
  return serialTableData
    .filter((serial) => serial.item_name === itemName)
    .reduce((acc, serial) => acc + serial.quantity, 0);
};

/**
 * Helper function to calculate remaining quantity for an item
 * @param item - The purchase invoice item
 * @param serialTableData - The current serial table data
 * @returns The remaining quantity that can be assigned
 */
export const getRemainingQty = (
  item: PurchaseInvoiceItem,
  serialTableData: SerialItemType[]
): number => {
  const addedSerials = getAddedSerialsCount(item.item_name, serialTableData);
  return item.qty - (item.received_qty || 0) - addedSerials;
};

/**
 * Process parsed file data and group by item name
 * @param parsedData - The parsed file data
 * @param items - Available purchase invoice items
 * @returns Grouped data by item name
 */
export const processAndGroupFileData = (
  parsedData: ParseResult['data'],
  items: PurchaseInvoiceItem[]
) => {
  return parsedData.reduce(
    (acc, item) => {
      const key = item.item_name;

      if (!acc[key]) {
        // Find matching item from the items array
        const matchingItem = items.find((invItem) => invItem.item_name === item.item_name);

        acc[key] = {
          item_name: item.item_name,
          item_code: matchingItem?.item_code || '',
          qty: 0,
          serials: [],
          matchingItem,
        };
      }

      // Count quantity (each serial represents 1 item)
      acc[key].qty += 1;

      // Collect all serial numbers
      if (item.serial_no && item.serial_no.trim()) {
        acc[key].serials.push(item.serial_no.trim());
      }

      return acc;
    },
    {} as Record<
      string,
      {
        item_name: string;
        item_code: string;
        qty: number;
        serials: string[];
        matchingItem?: PurchaseInvoiceItem;
      }
    >
  );
};

/**
 * Convert grouped data to serial items format
 * @param groupedData - Grouped data by item name
 * @returns Array of SerialItemType items
 */
export const convertGroupedDataToSerials = (
  groupedData: Record<
    string,
    {
      item_name: string;
      item_code: string;
      qty: number;
      serials: string[];
    }
  >
): SerialItemType[] => {
  return Object.values(groupedData).map((group) => ({
    key: `${group.item_name}_${group.item_code}`,
    item_name: group.item_name,
    item_code: group.item_code,
    quantity: group.qty,
    serials: group.serials.join(' - '), // Join all serials with separator
    warranty_date: new Date(),
  }));
};

/**
 * Generate serial items for manual addition
 * @param item - The purchase invoice item
 * @param quantity - Number of serials to generate
 * @param serialTableData - Current serial table data for generating unique keys
 * @returns Array of SerialItemType items
 */
export const generateSerialItems = (
  item: PurchaseInvoiceItem,
  quantity: number,
  serialTableData: SerialItemType[]
): SerialItemType[] => {
  const currentCount = getAddedSerialsCount(item.item_name, serialTableData);

  return Array.from({ length: quantity }, (_, i) => ({
    key: `${item.item_name}_${currentCount + i + 1}`,
    item_code: item.item_code || '',
    item_name: item.item_name,
    quantity: 1,
    warranty_date: new Date(),
    serials: '',
  }));
};

export const processFile = (
  parsedData: ParseResult['data'],
  items: PurchaseInvoiceItem[],
  serialTableData: SerialItemType[],
  notify: NotifyType,
  dispatch: AppDispatch
): void => {
  // Group serials by item_name using utility function
  const groupedData = processAndGroupFileData(parsedData, items);

  // Validate quantities using utility function
  const validation = validateFileUploadQuantities(groupedData, serialTableData);

  // If there are quantity validation errors, show them and return
  if (!validation.isValid) {
    notify.error({
      message: 'Quantity Validation Failed',
      description: validation.errors.join('\n'),
    });
    return;
  }

  // Convert grouped data to serial items using utility function
  const makeSerialData = convertGroupedDataToSerials(groupedData);

  // Dispatch each grouped item
  makeSerialData.forEach((item) => {
    dispatch(addSerials({ serials: [item], recordName: item.item_name }));
  });

  // Show success message
  notify.success({
    message: 'File processed successfully',
    description: `Added ${makeSerialData.reduce((acc, item) => acc + item.quantity, 0)} serial items`,
  });
};
