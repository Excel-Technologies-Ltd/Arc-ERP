import { RouterProvider } from 'react-router-dom';
import router from './router';
import { ConfigProvider, App as AntApp, theme } from 'antd';
import { NotificationProvider } from './components/Notification/NotificationProvider';
import { useAppSelector } from './stores/hooks';
import { selectDarkMode } from './stores/darkModeSlice';
import useAuthCheck from './hooks/auth/useAuthCheck';

const App = () => {
  const darkMode = useAppSelector(selectDarkMode);
  const { isChecked } = useAuthCheck();

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: darkMode ? '#28334E' : '#164E63',
            colorBgBase: darkMode ? '#28334E' : '#FFF',
            colorBgElevated: darkMode ? '#28334E' : '#FFF',
            colorBgLayout: darkMode ? '#28334E' : '#FFF',
            colorBgContainer: darkMode ? '#1B253B' : '#FFF',
          },
          algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
          components: {
            Table: {
              headerBg: '#164E63',
              headerColor: '#fff',
            },
          },
        }}
      >
        <AntApp>
          <NotificationProvider>
            {isChecked ? (
              <div>Loading....</div>
            ) : (
              <>
                <RouterProvider router={router} />
              </>
            )}
          </NotificationProvider>
        </AntApp>
      </ConfigProvider>
    </>
  );
};

export default App;
