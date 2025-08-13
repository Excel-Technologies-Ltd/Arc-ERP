import "@/assets/css/themes/icewall/top-nav.css";
import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { selectMenu } from "@/stores/menuSlice";
import { useAppSelector } from "@/stores/hooks";
import _ from "lodash";
import {
  FormattedMenu,
  linkTo,
  nestedMenu,
  forceActiveMenuContext,
  forceActiveMenu,
} from "./top-menu";
import Lucide from "@/components/Base/Lucide";
import clsx from "clsx";
import TopBar from "@/components/Themes/Icewall/TopBar";
import MobileMenu from "@/components/MobileMenu";

function Main() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formattedMenu, setFormattedMenu] = useState<
    Array<FormattedMenu | "divider">
  >([]);
  const menuStore = useAppSelector(selectMenu("top-menu"));
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
          "icewall px-5 sm:px-8 py-5 relative",
          "after:content-[''] after:bg-gradient-to-b after:from-theme-1 after:to-theme-2 dark:after:from-darkmode-800 dark:after:to-darkmode-800 after:fixed after:inset-0 after:z-[-2]",
        ])}
      >
        <MobileMenu />
        <TopBar />
        {/* BEGIN: Top Menu */}
        <nav className="top-nav relative z-50 -mt-2 hidden translate-y-[35px] opacity-0 md:block xl:-mt-[3px] xl:px-6 xl:pt-[12px]">
          <ul className="h-[50px] flex flex-wrap">
            {formattedMenu.map(
              (menu, menuKey) =>
                menu != "divider" && (
                  <li key={menuKey}>
                    <a
                      href={menu.subMenu ? "#" : menu.pathname}
                      className={clsx([
                        menu.active ? "top-menu top-menu--active" : "top-menu",
                      ])}
                      onClick={(event) => {
                        event.preventDefault();
                        linkTo(menu, navigate);
                      }}
                    >
                      <div className="top-menu__icon">
                        <Lucide icon={menu.icon} />
                      </div>
                      <div className="top-menu__title">
                        {menu.title}
                        {menu.subMenu && (
                          <Lucide
                            className="top-menu__sub-icon"
                            icon="ChevronDown"
                          />
                        )}
                      </div>
                    </a>
                    {menu.subMenu && (
                      <ul>
                        {menu.subMenu.map((subMenu, subMenuKey) => (
                          <li key={subMenuKey}>
                            <a
                              href={subMenu.subMenu ? "#" : subMenu.pathname}
                              className="top-menu"
                              onClick={(event) => {
                                event.preventDefault();
                                linkTo(subMenu, navigate);
                              }}
                            >
                              <div className="top-menu__icon">
                                <Lucide icon={subMenu.icon} />
                              </div>
                              <div className="top-menu__title">
                                {subMenu.title}
                                {subMenu.subMenu && (
                                  <Lucide
                                    v-if="subMenu.subMenu"
                                    className="top-menu__sub-icon"
                                    icon="ChevronDown"
                                  />
                                )}
                              </div>
                            </a>
                            {subMenu.subMenu && (
                              <ul
                                v-if="subMenu.subMenu"
                                className={clsx({
                                  "side-menu__sub-open": subMenu.activeDropdown,
                                })}
                              >
                                {subMenu.subMenu.map(
                                  (lastSubMenu, lastSubMenuKey) => (
                                    <li key={lastSubMenuKey}>
                                      <a
                                        href={
                                          lastSubMenu.subMenu
                                            ? "#"
                                            : lastSubMenu.pathname
                                        }
                                        className="top-menu"
                                        onClick={(event) => {
                                          event.preventDefault();
                                          linkTo(lastSubMenu, navigate);
                                        }}
                                      >
                                        <div className="top-menu__icon">
                                          <Lucide icon={lastSubMenu.icon} />
                                        </div>
                                        <div className="top-menu__title">
                                          {lastSubMenu.title}
                                        </div>
                                      </a>
                                    </li>
                                  )
                                )}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
            )}
          </ul>
        </nav>
        {/* END: Top Menu */}
        {/* BEGIN: Content */}
        <div
          className={clsx([
            "wrapper relative",
            "before:content-[''] before:z-[-1] before:translate-y-[35px] before:opacity-0 before:w-[95%] before:rounded-[1.3rem] before:bg-transparent xl:before:bg-white/10 before:h-full before:-mt-4 before:absolute before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/50",
          ])}
        >
          <div
            className={clsx([
              "wrapper-box bg-transparent xl:bg-theme-1 flex rounded-[1.3rem] md:pt-[80px] -mt-[7px] md:-mt-[67px] xl:-mt-[62px] dark:bg-transparent xl:dark:bg-darkmode-400 translate-y-[35px]",
              "before:hidden xl:before:block before:absolute before:inset-0 before:bg-black/[0.15] before:rounded-[1.3rem] before:z-[-1]",
            ])}
          >
            {/* BEGIN: Content */}
            <div className="px-4 md:px-[22px] max-w-full md:max-w-auto rounded-[1.3rem] flex-1 min-w-0 min-h-screen pb-10 shadow-sm bg-slate-100 dark:bg-darkmode-700 before:content-[''] before:w-full before:h-px before:block">
              <Outlet />
            </div>
            {/* END: Content */}
          </div>
        </div>
        {/* END: Content */}
      </div>
    </forceActiveMenuContext.Provider>
  );
}

export default Main;
