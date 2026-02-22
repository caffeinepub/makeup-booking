import { useNavigate, useParams } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Calendar, Home } from 'lucide-react';

export default function BookingConfirmationPage() {
  const navigate = useNavigate();
  const { bookingId } = useParams({ from: '/booking-confirmation/$bookingId' });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-elegant border-2 border-primary/20">
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-20 w-20 text-primary" />
            </div>
            <CardTitle className="text-3xl font-display">Booking Confirmed!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="bg-secondary/20 rounded-lg p-6">
              <p className="text-lg text-muted-foreground mb-2">Your booking ID</p>
              <p className="text-3xl font-bold text-primary font-mono">#{bookingId}</p>
            </div>

            <div className="space-y-3">
              <p className="text-lg">
                Thank you for booking with Glam Studio! Your appointment has been successfully confirmed.
              </p>
              <p className="text-muted-foreground">
                We look forward to seeing you and helping you look your absolute best.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                onClick={() => navigate({ to: '/' })}
                variant="outline"
                className="flex-1"
              >
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
              <Button 
                onClick={() => navigate({ to: '/book' })}
                className="flex-1"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Book Another
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

