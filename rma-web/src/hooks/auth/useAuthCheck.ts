import { getPermissionlist } from '@/services/Permissions/Permissions';
import { useAppDispatch } from '@/stores/hooks';
import { setPermissions } from '@/stores/permissionSlice';
import { useFrappeAuth } from 'frappe-react-sdk';
import { useEffect, useState } from 'react';

function useAuthCheck() {
  const dispatch = useAppDispatch();
  const { currentUser } = useFrappeAuth();
  const [isChecked, setIsChecked] = useState<boolean>(true);

  const {
    data: permissionData,
    isLoading: permissionLoading,
    isValidating: permissionValidating,
    mutate: refetchPermission,
    error: permissionError,
  } = getPermissionlist();

  useEffect(() => {
    if (currentUser) {
      refetchPermission().then((data) => {
        dispatch(setPermissions(data.message));
      });
    }
  }, [currentUser]);

  useEffect(() => {
    if (permissionLoading || permissionValidating) {
      setIsChecked(false);

      if (permissionData) {
        dispatch(setPermissions(permissionData?.message));
      }
    }
  }, [permissionLoading, permissionValidating, permissionData, dispatch]);

  return { isChecked, permissionError };
}

export default useAuthCheck;
