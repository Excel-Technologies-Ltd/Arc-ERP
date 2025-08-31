import LottieLoader from '@/components/Loader/LottieLoder';
import { Suspense } from 'react';

const Loadable = (Component: any) => (props: any) => (
  <Suspense fallback={<LottieLoader pageLoader={true} />}>
    <Component {...props} />
  </Suspense>
);

export default Loadable;
