import React from 'react';
import { Spin, type SpinProps } from 'antd';

// Define the component's props with type safety
interface AntSpinProps extends SpinProps {
  isLoading: boolean;
  size?: 'small' | 'default' | 'large';
  tip?: string;
}

const AntSpin: React.FC<AntSpinProps> = ({
  isLoading,
  size = 'default',
  tip = 'Loading...',
  children,
  ...rest
}) => {
  return (
    <Spin spinning={isLoading} size={size} tip={tip} {...rest}>
      {children}
    </Spin>
  );
};

export default AntSpin;
