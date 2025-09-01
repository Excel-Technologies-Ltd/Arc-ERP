import { handleDrawer, selectDrawer } from '@/stores/drawerSlice';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { Drawer, type DrawerProps } from 'antd';
import AntButton from '../Base/Button/AntButton';
import { AiOutlineClose } from '../Base/Icons';

const AntDrawer = (props: DrawerProps) => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector(selectDrawer);
  const handleDrawerClose = () => {
    dispatch(handleDrawer({ type: '', isOpen: false }));
  };
  return (
    <Drawer
      {...props}
      closable={false}
      onClose={handleDrawerClose}
      open={isOpen}
      placement={props?.placement || 'right'}
      width={props?.width || '30%'}
      extra={<AntButton onClick={handleDrawerClose} icon={<AiOutlineClose />} size='middle' />}
    />
  );
};

export default AntDrawer;
