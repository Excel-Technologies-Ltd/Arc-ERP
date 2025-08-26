import { Menu } from '@/types/menu/menu.types';
import { hasPermission, isAdmin, Permission, UserRoles } from './permissionUtils';
import { Location, nestedMenu } from '@/themes/Enigma/SideMenu/side-menu';

// Map menu items to required permissions
const menuPermissions: { [key: string]: { entity: string; action: keyof Permission } } = {
  Purchase: { entity: 'Purchase', action: 'read' },
  'Add Sales Invoice': { entity: 'Sales Invoice', action: 'create' },
  'Sales Invoice List': { entity: 'Sales Invoice', action: 'read' },
  'Sales Return': { entity: 'Sales Return', action: 'read' },
  'Add Stock Entry': { entity: 'Stock', action: 'create' },
  'Stock Entry List': { entity: 'Stock', action: 'read' },
  'Stock Availability': { entity: 'Stock', action: 'read' },
  'Stock Serial': { entity: 'Stock', action: 'read' },
  'Stock Ledger': { entity: 'Stock', action: 'read' },
  'Customer Profile': { entity: 'Customer', action: 'read' },
  'Customer Brand Limit': { entity: 'Customer', action: 'read' },
  Server: { entity: 'Settings', action: 'read' },
  'Item Price': { entity: 'Settings', action: 'read' },
};

const hasMenuPermission = (userRoles: UserRoles, menuTitle: string): boolean => {
  // Admins have access to everything
  if (isAdmin(userRoles.roles)) {
    return true;
  }

  const permissionConfig = menuPermissions[menuTitle];

  if (!permissionConfig) {
    // If no specific permission config, allow access
    return true;
  }

  return hasPermission(userRoles.permissions, permissionConfig.entity, permissionConfig.action);
};

export const filterMenuByPermissions = (
  menu: Array<Menu | 'divider'>,
  userRoles: UserRoles
): Array<Menu | 'divider'> => {
  return menu.filter((item) => {
    if (typeof item === 'string') return true; // Keep dividers

    // Check if main menu item has permission
    if (!hasMenuPermission(userRoles, item.title)) {
      return false;
    }

    // Filter submenu items
    if (item.subMenu) {
      const filteredSubMenu = item.subMenu.filter((subItem) =>
        hasMenuPermission(userRoles, subItem.title)
      );

      // If no submenu items remain, hide the entire menu
      if (filteredSubMenu.length === 0) {
        return false;
      }

      item.subMenu = filteredSubMenu;
    }

    return true;
  });
};

// Enhanced nestedMenu function with permissions
export const nestedMenuWithPermissions = (
  menu: Array<Menu | 'divider'>,
  location: Location,
  userRoles: UserRoles
) => {
  const filteredMenu = filterMenuByPermissions(menu, userRoles);
  return nestedMenu(filteredMenu, location);
};
