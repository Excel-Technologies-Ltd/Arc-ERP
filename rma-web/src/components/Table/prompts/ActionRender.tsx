import Button from '@/components/Base/Button';

interface ActionsRendererProps {
  onEdit?: (data: any) => void;
  onDelete?: (id: string | number) => void;
  item: any;
  setSelectedId: (id: string | number | null) => void;
  setDeleteConfirmationModal: (value: boolean) => void;
  hideEditOnTable?: boolean;
}

const ActionRender = ({
  onEdit,
  onDelete,
  item,
  setSelectedId,
  setDeleteConfirmationModal,
  hideEditOnTable,
}: ActionsRendererProps) => {
  return (
    <div className='flex items-center gap-2 justify-end'>
      {!hideEditOnTable && onEdit && (
        <Button size='sm' type='button' className='text-primary' onClick={() => onEdit(item)}>
          Edit
        </Button>
      )}
      {onDelete && (
        <Button
          size='sm'
          variant='soft-danger'
          type='button'
          className='text-danger'
          onClick={() => {
            setSelectedId(item.oid);
            setDeleteConfirmationModal(true);
          }}
        >
          Delete
        </Button>
      )}
    </div>
  );
};

export default ActionRender;
