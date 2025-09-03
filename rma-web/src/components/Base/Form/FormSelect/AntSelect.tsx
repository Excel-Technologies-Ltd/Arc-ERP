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
      // styles={{
      //   root: {
      //     backgroundColor: 'red',
      //   },
      //   popup: {},
      // }}
      // dropdownStyle={{ minWidth: '400px' }} // Ensure dropdown is wide enough
      // dropdownRender={(menu) => (
      //   <div style={{ padding: '1px' }}>
      //     {React.cloneElement(menu as React.ReactElement, {
      //       style: {
      //         ...((menu as React.ReactElement).props.style || {}),
      //         whiteSpace: 'wrap', // Allow text wrapping
      //         wordBreak: 'break-word', // Break long words if needed
      //       },
      //     })}
      // </div>
      // )}
      {...rest}
    />
  );
};

export default AntSelect;
