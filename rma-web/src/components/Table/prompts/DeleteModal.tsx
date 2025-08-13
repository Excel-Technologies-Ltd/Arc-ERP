import Button from '@/components/Base/Button';
import { Dialog } from '@/components/Base/Headless';
import Lucide from '@/components/Base/Lucide';

interface DeleteModalProps {
  deleteConfirmationModal: boolean;
  setDeleteConfirmationModal: (value: boolean) => void;
  onDelete?: (id: string | number) => void;
  selectedId?: string | number | null;
}

const DeleteModal = ({
  deleteConfirmationModal,
  setDeleteConfirmationModal,
  onDelete,
  selectedId,
}: DeleteModalProps) => {
  return (
    <Dialog open={deleteConfirmationModal} onClose={() => setDeleteConfirmationModal(false)}>
      <Dialog.Panel>
        <div className='p-5 text-center'>
          <Lucide icon='XCircle' className='w-16 h-16 mx-auto mt-3 text-danger' />
          <div className='mt-5 text-3xl'>Are you sure?</div>
          <div className='mt-2 text-slate-500'>
            Do you really want to delete this record? <br />
          </div>
        </div>
        <div className='px-5 pb-8 text-center'>
          <Button
            variant='outline-secondary'
            type='button'
            onClick={() => setDeleteConfirmationModal(false)}
            className='w-24 mr-1'
          >
            Cancel
          </Button>
          &nbsp; &nbsp;
          {onDelete && (
            <Button
              variant='danger'
              type='button'
              className='w-24'
              onClick={() => {
                if (selectedId && onDelete) {
                  onDelete(selectedId);
                  setDeleteConfirmationModal(false);
                }
              }}
            >
              Delete
            </Button>
          )}
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default DeleteModal;
