import { UPLOAD_FILE_HEADER } from '@/constants/app-strings';
import { PurchaseInvoiceItem } from '@/types/Accounts/PurchaseInvoiceItem';
import { ParseResult } from '@/types/common.types';
import { SerialItemType } from '@/types/pages/purchase';
import { getRemainingQty } from './file-process.utils';

/**
 * Validate quantity assignment for a single item
 * @param item - The purchase invoice item
 * @param assignedQuantity - The quantity to assign
 * @param serialTableData - The current serial table data
 * @returns Object with isValid boolean and error message if invalid
 */
export const validateQuantityAssignment = (
  item: PurchaseInvoiceItem,
  assignedQuantity: number,
  serialTableData: SerialItemType[]
): { isValid: boolean; error?: string } => {
  // if (assignedQuantity <= 0) {
  //   return {
  //     isValid: false,
  //     error: 'Please enter a valid number greater than 0',
  //   };
  // }

  const remaining = getRemainingQty(item, serialTableData);
  if (assignedQuantity > remaining) {
    return {
      isValid: false,
      error: `Cannot assign ${assignedQuantity}. Only ${remaining} items remaining.`,
    };
  }

  return { isValid: true };
};

/**
 * Validate quantities for multiple items from file upload
 * @param groupedData - Grouped serial data by item name
 * @param serialTableData - Current serial table data
 * @returns Object with validation result and any errors
 */
export const validateFileUploadQuantities = (
  groupedData: Record<
    string,
    {
      item_name: string;
      qty: number;
      matchingItem?: PurchaseInvoiceItem;
    }
  >,
  serialTableData: SerialItemType[]
): { isValid: boolean; errors: string[] } => {
  const validationErrors: string[] = [];

  Object.values(groupedData).forEach((group) => {
    if (!group.matchingItem) return;

    const remaining = getRemainingQty(group.matchingItem, serialTableData);

    if (group.qty > remaining) {
      validationErrors.push(
        `${group.item_name}: Cannot assign ${group.qty} serials. Only ${remaining} items remaining.`
      );
    }
  });

  return {
    isValid: validationErrors.length === 0,
    errors: validationErrors,
  };
};

/**
 * Validate the CSV header
 * @param fileMeta - The file meta data
 * @returns True if the header is valid, false otherwise
 */
export const validateCSVHeader = (fileMeta: ParseResult['meta']): boolean => {
  return (
    UPLOAD_FILE_HEADER.every((header) => fileMeta?.fields?.includes(header)) &&
    fileMeta?.fields?.length === UPLOAD_FILE_HEADER.length
  );
};

/**
 * Validate the items exist
 * @param parsedData - The parsed data
 * @param items - The items
 * @returns True if the items exist, false otherwise
 */
export const validateItemsExist = (
  parsedData: ParseResult['data'],
  items: PurchaseInvoiceItem[]
): boolean => {
  return parsedData.every((item) =>
    items.some((i) => i.item_name.trim() === item.item_name.trim())
  );
};
