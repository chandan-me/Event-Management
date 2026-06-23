// =========================
// AOS
// =========================

AOS.init({
    duration: 1200,
    once: true
});


// =========================
// Hero Animation
// =========================

window.addEventListener("load", () => {

    document.querySelector(".hero-content")
    .classList.add("show");

});


// =========================
// Counter Animation
// =========================

const counters =
document.querySelectorAll(".counter");

function startCounter(){

    counters.forEach(counter => {

        const target =
        +counter.dataset.target;

        let count = 0;

        const increment =
        target / 100;

        const updateCounter = () => {

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

let started = false;

const statsObserver =
new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting && !started){

            startCounter();

            started = true;

        }

    });

},{
    threshold:0.3
});

if(statsSection){
    statsObserver.observe(statsSection);
}


// =========================
// Timeline Animation
// =========================

const timelineItems =
document.querySelectorAll(".timeline-item");

const timelineObserver =
new IntersectionObserver((entries)=>{

    entries.forEach((entry,index)=>{

        if(entry.isIntersecting){

            setTimeout(()=>{

                entry.target.classList.add("active");

            },index * 250);

        }

    });

},{
    threshold:0.2
});

timelineItems.forEach(item=>{
    timelineObserver.observe(item);
});


// =========================
// Gallery Pause On Hover
// =========================

const galleryTrack =
document.querySelector(".gallery-track");

if(galleryTrack){

    galleryTrack.addEventListener("mouseenter",()=>{

        galleryTrack.style.animationPlayState =
        "paused";

    });

    galleryTrack.addEventListener("mouseleave",()=>{

        galleryTrack.style.animationPlayState =
        "running";

    });

}


// =========================
// Back To Top
// =========================

const topBtn =
document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

    if(window.scrollY > 400){

        topBtn.style.display = "block";

    }else{

        topBtn.style.display = "none";

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


// =========================
// Smooth Scroll
// =========================

document.querySelectorAll('a[href^="#"]')
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



// =========================
// Service Card Tilt Effect
// =========================

const cards =
document.querySelectorAll(
".service-card"
);

cards.forEach(card=>{

    card.addEventListener("mousemove",
    (e)=>{

        const rect =
        card.getBoundingClientRect();

        const x =
        e.clientX - rect.left;

        const y =
        e.clientY - rect.top;

        const rotateY =
        ((x / rect.width)-0.5)*10;

        const rotateX =
        ((y / rect.height)-0.5)*-10;

        card.style.transform =
        `perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-10px)`;

    });

    card.addEventListener("mouseleave",
    ()=>{

        card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0)";

    });

});


// =========================
// Hero Video Speed
// =========================

const heroVideo =
document.querySelector(".hero-video");

if(heroVideo){

    heroVideo.playbackRate = 1.25;

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