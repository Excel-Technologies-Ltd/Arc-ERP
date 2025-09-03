import { toTitle } from '@/utils/helper';
import { Breadcrumb } from 'antd';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs: React.FC = () => {
  const { pathname } = useLocation();

  const items = React.useMemo(() => {
    const clean = pathname.replace(/\/+$/, ''); // strip trailing slash(es)
    if (clean === '' || clean === '/') {
      return [{ path: '/', label: 'Dashboard' }];
    }
    const segs = clean.split('/').filter(Boolean);

    return segs.map((seg, idx) => ({
      path: '/' + segs.slice(0, idx + 1).join('/'),
      label: toTitle(seg),
    }));
  }, [pathname]);

  return (
    <div className='relative h-full md:ml-10 md:border-l border-white/[0.08] dark:border-white/[0.08] mr-auto -intro-x md:pl-6'>
      <Breadcrumb
        separator={<span className='text-white/70 dark:text-slate-500'>{'>'}</span>}
        items={items.map((item) => ({
          title: (
            <Link to={item.path}>
              <span className='text-white/70 dark:text-slate-500'>{item.label}</span>
            </Link>
          ),
        }))}
      />
    </div>
  );
};

export default Breadcrumbs;
