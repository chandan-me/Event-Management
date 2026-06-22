(function() {
        const init = () => {
                const btn = document.querySelector('.submit-btn');
                if (!btn) return;
                const card = btn.closest('.contact-form-card') || document;
                const nameInput = card.querySelector('input[placeholder="John Doe"], input[type="text"][placeholder*="John"]');
                const emailInput = card.querySelector('input[type="email"], input[placeholder*="@"]');
                const phoneInput = card.querySelector('input[type="tel"], input[placeholder*="+91"]');
                const eventTypeSelect = card.querySelector('select.form-input');
                const dateInput = card.querySelector('input[type="date"].form-input, input[type="date"]');
                const locationInput = card.querySelector('input[placeholder*="Bangalore"], input[placeholder*="preferred city"]');
                const detailsTextArea = card.querySelector('textarea.form-input');
                const requiredFields = [{
                    el: nameInput,
                    label: 'Full Name'
                }, {
                    el: emailInput,
                    label: 'Email Address'
                }, {
                    el: phoneInput,
                    label: 'Phone Number'
                }, {
                    el: eventTypeSelect,
                    label: 'Event Type'
                }, {
                    el: dateInput,
                    label: 'Preferred Date'
                }, {
                    el: locationInput,
                    label: 'Event Location'
                }, {
                    el: detailsTextArea,
                    label: 'Tell Us About Your Vision'
                }, ];
                const ensureErrorEl = (fieldEl) => {
                    if (!fieldEl) return null;
                    let err = fieldEl.parentElement ? fieldEl.parentElement.querySelector('.field-error') : null;
                    if (!err) {
                        err = document.createElement('div');
                        err.className = 'field-error';
                        err.style.color = '#dc3545';
                        err.style.fontSize = '0.9rem';
                        err.style.marginTop = '6px';
                        err.style.display = 'none';
                        if (fieldEl.parentElement) fieldEl.parentElement.appendChild(err);
                    }
                    return err;
                };
                const setInvalid = (fieldEl, message) => {
                    if (!fieldEl) return;
                    fieldEl.classList.add('input-invalid');
                    const err = ensureErrorEl(fieldEl);
                    if (err) {
                        err.textContent = message;
                        err.style.display = 'block';
                    }
                };
                const clearInvalid = (fieldEl) => {
                    if (!fieldEl) return;
                    fieldEl.classList.remove('input-invalid');
                    const err = ensureErrorEl(fieldEl);
                    if (err) {
                        err.textContent = '';
                        err.style.display = 'none';
                    }
                };
                const isEmpty = (el) => {
                    if (!el) return true;
                    if (el.tagName === 'SELECT') return !el.value || el.value.trim() === '';
                    if (el.tagName === 'TEXTAREA') return !el.value || el.value.trim() === '';
                    return !el.value || el.value.trim() === '';
                };
                const validate = () => {
                    let firstInvalid = null;
                    requiredFields.forEach(({
                        el
                    }) => {
                        clearInvalid(el);
                    });
                    for (const {
                            el,
                            label
                        }
                        of requiredFields) {
                        if (!el || isEmpty(el)) {
                            if (!firstInvalid) firstInvalid = el;
                            setInvalid(el, `Please fill ${label}.`);
                        }
                    }
                    return firstInvalid;
                };
                btn.addEventListener('click', (e) => { // stop any default behavior (button might be inside forms in other layouts) e.preventDefault(); const firstInvalid = validate(); if (firstInvalid) { firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' }); firstInvalid.focus?.(); } }); }; if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); } else { init(); } })();