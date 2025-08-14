import { useFrappeGetCall } from 'frappe-react-sdk';

// API Call to get permission list
export const getPermissionlist = () => {
  return useFrappeGetCall('excel_rma.api.auth.user_details_with_permission');
};
