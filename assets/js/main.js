// =============================================
// TINA LICHTENTHAL — tinalichtenthal.com
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Navbar scroll ----
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    navbar.classList.toggle('scrolled', current > 20);
    // Hide on scroll down, show on scroll up (mobile)
    if (window.innerWidth <= 768) {
      if (current > lastScroll && current > 80) {
        navbar.style.transform = 'translateY(-100%)';
      } else {
        navbar.style.transform = 'translateY(0)';
      }
    }
    lastScroll = current;
  }, { passive: true });

  // ---- Hamburger menü ----
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const body = document.body;

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('active');
      body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Bezárás linkre kattintáskor
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
        body.style.overflow = '';
      });
    });

    // Bezárás háttérre kattintáskor
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
        body.style.overflow = '';
      }
    });
  }

  // ---- Aktív nav link ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---- Scroll animációk — staggered ----
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  // Kártyák — staggered delay
  document.querySelectorAll('.cards-grid .card, .project-cards .project-card, .contact-cards .contact-card, .dim-cards .dim-card, .phd-countries .country-card').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.08}s`;
    el.classList.add('fade-in');
    observer.observe(el);
  });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // ---- ICMM bar animáció ----
  const icmmObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.icmm-fill').forEach(bar => {
          const width = bar.style.width;
          bar.style.width = '0%';
          setTimeout(() => { bar.style.width = width; }, 100);
        });
        icmmObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.icmm-panel').forEach(el => icmmObserver.observe(el));

  // ---- Kapcsolat űrlap ----
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Elküldve ✓';
      btn.disabled = true;
      btn.style.background = '#5a6b63';
      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
        btn.style.background = '';
        contactForm.reset();
      }, 4000);
    });
  }

  // ---- Navbar transition fix mobilon ----
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      navbar.style.transform = '';
      body.style.overflow = '';
    }
  });

});
