import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { MakeupService, Booking, BookingStatus, ServiceId, BookingId, UserProfile } from '../backend';

// Services
export function useGetAllServices() {
  const { actor, isFetching } = useActor();

  return useQuery<MakeupService[]>({
    queryKey: ['services'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllServices();
    },
    enabled: !!actor && !isFetching,
  });
}

// Available time slots
export function useGetAvailableTimeSlots(serviceId: ServiceId | null, date: string | null) {
  const { actor, isFetching } = useActor();

  return useQuery<string[]>({
    queryKey: ['availableTimeSlots', serviceId?.toString(), date],
    queryFn: async () => {
      if (!actor || !serviceId || !date) return [];
      return actor.getAvailableTimeSlots(serviceId, date);
    },
    enabled: !!actor && !isFetching && !!serviceId && !!date,
  });
}

// Book appointment
export function useBookAppointment() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      serviceId,
      customerName,
      email,
      phone,
      date,
      timeSlot,
    }: {
      serviceId: ServiceId;
      customerName: string;
      email: string;
      phone: string;
      date: string;
      timeSlot: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.bookAppointment(serviceId, customerName, email, phone, date, timeSlot);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['availableTimeSlots'] });
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}

// User profile
export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// Admin - Get bookings
export function useGetBookingsForDate(serviceId: ServiceId | null, date: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Booking[]>({
    queryKey: ['bookings', serviceId?.toString(), date],
    queryFn: async () => {
      if (!actor || !serviceId) return [];
      return actor.getBookingsForDate(serviceId, date);
    },
    enabled: !!actor && !isFetching && !!serviceId,
  });
}

// Admin - Update booking status
export function useUpdateBookingStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ bookingId, status }: { bookingId: BookingId; status: BookingStatus }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateBookingStatus(bookingId, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}

// Check if caller is admin
export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isCallerAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

