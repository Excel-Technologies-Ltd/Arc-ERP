import AntDatePicker from '@/components/Base/DatePicker/AntDatePicker';
import AntSelect from '@/components/Base/Form/FormSelect/AntSelect';
import { RenderController } from '@/lib/hook-form/RenderController';
import { getWarehouseList } from '@/services/common/commonApi';
import { Control } from 'react-hook-form';
import { Button as AntButton, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import AntInput from '@/components/Base/Form/FormInput/AntInput';
import { AssignSerialFormData } from '@/types/pages/purchase';

const SerialAssignForm = ({ control }: { control: Control<AssignSerialFormData> }) => {
  // Api Call
  const { data: warehouseList, isLoading: isLoadingWarehouses } = getWarehouseList();

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
        <div>
          <Upload
            maxCount={1}
            style={{
              width: '100%',
            }}
            beforeUpload={(file) => {
              console.log('Uploaded file:', file);
              // Return false to prevent default upload behavior
              return false;
            }}
            onChange={(info) => {
              if (info.file.status === 'done') {
                console.log('File uploaded successfully:', info.file);
              }
            }}
          >
            <AntButton
              style={{
                color: 'gray',
                width: '100%',
              }}
              icon={<UploadOutlined />}
            >
              Upload Your File
            </AntButton>
          </Upload>
        </div>
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
