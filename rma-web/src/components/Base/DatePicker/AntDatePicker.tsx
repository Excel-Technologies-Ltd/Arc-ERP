import React from 'react';
import { DatePicker } from 'antd';
import type { DatePickerProps } from 'antd/es/date-picker';

type DatePickerRef = React.ElementRef<typeof DatePicker>;

export interface AntDatePickerProps extends DatePickerProps {
  label?: string;
}

const AntDatePicker = React.forwardRef<DatePickerRef, AntDatePickerProps>(
  (
    {
      size = 'large',
      allowClear = true,
      className = 'w-full h-max',
      format = 'DD-MM-YYYY',
      label,
      ...rest
    },
    ref
  ) => {
    return (
      <div className='flex flex-col gap-1 w-full'>
        {label && (
          <label className='text-xs font-medium text-gray-500 dark:text-gray-400'>{label}</label>
        )}
        <DatePicker
          ref={ref}
          size={size}
          allowClear={allowClear}
          className={className}
          {...rest}
          format={format}
        />
      </div>
    );
  }
);

export default AntDatePicker;
