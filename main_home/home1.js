//  SCROLL PROGRESS BAR Shows page reading progress at top

window.addEventListener("scroll", () => {
    let scrollTop    = document.documentElement.scrollTop;
    let scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let progress     = (scrollTop / scrollHeight) * 100;
    document.getElementById("progress").style.width = progress + "%";
});
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".custom-navbar");
    if (window.scrollY > 50) {
        navbar.style.boxShadow = "0 5px 25px rgba(0,0,0,.35)";
    } else {
        navbar.style.boxShadow = "none";
    }
});

  // EVENT DETAILS TOGGLE Opens and closes event detail cards
const buttons = document.querySelectorAll(".details-btn");
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const currentDetails = button.nextElementSibling;
        document.querySelectorAll(".event-details").forEach(details => {
            if (details !== currentDetails) {
                details.classList.remove("show");
                details.previousElementSibling.innerText = "View Details";
            }
        });
        currentDetails.classList.toggle("show");
        if (currentDetails.classList.contains("show")) {
            button.innerText = "Hide Details";
        } else {
            button.innerText = "View Details";
        }
    });
});

//    COUNTER ANIMATION FUNCTION Animates statistics numbers
function animateCounter(el) {
    const target   = parseInt(el.getAttribute("data-target"));
    const duration = 2000;
    const step     = target / (duration / 16);
    let   current  = 0;
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current);
    }, 16);
}
const statsSection = document.querySelector(".stats-section");
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll(".counter").forEach(animateCounter);
                observer.disconnect();
            }
        });
    }, { threshold: 0.3 });
    observer.observe(statsSection);
}
// const submitBtn = document.querySelector(".submit-btn");
// if (submitBtn) {
//     submitBtn.addEventListener("click", () => {
//         const inputs = document.querySelectorAll(".form-input");
//         let allFilled = true;
//         inputs.forEach(input => {
//             if (!input.value.trim()) {
//                 allFilled = false;
//                 input.style.borderColor = "#ff4444";
//                 setTimeout(() => input.style.borderColor = "#eee", 2000);
//             }
//         });
//         if (allFilled) {
//             submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
//             submitBtn.style.background = "#28a745";
//             setTimeout(() => {
//                 submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
//                 submitBtn.style.background = "#ffc107";
//                 inputs.forEach(input => input.value = "");
//             }, 3000);
//         }
//     });
// }
// const stars = document.querySelectorAll(".star");
// const ratingInput = document.getElementById("rating");

// stars.forEach(star => {

//     star.addEventListener("click", () => {

//         let rating = star.dataset.value;

//         ratingInput.value = rating;

//         stars.forEach(s => {
//             s.classList.remove("active");
//         });

//         for(let i=0;i<rating;i++){
//             stars[i].classList.add("active");
//         }

//     });

// });

// const reviewForm = document.getElementById("reviewForm");
// const reviewsContainer = document.getElementById("reviewsContainer");

// reviewForm.addEventListener("submit",(e)=>{

//     e.preventDefault();

//     const name = document.getElementById("name").value;
//     const location = document.getElementById("location").value;
//     const message = document.getElementById("message").value;
//     const rating = document.getElementById("rating").value;

//     if(!rating){
//         alert("Please select a rating");
//         return;
//     }

//     let starsHTML = "";

//     for(let i=0;i<rating;i++){
//         starsHTML += "⭐";
//     }

//     const reviewCard = document.createElement("div");

//     reviewCard.classList.add("review-card");

//     reviewCard.innerHTML = `
//         <h4>${name}</h4>
//         <div class="review-location">${location}</div>
//         <div class="review-stars">${starsHTML}</div>
//         <p class="review-message">${message}</p>
//     `;

//     reviewsContainer.prepend(reviewCard);

//     reviewForm.reset();

//     stars.forEach(star=>{
//         star.classList.remove("active");
//     });

// });
let selectedRating = 0;

const stars = document.querySelectorAll(".star");

stars.forEach(star => {

    star.addEventListener("click", () => {

        selectedRating = star.dataset.value;

        stars.forEach(s => s.classList.remove("active"));

        for(let i=0;i<selectedRating;i++){
            stars[i].classList.add("active");
        }

        document.getElementById("rating").value = selectedRating;

    });

});

const reviewForm = document.getElementById("reviewForm");
const reviewsContainer = document.getElementById("reviewsContainer");

loadReviews();

reviewForm.addEventListener("submit",(e)=>{

    e.preventDefault();

    const review = {

    id: Date.now(),              // <-- ADD THIS

    name: document.getElementById("name").value,

    email: document.getElementById("email").value,

    location: document.getElementById("location").value,

    rating: Number(document.getElementById("rating").value),

    message: document.getElementById("message").value,

    date: new Date().toLocaleString()

};

    let reviews =
        JSON.parse(localStorage.getItem("reviews")) || [];

    reviews.unshift(review);

    localStorage.setItem(
        "reviews",
        JSON.stringify(reviews)
    );

    displayReviews();

    reviewForm.reset();

    stars.forEach(star =>
        star.classList.remove("active")
    );

});

function loadReviews(){

    displayReviews();

}

