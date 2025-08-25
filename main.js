$(document).ready(function () {
  handleMenuMobile();
  handleHeaderShadow();
  handleAnimeScroll();
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

function handleAnimeScroll() {
  const $section = $('.section-truyen');
  const $items = $('.section-truyen-inner__item');

  // Tạo animation với autoplay: false
  const animation = anime({
    targets: $items.toArray(),
    translateY: [0, '100%'],
    easing: 'linear',
    duration: 1000,
    autoplay: false,
  });

  // Tính scroll progress của section (0 -> 1)
  function getElementScrollProgress($el) {
    const rect = $el[0].getBoundingClientRect();
    const windowHeight = $(window).height();
    const progress = 1 - rect.bottom / (rect.height + windowHeight);
    return Math.min(Math.max(progress, 0), 1);
  }

  $(window).on('scroll', function () {
    const progress = getElementScrollProgress($section);
    animation.seek(animation.duration * progress);
  });
}
