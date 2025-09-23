import { ANT_UPLOAD_FILE_LIST_IGNORE } from '@/constants/app-strings';
import { useFileParser } from '@/hooks/useFileParser';
import { useNotify } from '@/hooks/useNotify';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { PurchaseInvoiceItem } from '@/types/Accounts/PurchaseInvoiceItem';
import { selectSerialTableData } from '@/stores/serialSlice';
import { processFile } from '../utils';
import { handleCSVValidation, handleExcelFile } from '../validations/file.validation';

export const useSerialFileUploadHandler = (items: PurchaseInvoiceItem[]) => {
  const dispatch = useAppDispatch();
  const notify = useNotify();
  const { parseFile, getFileType, isLoading: isFileLoading } = useFileParser();

  // Add selector to get current serial data
  const serialTableData = useAppSelector(selectSerialTableData);

  // handle before file upload
  const handleBeforeFileUpload = async (file: File) => {
    if (!file) return;

    try {
      const fileType = getFileType(file);

      const { data: parsedData, meta: fileMeta } = await parseFile(file, {
        hasHeader: true,
        skipEmptyLines: true,
        dynamicTyping: true,
      });

      // Check if file has data
      if (parsedData.length === 0) {
        notify.error({
          message: 'Invalid file',
          description: 'No data found in the file',
        });
        return ANT_UPLOAD_FILE_LIST_IGNORE;
      }

      // Handle different file types
      switch (fileType) {
        case 'csv':
          if (!handleCSVValidation(parsedData, fileMeta, items, notify)) {
            return ANT_UPLOAD_FILE_LIST_IGNORE;
          }
          processFile(parsedData, items, serialTableData, notify, dispatch);
          break;

        case 'xls':
        case 'xlsx':
          return handleExcelFile(notify);

        default:
          notify.error({
            message: 'Unsupported file type',
            description: 'Please upload a CSV, XLS, or XLSX file',
          });
          return ANT_UPLOAD_FILE_LIST_IGNORE;
      }
    } catch (error) {
      notify.error({
        message: 'File processing error',
        description: (error as Error).message || 'An error occurred while processing the file',
      });
      return ANT_UPLOAD_FILE_LIST_IGNORE;
    }
  };

  return {
    handleBeforeFileUpload,
    isFileLoading,
  };
};
