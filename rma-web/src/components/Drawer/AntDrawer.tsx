import { handleDrawer, selectDrawer } from '@/stores/drawerSlice';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { Drawer, type DrawerProps } from 'antd';

const AntDrawer = (props: DrawerProps) => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector(selectDrawer);
  const handleDrawerClose = () => {
    dispatch(handleDrawer({ type: '', isOpen: false }));
  };
  return (
    <Drawer
      {...props}
      closable={{ 'aria-label': 'Close Button' }}
      onClose={handleDrawerClose}
      open={isOpen}
      placement={props?.placement || 'right'}
      width={props?.width || '30%'}
    />
  );
};

export default AntDrawer;
