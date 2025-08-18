import React from 'react';
import { Input, type InputProps } from 'antd';

// Define a type for the input type
type InputType = 'text' | 'password' | 'number';

// Interface for the props
interface AntInputProps extends InputProps {
  type: InputType;
  label?: string;
  errors?: boolean;
  size?: 'large' | 'middle' | 'small';
  allowClear?: boolean;
}

const AntInput: React.FC<AntInputProps> = ({
  label,
  type = 'text',
  errors,
  size = 'large',
  allowClear = true,
  ...props
}) => {
  return (
    <div className='flex flex-col w-full'>
      {label && <label className='ant-input-label'>{label}</label>}
      {type === 'password' ? (
        <Input.Password {...props} status={errors ? 'error' : undefined} size={size} />
      ) : (
        <Input
          {...props}
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
