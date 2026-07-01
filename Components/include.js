// ===============================
// LOAD HTML COMPONENTS
// ===============================

async function loadComponent(id, file) {

    try {

        const response = await fetch(file);

        if (!response.ok) {

            throw new Error(`Unable to load ${file}`);

        }

        document.getElementById(id).innerHTML =
            await response.text();

    }

    catch (error) {

        console.error(error);

    }

}

// ===============================
// LOAD COMPONENTS
// ===============================

document.addEventListener("DOMContentLoaded", async () => {

    // Load Navbar
    await loadComponent(
        "navbar",
        "/Event-Management/components/navbar.html"
    );

    // Load Footer
    await loadComponent(
        "footer",
        "/Event-Management/components/footer.html"
    );

    // Initialize Navbar
    if (typeof initNavbar === "function") {

        initNavbar();

    }

    // Initialize Footer
    if (typeof initFooter === "function") {

        initFooter();

    }

});