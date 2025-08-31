import { createContext } from 'react';
import { type NotifyType } from './NotificationProvider';

export const Ctx = createContext<NotifyType | null>(null);
