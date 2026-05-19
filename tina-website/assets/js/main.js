// =============================================
// TINA LICHTENTHAL — tinalichtenthal.com
// Főbb JavaScript funkciók
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Navbar scroll ----
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });

  // ---- Hamburger menü ----
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const spans = hamburger.querySelectorAll('span');
      hamburger.classList.toggle('active');
    });
  }

  // ---- Aktív navigációs elem ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---- Fade-in scroll animáció ----
  const fadeEls = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  fadeEls.forEach(el => observer.observe(el));

  // ---- Kapcsolat űrlap ----
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.textContent = 'Elküldve ✓';
      btn.disabled = true;
      btn.style.background = '#22c55e';
      setTimeout(() => {
        btn.textContent = 'Üzenet küldése';
        btn.disabled = false;
        btn.style.background = '';
        contactForm.reset();
      }, 4000);
    });
  }

});
