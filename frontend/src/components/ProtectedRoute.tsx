import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useIsCallerAdmin } from '../hooks/useQueries';
import { Loader2, ShieldX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { identity, isInitializing } = useInternetIdentity();
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const navigate = useNavigate();

  const isAuthenticated = !!identity;

  if (isInitializing || (requireAdmin && adminLoading)) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4 text-center">
        <ShieldX className="w-16 h-16 text-muted-foreground" />
        <h2 className="text-2xl font-display font-bold">Login Required</h2>
        <p className="text-muted-foreground max-w-sm">
          Please log in to access this page.
        </p>
        <Button onClick={() => navigate({ to: '/' })}>Go Home</Button>
      </div>
    );
  }

  if (requireAdmin && !isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4 text-center">
        <ShieldX className="w-16 h-16 text-destructive" />
        <h2 className="text-2xl font-display font-bold">Access Denied</h2>
        <p className="text-muted-foreground max-w-sm">
          You don't have permission to access this page. Admin access required.
        </p>
        <Button onClick={() => navigate({ to: '/' })}>Go Home</Button>
      </div>
    );
  }

  return <>{children}</>;
}
