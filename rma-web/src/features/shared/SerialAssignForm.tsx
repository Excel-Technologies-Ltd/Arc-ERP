import AntDatePicker from '@/components/Base/DatePicker/AntDatePicker';
import AntSelect from '@/components/Base/Form/FormSelect/AntSelect';
import { RenderController } from '@/lib/hook-form/RenderController';
import { Control } from 'react-hook-form';
import AntInput from '@/components/Base/Form/FormInput/AntInput';
import { AssignSerialFormData } from '@/types/pages/purchase';
import { AntUpload } from '@/components/Base/Form';
import { getWarehouseDropdownList } from '@/services/common/dropdownApi';
import { PurchaseInvoiceItem } from '@/types/Accounts/PurchaseInvoiceItem';
import { useSerialFileUploadHandler } from '../helpers/handlers';

const SerialAssignForm = ({
  control,
  items,
}: {
  control: Control<AssignSerialFormData>;
  items: PurchaseInvoiceItem[];
}) => {
  // Api Call start
  const { data: warehouseList, isLoading: isLoadingWarehouses } = getWarehouseDropdownList(null);
  // Api Call end

  // Handle File Upload
  const { handleBeforeFileUpload, isFileLoading } = useSerialFileUploadHandler(items);

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
          beforeUpload={handleBeforeFileUpload}
          customRequest={({ onSuccess }) => {
            // Custom request that immediately calls success
            // This prevents actual HTTP upload and just marks as successful
            setTimeout(() => {
              onSuccess?.('ok');
            }, 100);
          }}
          loading={isFileLoading}
          disabled={isFileLoading}
        />
      )}
      {RenderController<AssignSerialFormData>(
        control,
        'fromRange',
        <AntInput type='text' placeholder='From Range' size='middle' isCapitalised />
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
