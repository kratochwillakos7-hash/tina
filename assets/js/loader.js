(function() {
  // Scroll lock
  document.documentElement.style.overflow = 'hidden';

  window.addEventListener('DOMContentLoaded', function() {
    var loader = document.getElementById('tl-loader');
    if (!loader) {
      document.documentElement.style.overflow = '';
      return;
    }

    // Kis delay majd animáció indul
    setTimeout(function() {
      loader.classList.add('tl-animate');
    }, 80);

    // Fade out
    setTimeout(function() {
      loader.classList.add('tl-done');
    }, 3200);

    setTimeout(function() {
      loader.style.display = 'none';
      document.documentElement.style.overflow = '';
    }, 4100);

    // Fallback
    setTimeout(function() {
      if (loader) {
        loader.style.display = 'none';
        document.documentElement.style.overflow = '';
      }
    }, 5000);
  });
})();
