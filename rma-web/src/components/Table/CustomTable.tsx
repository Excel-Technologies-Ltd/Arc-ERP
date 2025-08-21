import { memo, useState } from 'react';
import Table from '../Base/Table';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import ActionRender from './prompts/ActionRender';
import DeleteModal from './prompts/DeleteModal';
import { TableColumn, TableRowData } from '@/types/Table/table-types';

interface ReusableTableProps<T> {
  data: T[];
  onDelete?: (id: string | number | null) => void;
  onEdit?: (data: T) => void;
  tableHeader: TableColumn<T>[];
  loading: boolean;
  showAction?: boolean;
  hideEditOnTable?: boolean;
}

const CustomTable = <T extends Record<string, any>>({
  data,
  onDelete,
  onEdit,
  tableHeader = [],
  loading = false,
  showAction = true,
  hideEditOnTable = false,
}: ReusableTableProps<T>) => {
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | number | null>(null);

  if (loading) return <div>Loading...</div>;
  if (!data || data?.length === 0)
    return <h1 className='text-center text-2xl mt-5 intro-y'>No data found</h1>;

  // Function to transform cell data with render function support
  const transformCellData = (item: T, header: TableColumn<T>, index: number): TableRowData => {
    let content: string | number | JSX.Element;

    if (header.render) {
      // Use the render function if provided
      const cellValue = item[header.key as keyof T];
      content = header.render(cellValue, item, index);
    } else {
      // Default behavior - use the key to get the value
      content = (item[header.key as keyof T] as string | number) || '-';
    }

    return {
      title: content,
      width: header.width,
    };
  };

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
