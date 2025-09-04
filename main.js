$(document).ready(function () {
  handleMenuMobile();
  handleHeaderShadow();
  handleScrollToSection();
  initRelatedProductsSwiper();

  if (window.innerWidth > 767) {
    window.addEventListener('scroll', updateOnScroll);
    window.addEventListener('scroll', updateOnScrollEnd);
  }
});

// Function to handle header shadow on scroll
function handleHeaderShadow() {
  $(window).scroll(function () {
    if ($(window).scrollTop() > 100) {
      $('#header').addClass('shadow-sm');
    } else {
      $('#header').removeClass('shadow-sm');
    }
  });
}

// Init Swiper for related products
function initRelatedProductsSwiper() {
  if (typeof Swiper === 'undefined') return; // Guard if CDN not loaded

  new Swiper('.related-swiper', {
    slidesPerView: 5,
    spaceBetween: 24,
    loop: true,

    breakpoints: {
      0: { slidesPerView: 1.5, spaceBetween: 14 },
      480: { slidesPerView: 2.5, spaceBetween: 16 },
      640: { slidesPerView: 2.5, spaceBetween: 18 },
      768: { slidesPerView: 3, spaceBetween: 20 },
      1024: { slidesPerView: 5, spaceBetween: 24 },
    },
  });
}

function handleScrollToSection() {
  $('a[href^="#"]').on('click', function (e) {
    e.preventDefault();

    let target = $(this).attr('href');
    let $target = $(target);

    if ($target.length) {
      window.scrollTo({
        top: $target.offset().top,
        behavior: 'smooth',
      });
    }
  });
}

// Mobile Menu Toggle

function handleMenuMobile() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
  const closeMenuBtn = document.querySelector('.close-menu-btn');
  const body = document.body;

  // Open mobile menu
  mobileMenuToggle.addEventListener('click', function () {
    mobileMenuOverlay.classList.add('active');
    body.style.overflow = 'hidden'; // Prevent body scroll
  });

  // Close mobile menu
  closeMenuBtn.addEventListener('click', function () {
    mobileMenuOverlay.classList.remove('active');
    body.style.overflow = ''; // Restore body scroll
  });

  // Close menu when clicking outside
  mobileMenuOverlay.addEventListener('click', function (e) {
    if (e.target === mobileMenuOverlay) {
      mobileMenuOverlay.classList.remove('active');
      body.style.overflow = '';
    }
  });

  // Close menu with Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
      mobileMenuOverlay.classList.remove('active');
      body.style.overflow = '';
    }
  });

  // Close menu when window is resized to desktop
  window.addEventListener('resize', function () {
    if (window.innerWidth > 991) {
      mobileMenuOverlay.classList.remove('active');
      body.style.overflow = '';
    }
  });
}

function resolvePosition(target, keyword, isViewport = false) {
  const rect = target.getBoundingClientRect();

  // viewport mode
  if (isViewport) {
    if (keyword === 'start') return 0;
    if (keyword === 'center') return window.innerHeight / 2;
    if (keyword === 'end') return window.innerHeight;
    if (/%$/.test(keyword)) {
      const percent = parseFloat(keyword) / 100;
      return window.innerHeight * percent;
    }
  }
  // element mode
  else {
    if (keyword === 'start') return rect.top;
    if (keyword === 'center') return rect.top + rect.height / 2;
    if (keyword === 'end') return rect.bottom;
    if (/%$/.test(keyword)) {
      const percent = parseFloat(keyword) / 100;
      return rect.top + rect.height * percent;
    }
  }

  return 0;
}

function getScrollProgress(el, offset = ['start end', 'end end']) {
  const [startEl, startVp] = offset[0].split(' ');
  const [endEl, endVp] = offset[1].split(' ');

  const start = resolvePosition(el, startEl, false) - resolvePosition(el, startVp, true);
  const end = resolvePosition(el, endEl, false) - resolvePosition(el, endVp, true);

  const progress = (0 - start) / (end - start);
  return Math.min(Math.max(progress, 0), 1);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function updateOnScroll() {
  const section = document.querySelector('.jiro-run-section');
  const wrapper = document.querySelector('.jiro-run-section__wrapper-start');

  const progress = getScrollProgress(section, ['10% 80%', '30% 45%']);

  wrapper.style.offsetDistance = `${progress * 100}%`;
}

function updateOnScrollEnd() {
  const section = document.querySelector('.jiro-run-section');
  const wrapper = document.querySelector('.jiro-run-section__wrapper-end');
  const progress = getScrollProgress(section, ['80% end', '65% start']);

  wrapper.style.offsetDistance = `${progress * 100}%`;
}
