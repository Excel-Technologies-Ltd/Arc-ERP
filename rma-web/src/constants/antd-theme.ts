/**
 * Ant Design Theme Tokens
 * Mapped from Tailwind CSS color configuration
 */

// Light mode colors
export const lightThemeTokens = {
  // Primary colors
  colorPrimary: '#164E63',
  colorTheme1: '#164E63',
  colorTheme2: '#164E63',

  // Semantic colors
  colorSuccess: '#0d9488', // teal-600
  colorInfo: '#3b82f6', // blue-500
  colorWarning: '#f59e0b', // amber-500
  colorError: '#ef4444', // danger
  colorPending: '#d97706', // amber-600

  // Secondary colors
  colorSecondary: '#374151', // gray-700
  colorLight: '#f1f5f9', // slate-100
  colorDark: '#1e293b', // slate-800

  // Background colors
  colorBgBase: '#ffffff',
  colorBgContainer: '#ffffff',
  colorBgElevated: '#ffffff',
  colorBgLayout: '#ffffff',
  colorBgSpotlight: '#ffffff',

  // Text colors
  colorText: '#18181b', // color-normal
  colorTextSecondary: '#374151', // gray-700
  colorTextTertiary: '#6b7280', // gray-500
  colorTextQuaternary: '#9ca3af', // gray-400

  // Border colors
  colorBorder: '#e5e7eb', // gray-200
  colorBorderSecondary: '#d1d5db', // gray-300

  // Font family
  fontFamily: "'Ubuntu', sans-serif",
};

// Dark mode colors
export const darkThemeTokens = {
  // Primary colors
  colorPrimary: '#28334E', // darkmode-600
  colorTheme1: '#28334E',
  colorTheme2: '#28334E',

  // Semantic colors
  colorSuccess: '#0d9488', // teal-600
  colorInfo: '#3b82f6', // blue-500
  colorWarning: '#f59e0b', // amber-500
  colorError: '#ef4444', // danger
  colorPending: '#d97706', // amber-600

  // Secondary colors
  colorSecondary: '#9ca3af', // gray-400
  colorLight: '#f1f5f9', // slate-100
  colorDark: '#1e293b', // slate-800

  // Background colors (using darkmode scale)
  colorBgBase: '#28334e', // darkmode-600
  colorBgContainer: '#1b253b', // darkmode-800
  colorBgElevated: '#232d45', // darkmode-700
  colorBgLayout: '#28334e', // darkmode-600
  colorBgSpotlight: '#293552', // darkmode-500

  // Text colors
  colorText: '#ffffff',
  colorTextSecondary: '#e5e7eb', // gray-200
  colorTextTertiary: '#d1d5db', // gray-300
  colorTextQuaternary: '#9ca3af', // gray-400

  // Border colors
  colorBorder: '#415172', // darkmode-200
  colorBorderSecondary: '#354567', // darkmode-300

  // Font family
  fontFamily: "'Ubuntu', sans-serif",
};

// Dark mode color scale (for reference and custom components)
export const darkModeColors = {
  50: '#576784',
  100: '#4a5a79',
  200: '#415172',
  300: '#354567',
  400: '#303d5d',
  500: '#293552',
  600: '#28334e',
  700: '#232d45',
  800: '#1b253b',
  900: '#0f172a',
};

// Component-specific tokens
export const componentTokens = (darkMode: boolean) => ({
  // Table
  Table: {
    headerBg: darkMode ? '#28334E' : '#164E63',
    headerColor: '#ffffff',
  },
  Button: {
    defaultShadow: 'shadow-none',
    primaryShadow: 'shadow-none',
  },
  Pagination: {
    colorPrimary: darkMode ? '#9ca3af' : '#164E63', // gray-400
  },
});

// Color constants for direct use in components
export const buttonColors = {
  clear: '#0E9B6E', // teal-600
};
