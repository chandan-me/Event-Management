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
  // End
})();

/* ==========================================
   PREMIUM ARTICLE POPUP
========================================== */

const articleModal = document.getElementById("articleModal");
const articleClose = document.getElementById("closeArticle");

const articleImage = document.getElementById("articleImage");
const articleCategory = document.getElementById("articleCategory");
const articleTitle = document.getElementById("articleTitle");
const articleAuthor = document.getElementById("articleAuthor");
const articleDate = document.getElementById("articleDate");
const articleReadTime = document.getElementById("articleReadTime");
const articleContent = document.getElementById("articleContent");

/* Open popup */
/* ==========================================
   ARTICLE DATABASE
========================================== */

const articles = [

{
    category:"CORPORATE EVENTS",
    title:"Planning High Impact Corporate Gatherings",
    image:"images/Cor1.png",
    author:"Blvk Moon Editorial",
    date:"26 June 2026",
    readTime:"5 min read",

    content:`

    <p>
    Successful corporate events are not created by chance.
    They require careful planning, clear communication and
    exceptional execution.
    </p>

    <h3>Why Planning Matters</h3>

    <p>
    Every successful conference begins with understanding
    the business objective. Whether it is networking,
    employee engagement or launching a product, every
    decision should support that goal.
    </p>

    <ul>
        <li>Define measurable objectives</li>
        <li>Select the perfect venue</li>
        <li>Create memorable experiences</li>
        <li>Measure event ROI</li>
    </ul>

    <p>
    Professional planning ensures attendees leave with a
    lasting positive impression.
    </p>

    `
},

{
    category:"EVENT PLANNING",

    title:"Essential Planning Strategies For Success",

    image:"images/Cor2.png",

    author:"Blvk Moon Editorial",

    date:"22 June 2026",

    readTime:"6 min read",

    content:`

    <p>
    Event planning is the backbone of every successful
    celebration.
    </p>

    <h3>Preparation</h3>

    <p>
    Start planning early, create timelines,
    assign responsibilities and prepare backup plans.
    </p>

    <ul>
        <li>Budget Management</li>
        <li>Vendor Coordination</li>
        <li>Guest Experience</li>
        <li>Risk Planning</li>
    </ul>

    <p>
    Proper planning minimizes surprises and creates
    memorable experiences.
    </p>

    `
},

{
    category:"PRODUCT LAUNCH",

    title:"Launch Events That Generate Buzz",

    image:"images/Cor3.png",

    author:"Blvk Moon Editorial",

    date:"18 June 2026",

    readTime:"4 min read",

    content:`

    <p>
    Product launches should create excitement before,
    during and after the event.
    </p>

    <h3>Build Anticipation</h3>

    <p>
    Use teaser campaigns, live demonstrations and
    influencer collaborations to maximize visibility.
    </p>

    <ul>
        <li>Live Product Demo</li>
        <li>VIP Guest Experience</li>
        <li>Press Coverage</li>
        <li>Social Media Campaign</li>
    </ul>

    `
},

{
    category:"BRAND ACTIVATION",

    title:"Creating Experiences That People Remember",

    image:"images/Cor4.png",

    author:"Blvk Moon Editorial",

    date:"15 June 2026",

    readTime:"7 min read",

    content:`

    <p>
    Brand activation is about creating emotional
    connections between brands and people.
    </p>

    <h3>Memorable Moments</h3>

    <p>
    Interactive experiences generate stronger engagement
    than traditional advertising.
    </p>

    <ul>
        <li>Interactive Booths</li>
        <li>AR & VR Experiences</li>
        <li>Live Performances</li>
        <li>Social Sharing Zones</li>
    </ul>

    `
},
{
    category:"LEADERSHIP EVENTS",

    title:"Executive Events That Build Connections",

    image:"images/Cor5.png",

    author:"Blvk Moon Editorial",

    date:"12 June 2026",

    readTime:"6 min read",

    content:`

    <p>
    Executive events provide an exclusive environment where business
    leaders can build relationships, exchange ideas and create valuable
    partnerships.
    </p>

    <h3>Keys To Success</h3>

    <p>
    Focus on meaningful networking opportunities, premium hospitality,
    and personalized experiences for every attendee.
    </p>

    <ul>
        <li>Exclusive Invitations</li>
        <li>VIP Hospitality</li>
        <li>Leadership Panels</li>
        <li>Networking Sessions</li>
    </ul>

    `
},

{
    category:"EVENT STRATEGY",

    title:"Event Frameworks For Long-Term Success",

    image:"images/Cor6.png",

    author:"Blvk Moon Editorial",

    date:"10 June 2026",

    readTime:"5 min read",

    content:`

    <p>
    Every successful event follows a structured framework that ensures
    smooth planning, execution and evaluation.
    </p>

    <h3>Framework Essentials</h3>

    <p>
    Build a timeline, assign responsibilities and continuously monitor
    progress throughout the planning process.
    </p>

    <ul>
        <li>Planning Timeline</li>
        <li>Risk Management</li>
        <li>Vendor Coordination</li>
        <li>Performance Review</li>
    </ul>

    `
},

{
    category:"CORPORATE EVENTS",

    title:"Corporate Networking Event Strategies",

    image:"images/Cor7.png",

    author:"Blvk Moon Editorial",

    date:"08 June 2026",

    readTime:"5 min read",

    content:`

    <p>
    Networking events create opportunities for professionals to connect,
    collaborate and establish lasting business relationships.
    </p>

    <h3>Networking Tips</h3>

    <p>
    Encourage interaction through structured activities and relaxed
    networking spaces.
    </p>

    <ul>
        <li>Ice Breaker Sessions</li>
        <li>Networking Lounges</li>
        <li>Business Matchmaking</li>
        <li>Follow-up Activities</li>
    </ul>

    `
},

{
    category:"PRODUCT LAUNCH",

    title:"Product Reveal Experiences That Convert",

    image:"images/Cor1.png",

    author:"Blvk Moon Editorial",

    date:"05 June 2026",

    readTime:"5 min read",

    content:`

    <p>
    A memorable product reveal captures attention and motivates customers
    to engage with your brand immediately.
    </p>

    <h3>Create Excitement</h3>

    <p>
    Combine storytelling, live demonstrations and audience participation
    to maximize launch success.
    </p>

    <ul>
        <li>Live Demonstrations</li>
        <li>Interactive Experiences</li>
        <li>Media Coverage</li>
        <li>Customer Engagement</li>
    </ul>

    `
},

{
    category:"BRAND ACTIVATION",

    title:"Experiential Marketing Campaign Ideas",

    image:"images/Cor2.png",

    author:"Blvk Moon Editorial",

    date:"03 June 2026",

    readTime:"7 min read",

    content:`

    <p>
    Experiential marketing allows audiences to interact directly with
    your brand through engaging real-world experiences.
    </p>

    <h3>Creative Ideas</h3>

    <p>
    Use immersive installations, live entertainment and digital
    engagement to strengthen brand awareness.
    </p>

    <ul>
        <li>Interactive Installations</li>
        <li>Photo Opportunities</li>
        <li>Gamification</li>
        <li>Social Media Integration</li>
    </ul>

    `
},

{
    category:"EVENT PLANNING",

    title:"Event Budget Planning Best Practices",

    image:"images/Cor3.png",

    author:"Blvk Moon Editorial",

    date:"01 June 2026",

    readTime:"6 min read",

    content:`

    <p>
    Managing an event budget effectively ensures high-quality experiences
    while maintaining financial control.
    </p>

    <h3>Budget Management</h3>

    <p>
    Allocate resources carefully, prioritize essential expenses and
    maintain contingency funds for unexpected situations.
    </p>

    <ul>
        <li>Budget Forecasting</li>
        <li>Expense Tracking</li>
        <li>Vendor Negotiation</li>
        <li>Contingency Planning</li>
    </ul>

    `
},

{
    category:"PRODUCT LAUNCH",

    title:"Building Hype Before Launch Day",

    image:"images/Cor4.png",

    author:"Blvk Moon Editorial",

    date:"28 May 2026",

    readTime:"4 min read",

    content:`

    <p>
    Building anticipation before launch day creates excitement and
    encourages audience participation from the very beginning.
    </p>

    <h3>Pre-Launch Marketing</h3>

    <p>
    Combine teaser campaigns, influencer partnerships and countdowns to
    maximize visibility.
    </p>

    <ul>
        <li>Countdown Campaigns</li>
        <li>Influencer Marketing</li>
        <li>Social Media Teasers</li>
        <li>Email Campaigns</li>
    </ul>

    `
},

{
    category:"BRAND ACTIVATION",

    title:"Turning Event Attendees Into Brand Advocates",

    image:"images/Cor5.png",

    author:"Blvk Moon Editorial",

    date:"25 May 2026",

    readTime:"7 min read",

    content:`

    <p>
    The best events inspire attendees to become passionate advocates for
    your brand through memorable experiences.
    </p>

    <h3>Build Lasting Loyalty</h3>

    <p>
    Continue engagement after the event with personalized communication,
    exclusive content and community-building initiatives.
    </p>

    <ul>
        <li>Post Event Follow-up</li>
        <li>Exclusive Communities</li>
        <li>Reward Programs</li>
        <li>Customer Testimonials</li>
    </ul>

    `
}

];

function openArticle(data){

    articleImage.src = data.image;
    articleCategory.innerHTML = data.category;
    articleTitle.innerHTML = data.title;
    articleAuthor.innerHTML = data.author;
    articleDate.innerHTML = data.date;
    articleReadTime.innerHTML = data.readTime;
    articleContent.innerHTML = data.content;

    articleModal.classList.add("show");

    document.body.style.overflow = "hidden";
}

/* Close popup */

function closeArticle(){

    articleModal.classList.remove("show");

    document.body.style.overflow = "auto";
}

/* Close button */

articleClose.addEventListener("click", closeArticle);

/* Click outside */

articleModal.addEventListener("click", function(e){

    if(e.target === articleModal){

        closeArticle();

    }

});

/* ESC key */

document.addEventListener("keydown", function(e){

    if(e.key === "Escape"){

        closeArticle();

    }

});

/* ==========================================
   READ ARTICLE BUTTONS
========================================== */

document.querySelectorAll(".read-article").forEach(button=>{

    button.addEventListener("click",function(e){

        e.preventDefault();

        const id=this.dataset.id;

        openArticle(articles[id]);

    });

});