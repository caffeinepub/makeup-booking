import type { BookingStatus as BackendBookingStatus } from "../backend.d";

// Re-export from backend types for compatibility
export { BookingStatus } from "../backend.d";

export type ServiceId = string;
export type BookingId = bigint;

export interface MakeupService {
  id: ServiceId;
  name: string;
  description: string;
  duration: string;
  price: string | number;
  image?: string;
  location?: string;
}

export interface Booking {
  id: BookingId;
  service: string;
  customerName: string;
  status: BackendBookingStatus;
  customerPhone: string;
  appointmentDate: bigint;
  appointmentTime: string;
  timestamp: bigint;
  customerEmail: string;
}
