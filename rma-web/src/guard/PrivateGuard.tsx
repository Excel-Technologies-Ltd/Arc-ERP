import { URLLogin } from '@/router/routes.url';
import { getPermissionlist } from '@/services/Permissions/Permissions';
import { useAppSelector } from '@/stores/hooks';
import { resetPermissions, setPermissions } from '@/stores/permissionSlice';
import { selectDarkMode } from '@/stores/darkModeSlice';
import { ConfigProvider, theme } from 'antd';
import { useFrappeAuth } from 'frappe-react-sdk';
import { useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * @description PrivateGuard component
 */
function PrivateGuard() {
  // check if user is logged in
  const { currentUser, isLoading, isValidating } = useFrappeAuth();
  const dispatch = useDispatch();
  const darkMode = useAppSelector(selectDarkMode);

  const {
    data: permissionList,
    isLoading: isLoadingPermissionList,
    error: isErrorPermissionList,
  } = getPermissionlist();

  if (isLoading || isValidating || isLoadingPermissionList) {
    return <div>Loading...</div>;
  }

  if (isErrorPermissionList) {
    dispatch(resetPermissions());
  }

  if (permissionList) {
    dispatch(setPermissions(permissionList.message));
  }

  // protected route
  return currentUser ? (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Outlet />
    </ConfigProvider>
  ) : (
    <Navigate to={URLLogin()} />
  );
}

// export private route
export default PrivateGuard;
