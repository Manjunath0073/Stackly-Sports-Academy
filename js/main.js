/**
 * SportAcadem — Premium Sports Academy Website
 * Vanilla JavaScript (ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {
  // ===== DOM ELEMENTS =====
  const preloader = document.getElementById('preloader');
  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menuToggle');
  const headerNav = document.getElementById('headerNav');
  const navLinks = document.querySelectorAll('.nav__link');
  const scrollProgress = document.getElementById('scrollProgress');
  const revealElements = document.querySelectorAll('[data-reveal]');
  const counters = document.querySelectorAll('.counter');
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  const testimonialTrack = document.getElementById('testimonialTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('testimonialDots');
  const slides = document.querySelectorAll('.testimonial-card');
  const galleryItems = document.querySelectorAll('.gallery__item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const watchVideo = document.getElementById('watchVideo');
  const videoModal = document.getElementById('videoModal');
  const videoFrame = document.getElementById('videoFrame');
  const videoClose = document.getElementById('videoClose');
  const contactForm = document.getElementById('contactForm');
  const newsletterForm = document.getElementById('newsletterForm');

  // ===== PRELOADER =====
  if (preloader) {
    const bar = preloader.querySelector('.preloader__bar');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let rafId = null;
    let loaded = false;

    if (!prefersReducedMotion) {
      const startTime = performance.now();
      const duration = 2200;

      function animateProgress(now) {
        if (loaded) return;
        const elapsed = now - startTime;
        const t = Math.min(elapsed / duration, 1);
        const progress = 85 * (1 - Math.pow(1 - t, 3));
        if (bar) bar.style.width = progress + '%';
        if (t < 1) {
          rafId = requestAnimationFrame(animateProgress);
        }
      }
      rafId = requestAnimationFrame(animateProgress);
    } else {
      if (bar) bar.style.width = '100%';
    }

    window.addEventListener('load', () => {
      loaded = true;
      if (rafId) cancelAnimationFrame(rafId);
      if (bar) {
        bar.style.transition = 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        bar.style.width = '100%';
      }
      setTimeout(() => {
        preloader.classList.add('hidden');
      }, prefersReducedMotion ? 0 : 700);
    });

    setTimeout(() => {
      if (preloader && !preloader.classList.contains('hidden')) {
        loaded = true;
        if (rafId) cancelAnimationFrame(rafId);
        if (bar) {
          bar.style.transition = 'width 0.3s ease';
          bar.style.width = '100%';
        }
        setTimeout(() => {
          preloader.classList.add('hidden');
        }, 300);
      }
    }, 8000);
  }

  // ===== HEADER SCROLL EFFECT =====
  function updateHeader() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // ===== MOBILE MENU =====
  function openMenu() {
    menuToggle.classList.add('active');
    headerNav.classList.add('open');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    header.classList.add('menu-open');
  }

  function closeMenu() {
    menuToggle.classList.remove('active');
    headerNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    header.classList.remove('menu-open');
  }

  if (menuToggle && headerNav) {
    menuToggle.addEventListener('click', () => {
      headerNav.classList.contains('open') ? closeMenu() : openMenu();
    });

    navLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // Close mobile menu on nav link click
  document.querySelectorAll('.mobile-menu__link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // ===== ACTIVE NAV LINK BY CURRENT PAGE =====
  function setActiveNav() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav__link, .mobile-menu__link').forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === path || (!path && href === 'index.html'));
    });
  }

  setActiveNav();

  // ===== SCROLL PROGRESS =====
  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (scrollProgress) {
      scrollProgress.style.width = `${progress}%`;
    }
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = header.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== SCROLL REVEAL (IntersectionObserver) =====
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = parseFloat(entry.target.getAttribute('data-delay')) || 0;
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, delay * 1000);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // ===== COUNTER ANIMATION =====
  function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target')) || 0;
    const duration = 2000;
    const startTime = performance.now();
    const startValue = 0;

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(startValue + (target - startValue) * easeOut);
      counter.textContent = current.toLocaleString();
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.textContent = target.toLocaleString();
      }
    }

    requestAnimationFrame(update);
  }

  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          animateCounter(counter);
          observer.unobserve(counter);
        }
      });
    }, { threshold: 0.4 });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  // ===== PARALLAX =====
  if (parallaxElements.length > 0 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let ticking = false;

    function updateParallax() {
      const scrollY = window.scrollY;
      parallaxElements.forEach(el => {
        const speed = parseFloat(el.getAttribute('data-parallax')) || 0;
        const rect = el.getBoundingClientRect();
        const centerOffset = (rect.top + rect.height / 2) - window.innerHeight / 2;
        const yPos = centerOffset * (speed / 200);
        el.style.transform = `translateY(${yPos}px)`;
      });
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
  }

  // ===== BUTTON RIPPLE EFFECT =====
  document.querySelectorAll('.btn, .mobile-menu__link').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // ===== TESTIMONIAL SLIDER =====
  let currentSlide = 0;
  let autoSlideInterval;

  function createDots() {
    if (!dotsContainer) return;
    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.classList.add('testimonial-dot');
      dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });
  }

  function updateDots() {
    const dots = dotsContainer.querySelectorAll('.testimonial-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }

  function goToSlide(index) {
    if (!testimonialTrack || slides.length === 0) return;
    currentSlide = (index + slides.length) % slides.length;
    testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    updateDots();
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  if (slides.length > 0) {
    createDots();
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    const slider = document.querySelector('.testimonials__slider');
    if (slider) {
      slider.addEventListener('mouseenter', stopAutoSlide);
      slider.addEventListener('mouseleave', startAutoSlide);
    }
    startAutoSlide();
  }

  // ===== GALLERY LIGHTBOX =====
  function openLightbox(src, caption) {
    if (!lightbox) return;
    lightboxImg.src = src;
    lightboxImg.alt = caption || '';
    lightboxCaption.textContent = caption || '';
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    // Force reflow
    void lightbox.offsetWidth;
    lightbox.classList.add('active');
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    setTimeout(() => {
      lightbox.hidden = true;
      lightboxImg.src = '';
      document.body.style.overflow = '';
    }, 400);
  }

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const caption = item.querySelector('figcaption span')?.textContent || '';
      if (img) {
        openLightbox(img.src, caption);
      }
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  // ===== VIDEO MODAL =====
  function openVideo() {
    if (!videoModal) return;
    videoFrame.src = 'https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1';
    videoModal.hidden = false;
    document.body.style.overflow = 'hidden';
    void videoModal.offsetWidth;
    videoModal.classList.add('active');
  }

  function closeVideo() {
    if (!videoModal) return;
    videoModal.classList.remove('active');
    setTimeout(() => {
      videoModal.hidden = true;
      videoFrame.src = '';
      document.body.style.overflow = '';
    }, 400);
  }

  if (watchVideo) watchVideo.addEventListener('click', openVideo);
  if (videoClose) videoClose.addEventListener('click', closeVideo);
  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) closeVideo();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && videoModal.classList.contains('active')) {
        closeVideo();
      }
    });
  }

  // ===== FORM HANDLING =====
  function handleFormSubmit(form, message) {
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = `<span>Sending...</span>`;
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        form.reset();
        alert(message);
      }, 1500);
    });
  }

  handleFormSubmit(contactForm, 'Thank you for contacting SportAcadem! We will get back to you soon.');
  handleFormSubmit(newsletterForm, 'Thank you for subscribing to our newsletter!');

  // ===== BACK TO TOP =====
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    function toggleBackToTop() {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    toggleBackToTop();
    backToTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== CURSOR GLOW (desktop only) =====
  if (!window.matchMedia('(pointer: coarse)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    cursorGlow.setAttribute('aria-hidden', 'true');
    document.body.appendChild(cursorGlow);

    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    function animateGlow() {
      glowX += (mouseX - glowX) * 0.1;
      glowY += (mouseY - glowY) * 0.1;
      cursorGlow.style.transform = `translate(${glowX}px, ${glowY}px)`;
      requestAnimationFrame(animateGlow);
    }
    animateGlow();
  }
});
