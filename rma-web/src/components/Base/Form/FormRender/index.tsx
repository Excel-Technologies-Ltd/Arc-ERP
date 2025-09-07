import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import AntInput from '../FormInput/AntInput';
import AntSelect from '../FormSelect/AntSelect';
import { FormField } from '@/types/form-render';

export const FormRender = <T extends FieldValues>({
  className,
  formData,
  control,
}: {
  className?: string;
  formData: FormField[];
  control: Control<T>;
}) => {
  return (
    <div className={twMerge('grid grid-cols-12 gap-4', className)}>
      {formData.map((item) => (
        <div className='col-span-12' key={item.name}>
          {item.type === 'text' || item.type === 'number' || item.type === 'password' ? (
            <Controller
              control={control}
              name={item.name as Path<T>}
              render={({ field }) => (
                <AntInput type={item.type} placeholder={item.placeholder} {...field} />
              )}
            />
          ) : item.type === 'select' ? (
            <Controller
              control={control}
              name={item.name as Path<T>}
              render={({ field }) => (
                <AntSelect options={item.options} placeholder={item.placeholder} {...field} />
              )}
            />
          ) : null}
        </div>
      ))}
    </div>
  );
};
export default FormRender;
