import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type ServiceId = bigint;
export type BookingId = bigint;
export type Slot = string;
export interface Booking {
    id: BookingId;
    service: MakeupService;
    customerName: string;
    status: BookingStatus;
    owner?: Principal;
    date: string;
    email: string;
    phone: string;
    timeSlot: Slot;
}
export interface MakeupService {
    id: ServiceId;
    duration: bigint;
    name: string;
    description: string;
    price: number;
}
export interface UserProfile {
    name: string;
    email: string;
    phone: string;
}
export enum BookingStatus {
    cancelled = "cancelled",
    pending = "pending",
    completed = "completed",
    confirmed = "confirmed"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    bookAppointment(serviceId: ServiceId, customerName: string, email: string, phone: string, date: string, timeSlot: Slot): Promise<BookingId>;
    cancelMyBooking(bookingId: BookingId): Promise<void>;
    createService(name: string, description: string, duration: bigint, price: number): Promise<ServiceId>;
    getAllBookings(): Promise<Array<Booking>>;
    getAllServices(): Promise<Array<MakeupService>>;
    getAvailableTimeSlots(serviceId: ServiceId, date: string): Promise<Array<Slot>>;
    getBooking(bookingId: BookingId): Promise<Booking | null>;
    getBookingsForDate(serviceId: ServiceId, date: string): Promise<Array<Booking>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getMyBookings(): Promise<Array<Booking>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isTimeSlotAvailable(serviceId: ServiceId, date: string, timeSlot: Slot): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateBookingStatus(bookingId: BookingId, status: BookingStatus): Promise<void>;
}
