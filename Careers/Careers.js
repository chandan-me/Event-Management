
// Get single element by selector
function $(selector) {
  return document.querySelector(selector);
}

// Get all elements by selector (returns array)
function $all(selector) {
  var nodes = document.querySelectorAll(selector);
  var arr = [];
  for (var i = 0; i < nodes.length; i++) {
    arr.push(nodes[i]);
  }
  return arr;
}

// Keep number within range
function clamp(n, min, max) {
  if (n < min) return min;
  if (n > max) return max;
  return n;
}

// Format number with commas (e.g., 1000 -> "1,000")
function formatNumber(n) {
  var num = Number(n);
  if (!isFinite(num)) return "0";
  var str = num.toString();
  var result = "";
  var count = 0;
  for (var i = str.length - 1; i >= 0; i--) {
    if (count > 0 && count % 3 === 0) {
      result = "," + result;
    }
    result = str[i] + result;
    count++;
  }
  return result;
}

// ============================================================
// RIPPLE EFFECT ON BUTTONS
// ============================================================
function attachRipple() {
  var buttons = $all("[data-ripple]");

  for (var i = 0; i < buttons.length; i++) {
    (function(btn) {
      btn.addEventListener("click", function(e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        var span = document.createElement("span");
        span.className = "wm-ripple";
        span.style.left = x + "px";
        span.style.top = y + "px";

        btn.appendChild(span);

        setTimeout(function() {
          if (span && span.parentNode) {
            span.parentNode.removeChild(span);
          }
        }, 680);
      });
    })(buttons[i]);
  }
}

// ============================================================
// SCROLL REVEAL ANIMATION
// ============================================================
function initScrollReveal() {
  var revealEls = $all("[data-reveal]");

  // Add stagger delay for staggered elements
  var staggerEls = $all('[data-reveal="stagger"]');
  for (var i = 0; i < staggerEls.length; i++) {
    staggerEls[i].style.transitionDelay = (i * 90) + "ms";
  }

  // Track which elements have been revealed
  var revealed = [];

  // Check scroll position periodically
  function checkReveal() {
    for (var i = 0; i < revealEls.length; i++) {
      var el = revealEls[i];
      // Skip if already revealed
      if (el.classList.contains("is-revealed")) continue;

      var rect = el.getBoundingClientRect();
      var windowHeight = window.innerHeight || 800;

      // If element is in viewport
      if (rect.top < windowHeight - 50 && rect.bottom > 0) {
        el.classList.add("is-revealed");

        // Add animating class for stat/job cards
        if (el.classList.contains('wm-stat-card') ||
            el.classList.contains('wm-job-card')) {
          el.classList.add('is-animating');
          setTimeout(function() {
            el.classList.remove('is-animating');
          }, 1000);
        }
      }
    }
  }

  // Check on scroll
  window.addEventListener("scroll", checkReveal);

  // Check on load
  checkReveal();
}

// ============================================================
// COUNT UP ANIMATION FOR STATS
// ============================================================
function initCountUp() {
  var countWraps = $all("[data-count]");
  if (countWraps.length === 0) return;

  var spans = $all(".wm-count");
  if (spans.length === 0) return;

  var started = false;

  // Check if stats section is visible
  function checkCountUp() {
    if (started) return;

    var statsSection = $("#stats");
    if (!statsSection) return;

    var rect = statsSection.getBoundingClientRect();
    var windowHeight = window.innerHeight || 800;

    if (rect.top < windowHeight - 100 && rect.bottom > 0) {
      started = true;
      animateCounters();
    }
  }

  function animateCounters() {
    for (var i = 0; i < spans.length; i++) {
      (function(span) {
        var target = parseInt(span.getAttribute("data-target"), 10);
        if (isNaN(target)) return;

        var duration = 2000;
        var steps = 60;
        var stepTime = Math.floor(duration / steps);
        var increment = Math.ceil(target / steps);

        var current = 0;
        span.textContent = "0";

        var timer = setInterval(function() {
          current = current + increment;
          if (current >= target) {
            span.textContent = formatNumber(target);
            clearInterval(timer);

            // Completion pulse
            span.style.animation = 'counterPulse 0.5s ease-in-out';
            setTimeout(function() {
              span.style.animation = '';
            }, 500);
            return;
          }
          span.textContent = formatNumber(current);
        }, stepTime);
      })(spans[i]);
    }
  }

  // Check on scroll
  window.addEventListener("scroll", checkCountUp);

  // Check on load
  checkCountUp();
}

