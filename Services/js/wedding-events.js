// AOS Animation
AOS.init({
    duration: 1200,
    once: true
});


// ======================
// Loader
// ======================

window.addEventListener("load", () => {

    setTimeout(() => {

        const loader = document.getElementById("loader");

        if(loader){
            loader.style.display = "none";
        }

    }, 1000);

});

const heroVideo = document.getElementById("heroVideo");

heroVideo.playbackRate = 2.0;

// ======================
// Counter Animation
// ======================

const counters = document.querySelectorAll(".counter");

function startCounter() {

    counters.forEach(counter => {

        counter.innerText = "0";

        const target = +counter.dataset.target;

        const updateCounter = () => {

            const count = +counter.innerText;

            const increment = target / 100;

            if (count < target) {

                counter.innerText =
                    Math.ceil(count + increment);

                setTimeout(updateCounter, 20);

            } else {

                counter.innerText = target + "+";

            }
        };

        updateCounter();

    });

}


// Start Counter When Section Visible

const statsSection =
document.querySelector(".stats-section");

let counterStarted = false;

if(statsSection){

    const statsObserver =
    new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if(entry.isIntersecting && !counterStarted){

                startCounter();

                counterStarted = true;

            }

        });

    }, {
        threshold: 0.3
    });

    statsObserver.observe(statsSection);

}


// ======================
// Back To Top Button
// ======================

const topBtn =
document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if(topBtn){

        if(window.scrollY > 300){

            topBtn.style.display = "block";

        }else{

            topBtn.style.display = "none";

        }

    }

});


if(topBtn){

    topBtn.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


// ======================
// Floating Petals
// ======================

const petalsContainer =
document.getElementById("petals-container");

if(petalsContainer){

    for(let i = 0; i < 25; i++){

        let petal =
        document.createElement("div");

        petal.classList.add("petal");

        petal.innerHTML = "🌸";

        petal.style.left =
        Math.random() * 100 + "vw";

        petal.style.animationDuration =
        Math.random() * 5 + 5 + "s";

        petal.style.fontSize =
        Math.random() * 15 + 15 + "px";

        petalsContainer.appendChild(petal);

    }

}


// ======================
// Timeline Animation
// ======================

const timelineSteps =
document.querySelectorAll(".timeline-step");

const timelineObserver =
new IntersectionObserver((entries) => {

    entries.forEach((entry, index) => {

        if(entry.isIntersecting){

            setTimeout(() => {

                entry.target.style.opacity = "1";

                entry.target.style.transform =
                "translateY(0)";

            }, index * 250);

        }

    });

},{
    threshold: 0.3
});

timelineSteps.forEach(step => {

    step.style.opacity = "0";

    step.style.transform =
    "translateY(80px)";

    step.style.transition =
    "all .8s ease";

    timelineObserver.observe(step);

});


// ======================
// Smooth Scroll
// ======================

document.querySelectorAll('a[href^="#"]')
.forEach(anchor => {

    anchor.addEventListener("click",
    function(e){

        e.preventDefault();

        const target =
        document.querySelector(
            this.getAttribute("href")
        );

        if(target){

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});