function displayReviews(){

    const reviews =
        JSON.parse(localStorage.getItem("reviews")) || [];

    reviewsContainer.innerHTML = "";

    reviews.forEach(review => {

        let starsHTML = "";

        for(let i=0;i<review.rating;i++){

            starsHTML +=
            '<i class="fas fa-star"></i>';

        }

        const card = document.createElement("div");

        card.className =
        "col-lg-4 col-md-6";

        card.innerHTML = `

        <div class="review-card">

            <div class="review-stars">
                ${starsHTML}
            </div>
            <div class="reviewer">

                <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=f4b400&color=000">

                <div>

                    <h5>${review.name}</h5>
                    <p>${review.email}</p>

                    <span class="review-location">
                        ${review.location}
                    </span>

                </div>

            </div>

            <p class="review-text">
                "${review.message}"
            </p>


        </div>

        `;

        reviewsContainer.appendChild(card);

    });

}
const members = {
    hari: {
        img: "hari.jpeg",
        name: "Hari Krishna S",
        role: "Creative Director",
        location: "Bangalore",
        work: "Office",
        phone: "+91 8861662202",
        desc: "Passionate developer and event specialist dedicated to creating memorable experiences.",
        achievements: [
            "🏆 Designed and executed 50+ successful event themes",
            "🏆 Led branding campaigns for premium corporate events",
            "🏆 Increased attendee engagement through creative experiences",
            "🏆 Recognized for innovative event design excellence"
        ],
        linkedin:  "https://www.linkedin.com/in/hari-krishna-s-2023a8311",
        github:    "https://github.com/chandan-me/Event-Management",
        instagram: "https://www.instagram.com/harish_krishna_75",
        email:     "hari.krishna.sk.05@gmail.com"
    },
    chaluva: {
        img: "chaluva.jpeg",
        name: "Chaluva Shetty",
        role: "Client Relations Manager",
        location: "Bangalore",
        work: "Office",
        phone: "+91 7899663405",
        desc: "Leads client communication and ensures outstanding customer satisfaction.",
        achievements: [
            "🏆 Maintained 98% client satisfaction rate",
            "🏆 Successfully handled high-profile corporate clients",
            "🏆 Increased repeat client bookings and referrals"
        ],
        linkedin:  "https://www.linkedin.com/in/chaluvaraj-n-04a661313",
        github:    "https://github.com/chandan-me/Event-Management",
        instagram: "https://www.instagram.com/chaluva_shetty",
        email:     "chaluvashetty23@gmail.com"
    },
    ujwal: {
        img: "ujwal.png",
        name: "Ujwal D",
        role: "Event Strategist",
        location: "Bengaluru",
        work: "Office",
        phone: "+91 7349173075",
        desc: "Expert in event planning, budgeting and execution.",
        achievements: [
            "🏆 Successfully planned and managed 100+ events",
            "🏆 Achieved 95% on-time event delivery rate",
            "🏆 Optimized event budgets while maintaining quality"
        ],
        linkedin:  "https://www.linkedin.com/in/ujwal-d-2023a8311",
        github:    "https://github.com/chandan-me/Event-Management",
        instagram: "https://www.instagram.com/_ujwal_23",
        email:     "ujwaldhananjaya@gmail.com"
    },
    chandan: {
        img: "chandan.png",
        name: "Chandan N",
        role: "Operations Head",
        location: "Bengaluru",
        work: "Office",
        phone: "+91 9876543213",
        desc: "Manages logistics, vendors and smooth event operations.",
        achievements: [
            "🏆 Managed logistics for large-scale events with 5000+ attendees",
            "🏆 Coordinated multi-city event operations successfully",
            "🏆 Reduced operational costs through efficient planning",
            "🏆 Maintained seamless event execution with minimal disruptions"
        ],
        linkedin:  "https://www.linkedin.com/in/chandan-niranjan",
        github:    "https://github.com/chandan-me/Event-Management",
        instagram: "https://www.instagram.com/chandan_niranjan",
        email:     "chandan2004.n@gmail.com"
    }
};
const modal    = document.getElementById("memberModal");
const cards    = document.querySelectorAll(".team-card");
const closeBtn = document.querySelector(".close-modal");
cards.forEach(card => {
    card.addEventListener("click", () => {
        const member = members[card.dataset.member];
        if (!member) return;
        document.getElementById("modalImg").src               = member.img;
        document.getElementById("modalName").textContent      = member.name;
        document.getElementById("modalRole").textContent      = member.role;
        document.getElementById("modalLocation").textContent  = member.location;
        document.getElementById("modalWork").textContent      = member.work;
        document.getElementById("modalPhone").textContent     = member.phone;
        document.getElementById("modalDesc").textContent      = member.desc;
        document.getElementById("modalAchievements").innerHTML =
            member.achievements.map(a => `<li>${a}</li>`).join("");
        document.getElementById("modalLinkedin").href  = member.linkedin;
        document.getElementById("modalGithub").href    = member.github;
        document.getElementById("modalInstagram").href = member.instagram;
        document.getElementById("modalEmail").href     = `mailto:${member.email}`;
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    });
});
closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
});
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
    }
});

// Dropdown

document.addEventListener("DOMContentLoaded",()=>{

const serviceBtn =
document.querySelector(".service-btn");

const dropdown =
document.querySelector(".service-dropdown");

if(!serviceBtn || !dropdown) return;

serviceBtn.addEventListener("click",(e)=>{

e.preventDefault();

dropdown.classList.toggle("show");

});

document.addEventListener("click",(e)=>{

if(
!serviceBtn.contains(e.target)
&&
!dropdown.contains(e.target)
){

dropdown.classList.remove("show");

}

});

});

document.getElementById("reviewForm").addEventListener("submit", function(e) {

    // e.preventDefault(); // Stops the form from submitting

    alert("✅ Your review has been submitted successfully!\n\nThank you for your feedback.");

    this.reset();

});