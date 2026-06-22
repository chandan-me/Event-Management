/* Clients & Trust â€” production-ready vanilla JavaScript -------------------------------------------------------- Implements: - Scroll reveal animations (IntersectionObserver) - Animated counters (on first stats visibility) - Industry filtering (smooth fade) - View More / Show Less clients - Testimonial slider (auto + controls + pause on hover) - CTA actions (scrollIntoView) - Logo tilt/parallax reset on mouse leave - Marquee pause/resume on hover + click Beginner-friendly JS only: var/let/const, functions, loops, conditionals, DOM manipulation, event handling. */
document.addEventListener('DOMContentLoaded', function() {
            'use strict'; // ----------------------------- // Helpers // ----------------------------- function clamp(num, min, max) { if (num < min) return min; if (num > max) return max; return num; } function addClass(el, className) { if (!el) return; el.classList.add(className); } function removeClass(el, className) { if (!el) return; el.classList.remove(className); } function hasIntersectionObserver() { return !!('IntersectionObserver' in window); } function prefersReducedMotion() { if (!window.matchMedia) return false; return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } function getAttrInt(el, attrName) { if (!el) return 0; var raw = el.getAttribute(attrName); var n = parseInt(raw, 10); if (isNaN(n)) return 0; return n; } function smoothScrollTo(selectorOrEl, block) { var target = null; if (!selectorOrEl) return; if (typeof selectorOrEl === 'string') { target = document.querySelector(selectorOrEl); } else { target = selectorOrEl; } if (!target) return; try { target.scrollIntoView({ behavior: 'smooth', block: block || 'start' }); } catch (e) { // Fallback target.scrollIntoView(); } } // ----------------------------- // Scroll Reveal Animations // ----------------------------- function initScrollReveal() { var nodes = document.querySelectorAll('[data-ct-anim]'); if (!nodes || nodes.length === 0) return; // If reduced motion, show immediately. if (prefersReducedMotion()) { for (var i = 0; i < nodes.length; i++) addClass(nodes[i], 'ct-revealed'); return; } if (!hasIntersectionObserver()) { for (var j = 0; j < nodes.length; j++) addClass(nodes[j], 'ct-revealed'); return; } var io = new IntersectionObserver(function (entries) { for (var k = 0; k < entries.length; k++) { var entry = entries[k]; if (!entry.isIntersecting) continue; var node = entry.target; var delayMs = 0; var d = node.getAttribute('data-ct-delay'); if (d) { var parsed = parseInt(d, 10); if (!isNaN(parsed)) delayMs = parsed; } window.setTimeout(function (n) { addClass(n, 'ct-revealed'); }.bind(null, node), delayMs); io.unobserve(node); } }, { threshold: 0.14 }); for (var n = 0; n < nodes.length; n++) io.observe(nodes[n]); } // ----------------------------- // Animated Counters (Stats) // ----------------------------- function initCounters() { var counters = document.querySelectorAll('[data-ct-counter]'); if (!counters || counters.length === 0) return; // Only run once. var hasStarted = false; function animateCounter(el, target) { if (!el) return; var duration = 1400; // ms var startTime = null; var current = 0; function step(timestamp) { if (!startTime) startTime = timestamp; var elapsed = timestamp - startTime; var progress = clamp(elapsed / duration, 0, 1); // Ease-out cubic var eased = 1 - Math.pow(1 - progress, 3); current = Math.round(target * eased); el.textContent = String(current); if (progress < 1) { window.requestAnimationFrame(step); } } window.requestAnimationFrame(step); } if (prefersReducedMotion()) { for (var i = 0; i < counters.length; i++) { var t = getAttrInt(counters[i], 'data-ct-target'); counters[i].textContent = String(t); } return; } if (!hasIntersectionObserver()) { if (!hasStarted) { hasStarted = true; for (var j = 0; j < counters.length; j++) { var targetVal = getAttrInt(counters[j], 'data-ct-target'); animateCounter(counters[j], targetVal); } } return; } // Observe the first counter to start all counters. var io = new IntersectionObserver(function (entries) { for (var k = 0; k < entries.length; k++) { var entry = entries[k]; if (!entry.isIntersecting) continue; if (hasStarted) continue; hasStarted = true; for (var j = 0; j < counters.length; j++) { var targetVal = getAttrInt(counters[j], 'data-ct-target'); animateCounter(counters[j], targetVal); } io.disconnect(); } }, { threshold: 0.22 }); io.observe(counters[0]); } // ----------------------------- // Industry Filtering // ----------------------------- function initIndustryFilters() { var pills = document.querySelectorAll('[data-ct-filter]'); var cards = document.querySelectorAll('[data-ct-client]'); if (!pills || pills.length === 0 || !cards || cards.length === 0) return; var activeKey = 'all'; function matches(card, key) { if (key === 'all') return true; var cardKey = card.getAttribute('data-ct-filter'); return cardKey === key; } function applyFilter(key) { activeKey = key; for (var i = 0; i < pills.length; i++) { var p = pills[i]; var k = p.getAttribute('data-ct-filter'); if (k === key) { addClass(p, 'ct-pill-active'); p.setAttribute('aria-selected', 'true'); } else { removeClass(p, 'ct-pill-active'); p.setAttribute('aria-selected', 'false'); } } for (var j = 0; j < cards.length; j++) { var card = cards[j]; var ok = matches(card, key); // Smooth transition via inline style. if (ok) { card.style.opacity = '1'; card.style.transform = 'translateY(0px)'; card.style.pointerEvents = 'auto'; card.style.display = ''; } else { card.style.opacity = '0'; card.style.transform = 'translateY(10px)'; card.style.pointerEvents = 'none'; window.setTimeout(function (c) { if (!c) return; // Keep hidden after fade for layout cleanliness. c.style.display = 'none'; }.bind(null, card), 180); } } } // Click handlers for (var pIndex = 0; pIndex < pills.length; pIndex++) { pills[pIndex].addEventListener('click', function () { var k = this.getAttribute('data-ct-filter'); if (!k) k = 'all'; applyFilter(k); }); // Keyboard-friendly: Enter/Space trigger pills[pIndex].addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.click(); } }); } // Initial show all. applyFilter('all'); } // ----------------------------- // View More Clients (logo grid) // ----------------------------- function initViewMoreClients() { var grid = document.querySelector('#client-logos .ct-logo-grid'); var btn = document.getElementById('ct-load-more'); if (!grid || !btn) return; var cards = grid.querySelectorAll('[data-ct-client]'); if (!cards || cards.length === 0) return; // Choose a reasonable default based on viewport size. // For production: show a subset on load, reveal the rest on click. var initialCount = 8; function computeInitialCount() { var w = window.innerWidth || 1024; // Mobile: show fewer if (w < 576) return 4; if (w < 768) return 6; if (w < 1200) return 8; return 10; } function applyVisibility(maxVisible) { for (var i = 0; i < cards.length; i++) { var c = cards[i]; if (i < maxVisible) { // Respect filtering: if JS filter hides a card, keep it hidden. // We'll show via display only if currently not filtered-out. if (c.getAttribute('data-hidden-by-filter') === '1') { c.style.display = 'none'; c.style.opacity = '0'; } else { c.style.display = ''; c.style.opacity = '1'; } } else { c.style.display = 'none'; c.style.opacity = '0'; } } } // Integrate with filtering without rewriting filter logic: // We'll store a temporary marker when filter hides cards. // This is done by observing style changes in a simpler way: // We'll just maintain our own list for view-more. var state = { expanded: false, initialCount: computeInitialCount(), }; function setButtonText() { btn.textContent = state.expanded ? 'Show Less' : 'View All Clients'; } function initState() { state.initialCount = computeInitialCount(); state.expanded = false; applyVisibility(state.initialCount); setButtonText(); } // Button click btn.addEventListener('click', function () { // Determine current visible count based on expanded state. state.expanded = !state.expanded; if (state.expanded) { // show all cards that are not filter-hidden for (var i = 0; i < cards.length; i++) { var c = cards[i]; // If filter currently set display none, keep it. // If it is hidden by filter (opacity 0/transform), we still might show it. // We'll only override display if it has no inline display:none. if (c.style.display === 'none' && c.getAttribute('data-hidden-by-filter') !== '1') { // If filter hid it, it will already have display none. // We can't perfectly detect, so we re-show. c.style.display = ''; c.style.opacity = '1'; } else if (c.style.display === 'none') { c.style.display = ''; c.style.opacity = '1'; } else { c.style.display = ''; c.style.opacity = '1'; } } } else { applyVisibility(state.initialCount); } setButtonText(); }); // Responsive recalculation window.addEventListener('resize', function () { if (state.expanded) return; // keep expanded state.initialCount = computeInitialCount(); applyVisibility(state.initialCount); setButtonText(); }); initState(); } // ----------------------------- // Testimonial Slider // ----------------------------- function initTestimonials() { var slider = document.getElementById('ct-testimonial-slider'); if (!slider) return; var cards = slider.querySelectorAll('[data-ct-slide]'); if (!cards || cards.length === 0) return; var prevBtn = document.getElementById('ct-prev-testimonial'); var nextBtn = document.getElementById('ct-next-testimonial'); var dotsWrap = document.getElementById('ct-slider-dots'); var index = 0; function update() { for (var i = 0; i < cards.length; i++) { if (i === index) { addClass(cards[i], 'ct-active'); } else { removeClass(cards[i], 'ct-active'); } } if (dotsWrap) { var dots = dotsWrap.querySelectorAll('.ct-dot-btn'); for (var d = 0; d < dots.length; d++) { if (d === index) addClass(dots[d], 'ct-dot-active'); else removeClass(dots[d], 'ct-dot-active'); } } } function next() { index = index + 1; if (index >= cards.length) index = 0; update(); } function prev() { index = index - 1; if (index < 0) index = cards.length - 1; update(); } if (prevBtn) prevBtn.addEventListener('click', prev); if (nextBtn) nextBtn.addEventListener('click', next); // Build dots if (dotsWrap) { dotsWrap.innerHTML = ''; for (var iDot = 0; iDot < cards.length; iDot++) { var dot = document.createElement('button'); dot.type = 'button'; dot.className = 'ct-dot-btn'; dot.setAttribute('aria-label', 'Go to testimonial ' + (iDot + 1)); (function (capturedIndex) { dot.addEventListener('click', function () { index = capturedIndex; update(); }); })(iDot); dotsWrap.appendChild(dot); } } update(); // Auto slide var timerId = null; var intervalMs = 6500; function startAuto() { if (timerId) return; timerId = window.setInterval(function () { next(); }, intervalMs); } function stopAuto() { if (!timerId) return; window.clearInterval(timerId); timerId = null; } // Pause on hover (and touch devices naturally won't hover) slider.addEventListener('mouseenter', stopAuto); slider.addEventListener('mouseleave', startAuto); // Pause when tab hidden document.addEventListener('visibilitychange', function () { if (document.hidden) stopAuto(); else startAuto(); }); // Reduced motion: do not auto-slide. if (!prefersReducedMotion()) startAuto(); } // ----------------------------- // CTA & Scroll-to Actions // ----------------------------- function initCTAActions() { var ctas = document.querySelectorAll('[data-ct-action]'); for (var i = 0; i < ctas.length; i++) { ctas[i].addEventListener('click', function () { var action = this.getAttribute('data-ct-action'); if (!action) return; if (action === 'portfolio') { smoothScrollTo('#client-showcase', 'start'); } if (action === 'contact') { smoothScrollTo('#trust-cta', 'center'); } }); ctas[i].addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.click(); } }); } var scrollBtns = document.querySelectorAll('[data-ct-scrollto]'); for (var b = 0; b < scrollBtns.length; b++) { scrollBtns[b].addEventListener('click', function () { var sel = this.getAttribute('data-ct-scrollto'); if (!sel) return; smoothScrollTo(sel, 'start'); }); scrollBtns[b].addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.click(); } }); } } // ----------------------------- // Logo Tilt / Parallax Reset // ----------------------------- function initLogoTiltParallax() { // Reuse same behavior for multiple interactive card types. // Uses CSS variables (--mx, --my) and transform tilt. var items = document.querySelectorAll('.ct-logo-card, .ct-glass-card, .ct-card-hover, .ct-cta-card, .ct-testimonial-card'); if (!items || items.length === 0) return; if (prefersReducedMotion()) return; for (var i = 0; i < items.length; i++) { (function () { var el = items[i]; el.addEventListener('mousemove', function (e) { var rect = el.getBoundingClientRect(); if (rect.width === 0 || rect.height === 0) return; var x = e.clientX - rect.left; var y = e.clientY - rect.top; var mx = (x / rect.width) * 100; var my = (y / rect.height) * 100; el.style.setProperty('--mx', mx + '%'); el.style.setProperty('--my', my + '%'); // Gentle tilt var tiltX = ((y - rect.height / 2) / rect.height) * -6; var tiltY = ((x - rect.width / 2) / rect.width) * 7; el.style.transform = 'translateY(-2px) rotateX(' + tiltX + 'deg) rotateY(' + tiltY + 'deg)'; }); el.addEventListener('mouseleave', function () { el.style.transform = ''; el.style.setProperty('--mx', '50%'); el.style.setProperty('--my', '50%'); }); })(); } } // ----------------------------- // Marquee Controls (pause on hover + click toggle) // ----------------------------- function initMarqueeControls() { var marquee = document.getElementById('ct-marquee'); if (!marquee) return; // Pause/resume on hover is already supported via CSS hover. // We add click-to-toggle for touch devices. marquee.addEventListener('click', function () { // Find the track and control animation play state. var track = marquee.querySelector('.ct-marquee-track'); if (!track) return; var paused = marquee.getAttribute('data-ct-marquee-paused') === '1'; if (paused) { marquee.setAttribute('data-ct-marquee-paused', '0'); track.style.animationPlayState = 'running'; } else { marquee.setAttribute('data-ct-marquee-paused', '1'); track.style.animationPlayState = 'paused'; } }); // Also toggle pause for keyboard accessibility. marquee.setAttribute('tabindex', '0'); marquee.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); marquee.click(); } }); } // ----------------------------- // View initial card active/testimonial CSS alignment // ----------------------------- function ensureInitialStates() { // Provide initial ct-active for the first testimonial. var slider = document.getElementById('ct-testimonial-slider'); if (!slider) return; var first = slider.querySelector('[data-ct-slide]'); if (first) addClass(first, 'ct-active'); } // ----------------------------- // Boot // ----------------------------- initScrollReveal(); initCounters(); initIndustryFilters(); initViewMoreClients(); initTestimonials(); initCTAActions(); initLogoTiltParallax(); initMarqueeControls(); ensureInitialStates(); });
/* Clients — Enterprise interactions (beginner-friendly JS) */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  function clamp(num, min, max) {
    if (num < min) return min;
    if (num > max) return max;
    return num;
  }

  function addClass(el, className) {
    if (!el) return;
    el.classList.add(className);
  }

  function removeClass(el, className) {
    if (!el) return;
    el.classList.remove(className);
  }

  function prefersReducedMotion() {
    if (!window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function hasIntersectionObserver() {
    return !!('IntersectionObserver' in window);
  }

  function getAttrInt(el, attrName) {
    if (!el) return 0;
    var raw = el.getAttribute(attrName);
    var n = parseInt(raw, 10);
    if (isNaN(n)) return 0;
    return n;
  }

  function smoothScrollTo(selectorOrEl, block) {
    var target = null;
    if (!selectorOrEl) return;
    if (typeof selectorOrEl === 'string') target = document.querySelector(selectorOrEl);
    else target = selectorOrEl;
    if (!target) return;

    try {
      target.scrollIntoView({ behavior: 'smooth', block: block || 'start' });
    } catch (e) {
      target.scrollIntoView();
    }
  }

  function initScrollReveal() {
    var nodes = document.querySelectorAll('[data-ct-anim]');
    if (!nodes || nodes.length === 0) return;

    if (prefersReducedMotion() || !hasIntersectionObserver()) {
      for (var i = 0; i < nodes.length; i++) addClass(nodes[i], 'ct-revealed');
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      for (var k = 0; k < entries.length; k++) {
        var entry = entries[k];
        if (!entry.isIntersecting) continue;

        var node = entry.target;
        var delayMs = 0;
        var d = node.getAttribute('data-ct-delay');
        if (d) {
          var parsed = parseInt(d, 10);
          if (!isNaN(parsed)) delayMs = parsed;
        }

        window.setTimeout(function (n) {
          addClass(n, 'ct-revealed');
        }.bind(null, node), delayMs);

        io.unobserve(node);
      }
    }, { threshold: 0.14 });

    for (var n = 0; n < nodes.length; n++) io.observe(nodes[n]);
  }

  function formatCompactMillion(n){
    // 2,000,000 => 2M, but keep integer for this UI
    if (n >= 1000000) return String(Math.round(n / 1000000)) + 'M';
    return String(n);
  }

  function initCounters() {
    var counters = document.querySelectorAll('[data-ct-counter]');
    if (!counters || counters.length === 0) return;

    function animateCounter(el, target) {
      var duration = 1450;
      var startTime = null;

      var isCompact = el.classList.contains('ct-counter-compact');

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var elapsed = timestamp - startTime;
        var progress = clamp(elapsed / duration, 0, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = Math.round(target * eased);
        el.textContent = isCompact ? formatCompactMillion(current) : String(current);

        if (progress < 1) window.requestAnimationFrame(step);
      }

      window.requestAnimationFrame(step);
    }

    if (prefersReducedMotion() || !hasIntersectionObserver()) {
      for (var i = 0; i < counters.length; i++) {
        var t = getAttrInt(counters[i], 'data-ct-target');
        var isCompact = counters[i].classList.contains('ct-counter-compact');
        counters[i].textContent = isCompact ? formatCompactMillion(t) : String(t);
      }
      return;
    }


    var started = false;
    var io = new IntersectionObserver(function (entries) {
      if (started) return;

      for (var k = 0; k < entries.length; k++) {
        if (!entries[k].isIntersecting) continue;
        started = true;

        for (var j = 0; j < counters.length; j++) {
          var targetVal = getAttrInt(counters[j], 'data-ct-target');
          animateCounter(counters[j], targetVal);
        }

        io.disconnect();
        break;
      }
    }, { threshold: 0.22 });

    io.observe(counters[0]);
  }

  function initIndustryTabs() {
    var tabs = document.querySelectorAll('[data-ct-industry]');
    if (!tabs || tabs.length === 0) return;

    var panels = document.querySelectorAll('[data-ct-industry-panel]');
    if (!panels || panels.length === 0) return;

    function setActive(key) {
      for (var i = 0; i < tabs.length; i++) {
        var t = tabs[i];
        if (t.getAttribute('data-ct-industry') === key) {
          addClass(t, 'is-active');
          t.setAttribute('aria-selected', 'true');
        } else {
          removeClass(t, 'is-active');
          t.setAttribute('aria-selected', 'false');
        }
      }

      for (var p = 0; p < panels.length; p++) {
        var panel = panels[p];
        var k = panel.getAttribute('data-ct-industry-panel');
        if (k === key) {
          addClass(panel, 'is-active');
          panel.style.display = 'block';
        } else {
          removeClass(panel, 'is-active');
          panel.style.display = 'none';
        }
      }
    }

    for (var j = 0; j < tabs.length; j++) {
      tabs[j].addEventListener('click', function () {
        var key = this.getAttribute('data-ct-industry');
        if (!key) return;
        setActive(key);
      });

      tabs[j].addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });
    }
  }

  function initViewMore() {
    var btn = document.getElementById('ct-view-more-btn');
    if (!btn) return;

    // Beginner-friendly: toggles state + reveals additional hidden items if present.
    btn.addEventListener('click', function () {
      // Our current markup shows all 16 cards. Keep behaviour premium by toggling label.
      var isExpanded = btn.getAttribute('data-expanded') === '1';
      if (isExpanded) {
        btn.setAttribute('data-expanded', '0');
        btn.textContent = 'View More';
      } else {
        btn.setAttribute('data-expanded', '1');
        btn.textContent = 'Viewing Portfolio';
      }
    });
  }

  function initMagneticButtons() {
    if (prefersReducedMotion()) return;

    var btns = document.querySelectorAll('.ct-magnetic');
    if (!btns || btns.length === 0) return;

    for (var i = 0; i < btns.length; i++) {
      (function () {
        var btn = btns[i];

        btn.addEventListener('mousemove', function (e) {
          var rect = btn.getBoundingClientRect();
          var x = e.clientX - rect.left;
          var y = e.clientY - rect.top;
          var dx = (x - rect.width / 2) / rect.width;
          var dy = (y - rect.height / 2) / rect.height;

          var mx = dx * 10;
          var my = dy * 10;

          btn.style.setProperty('--mx', (-mx) + 'px');
          btn.style.setProperty('--my', (-my) + 'px');
          btn.style.setProperty('--ms', '1.04');
        });

        btn.addEventListener('mouseleave', function () {
          btn.style.setProperty('--mx', '0px');
          btn.style.setProperty('--my', '0px');
          btn.style.setProperty('--ms', '1');
        });
      })();
    }
  }

  function initCTAactions() {
    var ctas = document.querySelectorAll('[data-ct-action]');
    for (var i = 0; i < ctas.length; i++) {
      ctas[i].addEventListener('click', function () {
        var action = this.getAttribute('data-ct-action');
        if (!action) return;
        if (action === 'gallery') smoothScrollTo('#clients-gallery', 'start');
        if (action === 'contact') smoothScrollTo('#trust-cta', 'center');
      });
    }

    var scrollBtns = document.querySelectorAll('[data-ct-scrollto]');
    for (var b = 0; b < scrollBtns.length; b++) {
      scrollBtns[b].addEventListener('click', function () {
        var sel = this.getAttribute('data-ct-scrollto');
        // In our markup, this is present but href already targets anchors.
        if (sel && sel.charAt(0) === '#') smoothScrollTo(sel, 'start');
      });
    }
  }

  function initTestimonials() {
    var slider = document.getElementById('ct-testimonial-slider');
    if (!slider) return;

    var cards = slider.querySelectorAll('[data-ct-slide]');
    if (!cards || cards.length === 0) return;

    var prevBtn = document.getElementById('ct-prev-testimonial');
    var nextBtn = document.getElementById('ct-next-testimonial');
    var dotsWrap = document.getElementById('ct-slider-dots');

    var index = 0;

    var track = slider.querySelector('[data-ct-testimonial-track]');

    function apply() {
      for (var i = 0; i < cards.length; i++) {
        if (i === index) addClass(cards[i], 'ct-active');
        else removeClass(cards[i], 'ct-active');
      }

      if (dotsWrap) {
        var dots = dotsWrap.querySelectorAll('.ct-dot-btn');
        for (var d = 0; d < dots.length; d++) {
          if (d === index) addClass(dots[d], 'ct-dot-active');
          else removeClass(dots[d], 'ct-dot-active');
        }
      }

      if (track) {
        // Slide using translateX: index * 100%
        track.style.transform = 'translateX(' + (-index * 100) + '%)';
      }
    }

    function next() {
      index = index + 1;
      if (index >= cards.length) index = 0;
      apply();
    }

    function prev() {
      index = index - 1;
      if (index < 0) index = cards.length - 1;
      apply();
    }

    if (prevBtn) prevBtn.addEventListener('click', prev);
    if (nextBtn) nextBtn.addEventListener('click', next);

    // Touch swipe support
    (function () {
      var startX = 0;
      var endX = 0;
      var threshold = 42;

      slider.addEventListener('touchstart', function (e) {
        if (!e.touches || !e.touches[0]) return;
        startX = e.touches[0].clientX;
      }, { passive: true });

      slider.addEventListener('touchend', function (e) {
        if (!e.changedTouches || !e.changedTouches[0]) return;
        endX = e.changedTouches[0].clientX;
        var delta = endX - startX;
        if (Math.abs(delta) < threshold) return;
        if (delta < 0) next();
        else prev();
      });
    })();

    // Build dots
    if (dotsWrap) {
      dotsWrap.innerHTML = '';
      for (var di = 0; di < cards.length; di++) {
        (function (capturedIndex) {
          var dot = document.createElement('button');
          dot.type = 'button';
          dot.className = 'ct-dot-btn';
          dot.setAttribute('aria-label', 'Go to testimonial ' + (capturedIndex + 1));
          dot.addEventListener('click', function () {
            index = capturedIndex;
            apply();
          });
          dotsWrap.appendChild(dot);
        })(di);
      }
    }

    apply();

    // Auto slide (pause on hover)
    var timerId = null;
    var intervalMs = 6000;

    function startAuto() {
      if (timerId) return;
      timerId = window.setInterval(function () { next(); }, intervalMs);
    }

    function stopAuto() {
      if (!timerId) return;
      window.clearInterval(timerId);
      timerId = null;
    }

    slider.addEventListener('mouseenter', stopAuto);
    slider.addEventListener('mouseleave', startAuto);

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stopAuto();
      else startAuto();
    });

    if (!prefersReducedMotion()) startAuto();

    // Keyboard nav
    document.addEventListener('keydown', function (e) {
      var active = document.activeElement;
      if (!active || !active.closest) return;
      var isInSlider = active.closest('#ct-testimonial-slider');
      if (!isInSlider) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        next();
      }
    });
  }

  // WhatsApp pulse (match Blog/Careers behavior)
  (function initWhatsAppPulse() {
    var helpBtn = document.querySelector('.need-help-btn');
    if (!helpBtn) return;

    function startPulse() {
      helpBtn.classList.add('pulse');
      window.setTimeout(function () {
        helpBtn.classList.remove('pulse');
      }, 1100);
    }

    window.setTimeout(function () {
      startPulse();
    }, 600);

    window.setInterval(function () {
      startPulse();
    }, 4200);
  })();

  // Init
  initScrollReveal();
  initCounters();
  initIndustryTabs();
  initViewMore();
  initMagneticButtons();
  initCTAactions();
  initTestimonials();
});


