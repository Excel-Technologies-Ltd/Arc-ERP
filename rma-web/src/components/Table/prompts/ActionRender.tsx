import { ActionRenderProps } from '@/types/Table/table-types';

const ActionRender = <T,>({
  onEdit,
  onDelete,
  hideEditOnTable,
  item,
  setSelectedId,
  setDeleteConfirmationModal,
}: ActionRenderProps<T>) => {
  const handleDelete = () => {
    setSelectedId((item as any).name || (item as any).id);
    setDeleteConfirmationModal(true);
  };

  return (
    <div className='flex items-center gap-2'>
      {!hideEditOnTable && (
        <button onClick={() => onEdit?.(item)} className='text-blue-600 hover:text-blue-800'>
          Edit
        </button>
      )}
      <button onClick={handleDelete} className='text-red-600 hover:text-red-800'>
        Delete
      </button>
    </div>
  );
};

export default ActionRender;