// ============================================================
// DYNAMIC JOB CARDS
// ============================================================
var jobs = [
  {
    department: "Client Servicing",
    title: "Client Servicing Manager",
    experience: "3-6 Years",
    location: "Hyderabad",
    salary: "60K-85K",
    description: "Lead client communication, oversee project timelines, and deliver premium experiences with high precision."
  },
  {
    department: "Production",
    title: "Event Production Executive",
    experience: "2-4 Years",
    location: "Bengaluru",
    salary: "45K-65K",
    description: "Coordinate production details, vendors, and on-ground execution to ensure flawless event outcomes."
  },
  {
    department: "Design",
    title: "Motion Graphic Designer",
    experience: "1-3 Years",
    location: "Remote (India)",
    salary: "35K-55K",
    description: "Create polished motion visuals for campaigns-clean timing, premium transitions, and brand consistency."
  },
  {
    department: "Business Development",
    title: "Business Development Executive",
    experience: "2-5 Years",
    location: "Delhi NCR",
    salary: "50K-80K",
    description: "Drive client acquisition through strategic outreach, relationship-building, and measurable pipeline growth."
  },
  {
    department: "Creative",
    title: "Creative Strategist",
    experience: "4-7 Years",
    location: "Mumbai",
    salary: "70K-105K",
    description: "Own creative direction, align messaging, and craft strategy that turns ideas into standout experiences."
  },
  {
    department: "Operations",
    title: "Event Coordinator",
    experience: "1-3 Years",
    location: "Chennai",
    salary: "30K-50K",
    description: "Support planning and execution-keep schedules tight and details correct from start to finish."
  }
];

function renderJobs() {
  var grid = $("#jobsGrid");
  if (!grid) return;

  var html = "";

  for (var i = 0; i < jobs.length; i++) {
    var job = jobs[i];

    html += '<div class="col-md-6 col-lg-4">' +
      '<article class="wm-job-card reveal-up" data-reveal="up" data-job-index="' + i + '">' +
        '<div class="wm-job-top">' +
          '<div class="wm-job-dept-badge">' + job.department + '</div>' +
          '<div class="wm-job-dept-badge" title="Experience">' + job.experience + '</div>' +
        '</div>' +
        '<h3 class="wm-job-title">' + job.title + '</h3>' +
        '<div class="wm-job-meta">' +
          '<span aria-label="Location">' + job.location + '</span>' +
          '<span aria-label="Salary">' + job.salary + '</span>' +
        '</div>' +
        '<p class="wm-job-desc">' + job.description + '</p>' +
        '<button type="button" class="btn wm-btn wm-btn-gold wm-btn-glow wm-btn-ripple wm-job-apply" data-ripple data-apply-title="' + job.title + '">' +
          'Apply' +
        '</button>' +
      '</article>' +
    '</div>';
  }

  grid.innerHTML = html;

  // Add click handlers to apply buttons
  var applyButtons = $all('[data-apply-title]');
  for (var j = 0; j < applyButtons.length; j++) {
    (function(btn) {
      btn.addEventListener("click", function() {
        var title = btn.getAttribute("data-apply-title") || "";
        var positionInput = $("#position");
        if (positionInput) positionInput.value = title;
        openModalById("applyModal");
      });
    })(applyButtons[j]);
  }

  // Re-initialize scroll reveal for new elements
  initScrollReveal();
}

// ============================================================
// MODAL HELPERS
// ============================================================
function openModalById(id) {
  var el = $("#" + id);
  if (!el) return;

  var Modal = window.bootstrap ? window.bootstrap.Modal : null;
  if (!Modal) return;

  var instance = Modal.getInstance(el);
  if (!instance) {
    instance = new Modal(el);
  }
  instance.show();
}

function closeModalById(id) {
  var el = $("#" + id);
  if (!el) return;

  var Modal = window.bootstrap ? window.bootstrap.Modal : null;
  if (!Modal) return;

  var instance = Modal.getInstance(el);
  if (instance) instance.hide();
}

// ============================================================
// FORM VALIDATION
// ============================================================
function setFieldError(fieldKey, message) {
  var errEl = $(".wm-invalid[data-err='" + fieldKey + "']");
  if (!errEl) return;
  errEl.textContent = message || "";
}

function clearFormErrors(formEl) {
  if (!formEl) return;
  var errEls = $all(".wm-invalid");
  for (var i = 0; i < errEls.length; i++) {
    errEls[i].textContent = "";
  }
}

