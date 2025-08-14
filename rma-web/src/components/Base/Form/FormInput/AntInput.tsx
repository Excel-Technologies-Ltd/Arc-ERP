import React from 'react';
import { Input } from 'antd';
import clsx from 'clsx';

// Define a type for the input type (text or password)
type InputType = 'text' | 'password';

// Interface for the props
interface InputProps {
  label?: string;
  type: InputType;
  placeholder: string;
  size?: 'small' | 'large';
  className?: string;
  errors?: string;
}

const AntInput: React.FC<InputProps> = ({
  label,
  type,
  placeholder,
  size = 'large',
  className = '',
  errors,
  ...props
}) => {
  return (
    <>
      {label && <label>{label}</label>}
      {type === 'password' ? (
        <Input.Password
          {...props}
          placeholder={placeholder}
          size={size}
          status={errors ? 'error' : undefined}
          className={clsx(className)}
        />
      ) : (
        <Input
          {...props}
          placeholder={placeholder}
          size={size}
          status={errors ? 'error' : undefined}
          className={clsx(className)}
        />
      )}
    </>
  );
};

export default AntInput;
