import { memo, useState } from 'react';
import Table from '../Base/Table';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import ActionRender from './prompts/ActionRender';
import DeleteModal from './prompts/DeleteModal';
import { TableColumn, TableRowData } from '@/types/Table/table-types';
import AntPagination from '../Pagination/AntPagination';
import { transformCellData } from './prompts/CustomTable.utils';
import { useSearchParams } from 'react-router-dom';

interface ReusableTableProps<T> {
  data: T[];
  onDelete?: (id: string | number | null) => void;
  onEdit?: (data: T) => void;
  tableHeader: TableColumn<T>[];
  loading: boolean;
  showAction?: boolean;
  hideEditOnTable?: boolean;
  totalItems?: number;
}

const CustomTable = <T extends Record<string, any>>({
  data,
  onDelete,
  onEdit,
  tableHeader = [],
  loading = false,
  showAction = false,
  hideEditOnTable = false,
  totalItems = 0,
}: ReusableTableProps<T>) => {
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | number | null>(null);
  const [searchParams] = useSearchParams();
  const pageSize = Number(searchParams.get('pageSize')) || 10;
  const limit_start = Number(searchParams.get('limit_start')) || 0;

  if (loading) return <div>Loading...</div>;
  if (!data || data?.length === 0)
    return <h1 className='text-center text-2xl mt-5 intro-y'>No data found</h1>;

  return (
    <>
      <div className='max-w-full relative'>
        <Table className='max-w-full border-spacing-y-[10px] border-separate'>
          <TableHeader<T> headers={tableHeader} action={showAction} />
          <Table.Tbody>
            {data.map((item: T, index: number) => (
              <TableBody
                key={index}
                data={[
                  ...tableHeader.map((header) => transformCellData(item, header, index)),
                  ...(showAction
                    ? [
                        {
                          title: (
                            <ActionRender
                              onEdit={onEdit}
                              onDelete={onDelete}
                              hideEditOnTable={hideEditOnTable}
                              item={item}
                              setSelectedId={setSelectedId}
                              setDeleteConfirmationModal={setDeleteConfirmationModal}
                            />
                          ),
                          width: '50px',
                        } as TableRowData,
                      ]
                    : []),
                ]}
              />
            ))}
          </Table.Tbody>
        </Table>
        {/* BEGIN: Pagination */}
        <div className='flex flex-wrap justify-between items-center intro-y sm:flex-row sm:flex-nowrap mt-3'>
          <div className='hidden xl:block text-slate-500'>
            Showing {limit_start + 1} to {limit_start + pageSize} of {totalItems} entries
          </div>
          <AntPagination totalItems={totalItems || 0} />
        </div>
        {/* END: Pagination */}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmationModal && (
        <DeleteModal
          deleteConfirmationModal={deleteConfirmationModal}
          setDeleteConfirmationModal={setDeleteConfirmationModal}
          onDelete={onDelete}
          selectedId={selectedId}
        />
      )}
    </>
  );
};

export default memo(CustomTable) as <T extends Record<string, any>>(
  props: ReusableTableProps<T>
) => JSX.Element;
