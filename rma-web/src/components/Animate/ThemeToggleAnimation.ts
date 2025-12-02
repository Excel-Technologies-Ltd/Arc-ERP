export type AnimationVariant = 'circle' | 'circle-blur';
export type AnimationStart = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';

interface Animation {
  name: string;
  css: string;
}

// Map start position to CSS transform origin / clip-path anchor
const getTransformOrigin = (start: AnimationStart) => {
  switch (start) {
    case 'top-left':
      return '0% 0%';
    case 'top-right':
      return '100% 0%';
    case 'bottom-left':
      return '0% 100%';
    case 'bottom-right':
      return '100% 100%';
    case 'center':
    default:
      return '50% 50%';
  }
};

export const createAnimation = (variant: AnimationVariant, start: AnimationStart): Animation => {
  const transformOrigin = getTransformOrigin(start);

  // Fancy smooth animation:
  // - For "circle": radial clip-path that grows from the toggle origin
  // - For "circle-blur": same shape but with subtle scale/blur for a softer feel
  if (variant === 'circle' || variant === 'circle-blur') {
    const blurFilter =
      variant === 'circle-blur'
        ? `
      filter: blur(0.5px);
      transform: scale(1.02);
    `
        : '';

    return {
      name: `${variant}-${start}`,
      css: `
        ::view-transition-group(root) {
          animation-duration: 1500ms;
          animation-timing-function: var(--expo-out, cubic-bezier(0.16, 1, 0.3, 1));
        }

        ::view-transition-new(root) {
          animation-name: theme-reveal-${start};
        }

        ::view-transition-old(root),
        .dark::view-transition-old(root) {
          animation-name: theme-fade-${start};
        }

        .dark::view-transition-new(root) {
          animation-name: theme-reveal-${start};
        }

        @keyframes theme-reveal-${start} {
          from {
            opacity: 0;
            clip-path: circle(0% at ${transformOrigin});
            ${blurFilter}
          }
          40% {
            opacity: 1;
          }
          to {
            opacity: 1;
            clip-path: circle(145% at ${transformOrigin});
            filter: blur(0);
            transform: scale(1);
          }
        }

        @keyframes theme-fade-${start} {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
            transform: scale(0.98);
            filter: blur(1px);
          }
        }
      `,
    };
  }

  // Fallback – simple cross-fade if variant is unknown
  return {
    name: `${variant}-${start}`,
    css: `
      ::view-transition-group(root) {
        animation-duration: 1500ms;
        animation-timing-function: var(--expo-out, ease-out);
      }
      ::view-transition-new(root) {
        animation-name: theme-fade-in;
      }
      ::view-transition-old(root),
      .dark::view-transition-old(root) {
        animation-name: theme-fade-out;
      }
      @keyframes theme-fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes theme-fade-out {
        from { opacity: 1; }
        to { opacity: 0; }
      }
    `,
  };
};
