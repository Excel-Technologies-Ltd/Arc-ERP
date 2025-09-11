export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100, 500];

// Function to parse and validate URL parameters
export const parsePaginationParams = (
  searchParams: URLSearchParams
): {
  page: number;
  pageSize: number;
  search: string;
  limit_start: number;
} => {
  const page = Math.max(1, parseInt(searchParams.get('page') || '1') || 1);
  const pageSize = Math.max(1, parseInt(searchParams.get('pageSize') || '10') || 10);
  const search = searchParams.get('search') || '';
  const limit_start = Math.max(0, parseInt(searchParams.get('limit_start') || '0') || 0);

  return {
    page,
    pageSize,
    search,
    limit_start,
  };
};
