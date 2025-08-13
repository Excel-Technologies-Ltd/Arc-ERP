import "@/assets/css/themes/tinker/top-nav.css";
import { useState, useEffect, Fragment } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { selectMenu } from "@/stores/menuSlice";
import { useAppSelector } from "@/stores/hooks";
import fakerData from "@/utils/faker";
import _ from "lodash";
import {
  FormattedMenu,
  linkTo,
  nestedMenu,
  forceActiveMenuContext,
  forceActiveMenu,
} from "./top-menu";
import Lucide from "@/components/Base/Lucide";
import Breadcrumb from "@/components/Base/Breadcrumb";
import { FormInput } from "@/components/Base/Form";
import { Menu, Popover } from "@/components/Base/Headless";
import { Transition } from "@headlessui/react";
import logoUrl from "@/assets/images/logo.svg";
import clsx from "clsx";
import MobileMenu from "@/components/MobileMenu";

function Main() {
  const navigate = useNavigate();
  const [searchDropdown, setSearchDropdown] = useState(false);
  const showSearchDropdown = () => {
    setSearchDropdown(true);
  };
  const hideSearchDropdown = () => {
    setSearchDropdown(false);
  };
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
          "tinker md:bg-black/[0.15] dark:bg-transparent relative py-5 px-5 md:py-0 sm:px-8 md:px-0",
          "after:content-[''] after:bg-gradient-to-b after:from-theme-1 after:to-theme-2 dark:after:from-darkmode-800 dark:after:to-darkmode-800 after:fixed after:inset-0 after:z-[-2]",
        ])}
      >
        <MobileMenu />
        {/* BEGIN: Top Bar */}
        <div className="h-[70px] z-[51] relative border-b border-white/[0.08] mt-12 md:mt-0 -mx-3 sm:-mx-8 md:mx-0 px-4 sm:px-8 md:px-6 mb-10 md:mb-8">
          <div className="flex items-center h-full">
            {/* BEGIN: Logo */}
            <Link to="/" className="hidden -intro-x md:flex">
              <img
                alt="Midone Tailwind HTML Admin Template"
                className="w-6"
                src={logoUrl}
              />
              <span className="ml-3 text-lg text-white"> Tinker </span>
            </Link>
            {/* END: Logo */}
            {/* BEGIN: Breadcrumb */}
            <Breadcrumb
              light
              className="h-full md:ml-10 md:pl-10 md:border-l border-white/[0.08] mr-auto -intro-x"
            >
              <Breadcrumb.Link to="/">Application</Breadcrumb.Link>
              <Breadcrumb.Link to="/" active={true}>
                Dashboard
              </Breadcrumb.Link>
            </Breadcrumb>
            {/* END: Breadcrumb */}
            {/* BEGIN: Search */}
            <div className="relative mr-3 intro-x sm:mr-6">
              <div className="hidden sm:block">
                <FormInput
                  type="text"
                  className="border-transparent w-56 shadow-none rounded-full bg-slate-200 pr-8 transition-[width] duration-300 ease-in-out focus:border-transparent focus:w-72 dark:bg-darkmode-400/70"
                  placeholder="Search..."
                  onFocus={showSearchDropdown}
                  onBlur={hideSearchDropdown}
                />
                <Lucide
                  icon="Search"
                  className="absolute inset-y-0 right-0 w-5 h-5 my-auto mr-3 text-slate-600 dark:text-slate-500"
                />
              </div>
              <a className="relative text-white/70 sm:hidden" href="">
                <Lucide icon="Search" className="w-5 h-5 dark:text-slate-500" />
              </a>
              <Transition
                as={Fragment}
                show={searchDropdown}
                enter="transition-all ease-linear duration-150"
                enterFrom="mt-5 invisible opacity-0 translate-y-1"
                enterTo="mt-[3px] visible opacity-100 translate-y-0"
                leave="transition-all ease-linear duration-150"
                leaveFrom="mt-[3px] visible opacity-100 translate-y-0"
                leaveTo="mt-5 invisible opacity-0 translate-y-1"
              >
                <div className="absolute right-0 z-10 mt-[3px]">
                  <div className="w-[450px] p-5 box">
                    <div className="mb-2 font-medium">Pages</div>
                    <div className="mb-5">
                      <a href="" className="flex items-center">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-success/20 dark:bg-success/10 text-success">
                          <Lucide icon="Inbox" className="w-4 h-4" />
                        </div>
                        <div className="ml-3">Mail Settings</div>
                      </a>
                      <a href="" className="flex items-center mt-2">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-pending/10 text-pending">
                          <Lucide icon="Users" className="w-4 h-4" />
                        </div>
                        <div className="ml-3">Users & Permissions</div>
                      </a>
                      <a href="" className="flex items-center mt-2">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 dark:bg-primary/20 text-primary/80">
                          <Lucide icon="CreditCard" className="w-4 h-4" />
                        </div>
                        <div className="ml-3">Transactions Report</div>
                      </a>
                    </div>
                    <div className="mb-2 font-medium">Users</div>
                    <div className="mb-5">
                      {_.take(fakerData, 4).map((faker, fakerKey) => (
                        <a
                          key={fakerKey}
                          href=""
                          className="flex items-center mt-2"
                        >
                          <div className="w-8 h-8 image-fit">
                            <img
                              alt="Midone Tailwind HTML Admin Template"
                              className="rounded-full"
                              src={faker.photos[0]}
                            />
                          </div>
                          <div className="ml-3">{faker.users[0].name}</div>
                          <div className="w-48 ml-auto text-xs text-right truncate text-slate-500">
                            {faker.users[0].email}
                          </div>
                        </a>
                      ))}
                    </div>
                    <div className="mb-2 font-medium">Products</div>
                    {_.take(fakerData, 4).map((faker, fakerKey) => (
                      <a
                        key={fakerKey}
                        href=""
                        className="flex items-center mt-2"
                      >
                        <div className="w-8 h-8 image-fit">
                          <img
                            alt="Midone Tailwind HTML Admin Template"
                            className="rounded-full"
                            src={faker.images[0]}
                          />
                        </div>
                        <div className="ml-3">{faker.products[0].name}</div>
                        <div className="w-48 ml-auto text-xs text-right truncate text-slate-500">
                          {faker.products[0].category}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </Transition>
            </div>
            {/* END: Search */}
            {/* BEGIN: Notifications */}
            <Popover className="mr-4 intro-x sm:mr-6">
              <Popover.Button
                className="
              relative text-white/70 outline-none block
              before:content-[''] before:w-[8px] before:h-[8px] before:rounded-full before:absolute before:top-[-2px] before:right-0 before:bg-danger
            "
              >
                <Lucide icon="Bell" className="w-5 h-5 dark:text-slate-500" />
              </Popover.Button>
              <Popover.Panel className="w-[280px] sm:w-[350px] p-5 mt-2">
                <div className="mb-5 font-medium">Notifications</div>
                {_.take(fakerData, 5).map((faker, fakerKey) => (
                  <div
                    key={fakerKey}
                    className={clsx([
                      "cursor-pointer relative flex items-center",
                      { "mt-5": fakerKey },
                    ])}
                  >
                    <div className="relative flex-none w-12 h-12 mr-1 image-fit">
                      <img
                        alt="Midone Tailwind HTML Admin Template"
                        className="rounded-full"
                        src={faker.photos[0]}
                      />
                      <div className="absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full bg-success dark:border-darkmode-600"></div>
                    </div>
                    <div className="ml-2 overflow-hidden">
                      <div className="flex items-center">
                        <a href="" className="mr-5 font-medium truncate">
                          {faker.users[0].name}
                        </a>
                        <div className="ml-auto text-xs text-slate-400 whitespace-nowrap">
                          {faker.times[0]}
                        </div>
                      </div>
                      <div className="w-full truncate text-slate-500 mt-0.5">
                        {faker.news[0].shortContent}
                      </div>
                    </div>
                  </div>
                ))}
              </Popover.Panel>
            </Popover>
            {/* END: Notifications */}
            {/* BEGIN: Account Menu */}
            <Menu>
              <Menu.Button className="block w-8 h-8 overflow-hidden scale-110 rounded-full shadow-lg image-fit zoom-in intro-x">
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  src={fakerData[9].photos[0]}
                />
              </Menu.Button>
              <Menu.Items className="w-56 mt-px relative bg-primary/70 before:block before:absolute before:bg-black before:inset-0 before:rounded-md before:z-[-1] text-white">
                <Menu.Header className="font-normal">
                  <div className="font-medium">
                    {fakerData[0].users[0].name}
                  </div>
                  <div className="text-xs text-white/70 mt-0.5 dark:text-slate-500">
                    {fakerData[0].jobs[0]}
                  </div>
                </Menu.Header>
                <Menu.Divider className="bg-white/[0.08]" />
                <Menu.Item className="hover:bg-white/5">
                  <Lucide icon="User" className="w-4 h-4 mr-2" /> Profile
                </Menu.Item>
                <Menu.Item className="hover:bg-white/5">
                  <Lucide icon="FilePenLine" className="w-4 h-4 mr-2" /> Add
                  Account
                </Menu.Item>
                <Menu.Item className="hover:bg-white/5">
                  <Lucide icon="Lock" className="w-4 h-4 mr-2" /> Reset Password
                </Menu.Item>
                <Menu.Item className="hover:bg-white/5">
                  <Lucide icon="HelpCircle" className="w-4 h-4 mr-2" /> Help
                </Menu.Item>
                <Menu.Divider className="bg-white/[0.08]" />
                <Menu.Item className="hover:bg-white/5">
                  <Lucide icon="ToggleRight" className="w-4 h-4 mr-2" /> Logout
                </Menu.Item>
              </Menu.Items>
            </Menu>
            {/* END: Account Menu */}
          </div>
        </div>
        {/* END: Top Bar */}
        {/* BEGIN: Top Menu */}
        <nav className="top-nav relative z-50 -mt-[3px] hidden translate-y-[50px] opacity-0 md:block">
          <ul className="flex flex-wrap h-[58px] px-6 xl:px-[50px]">
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
            "rounded-[30px] md:rounded-[35px_35px_0px_0px] min-w-0 min-h-screen max-w-full md:max-w-none bg-slate-100 flex-1 pb-10 px-4 md:px-6 relative mt-8 dark:bg-darkmode-700",
            "before:content-[''] before:w-full before:h-px before:block",
            "after:content-[''] after:z-[-1] after:rounded-[40px_40px_0px_0px] after:w-[97%] after:inset-y-0 after:absolute after:left-0 after:right-0 after:bg-white/10 after:-mt-4 after:mx-auto after:dark:bg-darkmode-400/50",
          ])}
        >
          <Outlet />
        </div>
        {/* END: Content */}
      </div>
    </forceActiveMenuContext.Provider>
  );
}

export default Main;
