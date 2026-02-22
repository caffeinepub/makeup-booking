import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import List "mo:core/List";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Float "mo:core/Float";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";



actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type ServiceId = Nat;
  type BookingId = Nat;
  type Slot = Text;

  public type MakeupService = {
    id : ServiceId;
    name : Text;
    description : Text;
    duration : Nat; // in minutes
    price : Float;
  };

  public type BookingStatus = {
    #pending;
    #confirmed;
    #completed;
    #cancelled;
  };

  public type Booking = {
    id : BookingId;
    service : MakeupService;
    customerName : Text;
    email : Text;
    phone : Text;
    date : Text;
    timeSlot : Slot;
    status : BookingStatus;
    owner : ?Principal; // Track booking owner for authenticated users
  };

  public type UserProfile = {
    name : Text;
    email : Text;
    phone : Text;
  };

  // Persistent stores
  let services = Map.empty<ServiceId, MakeupService>();
  let bookings = Map.empty<BookingId, Booking>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  var nextServiceId = 1;
  var nextBookingId = 1;

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Service management
  public shared ({ caller }) func createService(name : Text, description : Text, duration : Nat, price : Float) : async ServiceId {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create services");
    };

    let serviceId = nextServiceId;
    let newService : MakeupService = {
      id = serviceId;
      name;
      description;
      duration;
      price;
    };

    services.add(serviceId, newService);
    nextServiceId += 1;
    serviceId;
  };

  public query ({ caller }) func getAllServices() : async [MakeupService] {
    // Public access - anyone can view available services
    services.values().toArray();
  };

  // Booking logic
  public shared ({ caller }) func bookAppointment(serviceId : ServiceId, customerName : Text, email : Text, phone : Text, date : Text, timeSlot : Slot) : async BookingId {
    // Allow guests and authenticated users to book appointments
    // Authenticated users get ownership tracking
    switch (services.get(serviceId)) {
      case (null) { Runtime.trap("Service not found") };
      case (?service) {
        // Check time slot availability
        let available = isTimeSlotAvailableInternal(serviceId, date, timeSlot);
        if (not available) {
          Runtime.trap("Time slot already booked");
        };

        let bookingId = nextBookingId;
        
        // Track owner for authenticated users (non-anonymous)
        let owner = if (caller.isAnonymous()) {
          null
        } else {
          ?caller
        };

        let newBooking : Booking = {
          id = bookingId;
          service;
          customerName;
          email;
          phone;
          date;
          timeSlot;
          status = #pending;
          owner;
        };

        bookings.add(bookingId, newBooking);
        nextBookingId += 1;
        bookingId;
      };
    };
  };

  public query ({ caller }) func getMyBookings() : async [Booking] {
    // Authenticated users can view their own bookings
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view their bookings");
    };

    bookings.values().toArray().filter(
      func(b) {
        switch (b.owner) {
          case (?owner) { owner == caller };
          case (null) { false };
        }
      }
    );
  };

  public query ({ caller }) func getBooking(bookingId : BookingId) : async ?Booking {
    // Users can view their own bookings, admins can view all bookings
    switch (bookings.get(bookingId)) {
      case (null) { null };
      case (?booking) {
        let isOwner = switch (booking.owner) {
          case (?owner) { owner == caller };
          case (null) { false };
        };
        
        if (isOwner or AccessControl.isAdmin(accessControlState, caller)) {
          ?booking
        } else {
          Runtime.trap("Unauthorized: Can only view your own bookings");
        };
      };
    };
  };

  public query ({ caller }) func getBookingsForDate(serviceId : ServiceId, date : Text) : async [Booking] {
    // Admin-only: protects customer privacy (email, phone, name)
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all bookings");
    };

    bookings.values().toArray().filter(
      func(b) {
        b.service.id == serviceId and b.date == date
      }
    );
  };

  public query ({ caller }) func getAllBookings() : async [Booking] {
    // Admin-only: view all bookings across all dates and services
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all bookings");
    };

    bookings.values().toArray();
  };

  // Internal helper function for availability check
  private func isTimeSlotAvailableInternal(serviceId : ServiceId, date : Text, timeSlot : Slot) : Bool {
    let bookingsForDate = bookings.values().toArray().filter(
      func(b) {
        b.service.id == serviceId and b.date == date and b.timeSlot == timeSlot and (b.status == #pending or b.status == #confirmed)
      }
    );
    bookingsForDate.size() == 0;
  };

  public query ({ caller }) func isTimeSlotAvailable(serviceId : ServiceId, date : Text, timeSlot : Slot) : async Bool {
    // Public access - anyone can check availability
    isTimeSlotAvailableInternal(serviceId, date, timeSlot);
  };

  public shared ({ caller }) func cancelMyBooking(bookingId : BookingId) : async () {
    // Authenticated users can cancel their own bookings
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can cancel bookings");
    };

    switch (bookings.get(bookingId)) {
      case (null) { Runtime.trap("Booking not found") };
      case (?booking) {
        // Verify ownership
        let isOwner = switch (booking.owner) {
          case (?owner) { owner == caller };
          case (null) { false };
        };

        if (not isOwner) {
          Runtime.trap("Unauthorized: Can only cancel your own bookings");
        };

        let updatedBooking = {
          booking with status = #cancelled
        };
        bookings.add(bookingId, updatedBooking);
      };
    };
  };

  public shared ({ caller }) func updateBookingStatus(bookingId : BookingId, status : BookingStatus) : async () {
    // Admin-only: change any booking status
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can change booking status");
    };

    switch (bookings.get(bookingId)) {
      case (null) { Runtime.trap("Booking not found") };
      case (?booking) {
        let updatedBooking = {
          booking with status = status
        };
        bookings.add(bookingId, updatedBooking);
      };
    };
  };

  public query ({ caller }) func getAvailableTimeSlots(serviceId : ServiceId, date : Text) : async [Slot] {
    // Public access - anyone can view available time slots
    switch (services.get(serviceId)) {
      case (null) { Runtime.trap("Service not found") };
      case (?service) {
        let allSlots = ["9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

        let bookingsForDate = bookings.values().toArray().filter(
          func(b) { b.service.id == serviceId and b.date == date and (b.status == #pending or b.status == #confirmed) }
        );

        let availableSlots = allSlots.filter(
          func(slot) {
            not bookingsForDate.any(func(b) { b.timeSlot == slot });
          }
        );

        availableSlots;
      };
    };
  };
};
