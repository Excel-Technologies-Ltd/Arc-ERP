import React from 'react';
import { Pagination, type PaginationProps } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE_OPTIONS, parsePaginationParams } from './pagination.utils';

interface AntPaginationProps extends PaginationProps {
  totalItems: number;
}

const AntPagination: React.FC<AntPaginationProps> = ({ totalItems }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { page, pageSize } = parsePaginationParams(searchParams);

  const handleChange = (page: number, pageSize: number) => {
    setSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      limit_start: (pageSize * (page - 1)).toString(),
    });
  };

  return (
    <Pagination
      total={totalItems}
      onChange={handleChange}
      pageSizeOptions={PAGE_SIZE_OPTIONS}
      pageSize={pageSize}
      current={page}
    />
  );
};

export default AntPagination;
