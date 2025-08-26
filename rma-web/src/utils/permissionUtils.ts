export interface Permission {
  read: boolean;
  write: boolean;
  create: boolean;
  delete: boolean;
  submit: boolean;
  [key: string]: boolean;
}

export interface Permissions {
  [key: string]: Permission;
}

export type Role = string;

export interface UserRoles {
  roles: Role[];
  permissions: Permissions;
}

export const hasRole = (userRoles: Role[], requiredRoles: Role[]): boolean => {
  return requiredRoles.some((role) => userRoles.includes(role));
};

export const hasPermission = (
  permissions: Permissions,
  entity: string,
  action: keyof Permission
): boolean => {
  if (!permissions[entity]) return false;
  return permissions[entity][action] || false;
};

export const isAdmin = (userRoles: Role[]): boolean => {
  const adminRoles: Role[] = ['Administrator', 'System Manager'];
  return hasRole(userRoles, adminRoles);
};
