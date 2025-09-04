$(document).ready(function () {
  handleMenuMobile();
  handleHeaderShadow();
  handleScrollToSection();
  initRelatedProductsSwiper();
  onClickToRun();
  updateOnScrollEnd();
  updateOnScroll();
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

function onClickToRun() {
  const el = document.querySelector('.jiro-run-section__wrapper-start');
  const el1List = document.querySelectorAll('.jiro-run');
  el.addEventListener('click', () => {
    if (el.classList.contains('run')) {
      el.classList.remove('run');
      el1List.forEach(element => {
        element.classList.remove('run');
      });
    } else {
      el.classList.add('run');
      el1List.forEach(element => {
        element.classList.add('run');
      });
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

  // progress từ 0 → 1
  const progress = getScrollProgress(section, ['10% 80%', '30% 45%']);

  const p0 = { x: 0, y: 0 };
  const p1 = { x: 300, y: 160 };
  const p2 = { x: -200, y: 360 };

  let x, y, t, scale;

  if (progress <= 0.5) {
    t = progress / 0.5;
    x = lerp(p0.x, p1.x, t);
    y = lerp(p0.y, p1.y, t);
    scale = lerp(0.5, 0.8, t);
  } else {
    t = (progress - 0.5) / 0.5;
    x = lerp(p1.x, p2.x, t);
    y = lerp(p1.y, p2.y, t);
    scale = lerp(0.8, 1, t);
  }

  wrapper.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
}

function updateOnScrollEnd() {
  const section = document.querySelector('.jiro-run-section');
  const wrapper = document.querySelector('.jiro-run-section__wrapper-end');
  const progress = getScrollProgress(section, ['35% 20%', '70% 20%']);

  const rect = section.getBoundingClientRect();
  const w = rect.width;
  const h = rect.height;

  const activeHeight = Math.min(h * 0.4, window.innerHeight * 0.6);

  const p0 = { x: -0.05 * w, y: 0.1 * activeHeight };
  const p1 = { x: -0.01 * w, y: 0.2 * activeHeight };
  const p2 = { x: -0.4 * w, y: 0.9 * activeHeight };

  const t = Math.max(0, Math.min(1, progress));

  const x = (1 - t) ** 2 * p0.x + 2 * (1 - t) * t * p1.x + t ** 2 * p2.x;
  const y = (1 - t) ** 2 * p0.y + 2 * (1 - t) * t * p1.y + t ** 2 * p2.y;

  const scale = lerp(0.5, 1, t);

  wrapper.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
}

window.addEventListener('scroll', updateOnScrollEnd);
window.addEventListener('scroll', updateOnScroll);
