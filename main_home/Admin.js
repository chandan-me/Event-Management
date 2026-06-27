// ===============================
// ADMIN REVIEW MANAGEMENT SYSTEM
// ===============================

let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

const reviewList = document.getElementById("reviewList");
const searchInput = document.getElementById("searchInput");
const ratingFilter = document.getElementById("ratingFilter");

const totalReviews = document.getElementById("totalReviews");
const averageRating = document.getElementById("averageRating");
const fiveStar = document.getElementById("fiveStar");

const modal = document.getElementById("editModal");
const closeBtn = document.querySelector(".close");

const editName = document.getElementById("editName");
const editEmail = document.getElementById("editEmail");
const editLocation = document.getElementById("editLocation");
const editRating = document.getElementById("editRating");
const editMessage = document.getElementById("editMessage");
const saveReview = document.getElementById("saveReview");

let currentReviewId = null;

//========================================
// STAR GENERATOR
//========================================

function createStars(rating){

    let stars="";

    for(let i=1;i<=5;i++){

        if(i<=Math.floor(rating)){

            stars+='<i class="fas fa-star"></i>';

        }

        else if(rating%1!==0 && i===Math.ceil(rating)){

            stars+='<i class="fas fa-star-half-alt"></i>';

        }

        else{

            stars+='<i class="far fa-star"></i>';

        }

    }

    return stars;

}

//========================================
// DASHBOARD
//========================================

function updateDashboard(){

    totalReviews.innerText = reviews.length;

    if(reviews.length===0){

        averageRating.innerHTML="0 ⭐";
        fiveStar.innerHTML="0";
        return;

    }

    const avg = reviews.reduce((sum,r)=>sum+Number(r.rating),0)/reviews.length;

    averageRating.innerHTML = avg.toFixed(1)+" ⭐";

    fiveStar.innerHTML = reviews.filter(r=>Number(r.rating)==5).length;

}

//========================================
// DISPLAY REVIEWS
//========================================

function displayReviews(data){

    reviewList.innerHTML="";

    if(data.length===0){

        reviewList.innerHTML=`
        <h2 style="text-align:center;width:100%;color:#888;">
        No Reviews Found
        </h2>
        `;

        return;

    }

    data.forEach(review=>{

        reviewList.innerHTML += `

        <div class="review-card">

            <h3>${review.name}</h3>

            <span>${review.location}</span><br>

            <span>${review.email}</span><br>

            <span>${review.date || ""}</span>

            <div class="stars">

                ${createStars(review.rating)}

            </div>

            <p>${review.message}</p>

            <div class="review-buttons">

                <button
                class="edit-btn"
                onclick="editReview(${review.id})">

                Edit

                </button>

                <button
                class="delete-btn"
                onclick="deleteReview(${review.id})">

                Delete

                </button>

            </div>

        </div>

        `;

    });

}

//========================================
// DELETE
//========================================

function deleteReview(id){

    if(!confirm("Delete this review?")) return;

    reviews = reviews.filter(r=>r.id!==id);

    localStorage.setItem("reviews",JSON.stringify(reviews));

    updateDashboard();

    displayReviews(reviews);

}

//========================================
// EDIT
//========================================

function editReview(id){

    const review = reviews.find(r=>r.id===id);

    if(!review) return;

    currentReviewId=id;

    editName.value = review.name;
    editEmail.value = review.email;
    editLocation.value = review.location;
    editRating.value = review.rating;
    editMessage.value = review.message;

    modal.classList.add("active");

}

//========================================
// SAVE
//========================================

saveReview.addEventListener("click",()=>{

    const review = reviews.find(r=>r.id===currentReviewId);

    if(!review) return;

    review.name = editName.value;

    review.email = editEmail.value;

    review.location = editLocation.value;

    review.rating = Number(editRating.value);

    review.message = editMessage.value;

    localStorage.setItem("reviews",JSON.stringify(reviews));

    modal.classList.remove("active");

    updateDashboard();

    displayReviews(reviews);

});

//========================================
// CLOSE MODAL
//========================================

closeBtn.addEventListener("click",()=>{

    modal.classList.remove("active");

});

window.addEventListener("click",(e)=>{

    if(e.target===modal){

        modal.classList.remove("active");

    }

});

//========================================
// SEARCH
//========================================

searchInput.addEventListener("keyup",()=>{

    const keyword = searchInput.value.toLowerCase();

    const filtered = reviews.filter(review=>

        review.name.toLowerCase().includes(keyword)

    );

    displayReviews(filtered);

});

//========================================
// FILTER
//========================================

ratingFilter.addEventListener("change",()=>{

    const value = ratingFilter.value;

    if(value==="all"){

        displayReviews(reviews);

        return;

    }

    const filtered = reviews.filter(review=>

        Number(review.rating)==Number(value)

    );

    displayReviews(filtered);

});

//========================================
// INITIAL LOAD
//========================================

reviews.sort((a,b)=>b.id-a.id);

