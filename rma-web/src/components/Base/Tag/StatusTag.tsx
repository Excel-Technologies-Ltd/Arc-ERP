// Type definitions
type Status = 'cancelled' | 'submitted' | 'completed' | 'pending';

interface StatusTagProps {
  status: Status;
  showDot?: boolean;
  uppercase?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

// Status configuration with type safety
const statusConfig: Record<
  Status,
  {
    bgColor: string;
    textColor: string;
    borderColor: string;
    dotColor: string;
  }
> = {
  cancelled: {
    bgColor: 'bg-red-100',
    textColor: 'text-red-800',
    borderColor: 'border-red-200',
    dotColor: 'bg-red-500',
  },
  submitted: {
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-800',
    borderColor: 'border-blue-200',
    dotColor: 'bg-blue-500',
  },
  completed: {
    bgColor: 'bg-green-100',
    textColor: 'text-green-800',
    borderColor: 'border-green-200',
    dotColor: 'bg-green-500',
  },
  pending: {
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-800',
    borderColor: 'border-yellow-200',
    dotColor: 'bg-yellow-500',
  },
};

export const StatusTag: React.FC<StatusTagProps> = ({
  status,
  showDot = true,
  uppercase = true,
  className = '',
  size = 'sm',
}) => {
  // Get the appropriate styles for the status
  const statusStyle = statusConfig[status];

  // Size classes
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <span
      className={`
        inline-flex items-center rounded-full border font-medium
        ${statusStyle.bgColor}
        ${statusStyle.textColor}
        ${statusStyle.borderColor}
        ${sizeClasses[size]}
        ${uppercase ? 'uppercase' : ''}
        ${className}
      `}
    >
      {showDot && <span className={`w-1 h-1 rounded-full mr-2 ${statusStyle.dotColor}`} />}
      {status}
    </span>
  );
};
