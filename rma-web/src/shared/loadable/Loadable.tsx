import { Suspense } from 'react';

const Loadable = (Component: any) => (props: any) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component {...props} />
  </Suspense>
);

export default Loadable;
