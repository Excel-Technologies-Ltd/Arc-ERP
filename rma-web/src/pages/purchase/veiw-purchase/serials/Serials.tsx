import { useForm, Controller } from 'react-hook-form';
import AntInput from '@/components/Base/Form/FormInput/AntInput';
import AntSelect from '@/components/Base/Form/FormSelect/AntSelect';
import AntDatePicker from '@/components/DatePicker/AntDatePicker';
import { Input } from 'antd';
import { getWarehouseList } from '@/services/common/commonApi';

type FormData = {
  warehouse: string;
  date: string;
  file: FileList | undefined;
  fromRange: string | undefined;
  toRange: string | undefined;
};

const Serials = () => {
  //Api Call Start
  const { data: warehouseList, isLoading: isLoadingWarehouses } = getWarehouseList();
  //Api Call End

  const { control, watch } = useForm<FormData>({
    defaultValues: {
      warehouse: '',
      date: '',
      file: undefined,
      fromRange: '',
      toRange: '',
    },
  });

  const watchFields = watch(); // Watch all fields

  // Calculate total from range
  const calculateTotal = () => {
    const from = parseInt(watchFields.fromRange || '0');
    const to = parseInt(watchFields.toRange || '0');

    if (from && to && from <= to) {
      return to - from + 1; // Count of numbers in range (inclusive)
    }
    return 0;
  };

  return (
    <>
      <div className='p-5 bg-white rounded-lg'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {/* Warehouse Select */}
          <Controller
            name='warehouse'
            control={control}
            render={({ field }) => (
              <AntSelect
                onChange={(value) => field.onChange(value)}
                placeholder='Select Warehouse'
                options={warehouseList?.map((w) => ({
                  value: w.name,
                  label: w.warehouse_name,
                }))}
                loading={isLoadingWarehouses}
                showSearch={false}
                notFoundText='No Warehouse Found'
              />
            )}
          />
          {/* Date Picker */}
          <Controller
            name='date'
            control={control}
            render={({ field }) => (
              <AntDatePicker
                placeholder='Select Date'
                onChange={(date) => field.onChange(date?.format('YYYY-MM-DD'))}
              />
            )}
          />
          {/* File Input */}
          <Controller
            name='file'
            control={control}
            render={({ field }) => (
              <Input type='file' onChange={(e) => field.onChange(e.target.files)} />
            )}
          />
          {/* From Range */}
          <Controller
            name='fromRange'
            control={control}
            render={({ field }) => <AntInput {...field} type='number' placeholder='From Range' />}
          />
          {/* To Range */}
          <Controller
            name='toRange'
            control={control}
            render={({ field }) => <AntInput {...field} type='number' placeholder='To Range' />}
          />
          {/* Display Total */}
          <p className='text-lg text-primary'>Total : {calculateTotal()}</p>
        </div>
      </div>
    </>
  );
};

export default Serials;
