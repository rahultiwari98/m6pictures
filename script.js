// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href.length > 1) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth', block: 'start' });
      // close mobile menu if open
      const toggle = document.getElementById('menu-toggle');
      if (toggle) toggle.checked = false;
    }
  });
});

// Hero slideshow
(function heroSlideshow(){
  const slides = Array.from(document.querySelectorAll('.slide'));
  if (!slides.length) return;
  let idx = 0;
  setInterval(() => {
    slides[idx].classList.remove('active');
    idx = (idx + 1) % slides.length;
    slides[idx].classList.add('active');
  }, 4500);
})();

// Lightbox for gallery
(function lightbox(){
  const gallery = document.getElementById('gallery');
  const lightbox = document.getElementById('lightbox');
  const imgEl = document.querySelector('.lightbox-image');
  const closeBtn = document.querySelector('.lightbox-close');

  if (!gallery || !lightbox || !imgEl) return;

  gallery.addEventListener('click', (e) => {
    const target = e.target;
    if (target.tagName.toLowerCase() === 'img') {
      imgEl.src = target.src;
      imgEl.alt = target.alt || 'Expanded view';
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  });

  function close() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) close();
  });
})();
