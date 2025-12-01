import React from 'react';
import { DatePicker } from 'antd';
import type { DatePickerProps } from 'antd/es/date-picker';

type DatePickerRef = React.ElementRef<typeof DatePicker>;

const AntDatePicker = React.forwardRef<DatePickerRef, DatePickerProps>(
  (
    {
      size = 'large',
      allowClear = true,
      className = 'w-full h-max',
      format = 'DD-MM-YYYY',
      ...rest
    },
    ref
  ) => {
    return (
      <DatePicker
        ref={ref}
        size={size}
        allowClear={allowClear}
        className={className}
        {...rest}
        format={format}
      />
    );
  }
);

export default AntDatePicker;
