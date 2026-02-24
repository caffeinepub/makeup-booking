import { useNavigate, useSearch } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Home, CalendarPlus } from 'lucide-react';

export default function BookingConfirmationPage() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as { bookingId?: string };
  const bookingId = search?.bookingId;

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>
        </div>

        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
          Booking Confirmed!
        </h1>
        <p className="text-muted-foreground mb-2 text-lg">
          Thank you for booking with Naaz Studio.
        </p>
        {bookingId && (
          <p className="text-sm text-muted-foreground mb-6">
            Your booking reference:{' '}
            <span className="font-semibold text-foreground">#{bookingId}</span>
          </p>
        )}
        <p className="text-muted-foreground mb-8">
          We'll contact you shortly to confirm the details of your appointment.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="outline"
            onClick={() => navigate({ to: '/' })}
            className="gap-2"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Button>
          <Button
            onClick={() => navigate({ to: '/booking' })}
            className="gap-2"
          >
            <CalendarPlus className="w-4 h-4" />
            Book Another
          </Button>
        </div>
      </div>
    </div>
  );
}
