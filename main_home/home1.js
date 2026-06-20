// ============================================================
//  DCL EVENT MANAGEMENT — home1.js
// ============================================================

// AOS — Scroll animations
AOS.init({
    duration: 1000,
    once: true
});

// ---- SCROLL PROGRESS BAR ----
window.addEventListener("scroll", () => {
    let scrollTop    = document.documentElement.scrollTop;
    let scrollHeight = document.documentElement.scrollHeight
                     - document.documentElement.clientHeight;
    let progress     = (scrollTop / scrollHeight) * 100;
    document.getElementById("progress").style.width = progress + "%";
});

// ---- NAVBAR SHADOW ON SCROLL ----
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".custom-navbar");
    if (window.scrollY > 50) {
        navbar.style.boxShadow = "0 5px 25px rgba(0,0,0,.35)";
    } else {
        navbar.style.boxShadow = "none";
    }
});

// ---- SERVICE CARD "VIEW DETAILS" TOGGLE ----
const buttons = document.querySelectorAll(".details-btn");
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const details = button.nextElementSibling;
        details.classList.toggle("show");
        if (details.classList.contains("show")) {
            button.innerText = "Hide Details";
        } else {
            button.innerText = "View Details";
        }
    });
});

// ---- COUNTER ANIMATION FOR STATS ----
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

// Start counters when the stats section enters the viewport
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

// ---- CONTACT FORM SUBMIT (basic feedback) ----
const submitBtn = document.querySelector(".submit-btn");
if (submitBtn) {
    submitBtn.addEventListener("click", () => {
        const inputs = document.querySelectorAll(".form-input");
        let allFilled = true;
        inputs.forEach(input => {
            if (!input.value.trim()) {
                allFilled = false;
                input.style.borderColor = "#ff4444";
                setTimeout(() => input.style.borderColor = "#eee", 2000);
            }
        });
        if (allFilled) {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.background = "#28a745";
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                submitBtn.style.background = "#ffc107";
                inputs.forEach(input => input.value = "");
            }, 3000);
        }
    });
}
const members = {

    hari:{
        img:"hari.png",
        name:"Hari Krishna S",
        role:"Wedding Specialist",
        location:"Bangalore",
        work:"Remote",
        phone:"+91 9876543210",
        desc:"Passionate developer and event specialist dedicated to creating memorable experiences.",
        linkedin:"#",
        github:"#",
        instagram:"#",
        email:"hari@gmail.com"
    },

    chaluva:{
        img:"chaluva.jpeg",
        name:"Chaluva Shetty",
        role:"Creative Director",
        location:"Bangalore",
        work:"Office",
        phone:"+91 9876543211",
        desc:"Leads creative planning and event branding.",
        linkedin:"#",
        github:"#",
        instagram:"#",
        email:"chaluva@gmail.com"
    },

    ujwal:{
        img:"ujwal.png",
        name:"Ujwal D",
        role:"Event Strategist",
        location:"Mysore",
        work:"Hybrid",
        phone:"+91 9876543212",
        desc:"Expert in event strategy and execution.",
        linkedin:"#",
        github:"#",
        instagram:"#",
        email:"ujwal@gmail.com"
    },

    chandan:{
        img:"chandan.png",
        name:"Chandan N",
        role:"Operations Head",
        location:"Tumkur",
        work:"Office",
        phone:"+91 9876543213",
        desc:"Manages logistics and event operations.",
        linkedin:"#",
        github:"#",
        instagram:"#",
        email:"chandan@gmail.com"
    }
};

const cards = document.querySelectorAll(".team-card");
const modal = document.getElementById("memberModal");

cards.forEach(card=>{

    card.addEventListener("click",()=>{

        const member = members[card.dataset.member];

        document.getElementById("modalImg").src = member.img;
        document.getElementById("modalName").textContent = member.name;
        document.getElementById("modalRole").textContent = member.role;
        document.getElementById("modalLocation").textContent = member.location;
        document.getElementById("modalWork").textContent = member.work;
        document.getElementById("modalPhone").textContent = member.phone;
        document.getElementById("modalDesc").textContent = member.desc;

        document.getElementById("modalLinkedin").href = member.linkedin;
        document.getElementById("modalGithub").href = member.github;
        document.getElementById("modalInstagram").href = member.instagram;
        document.getElementById("modalEmail").href = `mailto:${member.email}`;

        modal.classList.add("active");

    });

});

document.querySelector(".close-modal").addEventListener("click",()=>{

    modal.classList.remove("active");

});

window.addEventListener("click",(e)=>{

    if(e.target===modal){
        modal.classList.remove("active");
    }

});