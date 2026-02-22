import { ReactNode } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { identity, loginStatus } = useInternetIdentity();
  const navigate = useNavigate();
  const isAuthenticated = !!identity;

  if (loginStatus === 'initializing') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <Lock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-display font-semibold mb-2">Authentication Required</h2>
          <p className="text-muted-foreground mb-6">
            Please log in to access this page and book appointments.
          </p>
          <Button onClick={() => navigate({ to: '/' })} size="lg">
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

