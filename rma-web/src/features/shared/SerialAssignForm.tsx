import AntDatePicker from '@/components/Base/DatePicker/AntDatePicker';
import AntSelect from '@/components/Base/Form/FormSelect/AntSelect';
import { RenderController } from '@/lib/hook-form/RenderController';
import { Control } from 'react-hook-form';
import AntInput from '@/components/Base/Form/FormInput/AntInput';
import { AssignSerialFormData } from '@/types/pages/purchase';
import { AntUpload } from '@/components/Base/Form';
import { getWarehouseDropdownList } from '@/services/common/dropdownApi';
import { useFileParser } from '@/hooks/useFileParser';
import { useNotify } from '@/hooks/useNotify';
import { UPLOAD_FILE_HEADER } from '@/constants/app-strings';
import { PurchaseInvoiceItem } from '@/types/Accounts/PurchaseInvoiceItem';
import { useAppDispatch } from '@/stores/hooks';
import { addSerials } from '@/stores/serialSlice';
import { useState } from 'react';
// import { ParseResult } from '@/types/common.types';

const SerialAssignForm = ({
  control,
  items,
}: {
  control: Control<AssignSerialFormData>;
  items: PurchaseInvoiceItem[];
}) => {
  const notify = useNotify();
  const dispatch = useAppDispatch();
  const { parseFile, getFileType } = useFileParser();
  const [isFileLoading, setIsFileLoading] = useState(false);

  // Api Call start
  const { data: warehouseList, isLoading: isLoadingWarehouses } = getWarehouseDropdownList(null);
  // Api Call end

  const handleBeforeFileUpload = async (file: File) => {
    setIsFileLoading(true);
    if (!file) return;
    const fileType = getFileType(file);

    await parseFile(file, {
      hasHeader: true,
      skipEmptyLines: true,
      dynamicTyping: true,
    })
      .then((result) => {
        if (result.data.length === 0) {
          notify.error({
            message: 'Invalid file',
            description: 'No data found in the file',
          });
          return;
        }
        // Check Validation for CSV file
        if (fileType === 'csv') {
          // check if the header is valid
          const isValidHeader =
            UPLOAD_FILE_HEADER.every((header) => result.meta?.fields?.includes(header)) &&
            result.meta?.fields?.length === UPLOAD_FILE_HEADER.length;
          // if the header is not valid, show error
          if (!isValidHeader) {
            notify.error({
              message: 'Invalid file',
              description: 'The file must be in CSV format with item_name and serial_no columns',
            });
            return;
          }

          // check if the items are valid
          const isValidItems = result.data.every((item) =>
            items.some((i) => i.item_name.trim() === item.item_name.trim())
          );
          // if the items are not valid, show error
          if (!isValidItems) {
            notify.error({
              message: 'Invalid items',
              description: 'The items must be in the Product List',
            });
            return;
          }
        }

        if (fileType === 'xls' || fileType === 'xlsx') {
          notify.open({ message: 'Working on the file...' });
          return;
        }

        dispatch(
          addSerials({
            record: {
              item_name: result.data[0].item_name || '',
              item_code: result.data[0].item_code || '',
              qty: result.data.length,
              name: 'asas',
            },
            quantity: result.data.length,
          })
        );
        setIsFileLoading(false);
      })
      .catch((error) => {
        setIsFileLoading(false);
        notify.error({
          message: 'Error',
          description: error.message,
        });
      })
      .finally(() => {
        setIsFileLoading(false);
      });
  };

  return (
    <>
      {RenderController<AssignSerialFormData>(
        control,
        'warehouse',
        <AntSelect
          placeholder='Select Warehouse'
          options={warehouseList?.map((w) => ({
            value: w.name,
            label: w.warehouse_name,
          }))}
          loading={isLoadingWarehouses}
          showSearch={false}
          notFoundText='No Warehouse Found'
          size='middle'
        />
      )}

      {RenderController<AssignSerialFormData>(
        control,
        'date',
        <AntDatePicker placeholder='Select Date' size='middle' />
      )}
      {RenderController<AssignSerialFormData>(
        control,
        'file',
        <AntUpload
          accept='.xlsx,.xls,.csv'
          beforeUpload={(file) => handleBeforeFileUpload(file)}
          loading={isFileLoading}
          disabled={isFileLoading}
        />
      )}
      {RenderController<AssignSerialFormData>(
        control,
        'fromRange',
        <AntInput
          onChange={() => console.log('1')}
          type='text'
          placeholder='From Range'
          size='middle'
          isCapitalised
        />
      )}
      {RenderController<AssignSerialFormData>(
        control,
        'toRange',
        <AntInput type='text' placeholder='To Range' size='middle' isCapitalised />
      )}
    </>
  );
};

export default SerialAssignForm;
