import '@/assets/css/themes/enigma/side-nav.css';
import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  FormattedMenu,
  linkTo,
  nestedMenu,
  forceActiveMenuContext,
  forceActiveMenu,
} from './side-menu/side-bar';
import Tippy from '@/components/Base/Tippy';
import clsx from 'clsx';
import TopBar from '@/layout/top-bar';
import MobileMenu from '@/layout/mobile-menu';
import { nestedMenuWithPermissions } from '@/utils/menuUtils';
import useUserPermissions from '@/hooks/permission/useUserPermissions';
import { UserRoles } from '@/utils/permissionUtils';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import MainMenu from './side-menu/MainMenu';

function Main() {
  const navigate = useNavigate();
  const location = useLocation();
  const sideMenu = MainMenu();
  const userRoles = useUserPermissions();
  const [formattedMenu, setFormattedMenu] = useState<Array<FormattedMenu | 'divider'>>([]);
  const menu = () => nestedMenuWithPermissions(sideMenu, location, userRoles as UserRoles);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Recompute menu when route or user roles/permissions change
  useEffect(() => {
    setFormattedMenu(menu());
  }, [location.pathname, userRoles]);

  // Manage resize listener with proper cleanup
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <forceActiveMenuContext.Provider
      value={{
        forceActiveMenu: (pathname) => {
          forceActiveMenu(location, pathname);
          setFormattedMenu(nestedMenu(sideMenu, location));
        },
      }}
    >
      <div
        className={clsx([
          'enigma py-5 px-5 md:py-0 sm:px-8 md:px-0',
          "before:content-[''] before:bg-gradient-to-b before:from-theme-1 before:to-theme-2 dark:before:from-darkmode-800 dark:before:to-darkmode-800 md:before:bg-none md:bg-slate-200 md:dark:bg-darkmode-800 before:fixed before:inset-0 before:z-[-1]",
        ])}
      >
        <MobileMenu />
        <TopBar layout='side-menu' />
        <div className='flex overflow-hidden'>
          {/* BEGIN: Side Menu */}
          <nav className='side-nav w-[100px] xl:w-[260px] px-5 pb-16 overflow-x-hidden z-50 pt-32 -mt-4 hidden md:block'>
            <ul>
              {/* BEGIN: First Child */}
              {formattedMenu.map((menu, menuKey) =>
                menu == 'divider' ? (
                  <li className='my-6 side-nav__divider' key={menuKey}></li>
                ) : (
                  <li key={menuKey}>
                    <Tippy
                      as='a'
                      content={menu.title}
                      options={{
                        placement: 'right',
                      }}
                      disable={windowWidth > 1260}
                      href={menu.subMenu ? '#' : menu.pathname}
                      onClick={(event: React.MouseEvent) => {
                        event.preventDefault();
                        linkTo(menu, navigate);
                        setFormattedMenu([...formattedMenu]);
                      }}
                      className={clsx([menu.active ? 'side-menu side-menu--active' : 'side-menu'])}
                    >
                      <div className='side-menu__icon'>{menu.icon}</div>
                      <div className='side-menu__title'>
                        {menu.title}
                        {menu.subMenu && (
                          <div
                            className={clsx([
                              'side-menu__sub-icon',
                              { 'transform rotate-180': menu.activeDropdown },
                            ])}
                          >
                            <MdOutlineKeyboardArrowDown />
                          </div>
                        )}
                      </div>
                    </Tippy>
                    {/* BEGIN: Second Child */}
                    {menu.subMenu && (
                      <ul
                        className={clsx({
                          'side-menu__sub-open': menu.activeDropdown,
                        })}
                      >
                        {menu.subMenu.map((subMenu, subMenuKey) => (
                          <li key={subMenuKey}>
                            <Tippy
                              as='a'
                              content={subMenu.title}
                              options={{
                                placement: 'right',
                              }}
                              disable={windowWidth > 1260}
                              href={subMenu.subMenu ? '#' : subMenu.pathname}
                              onClick={(event: React.MouseEvent) => {
                                event.preventDefault();
                                linkTo(subMenu, navigate);
                                setFormattedMenu([...formattedMenu]);
                              }}
                              className={clsx([
                                subMenu.active ? 'side-menu side-menu--active' : 'side-menu',
                              ])}
                            >
                              <div className='side-menu__icon'>{subMenu.icon}</div>
                              <div className='side-menu__title'>
                                {subMenu.title}
                                {subMenu.subMenu && (
                                  <div
                                    className={clsx([
                                      'side-menu__sub-icon',
                                      {
                                        'transform rotate-180': subMenu.activeDropdown,
                                      },
                                    ])}
                                  >
                                    <MdOutlineKeyboardArrowDown />
                                  </div>
                                )}
                              </div>
                            </Tippy>
                            {/* BEGIN: Third Child */}
                            {subMenu.subMenu && (
                              <ul
                                className={clsx({
                                  'side-menu__sub-open': subMenu.activeDropdown,
                                })}
                              >
                                {subMenu.subMenu.map((lastSubMenu, lastSubMenuKey) => (
                                  <li key={lastSubMenuKey}>
                                    <Tippy
                                      as='a'
                                      content={lastSubMenu.title}
                                      options={{
                                        placement: 'right',
                                      }}
                                      disable={windowWidth > 1260}
                                      href={lastSubMenu.subMenu ? '#' : lastSubMenu.pathname}
                                      onClick={(event: React.MouseEvent) => {
                                        event.preventDefault();
                                        linkTo(lastSubMenu, navigate);
                                        setFormattedMenu([...formattedMenu]);
                                      }}
                                      className={clsx([
                                        lastSubMenu.active
                                          ? 'side-menu side-menu--active'
                                          : 'side-menu',
                                      ])}
                                    >
                                      <div className='side-menu__icon'>{lastSubMenu.icon}</div>
                                      <div className='side-menu__title'>{lastSubMenu.title}</div>
                                    </Tippy>
                                  </li>
                                ))}
                              </ul>
                            )}
                            {/* END: Third Child */}
                          </li>
                        ))}
                      </ul>
                    )}
                    {/* END: Second Child */}
                  </li>
                )
              )}
              {/* END: First Child */}
            </ul>
          </nav>
          {/* END: Side Menu */}
          {/* BEGIN: Content */}
          <div
            className={clsx([
              'max-w-full md:max-w-none rounded-[30px] md:rounded-none px-4 md:px-[22px] min-w-0 min-h-screen bg-slate-100 flex-1 md:pt-20 pb-10 mt-5 md:mt-1 relative dark:bg-darkmode-700',
              "before:content-[''] before:w-full before:h-px before:block",
            ])}
          >
            <Outlet />
          </div>
          {/* END: Content */}
        </div>
      </div>
    </forceActiveMenuContext.Provider>
  );
}

export default Main;
