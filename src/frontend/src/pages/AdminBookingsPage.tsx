import { useState, useMemo } from 'react';
import { useGetAllServices, useGetBookingsForDate, useUpdateBookingStatus, useIsCallerAdmin } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import AccessDeniedScreen from '../components/AccessDeniedScreen';
import { BookingStatus } from '../backend';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

export default function AdminBookingsPage() {
  const { data: isAdmin, isLoading: isAdminLoading } = useIsCallerAdmin();
  const { data: services } = useGetAllServices();
  const updateStatus = useUpdateBookingStatus();

  const [selectedServiceId, setSelectedServiceId] = useState<bigint | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const dateString = format(selectedDate, 'yyyy-MM-dd');
  const { data: bookings, isLoading: bookingsLoading } = useGetBookingsForDate(selectedServiceId, dateString);

  // Auto-select first service
  useMemo(() => {
    if (services && services.length > 0 && !selectedServiceId) {
      setSelectedServiceId(services[0].id);
    }
  }, [services, selectedServiceId]);

  const handleStatusChange = async (bookingId: bigint, newStatus: BookingStatus) => {
    try {
      await updateStatus.mutateAsync({ bookingId, status: newStatus });
      toast.success('Booking status updated');
    } catch (error) {
      console.error('Status update error:', error);
      toast.error('Failed to update status');
    }
  };

  const getStatusBadgeVariant = (status: BookingStatus): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case BookingStatus.confirmed:
        return 'default';
      case BookingStatus.pending:
        return 'secondary';
      case BookingStatus.completed:
        return 'outline';
      case BookingStatus.cancelled:
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  if (isAdminLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return <AccessDeniedScreen />;
  }

  const sortedBookings = bookings ? [...bookings].sort((a, b) => {
    return a.timeSlot.localeCompare(b.timeSlot);
  }) : [];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-display font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground text-lg">Manage all bookings and appointments</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Select Service</CardTitle>
          </CardHeader>
          <CardContent>
            <Select
              value={selectedServiceId?.toString() || ''}
              onValueChange={(value) => setSelectedServiceId(BigInt(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose a service" />
              </SelectTrigger>
              <SelectContent>
                {services?.map((service) => (
                  <SelectItem key={service.id.toString()} value={service.id.toString()}>
                    {service.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="mx-auto"
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            Bookings for {format(selectedDate, 'MMMM d, yyyy')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {bookingsLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
              <p className="text-muted-foreground">Loading bookings...</p>
            </div>
          ) : sortedBookings.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedBookings.map((booking) => (
                    <TableRow key={booking.id.toString()}>
                      <TableCell className="font-mono">#{booking.id.toString()}</TableCell>
                      <TableCell className="font-semibold">{booking.timeSlot}</TableCell>
                      <TableCell>{booking.customerName}</TableCell>
                      <TableCell>{booking.email}</TableCell>
                      <TableCell>{booking.phone}</TableCell>
                      <TableCell>{booking.service.name}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(booking.status)}>
                          {booking.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={booking.status}
                          onValueChange={(value) => handleStatusChange(booking.id, value as BookingStatus)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={BookingStatus.pending}>Pending</SelectItem>
                            <SelectItem value={BookingStatus.confirmed}>Confirmed</SelectItem>
                            <SelectItem value={BookingStatus.completed}>Completed</SelectItem>
                            <SelectItem value={BookingStatus.cancelled}>Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No bookings found for this date and service.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

