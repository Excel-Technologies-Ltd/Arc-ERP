import React from 'react';
import { DatePicker } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';

const { RangePicker } = DatePicker;
type RangePickerRef = React.ElementRef<typeof RangePicker>;

const AntRangePicker = React.forwardRef<RangePickerRef, RangePickerProps>(
  ({ size = 'large', allowClear = true, className = 'w-full', ...rest }, ref) => {
    return (
      <RangePicker
        ref={ref}
        size={size}
        allowClear={allowClear}
        className={className}
        {...rest}
        style={{
          minWidth: '260px',
        }}
        classNames={{
          popup: {
            root: 'single-month-picker',
          },
        }}
      />
    );
  }
);

export default AntRangePicker;
