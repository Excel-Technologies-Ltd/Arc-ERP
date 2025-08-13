import { useFrappeAuth } from 'frappe-react-sdk';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * @description if user is logged he can't public routes
 * @param props.children
 */
function PublicGuard() {
  // login status
  const { currentUser, isLoading, isValidating } = useFrappeAuth();

  if (isLoading || isValidating) {
    return <div>Loading...</div>;
  }

  // public route
  return !currentUser ? <Outlet /> : <Navigate to={'/'} />;
}

// export public route
export default PublicGuard;
