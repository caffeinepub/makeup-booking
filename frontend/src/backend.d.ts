import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Lead {
    id: LeadId;
    customerName: string;
    status: LeadStatus;
    email: string;
    timestamp: Time;
    category?: string;
    phone: string;
}
export type BookingId = bigint;
export type LeadId = bigint;
export type Time = bigint;
export interface CompanyService {
    id: bigint;
    duration: bigint;
    name: string;
    description: string;
    price: bigint;
}
export interface Booking {
    id: BookingId;
    service: string;
    customerName: string;
    status: BookingStatus;
    customerPhone: string;
    appointmentDate: Time;
    appointmentTime: string;
    timestamp: Time;
    customerEmail: string;
}
export interface UserProfile {
    name: string;
    email: string;
    phone: string;
}
export interface ServiceCategory {
    id: string;
    icon: string;
    name: string;
    color: string;
    services: Array<CompanyService>;
}
export enum BookingStatus {
    cancelled = "cancelled",
    pending = "pending",
    confirmed = "confirmed"
}
export enum LeadStatus {
    new_ = "new",
    closed = "closed",
    contacted = "contacted",
    converted = "converted"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addPrincipalNameMapping(principal: Principal, name: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createBookingEntry(service: string, appointmentDate: Time, appointmentTime: string, customerName: string, customerEmail: string, customerPhone: string, status: BookingStatus): Promise<BookingId>;
    createLead(category: string | null, customerName: string, phone: string, email: string): Promise<LeadId>;
    getAllBookings(): Promise<Array<Booking>>;
    getAllBookingsByStatus(status: BookingStatus): Promise<Array<Booking>>;
    getAllLeads(): Promise<Array<Lead>>;
    getBooking(bookingId: BookingId): Promise<Booking | null>;
    getBookingsByDateRange(startDate: Time, endDate: Time): Promise<Array<Booking>>;
    getBookingsByService(service: string): Promise<Array<Booking>>;
    getCallerName(): Promise<string | null>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getLead(leadId: LeadId): Promise<Lead | null>;
    getLeadsByStatus(status: LeadStatus): Promise<Array<Lead>>;
    getPrincipalByName(name: string): Promise<Principal | null>;
    getServices(): Promise<Array<ServiceCategory>>;
    getUserByPrincipal(principal: Principal): Promise<string | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isTimeSlotAvailableEntry(service: string, appointmentDate: Time, appointmentTime: string): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateBookingStatusEntry(bookingId: BookingId, newStatus: BookingStatus): Promise<void>;
    updateLeadStatus(leadId: LeadId, newStatus: LeadStatus): Promise<void>;
}
