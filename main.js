import { hover, animate, spring } from 'https://cdn.jsdelivr.net/npm/motion@latest/+esm';

$(document).ready(function () {
  handleMenuMobile();
  handleHeaderShadow();
  handleScrollToSection();
  initRelatedProductsSwiper();
  onAnimationScrollSection();
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

function onAnimationScrollSection() {
  const elementsJiro = document.querySelectorAll('.scroll-element');

  elementsJiro.forEach(elementJiro => {
    hover(elementJiro.closest('.scroll-title-wrapper'), () => {
      animate(elementJiro, {
        scale: [0, 1.2, 1],
        rotate: [0, -5, 5, 0],
      });

      return () => {
        animate(
          elementJiro,
          {
            scale: 0,
            rotate: 0,
          },
          {
            duration: 0.4,
            ease: 'easeIn',
          }
        );
      };
    });
  });
}
