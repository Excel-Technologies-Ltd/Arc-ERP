import React from 'react';
import { Input, type InputProps } from 'antd';

//Define a type for the input type
type InputType = 'text' | 'password' | 'number';

// Interface for the props
interface AntInputProps extends InputProps {
  type: InputType;
  label?: string;
  errors?: boolean;
  isCapitalised?: boolean;
}

const AntInput: React.FC<AntInputProps> = (props) => {
  const {
    label,
    type = 'text',
    errors,
    size = 'large',
    allowClear = true,
    isCapitalised = false,
    ...rest
  } = props;
  return (
    <div className='flex flex-col w-full'>
      {label && <label className='ant-input-label'>{label}</label>}
      {type === 'password' ? (
        <Input.Password {...rest} status={errors ? 'error' : undefined} size={size} />
      ) : (
        (() => {
          const { onChange, className, ...inputProps } = rest;

          const handleUppercaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            // Skip transformation for number type
            if (type === 'number') return onChange?.(e as any);
            const value = e.target.value?.toUpperCase();
            onChange?.({ ...e, target: { ...e.target, value } } as any);
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
