import { useState, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Lucide from '@/components/Base/Lucide';
import logoUrl from '@/assets/images/logo.svg';
import Breadcrumb from '@/components/Base/Breadcrumb';
import { FormInput } from '@/components/Base/Form';
import { Menu, Popover } from '@/components/Base/Headless';
import fakerData from '@/utils/faker';
import _ from 'lodash';
import clsx from 'clsx';
import { Transition } from '@headlessui/react';
import { useFrappeAuth } from 'frappe-react-sdk';
import { showSuccessToast } from '@/components/Toast/Toast.utils';

function Main(props: { layout?: 'side-menu' | 'simple-menu' | 'top-menu' }) {
  const { logout } = useFrappeAuth();
  const navigate = useNavigate();

  const [searchDropdown, setSearchDropdown] = useState(false);
  const showSearchDropdown = () => {
    setSearchDropdown(true);
  };
  const hideSearchDropdown = () => {
    setSearchDropdown(false);
  };

  // handle logout
  const handleLogout = async () => {
    await logout().then(() => {
      showSuccessToast('Log Out Successfully');
      navigate('/login');
    });
  };

  return (
    <>
      <div
        className={clsx([
          'h-[70px] md:h-[65px] z-[51] border-b border-white/[0.08] mt-12 md:mt-0 -mx-3 sm:-mx-8 md:-mx-0 px-3 md:border-b-0 relative md:fixed md:inset-x-0 md:top-0 sm:px-8 md:px-10 md:pt-10 md:bg-gradient-to-b md:from-slate-100 md:to-transparent dark:md:from-darkmode-700',
          props.layout == 'top-menu' && 'dark:md:from-darkmode-800',
          "before:content-[''] before:absolute before:h-[65px] before:inset-0 before:top-0 before:mx-7 before:bg-primary/30 before:mt-3 before:rounded-xl before:hidden before:md:block before:dark:bg-darkmode-600/30",
          "after:content-[''] after:absolute after:inset-0 after:h-[65px] after:mx-3 after:bg-primary after:mt-5 after:rounded-xl after:shadow-md after:hidden after:md:block after:dark:bg-darkmode-600",
        ])}
      >
        <div className='flex items-center h-full'>
          {/* BEGIN: Logo */}
          <Link
            to='/'
            className={clsx([
              '-intro-x hidden md:flex',
              props.layout == 'side-menu' && 'xl:w-[180px]',
              props.layout == 'simple-menu' && 'xl:w-auto',
              props.layout == 'top-menu' && 'w-auto',
            ])}
          >
            <img alt='Enigma Tailwind HTML Admin Template' className='w-6' src={logoUrl} />
            <span
              className={clsx([
                'ml-3 text-lg text-white',
                props.layout == 'side-menu' && 'hidden xl:block',
                props.layout == 'simple-menu' && 'hidden',
              ])}
            >
              {' '}
              Enigma{' '}
            </span>
          </Link>
          {/* END: Logo */}
          {/* BEGIN: Breadcrumb */}
          <Breadcrumb
            light
            className={clsx([
              'h-[45px] md:ml-10 md:border-l border-white/[0.08] dark:border-white/[0.08] mr-auto -intro-x',
              props.layout != 'top-menu' && 'md:pl-6',
              props.layout == 'top-menu' && 'md:pl-10',
            ])}
          >
            <Breadcrumb.Link to='/'>Application</Breadcrumb.Link>
            <Breadcrumb.Link to='/' active={true}>
              Dashboard
            </Breadcrumb.Link>
          </Breadcrumb>
          {/* END: Breadcrumb */}
          {/* BEGIN: Search */}
          <div className='relative mr-3 intro-x sm:mr-6'>
            <div className='relative hidden sm:block'>
              <FormInput
                type='text'
                className='border-transparent w-56 shadow-none rounded-full bg-slate-200 pr-8 transition-[width] duration-300 ease-in-out focus:border-transparent focus:w-72 dark:bg-darkmode-400'
                placeholder='Search...'
                onFocus={showSearchDropdown}
                onBlur={hideSearchDropdown}
              />
              <Lucide
                icon='Search'
                className='absolute inset-y-0 right-0 w-5 h-5 my-auto mr-3 text-slate-600 dark:text-slate-500'
              />
            </div>
            <a className='relative text-white/70 sm:hidden' href=''>
              <Lucide icon='Search' className='w-5 h-5 dark:text-slate-500' />
            </a>
            <Transition
              as={Fragment}
              show={searchDropdown}
              enter='transition-all ease-linear duration-150'
              enterFrom='mt-5 invisible opacity-0 translate-y-1'
              enterTo='mt-[3px] visible opacity-100 translate-y-0'
              leave='transition-all ease-linear duration-150'
              leaveFrom='mt-[3px] visible opacity-100 translate-y-0'
              leaveTo='mt-5 invisible opacity-0 translate-y-1'
            >
              <div className='absolute right-0 z-10 mt-[3px]'>
                <div className='w-[450px] p-5 box'>
                  <div className='mb-2 font-medium'>Pages</div>
                  <div className='mb-5'>
                    <a href='' className='flex items-center'>
                      <div className='flex items-center justify-center w-8 h-8 rounded-full bg-success/20 dark:bg-success/10 text-success'>
                        <Lucide icon='Inbox' className='w-4 h-4' />
                      </div>
                      <div className='ml-3'>Mail Settings</div>
                    </a>
                    <a href='' className='flex items-center mt-2'>
                      <div className='flex items-center justify-center w-8 h-8 rounded-full bg-pending/10 text-pending'>
                        <Lucide icon='Users' className='w-4 h-4' />
                      </div>
                      <div className='ml-3'>Users & Permissions</div>
                    </a>
                    <a href='' className='flex items-center mt-2'>
                      <div className='flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 dark:bg-primary/20 text-primary/80'>
                        <Lucide icon='CreditCard' className='w-4 h-4' />
                      </div>
                      <div className='ml-3'>Transactions Report</div>
                    </a>
                  </div>
                  <div className='mb-2 font-medium'>Users</div>
                  <div className='mb-5'>
                    {_.take(fakerData, 4).map((faker, fakerKey) => (
                      <a key={fakerKey} href='' className='flex items-center mt-2'>
                        <div className='w-8 h-8 image-fit'>
                          <img
                            alt='Midone Tailwind HTML Admin Template'
                            className='rounded-full'
                            src={faker.photos[0]}
                          />
                        </div>
                        <div className='ml-3'>{faker.users[0].name}</div>
                        <div className='w-48 ml-auto text-xs text-right truncate text-slate-500'>
                          {faker.users[0].email}
                        </div>
                      </a>
                    ))}
                  </div>
                  <div className='mb-2 font-medium'>Products</div>
                  {_.take(fakerData, 4).map((faker, fakerKey) => (
                    <a key={fakerKey} href='' className='flex items-center mt-2'>
                      <div className='w-8 h-8 image-fit'>
                        <img
                          alt='Midone Tailwind HTML Admin Template'
                          className='rounded-full'
                          src={faker.images[0]}
                        />
                      </div>
                      <div className='ml-3'>{faker.products[0].name}</div>
                      <div className='w-48 ml-auto text-xs text-right truncate text-slate-500'>
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
          <Popover className='mr-4 intro-x sm:mr-6'>
            <Popover.Button
              className="
              relative text-white/70 outline-none block
              before:content-[''] before:w-[8px] before:h-[8px] before:rounded-full before:absolute before:top-[-2px] before:right-0 before:bg-danger
            "
            >
              <Lucide icon='Bell' className='w-5 h-5 dark:text-slate-500' />
            </Popover.Button>
            <Popover.Panel className='w-[280px] sm:w-[350px] p-5 mt-2'>
              <div className='mb-5 font-medium'>Notifications</div>
              {_.take(fakerData, 5).map((faker, fakerKey) => (
                <div
                  key={fakerKey}
                  className={clsx([
                    'cursor-pointer relative flex items-center',
                    { 'mt-5': fakerKey },
                  ])}
                >
                  <div className='relative flex-none w-12 h-12 mr-1 image-fit'>
                    <img
                      alt='Midone Tailwind HTML Admin Template'
                      className='rounded-full'
                      src={faker.photos[0]}
                    />
                    <div className='absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full bg-success dark:border-darkmode-600'></div>
                  </div>
                  <div className='ml-2 overflow-hidden'>
                    <div className='flex items-center'>
                      <a href='' className='mr-5 font-medium truncate'>
                        {faker.users[0].name}
                      </a>
                      <div className='ml-auto text-xs text-slate-400 whitespace-nowrap'>
                        {faker.times[0]}
                      </div>
                    </div>
                    <div className='w-full truncate text-slate-500 mt-0.5'>
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
            <Menu.Button className='block w-8 h-8 overflow-hidden rounded-full shadow-lg image-fit zoom-in intro-x'>
              <img alt='Midone Tailwind HTML Admin Template' src={fakerData[9].photos[0]} />
            </Menu.Button>
            <Menu.Items className='w-56 mt-px relative bg-primary/80 before:block before:absolute before:bg-black before:inset-0 before:rounded-md before:z-[-1] text-white'>
              <Menu.Header className='font-normal'>
                <div className='font-medium'>{fakerData[0].users[0].name}</div>
                <div className='text-xs text-white/70 mt-0.5 dark:text-slate-500'>
                  {fakerData[0].jobs[0]}
                </div>
              </Menu.Header>
              <Menu.Divider className='bg-white/[0.08]' />
              <Menu.Item className='hover:bg-white/5'>
                <Lucide icon='User' className='w-4 h-4 mr-2' /> Profile
              </Menu.Item>
              <Menu.Item className='hover:bg-white/5'>
                <Lucide icon='FilePenLine' className='w-4 h-4 mr-2' /> Add Account
              </Menu.Item>
              <Menu.Item className='hover:bg-white/5'>
                <Lucide icon='Lock' className='w-4 h-4 mr-2' /> Reset Password
              </Menu.Item>
              <Menu.Item className='hover:bg-white/5'>
                <Lucide icon='HelpCircle' className='w-4 h-4 mr-2' /> Help
              </Menu.Item>
              <Menu.Divider className='bg-white/[0.08]' />
              <Menu.Item className='hover:bg-white/5' onClick={handleLogout}>
                <Lucide icon='ToggleRight' className='w-4 h-4 mr-2' /> Logout
              </Menu.Item>
            </Menu.Items>
          </Menu>
          {/* END: Account Menu */}
        </div>
      </div>
    </>
  );
}

export default Main;
