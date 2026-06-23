// ==========================
// AOS INITIALIZATION
// ==========================

AOS.init({
    duration: 1200,
    once: true
});


// ==========================
// HERO VIDEO SPEED
// ==========================

const heroVideo =
document.querySelector(".hero-video");

if(heroVideo){

    heroVideo.playbackRate = 1.25;

}


// ==========================
// HERO CONTENT ANIMATION
// ==========================

window.addEventListener("load",()=>{

    const heroContent =
    document.querySelector(".hero-content");

    if(heroContent){

        heroContent.style.opacity = "1";
        heroContent.style.transform =
        "translateY(0)";

    }

});


// ==========================
// COUNTER ANIMATION
// ==========================

const counters =
document.querySelectorAll(".counter");

function startCounter(){

    counters.forEach(counter=>{

        const target =
        +counter.dataset.target;

        let count = 0;

        const increment =
        target / 100;

        const updateCounter = ()=>{

            if(count < target){

                count += increment;

                counter.innerText =
                Math.ceil(count);

                setTimeout(updateCounter,20);

            }else{

                counter.innerText =
                target + "+";

            }

        };

        updateCounter();

    });

}

const statsSection =
document.querySelector(".stats-section");

let counterStarted = false;

if(statsSection){

    const observer =
    new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(
                entry.isIntersecting &&
                !counterStarted
            ){

                startCounter();

                counterStarted = true;

            }

        });

    },{

        threshold:0.3

    });

    observer.observe(statsSection);

}


// ==========================
// JOURNEY CARD ANIMATION
// ==========================

const journeyCards =
document.querySelectorAll(".journey-card");

const journeyObserver =
new IntersectionObserver((entries)=>{

    entries.forEach((entry,index)=>{

        if(entry.isIntersecting){

            setTimeout(()=>{

                entry.target.classList.add(
                "show-card"
                );

            },index*200);

        }

    });

},{
    threshold:0.2
});

journeyCards.forEach(card=>{

    journeyObserver.observe(card);

});


// ==========================
// CATEGORY CARD PARALLAX
// ==========================

const categoryCards =
document.querySelectorAll(".category-card");

categoryCards.forEach(card=>{

    card.addEventListener("mousemove",
    (e)=>{

        const rect =
        card.getBoundingClientRect();

        const x =
        e.clientX - rect.left;

        const y =
        e.clientY - rect.top;

        const rotateY =
        ((x / rect.width)-0.5)*8;

        const rotateX =
        ((y / rect.height)-0.5)*-8;

        card.style.transform =
        `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.03)
        `;

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform =
        `
        perspective(1000px)
        rotateX(0deg)
        rotateY(0deg)
        scale(1)
        `;

    });

});


// ==========================
// TOP BUTTON
// ==========================

const topBtn =
document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

    if(window.scrollY > 500){

        topBtn.style.display =
        "block";

    }else{

        topBtn.style.display =
        "none";

    }

});

if(topBtn){

    topBtn.addEventListener("click",()=>{

        window.scrollTo({

            top:0,
            behavior:"smooth"

        });

    });

}


// ==========================
// SMOOTH SCROLL
// ==========================

document
.querySelectorAll('a[href^="#"]')
.forEach(anchor=>{

    anchor.addEventListener("click",
    function(e){

        e.preventDefault();

        const target =
        document.querySelector(
            this.getAttribute("href")
        );

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});


// ==========================
// IMAGE REVEAL EFFECT
// ==========================

const images =
document.querySelectorAll(
".category-card img"
);

images.forEach(img=>{

    img.addEventListener("mouseenter",()=>{

        img.style.filter =
        "brightness(1.1)";

    });

    img.addEventListener("mouseleave",()=>{

        img.style.filter =
        "brightness(1)";

    });

});


// ==========================
// CTA PULSE EFFECT
// ==========================

const ctaBtn =
document.querySelector(
".cta-section .btn-gold"
);

if(ctaBtn){

    setInterval(()=>{

        ctaBtn.classList.add("pulse");

        setTimeout(()=>{

            ctaBtn.classList.remove(
            "pulse"
            );

        },1000);

    },3000);

}

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