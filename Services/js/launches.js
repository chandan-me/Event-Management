window.addEventListener("load", () => {
    document.getElementById("loader")
        .classList.add("fade-out");
});

const counters = document.querySelectorAll(".counter");

const startCounter = (counter) => {

    const target = +counter.getAttribute("data-target");

    let count = 0;

    const increment = target / 100;

    const updateCounter = () => {

        if(count < target){

            count += increment;

            counter.innerText = Math.ceil(count) + "+";

            requestAnimationFrame(updateCounter);

        } else {

            counter.innerText = target + "+";
        }
    };

    updateCounter();
};

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            const counter = entry.target;

            startCounter(counter);

            observer.unobserve(counter);
        }
    });

},{
    threshold:0.5
});

counters.forEach(counter => {
    observer.observe(counter);
});

const backToTop =
document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if(window.scrollY > 400){
        backToTop.style.display = "block";
    }
    else{
        backToTop.style.display = "none";
    }
});

backToTop.addEventListener("click", () => {

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

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