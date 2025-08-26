import { getPermissionlist } from '@/services/Permissions/Permissions';
import { resetPermissions, setPermissions } from '@/stores/permissionSlice';
import { useFrappeAuth } from 'frappe-react-sdk';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const useAuthWithPermissions = () => {
  const dispatch = useDispatch();
  const { currentUser, error, isLoading, isValidating } = useFrappeAuth();
  const {
    data: permissions,
    isLoading: isLoadingPermissions,
    error: errorPermissions,
  } = getPermissionlist();

  // Handle permissions update
  useEffect(() => {
    if (permissions && !error) {
      dispatch(setPermissions(permissions.message));
    }
  }, [permissions, error, dispatch]);

  // Handle errors
  useEffect(() => {
    if (error || errorPermissions) {
      dispatch(resetPermissions());
    }
  }, [error, errorPermissions, dispatch]);

  return {
    currentUser: currentUser,
    isLoading: isLoading || isValidating || isLoadingPermissions,
    error: error || errorPermissions,
  };
};
