import { NotifyType } from '@/components/Notification/NotificationProvider';
import { PurchaseInvoiceItem } from '@/types/Accounts/PurchaseInvoiceItem';
import { ParseResult } from '@/types/common.types';
import { validateCSVHeader, validateItemsExist } from '../utils';
import { ANT_UPLOAD_FILE_LIST_IGNORE } from '@/constants/app-strings';

/**
 * Handle the CSV validation
 * @param parsedData - The parsed data
 * @param fileMeta - The file meta data
 * @param items - The items
 * @param notify - The notify
 * @returns True if the CSV is valid, false otherwise
 */
export const handleCSVValidation = (
  parsedData: ParseResult['data'],
  fileMeta: ParseResult['meta'],
  items: PurchaseInvoiceItem[],
  notify: NotifyType
): boolean => {
  if (!validateCSVHeader(fileMeta)) {
    notify.error({
      message: 'Invalid file',
      description: 'The file must be in CSV format with item_name and serial_no columns',
    });
    return false;
  }

  if (!validateItemsExist(parsedData, items)) {
    notify.error({
      message: 'Invalid items',
      description: 'The items must be in the Product List',
    });
    return false;
  }

  return true;
};

/**
 * Handle the Excel file
 * @param notify - The notify
 * @returns The ANT_UPLOAD_FILE_LIST_IGNORE
 */
export const handleExcelFile = (notify: NotifyType): typeof ANT_UPLOAD_FILE_LIST_IGNORE => {
  notify.open({ message: 'Working on the file...' });
  return ANT_UPLOAD_FILE_LIST_IGNORE;
};
