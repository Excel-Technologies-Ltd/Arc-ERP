import { useAppSelector } from '@/stores/hooks';
import { selectPermissions } from '@/stores/permissionSlice';
import { UserRoles } from '@/utils/permissionUtils';
import { useMemo } from 'react';

export const useUserPermissions = (): UserRoles => {
  const { roles, permissions } = useAppSelector(selectPermissions);
  return useMemo(() => ({ roles, permissions }), [roles, permissions]);
};

export default useUserPermissions;
