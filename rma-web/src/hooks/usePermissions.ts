import { useCallback, useMemo } from 'react';
import useUserPermissions from './useUserPermissions';

// Define the action types as a union
type PermissionAction =
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
    const adminRoles = ['Administrator', 'System Manager', 'All'];
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

// Specific entity permission hooks
export const useEntityPermissions = (entity: string) => {
  const { hasPermission, isAdmin } = usePermissions();

  const canRead = useCallback(
    () => isAdmin() || hasPermission(entity, 'read'),
    [entity, hasPermission, isAdmin]
  );

  const canCreate = useCallback(
    () => isAdmin() || hasPermission(entity, 'create'),
    [entity, hasPermission, isAdmin]
  );

  const canWrite = useCallback(
    () => isAdmin() || hasPermission(entity, 'write'),
    [entity, hasPermission, isAdmin]
  );

  const canDelete = useCallback(
    () => isAdmin() || hasPermission(entity, 'delete'),
    [entity, hasPermission, isAdmin]
  );

  const canSubmit = useCallback(
    () => isAdmin() || hasPermission(entity, 'submit'),
    [entity, hasPermission, isAdmin]
  );

  const can = useCallback(
    (action: PermissionAction) => isAdmin() || hasPermission(entity, action),
    [entity, hasPermission, isAdmin]
  );

  return {
    canRead,
    canCreate,
    canWrite,
    canDelete,
    canSubmit,
    can,
    entity,
  };
};

// Pre-built hooks for common entities
export const usePurchasePermissions = () => useEntityPermissions('Purchase');
export const useSalesInvoicePermissions = () => useEntityPermissions('Sales Invoice');
export const useCustomerPermissions = () => useEntityPermissions('Customer');
export const useStockPermissions = () => useEntityPermissions('Stock');
export const useSettingsPermissions = () => useEntityPermissions('Settings');

// Hook for conditional rendering based on permissions
export const useConditionalRender = (entity: string, action: PermissionAction) => {
  const { hasPermission, isAdmin } = usePermissions();

  return useMemo(
    () => isAdmin() || hasPermission(entity, action),
    [entity, action, hasPermission, isAdmin]
  );
};
