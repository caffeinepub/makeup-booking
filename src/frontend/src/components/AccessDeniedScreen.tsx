import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';

export default function AccessDeniedScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <ShieldAlert className="h-16 w-16 text-destructive mx-auto mb-4" />
        <h2 className="text-2xl font-display font-semibold mb-2">Access Denied</h2>
        <p className="text-muted-foreground mb-6">
          This page is restricted to administrators only. You do not have permission to view this content.
        </p>
        <Button onClick={() => navigate({ to: '/' })} size="lg">
          Return to Home
        </Button>
      </div>
    </div>
  );
}

