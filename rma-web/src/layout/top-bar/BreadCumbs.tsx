import React from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import Breadcrumb from '@/components/Base/Breadcrumb';

const toTitle = (s: string) =>
  decodeURIComponent(s)
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

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

  const last = items.length - 1;

  return (
    <Breadcrumb
      light
      className={clsx(
        'h-[45px] md:ml-10 md:border-l border-white/[0.08] dark:border-white/[0.08] mr-auto -intro-x',
        'md:pl-6'
      )}
    >
      {items.map((item, idx) => (
        <Breadcrumb.Link
          key={idx}
          to={idx === last ? undefined : item.path} // disable last link
          active={idx === last}
        >
          {item.label}
        </Breadcrumb.Link>
      ))}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
