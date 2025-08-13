import { memo, useState } from 'react';
import Table from '../Base/Table';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import ActionRender from './prompts/ActionRender';
import { twMerge } from 'tailwind-merge';
import DeleteModal from './prompts/DeleteModal';
import { TransformTableData } from './prompts/CustomTable.utils';

interface ReusableTableProps {
  data: any;
  onDelete?: (id: string | number | null) => void;
  onEdit?: (data: any) => void;
  tableHeader: any[];
  loading: boolean;
  showAction?: boolean;
  hideEditOnTable?: boolean;
  totalItems?: number;
  showingItemsTotal?: number;
}

const CustomTable = ({
  data,
  onDelete,
  onEdit,
  tableHeader = [],
  loading = false,
  showAction = true,
  hideEditOnTable = false,
  totalItems,
  showingItemsTotal,
}: ReusableTableProps) => {
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | number | null>(null);

  console.log(data);

  if (loading) return <div>Loading...</div>;
  if (!data || data?.data?.length === 0)
    return <h1 className='text-center text-2xl mt-5 intro-y'>No data found</h1>;

  return (
    <>
      <div className='grid grid-cols-12 gap-3 mt-5 relative z-10'>
        <div
          className={`col-span-12 overflow-auto intro-y bg-white dark:bg-darkmode-600 rounded-lg p-3`}
        >
          <div className='max-w-full relative'>
            <Table className='max-w-full'>
              <TableHeader headers={tableHeader} action={showAction} />
              <Table.Tbody>
                {data?.data?.map((item: any, index: number) => (
                  <TableBody
                    key={index}
                    data={[
                      ...tableHeader.map((header) => ({
                        title: TransformTableData({ item, header }),
                        width: header?.width,
                      })),
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
                            },
                          ]
                        : []),
                    ]}
                  />
                ))}
              </Table.Tbody>
            </Table>
          </div>
        </div>

        {/* <GlobalPagination /> */}
      </div>
      <div
        className={twMerge(
          'mt-3 flex justify-center items-center intro-y',
          true && 'justify-between'
        )}
      >
        <div className='col-span-1 flex justify-center items-end'>
          <div className='hidden mx-auto md:block text-slate-500 bg-white dark:bg-darkmode-600 rounded-lg p-2 py-2'>
            {totalItems && (
              <div className='flex items-center'>
                Showing {showingItemsTotal || 0} items of {totalItems || 0} entries
              </div>
            )}
          </div>
        </div>
        {/* {!isCustomPagination ? (
          <GlobalAntPagination
            totalItems={data?.totalItems}
            pageSize={data?.pageSize}
            pageNumber={data?.pageNumber}
          />
        ) : (
          <CustomAntPagination
            totalItems={data?.totalItems}
            pageSize={data?.pageSize}
            pageNumber={data?.pageNumber}
          />
        )} */}
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

export default memo(CustomTable);
