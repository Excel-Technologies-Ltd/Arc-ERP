import toast from 'react-hot-toast';
import CustomToast from './CustomToast';

// Success Toast
export const showSuccessToast = (description: string, title: string = 'SUCCESS') => {
  return toast.custom(
    (t) => (
      <CustomToast
        t={t}
        type='success'
        title={title}
        description={description}
        onClose={() => toast.dismiss(t.id)}
      />
    ),
    {
      duration: 3000,
    }
  );
};

// Error Toast
export const showErrorToast = (description: string, title: string = 'ERROR') => {
  return toast.custom(
    (t) => (
      <CustomToast
        t={t}
        type='error'
        title={title}
        description={description}
        onClose={() => toast.dismiss(t.id)}
      />
    ),
    {
      duration: 5000,
    }
  );
};

// Warning Toast
export const showWarningToast = (description: string, title: string = 'WARNING') => {
  return toast.custom(
    (t) => (
      <CustomToast
        t={t}
        type='warning'
        title={title}
        description={description}
        onClose={() => toast.dismiss(t.id)}
      />
    ),
    {
      duration: 4000,
    }
  );
};

// Generic function to show any type of toast
export const showCustomToast = (
  type: 'success' | 'error' | 'warning',
  description: string,
  title?: string
) => {
  const defaultTitles = {
    success: 'SUCCESS',
    error: 'ERROR',
    warning: 'WARNING',
  };

  const toastTitle = title || defaultTitles[type];

  return toast.custom(
    (t) => (
      <CustomToast
        t={t}
        type={type}
        title={toastTitle}
        description={description}
        onClose={() => toast.dismiss(t.id)}
      />
    ),
    {
      duration: type === 'error' ? 5000 : 4000,
    }
  );
};
