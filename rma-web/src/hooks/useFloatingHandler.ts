import { useState } from 'react';

export const useFloatingHandler = ({
  onFocus,
  onBlur,
  value,
}: {
  onFocus: (e: React.FocusEvent<HTMLSelectElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLSelectElement>) => void;
  value: string;
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: React.FocusEvent<HTMLSelectElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const isFloating = isFocused || !!value;
  return {
    isFocused,
    handleFocus,
    handleBlur,
    isFloating,
  };
};
