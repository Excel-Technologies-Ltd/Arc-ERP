import { GET_PERMISSION_LIST } from '@/constants/url-strings';
import { useFrappeGetCall } from 'frappe-react-sdk';

// API Call to get permission list
export const getPermissionlist = () => {
  return useFrappeGetCall(GET_PERMISSION_LIST);
};
