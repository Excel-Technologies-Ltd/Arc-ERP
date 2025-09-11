import { NavigateFunction } from 'react-router-dom';
import { createContext } from 'react';
import { Menu } from '@/types/menu/menu.types';
import { UserRoles } from '@/utils/permissionUtils';
import { filterMenuByPermissions } from '@/utils/menuUtils';

export interface Location {
  pathname: string;
  forceActiveMenu?: string;
}

export interface FormattedMenu extends Menu {
  active?: boolean;
  activeDropdown?: boolean;
  subMenu?: FormattedMenu[];
}

export const forceActiveMenuContext = createContext<{
  forceActiveMenu: (pathname: string) => void;
}>({
  forceActiveMenu: () => {},
});

export const forceActiveMenu = (location: Location, pathname: string) => {
  location.forceActiveMenu = pathname;
};

// Check if a menu item is active based on pathname or forceActiveMenu
const isMenuItemActive = (item: Menu, location: Location): boolean => {
  const { pathname, forceActiveMenu } = location;
  const currentPath = forceActiveMenu ?? pathname;
  return (
    !item.ignore && (item.pathname === currentPath || currentPath.startsWith(item.pathname + '/'))
  );
};

// Recursively find if any submenu item is active
const findActiveMenu = (subMenu: Menu[], location: Location): boolean =>
  subMenu.some(
    (item) =>
      isMenuItemActive(item, location) || (item.subMenu && findActiveMenu(item.subMenu, location))
  );

export const nestedMenu = (
  menu: Array<Menu | 'divider'>,
  location: Location,
  userRoles?: UserRoles
): Array<FormattedMenu | 'divider'> => {
  // Filter menu by permissions if userRoles provided
  const menuToProcess = userRoles ? filterMenuByPermissions([...menu], userRoles) : menu;

  return menuToProcess.map((item) =>
    item === 'divider'
      ? item
      : {
          ...item,
          active:
            isMenuItemActive(item, location) ||
            (item.subMenu && findActiveMenu(item.subMenu, location)),
          subMenu: item.subMenu
            ? nestedMenu(item.subMenu, location, userRoles).filter(
                (subItem): subItem is FormattedMenu => subItem !== 'divider'
              )
            : undefined,
          activeDropdown: item.subMenu ? findActiveMenu(item.subMenu, location) : undefined,
        }
  );
};

export const linkTo = (menu: FormattedMenu, navigate: NavigateFunction) => {
  if (menu.subMenu) {
    menu.activeDropdown = !menu.activeDropdown;
  } else if (menu.pathname) {
    navigate(menu.pathname);
  }
};
