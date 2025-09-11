import AntDatePicker from '@/components/Base/DatePicker/AntDatePicker';
import AntSelect from '@/components/Base/Form/FormSelect/AntSelect';
import { RenderController } from '@/lib/hook-form/RenderController';
import { Control } from 'react-hook-form';
import AntInput from '@/components/Base/Form/FormInput/AntInput';
import { AssignSerialFormData } from '@/types/pages/purchase';
import { AntUpload } from '@/components/Base/Form';
import { getWarehouseDropdownList } from '@/services/common/dropdownApi';

const SerialAssignForm = ({ control }: { control: Control<AssignSerialFormData> }) => {
  // Api Call
  const { data: warehouseList, isLoading: isLoadingWarehouses } = getWarehouseDropdownList(null);

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
          beforeUpload={(file) => {
            console.log('Uploaded file:', file);
            return false;
          }}
        />
      )}
      {RenderController<AssignSerialFormData>(
        control,
        'fromRange',
        <AntInput type='number' placeholder='From Range' size='middle' />
      )}
      {RenderController<AssignSerialFormData>(
        control,
        'toRange',
        <AntInput type='number' placeholder='To Range' size='middle' />
      )}
    </>
  );
};

export default SerialAssignForm;
