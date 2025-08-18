import React from 'react';
import { Input, type InputProps, type InputRef } from 'antd';

// Define a type for the input type
type InputType = 'text' | 'password' | 'number';

// Interface for the props
interface AntInputProps extends InputProps {
  type: InputType;
  label?: string;
  errors?: boolean;
  ref?: React.RefObject<InputRef>;
}

const AntInput: React.FC<AntInputProps> = (props) => {
  const { label, type = 'text', errors, size = 'large', allowClear = true, ref, ...rest } = props;
  return (
    <div className='flex flex-col w-full'>
      {label && <label className='ant-input-label'>{label}</label>}
      {type === 'password' ? (
        <Input.Password {...rest} ref={ref} status={errors ? 'error' : undefined} size={size} />
      ) : (
        <Input
          {...rest}
          ref={ref}
          status={errors ? 'error' : undefined}
          size={size}
          allowClear={allowClear}
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
      )}
    </div>
  );
};

export default AntInput;
