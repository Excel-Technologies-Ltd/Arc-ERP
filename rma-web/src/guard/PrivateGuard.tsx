import LottieLoader from '@/components/Loader/LottieLoder';
import { URLLogin } from '@/router/routes.url';
import { getPermissionlist } from '@/services/Permissions/Permissions';
import { resetPermissions, setPermissions } from '@/stores/permissionSlice';
import { useFrappeAuth } from 'frappe-react-sdk';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPermissions as selectPermissionsState } from '@/stores/permissionSlice';
import isEqual from 'lodash/isEqual';
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
    isValidating: isValidatingPermissionList,
    mutate: refetchPermissions,
  } = getPermissionlist();

  // Current permissions from store for change detection
  const currentPermissions = useSelector(selectPermissionsState);

  // Reset permissions when the user is not logged in
  const didRefetchPermissions = useRef(false);

  useEffect(() => {
    if (!currentUser) {
      dispatch(resetPermissions());
      didRefetchPermissions.current = false;
    }
  }, [currentUser, dispatch]);

  // Refetch permissions once user becomes available (avoid stale cache)
  useEffect(() => {
    if (currentUser && !didRefetchPermissions.current) {
      didRefetchPermissions.current = true;
      // Trigger revalidation to ensure fresh permissions for this session
      refetchPermissions();
    }
  }, [currentUser]);

  // Set permissions after login when permissionList is available and not validating
  useEffect(() => {
    if (currentUser && permissionList && !isValidatingPermissionList) {
      const next = permissionList.message;
      const hasChanged =
        currentPermissions.user !== next.user ||
        !isEqual(currentPermissions.roles, next.roles) ||
        !isEqual(currentPermissions.territory, next.territory) ||
        !isEqual(currentPermissions.warehouse, next.warehouse) ||
        !isEqual(currentPermissions.permissions, next.permissions);

      if (hasChanged) {
        dispatch(setPermissions(next));
      }
    }
  }, [currentUser, permissionList, isValidatingPermissionList, dispatch]);

  if (isLoading || isValidating || isLoadingPermissionList || isValidatingPermissionList) {
    return <LottieLoader />;
  }

  // protected route
  return currentUser ? <Outlet /> : <Navigate to={URLLogin()} />;
}

// export private route
export default PrivateGuard;
