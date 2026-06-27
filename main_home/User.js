// =====================================
// BLVK MOON EVENT
// Profile.js
// =====================================

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
// Display User Details
// ------------------------------

document.getElementById("userName").innerText =
loggedInUser.name;

document.getElementById("userEmail").innerText =
"📧 " + loggedInUser.email;

document.getElementById("userPhone").innerText =
"📱 " + loggedInUser.phone;


// ------------------------------
// Logout
// ------------------------------

document.getElementById("logoutBtn")
.addEventListener("click", function () {

    localStorage.removeItem("loggedInUser");

    alert("Logged Out Successfully");

    window.location.href =
    "../Login-Signup/login.html";

});


// ------------------------------
// Load Bookings
// ------------------------------

const bookings =
JSON.parse(localStorage.getItem("bookings")) || [];

const bookingContainer =
document.getElementById("bookingContainer");


// ------------------------------
// Filter Current User Bookings
// ------------------------------

const userBookings =
bookings.filter(function (booking) {

    return booking.email === loggedInUser.email;

});


// ------------------------------
// No Bookings
// ------------------------------

if (userBookings.length === 0) {

    bookingContainer.innerHTML = `

        <div class="no-booking">

            <i class="fa-solid fa-calendar-xmark"></i>

            <h2>No Bookings Yet</h2>

            <p>

                Your booked events will appear here.

            </p>

        </div>

    `;

}
else {

    userBookings.forEach(function (booking) {

        bookingContainer.innerHTML += `

        <div class="booking-card">

            <div class="booking-header">

                <h2>${booking.eventName}</h2>

                <span class="status ${booking.status.toLowerCase()}">

                    ${booking.status}

                </span>

            </div>

            <div class="booking-grid">

                <div>

                    <strong>Booking ID</strong>

                    <p>${booking.bookingId}</p>

                </div>

                <div>

                    <strong>Venue</strong>

                    <p>${booking.venueName}</p>

                </div>

                <div>

                    <strong>Location</strong>

                    <p>${booking.venueLocation}</p>

                </div>

                <div>

                    <strong>Guests</strong>

                    <p>${booking.guestCount}</p>

                </div>

                <div>

                    <strong>Venue Budget</strong>

                    <p>${booking.venueBudget}</p>

                </div>

                <div>

                    <strong>Estimated Budget</strong>

                    <p>₹${booking.estimatedBudget}</p>

                </div>

                <div>

                    <strong>Event Date</strong>

                    <p>${booking.eventDate}</p>

                </div>

                <div>

                    <strong>Booked On</strong>

                    <p>${booking.bookingDate}</p>

                </div>

                <div>

                    <strong>Booking Time</strong>

                    <p>${booking.bookingTime}</p>

                </div>

                <div>

                    <strong>Phone</strong>

                    <p>${booking.phone}</p>

                </div>

                <div>

                    <strong>Special Request</strong>

                    <p>${booking.specialRequest || "None"}</p>

                </div>

            </div>

        </div>

        `;

    });

}