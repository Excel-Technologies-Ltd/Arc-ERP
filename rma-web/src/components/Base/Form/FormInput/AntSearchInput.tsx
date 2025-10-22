import React, { useState, useCallback } from 'react';
import { Input } from 'antd';
import type { SearchProps as AntSearchProps } from 'antd/es/input';

// Interface for the Search component props
interface SearchComponentProps extends Omit<AntSearchProps, 'onSearch'> {
  label?: string;
  errors?: boolean;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  debounceDelay?: number;
}

const AntSearchInput: React.FC<SearchComponentProps> = ({
  errors,
  size = 'large',
  allowClear = true,
  placeholder = 'Search...',
  onSearch,
  onClear,
  debounceDelay = 0,
  loading = false,
  ...rest
}) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

  // Handle search with debounce
  const handleSearch = useCallback(
    (value: string) => {
      if (debounceDelay > 0) {
        // Clear existing timeout
        if (debounceTimeout) {
          clearTimeout(debounceTimeout);
        }

        // Set new timeout
        const timeout = setTimeout(() => {
          onSearch?.(value);
        }, debounceDelay);

        setDebounceTimeout(timeout);
      } else {
        // Execute immediately if no debounce
        onSearch?.(value);
      }
    },
    [debounceDelay, debounceTimeout, onSearch]
  );

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    // Trigger search on change if debounce is enabled
    if (debounceDelay > 0) {
      handleSearch(value);
    }
  };

  // Handle clear button
  const handleClear = () => {
    setSearchValue('');
    onClear?.();
    onSearch?.('');
  };

  // Handle enter key or search button click
  const handleSearchClick = (value: string) => {
    handleSearch(value);
  };

  return (
    <Input.Search
      {...rest}
      value={searchValue}
      onChange={handleChange}
      onSearch={handleSearchClick}
      status={errors ? 'error' : undefined}
      size={size}
      allowClear={allowClear}
      placeholder={placeholder}
      loading={loading}
      onClear={handleClear}
    />
  );
};

export default AntSearchInput;
