import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { handleModal, selectModal } from '@/stores/modalSlice';
import { Modal, type ModalProps } from 'antd';

const AntModal = (props: ModalProps) => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector(selectModal);
  const handleClose = () => {
    dispatch(handleModal({ type: '', isOpen: false }));
  };

  return <Modal open={isOpen} centered onCancel={handleClose} {...props} />;
};

export default AntModal;
