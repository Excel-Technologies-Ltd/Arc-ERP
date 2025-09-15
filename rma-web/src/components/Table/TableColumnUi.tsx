import { formatCurrency } from '@/utils/helper';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

// Date Time Column UI
export const ColumnDateTime = (value: string) => {
  return (
    <div className='flex flex-col text-xs'>
      <span className='font-medium'>{dayjs(value).format('DD MMM, YYYY')}</span>
      <span className='text-primary dark:text-darkmode-50'>{dayjs(value).format('hh:mm A')}</span>
    </div>
  );
};

// Link Column UI
export const ColumnLink = (url: string, value: string) => {
  return (
    <Link
      to={url}
      className='underline decoration-dotted whitespace-nowrap text-info dark:text-light font-semibold underline-offset-4 hover:underline hover:text-info'
    >
      {value}
    </Link>
  );
};

// Progress Column UI
export const ColumnProgress = (percent: number) => {
  return (
    <div className='w-full bg-gray-200 rounded-full h-1.5'>
      <div
        className={`h-1.5 rounded-full ${percent > 0.5 ? 'bg-green-500' : 'bg-orange-500'}`}
        style={{ width: `${percent * 99}%` }}
      ></div>
    </div>
  );
};

// Currency Column UI
export const ColumnCurrency = (value: number) => {
  return <span>{formatCurrency(value)}</span>;
};
