// ============================== // AOS INIT // ============================== AOS.init({ duration: 1000, once: true }); // ============================== // NAVBAR SCROLL EFFECT // ============================== window.addEventListener("scroll", () => { const navbar = document.querySelector(".custom-navbar"); if (!navbar) return; if (window.scrollY > 50) { navbar.classList.add("navbar-scrolled"); } else { navbar.classList.remove("navbar-scrolled"); } }); // ============================== // SERVICES DROPDOWN // ============================== document.addEventListener("DOMContentLoaded", () => { const serviceBtn = document.querySelector(".service-btn"); const dropdown = document.querySelector(".service-dropdown"); if (!serviceBtn || !dropdown) return; serviceBtn.addEventListener("click", (e) => { e.preventDefault(); dropdown.classList.toggle("show"); }); document.addEventListener("click", (e) => { if ( !serviceBtn.contains(e.target) && !dropdown.contains(e.target) ) { dropdown.classList.remove("show"); } }); }); // ============================== // COUNTER ANIMATION // ============================== const statsSection = document.querySelector(".stats-section"); const counters = document.querySelectorAll(".counter"); let started = false; if (statsSection) { const observer = new IntersectionObserver((entries) => { entries.forEach(entry => { if ( entry.isIntersecting && !started ) { started = true; counters.forEach(counter => { const target = +counter.dataset.target; let count = 0; const updateCounter = () => { const increment = target / 100; count += increment; if (count < target) { counter.innerText = Math.floor(count); requestAnimationFrame( updateCounter ); } else { counter.innerText = target + "+"; } }; updateCounter(); }); } }); }, { threshold: 0.4 }); observer.observe(statsSection); } // ============================== // BUTTON HOVER EFFECT // ============================== const goldButtons = document.querySelectorAll( ".btn-gold, .btn-primary-custom" ); goldButtons.forEach(btn => { btn.addEventListener( "mouseenter", () => { btn.style.transform = "translateY(-5px)"; }); btn.addEventListener( "mouseleave", () => { btn.style.transform = "translateY(0px)"; }); }); // ============================== // FLOATING STAT CARDS EFFECT // ============================== const statCards = document.querySelectorAll(".stat-card"); statCards.forEach((card, index) => { card.style.animation = `floatAnim 3s ease-in-out ${index * .3}s infinite`; });
// ==============================
// AOS INIT
// ==============================

AOS.init({
    duration: 1000,
    once: true
});

// ==============================
// NAVBAR SCROLL EFFECT
// ==============================

window.addEventListener("scroll", () => {

    const navbar =
    document.querySelector(".custom-navbar");

    if (!navbar) return;

    if (window.scrollY > 50) {

        navbar.classList.add("navbar-scrolled");

    } else {

        navbar.classList.remove("navbar-scrolled");

    }

});

// ==============================
// SERVICES DROPDOWN
// ==============================

document.addEventListener("DOMContentLoaded", () => {

    const serviceBtn =
    document.querySelector(".service-btn");

    const dropdown =
    document.querySelector(".service-dropdown");

    if (!serviceBtn || !dropdown) return;

    serviceBtn.addEventListener("click", (e) => {

        e.preventDefault();

        dropdown.classList.toggle("show");

    });

    document.addEventListener("click", (e) => {

        if (
            !serviceBtn.contains(e.target) &&
            !dropdown.contains(e.target)
        ) {

            dropdown.classList.remove("show");

        }

    });

});

// ==============================
// COUNTER ANIMATION
// ==============================

const statsSection =
document.querySelector(".stats-section");

const counters =
document.querySelectorAll(".counter");

let started = false;

if (statsSection) {

    const observer =
    new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (
                entry.isIntersecting &&
                !started
            ) {

                started = true;

                counters.forEach(counter => {

                    const target =
                    +counter.dataset.target;

                    let count = 0;

                    const updateCounter = () => {

                        const increment =
                        target / 100;

                        count += increment;

                        if (count < target) {

                            counter.innerText =
                            Math.floor(count);

                            requestAnimationFrame(
                                updateCounter
                            );

                        } else {

                            counter.innerText =
                            target + "+";

                        }

                    };

                    updateCounter();

                });

            }

        });

    }, {
        threshold: 0.4
    });

    observer.observe(statsSection);

}

// ==============================
// BUTTON HOVER EFFECT
// ==============================

const goldButtons =
document.querySelectorAll(
".btn-gold, .btn-primary-custom"
);

goldButtons.forEach(btn => {

    btn.addEventListener(
    "mouseenter",
    () => {

        btn.style.transform =
        "translateY(-5px)";

    });

    btn.addEventListener(
    "mouseleave",
    () => {

        btn.style.transform =
        "translateY(0px)";

    });

});

// ==============================
// FLOATING STAT CARDS EFFECT
// ==============================

const statCards =
document.querySelectorAll(".stat-card");

statCards.forEach((card, index) => {

    card.style.animation =
    `floatAnim 3s ease-in-out ${index * .3}s infinite`;

});

// image flip effect

const images = document.querySelectorAll('.image-flip-container img');

let current = 0;

setInterval(() => {
    images[current].classList.remove('active');

    current = (current + 1) % images.length;

    images[current].classList.add('active');
}, 3000);

