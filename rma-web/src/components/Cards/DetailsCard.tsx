import { DetailsCardProps } from '@/types/pages/purchase';

export const DetailsCard: React.FC<DetailsCardProps> = ({
  title = 'Details',
  items,
  className = '',
  titleClassName = '',
  itemClassName = '',
  iconClassName = '',
  valueClassName = '',
  border = true,
}) => {
  return (
    <div
      className={`p-5 rounded-md bg-white shadow-sm border border-gray-200 dark:bg-darkmode-800 dark:border-darkmode-600 ${className}`}
    >
      {title && (
        <div
          className={`flex items-center pb-5 mb-5 ${border ? 'border-b border-slate-200/60 dark:border-darkmode-400' : ''}`}
        >
          <div className={`text-base font-medium truncate ${titleClassName}`}>{title}</div>
        </div>
      )}

      {items.map((item, index) => (
        <div
          key={index}
          className={`flex items-center ${index > 0 ? 'mt-3' : ''} ${itemClassName}`}
        >
          {item.icon && (
            <span className={`w-4 h-4 mr-2 flex items-center justify-center ${iconClassName}`}>
              {item.icon}
            </span>
          )}
          <span className='mr-1 text-slate-700 dark:text-slate-300'>{item.label}:</span>
          {item.isLink ? (
            <span
              className={`ml-1 underline decoration-dotted text-blue-600 dark:text-blue-400 ${valueClassName}`}
            >
              {item.value}
            </span>
          ) : (
            <span className={`ml-1 text-slate-900 dark:text-slate-100 ${valueClassName}`}>
              {item.value}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};
