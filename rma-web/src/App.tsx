import { RouterProvider } from 'react-router-dom';
import router from './router';
import ScrollToTop from './components/Base/ScrollToTop';
import { ConfigProvider, App as AntApp, theme } from 'antd';
import { NotificationProvider } from './components/Notification/NotificationProvider';
import { useAppSelector } from './stores/hooks';
import { selectDarkMode } from './stores/darkModeSlice';

const App = () => {
  const darkMode = useAppSelector(selectDarkMode);
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: darkMode ? '#28334E' : '#28334E',
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
            <RouterProvider router={router}>
              <ScrollToTop />
            </RouterProvider>
          </NotificationProvider>
        </AntApp>
      </ConfigProvider>
    </>
  );
};

export default App;
