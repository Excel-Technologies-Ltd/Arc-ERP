import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { handleModal, selectModal } from '@/stores/modalSlice';
import { Modal, type ModalProps } from 'antd';

type AntModalProps = ModalProps & {
  modalType: string;
};

const AntModal = ({ modalType, onCancel, ...props }: AntModalProps) => {
  const dispatch = useAppDispatch();
  const { isOpen, type } = useAppSelector(selectModal);

  const visible = isOpen && (!modalType || type === modalType);

  const handleClose = (e: any) => {
    if (onCancel) onCancel(e);
    dispatch(handleModal({ type: '', isOpen: false }));
  };

  return <Modal centered {...props} open={visible} onCancel={handleClose} />;
};

export default AntModal;