function showStatus(statusEl, type, text) {
  if (!statusEl) return;
  statusEl.classList.remove("is-success", "is-error");
  if (type === "success") statusEl.classList.add("is-success");
  if (type === "error") statusEl.classList.add("is-error");
  statusEl.textContent = text;
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  return /^[0-9+()\-\s]{7,}$/.test(phone);
}

function initForms() {
  var applyForm = $("#applyForm");
  var customForm = $("#customForm");

  var applyStatus = $("#applyStatus");
  var customStatus = $("#customStatus");

  var applyFields = {
    fullName: $("#fullName"),
    email: $("#email"),
    phone: $("#phone"),
    position: $("#position"),
    resume: $("#resume"),
    message: $("#message")
  };

  var customFields = {
    cName: $("#cName"),
    cEmail: $("#cEmail"),
    cPhone: $("#cPhone"),
    cPosition: $("#cPosition"),
    cMessage: $("#cMessage")
  };

  // Apply Form
  if (applyForm) {
    applyForm.addEventListener("submit", function(e) {
      e.preventDefault();
      clearFormErrors(applyForm);

      if (applyStatus) {
        applyStatus.textContent = "";
        applyStatus.className = "wm-form-status";
      }

      var fullName = (applyFields.fullName && applyFields.fullName.value.trim()) || "";
      var email = (applyFields.email && applyFields.email.value.trim()) || "";
      var phone = (applyFields.phone && applyFields.phone.value.trim()) || "";
      var position = (applyFields.position && applyFields.position.value.trim()) || "";
      var message = (applyFields.message && applyFields.message.value.trim()) || "";
      var resumeFiles = applyFields.resume ? applyFields.resume.files : null;

      var ok = true;

      if (fullName.length < 2) {
        setFieldError("fullName", "Please enter your full name.");
        ok = false;
      }
      if (!validateEmail(email)) {
        setFieldError("email", "Please enter a valid email.");
        ok = false;
      }
      if (!validatePhone(phone)) {
        setFieldError("phone", "Please enter a valid phone number.");
        ok = false;
      }
      if (position.length < 2) {
        setFieldError("position", "Please enter the position you're applying for.");
        ok = false;
      }
      if (!resumeFiles || resumeFiles.length === 0) {
        setFieldError("resume", "Please upload your resume (PDF/DOC/DOCX).");
        ok = false;
      }
      if (message.length < 10) {
        setFieldError("message", "Please add a short message (at least 10 characters).");
        ok = false;
      }

      if (!ok) {
        showStatus(applyStatus, "error", "Please fix the highlighted fields and try again.");
        return;
      }

      showStatus(applyStatus, "success", "Application submitted successfully. We'll contact you soon.");

      setTimeout(function() {
        applyForm.reset();
        showStatus(applyStatus, "success", "Application submitted successfully. We'll contact you soon.");
        closeModalById("applyModal");
      }, 900);
    });
  }

  // Custom Role Form
  if (customForm) {
    customForm.addEventListener("submit", function(e) {
      e.preventDefault();
      clearFormErrors(customForm);

      if (customStatus) {
        customStatus.textContent = "";
        customStatus.className = "wm-form-status";
      }

      var cName = (customFields.cName && customFields.cName.value.trim()) || "";
      var cEmail = (customFields.cEmail && customFields.cEmail.value.trim()) || "";
      var cPhone = (customFields.cPhone && customFields.cPhone.value.trim()) || "";
      var cPosition = (customFields.cPosition && customFields.cPosition.value.trim()) || "";
      var cMessage = (customFields.cMessage && customFields.cMessage.value.trim()) || "";

      var ok = true;

      if (cName.length < 2) {
        setFieldError("cName", "Please enter your full name.");
        ok = false;
      }
      if (!validateEmail(cEmail)) {
        setFieldError("cEmail", "Please enter a valid email.");
        ok = false;
      }
      if (!validatePhone(cPhone)) {
        setFieldError("cPhone", "Please enter a valid phone number.");
        ok = false;
      }
      if (cPosition.length < 2) {
        setFieldError("cPosition", "Please enter the ideal position.");
        ok = false;
      }
      if (cMessage.length < 10) {
        setFieldError("cMessage", "Please describe the role (at least 10 characters).");
        ok = false;
      }

      if (!ok) {
        showStatus(customStatus, "error", "Please fix the highlighted fields and try again.");
        return;
      }

      showStatus(customStatus, "success", "Request submitted successfully. We'll connect you to the right team.");

      setTimeout(function() {
        customForm.reset();
        closeModalById("customModal");
      }, 900);
    });
  }
}

