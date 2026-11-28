// GSAP + ScrollTrigger animations — single file, light theme
// Respects prefers-reduced-motion

(function () {
  'use strict';

  // Register ScrollTrigger once
  gsap.registerPlugin(ScrollTrigger);

  // Reduced-motion gate
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    // Show everything in final state immediately
    document.querySelectorAll(
      '.hero-badge, .hero-title, .hero-description, .hero-capabilities, .hero-buttons, .social-links, .hero-image-wrap, .navbar, .section-header, .exp-switcher, .project-filters, .projects-grid > *, .skills-bento > *, .edu-layout, .contact-content'
    ).forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  const ease = 'power3.out';
  const dur = 0.8;
  const stagger = 0.1;

  // ============================================================
  // HERO — single timeline, staggered on load
  // ============================================================
  const heroTl = gsap.timeline({ defaults: { ease, duration: dur } });

  // Hero elements in order
  const heroBadge = document.querySelector('.hero-badge');
  const heroTitle = document.querySelector('.hero-title');
  const heroDesc = document.querySelector('.hero-description');
  const heroCaps = document.querySelector('.hero-capabilities');
  const heroBtns = document.querySelector('.hero-buttons');
  const heroSocials = document.querySelector('.social-links');
  const heroImgWrap = document.querySelector('.hero-image-wrap');
  const navbar = document.querySelector('.navbar');

  // Set initial states
  gsap.set([heroBadge, heroTitle, heroDesc, heroCaps, heroBtns, heroSocials], { opacity: 0, y: 30 });
  gsap.set(heroImgWrap, { opacity: 0, y: 40, scale: 0.98 });
  gsap.set(navbar, { opacity: 0, y: -20 });

  // Timeline
  heroTl
    .to(navbar, { opacity: 1, y: 0, duration: 0.6 }, 0)
    .to(heroBadge, { opacity: 1, y: 0, duration: 0.6 }, 0.1)
    .to(heroTitle, { opacity: 1, y: 0 }, 0.18)
    .to(heroDesc, { opacity: 1, y: 0 }, 0.26)
    .to(heroCaps, { opacity: 1, y: 0 }, 0.34)
    .to(heroBtns, { opacity: 1, y: 0 }, 0.42)
    .to(heroSocials, { opacity: 1, y: 0 }, 0.5)
    .to(heroImgWrap, { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: 'power2.out' }, 0.2);

  // ============================================================
  // SECTIONS BELOW HERO — fade + slide up on scroll
  // ============================================================
  const sections = document.querySelectorAll('section:not(#home)');

  sections.forEach(section => {
    const header = section.querySelector('.section-header');
    const content = section.querySelectorAll(':scope > div, :scope > .container, :scope > .exp-switcher, :scope > .project-filters, :scope > .projects-grid, :scope > .skills-bento, :scope > .edu-layout, :scope > .contact-content');

    if (header) {
      gsap.fromTo(header,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.9, ease,
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            toggleActions: 'restart none restart none',
          }
        }
      );
    }

    // Animate direct children that hold content
    content.forEach((el, i) => {
      if (el === header) return;
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.9, ease,
          delay: i * 0.05,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'restart none restart none',
          }
        }
      );
    });
  });

  // ============================================================
  // PROJECTS — staggered card reveal + hover handled in CSS
  // ============================================================
  const projectCards = document.querySelectorAll('.projects-grid > *');

  if (projectCards.length) {
    // Staggered entrance on scroll
    gsap.fromTo(projectCards,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 0.8, ease,
        stagger: 0.08,
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 80%',
          toggleActions: 'restart none restart none',
        }
      }
    );
  }

  // ============================================================
  // EXPERIENCE — tabs + detail card as a group
  // ============================================================
  const expSwitcher = document.querySelector('.exp-switcher');
  if (expSwitcher) {
    gsap.fromTo(expSwitcher,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        duration: 0.8, ease,
        scrollTrigger: {
          trigger: expSwitcher,
          start: 'top 85%',
          toggleActions: 'restart none restart none',
        }
      }
    );
  }

  // ============================================================
  // SKILLS — bento grid stagger
  // ============================================================
  const skillItems = document.querySelectorAll('.skills-bento > .skill-category');
  if (skillItems.length) {
    gsap.fromTo(skillItems,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        duration: 0.7, ease,
        stagger: 0.06,
        scrollTrigger: {
          trigger: '.skills-bento',
          start: 'top 80%',
          toggleActions: 'restart none restart none',
        }
      }
    );
  }

  // ============================================================
  // EDUCATION — timeline + credentials
  // ============================================================
  const eduLayout = document.querySelector('.edu-layout');
  if (eduLayout) {
    gsap.fromTo(eduLayout,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        duration: 0.8, ease,
        scrollTrigger: {
          trigger: eduLayout,
          start: 'top 85%',
          toggleActions: 'restart none restart none',
        }
      }
    );
  }

  // ============================================================
  // CONTACT
  // ============================================================
  const contactContent = document.querySelector('.contact-content');
  if (contactContent) {
    gsap.fromTo(contactContent,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        duration: 0.8, ease,
        scrollTrigger: {
          trigger: contactContent,
          start: 'top 85%',
          toggleActions: 'restart none restart none',
        }
      }
    );
  }
})();