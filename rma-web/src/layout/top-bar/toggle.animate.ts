import {
  AnimationStart,
  AnimationVariant,
  createAnimation,
} from '@/components/Animate/ThemeToggleAnimation';
import { setDarkMode } from '@/stores/darkModeSlice';
import { type Dispatch } from '@reduxjs/toolkit';

// Add this utility function to update styles
export const updateStyles = (css: string, name: string) => {
  // Remove any existing animation styles
  const existingStyle = document.getElementById('theme-transition-style') as any;
  if (existingStyle) {
    existingStyle.remove();
  }

  // Create new style element
  const style = document.createElement('style') as any;
  style.id = 'theme-transition-style';
  style.textContent = css;
  document.head.appendChild(style);

  // Add animation name class to body for scoping
  document.body.classList.add(`theme-transition-${name}`);
};

// Do the switch dark mode animation
export const switchDarkMode = (
  darkMode: boolean,
  dispatch: Dispatch,
  setDarkModeClass: () => void
) => {
  // Choose your preferred animation variant and start position
  const variant: AnimationVariant = 'circle-blur'; // or 'circle-blur', 'polygon', 'gif'
  const start: AnimationStart = 'top-right'; // or 'top-left', 'top-right', etc.

  // Create animation
  const animation = createAnimation(variant, start);

  // Update styles with the animation
  updateStyles(animation.css, animation.name);

  if (typeof window === 'undefined') {
    dispatch(setDarkMode(darkMode));
    setDarkModeClass();
    return;
  }

  const switchTheme = () => {
    dispatch(setDarkMode(darkMode));
    setDarkModeClass();

    // // Clean up animation class after transition
    // setTimeout(() => {
    //   document.body.classList.remove(`theme-transition-${animation.name}`);
    // }, 700); // Match this with your animation duration
  };

  // Use View Transition API if available, otherwise fallback
  const doc = document as Document & {
    startViewTransition?: (callback: () => void) => void;
  };

  if (!doc.startViewTransition) {
    switchTheme();
    return;
  }

  doc.startViewTransition(switchTheme);
};
