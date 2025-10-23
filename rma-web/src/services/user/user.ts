import { User } from '@/types/Core/User';
import { useFrappeGetDoc } from 'frappe-react-sdk';

export const getCurrentUser = (currentUser: string) => {
  return useFrappeGetDoc<User>('User', currentUser, `name:${currentUser}`, {
    isPaused: () => !currentUser,
  });
};
