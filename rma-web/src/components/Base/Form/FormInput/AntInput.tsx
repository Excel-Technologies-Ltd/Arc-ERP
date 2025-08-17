import React from 'react';
import { Input, type InputProps } from 'antd';

// Define a type for the input type
type InputType = 'text' | 'password';

// Interface for the props
interface AntInputProps extends InputProps {
  type: InputType;
  label?: string;
  errors?: boolean;
}

const AntInput: React.FC<AntInputProps> = ({ label, type = 'text', errors, ...props }) => {
  return (
    <>
      {label && <label className='ant-input-label'>{label}</label>}
      {type === 'password' ? (
        <Input.Password {...props} status={errors ? 'error' : undefined} />
      ) : (
        <Input {...props} status={errors ? 'error' : undefined} />
      )}
    </>
  );
};

export default AntInput;
