// =============================
// BLVK MOON EVENT
// booking.js
// =============================

// ------------------------------
// Check Login
// ------------------------------

const loggedInUser =
JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {

    alert("Please login first.");

    window.location.href =
"../Login-Signup/login.html";

}

// ------------------------------
// Load Selected Venue
// ------------------------------

const selectedVenue =
JSON.parse(localStorage.getItem("selectedVenue"));

if (!selectedVenue) {

    alert("No venue selected.");

    window.location.href =
    "/Event-Management/main_home/Venue.html";

}

// ------------------------------
// Auto Fill Venue Details
// ------------------------------

document.getElementById("venueName").value =
selectedVenue.venueName;

document.getElementById("venueLocation").value =
selectedVenue.venueLocation;

document.getElementById("venueBudget").value =
selectedVenue.venueBudget;

document.getElementById("venueCapacity").value =
selectedVenue.venueCapacity;


// ------------------------------
// Booking Form
// ------------------------------

const bookingForm =
document.getElementById("bookingForm");

bookingForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const eventName =
    document.getElementById("eventName").value.trim();

    const eventDate =
    document.getElementById("eventDate").value;

    const guestCount =
    document.getElementById("guestCount").value;

    const eventBudget =
    document.getElementById("eventBudget").value;

    const specialRequest =
    document.getElementById("specialRequest").value.trim();

    // ------------------------------
    // Validation
    // ------------------------------

    if (
        eventName === "" ||
        eventDate === "" ||
        guestCount === "" ||
        eventBudget === ""
    ) {

        alert("Please fill all fields.");

        return;

    }

    // Event date cannot be in the past

    const today = new Date();

    today.setHours(0,0,0,0);

    const selectedDate =
    new Date(eventDate);

    if(selectedDate < today){

        alert("Please choose a future event date.");

        return;

    }

    // ------------------------------
    // Booking Object
    // ------------------------------

    const booking = {

        bookingId:
        "BK" + Date.now(),

        userId:
        loggedInUser.id,

        name:
        loggedInUser.name,

        phone:
        loggedInUser.phone,

        email:
        loggedInUser.email,

        venueName:
        selectedVenue.venueName,

        venueLocation:
        selectedVenue.venueLocation,

        venueBudget:
        selectedVenue.venueBudget,

        venueCapacity:
        selectedVenue.venueCapacity,

        eventName:
        eventName,

        eventDate:
        eventDate,

        guestCount:
        guestCount,

        estimatedBudget:
        eventBudget,

        specialRequest:
        specialRequest,

        bookingDate:
        new Date().toLocaleDateString(),

        bookingTime:
        new Date().toLocaleTimeString(),

        bookingTimestamp:
        new Date().toISOString(),

        status:
        "Pending"

    };

    // ------------------------------
    // Save Booking
    // ------------------------------

    let bookings =
    JSON.parse(localStorage.getItem("bookings")) || [];

    bookings.push(booking);

    localStorage.setItem(
        "bookings",
        JSON.stringify(bookings)
    );

    // Remove temporary selected venue

    localStorage.removeItem("selectedVenue");

    alert(
        "🎉 Booking Confirmed Successfully!"
    );

    // Redirect Home

   window.location.href =
"Home1.html";

});