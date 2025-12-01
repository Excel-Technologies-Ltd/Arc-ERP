import AntSelect from '@/components/Base/Form/FormSelect/AntSelect';
import { RenderController } from '@/lib/hook-form/RenderController';
import { Control, useWatch } from 'react-hook-form';
import AntInput from '@/components/Base/Form/FormInput/AntInput';
import { AssignSerialFormData } from '@/types/pages/purchase';
import { AntUpload } from '@/components/Base/Form';
import { getWarehouseDropdownList } from '@/services/common/dropdownApi';
import { PurchaseInvoiceItem } from '@/types/Accounts/PurchaseInvoiceItem';
import { useSerialFileUploadHandler } from '../helpers/handlers';
import useDebouncedSearch from '@/hooks/debounce/useDebounceSearch';
// import { useMemo } from 'react';
import { calculateRangeTotal } from '@/utils/helper';
import { useNotify } from '@/hooks/useNotify';

const SerialAssignForm = ({
  control,
  items,
}: {
  control: Control<AssignSerialFormData>;
  items: PurchaseInvoiceItem[];
}) => {
  const notify = useNotify();
  // Api Call start
  const {
    setSearchInput: setWarehouseSearch,
    data: { data: warehouseList, isLoading: isLoadingWarehouses },
  } = useDebouncedSearch({
    fetchFunction: getWarehouseDropdownList,
  });
  // Api Call end

  const { fromRange, toRange } = useWatch({ control });

  // Handle File Upload
  const { handleBeforeFileUpload, isFileLoading } = useSerialFileUploadHandler(items, control);

  const handleOnBlurCapture = () => {
    const { error } = calculateRangeTotal(fromRange ?? '', toRange ?? '');
    if (error) {
      notify.error({ message: error });
    }
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2'>
      {RenderController<AssignSerialFormData>(
        control,
        'warehouse',
        <AntSelect
          placeholder='Select Warehouse Name'
          onSearch={(value: string) => setWarehouseSearch(value)}
          notFoundText='No Warehouse Found'
          loading={isLoadingWarehouses}
          options={warehouseList?.map((w) => ({
            value: w.name,
            label: w.name,
          }))}
          onClear={() => setWarehouseSearch(null)}
          filterOption={false}
          allowClear={false}
        />
      )}

      {RenderController<AssignSerialFormData>(
        control,
        'file',
        <AntUpload
          accept='.xlsx,.xls,.csv'
          beforeUpload={handleBeforeFileUpload}
          customRequest={({ onSuccess }) => {
            setTimeout(() => {
              onSuccess?.('ok');
            }, 100);
          }}
          size='large'
          loading={isFileLoading}
          disabled={isFileLoading}
        />
      )}
      {RenderController<AssignSerialFormData>(
        control,
        'fromRange',
        <AntInput type='text' placeholder='Start Range' isCapitalised />
      )}
      {RenderController<AssignSerialFormData>(
        control,
        'toRange',
        <AntInput
          type='text'
          placeholder='End Range'
          isCapitalised
          onBlurCapture={handleOnBlurCapture}
        />
      )}
    </div>
  );
};

export default SerialAssignForm;
