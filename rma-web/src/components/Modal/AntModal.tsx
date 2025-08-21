import { useAppSelector } from '@/stores/hooks';
import { handleModal, selectModal } from '@/stores/modalSlice';
import { Modal, type ModalProps } from 'antd';
import { useDispatch } from 'react-redux';

const AntModal = (props: ModalProps) => {
  const dispatch = useDispatch();
  const { isOpen } = useAppSelector(selectModal);
  const handleClose = () => {
    dispatch(handleModal({ type: '', isOpen: false }));
  };

  return <Modal footer={false} open={isOpen} centered onCancel={handleClose} {...props} />;
};

export default AntModal;
