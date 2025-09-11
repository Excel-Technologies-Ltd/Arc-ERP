import React from 'react';
import { Button, ButtonProps } from 'antd';

interface AntButtonProps extends ButtonProps {
  label?: string;
}

const AntButton: React.FC<AntButtonProps> = ({ label, ...props }) => {
  const { children, size = 'large', ...rest } = props;
  return (
    <Button size={size} {...rest}>
      {children || label}
    </Button>
  );
};

export default AntButton;