// ============================================================
// BUTTON ACTIONS
// ============================================================
function initButtons() {
  var btnExplore = $("#btnExplore");
  var btnLearn = $("#btnLearn");
  var btnApply = $("#btnApply");
  var btnQuickApply = $("#btnQuickApply");

  var btnCustom = $("#btnCustom");
  var btnFinalApply = $("#btnFinalApply");
  var btnFinalCustom = $("#btnFinalCustom");

  function scrollToId(id) {
    var el = $("#" + id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (btnExplore) {
    btnExplore.addEventListener("click", function() {
      scrollToId("jobs");
    });
  }

  if (btnLearn) {
    btnLearn.addEventListener("click", function() {
      scrollToId("why");
    });
  }

  if (btnApply) {
    btnApply.addEventListener("click", function() {
      openModalById("applyModal");
    });
  }

  if (btnQuickApply) {
    btnQuickApply.addEventListener("click", function() {
      openModalById("applyModal");
    });
  }

  if (btnCustom) {
    btnCustom.addEventListener("click", function() {
      openModalById("customModal");
    });
  }

  if (btnFinalApply) {
    btnFinalApply.addEventListener("click", function() {
      openModalById("applyModal");
    });
  }

  if (btnFinalCustom) {
    btnFinalCustom.addEventListener("click", function() {
      openModalById("customModal");
    });
  }
}

// ============================================================
// EMPLOYEE JOURNEY INTERACTIONS
// ============================================================
function initCareerJourneyInteractions() {
  var section = $("#journey");
  if (!section) return;

  var roadmap = section.querySelector(".wm-journey-roadmap");
  if (!roadmap) return;

  var steps = $all(".wm-journey-step", section);

  // Reveal steps on scroll
  function checkJourneyReveal() {
    for (var i = 0; i < steps.length; i++) {
      var step = steps[i];
      if (step.classList.contains("is-revealed")) continue;

      var rect = step.getBoundingClientRect();
      var windowHeight = window.innerHeight || 800;

      if (rect.top < windowHeight - 80 && rect.bottom > 0) {
        step.classList.add("is-revealed");
      }
    }
  }

  // Animate progress line
  function checkProgressLine() {
    var rect = roadmap.getBoundingClientRect();
    var windowHeight = window.innerHeight || 800;

    if (rect.top < windowHeight - 100 && rect.bottom > 0) {
      roadmap.classList.add("is-animated");
    }
  }

  // Update active step based on scroll
  function updateActiveStep() {
    var vh = window.innerHeight || 800;
    var viewportCenter = vh * 0.5;

    var bestStep = null;
    var bestDist = 999999;

    for (var i = 0; i < steps.length; i++) {
      var step = steps[i];
      var rect = step.getBoundingClientRect();
      var stepCenter = rect.top + rect.height / 2;
      var dist = Math.abs(stepCenter - viewportCenter);

      if (dist < bestDist) {
        bestDist = dist;
        bestStep = step;
      }
    }

    // Remove active from all, add to closest
    for (var j = 0; j < steps.length; j++) {
      steps[j].classList.remove("is-active");
    }

    if (bestStep && bestStep.classList.contains("is-revealed")) {
      bestStep.classList.add("is-active");
    }
  }

  // Scroll handler
  window.addEventListener("scroll", function() {
    checkJourneyReveal();
    checkProgressLine();
    updateActiveStep();
  });

  // Initial check
  checkJourneyReveal();
  checkProgressLine();
  updateActiveStep();
}

// ============================================================
// CURSOR INTERACTIONS
// ============================================================
function initCursorInteractions() {
  // Card tilt effect on mouse move
  var cards = $all('.wm-stat-card, .wm-job-card, .wm-why-acc-card, .wm-journey-card');

  for (var i = 0; i < cards.length; i++) {
    (function(card) {
      card.addEventListener('mousemove', function(e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        var centerX = rect.width / 2;
        var centerY = rect.height / 2;

        var rotateX = (y - centerY) / 20;
        var rotateY = (centerX - x) / 20;

        var clampedRotateX = clamp(rotateX, -3, 3);
        var clampedRotateY = clamp(rotateY, -3, 3);

        card.style.transform = 'perspective(1000px) rotateX(' + clampedRotateX + 'deg) rotateY(' + clampedRotateY + 'deg) translateY(-10px) scale(1.02)';
      });

      card.addEventListener('mouseleave', function() {
        card.style.transform = '';
      });
    })(cards[i]);
  }

  // Icon float effect on hover
  var icons = $all('.wm-stat-icon, .wm-why-acc-icon, .wm-journey-icon');

  for (var j = 0; j < icons.length; j++) {
    (function(icon) {
      icon.addEventListener('mouseenter', function() {
        icon.style.animation = 'iconFloat 2s ease-in-out infinite';
      });

      icon.addEventListener('mouseleave', function() {
        icon.style.animation = '';
      });
    })(icons[j]);
  }

  // Button hover enhancement
  var buttons = $all('.wm-btn');

  for (var k = 0; k < buttons.length; k++) {
    (function(btn) {
      btn.addEventListener('mouseenter', function() {
        btn.style.transform = 'translateY(-2px) scale(1.05)';
      });

      btn.addEventListener('mouseleave', function() {
        btn.style.transform = '';
      });
    })(buttons[k]);
  }

  // Gallery image zoom on hover
  var galleryImages = $all('.wm-gallery-img');

  for (var l = 0; l < galleryImages.length; l++) {
    (function(img) {
      img.addEventListener('mouseenter', function() {
        img.style.transform = 'scale(1.1)';
        img.style.filter = 'brightness(1.15) saturate(1.1)';
      });

      img.addEventListener('mouseleave', function() {
        img.style.transform = '';
        img.style.filter = '';
      });
    })(galleryImages[l]);
  }
}

// ============================================================
// MOUSE PARALLAX EFFECT
// ============================================================
function initMouseParallax() {
  var hero = document.querySelector('.wm-hero');
  if (!hero) return;

  var blobs = $all('.wm-blob');
  var circles = $all('.wm-circle');

  hero.addEventListener('mousemove', function(e) {
    var rect = hero.getBoundingClientRect();
    var x = (e.clientX - rect.left) / rect.width - 0.5;
    var y = (e.clientY - rect.top) / rect.height - 0.5;

    // Move blobs
    for (var i = 0; i < blobs.length; i++) {
      var speed = (i + 1) * 10;
      blobs[i].style.transform = 'translate(' + (x * speed) + 'px, ' + (y * speed) + 'px)';
    }

    // Move circles
    for (var j = 0; j < circles.length; j++) {
      var speed2 = (j + 1) * 5;
      circles[j].style.transform = 'translate(' + (x * speed2) + 'px, ' + (y * speed2) + 'px)';
    }
  });

  // Reset on mouse leave
  hero.addEventListener('mouseleave', function() {
    for (var k = 0; k < blobs.length; k++) {
      blobs[k].style.transform = '';
    }
    for (var l = 0; l < circles.length; l++) {
      circles[l].style.transform = '';
    }
  });
}

// ============================================================
// SMOOTH COUNTER ANIMATION
// ============================================================
function initSmoothCounterAnimation() {
  var counters = $all('.wm-count');

  // Check if counters are visible
  function checkCounters() {
    for (var i = 0; i < counters.length; i++) {
      var counter = counters[i];
      if (counter.classList.contains('counted')) continue;

      var rect = counter.getBoundingClientRect();
      var windowHeight = window.innerHeight || 800;

      if (rect.top < windowHeight - 100 && rect.bottom > 0) {
        counter.classList.add('counted');
        var target = parseInt(counter.getAttribute('data-target'), 10);
        if (!isNaN(target)) {
          animateCounter(counter, target);
        }
      }
    }
  }

  function animateCounter(element, target) {
    var duration = 2000;
    var startTime = performance.now();
    var startValue = 0;

    function update(currentTime) {
      var elapsed = currentTime - startTime;
      var progress = Math.min(elapsed / duration, 1);

      // Ease-out formula
      var easeOut = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(startValue + (target - startValue) * easeOut);

      element.textContent = formatNumber(current);

      if (progress < 1) {
        setTimeout(function() {
          update(performance.now());
        }, 16);
      } else {
        element.textContent = formatNumber(target);
      }
    }

    update(startTime);
  }

  // Check on scroll
  window.addEventListener("scroll", checkCounters);

  // Check on load
  checkCounters();
}

// ============================================================
// TIMELINE DRAW ANIMATION
// ============================================================
function initTimelineDrawAnimation() {
  var roadmap = document.querySelector('.wm-journey-roadmap');
  if (!roadmap) return;

  // Check if roadmap is visible
  function checkRoadmap() {
    var rect = roadmap.getBoundingClientRect();
    var windowHeight = window.innerHeight || 800;

    if (rect.top < windowHeight - 100 && rect.bottom > 0) {
      roadmap.classList.add('is-animated');
    }
  }

  window.addEventListener("scroll", checkRoadmap);
  checkRoadmap();
}

// ============================================================
// WHATSAPP PULSE ANIMATION
// ============================================================
function initWhatsAppPulse() {
  var helpBtn = document.querySelector(".need-help-btn");
  if (!helpBtn) return;

  function startPulse() {
    helpBtn.classList.add("pulse");
    setTimeout(function() {
      helpBtn.classList.remove("pulse");
    }, 1100);
  }

  // Start after delay
  setTimeout(function() {
    startPulse();
  }, 600);

  // Repeat interval
  setInterval(function() {
    startPulse();
  }, 4200);
}

// ============================================================
// WHY JOIN US MODAL
// ============================================================
function initWhyJoinUsModal() {
  var cards = $all('[data-why-join]');
  if (cards.length === 0) return;

  var overlay = $('#wmWhyJoinOverlay');
  var modal = $('#wmWhyJoinModal');
  if (!overlay || !modal) return;

  var titleEl = $('#wmWhyJoinTitle');
  var descEl = $('#wmWhyJoinShortDesc');
  var iconEl = $('#wmWhyJoinIcon');

  var benefitsListEl = $('#wmWhyJoinBenefitsList');
  var keyAdvantagesListEl = $('#wmWhyJoinKeyAdvantagesList');
  var learningListEl = $('#wmWhyJoinLearningList');
  var growthListEl = $('#wmWhyJoinGrowthList');
  var highlightsListEl = $('#wmWhyJoinHighlightsList');

  var activeCard = null;

  // Fallback data for each card
  var fallbackById = {
    innovation: {
      benefits: ['Innovation workshops', 'Creative problem solving', 'Modern technologies', 'Continuous improvement culture'],
      keyAdvantages: ['Collaborative experimentation', 'Clear feedback loops'],
      learning: ['Hands-on learning sessions', 'Skill-building sprints'],
      growth: ['Continuous improvement roadmap', 'Mentor-guided refinement'],
      highlights: ['Innovation-driven delivery', 'Premium execution standards']
    },
    growth: {
      benefits: ['Mentorship programs', 'Learning budget', 'Leadership pathways', 'Internal promotions'],
      keyAdvantages: ['Clear ownership', 'Structured progression'],
      learning: ['Mentor-guided learning', 'Role-specific workshops'],
      growth: ['Career ladders', 'Performance-backed development'],
      highlights: ['Growth-first planning', 'Transparent career milestones']
    },
    leaders: {
      benefits: ['Senior leadership guidance', 'Large-scale projects', 'Industry best practices', 'Professional networking'],
      keyAdvantages: ['Trusted decision-making', 'Accountability-driven execution'],
      learning: ['Leadership briefings', 'Best-practice playbooks'],
      growth: ['Expert mentorship', 'Career acceleration'],
      highlights: ['Industry leader alignment', 'Premium delivery standards']
    },
    freedom: {
      benefits: ['Ownership mindset', 'New ideas encouraged', 'Flexible workflows', 'Creative experimentation'],
      keyAdvantages: ['Autonomy with guardrails', 'Fast iteration cycles'],
      learning: ['Experimentation sprints', 'Creative skill upgrades'],
      growth: ['Role expansion roadmap', 'Mentor-backed refinement'],
      highlights: ['Creative excellence', 'Premium craft culture']
    },
    culture: {
      benefits: ['Team collaboration', 'Cross-functional projects', 'Open communication', 'Knowledge sharing'],
      keyAdvantages: ['Aligned goals', 'Shared ownership'],
      learning: ['Collaborative reviews', 'Knowledge exchange sessions'],
      growth: ['Team-to-lead progression', 'Continuous feedback'],
      highlights: ['Collaborative execution', 'Premium teamwork standards']
    },
    rewards: {
      benefits: ['Performance bonuses', 'Employee awards', 'Career recognition', 'Growth incentives'],
      keyAdvantages: ['Effort recognized', 'Impact measured'],
      learning: ['Skill advancement support', 'Premium training access'],
      growth: ['Reward-backed progression', 'Recognition culture'],
      highlights: ['Consistent excellence', 'Premium impact focus']
    }
  };

  function extractList(card, selector) {
    var list = card.querySelector(selector);
    if (!list) return [];
    var items = [];
    var lis = list.querySelectorAll('li');
    for (var i = 0; i < lis.length; i++) {
      var text = (lis[i].textContent || '').trim();
      if (text) items.push(text);
    }
    return items;
  }

  function setUL(el, items) {
    if (!el) return;
    var html = "";
    for (var i = 0; i < items.length; i++) {
      html += "<li>" + items[i] + "</li>";
    }
    el.innerHTML = html;
  }

  function fallbackItemsIfEmpty(items, fallback) {
    if (Array.isArray(items) && items.length > 0) {
      return items;
    }
    return fallback;
  }

  function renderModalFromCard(card) {
    var title = card.getAttribute('data-why-join-title') || '';
    var shortDesc = card.getAttribute('data-why-join-shortdesc') || '';
    var iconClass = card.getAttribute('data-why-join-icon') || '';

    if (titleEl) titleEl.textContent = title;
    if (descEl) descEl.textContent = shortDesc;

    if (iconEl) {
      iconEl.innerHTML = iconClass ? '<i class="' + iconClass + '"></i>' : '';
    }

    var benefits = extractList(card, '.wm-why-join-content [data-list="benefits"]');
    var keyAdvantages = extractList(card, '.wm-why-join-content [data-list="key-advantages"]');
    var learning = extractList(card, '.wm-why-join-content [data-list="learning"]');
    var growth = extractList(card, '.wm-why-join-content [data-list="growth"]');
    var highlights = extractList(card, '.wm-why-join-content [data-list="highlights"]');

    var cardId = card.getAttribute('data-why-join') || '';
    var fb = fallbackById[cardId] || fallbackById.innovation;

    var benefitsSafe = fallbackItemsIfEmpty(benefits, fb.benefits);
    var keyAdvantagesSafe = fallbackItemsIfEmpty(keyAdvantages, fb.keyAdvantages);
    var learningSafe = fallbackItemsIfEmpty(learning, fb.learning);
    var growthSafe = fallbackItemsIfEmpty(growth, fb.growth);
    var highlightsSafe = fallbackItemsIfEmpty(highlights, fb.highlights);

    setUL(benefitsListEl, benefitsSafe);
    setUL(keyAdvantagesListEl, keyAdvantagesSafe);
    setUL(learningListEl, learningSafe);
    setUL(growthListEl, growthSafe);
    setUL(highlightsListEl, highlightsSafe);

    // Always show all sections
    var allLists = [benefitsListEl, keyAdvantagesListEl, learningListEl, growthListEl, highlightsListEl];
    for (var i = 0; i < allLists.length; i++) {
      if (allLists[i]) {
        allLists[i].style.display = '';
      }
    }
  }

  function setActive(card) {
    if (activeCard) {
      activeCard.classList.remove('is-active-why');
    }
    activeCard = card;
    if (activeCard) {
      activeCard.classList.add('is-active-why');
    }
  }

  function openModal(card) {
    setActive(card);
    renderModalFromCard(card);

    document.body.classList.add('wm-whyjoin-no-scroll');
    overlay.classList.add('is-open');
    modal.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');

    var closeBtn = $('#wmWhyJoinCloseBtn');
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    overlay.classList.remove('is-open');
    modal.classList.remove('is-open');
    document.body.classList.remove('wm-whyjoin-no-scroll');

    setTimeout(function() {
      if (activeCard) activeCard.classList.remove('is-active-why');
      activeCard = null;
    }, 300);
  }

  // Click handlers for cards
  for (var i = 0; i < cards.length; i++) {
    (function(card) {
      card.addEventListener('click', function() {
        openModal(card);
      });
    })(cards[i]);
  }

  // Close button
  var closeBtn = $('#wmWhyJoinCloseBtn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Close on overlay click
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) {
      closeModal();
    }
  });

  // Close on ESC key
  document.addEventListener("keydown", function(e) {
    if (e.key === 'Escape') {
      if (overlay.classList.contains('is-open')) {
        closeModal();
      }
    }
  });
}

