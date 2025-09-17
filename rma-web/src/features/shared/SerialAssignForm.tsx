import AntDatePicker from '@/components/Base/DatePicker/AntDatePicker';
import AntSelect from '@/components/Base/Form/FormSelect/AntSelect';
import { RenderController } from '@/lib/hook-form/RenderController';
import { Control } from 'react-hook-form';
import AntInput from '@/components/Base/Form/FormInput/AntInput';
import { AssignSerialFormData } from '@/types/pages/purchase';
import { AntUpload } from '@/components/Base/Form';
import { getWarehouseDropdownList } from '@/services/common/dropdownApi';
import { ParseResult, useFileParser } from '@/hooks/useFileParser';
import { useState } from 'react';

const SerialAssignForm = ({ control }: { control: Control<AssignSerialFormData> }) => {
  // Api Call
  const { data: warehouseList, isLoading: isLoadingWarehouses } = getWarehouseDropdownList(null);
  const [parsedData, setParsedData] = useState<ParseResult | null>(null);
  console.log(parsedData, 'parsedData');

  const { parseFile } = useFileParser();

  const handleBeforeFileUpload = async (file: File) => {
    if (!file) return;

    const result = await parseFile(file, {
      hasHeader: true,
      skipEmptyLines: true,
      dynamicTyping: true,
    });

    setParsedData(result);
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
        <AntUpload accept='.xlsx,.xls,.csv' beforeUpload={(file) => handleBeforeFileUpload(file)} />
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
