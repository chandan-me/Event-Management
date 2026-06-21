AOS.init({
    duration: 1000,
    once: true
});
window.addEventListener("scroll", () => {
    let scrollTop    = document.documentElement.scrollTop;
    let scrollHeight = document.documentElement.scrollHeight
                     - document.documentElement.clientHeight;
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
const buttons = document.querySelectorAll(".details-btn");
butons.forEach(button => {
    button.addEventListener("click", () => {
        const currentDetails = button.nextElementSibling;
        document.querySelectorAll(".event-details").forEach(details => {
            if(details !== currentDetails){
                details.classList.remove("show");
                details.previousElementSibling.innerText = "View Details";
            }
        });
        currentDetails.classList.toggle("show");
        if(currentDetails.classList.contains("show")){
            button.innerText = "Hide Details";
        }
        else{
            button.innerText = "View Details";
        }
    });
});
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
        img:"hari.jpeg",
        name:"Hari Krishna S",
        role:"Wedding Specialist",
        location:"Bangalore",
        work:"Office",
        phone:"+91 8861662202",
        desc:"Passionate developer and event specialist dedicated to creating memorable experiences.",
        achievements:["🏆 Designed and executed 50+ successful event themes", "🏆 Led branding campaigns for premium corporate events", "🏆 Increased attendee engagement through creative experiences", "🏆 Recognized for innovative event design excellence"],
        linkedin:"https://www.linkedin.com/in/hari-krishna-s-2023a8311?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        github:"https://github.com/chandan-me/Event-Management",
        instagram:"https://www.instagram.com/harish_krishna_75?igsh=MXZsNTl2anNpbjFoOQ=",
        email:"hari.krishna.sk.05@gmail.com"
    },
    chaluva:{
        img:"chaluva.jpeg",
        name:"Chaluva Shetty",
        role:"Client Relations Manager",
        location:"Bangalore",
        work:"Office",
        phone:"+91 7899663405",
        desc:"Leads creative planning and event branding.",
        achievements:["🏆 Maintained 98% client satisfaction rate","🏆 Successfully handled high-profile corporate clients","🏆 Increased repeat client bookings and referrals"],
        linkedin:"https://www.linkedin.com/in/chaluvaraj-n-04a661313?utm_source=share_via&utm_content=profile&utm_medium=member_androi",
        github:"https://github.com/chandan-me/Event-Management",
        instagram:"https://www.instagram.com/chaluva_shetty?igsh=MXZsNTl2anNpbjFoOQ=",
        email:"chaluvashetty23@gmail.com "
    },
    ujwal:{
        img:"ujwal.png",
        name:"Ujwal D",
        role:"Event Strategist",
        location:"Bengaluru",
        work:"Office",
        phone:"+91 73491 73075",
        desc:"Expert in event strategy and execution.",
        achievements:["🏆 Successfully planned and managed 100+ events","🏆 Achieved 95% on-time event delivery rate","🏆 Optimized event budgets while maintaining quality"],
        linkedin:"https://www.linkedin.com/in/ujwal-d-2023a8311?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        github:"https://github.com/chandan-me/Event-Management",
        instagram:"https://www.instagram.com/_ujwal_23?igsh=MXRrNmp4YWZsZHo1ag==",
        email:"ujwaldhananjaya@gmail.com "
    },
    chandan:{
        img:"chandan.png",
        name:"Chandan N",
        role:"Operations Head",
        location:"Bengaluru",
        work:"Office",
        phone:"+91 9876543213",
        desc:"Manages logistics and event operations.",
        achievements:[" 🏆 Managed logistics for large-scale events with 5000+ attendees","🏆 Coordinated multi-city event operations successfully.","🏆 Reduced operational costs through efficient planning.","🏆 Maintained seamless event execution with minimal disruptions"], 
        linkedin:"https://www.linkedin.com/in/chandan-niranjan/",
        github:"https://github.com/chandan-me/Event-Management",
        instagram:"https://www.instagram.com/chandan_niranjan?igsh=MXZsNTl2anNpbjFoOQ=",
        email:"chandan2004.n@gmail.com"
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
        document.getElementById("modalAchievements").innerHTML = member.achievements.map(ach => `<li>${ach}</li>`).join("");
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