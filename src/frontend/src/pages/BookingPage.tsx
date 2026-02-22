import { useState, useEffect } from 'react';
import { useGetAllServices, useGetAvailableTimeSlots, useBookAppointment, useGetCallerUserProfile } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { format } from 'date-fns';

export default function BookingPage() {
  const navigate = useNavigate();
  const { data: services } = useGetAllServices();
  const { data: userProfile } = useGetCallerUserProfile();
  const bookAppointment = useBookAppointment();

  const [selectedServiceId, setSelectedServiceId] = useState<bigint | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const dateString = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : null;
  const { data: availableSlots } = useGetAvailableTimeSlots(selectedServiceId, dateString);

  // Pre-fill form with user profile data
  useEffect(() => {
    if (userProfile) {
      setCustomerName(userProfile.name);
      setEmail(userProfile.email);
      setPhone(userProfile.phone);
    }
  }, [userProfile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedServiceId || !selectedDate || !selectedTimeSlot) {
      toast.error('Please select a service, date, and time slot');
      return;
    }

    if (!customerName.trim() || !email.trim() || !phone.trim()) {
      toast.error('Please fill in all contact information');
      return;
    }

    try {
      const bookingId = await bookAppointment.mutateAsync({
        serviceId: selectedServiceId,
        customerName,
        email,
        phone,
        date: format(selectedDate, 'yyyy-MM-dd'),
        timeSlot: selectedTimeSlot,
      });

      toast.success('Appointment booked successfully!');
      navigate({ to: '/booking-confirmation/$bookingId', params: { bookingId: bookingId.toString() } });
    } catch (error: any) {
      console.error('Booking error:', error);
      toast.error(error.message || 'Failed to book appointment');
    }
  };

  const selectedService = services?.find(s => s.id === selectedServiceId);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-display font-bold mb-4">Book Your Appointment</h1>
          <p className="text-muted-foreground text-lg">
            Select your preferred service, date, and time
          </p>
        </div>

        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="text-2xl font-display">Appointment Details</CardTitle>
            <CardDescription>Fill in the information below to complete your booking</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Service Selection */}
              <div className="space-y-2">
                <Label htmlFor="service">Select Service *</Label>
                <Select
                  value={selectedServiceId?.toString() || ''}
                  onValueChange={(value) => {
                    setSelectedServiceId(BigInt(value));
                    setSelectedTimeSlot('');
                  }}
                >
                  <SelectTrigger id="service">
                    <SelectValue placeholder="Choose a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services?.map((service) => (
                      <SelectItem key={service.id.toString()} value={service.id.toString()}>
                        {service.name} - ${service.price.toFixed(2)} ({Number(service.duration)} min)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedService && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {selectedService.description}
                  </p>
                )}
              </div>

              {/* Date Selection */}
              <div className="space-y-2">
                <Label>Select Date *</Label>
                <div className="border rounded-lg p-4 bg-card">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date);
                      setSelectedTimeSlot('');
                    }}
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    className="mx-auto"
                  />
                </div>
              </div>

              {/* Time Slot Selection */}
              {selectedDate && selectedServiceId && (
                <div className="space-y-2">
                  <Label>Available Time Slots *</Label>
                  {availableSlots && availableSlots.length > 0 ? (
                    <div className="grid grid-cols-3 gap-2">
                      {availableSlots.map((slot) => (
                        <Button
                          key={slot}
                          type="button"
                          variant={selectedTimeSlot === slot ? 'default' : 'outline'}
                          onClick={() => setSelectedTimeSlot(slot)}
                          className="w-full"
                        >
                          <Clock className="h-4 w-4 mr-2" />
                          {slot}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No available time slots for this date.</p>
                  )}
                </div>
              )}

              {/* Contact Information */}
              <div className="border-t pt-6 space-y-4">
                <h3 className="text-lg font-semibold">Contact Information</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full text-lg py-6"
                disabled={bookAppointment.isPending || !selectedServiceId || !selectedDate || !selectedTimeSlot}
              >
                {bookAppointment.isPending ? 'Booking...' : 'Confirm Booking'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

