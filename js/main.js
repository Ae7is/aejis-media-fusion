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
          <a href="https://forms.gle/W2bm8ZdQxSzKfSTJ7" class="btn btn--primary btn--block" target="_blank" rel="noopener noreferrer">
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
  // Render footer contacts from config with SVG icons
  // -------------------------------------------------
  const contactIcons = {
    email: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22 6 12 13 2 6"></polyline></svg>`,
    whatsapp: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12c0-5-5-9-9-9-4.5 0-7.5 3.5-8 8 .5 3 4 5 8 5 1 0 2-.1 2.7-.5 4 2 6 5.5 7.2 8.5.4 1 .2 2.1-.8 2.8-1 .6-1.5.8-2 .8-.5 0-1-.3-1.5-.8-2-2.5-3.5-4-3.5-4.5 0-.5.5-1 1-1 .5 0 1 .3 1.5.8 1 1 1.5 2 2 2.5 1 .5 2 .5 3 0 1-.5 1.5-1 2-2.5 1-2 2-4 2-7 0-5-5-9-9-9z"></path></svg>`,
    tiktok: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`,
    youtube: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 0 4.5A2.78 2.78 0 0 0 3.4 19.5a29 29 0 0 0 8.6-.46a29 29 0 0 0 8.6.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 11.75a29 29 0 0 0 0-4.5a29 29 0 0 0-0.46-0.83z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>`,
    instagram: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="17.5" x2="17.51" y2="17.5"></line></svg>`,
    facebook: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>`
  };

  const contactLabels = {
    email: 'Email',
    whatsapp: 'WhatsApp',
    tiktok: 'TikTok',
    youtube: 'YouTube',
    instagram: 'Instagram',
    facebook: 'Facebook'
  };

  const contactList = document.getElementById('footer-contacts');
  if (contactList) {
    Object.entries(CONFIG.contact).forEach(([key, value]) => {
      if (!value) return;

      const isExternal = key !== 'email';
      const href = key === 'email' ? `mailto:${value}` : value;

      const li = document.createElement('li');
      li.style.display = 'flex';
      li.style.alignItems = 'center';
      li.style.gap = 'var(--space-xs)';
      li.style.padding = 'var(--space-xs) var(--space-sm)';
      li.style.borderRadius = 'var(--radius)';
      li.style.transition = 'background 0.2s';

      const a = document.createElement('a');
      a.href = href;
      a.textContent = contactLabels[key];
      a.ariaLabel = contactLabels[key];
      a.style.color = 'var(--color-text)';
      a.style.textDecoration = 'none';
      a.style.fontSize = '0.9rem';
      a.style.fontWeight = '500';
      a.style.display = 'flex';
      a.style.alignItems = 'center';
      a.style.gap = 'var(--space-xs)';
      a.style.minHeight = '44px';
      a.style.minWidth = '44px';

      if (isExternal) {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      }

      a.addEventListener('mouseenter', () => {
        li.style.background = 'rgba(255, 255, 255, 0.04)';
      });
      a.addEventListener('mouseleave', () => {
        li.style.background = 'transparent';
      });

      // Inject SVG icon
      const iconSpan = document.createElement('span');
      iconSpan.innerHTML = contactIcons[key];
      iconSpan.style.display = 'inline-block';
      a.prepend(iconSpan);

      li.appendChild(a);
      contactList.appendChild(li);
    });
  }

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
