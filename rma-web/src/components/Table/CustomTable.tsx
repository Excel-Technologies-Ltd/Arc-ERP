import { memo } from 'react';
import Table from '../Base/Table';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import { TableColumn } from '@/types/Table/table-types';
import AntPagination from '../Pagination/AntPagination';
import { useSearchParams } from 'react-router-dom';
import AntEmpty from '../Empty/Empty';
import { transformCellData } from '@/utils/tableUtils';
import LottieLoader from '../Loader/LottieLoder';

interface ReusableTableProps<T> {
  data: T[];
  tableHeader: TableColumn<T>[];
  loading: boolean;
  totalItems?: number;
}

const CustomTable = <T extends Record<string, any>>({
  data,
  tableHeader = [],
  loading = false,
  totalItems = 0,
}: ReusableTableProps<T>) => {
  const [searchParams] = useSearchParams();
  const pageSize = Number(searchParams.get('pageSize')) || 10;
  const limit_start = Number(searchParams.get('limit_start')) || 0;

  if (loading) return <LottieLoader pageLoader />;
  if (!data || data?.length === 0) return <AntEmpty />;

  return (
    <>
      <div className='max-w-full relative overflow-auto intro-y 2xl:overflow-visible'>
        <Table className='max-w-full border-spacing-y-[10px] border-separate '>
          <TableHeader<T> headers={tableHeader} />
          <Table.Tbody>
            {data.map((item: T, index: number) => (
              <TableBody
                key={index}
                data={[...tableHeader.map((header) => transformCellData(item, header, index))]}
              />
            ))}
          </Table.Tbody>
        </Table>
      </div>
      {/* BEGIN: Pagination */}
      <div className='flex flex-col flex-wrap justify-between items-end intro-y md:flex-row md:flex-nowrap mt-3'>
        <div className='text-slate-500'>
          Showing {limit_start + 1} to {limit_start + pageSize} of {totalItems} entries
        </div>
        <AntPagination totalItems={totalItems || 0} />
      </div>
      {/* END: Pagination */}
    </>
  );
};

export default memo(CustomTable) as <T extends Record<string, any>>(
  props: ReusableTableProps<T>
) => JSX.Element;
