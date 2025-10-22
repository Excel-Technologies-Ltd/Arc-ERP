import { useState } from 'react';

export const usePagination = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [limitStart, setLimitStart] = useState(0);

  const handlePageChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
    setLimitStart(pageSize * (page - 1));
  };

  return {
    page,
    pageSize,
    limitStart,
    handlePageChange,
  };
};