// ============================================================
// PREMIUM FAQ ACCORDION
// ============================================================
function initPremiumFAQ() {
  var faqCards = $all('[data-faq-card]');
  var faqAccordion = $('.wm-faq-accordion');
  var faqHeader = $('.wm-faq-header');

  if (faqCards.length === 0) return;

  // Reveal FAQ on scroll
  function checkFAQReveal() {
    // Check header
    if (faqHeader && !faqHeader.classList.contains('is-revealed')) {
      var headerRect = faqHeader.getBoundingClientRect();
      var windowHeight = window.innerHeight || 800;

      if (headerRect.top < windowHeight - 50 && headerRect.bottom > 0) {
        faqHeader.classList.add('is-revealed');
      }
    }

    // Check cards with stagger
    for (var i = 0; i < faqCards.length; i++) {
      var card = faqCards[i];
      if (card.classList.contains('is-revealed')) continue;

      var rect = card.getBoundingClientRect();
      var windowHeight = window.innerHeight || 800;

      if (rect.top < windowHeight - 50 && rect.bottom > 0) {
        // Add stagger delay
        card.style.transitionDelay = (i * 100) + 'ms';
        card.classList.add('is-revealed');
      }
    }
  }

  // Active card management
  for (var i = 0; i < faqCards.length; i++) {
    (function(card) {
      var trigger = card.querySelector('.wm-faq-trigger');
      var collapse = card.querySelector('.wm-faq-collapse');

      if (!trigger || !collapse) return;

      trigger.addEventListener('click', function() {
        // Small delay to let Bootstrap update
        setTimeout(function() {
          var isExpanded = trigger.getAttribute('aria-expanded') === 'true';

          // Remove active from all cards
          for (var j = 0; j < faqCards.length; j++) {
            faqCards[j].classList.remove('is-active');
          }

          // Add active to current if expanded
          if (isExpanded) {
            card.classList.add('is-active');
          }
        }, 10);
      });

      // Bootstrap collapse events
      collapse.addEventListener('show.bs.collapse', function() {
        for (var k = 0; k < faqCards.length; k++) {
          faqCards[k].classList.remove('is-active');
        }
        card.classList.add('is-active');
      });

      collapse.addEventListener('hide.bs.collapse', function() {
        card.classList.remove('is-active');
      });

      // Cursor tilt effect
      card.addEventListener('mousemove', function(e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        var centerX = rect.width / 2;
        var centerY = rect.height / 2;

        var rotateX = ((y - centerY) / centerY) * -2;
        var rotateY = ((x - centerX) / centerX) * 2;

        var clampedRotateX = Math.max(-2, Math.min(2, rotateX));
        var clampedRotateY = Math.max(-2, Math.min(2, rotateY));

        var mouseXPercent = (x / rect.width) * 100;
        var mouseYPercent = (y / rect.height) * 100;

        card.style.setProperty('--mouse-x', mouseXPercent + '%');
        card.style.setProperty('--mouse-y', mouseYPercent + '%');

        if (!collapse.classList.contains('collapsing')) {
          card.style.transform = 'perspective(1000px) rotateX(' + clampedRotateX + 'deg) rotateY(' + clampedRotateY + 'deg) translateY(-8px) scale(1.02)';
        }
      });

      card.addEventListener('mouseleave', function() {
        if (!card.classList.contains('is-active')) {
          card.style.transform = '';
        } else {
          card.style.transform = 'translateY(-8px) scale(1.02)';
        }

        card.style.setProperty('--mouse-x', '50%');
        card.style.setProperty('--mouse-y', '50%');
      });
    })(faqCards[i]);
  }

  // Icon float animation
  var faqIcons = $all('.wm-faq-icon');
  for (var m = 0; m < faqIcons.length; m++) {
    (function(icon) {
      icon.addEventListener('mouseenter', function() {
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          icon.style.animation = 'iconFloat 2s ease-in-out infinite';
        }
      });

      icon.addEventListener('mouseleave', function() {
        icon.style.animation = '';
      });
    })(faqIcons[m]);
  }

  // Check FAQ reveal on scroll
  window.addEventListener("scroll", checkFAQReveal);
  checkFAQReveal();
}

// ============================================================
// INITIALIZE EVERYTHING
// ============================================================
function boot() {
  attachRipple();
  renderJobs();

  initScrollReveal();
  initCountUp();
  initSmoothCounterAnimation();

  initWhyJoinUsModal();

  initButtons();
  initForms();

  initWhatsAppPulse();
  initCareerJourneyInteractions();
  initTimelineDrawAnimation();

  initCursorInteractions();
  initMouseParallax();

  initPremiumFAQ();
}

// Start when page is ready
document.addEventListener("DOMContentLoaded", boot);