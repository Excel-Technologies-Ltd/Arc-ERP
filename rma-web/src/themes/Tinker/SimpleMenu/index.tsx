import '@/assets/css/themes/tinker/side-nav.css';
import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
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
import logoUrl from '@/assets/images/logo.svg';
import clsx from 'clsx';
import TopBar from '@/components/Themes/Tinker/TopBar';
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
          'tinker md:bg-black/[0.15] dark:bg-transparent relative py-5 px-5 md:py-0 sm:px-8 md:px-0',
          "after:content-[''] after:bg-gradient-to-b after:from-theme-1 after:to-theme-2 dark:after:from-darkmode-800 dark:after:to-darkmode-800 after:fixed after:inset-0 after:z-[-2]",
        ])}
      >
        <MobileMenu />
        <div className='flex mt-[4.7rem] md:mt-0 overflow-hidden'>
          {/* BEGIN: Simple Menu */}
          <nav className='side-nav side-nav--simple hidden md:block md:w-[100px] xl:w-[100px] px-5 pb-16 overflow-x-hidden z-10'>
            <Link to='/' className='flex items-center pt-4 pl-5 mt-3 intro-x'>
              <img alt='Tinker Tailwind HTML Admin Template' className='w-6' src={logoUrl} />
            </Link>
            <div className='my-6 side-nav__divider'></div>
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
                      className={clsx([menu.active ? 'side-menu side-menu--active' : 'side-menu'])}
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
          <div
            className={clsx([
              'rounded-[30px] md:rounded-[35px/50px_0px_0px_0px] min-w-0 min-h-screen max-w-full md:max-w-none bg-slate-100 flex-1 pb-10 px-4 md:px-6 relative md:ml-4 dark:bg-darkmode-700',
              "before:content-[''] before:w-full before:h-px before:block",
              "after:content-[''] after:z-[-1] after:rounded-[40px_0px_0px_0px] after:w-full after:inset-y-0 after:absolute after:left-0 after:bg-white/10 after:mt-8 after:-ml-4 after:dark:bg-darkmode-400/50 after:hidden md:after:block",
            ])}
          >
            <TopBar />
            <Outlet />
          </div>
          {/* END: Content */}
        </div>
      </div>
    </forceActiveMenuContext.Provider>
  );
}

export default Main;
