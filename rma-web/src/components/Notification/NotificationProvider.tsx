import React, { useMemo } from 'react';
import { notification, type NotificationArgsProps } from 'antd';
import { Ctx } from './NotificationContext';

// Infer exact AntD types (safe & future-proof)
type NotificationAPI = ReturnType<typeof notification.useNotification>[0];
type NotifyArgs = Parameters<NotificationAPI['open']>[0];
type NotifyPayload = Omit<NotifyArgs, 'type'> & {
  /** seconds; 0 = persistent. AntD auto-closes when > 0 */
  duration?: number;
};

export type NotifyType = {
  open: (args: NotifyPayload) => void;
  success: (args: NotifyPayload) => void;
  info: (args: NotifyPayload) => void;
  warning: (args: NotifyPayload) => void;
  error: (args: NotifyPayload) => void;
  close: (key: React.Key) => void;
};

export const NotificationProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  // Best practice: ensure AntD context exists (App handles portals/config)
  const [api, holder] = notification.useNotification({
    maxCount: 5,
    placement: 'bottom',
  });

  const value = useMemo<NotifyType>(() => {
    const call = (type?: NotificationArgsProps['type']) => (args: NotifyPayload) => {
      const base: NotifyArgs = {
        ...args,
      };

      // AntD auto-closes when duration > 0. duration = 0 => sticky.
      if (type) api[type](base);
      else api.open(base);
    };

    return {
      open: call(undefined),
      success: call('success'),
      info: call('info'),
      warning: call('warning'),
      error: call('error'),
      close: (key: React.Key) => api.destroy(key),
    };
  }, [api]);

  return (
    <>
      {holder}
      <Ctx.Provider value={value}>{children}</Ctx.Provider>
    </>
  );
};
