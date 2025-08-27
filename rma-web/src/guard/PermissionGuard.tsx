import { PermissionAction, useConditionalRender } from '@/hooks/permission/usePermissions';
import { URLErrorPage } from '@/router/routes.url';
import { Navigate } from 'react-router-dom';

interface PermissionGuardProps {
  entity: string;
  action: PermissionAction;
  children: React.ReactNode;
}

const PermissionGuard = ({ entity, action, children }: PermissionGuardProps) => {
  const permission = useConditionalRender(entity, action);

  if (!permission) {
    return <Navigate to={URLErrorPage()} />;
  }

  return children;
};

export default PermissionGuard;
