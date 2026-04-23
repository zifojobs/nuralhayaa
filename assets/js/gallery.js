/* NAID — gallery.js
   Filtres portfolio + init GLightbox
   ------------------------------------------------------------------ */
(function () {
  'use strict';

  // Lightbox init
  if (typeof GLightbox !== 'undefined') {
    GLightbox({
      selector: '.glightbox',
      touchNavigation: true,
      loop: true,
      openEffect: 'fade',
      closeEffect: 'fade',
      descPosition: 'bottom',
      skin: 'naid'
    });
  }

  // Filters
  const filterBtns = document.querySelectorAll('.filter-btn');
  const grid = document.getElementById('portfolio-grid');
  if (!grid) return;
  const items = grid.querySelectorAll('.portfolio-item');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      items.forEach((item) => {
        const matches = filter === 'all' || item.dataset.cat === filter;
        item.style.transition = 'opacity 320ms ease, transform 320ms ease';
        if (matches) {
          item.style.display = '';
          requestAnimationFrame(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          });
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.97)';
          setTimeout(() => { item.style.display = 'none'; }, 320);
        }
      });
    });
  });
})();
