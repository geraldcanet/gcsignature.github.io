
    document.addEventListener('DOMContentLoaded', () => {

  /* ===============================
     SLIDER PRINCIPAL "À PROPOS"
  ================================ */
  const mainSlides = document.querySelectorAll('.slider .slide');

  if (mainSlides.length > 1) {
    let index = 0;

    setInterval(() => {
      mainSlides[index].classList.remove('active');
      index = (index + 1) % mainSlides.length;
      mainSlides[index].classList.add('active');
    }, 4000);
  }

  /* ===============================
     MINI DIAPORAMAS (TIMELINE)
  ================================ */
  document.querySelectorAll('.mini-carousel').forEach(carousel => {
    const slides = carousel.querySelectorAll('.mini-slide');
    if (slides.length < 2) return;

    let i = 0;

    setInterval(() => {
      slides[i].classList.remove('active');
      i = (i + 1) % slides.length;
      slides[i].classList.add('active');
    }, 5200);
  });

});
