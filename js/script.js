var toggle = document.querySelector('.burger-btn');
var overlay = document.getElementById('mobileMenu');
var closeBtn = document.querySelector('.mobile-menu__close');

function openMenu() {
  overlay.classList.add('is-open');
  toggle.classList.add('menu-hidden');
}

function closeMenu() {
  overlay.classList.remove('is-open');
  toggle.classList.remove('menu-hidden');
}

toggle.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);

overlay.addEventListener('click', (e) => {
  if (e.target === overlay || e.target.closest('nav a')) closeMenu();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
    closeMenu();
  }
});

document.querySelector('.footer-nav a[href="#top"]').addEventListener('click', (e) => {
  e.preventDefault();
  const start = window.scrollY;
  const duration = 600;
  const startTime = performance.now();
  function scroll(now) {
    const t = Math.min((now - startTime) / duration, 1);
    const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    window.scrollTo(0, start * (1 - ease));
    if (t < 1) requestAnimationFrame(scroll);
  }
  requestAnimationFrame(scroll);
});

var scrollBtn = document.querySelector('.scroll-top-btn');

function updateScrollBtn() {
  const scrollY = window.scrollY;
  const winHeight = window.innerHeight;
  const docHeight = document.documentElement.scrollHeight;
  const nearTop = scrollY < 80;
  const nearBottom = scrollY + winHeight >= docHeight - 80;
  scrollBtn.classList.toggle('is-hidden', nearTop || nearBottom);
}

window.addEventListener('scroll', updateScrollBtn);
updateScrollBtn();

scrollBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const start = window.scrollY;
  const duration = 600;
  const startTime = performance.now();
  function scroll(now) {
    const t = Math.min((now - startTime) / duration, 1);
    const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    window.scrollTo(0, start * (1 - ease));
    if (t < 1) requestAnimationFrame(scroll);
  }
  requestAnimationFrame(scroll);
});

var lightbox = document.createElement('div');
lightbox.className = 'lightbox';
document.body.appendChild(lightbox);

var lightboxImg = document.createElement('img');
lightbox.appendChild(lightboxImg);

var videoContainer = document.createElement('div');
videoContainer.className = 'lightbox-video';
lightbox.appendChild(videoContainer);

function closeLightbox() {
  lightbox.classList.remove('is-open');
  lightboxImg.style.display = '';
  videoContainer.style.display = 'none';
  videoContainer.innerHTML = '';
}

document.querySelectorAll('.gallery img').forEach(function(img) {
  img.addEventListener('click', function() {
    videoContainer.style.display = 'none';
    videoContainer.innerHTML = '';
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxImg.style.display = '';
    lightbox.classList.add('is-open');
  });
});

document.querySelectorAll('.vid-card[data-youtube]').forEach(function(card) {
  card.addEventListener('click', function() {
    var videoId = card.getAttribute('data-youtube');
    lightboxImg.style.display = 'none';
    videoContainer.style.display = 'block';
    var origin = window.location.origin;
    if (origin === 'null') origin = '';
    videoContainer.innerHTML =
      '<iframe src="https://www.youtube.com/embed/' +
      videoId +
      '?autoplay=1' + (origin ? '&origin=' + encodeURIComponent(origin) : '') + '&rel=0" allow="autoplay; fullscreen" allowfullscreen></iframe>';
    lightbox.classList.add('is-open');
  });
});

lightbox.addEventListener('click', function(e) {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
    closeLightbox();
  }
});