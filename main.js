/* =================================================================
   STAR MEDIA AGENCY — MAIN JS
   ================================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------------------------------------------------------------
     1. LOADING SCREEN
     --------------------------------------------------------------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', function () {
    setTimeout(function () {
      loader.classList.add('hide');
    }, 500);
  });
  // Fallback in case 'load' fires slowly / CDN blocked
  setTimeout(function () { loader.classList.add('hide'); }, 2500);

  /* ---------------------------------------------------------------
     2. AOS INIT
     --------------------------------------------------------------- */
  if (window.AOS) {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60
    });
  }

  /* ---------------------------------------------------------------
     3. STICKY NAVBAR ON SCROLL + ACTIVE LINK
     --------------------------------------------------------------- */
  const navbarWrap = document.getElementById('navbarWrap');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function onScroll() {
    if (window.scrollY > 40) {
      navbarWrap.classList.add('scrolled');
    } else {
      navbarWrap.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach((sec) => {
      const top = sec.offsetTop - 140;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navLinks.forEach((link) => {
      link.classList.remove('active-link');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active-link');
      }
    });

    // Back to top button visibility
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 500) backToTop.classList.add('show');
    else backToTop.classList.remove('show');
  }
  document.addEventListener('scroll', onScroll);
  onScroll();

  /* ---------------------------------------------------------------
     4. MOBILE NAV TOGGLE
     --------------------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const navCollapse = document.getElementById('navCollapse');

  navToggle.addEventListener('click', function () {
    navToggle.classList.toggle('open');
    navCollapse.classList.toggle('open');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', function () {
      navToggle.classList.remove('open');
      navCollapse.classList.remove('open');
    });
  });

  /* ---------------------------------------------------------------
     5. BACK TO TOP CLICK
     --------------------------------------------------------------- */
  document.getElementById('backToTop').addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------------------------------------------------------------
     6. ANIMATED COUNTERS (About stats)
     --------------------------------------------------------------- */
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });
  counters.forEach((c) => counterObserver.observe(c));

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1600;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    }
    requestAnimationFrame(tick);
  }

  /* ---------------------------------------------------------------
     7. PORTFOLIO FILTER
     --------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
      filterBtns.forEach((b) => b.classList.remove('active'));
      this.classList.add('active');
      const filter = this.getAttribute('data-filter');

      portfolioItems.forEach((item) => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          item.classList.remove('filtered-out');
        } else {
          item.classList.add('filtered-out');
        }
      });
    });
  });

  /* ---------------------------------------------------------------
     8. PORTFOLIO LIGHTBOX
     --------------------------------------------------------------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxContent = document.getElementById('lightboxContent');
  const lightboxClose = document.getElementById('lightboxClose');

  portfolioItems.forEach((item) => {
    item.addEventListener('click', function () {
      const thumb = this.querySelector('.portfolio-thumb');
      const title = this.querySelector('h6') ? this.querySelector('h6').textContent : '';
      const category = this.querySelector('span') ? this.querySelector('span').textContent : '';

      lightboxContent.innerHTML = '';
      const clone = document.createElement('div');
      clone.style.width = '100%';
      clone.style.height = '100%';
      clone.style.background = getComputedStyle(thumb).backgroundImage !== 'none'
        ? getComputedStyle(thumb).backgroundImage
        : getComputedStyle(thumb).background;
      clone.style.display = 'flex';
      clone.style.alignItems = 'flex-end';
      clone.style.padding = '28px';

      const label = document.createElement('div');
      label.innerHTML = '<h5 style="color:#fff;margin-bottom:4px;">' + title + '</h5><span style="color:#FF9A1F;font-size:.85rem;text-transform:uppercase;letter-spacing:.06em;">' + category + '</span>';
      clone.appendChild(label);

      lightboxContent.appendChild(clone);
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });

  /* ---------------------------------------------------------------
     9. TESTIMONIAL SWIPER
     --------------------------------------------------------------- */
  if (window.Swiper) {
    new Swiper('.testimonial-swiper', {
      loop: true,
      spaceBetween: 26,
      autoplay: { delay: 5000, disableOnInteraction: false },
      pagination: { el: '.swiper-pagination', clickable: true },
      breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1200: { slidesPerView: 3 }
      }
    });
  }

  /* ---------------------------------------------------------------
     10. CONTACT FORM (front-end only demo submission)
     --------------------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    formSuccess.classList.add('show');
    contactForm.reset();
    setTimeout(() => formSuccess.classList.remove('show'), 6000);
  });

  /* ---------------------------------------------------------------
     11. BUTTON RIPPLE EFFECT
     --------------------------------------------------------------- */
  document.querySelectorAll('.btn-ripple').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple-el';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });

  /* ---------------------------------------------------------------
     12. MOUSE GLOW EFFECT (desktop only)
     --------------------------------------------------------------- */
  const mouseGlow = document.getElementById('mouseGlow');
  if (window.matchMedia('(min-width: 992px)').matches) {
    document.addEventListener('mousemove', function (e) {
      mouseGlow.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px) translate(-50%,-50%)';
    });
  }

});


emailjs.init("zAsfcL5J3f47ILrAp");

const form = document.getElementById("contactForm");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm(
        "service_t2jf91o",
        "template_wyq3t0m",
        this
    )
    .then(() => {
        document.getElementById("formSuccess").style.display = "block";
        form.reset();
    })
    .catch((error) => {
        console.error("EmailJS Error:", error);
        alert("Failed to send message.");
    });
});