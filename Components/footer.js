// ===============================
// COUNTER
// ===============================

const counters = document.querySelectorAll(".counter");

const animateCounterFooter = () => {

    counters.forEach(counter => {

        const target = +counter.dataset.target;

        const value = +counter.innerText;

        const increment = Math.ceil(target / 100);

        if (value < target) {

            counter.innerText = value + increment ;

            setTimeout(animateCounter, 20);

        } else {

            counter.innerText = target + "+";

        }

    });

};

const stats = document.querySelector(".footer-stats");

if (stats) {

    const observer = new IntersectionObserver(entries => {

        if (entries[0].isIntersecting) {

            animateCounter();

            observer.disconnect();

        }

    });

    observer.observe(stats);

}

// ===============================
// REVEAL
// ===============================

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {

    const windowHeight = window.innerHeight;

    reveals.forEach(item => {

        const top = item.getBoundingClientRect().top;

        if (top < windowHeight - 100) {

            item.classList.add("active");

        }

    });

}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();

// ===============================
// NEWSLETTER DEMO
// ===============================

document.addEventListener("click", function(e){

    if(!e.target.matches(".newsletter button")) return;

    const input = document.querySelector(".newsletter input");

    const email = input.value.trim();

    if(email===""){

        alert("Please enter your email.");

        return;

    }

    const popup = document.getElementById("subscribePopup");

        popup.classList.add("show");

        setTimeout(()=>{

            popup.classList.remove("show");

        },4000);

        document.querySelector(".newsletter input").value="";

    input.value="";

});

const popupClose = document.getElementById("popupClose");

popupClose?.addEventListener("click",()=>{

    document.getElementById("subscribePopup")
        .classList.remove("show");

});