    // ========================================
    // FOOTER INITIALIZATION
    // ========================================

    function initFooter(){

        initFooterCounter();

        initNewsletter();

        initFAQ();

        initFAQGlow();

        // initRipple();


        revealOnScroll();

    }

    // ========================================
    // COUNTER
    // ========================================

    function initFooterCounter() {

        const counters = document.querySelectorAll(".counter");

        if (!counters.length) return;

        const stats = document.querySelector(".footer-stats");

        if (!stats) return;

        const observer = new IntersectionObserver((entries) => {

            if (!entries[0].isIntersecting) return;

            counters.forEach(counter => {

                const target = Number(counter.dataset.target);

                let count = 0;

                const speed = 25;

                const updateCounter = () => {

                    count += Math.ceil(target / 60);

                    if (count >= target) {

                        counter.innerText = target + "+";

                    } else {

                        counter.innerText = count;

                        setTimeout(updateCounter, speed);

                    }

                };

                updateCounter();

            });

            observer.disconnect();

        });

        observer.observe(stats);

    }

    // ========================================
    // REVEAL ANIMATION
    // ========================================

    function revealOnScroll() {

        const reveals = document.querySelectorAll(".reveal");

        reveals.forEach(item => {

            const top = item.getBoundingClientRect().top;

            if (top < window.innerHeight - 100) {

                item.classList.add("active");

            }

        });

    }

    window.addEventListener("scroll", revealOnScroll);

    // ========================================
    // NEWSLETTER
    // ========================================

    function initNewsletter() {

        document.addEventListener("click", function (e) {

            if (!e.target.matches(".newsletter button")) return;

            const input = document.querySelector(".newsletter input");

            if (!input) return;

            const email = input.value.trim();

            if (email === "") {

                alert("Please enter your email.");

                return;

            }

            const popup = document.getElementById("subscribePopup");

            if (popup) {

                popup.classList.add("show");

                setTimeout(() => {

                    popup.classList.remove("show");

                }, 4000);

            }

            input.value = "";

        });

        const popupClose = document.getElementById("popupClose");

        popupClose?.addEventListener("click", () => {

            document.getElementById("subscribePopup")
                ?.classList.remove("show");

        });

    }

    /*====================================================
                PREMIUM FAQ
    ====================================================*/

function initFAQ() {

    const faqCards = document.querySelectorAll(".faq-card");

    faqCards.forEach(card => {

        const button = card.querySelector(".faq-btn");

        button.addEventListener("click", () => {

            const isOpen = card.classList.contains("active");

            faqCards.forEach(item => {

                item.classList.remove("active");

            });

            if(!isOpen){

                card.classList.add("active");

            }

        });

    });

}

    /*====================================================
                MOUSE GLOW
    ====================================================*/

    function initFAQGlow(){

        const cards = document.querySelectorAll(".faq-card");

        cards.forEach(card=>{

            card.addEventListener("mousemove",(e)=>{

                const glow = card.querySelector(".faq-glow");

                const rect = card.getBoundingClientRect();

                const x = e.clientX - rect.left;

                const y = e.clientY - rect.top;

                glow.style.background = `

                radial-gradient(

                    180px circle at ${x}px ${y}px,

                    rgba(255,193,7,.22),

                    transparent 70%

                )`;

            });

            card.addEventListener("mouseleave",()=>{

                card.querySelector(".faq-glow").style.background="transparent";

            });

        });

    }

    /*====================================================
                RIPPLE EFFECT
    ====================================================*/

    function initRipple(){

        document.querySelectorAll(".faq-btn").forEach(button=>{

            button.addEventListener("click",(e)=>{

                const ripple=document.createElement("span");

                ripple.className="faq-ripple";

                const rect=button.getBoundingClientRect();

                ripple.style.left=(e.clientX-rect.left)+"px";

                ripple.style.top=(e.clientY-rect.top)+"px";

                button.appendChild(ripple);

                setTimeout(()=>{

                    ripple.remove();

                },700);

            });

        });

    }