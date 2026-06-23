// AOS

AOS.init({
    duration:1000,
    once:true
});

// Navbar Scroll

window.addEventListener("scroll",()=>{

    const navbar =
    document.querySelector(".custom-navbar");

    if(window.scrollY > 50){

        navbar.style.background =
        "rgba(0,0,0,.85)";

    }else{

        navbar.style.background =
        "rgba(0,0,0,.4)";
    }

});

// Loader

window.addEventListener("load",()=>{

    const loader =
    document.querySelector(".loader");

    if(loader){

        loader.style.opacity = "0";

        setTimeout(()=>{

            loader.style.display = "none";

        },500);

    }

});

// Counter Animation

const statsSection =
document.querySelector(".why-choose-section");

const counters =
document.querySelectorAll(".counter");

let started = false;

const observer =
new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting && !started){

            started = true;

            counters.forEach(counter=>{

                const target =
                +counter.dataset.target;

                let count = 0;

                const updateCounter = ()=>{

                    const increment =
                    target / 100;

                    count += increment;

                    if(count < target){

                        counter.innerText =
                        Math.floor(count);

                        requestAnimationFrame(updateCounter);

                    }else{

                        counter.innerText =
                        target + "+";
                    }

                };

                updateCounter();

            });

        }

    });

},{
    threshold:0.4
});

if(statsSection){
    observer.observe(statsSection);
}

// Section Animation

const whySection =
document.querySelector(".why-choose-section");

const whyObserver =
new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            whySection.classList.add("show");

        }

    });

},{
    threshold:0.2
});

if(whySection){
    whyObserver.observe(whySection);
}

(function () {
  'use strict';

  const helpBtn = document.querySelector('.need-help-btn');

  if (!helpBtn) return;

  function startPulse() {
    helpBtn.classList.add('pulse');
    window.setTimeout(function () {
      helpBtn.classList.remove('pulse');
    }, 1100);
  }

  // First pulse quickly for page load feel
  window.setTimeout(function () {
    startPulse();
  }, 600);

  window.setInterval(function () {
    startPulse();
  }, 4200);
})();

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