updateDashboard();

displayReviews(reviews);

// ========================================
// BOOKING MANAGEMENT SYSTEM
// APPEND BELOW EXISTING REVIEW CODE
// ========================================

let bookings =
JSON.parse(localStorage.getItem("bookings")) || [];

const bookingContainer =
document.getElementById("bookingContainer");

const bookingSearch =
document.getElementById("bookingSearch");

const totalBookings =
document.getElementById("totalBookings");

const pendingBookings =
document.getElementById("pendingBookings");

const approvedBookings =
document.getElementById("approvedBookings");

const rejectedBookings =
document.getElementById("rejectedBookings");


// ========================================
// UPDATE BOOKING DASHBOARD
// ========================================

function updateBookingDashboard(){

    totalBookings.innerText =
    bookings.length;

    pendingBookings.innerText =
    bookings.filter(b=>b.status==="Pending").length;

    approvedBookings.innerText =
    bookings.filter(b=>b.status==="Approved").length;

    rejectedBookings.innerText =
    bookings.filter(b=>b.status==="Rejected").length;

}


// ========================================
// DISPLAY BOOKINGS
// ========================================

function displayBookings(data){

    bookingContainer.innerHTML="";

    if(data.length===0){

        bookingContainer.innerHTML=`

        <div class="empty-bookings">

            <i class="fa-solid fa-calendar-xmark"></i>

            <h3>No Bookings Found</h3>

            <p>No Event Bookings Available.</p>

        </div>

        `;

        return;

    }

    data.forEach(booking=>{

        bookingContainer.innerHTML+=`

        <div class="booking-card">

            <div class="booking-header">

                <h3>${booking.eventName}</h3>

                <span class="booking-status ${booking.status.toLowerCase()}">

                    ${booking.status}

                </span>

            </div>

            <div class="booking-details">

                <div class="booking-item">

                    <strong>Name</strong>

                    <span>${booking.name}</span>

                </div>

                <div class="booking-item">

                    <strong>Phone</strong>

                    <span>${booking.phone}</span>

                </div>

                <div class="booking-item">

                    <strong>Email</strong>

                    <span>${booking.email}</span>

                </div>

                <div class="booking-item">

                    <strong>Venue</strong>

                    <span>${booking.venueName}</span>

                </div>

                <div class="booking-item">

                    <strong>Location</strong>

                    <span>${booking.venueLocation}</span>

                </div>

                <div class="booking-item">

                    <strong>Guests</strong>

                    <span>${booking.guestCount}</span>

                </div>

                <div class="booking-item">

                    <strong>Venue Budget</strong>

                    <span>${booking.venueBudget}</span>

                </div>

                <div class="booking-item">

                    <strong>Estimated Budget</strong>

                    <span>₹${booking.estimatedBudget}</span>

                </div>

                <div class="booking-item">

                    <strong>Event Date</strong>

                    <span>${booking.eventDate}</span>

                </div>

                <div class="booking-item">

                    <strong>Booked On</strong>

                    <span>${booking.bookingDate}</span>

                </div>

                <div class="booking-item">

                    <strong>Booking Time</strong>

                    <span>${booking.bookingTime}</span>

                </div>

                <div class="booking-item">

                    <strong>Request</strong>

                    <span>${booking.specialRequest || "None"}</span>

                </div>

            </div>

            <div class="booking-actions">

                <button
                class="approve-btn"
                onclick="approveBooking('${booking.bookingId}')">

                Approve

                </button>

                <button
                class="reject-btn"
                onclick="rejectBooking('${booking.bookingId}')">

                Reject

                </button>

            </div>

        </div>

        `;

    });

}


// ========================================
// APPROVE BOOKING
// ========================================

function approveBooking(id){

    const booking =
    bookings.find(b=>b.bookingId===id);

    if(!booking) return;

    booking.status="Approved";

    localStorage.setItem(
        "bookings",
        JSON.stringify(bookings)
    );

    updateBookingDashboard();

    displayBookings(bookings);

}


// ========================================
// REJECT BOOKING
// ========================================

function rejectBooking(id){

    const booking =
    bookings.find(b=>b.bookingId===id);

    if(!booking) return;

    booking.status="Rejected";

    localStorage.setItem(
        "bookings",
        JSON.stringify(bookings)
    );

    updateBookingDashboard();

    displayBookings(bookings);

}


// ========================================
// SEARCH BOOKINGS
// ========================================

bookingSearch.addEventListener("keyup",function(){

    const keyword =
    this.value.toLowerCase();

    const filtered =
    bookings.filter(booking=>

        booking.name.toLowerCase().includes(keyword) ||

        booking.eventName.toLowerCase().includes(keyword) ||

        booking.venueName.toLowerCase().includes(keyword)

    );

    displayBookings(filtered);

});


// ========================================
// INITIAL LOAD
// ========================================

bookings.sort((a,b)=>b.id-a.id);

updateBookingDashboard();

displayBookings(bookings);