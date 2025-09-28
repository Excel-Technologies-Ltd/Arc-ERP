import LottieLoader from '@/components/Loader/LottieLoder';
import useAuthCheck from '@/hooks/auth/useAuthCheck';
import { URLLogin } from '@/router/routes.url';
import { useFrappeAuth } from 'frappe-react-sdk';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * @description PrivateGuard component
 */
function PrivateGuard() {
  const { currentUser, isLoading, isValidating } = useFrappeAuth();
  const { isChecked } = useAuthCheck();

  // Show loader if loading or validating
  if (isLoading || isValidating || isChecked) {
    return <LottieLoader />;
  }

  // Protected route: render Outlet if user is logged in, otherwise redirect to login
  return currentUser ? <Outlet /> : <Navigate to={URLLogin()} />;
}

export default PrivateGuard;
