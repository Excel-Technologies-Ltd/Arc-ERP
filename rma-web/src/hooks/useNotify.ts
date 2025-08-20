import { Ctx, type NotifyType } from '@/components/Notification/NotificationProvider';
import { useContext } from 'react';

export const useNotify = (): NotifyType => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useNotify must be used within <NotificationProvider>');
  return ctx;
};
