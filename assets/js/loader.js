(function() {
  // Loader SVG path hosszak dinamikusan
  window.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('tl-loader');
    if (!loader) return;

    const paths = loader.querySelectorAll('.tl-draw');
    paths.forEach(function(path) {
      const len = path.getTotalLength ? path.getTotalLength() : 200;
      path.style.strokeDasharray = len;
      path.style.strokeDashoffset = len;
    });

    // Animáció elindítása
    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        loader.classList.add('tl-animate');
      });
    });

    // Fade out
    setTimeout(function() {
      loader.classList.add('tl-done');
      setTimeout(function() {
        loader.style.display = 'none';
        document.body.style.overflow = '';
      }, 900);
    }, 2800);
  });

  // Body scroll lock amíg tölt
  document.documentElement.style.overflow = 'hidden';
  window.addEventListener('DOMContentLoaded', function() {
    // Ha valami hiba van, 4mp után mindenképp eltűnik
    setTimeout(function() {
      var loader = document.getElementById('tl-loader');
      if (loader) {
        loader.style.display = 'none';
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      }
    }, 4000);
  });
})();
