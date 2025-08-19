import React from 'react';
import { Pagination, type PaginationProps } from 'antd';

// Define the props for the reusable Pagination component
interface AntPaginationProps extends PaginationProps {
  currentPage?: number;
  totalItems: number;
  pageSize?: number;
}

const AntPagination: React.FC<AntPaginationProps> = ({
  //   currentPage = 2,
  totalItems,
  //   pageSize = 10,
  //   ...rest
}) => {
  return <Pagination total={totalItems} />;
};

export default AntPagination;
