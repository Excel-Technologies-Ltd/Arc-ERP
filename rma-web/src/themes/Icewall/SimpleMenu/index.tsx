import '@/assets/css/themes/icewall/side-nav.css';
import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { selectMenu } from '@/stores/menuSlice';
import { useAppSelector } from '@/stores/hooks';
import {
  FormattedMenu,
  linkTo,
  nestedMenu,
  enter,
  leave,
  forceActiveMenuContext,
  forceActiveMenu,
} from './simple-menu';
import Lucide from '@/components/Base/Lucide';
import Tippy from '@/components/Base/Tippy';
import clsx from 'clsx';
import TopBar from '@/components/Themes/Icewall/TopBar';
import MobileMenu from '@/components/MobileMenu';

function Main() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formattedMenu, setFormattedMenu] = useState<Array<FormattedMenu | 'divider'>>([]);
  const menuStore = useAppSelector(selectMenu('simple-menu'));
  const menu = () => nestedMenu(menuStore, location);

  useEffect(() => {
    setFormattedMenu(menu());
  }, [menuStore, location.pathname]);

  return (
    <forceActiveMenuContext.Provider
      value={{
        forceActiveMenu: (pathname) => {
          forceActiveMenu(location, pathname);
          setFormattedMenu(menu());
        },
      }}
    >
      <div
        className={clsx([
          'icewall px-5 sm:px-8 py-5 relative',
          "after:content-[''] after:bg-gradient-to-b after:from-theme-1 after:to-theme-2 dark:after:from-darkmode-800 dark:after:to-darkmode-800 after:fixed after:inset-0 after:z-[-2]",
        ])}
      >
        <MobileMenu />
        <TopBar />
        <div
          className={clsx([
            'wrapper relative',
            "before:content-[''] before:z-[-1] before:translate-y-[35px] before:opacity-0 before:w-[95%] before:rounded-[1.3rem] before:bg-white/10 before:h-full before:-mt-4 before:absolute before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/50",
          ])}
        >
          <div
            className={clsx([
              'wrapper-box bg-gradient-to-b from-theme-1 to-theme-2 flex rounded-[1.3rem] -mt-[7px] md:mt-0 dark:from-darkmode-400 dark:to-darkmode-400 translate-y-[35px]',
              'before:block before:absolute before:inset-0 before:bg-black/[0.15] before:rounded-[1.3rem] before:z-[-1]',
            ])}
          >
            {/* BEGIN: Simple Menu */}
            <nav className='side-nav side-nav--simple hidden md:block w-[100px] px-5 pt-8 pb-16 overflow-x-hidden'>
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
                          placement: 'left',
                        }}
                        href={menu.subMenu ? '#' : menu.pathname}
                        onClick={(event: React.MouseEvent) => {
                          event.preventDefault();
                          linkTo(menu, navigate);
                          setFormattedMenu([...formattedMenu]);
                        }}
                        className={clsx([
                          menu.active ? 'side-menu side-menu--active' : 'side-menu',
                        ])}
                      >
                        <div className='side-menu__icon'>
                          <Lucide icon={menu.icon} />
                        </div>
                        <div className='side-menu__title'>
                          {menu.title}
                          {menu.subMenu && (
                            <div
                              className={clsx([
                                'side-menu__sub-icon',
                                menu.activeDropdown && 'transform rotate-180',
                              ])}
                            >
                              <Lucide icon='ChevronDown' />
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
                                  placement: 'left',
                                }}
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
                                <div className='side-menu__icon'>
                                  <Lucide icon={subMenu.icon} />
                                </div>
                                <div className='side-menu__title'>
                                  {subMenu.title}
                                  {subMenu.subMenu && (
                                    <div
                                      className={clsx([
                                        'side-menu__sub-icon',
                                        subMenu.activeDropdown && 'transform rotate-180',
                                      ])}
                                    >
                                      <Lucide icon='ChevronDown' />
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
                                          placement: 'left',
                                        }}
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
                                        <div className='side-menu__icon'>
                                          <Lucide icon={lastSubMenu.icon} />
                                        </div>
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
            {/* END: Simple Menu */}
            {/* BEGIN: Content */}
            <div className="md:max-w-auto min-h-screen min-w-0 max-w-full flex-1 rounded-[1.3rem] bg-slate-100 px-4 pb-10 shadow-sm before:block before:h-px before:w-full before:content-[''] dark:bg-darkmode-700 md:px-[22px]">
              <Outlet />
            </div>
            {/* END: Content */}
          </div>
        </div>
      </div>
    </forceActiveMenuContext.Provider>
  );
}

export default Main;
