import { Select, Spin } from 'antd';
import type { SelectProps } from 'antd';
import React from 'react';

export interface AntSelectProps extends SelectProps {
  notFoundText?: string;
}

const AntSelect: React.FC<AntSelectProps> = (props) => {
  const {
    size = 'large',
    allowClear = true,
    showSearch = true,
    className = 'w-full',
    loading = false,
    notFoundText = 'No options',
    ...rest
  } = props;
  return (
    <Select
      size={size}
      allowClear={allowClear}
      showSearch={showSearch}
      className={className}
      loading={loading}
      notFoundContent={loading ? <Spin size='small' /> : notFoundText}
      filterOption={(input, option) =>
        (option?.label as string)?.toLowerCase().includes(input.toLowerCase())
      }
      {...rest}
    />
  );
};

export default AntSelect;
