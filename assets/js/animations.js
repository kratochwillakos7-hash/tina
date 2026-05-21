// =============================================
// TINA LICHTENTHAL — Cinematic Animations
// =============================================

(function() {
  'use strict';

  // ---- Custom cursor ----
  const cursor = document.createElement('div');
  const cursorDot = document.createElement('div');
  cursor.className = 'cursor-ring';
  cursorDot.className = 'cursor-dot';
  document.body.appendChild(cursor);
  document.body.appendChild(cursorDot);

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  // Smooth ring follow
  function animateCursor() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursor.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Cursor states
  document.querySelectorAll('a, button, .card, .btn').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
  });

  // Hide on mobile
  if ('ontouchstart' in window) {
    cursor.style.display = 'none';
    cursorDot.style.display = 'none';
  }

  // ---- Hero text split animáció ----
  function splitAndAnimate(selector) {
    const el = document.querySelector(selector);
    if (!el) return;
    const words = el.innerHTML.split(/(<br>|<br\/>)/);
    const lines = el.textContent.trim().split('\n');

    // Word by word split
    const text = el.innerText;
    const wordArr = text.split(/\s+/);
    el.innerHTML = wordArr.map((w, i) =>
      `<span class="word-wrap"><span class="word" style="transition-delay:${0.08 + i * 0.06}s">${w}</span></span>`
    ).join(' ');

    requestAnimationFrame(() => {
      el.querySelectorAll('.word').forEach(w => w.classList.add('word-visible'));
    });
  }

  // ---- Scroll reveal — többféle irányból ----
  const revealMap = {
    'fade-up':    { opacity: 0, transform: 'translateY(40px)' },
    'fade-left':  { opacity: 0, transform: 'translateX(-48px)' },
    'fade-right': { opacity: 0, transform: 'translateX(48px)' },
    'fade-scale': { opacity: 0, transform: 'scale(0.94)' },
    'fade-blur':  { opacity: 0, filter: 'blur(8px)', transform: 'translateY(20px)' },
  };

  function applyReveal(el) {
    const type = el.dataset.reveal || 'fade-up';
    const styles = revealMap[type];
    if (!styles) return;
    Object.assign(el.style, styles);
    el.style.transition = `opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1), filter 0.85s ease`;
    const delay = el.dataset.delay || '0';
    el.style.transitionDelay = delay + 's';
  }

  function clearReveal(el) {
    el.style.opacity = '1';
    el.style.transform = 'none';
    el.style.filter = 'none';
  }

  // Auto-assign reveal directions
  function assignRevealDirections() {
    // Section headers
    document.querySelectorAll('.section-header, .page-hero-inner').forEach(el => {
      if (!el.dataset.reveal) el.dataset.reveal = 'fade-blur';
    });

    // Cards — alternating
    document.querySelectorAll('.card, .project-card, .contact-card').forEach((el, i) => {
      if (!el.dataset.reveal) el.dataset.reveal = i % 2 === 0 ? 'fade-left' : 'fade-right';
      el.dataset.delay = (i % 3) * 0.1 + '';
    });

    // About photo
    document.querySelectorAll('.about-photo').forEach(el => {
      if (!el.dataset.reveal) el.dataset.reveal = 'fade-left';
    });

    // Stats
    document.querySelectorAll('.stat-item').forEach((el, i) => {
      if (!el.dataset.reveal) el.dataset.reveal = 'fade-scale';
      el.dataset.delay = i * 0.12 + '';
    });

    // Timeline items
    document.querySelectorAll('.timeline-item').forEach((el, i) => {
      if (!el.dataset.reveal) el.dataset.reveal = 'fade-left';
      el.dataset.delay = i * 0.1 + '';
    });

    // ICMM dims
    document.querySelectorAll('.dim-card, .tri-node, .contribution-item, .country-card').forEach((el, i) => {
      if (!el.dataset.reveal) el.dataset.reveal = 'fade-scale';
      el.dataset.delay = i * 0.08 + '';
    });

    // Rich text paragraphs
    document.querySelectorAll('.rich-text p, .expertise-content p').forEach((el, i) => {
      if (!el.dataset.reveal) el.dataset.reveal = 'fade-up';
      el.dataset.delay = i * 0.06 + '';
    });
  }

  assignRevealDirections();

  // Apply initial hidden state
  const allReveal = document.querySelectorAll('[data-reveal], .fade-in');
  allReveal.forEach(el => {
    if (el.dataset.reveal) applyReveal(el);
  });

  // IntersectionObserver
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        clearReveal(entry.target);
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  allReveal.forEach(el => revealObserver.observe(el));

  // ---- Counter animáció ----
  function animateCounter(el, target, duration = 1800) {
    const start = performance.now();
    const isDecimal = String(target).includes(',') || String(target).includes('.');
    const numTarget = parseFloat(String(target).replace(',', '.'));

    function update(time) {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out expo
      const eased = 1 - Math.pow(2, -10 * progress);
      const current = numTarget * eased;

      if (isDecimal) {
        el.textContent = current.toFixed(3).replace('.', ',');
      } else {
        el.textContent = Math.round(current).toLocaleString('hu');
      }

      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent.trim();
        const match = text.match(/[\d,\.]+/);
        if (match) {
          const num = match[0];
          animateCounter(el, num, 1600);
        }
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-num, .tri-num, .dim-weight, .contribution-num').forEach(el => {
    counterObserver.observe(el);
  });

  // ---- Parallax ----
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        const heroText = heroSection.querySelector('.hero-text');
        const heroVisual = heroSection.querySelector('.hero-visual');
        if (heroText) heroText.style.transform = `translateY(${scrolled * 0.15}px)`;
        if (heroVisual) heroVisual.style.transform = `translateY(${scrolled * 0.08}px)`;
      }
    }, { passive: true });
  }

  // ---- Quote block — elegant reveal ----
  document.querySelectorAll('.quote-block').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateX(-20px)';
    el.style.transition = 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)';

    const qObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateX(0)';
          qObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });
    qObs.observe(el);
  });

  // ---- Page transition (link click) ----
  const overlay = document.createElement('div');
  overlay.className = 'page-overlay';
  document.body.appendChild(overlay);

  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;

    link.addEventListener('click', (e) => {
      e.preventDefault();
      overlay.classList.add('overlay-in');
      setTimeout(() => {
        window.location.href = href;
      }, 400);
    });
  });

  // Fade in on page load
  window.addEventListener('pageshow', () => {
    overlay.classList.add('overlay-out');
    setTimeout(() => overlay.classList.remove('overlay-in', 'overlay-out'), 600);
  });

  // Hero betöltéskor
  setTimeout(() => {
    document.querySelectorAll('.hero-text .eyebrow, .hero-text h1, .hero-text .hero-tagline, .hero-text .btn-group').forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.12}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.12}s`;
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 50);
    });
  }, 100);

})();
