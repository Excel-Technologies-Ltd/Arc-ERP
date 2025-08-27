import { useCallback, useMemo } from 'react';
import useUserPermissions from './useUserPermissions';

// Define the action types as a union
export type PermissionAction =
  | 'read'
  | 'write'
  | 'create'
  | 'delete'
  | 'submit'
  | 'cancel'
  | 'amend'
  | 'report'
  | 'export'
  | 'import';

export const usePermissions = () => {
  const userRoles = useUserPermissions();

  const hasRole = useCallback(
    (requiredRoles: string[]): boolean => {
      if (!userRoles) return false;
      return requiredRoles.some((role) => userRoles.roles.includes(role));
    },
    [userRoles]
  );

  const hasPermission = useCallback(
    (entity: string, action: PermissionAction): boolean => {
      if (!userRoles) return false;

      // Admins have all permissions
      if (isAdmin()) {
        return true;
      }

      if (!userRoles.permissions[entity]) {
        return false;
      }

      return userRoles.permissions[entity][action] || false;
    },
    [userRoles]
  );

  const isAdmin = useCallback((): boolean => {
    if (!userRoles) return false;
    const adminRoles = ['Administrator', 'System Manager'];
    return adminRoles.some((role) => userRoles.roles.includes(role));
  }, [userRoles]);

  return {
    hasRole,
    hasPermission,
    isAdmin,
    isLoading: userRoles === null,
    userRoles,
  };
};

// Hook for conditional rendering based on permissions
export const useConditionalRender = (entity: string, action: PermissionAction) => {
  const { hasPermission, isAdmin } = usePermissions();

  return useMemo(
    () => isAdmin() || hasPermission(entity, action),
    [entity, action, hasPermission, isAdmin]
  );
};
