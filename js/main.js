document.addEventListener('DOMContentLoaded', () => {

  /* ===============================
     POP-UP OUVERTURE
  ================================ */
  const popup = document.getElementById('opening-popup');
  const closeBtn = popup?.querySelector('.opening-popup-close');
  
  // Date d'ouverture : 16 février 2025
  const openingDate = new Date('2025-02-16');
  const today = new Date();
  
  // Afficher le popup seulement si on est avant la date d'ouverture
  if (popup && today < openingDate) {
    // Afficher après 1.5 secondes
    setTimeout(() => {
      popup.classList.add('show');
    }, 1500);
  }
  
  // Fermer le popup
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      popup.classList.remove('show');
    });
  }
  
  // Fermer en cliquant sur le fond
  if (popup) {
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        popup.classList.remove('show');
      }
    });
  }

  /* ===============================
     SLIDER PRINCIPAL AMÉLIORÉ
  ================================ */
  const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slider .slide');
  const indicators = document.querySelectorAll('.indicator');
  
  if (slides.length > 1) {
    let currentIndex = 0;
    let autoplayInterval;
    const AUTOPLAY_DELAY = 5000; // 5 secondes

    // Fonction pour changer de slide
    function goToSlide(index) {
      // Retirer active de l'ancienne slide et indicateur
      slides[currentIndex].classList.remove('active');
      indicators[currentIndex].classList.remove('active');
      
      // Ajouter active à la nouvelle slide et indicateur
      currentIndex = index;
      slides[currentIndex].classList.add('active');
      indicators[currentIndex].classList.add('active');
      
      // Réinitialiser l'autoplay
      resetAutoplay();
    }

    // Navigation par indicateurs
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        goToSlide(index);
      });
    });

    // Autoplay
    function startAutoplay() {
      autoplayInterval = setInterval(() => {
        const nextIndex = (currentIndex + 1) % slides.length;
        goToSlide(nextIndex);
      }, AUTOPLAY_DELAY);
    }

    function stopAutoplay() {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
      }
    }

    function resetAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    // Démarrer l'autoplay
    startAutoplay();

    // Pause au hover (optionnel)
    if (slider) {
      slider.addEventListener('mouseenter', stopAutoplay);
      slider.addEventListener('mouseleave', startAutoplay);
    }

    // Pause quand l'utilisateur change d'onglet
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    });

    // Navigation au clavier (accessibilité)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        goToSlide(prevIndex);
      } else if (e.key === 'ArrowRight') {
        const nextIndex = (currentIndex + 1) % slides.length;
        goToSlide(nextIndex);
      }
    });
  }

  /* ===============================
     ANIMATIONS AU SCROLL (INTERSECTION OBSERVER)
  ================================ */
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Optionnel : arrêter d'observer après révélation
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observer tous les éléments avec la classe reveal-on-scroll
  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    observer.observe(el);
  });

  /* ===============================
     MINI DIAPORAMAS (TIMELINE) - Pour pages intérieures
  ================================ */
  document.querySelectorAll('.mini-carousel').forEach(carousel => {
    const miniSlides = carousel.querySelectorAll('.mini-slide');
    if (miniSlides.length < 2) return;

    let miniIndex = 0;

    setInterval(() => {
      miniSlides[miniIndex].classList.remove('active');
      miniIndex = (miniIndex + 1) % miniSlides.length;
      miniSlides[miniIndex].classList.add('active');
    }, 5200);
  });

  /* ===============================
     SMOOTH SCROLL POUR LES ANCRES
  ================================ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      // Ignorer les liens "#" vides
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  /* ===============================
     GESTION DES LIENS DÉSACTIVÉS
  ================================ */
  document.querySelectorAll('.social-btn--disabled').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Animation de "secousse" pour indiquer que c'est désactivé
      btn.style.animation = 'shake 0.5s ease';
      setTimeout(() => {
        btn.style.animation = '';
      }, 500);
    });
  });

  /* ===============================
     PERFORMANCE : LAZY LOADING IMAGES
  ================================ */
  if ('loading' in HTMLImageElement.prototype) {
    // Le navigateur supporte le lazy loading natif
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      img.src = img.dataset.src || img.src;
    });
  } else {
    // Fallback pour les anciens navigateurs
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
  }

  /* ===============================
     AMÉLIORATION UX : HOVER PARALLAX SUBTIL (OPTIONNEL)
  ================================ */
  const cards = document.querySelectorAll('.univers-card, .prestations-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;
      
      // Effet 3D subtil
      card.style.transform = `
        perspective(1000px) 
        rotateY(${deltaX * 2}deg) 
        rotateX(${-deltaY * 2}deg) 
        translateY(-8px)
      `;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ===============================
     ACCESSIBILITÉ : FOCUS VISIBLE
  ================================ */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
  });

  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
  });

  /* ===============================
     CONSOLE MESSAGE (OPTIONNEL)
  ================================ */
  console.log('%c🎂 Gérald Canet - Maître Artisan Pâtissier', 
    'font-size: 16px; font-weight: bold; color: #7d1f31; padding: 10px;');
  console.log('%cSite modernisé par Claude ✨', 
    'font-size: 12px; color: #d4af37;');

});

/* ===============================
   ANIMATION "SHAKE" POUR BOUTONS DÉSACTIVÉS
================================ */
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
  }
  
  /* Focus visible pour accessibilité */
  body.keyboard-navigation *:focus {
    outline: 3px solid #d4af37;
    outline-offset: 3px;
  }
  
  body:not(.keyboard-navigation) *:focus {
    outline: none;
  }
`;
document.head.appendChild(style);
