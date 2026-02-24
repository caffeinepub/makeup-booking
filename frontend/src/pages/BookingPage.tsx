import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, Loader2, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { useGetCallerUserProfile, useCreateBooking, useGetAllServices } from '../hooks/useQueries';
import { BookingStatus } from '../backend.d';

const TIME_SLOTS = [
  '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM',
  '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM',
];

export default function BookingPage() {
  const navigate = useNavigate();
  const { data: userProfile } = useGetCallerUserProfile();
  const { data: services } = useGetAllServices();
  const createBooking = useCreateBooking();

  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  useEffect(() => {
    if (userProfile) {
      setCustomerName(userProfile.name || '');
      setCustomerEmail(userProfile.email || '');
      setCustomerPhone(userProfile.phone || '');
    }
  }, [userProfile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !selectedDate || !selectedTime) {
      toast.error('Please fill in all required fields');
      return;
    }
    if (!customerName.trim() || !customerPhone.trim()) {
      toast.error('Please provide your name and phone number');
      return;
    }

    try {
      const appointmentDate = BigInt(selectedDate.getTime()) * BigInt(1_000_000);
      const bookingId = await createBooking.mutateAsync({
        service: selectedService,
        appointmentDate,
        appointmentTime: selectedTime,
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim(),
        customerPhone: customerPhone.trim(),
        status: BookingStatus.pending,
      });

      navigate({
        to: '/booking-confirmation',
        search: { bookingId: bookingId.toString() },
      });
    } catch {
      toast.error('Failed to create booking. Please try again.');
    }
  };

  // Build service options from backend or fallback
  const serviceOptions = services && services.length > 0
    ? services.flatMap((cat) =>
        cat.services.map((svc) => ({
          id: `${cat.id}-${svc.id}`,
          name: `${cat.name} - ${svc.name}`,
        }))
      )
    : [
        { id: 'bridal-makeup', name: 'Bridal Makeup' },
        { id: 'party-makeup', name: 'Party Makeup' },
        { id: 'hairstyles', name: 'Hairstyles' },
        { id: 'elegant-looks', name: 'Elegant Looks' },
        { id: 'traditional-looks', name: 'Traditional Looks' },
        { id: 'saree-draping', name: 'Saree Draping' },
      ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl font-bold text-foreground mb-3">
            Book an Appointment
          </h1>
          <p className="text-muted-foreground">
            Fill in the details below and we'll confirm your booking.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-card rounded-2xl p-6 md:p-8 border border-border shadow-sm">
          {/* Service Selection */}
          <div className="space-y-2">
            <Label>Service *</Label>
            <Select value={selectedService} onValueChange={setSelectedService}>
              <SelectTrigger>
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {serviceOptions.map((svc) => (
                  <SelectItem key={svc.id} value={svc.id}>
                    {svc.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Selection */}
          <div className="space-y-2">
            <Label>Appointment Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, 'PPP') : 'Pick a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time Selection */}
          <div className="space-y-2">
            <Label>Appointment Time *</Label>
            <Select value={selectedTime} onValueChange={setSelectedTime}>
              <SelectTrigger>
                <SelectValue placeholder="Select a time slot" />
              </SelectTrigger>
              <SelectContent>
                {TIME_SLOTS.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Customer Info */}
          <div className="space-y-4 pt-2 border-t border-border">
            <h3 className="font-semibold text-foreground">Your Details</h3>
            <div className="space-y-2">
              <Label htmlFor="booking-name">Full Name *</Label>
              <Input
                id="booking-name"
                placeholder="Enter your full name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="booking-phone">Phone Number *</Label>
              <Input
                id="booking-phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="booking-email">Email Address</Label>
              <Input
                id="booking-email"
                type="email"
                placeholder="your@email.com"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={createBooking.isPending}
          >
            {createBooking.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Booking...
              </>
            ) : (
              <>
                Confirm Booking
                <ChevronRight className="w-4 h-4 ml-1" />
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
