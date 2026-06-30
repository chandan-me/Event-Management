function initNavbar() {

    const navbar = document.querySelector(".custom-navbar");
    const serviceBtn = document.querySelector(".service-btn");
    const serviceMenu = document.querySelector(".service-menu");

    // Scroll Effect
    function handleScroll() {

        if (!navbar) return;

        if (window.scrollY > 40) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    // Mobile Dropdown
    if (serviceBtn && serviceMenu) {

        serviceBtn.addEventListener("click", function (e) {

            if (window.innerWidth <= 991) {

                e.preventDefault();

                serviceMenu.classList.toggle("show");

            }

        });

    }

    // Close Dropdown on Outside Click
    document.addEventListener("click", function (e) {

        if (
            serviceMenu &&
            !serviceMenu.contains(e.target)
        ) {

            serviceMenu.classList.remove("show");

        }

    });

    // Active Page Highlight
    const current = window.location.pathname;

    document.querySelectorAll(".nav-link").forEach(link => {

        if (link.href === window.location.href) {

            link.classList.add("active");

        }

    });

}