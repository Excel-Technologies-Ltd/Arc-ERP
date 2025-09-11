import { useState } from 'react';
import useDebounce from './useDebounce';
import { SWRResponse } from 'frappe-react-sdk';

interface UseDebouncedSearchProps<T> {
  fetchFunction: (search: string | null) => SWRResponse<T[]>;
  debounceDelay?: number;
}

interface UseDebouncedSearchResult<T> {
  searchInput: string | null;
  setSearchInput: (value: string | null) => void;
  data: SWRResponse<T[]>;
}

const useDebouncedSearch = <T>({
  fetchFunction,
  debounceDelay = 0,
}: UseDebouncedSearchProps<T>): UseDebouncedSearchResult<T> => {
  const [searchInput, setSearchInput] = useState<string | null>(null);
  const debouncedSearch = useDebounce(searchInput, debounceDelay);
  const fetchData = fetchFunction(debouncedSearch);

  return {
    searchInput,
    setSearchInput,
    data: fetchData,
  };
};

export default useDebouncedSearch;
