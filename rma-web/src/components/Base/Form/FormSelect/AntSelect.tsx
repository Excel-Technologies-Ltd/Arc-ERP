import { Select, Spin } from 'antd';
import type { SelectProps } from 'antd';
import React from 'react';

export type AntSelectOption = {
  value: string | number;
  label: React.ReactNode;
  disabled?: boolean;
};

export interface AntSelectProps extends Omit<SelectProps, 'options' | 'loading'> {
  options?: AntSelectOption[];
  loading?: boolean;
  showSearch?: boolean;
  allowClear?: boolean;
  className?: string;
  notFoundText?: React.ReactNode;
}

const AntSelect: React.FC<AntSelectProps> = ({
  options = [],
  loading = false,
  allowClear = true,
  showSearch = true,
  size = 'large',
  className = 'w-full',
  notFoundText,
  ...rest
}) => {
  return (
    <Select
      size={size}
      allowClear={allowClear}
      showSearch={showSearch}
      className={className}
      loading={loading}
      notFoundContent={loading ? <Spin size='small' /> : (notFoundText ?? 'No options')}
      filterOption={(input, option) =>
        (option?.label as string)?.toLowerCase().includes(input.toLowerCase())
      }
      options={options}
      {...rest}
    />
  );
};

export default AntSelect;
