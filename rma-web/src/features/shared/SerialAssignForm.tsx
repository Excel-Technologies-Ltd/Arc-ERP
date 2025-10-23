import AntDatePicker from '@/components/Base/DatePicker/AntDatePicker';
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
  // Warehouse Dropdown Fetch
  const {
    setSearchInput: setWarehouseSearch,
    data: { data: warehouseList, isLoading: isLoadingWarehouses },
  } = useDebouncedSearch({
    fetchFunction: getWarehouseDropdownList,
  });
  // Api Call end

  const { fromRange, toRange } = useWatch({ control });
  // console.log(fromRange, toRange);
  // const { total, error } = useMemo(
  //   () => calculateRangeTotal(fromRange ?? '', toRange ?? ''),
  //   [fromRange, toRange]
  // );

  // Handle File Upload
  const { handleBeforeFileUpload, isFileLoading } = useSerialFileUploadHandler(items, control);

  const handleOnBlurCapture = () => {
    const { error } = calculateRangeTotal(fromRange ?? '', toRange ?? '');
    if (error) {
      notify.error({ message: error });
    }
  };

  return (
    <>
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
          size='middle'
          allowClear={false}
        />
      )}

      {RenderController<AssignSerialFormData>(
        control,
        'date',
        <AntDatePicker placeholder='Select Date' size='middle' allowClear={false} />
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
        <AntInput
          type='text'
          placeholder='To Range'
          size='middle'
          isCapitalised
          onBlurCapture={handleOnBlurCapture}
        />
      )}
    </>
  );
};

export default SerialAssignForm;
