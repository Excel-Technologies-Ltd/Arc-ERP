import { URLLogin } from '@/router/routes.url';
import { useFrappeAuth } from 'frappe-react-sdk';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * @description PrivateGuard component
 */
function PrivateGuard() {
  // check if user is logged in
  const { currentUser, isLoading, isValidating } = useFrappeAuth();

  if (isLoading || isValidating) {
    return <div>Loading...</div>;
  }

  // protected route
  return currentUser ? <Outlet /> : <Navigate to={URLLogin()} />;
}

// export private route
export default PrivateGuard;
