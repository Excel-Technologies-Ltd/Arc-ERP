import { RouterProvider } from 'react-router-dom';
import router from './router';
import useAuthCheck from './hooks/auth/useAuthCheck';
import LottieLoader from './components/Loader/LottieLoder';
import AntDConfigProvider from './providers/AntDConfigProvider';

const App = () => {
  const { isChecked } = useAuthCheck();

  return (
    <>
      <AntDConfigProvider>
        {isChecked ? (
          <LottieLoader />
        ) : (
          <>
            <RouterProvider router={router} />
          </>
        )}
      </AntDConfigProvider>
    </>
  );
};

export default App;
