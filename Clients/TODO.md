# Clients Featured Clients Fix — TODO

- [ ] Replace the entire Featured Clients section markup in `Event-Management/Clients/Clients.html` with 6 premium cards (Microsoft, AWS, Google, Accenture, Infosys, IBM)
  - [ ] Ensure each card includes: HD top image, logo badge, industry badge, company name, premium title, short description, achievement metric, CTA arrow
  - [ ] Add stagger/fade-up attributes using existing `data-ct-anim` / `data-ct-delay`
  - [ ] Ensure no broken/placeholder images (use valid Unsplash HD URLs)
- [ ] Update ONLY related CSS in `Event-Management/Clients/Clients.css`
  - [ ] Replace featured-clients layout to grid: 3/2/1 responsive
  - [ ] Implement premium styling: white bg, gold accents, navy headings, 24px radius, premium shadow, glass touch
  - [ ] Implement all requested hover + shine + image zoom + badge float + smooth transitions
- [ ] Update minimal JS in `Event-Management/Clients/Clients.js` only if required for reveal/animations
- [ ] Validate
  - [ ] Images load (no broken icons)
  - [ ] Equal card heights
  - [ ] Animations trigger on scroll and hover
  - [ ] Mobile responsive and no overflow
  - [ ] No console errors

