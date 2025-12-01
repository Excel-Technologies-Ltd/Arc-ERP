import { RouterProvider } from 'react-router-dom';
import router from './router';
import useAuthCheck from './hooks/auth/useAuthCheck';
import LottieLoader from './components/Loader/LottieLoder';
import AntdConfigProvider from './providers/AntdConfigProvider';

const App = () => {
  const { isChecked } = useAuthCheck();

  return (
    <>
      <AntdConfigProvider>
        {isChecked ? (
          <LottieLoader />
        ) : (
          <>
            <RouterProvider router={router} />
          </>
        )}
      </AntdConfigProvider>
    </>
  );
};

export default App;
