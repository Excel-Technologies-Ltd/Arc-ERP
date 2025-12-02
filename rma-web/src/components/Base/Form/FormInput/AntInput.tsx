import React from 'react';
import { Input, type InputProps } from 'antd';

//Define a type for the input type
type InputType = 'text' | 'password' | 'number' | 'textarea';

// Interface for the props
interface AntInputProps extends InputProps {
  type: InputType;
  label?: string;
  errors?: boolean;
  isCapitalised?: boolean;
  rows?: number;
}

const AntInput: React.FC<AntInputProps> = (props) => {
  const {
    label,
    type = 'text',
    errors,
    size = 'large',
    allowClear = true,
    isCapitalised = false,
    rows = 1,
    ...rest
  } = props;
  return (
    <div className='flex flex-col gap-1 w-full'>
      {label && (
        <label className='text-xs font-medium text-gray-500 dark:text-gray-400'>{label}</label>
      )}
      {type === 'password' ? (
        <Input.Password {...rest} status={errors ? 'error' : undefined} size={size} />
      ) : type === 'textarea' ? (
        (() => {
          // Narrow props for TextArea to avoid type incompatibilities with InputProps (e.g. prefix)
          type TextAreaProps = React.ComponentProps<typeof Input.TextArea>;
          const textAreaProps = rest as TextAreaProps;

          return (
            <Input.TextArea
              className='w-full'
              status={errors ? 'error' : undefined}
              size={size}
              rows={rows}
              allowClear={allowClear}
              {...textAreaProps}
            />
          );
        })()
      ) : (
        (() => {
          const { onChange, className, ...inputProps } = rest;

          const handleUppercaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            // Skip transformation for number type
            if (type === 'number') return onChange?.(e);
            const value = e.target.value?.toUpperCase();
            onChange?.({ ...e, target: { ...e.target, value } });
          };

          return (
            <Input
              {...inputProps}
              status={errors ? 'error' : undefined}
              size={size}
              allowClear={allowClear}
              className={`${className ?? ''} ${isCapitalised ? 'uppercase' : ''}`}
              onChange={isCapitalised ? handleUppercaseChange : onChange}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (type === 'number') {
                  // Allow digits, Backspace, Delete, ArrowLeft, ArrowRight, Tab, and other navigation keys
                  if (
                    !/^\d$/.test(e.key) && // Allow digits
                    !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)
                  ) {
                    e.preventDefault();
                  }
                }
              }}
            />
          );
        })()
      )}
    </div>
  );
};

export default AntInput;
