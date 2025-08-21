import LottieLoader from '@/components/Loader/LottieLoder';
import { URLLogin } from '@/router/routes.url';
import { getPermissionlist } from '@/services/Permissions/Permissions';
import { resetPermissions, setPermissions } from '@/stores/permissionSlice';
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

  const {
    data: permissionList,
    isLoading: isLoadingPermissionList,
    error: isErrorPermissionList,
  } = getPermissionlist();

  if (isLoading || isValidating || isLoadingPermissionList) {
    return <LottieLoader />;
  }

  if (isErrorPermissionList) {
    dispatch(resetPermissions());
  }

  if (permissionList) {
    dispatch(setPermissions(permissionList.message));
  }

  // protected route
  return currentUser ? <Outlet /> : <Navigate to={URLLogin()} />;
}

// export private route
export default PrivateGuard;
