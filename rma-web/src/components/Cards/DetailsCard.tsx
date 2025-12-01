import { DetailsCardProps } from '@/types/pages/purchase';
import { IoIosCart } from 'react-icons/io';

export const DetailsCard: React.FC<DetailsCardProps> = ({
  title = 'Details',
  titleIcon,
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
      className={`p-5 rounded-md bg-white shadow-sm border border-gray-200 dark:bg-darkmode-800 dark:border-darkmode-600 relative ${className}`}
    >
      {title && (
        <div
          className={`flex items-center pb-5 mb-5 gap-2 text-primary ${border ? 'border-b border-primary/30 dark:border-darkmode-400' : ''}`}
        >
          {titleIcon && (
            <span className='flex items-center justify-center text-2xl'>{titleIcon}</span>
          )}
          <span className={`text-xl font-medium truncate ${titleClassName}`}>{title}</span>
        </div>
      )}

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2'>
        {items.map((item, index) => (
          <div key={index} className={`flex flex-col gap-y-2 ${itemClassName}`}>
            <div className='flex items-end gap-1'>
              {item.icon && (
                <span
                  className={`flex items-center justify-center text-xl text-primary ${iconClassName}`}
                >
                  {item.icon}
                </span>
              )}
              <span className='text-slate-500 dark:text-slate-300 text-xs'>{item.label}</span>
            </div>
            {item.isLink ? (
              <span
                className={`ml-1 underline decoration-dotted text-blue-600 dark:text-blue-400 ${valueClassName}`}
              >
                {item.value}
              </span>
            ) : (
              <span
                className={`ml-1 text-primary dark:text-white/50 font-medium text-base ${valueClassName}`}
              >
                {item.value}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Decorative background icon with fancy effects */}
      <div className='absolute top-2 right-2 pointer-events-none overflow-visible'>
        {/* Outer glow layer */}

        {/* Main icon with shadow and rotation */}
        <IoIosCart
          className='relative text-gray-500/20 dark:text-gray-500/30 rotate-12 z-10'
          size={60}
          style={{
            filter:
              'drop-shadow(0 8px 12px rgba(0, 0, 0, 0.15)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
            transform: 'rotate(12deg)',
          }}
        />
      </div>
    </div>
  );
};
