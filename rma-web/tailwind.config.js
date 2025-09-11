const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');
const { parseColor } = require('tailwindcss/lib/util/color');

/** Converts HEX color to RGB */
const toRGB = (value) => {
  return parseColor(value).color.join(' ');
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.95)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        'fade-out': {
          '0%': {
            opacity: '1',
            transform: 'scale(1)',
          },
          '100%': {
            opacity: '0',
            transform: 'scale(0.95)',
          },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-in-out',
        'fade-out': 'fade-out 0.3s ease-in-out',
      },
      colors: {
        theme: {
          1: 'rgb(var(--color-theme-1) / <alpha-value>)',
          2: 'rgb(var(--color-theme-2) / <alpha-value>)',
        },
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        success: 'rgb(var(--color-success) / <alpha-value>)',
        info: 'rgb(var(--color-info) / <alpha-value>)',
        warning: 'rgb(var(--color-warning) / <alpha-value>)',
        pending: 'rgb(var(--color-pending) / <alpha-value>)',
        danger: 'rgb(var(--color-danger) / <alpha-value>)',
        light: 'rgb(var(--color-light) / <alpha-value>)',
        dark: 'rgb(var(--color-dark) / <alpha-value>)',
        darkmode: {
          50: 'rgb(var(--color-darkmode-50) / <alpha-value>)',
          100: 'rgb(var(--color-darkmode-100) / <alpha-value>)',
          200: 'rgb(var(--color-darkmode-200) / <alpha-value>)',
          300: 'rgb(var(--color-darkmode-300) / <alpha-value>)',
          400: 'rgb(var(--color-darkmode-400) / <alpha-value>)',
          500: 'rgb(var(--color-darkmode-500) / <alpha-value>)',
          600: 'rgb(var(--color-darkmode-600) / <alpha-value>)',
          700: 'rgb(var(--color-darkmode-700) / <alpha-value>)',
          800: 'rgb(var(--color-darkmode-800) / <alpha-value>)',
          900: 'rgb(var(--color-darkmode-900) / <alpha-value>)',
        },
      },
      fontFamily: {
        roboto: ['Roboto'],
      },
      container: {
        center: true,
      },
      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
      },
      strokeWidth: {
        0.5: 0.5,
        1.5: 1.5,
        2.5: 2.5,
      },
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
    plugin(function ({ addBase }) {
      addBase({
        // Default colors
        ':root': {
          '--color-theme-1': toRGB(colors.cyan['800']),
          '--color-theme-2': toRGB(colors.cyan['900']),
          '--color-primary': toRGB(colors.cyan['900']),
          '--color-secondary': toRGB(colors.slate['200']),
          '--color-success': toRGB(colors.teal['600']),
          '--color-info': toRGB(colors.cyan['500']),
          '--color-warning': toRGB(colors.amber['500']),
          '--color-pending': toRGB(colors.amber['600']),
          '--color-danger': toRGB(colors.red['700']),
          '--color-light': toRGB(colors.slate['100']),
          '--color-dark': toRGB(colors.slate['800']),
          '&.dark': {
            '--color-primary': toRGB(colors.cyan['800']),
          },
        },
        // Default dark-mode colors
        '.dark': {
          '--color-primary': toRGB(colors.blue['700']),
          '--color-darkmode-50': '87 103 132',
          '--color-darkmode-100': '74 90 121',
          '--color-darkmode-200': '65 81 114',
          '--color-darkmode-300': '53 69 103',
          '--color-darkmode-400': '48 61 93',
          '--color-darkmode-500': '41 53 82',
          '--color-darkmode-600': '40 51 78',
          '--color-darkmode-700': '35 45 69',
          '--color-darkmode-800': '27 37 59',
          '--color-darkmode-900': '15 23 42',
        },
      });
    }),
  ],
};
