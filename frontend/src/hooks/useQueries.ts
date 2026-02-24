import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { UserProfile, Lead, LeadStatus, Booking, BookingStatus, ServiceCategory } from '../backend.d';

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

export function useGetAllLeads() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<Lead[]>({
    queryKey: ['allLeads'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllLeads();
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

export function useGetLeadsByStatus(status: LeadStatus) {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<Lead[]>({
    queryKey: ['leads', status],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLeadsByStatus(status);
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

export function useCreateLead() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      category,
      customerName,
      phone,
      email,
    }: {
      category: string | null;
      customerName: string;
      phone: string;
      email: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createLead(category, customerName, phone, email);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allLeads'] });
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    },
  });
}

export function useUpdateLeadStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ leadId, newStatus }: { leadId: bigint; newStatus: LeadStatus }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateLeadStatus(leadId, newStatus);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allLeads'] });
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    },
  });
}

export function useGetAllServices() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<ServiceCategory[]>({
    queryKey: ['services'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getServices();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useCreateBooking() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      service,
      appointmentDate,
      appointmentTime,
      customerName,
      customerEmail,
      customerPhone,
      status,
    }: {
      service: string;
      appointmentDate: bigint;
      appointmentTime: string;
      customerName: string;
      customerEmail: string;
      customerPhone: string;
      status: BookingStatus;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createBookingEntry(
        service,
        appointmentDate,
        appointmentTime,
        customerName,
        customerEmail,
        customerPhone,
        status
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}

export function useGetAllBookings() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Booking[]>({
    queryKey: ['bookings'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBookings();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}

export function useUpdateBookingStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ bookingId, newStatus }: { bookingId: bigint; newStatus: BookingStatus }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateBookingStatusEntry(bookingId, newStatus);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isCallerAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}
