import { NotificationProvider } from '@/components/Notification/NotificationProvider';
import { selectDarkMode } from '@/stores/darkModeSlice';
import { useAppSelector } from '@/stores/hooks';
import { App as AntApp, ConfigProvider, theme } from 'antd';
import React from 'react';
import { lightThemeTokens, darkThemeTokens, componentTokens } from '@/constants/antd-theme';

const AntdConfigProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const darkMode = useAppSelector(selectDarkMode);
  const componentToken = componentTokens(darkMode);
  const themeTokens = darkMode ? darkThemeTokens : lightThemeTokens;

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            ...themeTokens,
          },
          algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
          components: {
            ...componentToken,
          },
        }}
      >
        <AntApp>
          <NotificationProvider>{children}</NotificationProvider>
        </AntApp>
      </ConfigProvider>
    </>
  );
};

export default AntdConfigProvider;
