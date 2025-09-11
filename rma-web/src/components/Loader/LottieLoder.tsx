import { lazy } from 'react';

const Lottie = lazy(() => import('lottie-react'));
import loaderJson from '@/assets/json/loading-lottie.json';

interface LoaderFullProps {
  pageLoader?: boolean;
  width?: number;
}

const LottieLoader = ({ pageLoader = false, width }: LoaderFullProps) => {
  return (
    <>
      <div
        className={`z-[99999] inset-0 flex justify-center items-center bg-opacity-70 ${
          pageLoader ? 'bg-transparent' : 'fixed w-full min-h-screen bg-white dark:bg-darkmode-800'
        }`}
      >
        <Lottie
          animationData={loaderJson}
          loop={true}
          style={{
            width: width ? width : '300px',
            opacity: 0.9,
          }}
        />
      </div>
    </>
  );
};

export default LottieLoader;
