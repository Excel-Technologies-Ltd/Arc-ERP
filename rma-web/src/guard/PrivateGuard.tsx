import LottieLoader from '@/components/Loader/LottieLoder';
import { useAuthWithPermissions } from '@/hooks/useAuthWithPermissions';
import { URLLogin } from '@/router/routes.url';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * @description PrivateGuard component
 */
function PrivateGuard() {
  // check if user is logged in
  const { currentUser, isLoading } = useAuthWithPermissions();

  // Show loader while checking authentication and permissions
  if (isLoading) {
    return <LottieLoader />;
  }

  // Redirect to login if not authenticated
  if (!currentUser) {
    return <Navigate to={URLLogin()} replace />;
  }

  // Render protected routes
  return <Outlet />;
}

// export private route
export default PrivateGuard;
