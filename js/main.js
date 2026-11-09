/**
 * Aejis Media Fusion — Main application logic
 * - Renders pricing cards from CONFIG
 * - Mobile menu toggle (accessible)
 * - Scroll reveal via IntersectionObserver
 * - FAQ accordion (ARIA compliant, keyboard operable)
 * - Smooth scroll for anchor links
 * - Footer year + contact link visibility
 * - Form URL injected from CONFIG into all CTAs
 */

(function () {
  'use strict';

  // -------------------------------------------------
  // Inject CONFIG.formUrl into every CTA button
  // -------------------------------------------------
  const formButtons = document.querySelectorAll('[data-form]');
  formButtons.forEach((btn) => {
    btn.href = CONFIG.formUrl;
    btn.target = '_blank';
    btn.rel = 'noopener noreferrer';
  });

  // -------------------------------------------------
  // Render pricing cards from CONFIG.plans
  // -------------------------------------------------
  const pricingGrid = document.getElementById('pricing-grid');
  const priceNote = document.getElementById('price-note');

  if (pricingGrid) {
    pricingGrid.innerHTML = CONFIG.plans.map((plan, index) => {
      const popularBadge = plan.popular
        ? '<span class="plan-badge">Most popular</span>'
        : '';
      const featureItems = plan.features
        .map((f) => `<li class="feature-item"><span class="feature-check">✓</span> ${f}</li>`)
        .join('');

      return `
        <article class="plan-card ${plan.popular ? 'plan-card--popular' : ''}">
          ${popularBadge}
          <h3 class="plan-name">${plan.name}</h3>
          <div class="plan-price">
            <span class="currency">$</span>
            <span class="amount">${plan.price}</span>
            <span class="period">/month</span>
          </div>
          <p class="plan-shorts">${plan.shorts}</p>
          <ul class="plan-features">${featureItems}</ul>
          <a href="${CONFIG.formUrl}" class="btn btn--primary btn--block" target="_blank" rel="noopener noreferrer">
            Get Started
          </a>
        </article>
      `;
    }).join('');
  }

  // -------------------------------------------------
  // Footer year
  // -------------------------------------------------
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // -------------------------------------------------
  // Hide empty contact links in footer
  // -------------------------------------------------
  const contactItems = document.querySelectorAll('[data-contact]');
  contactItems.forEach((item) => {
    const key = item.dataset.contact;
    if (!CONFIG.contact[key]) {
      item.style.display = 'none';
    }
  });

  // -------------------------------------------------
  // Mobile menu (accessible toggle)
  // -------------------------------------------------
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.mobile-nav__link');

  if (menuBtn && mobileMenu) {
    const toggleMenu = () => {
      const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!isOpen));
      mobileMenu.hidden = isOpen;
      if (!isOpen) {
        const focusable = mobileMenu.querySelector('a, button');
        if (focusable) focusable.focus();
      }
    };

    menuBtn.addEventListener('click', toggleMenu);

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        menuBtn.setAttribute('aria-expanded', 'false');
        mobileMenu.hidden = true;
      });
    });
  }

  // -------------------------------------------------
  // Smooth scroll for internal anchor links
  // -------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // -------------------------------------------------
  // FAQ accordion (ARIA compliant)
  // -------------------------------------------------
  const faqTriggers = document.querySelectorAll('[data-faq-trigger]');
  faqTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      faqTriggers.forEach((t) => {
        t.setAttribute('aria-expanded', 'false');
        const content = document.getElementById(t.dataset.faqTarget);
        if (content) content.hidden = true;
      });
      if (!isExpanded) {
        trigger.setAttribute('aria-expanded', 'true');
        const content = document.getElementById(trigger.dataset.faqTarget);
        if (content) content.hidden = false;
      }
    });

    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        trigger.click();
      }
    });
  });

  // -------------------------------------------------
  // Scroll reveal (IntersectionObserver)
  // -------------------------------------------------
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealEls = document.querySelectorAll('[data-reveal]');

  if (!reduceMotion && revealEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('revealed'));
  }

  // -------------------------------------------------
  // Header scroll shadow
  // -------------------------------------------------
  const header = document.querySelector('header');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();
