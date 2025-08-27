import { PermissionAction, usePermissions } from '@/hooks/permission/usePermissions';
import { URLErrorPage, URLLogin } from '@/router/routes.url';
import { Navigate } from 'react-router-dom';

interface PermissionGuardProps {
  entity: string;
  action: PermissionAction;
  children: React.ReactNode;
}

const PermissionGuard = ({ entity, action, children }: PermissionGuardProps) => {
  const { hasPermission } = usePermissions();

  if (!hasPermission(entity, action)) {
    return <Navigate to={URLErrorPage()} />;
  }

  return children;
};

export default PermissionGuard;
