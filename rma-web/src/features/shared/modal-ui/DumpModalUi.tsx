import { useForm, Controller } from 'react-hook-form';
import { Checkbox } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import AntButton from '@/components/Base/Button/AntButton';
import { formatExportLabel } from '@/utils/helper';
import AntModal from '@/components/Modal/AntModal';
import { useDumpFileHandler } from '@/features/helpers/handlers/useDumpFile.handler';
import { DumpModalUiProps } from '@/types/common.types';
import { flattenObject } from '@/features/helpers/utils/dump-file.utils';

const DumpModalUi = <T extends Record<string, any>>({
  data,
  dumpDefaultColumns,
  modalType,
}: DumpModalUiProps<T>) => {
  // Flatten the first data item to get all possible columns including nested ones
  const flattenedData = data?.[0] ? flattenObject(data[0]) : {};
  const dumpColumns = Object.keys(flattenedData);

  const { control, handleSubmit, watch, setValue, reset } = useForm<Record<string, boolean>>({
    defaultValues: dumpDefaultColumns?.reduce(
      (acc, col) => {
        acc[col] = true;
        return acc;
      },
      {} as Record<string, boolean>
    ),
  });

  // Column definitions with categories and descriptions
  const allColumns: { key: string; label: string }[] = dumpColumns.map((column) => ({
    key: column,
    label: formatExportLabel(column),
  }));

  const watchedValues = watch();
  const selectedCount = Object.values(watchedValues).filter(Boolean).length || 0;

  const handleSelectAll = () => {
    allColumns.forEach((col) => setValue(col.key, true));
  };

  const handleDeselectAll = () => {
    allColumns.forEach((col) => setValue(col.key, false));
  };

  const { handleDumpCsvFile } = useDumpFileHandler({
    data,
    resetForm: () => reset(),
  });

  return (
    <AntModal
      width={800}
      modalType={modalType}
      okText={'Download'}
      title='Select Columns to Export'
      onOk={handleSubmit(handleDumpCsvFile)}
    >
      <div className='pt-5'>
        {/*  Quick Actions */}
        <div className='mb-4 flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200'>
          <div className='flex items-center gap-3'>
            <span className='text-sm font-medium text-slate-700'>Quick Actions:</span>
            <AntButton
              type='link'
              onClick={handleSelectAll}
              className='!text-cyan-700 hover:!text-cyan-800 font-medium'
            >
              Select All
            </AntButton>
            <span className='text-slate-300'>|</span>
            <AntButton
              type='link'
              onClick={handleDeselectAll}
              className='!text-red-600 hover:!text-red-700 font-medium'
            >
              Deselect All
            </AntButton>
          </div>
          <div className='flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-green-50 to-green-50 rounded-full border border-green-200'>
            <CheckCircleOutlined className='text-green-600' />
            <span className='text-sm font-semibold text-green-700'>{selectedCount} selected</span>
          </div>
        </div>

        {/* <Divider className='m-0' /> */}

        <div className='grid grid-cols-3 gap-3'>
          {allColumns.map((column) => (
            <Controller
              key={column.key}
              name={column.key}
              control={control}
              render={({ field }) => (
                <div
                  className={`
                            relative border rounded-lg p-3 transition-all duration-300 cursor-pointer
                            ${
                              field.value
                                ? 'border-cyan-500 bg-gradient-to-br from-cyan-50 to-blue-50'
                                : 'border-slate-200 bg-white hover:border-cyan-300 hover:bg-slate-50'
                            }
                          `}
                  onClick={() => field.onChange(!field.value)}
                >
                  {/* Selection Badge */}
                  {field.value && (
                    <div className='absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center'>
                      <CheckCircleOutlined className='text-white text-xs' />
                    </div>
                  )}

                  <Checkbox
                    {...field}
                    checked={field.value}
                    onChange={(e) => {
                      e.stopPropagation();
                      field.onChange(e.target.checked);
                    }}
                    className='w-full pointer-events-none'
                  >
                    <div className='flex flex-col gap-1'>
                      <span
                        className={`
                                  text-sm ${field.value ? 'text-cyan-900' : 'text-slate-700'}
                                `}
                      >
                        {column.label}
                      </span>
                    </div>
                  </Checkbox>
                </div>
              )}
            />
          ))}
        </div>

        {allColumns.length === 0 && (
          <div className='text-center py-12'>
            <p className='text-gray-500 text-sm'>No columns found</p>
          </div>
        )}
      </div>
    </AntModal>
  );
};

export default DumpModalUi;
