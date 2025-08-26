import { UserRoles } from '@/utils/permissionUtils';

export const useUserPermissions = (): UserRoles => {
  try {
    const permissions = JSON.parse(localStorage.getItem('permissions') || '{}');
    const roles = JSON.parse(localStorage.getItem('roles') || '[]');

    return { roles, permissions };
  } catch (error) {
    console.error('Error parsing permissions:', error);
    return { roles: [], permissions: {} };
  }
};

export default useUserPermissions;
