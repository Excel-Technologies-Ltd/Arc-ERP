import React from 'react';
import toast, { Toast } from 'react-hot-toast';
import { CheckCircle, XCircle, AlertTriangle, X } from 'lucide-react';

export interface CustomToastProps {
  t: Toast;
  type: 'success' | 'error' | 'warning';
  title: string;
  description: string;
  onClose?: () => void;
}

const CustomToast: React.FC<CustomToastProps> = ({ t, type, title, description, onClose }) => {
  // Get the icon based on the type
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className='h-6 w-6 text-green-500' />;
      case 'error':
        return <XCircle className='h-6 w-6 text-red-500' />;
      case 'warning':
        return <AlertTriangle className='h-6 w-6 text-yellow-500' />;
      default:
        return null;
    }
  };

  // Get the border color based on the type
  const getBorderColor = () => {
    switch (type) {
      case 'success':
        return 'border-l-green-500';
      case 'error':
        return 'border-l-red-500';
      case 'warning':
        return 'border-l-yellow-500';
      default:
        return 'border-l-gray-500';
    }
  };

  // Get the title color based on the type
  const getTitleColor = () => {
    switch (type) {
      case 'success':
        return 'text-green-800';
      case 'error':
        return 'text-red-800';
      case 'warning':
        return 'text-yellow-800';
      default:
        return 'text-gray-800';
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50';
      case 'error':
        return 'bg-red-50';
      case 'warning':
        return 'bg-yellow-50';
      default:
        return 'bg-gray-50';
    }
  };

  // Handle close button click
  const handleClose = () => {
    // Call the onClose callback if provided
    if (onClose) {
      onClose();
    }
    // Immediately dismiss the toast
    toast.dismiss(t.id);
  };

  return (
    <div
      className={`${
        t.visible ? 'animate-fade-in' : ''
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 border-l-8 relative ${getBorderColor()}`}
    >
      <div className={`flex-1 w-0 p-4 ${getBgColor()}`}>
        <div className='flex items-start'>
          <div className='flex-shrink-0 pt-0.5'>{getIcon()}</div>
          <div className='ml-3 flex-1'>
            <p className={`text-sm font-semibold ${getTitleColor()}`}>{title}</p>
            <p className='mt-1 text-sm text-gray-600'>{description}</p>
          </div>
        </div>
      </div>
      <div className='absolute right-0 top-[50%] translate-y-[-50%]'>
        <button
          onClick={handleClose}
          className='w-full p-4 flex items-center justify-center text-sm font-medium text-gray-600 hover:text-gray-500'
        >
          <X className='h-4 w-4' />
        </button>
      </div>
    </div>
  );
};

export default CustomToast;
