(function () {
  'use strict';

  /* ------------------------------
     Helper selectors
  ------------------------------ */
  const qs = (sel, root) => {
    const useRoot = root || document;
    return useRoot.querySelector(sel);
  };

  const qsa = (sel, root) => {
    const useRoot = root || document;
    return Array.from(useRoot.querySelectorAll(sel));
  };

  const filterButtons = qsa('.filter-btn');
  const cardWrappers = qsa('.blog-card-wrapper');

  // Categories used in HTML (data-category):
  // corporate, planning, launch, branding

  function removeActiveFromButtons() {
    for (let i = 0; i < filterButtons.length; i++) {
      filterButtons[i].classList.remove('active');
    }
  }

  function showCard(wrapper, show) {
    // Use display none/block so layout is clean and no overlap
    if (show) {
      wrapper.style.display = 'block';
    } else {
      wrapper.style.display = 'none';
    }
  }

  function revealVisibleCardsStagger(visibleCards) {
    // Stagger fade/slide in using CSS transitions.
    // We keep it simple: change styles with increasing delays.

    for (let i = 0; i < visibleCards.length; i++) {
      const w = visibleCards[i];

      // Prepare initial state
      w.style.opacity = '0';
      w.style.transform = 'translateY(14px)';

      // Small stagger delay
      const delay = i * 90;

      window.setTimeout(function () {
        w.style.transition = 'opacity .35s ease, transform .35s ease';
        w.style.opacity = '1';
        w.style.transform = 'translateY(0)';
      }, delay);

      // Cleanup after animation completes
      window.setTimeout(function () {
        w.style.transition = '';
        w.style.opacity = '';
        w.style.transform = '';
      }, delay + 420);
    }
  }

  function applyFilter(filterValue) {
    const allMode = filterValue === 'all';

    // Decide visibility
    const visibleCards = [];

    if (allMode) {
      // Show all
      for (let i = 0; i < cardWrappers.length; i++) {
        showCard(cardWrappers[i], true);
        visibleCards.push(cardWrappers[i]);
      }
    } else {
      // Show only the related category.
      // Requirement says 3-4 blogs per category in HTML.
      // We'll show ALL wrappers that match the chosen category.
      // This keeps logic simple and guarantees you see the full set.
      for (let i = 0; i < cardWrappers.length; i++) {
        const w = cardWrappers[i];
        const cat = w.getAttribute('data-category') || '';

        const shouldShow = cat === filterValue;
        showCard(w, shouldShow);

        if (shouldShow) {
          visibleCards.push(w);
        }
      }
    }

    // Trigger stagger animation for the visible cards
    revealVisibleCardsStagger(visibleCards);
  }

  if (filterButtons.length > 0 && cardWrappers.length > 0) {
    // Click event handling
    for (let i = 0; i < filterButtons.length; i++) {
      filterButtons[i].addEventListener('click', function () {
        const btn = this;
        const filterValue = btn.getAttribute('data-filter') || 'all';

        removeActiveFromButtons();
        btn.classList.add('active');

        // Small fade effect by toggling opacity first
        // (Then applyFilter sets display + stagger)
        for (let j = 0; j < cardWrappers.length; j++) {
          cardWrappers[j].style.transition = 'opacity .18s ease';
          cardWrappers[j].style.opacity = '0.01';
        }

        window.setTimeout(function () {
          applyFilter(filterValue);

          for (let j = 0; j < cardWrappers.length; j++) {
            cardWrappers[j].style.transition = '';
            cardWrappers[j].style.opacity = '';
          }
        }, 200);
      });
    }

    // Initial load: activate "All"
    let defaultBtn = null;
    for (let i = 0; i < filterButtons.length; i++) {
      if (filterButtons[i].getAttribute('data-filter') === 'all') {
        defaultBtn = filterButtons[i];
        break;
      }
    }

    if (!defaultBtn && filterButtons.length > 0) defaultBtn = filterButtons[0];

    if (defaultBtn) {
      removeActiveFromButtons();
      defaultBtn.classList.add('active');
      applyFilter('all');
    }
  }

  /* ====================================================
     Scroll Reveal (IntersectionObserver)
     Requirement:
       - Fade Up / slide-like reveal using CSS classes
  ====================================================== */

  const revealEls = qsa('.reveal');

  // IntersectionObserver adds class "show"
  // CSS handles opacity + transform.
  const revealObserver = new IntersectionObserver(
    function (entries) {
      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      }
    },
    {
      threshold: 0.15
    }
  );

  for (let i = 0; i < revealEls.length; i++) {
    revealObserver.observe(revealEls[i]);
  }

  /* ===========================================
     WhatsApp floating pulse (CSS + JS trigger)
  ============================================== */

  const helpBtn = qs('.need-help-btn');

  if (helpBtn) {
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
  }

  /* ===========================
     Hero smooth scroll button
  ============================= */

  const heroExploreBtn = qs('#heroExplore');

  if (heroExploreBtn) {
    heroExploreBtn.addEventListener('click', function (e) {
      e.preventDefault();
      const blogs = qs('#blogs');
      if (blogs) {
        blogs.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  /* ======================================
     Blog card 3D tilt (simple mouse move)
  ========================================= */

  const tiltCards = qsa('.blog-card');

  for (let i = 0; i < tiltCards.length; i++) {
    const card = tiltCards[i];

    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Rotation angles
      const rotateX = -((y - centerY) / 28);
      const rotateY = (x - centerX) / 28;

      card.style.setProperty('--rx', rotateX + 'deg');
      card.style.setProperty('--ry', rotateY + 'deg');
    });

    card.addEventListener('mouseleave', function () {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    });
  }

  /* ====================================
     Newsletter form validation (simple)
  ======================================= */

  const newsletterForm = qs('.newsletter-form');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const input = qs('input[type="email"]', this);
      const emailValue = input ? input.value.trim() : '';

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailValue) {
        alert('Please enter your email address.');
        return;
      }

      if (!emailPattern.test(emailValue)) {
        alert('Please enter a valid email address.');
        return;
      }

      alert('Thank you for subscribing!');
      this.reset();
    });
  }

  /* ========================
     Demo links (optional)
  =========================== */

  const readLinks = qsa('.read-btn, .blog-content a');

  for (let i = 0; i < readLinks.length; i++) {
    readLinks[i].addEventListener('click', function (e) {
      const link = this;
      if (link.getAttribute('href') === '#') {
        e.preventDefault();
        alert('Article page coming soon.');
      }
    });
  }

  // End
})();

