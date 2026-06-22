const counters = document.querySelectorAll(".counter");
if (counters.length > 0) {
    counters.forEach((counter) => {
        const updateCounter = () => {
            const target = +counter.getAttribute("data-target");
            const count = +counter.innerText.replace("+", "").replace("%", "");
            const increment = target / 100;
            if (count < target) {
                let value = Math.ceil(count + increment);
                if (target === 99) {
                    counter.innerText = value + "%";
                } else {
                    counter.innerText = value + "+";
                }
                setTimeout(updateCounter, 20);
            } else {
                if (target === 99) {
                    counter.innerText = target + "%";
                } else {
                    counter.innerText = target + "+";
                }
            }
        };
        updateCounter();
    });
}
const words = ["Corporate Event", "Wedding", "Conference", "Product Launch"];
let i = 0;
let j = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[i];
    if (!isDeleting) {
        j++;
    } else {
        j--;
    }
    const typingText = document.getElementById("typing-text");
    if (typingText) {
        typingText.innerHTML = currentWord.substring(0, j);
    }
    if (!isDeleting && j === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1200);
        return;
    }
    if (isDeleting && j === 0) {
        isDeleting = false;
        i++;
        if (i === words.length) {
            i = 0;
        }
    }
    setTimeout(typeEffect, isDeleting ? 60 : 120);
}
typeEffect();

function calculateBudget() {
    let guests = Number(document.getElementById("guests").value);
    let eventCost = Number(document.getElementById("eventType").value);
    let catering = Number(document.getElementById("catering").value);
    let season = Number(document.getElementById("season").value);
    let slot = Number(document.getElementById("slot").value);
    let duration = Number(document.getElementById("duration").value);
    if (!Number.isFinite(guests) || guests <= 0) {
        document.getElementById("result").innerHTML =
            "Please enter a valid guest count";
        return;
    }
    eventCost = Number.isFinite(eventCost) && eventCost > 0 ? eventCost : 1;
    catering = Number.isFinite(catering) && catering > 0 ? catering : 1;
    season = Number.isFinite(season) && season > 0 ? season : 1;
    slot = Number.isFinite(slot) && slot > 0 ? slot : 1;
    duration = Number.isFinite(duration) && duration > 0 ? duration : 1;
    let venueCost = guests * eventCost;
    let cateringCost = guests * catering;
    let baseCost = venueCost + cateringCost;
    let total = baseCost * season * slot * duration;
    const resultEl = document.getElementById("result");
    const breakdownEl = document.getElementById("breakdown");
    const totalRounded = Math.round(total);
    resultEl.innerHTML =
        "Estimated Budget : â‚¹ " + totalRounded.toLocaleString();
    const discountRate = 0.08;
    const discountAmount = Math.round(total * discountRate);
    const discountedTotal = total - discountAmount;
    breakdownEl.innerHTML = ` <div class="card mt-4 p-3"> <p> Venue Cost : â‚¹ ${venueCost.toLocaleString()} </p> <p> Catering Cost : â‚¹ ${cateringCost.toLocaleString()} </p> <p> Base Cost : â‚¹ ${baseCost.toLocaleString()} </p> <hr> <p> Discount (10%) : - â‚¹ ${discountAmount.toLocaleString()} </p> <h5> Final Budget : â‚¹ ${Math.round(discountedTotal).toLocaleString()} </h5> </div> `;
    let scale = Math.min(100, Math.floor(guests / 5));
    document.getElementById("eventScale").style.width = scale + "%";
    document.getElementById("eventScale").innerText = scale + "%";
    let recommendation = "";
    if (guests < 50) {
        recommendation = "Perfect for a small and intimate gathering.";
    } else if (guests < 200) {
        recommendation = "Ideal for a medium-sized event.";
    } else {
        recommendation = "Large-scale event. Dedicated planning team recommended.";
    }
    const recommendationBox = document.getElementById("recommendation");
    if (recommendationBox) {
        recommendationBox.innerText = recommendation;
    }
}
const topBtn = document.getElementById("topBtn");
if (topBtn) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }
    });
    topBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}
const cards = document.querySelectorAll(
    ".info-card,.process-card,.testimonial-card",
);
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
});
cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
    card.style.transition = "all .8s ease";
    observer.observe(card);
});
const form = document.querySelector("form");
if (form) {
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        alert("Thank you! Your event inquiry has been submitted.");
        form.reset();
    });
}
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.style.background = "rgba(15,23,42,.9)";
    } else {
        navbar.style.background = "rgba(15,23,42,.55)";
    }
});