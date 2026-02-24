import Map "mo:core/Map";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type LeadId = Nat;
  type BookingId = Nat;

  public type LeadStatus = {
    #new;
    #contacted;
    #converted;
    #closed;
  };

  public type BookingStatus = {
    #pending;
    #confirmed;
    #cancelled;
  };

  public type Booking = {
    id : BookingId;
    service : Text;
    appointmentDate : Time.Time;
    appointmentTime : Text;
    customerName : Text;
    customerEmail : Text;
    customerPhone : Text;
    status : BookingStatus;
    timestamp : Time.Time;
  };

  public type BookingRequest = {
    service : Text;
    appointmentDate : Time.Time;
    appointmentTime : Text;
    customerName : Text;
    customerEmail : Text;
    customerPhone : Text;
  };

  public type BookingConfirmation = {
    bookingId : BookingId;
    status : BookingStatus;
  };

  public type UserProfile = {
    name : Text;
    email : Text;
    phone : Text;
  };

  public type CompanyService = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat;
    duration : Nat;
  };

  public type ServiceCategory = {
    id : Text;
    name : Text;
    color : Text;
    icon : Text;
    services : [CompanyService];
  };

  public type Company = {
    id : Text;
    name : Text;
    contactEmail : Text;
    contactPhone : Text;
  };

  public type OpeningHours = {
    day : Text;
    openTime : Text;
    closeTime : Text;
  };

  public type Lead = {
    id : LeadId;
    category : ?Text;
    customerName : Text;
    phone : Text;
    email : Text;
    timestamp : Time.Time;
    status : LeadStatus;
  };

  let bookings = Map.empty<BookingId, Booking>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  let leads = Map.empty<LeadId, Lead>();
  let principalNames = Map.empty<Principal, Text>();

  let serviceCategories : [ServiceCategory] = [
    {
      id = "cleaning";
      name = "Cleaning";
      color = "#F8B195";
      icon = "🧹";
      services = [
        {
          id = 1;
          name = "Standard Cleaning";
          description = "Basic cleaning services for homes and offices. Includes dusting, vacuuming, and mopping. Suitable for regular maintenance and upkeep.";
          price = 30;
          duration = 60;
        },
        {
          id = 2;
          name = "Deep Cleaning";
          description = "Intensive cleaning service for homes and commercial spaces. Includes cleaning hard-to-reach areas, appliances, and thorough dusting.\n";
          price = 50;
          duration = 120;
        },
      ];
    },
    // Additional categories and services...
  ];

  let companyServices = Map.empty<Nat, CompanyService>();
  let serviceCategoriesMap = Map.empty<Text, ServiceCategory>();
  let companies = Map.empty<Text, Company>();
  let openingHours = Map.empty<Text, OpeningHours>();

  var nextBookingId = 1;

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
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

  // Lead Management
  public shared ({ caller }) func createLead(category : ?Text, customerName : Text, phone : Text, email : Text) : async LeadId {
    // No authorization check - guests can submit leads
    let leadId = nextBookingId;
    let newLead : Lead = {
      id = leadId;
      category;
      customerName;
      phone;
      email;
      timestamp = Time.now();
      status = #new;
    };

    leads.add(leadId, newLead);
    nextBookingId += 1;
    leadId;
  };

  public query ({ caller }) func getLeadsByStatus(status : LeadStatus) : async [Lead] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users and admins can access leads");
    };

    leads.toArray().map(func(entry) { entry.1 }).filter(func(lead) { lead.status == status });
  };

  public shared ({ caller }) func updateLeadStatus(leadId : LeadId, newStatus : LeadStatus) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update lead status");
    };

    switch (leads.get(leadId)) {
      case (null) { Runtime.trap("Lead not found") };
      case (?existingLead) {
        let updatedLead = {
          existingLead with status = newStatus
        };
        leads.add(leadId, updatedLead);
      };
    };
  };

  public query ({ caller }) func getLead(leadId : LeadId) : async ?Lead {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users and admins can access leads");
    };

    leads.get(leadId);
  };

  // Booking Methods
  public shared ({ caller }) func createBookingEntry(
    service : Text,
    appointmentDate : Time.Time,
    appointmentTime : Text,
    customerName : Text,
    customerEmail : Text,
    customerPhone : Text,
    status : BookingStatus,
  ) : async BookingId {
    // No authorization check - guests can create bookings (customer-facing feature)
    let bookingId = nextBookingId;
    let newBooking : Booking = {
      id = bookingId;
      service;
      appointmentDate;
      appointmentTime;
      customerName;
      customerEmail;
      customerPhone;
      status;
      timestamp = Time.now();
    };

    bookings.add(bookingId, newBooking);
    nextBookingId += 1;
    bookingId;
  };

  public query ({ caller }) func getBooking(bookingId : BookingId) : async ?Booking {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can access bookings");
    };

    bookings.get(bookingId);
  };

  public query ({ caller }) func getAllBookingsByStatus(status : BookingStatus) : async [Booking] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can access bookings");
    };

    bookings.toArray().map(
      func(entry) { entry.1 }
    ).filter(
      func(booking) { booking.status == status }
    );
  };

  public query ({ caller }) func getBookingsByDateRange(startDate : Time.Time, endDate : Time.Time) : async [Booking] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can access bookings");
    };

    bookings.toArray().map(
      func(entry) { entry.1 }
    ).filter(
      func(booking) { booking.appointmentDate >= startDate and booking.appointmentDate <= endDate }
    );
  };

  public query ({ caller }) func getBookingsByService(service : Text) : async [Booking] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can access bookings");
    };

    bookings.toArray().map(
      func(entry) { entry.1 }
    ).filter(
      func(booking) { booking.service == service }
    );
  };

  public shared ({ caller }) func updateBookingStatusEntry(bookingId : BookingId, newStatus : BookingStatus) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update booking status");
    };

    switch (bookings.get(bookingId)) {
      case (null) { Runtime.trap("Booking not found") };
      case (?existingBooking) {
        let updatedBooking = {
          existingBooking with status = newStatus
        };
        bookings.add(bookingId, updatedBooking);
      };
    };
  };

  public query ({ caller }) func isTimeSlotAvailableEntry(service : Text, appointmentDate : Time.Time, appointmentTime : Text) : async Bool {
    // No authorization check - guests need to check availability before booking
    let bookingsForDay = bookings.values().toArray().filter(
      func(booking) {
        booking.service == service and booking.appointmentDate == appointmentDate
      }
    );

    bookingsForDay.filter(
      func(booking) { booking.appointmentTime == appointmentTime }
    ).size() == 0;
  };

  // Principal to Name mapping methods
  public shared ({ caller }) func addPrincipalNameMapping(principal : Principal, name : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add principal name mappings");
    };
    principalNames.add(principal, name);
  };

  public query ({ caller }) func getCallerName() : async ?Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can access their name");
    };
    principalNames.get(caller);
  };

  public query ({ caller }) func getUserByPrincipal(principal : Principal) : async ?Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can access user data");
    };
    principalNames.get(principal);
  };

  public query ({ caller }) func getPrincipalByName(name : Text) : async ?Principal {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can access principal data");
    };

    var result : ?Principal = null;
    for ((principal, storedName) in principalNames.entries()) {
      if (storedName == name) {
        result := ?principal;
      };
    };
    result;
  };

  public query ({ caller }) func getAllBookings() : async [Booking] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can access all bookings");
    };

    bookings.toArray().map(func(entry) { entry.1 });
  };

  public query ({ caller }) func getAllLeads() : async [Lead] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users and admins can access leads");
    };

    leads.toArray().map(func(entry) { entry.1 });
  };

  public query ({ caller }) func getServices() : async [ServiceCategory] {
    serviceCategories;
  };
};
