import { Link } from 'react-router-dom';
import logoUrl from '@/assets/images/logo.svg';
import clsx from 'clsx';
import { useFrappeAuth } from 'frappe-react-sdk';
import { resetPermissions } from '@/stores/permissionSlice';
import { useNotify } from '@/hooks/useNotify';
import { CiDark, CiLight, IoIosNotificationsOutline } from '@/components/Base/Icons';
import Breadcrumbs from './BreadCumbs';
import { selectDarkMode } from '@/stores/darkModeSlice';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { switchDarkMode } from './toggle.animate';
import { Avatar, Dropdown, MenuProps } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { CgProfile } from 'react-icons/cg';
import { LuLogOut } from 'react-icons/lu';
import { getCurrentUser } from '@/services/user/user';
import { useEffect } from 'react';

function Main() {
  const { logout, currentUser } = useFrappeAuth();
  const dispatch = useAppDispatch();
  const notify = useNotify();
  const activeDarkMode = useAppSelector(selectDarkMode);
  const { data: currentUserDetails, mutate } = getCurrentUser(currentUser || '');

  useEffect(() => {
    if (currentUser) {
      mutate();
    }
  }, [currentUser, mutate]);

  const setDarkModeClass = () => {
    const el = document.querySelectorAll('html')[0] as any;
    activeDarkMode ? el.classList.add('dark') : el.classList.remove('dark');
  };

  setDarkModeClass();

  const handleMenuClick = async ({ key }: { key: string }) => {
    if (key === 'logout') {
      await logout().then(() => {
        dispatch(resetPermissions());
        notify.success({
          title: 'Log Out Successfully',
        });
      });
    }
  };

  // Sample notification data
  const notifications = [
    {
      id: 1,
      title: 'New message received',
      description: 'John sent you a message',
      time: '5 minutes ago',
      unread: false,
    },
    {
      id: 2,
      title: 'System update',
      description: 'Your system has been updated successfully',
      time: '1 hour ago',
      unread: false,
    },
    {
      id: 3,
      title: 'Payment received',
      description: 'Payment of $500 has been credited',
      time: '2 hours ago',
      unread: false,
    },
  ];

  const items: MenuProps['items'] = [
    {
      key: 'header',
      label: (
        <div className='flex items-center justify-between px-2 py-2 border-b border-gray-200 dark:border-slate-700'>
          <h3 className='text-base font-semibold text-gray-900 dark:text-white'>Notifications</h3>
          <span className='px-2 py-1 text-xs font-medium text-white bg-blue-500 rounded-full'>
            {notifications.filter((n) => !n.unread).length}
          </span>
        </div>
      ),
      disabled: true,
      className: '!cursor-default hover:!bg-transparent',
    },

    ...notifications.map((notification) => ({
      key: notification.id,
      label: (
        <div
          className={`py-2 px-2 ${notification.unread ? 'bg-blue-50 dark:bg-slate-700/50' : ''}`}
        >
          <div className='flex items-start gap-3'>
            {notification.unread && (
              <div className='w-2 h-2 mt-2 bg-blue-500 rounded-full flex-shrink-0'></div>
            )}
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-medium text-gray-900 dark:text-white'>
                {notification.title}
              </p>
              <p className='text-sm text-gray-500 dark:text-slate-400 mt-1'>
                {notification.description}
              </p>
              <p className='text-xs text-gray-400 dark:text-slate-500 mt-2'>{notification.time}</p>
            </div>
          </div>
        </div>
      ),
    })),
    {
      type: 'divider',
      className: 'my-0',
    },
    {
      key: 'footer',
      label: (
        <div className='py-2 text-center'>
          <span className='text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300'>
            View all notifications
          </span>
        </div>
      ),
    },
  ];

  return (
    <>
      <div
        className={clsx([
          'h-[70px] md:h-[65px] z-[51] border-b border-white/[0.08] mt-12 md:mt-0 -mx-3 sm:-mx-8 md:-mx-0 px-3 md:border-b-0 relative md:fixed md:inset-x-0 md:top-0 sm:px-8 md:px-10 md:pt-10 md:bg-gradient-to-b md:from-slate-100 md:to-transparent dark:md:from-darkmode-700',
          "before:content-[''] before:absolute before:h-[65px] before:inset-0 before:top-0 before:mx-7 before:bg-primary/30 before:mt-3 before:rounded-xl before:hidden before:md:block before:dark:bg-darkmode-600/30",
          "after:content-[''] after:absolute after:inset-0 after:h-[65px] after:mx-3 after:bg-primary after:mt-5 after:rounded-xl after:shadow-md after:hidden after:md:block after:dark:bg-darkmode-600",
        ])}
      >
        <div className='flex items-center h-full'>
          {/* BEGIN: Logo */}
          <Link to='/' className={clsx(['-intro-x hidden md:flex xl:w-[180px]'])}>
            <img alt='Enigma Tailwind HTML Admin Template' className='w-6' src={logoUrl} />
            <span className={clsx(['ml-3 text-lg text-white hidden xl:block'])}>Arc ERP</span>
          </Link>
          {/* END: Logo */}
          {/* BEGIN: Breadcrumb */}
          <Breadcrumbs />
          {/* END: Breadcrumb */}

          {/* BEGIN: Dark Mode */}
          {!activeDarkMode ? (
            <button
              onClick={() => switchDarkMode(!activeDarkMode, dispatch, setDarkModeClass)}
              className='mr-4 intro-x sm:mr-6'
            >
              <CiLight className='w-5 h-5 dark:text-slate-500 text-white/70' />
            </button>
          ) : (
            <button
              onClick={() => switchDarkMode(!activeDarkMode, dispatch, setDarkModeClass)}
              className='mr-4 intro-x sm:mr-6'
            >
              <CiDark className='w-5 h-5 dark:text-slate-500 text-white/70' />
            </button>
          )}

          <button className='mr-4 intro-x sm:mr-6'>
            <Dropdown
              menu={{
                items,
              }}
              trigger={['click']}
            >
              <IoIosNotificationsOutline className='w-5 h-5 dark:text-slate-500 text-white/70' />
            </Dropdown>
          </button>

          <button className='relative block overflow-hidden intro-x'>
            <Dropdown
              onOpenChange={() => {}}
              menu={{
                items: [
                  {
                    label: (
                      <div className='flex items-center space-x-3'>
                        <Avatar style={{ backgroundColor: '#F07416' }} icon={<UserOutlined />} />
                        <div>
                          <div className='font-semibold'>
                            {`${currentUserDetails?.first_name || ''} ${currentUserDetails?.last_name || ''}`}
                          </div>
                          <div className='text-sm text-gray-500'>
                            {currentUserDetails?.email || 'admin@gmail.com'}
                          </div>
                        </div>
                      </div>
                    ),
                    key: 'user-info',
                  },
                  { type: 'divider' },
                  {
                    label: 'Profile',
                    key: 'profile',
                    icon: <CgProfile className='text-gray-400' size={20} />,
                    disabled: true,
                  },
                  { type: 'divider' },
                  {
                    label: 'Log out',
                    key: 'logout',
                    icon: <LuLogOut className='text-gray-400' size={20} />,
                  },
                ],
                onClick: handleMenuClick,
              }}
              trigger={['click']}
            >
              <Avatar shape='circle' icon={<UserOutlined />} />
            </Dropdown>
          </button>
        </div>
      </div>
    </>
  );
}

export default Main;
