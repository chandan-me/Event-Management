/* ═══════════════════════════════════════
   BLVK MOON EVENT — Venue.js
   Filter logic + count update
   ═══════════════════════════════════════ */

(function () {
  "use strict";

  /* ── Elements ── */
  const locationFilter = document.getElementById("searchVenue");
  const eventFilter    = document.getElementById("eventFilter");
  const capacityFilter = document.getElementById("capacityFilter");
  const priceFilter    = document.getElementById("priceFilter");
  const resetBtn       = document.getElementById("resetFilters");
  const noResultReset  = document.getElementById("noResultReset");
  const noResult       = document.getElementById("noResult");
  const venueCount     = document.getElementById("venueCount");
  const cards          = document.querySelectorAll(".venue-card");

  /* ── Bind filters ── */
  [locationFilter, eventFilter, capacityFilter, priceFilter].forEach(el => {
    el.addEventListener("change", filterVenues);
  });

  resetBtn.addEventListener("click", resetFilters);
  noResultReset.addEventListener("click", resetFilters);

  /* ── Main filter function ── */
  function filterVenues() {
    const loc      = locationFilter.value.toLowerCase();
    const evt      = eventFilter.value.toLowerCase();
    const capMin   = capacityFilter.value;
    const budget   = priceFilter.value;

    let visible = 0;

    cards.forEach(card => {
      const cLoc = card.dataset.location.toLowerCase();
      const cEvt = card.dataset.event.toLowerCase();
      const cCap = parseInt(card.dataset.capacity, 10) || 0;
      const cBud = parseInt(card.dataset.budget, 10)   || 0;

      let show = true;

      /* Location */
      if (loc !== "all" && cLoc !== loc) show = false;

      /* Event */
      if (evt !== "all" && cEvt !== evt) show = false;

      /* Capacity */
      if (capMin !== "all" && cCap < parseInt(capMin, 10)) show = false;

      /* Budget */
      if (budget !== "all") {
        const b = parseInt(budget, 10);
        if      (b === 50000)   { if (cBud >= 50000)                      show = false; }
        else if (b === 100000)  { if (cBud < 50000  || cBud > 100000)     show = false; }
        else if (b === 300000)  { if (cBud < 100000 || cBud > 300000)     show = false; }
        else if (b === 1000000) { if (cBud < 300000)                       show = false; }
      }

      /* Toggle card visibility */
      if (show) {
        card.style.display = "";
        visible++;
      } else {
        card.style.display = "none";
      }
    });

    /* Update count label */
    venueCount.textContent = visible === 0
      ? "No venues match your filters"
      : `${visible} Venue${visible !== 1 ? "s" : ""}`;

    /* Toggle no-result message */
    noResult.style.display = visible === 0 ? "block" : "none";
  }

  /* ── Reset ── */
  function resetFilters() {
    locationFilter.value = "all";
    eventFilter.value    = "all";
    capacityFilter.value = "all";
    priceFilter.value    = "all";
    filterVenues();
  }

  /* ── Run on load ── */
  filterVenues();

})();

const modal = document.getElementById("venueModal");

const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalLocation = document.getElementById("modalLocation");
const modalDescription = document.getElementById("modalDescription");
const modalCapacity = document.getElementById("modalCapacity");
const modalPerPerson = document.getElementById("modalPerPerson");
const modalTotalCost = document.getElementById("modalTotalCost");

const closeModal = document.querySelector(".close-modal");
const closeBtn = document.querySelector(".close-btn");

const descriptions = {
    "Bangalore":
        "Bangalore offers luxury venues, excellent connectivity, premium hospitality and world-class event management services, making it perfect for weddings, corporate events and celebrations.",

    "Mysore":
        "Known for its royal heritage and magnificent palaces, Mysore provides an elegant atmosphere for unforgettable events.",

    "Goa":
        "Goa is famous for beautiful beaches, breathtaking sunsets and luxurious resorts, creating the perfect destination for birthdays, receptions and beach weddings.",

    "Hyderabad":
        "Hyderabad combines modern luxury with royal architecture, making it an ideal destination for conferences and grand celebrations.",

    "Chennai":
        "Chennai offers premium hotels, coastal beauty and exceptional hospitality suitable for every occasion.",

    "Mumbai":
        "Mumbai provides luxurious hotels and iconic event spaces with world-class facilities for premium events.",

    "Delhi":
        "Delhi is home to lavish banquet halls and heritage hotels ideal for grand weddings and business events.",

    "Jaipur":
        "Jaipur's royal palaces and luxurious heritage venues make every celebration feel majestic.",

    "Pune":
        "Pune features elegant hotels and sophisticated banquet halls suitable for corporate and family functions.",

    "Kochi":
        "Kochi combines waterfront beauty with premium hospitality for memorable events.",

    "Coorg":
        "Coorg offers peaceful hill-side resorts surrounded by greenery, perfect for intimate celebrations.",

    "Udupi":
        "Udupi provides scenic coastal venues with peaceful surroundings and excellent hospitality.",

    "Hubli":
        "Hubli offers spacious event venues suitable for seminars, weddings and family gatherings.",

    "Belgaum":
        "Belgaum is known for comfortable luxury venues and excellent event facilities.",

    "Shimoga":
        "Shimoga's natural beauty and premium resorts make celebrations truly memorable."
};

document.querySelectorAll(".view-btn").forEach(button => {

    button.addEventListener("click", function () {

        const card = this.closest(".venue-card");

        const image =
            card.querySelector("img").src;

        const title =
            card.querySelector(".card-title").innerText;

        const location =
            card.dataset.location;

        const capacity =
            card.dataset.capacity;

        const totalCost =
            parseInt(card.dataset.budget);

        const perPerson =
            Math.round(totalCost / capacity);

        modalImage.src = image;

        modalTitle.innerText = title;

        modalLocation.innerText = location;

        modalDescription.innerText =
            descriptions[location] ||
            "A premium venue offering luxury ambience and memorable experiences.";

        modalCapacity.innerText =
            capacity + " Guests";

        modalPerPerson.innerText =
            "₹" + perPerson.toLocaleString();

        modalTotalCost.innerText =
            "₹" + totalCost.toLocaleString();

        modal.style.display = "flex";

        document.body.style.overflow = "hidden";

    });

});

function hideModal() {

    modal.style.display = "none";

    document.body.style.overflow = "auto";

}

closeModal.onclick = hideModal;

closeBtn.onclick = hideModal;

window.onclick = function(e){

    if(e.target === modal){

        hideModal();

    }

};

document.addEventListener("keydown",function(e){

    if(e.key==="Escape"){

        hideModal();

    }

});
// Open
modal.classList.add("show");

// Close
modal.classList.remove("show");


const bookNowBtn = document.getElementById("bookNowBtn");

bookNowBtn.addEventListener("click", function () {

    const venue = {

        venueName: modalTitle.innerText,

        venueLocation: modalLocation.innerText,

        venueCapacity: modalCapacity.innerText,

        venueBudget: modalTotalCost.innerText

    };

    localStorage.setItem(
        "selectedVenue",
        JSON.stringify(venue)
    );

    const loggedInUser =
    JSON.parse(localStorage.getItem("loggedInUser"));

    if(loggedInUser){

        window.location.href =
        "booking.html";

    }
    else{
window.location.href =
"../Login-Signup/login.html";
    }

});