// ──────────────────────────────────────────────
// GLOBAL FUNCTIONS – available immediately
// ──────────────────────────────────────────────

// Hamburger Menu (mobile nav)
function toggleNav() {
  const sidenav = document.getElementById("mySidenav");
  const hamburger = document.querySelector(".hamburger");

  if (sidenav.style.width === "100%") {
    sidenav.style.width = "0";
    hamburger.classList.remove("change");
  } else {
    sidenav.style.width = "100%";
    hamburger.classList.add("change");
  }
}

// Close menu when clicking any link inside sidenav
document.querySelectorAll('#mySidenav a').forEach(link => {
  link.addEventListener('click', () => {
    if (document.getElementById("mySidenav").style.width === "100%") {
      toggleNav();
    }
  });
});

// Close menu when clicking outside
document.addEventListener('click', function(e) {
  const sidenav = document.getElementById("mySidenav");
  const hamburger = document.querySelector(".hamburger");

  if (
    sidenav.style.width === "100%" &&
    !hamburger.contains(e.target) &&
    !sidenav.contains(e.target)
  ) {
    toggleNav();
  }
});

// ──────────────────────────────────────────────
// MEDIA PLAYER – Single Player + Mix Switching (global so onclick works)
// ──────────────────────────────────────────────

let currentMix = 1;
let isPlaying = false;
let mainAudio, mainProgress, currentTitle, mainSlides;

window.toggleMainPlay = function() {
  if (!mainAudio) return;
  if (mainAudio.paused) {
    mainAudio.play().catch(err => console.log("Play prevented:", err));
    document.getElementById('main-play')?.classList.add('hidden');
    document.getElementById('main-pause')?.classList.remove('hidden');
    isPlaying = true;
  } else {
    mainAudio.pause();
    document.getElementById('main-play')?.classList.remove('hidden');
    document.getElementById('main-pause')?.classList.add('hidden');
    isPlaying = false;
  }
};

window.stopMainAudio = function() {
  if (!mainAudio) return;
  mainAudio.pause();
  mainAudio.currentTime = 0;
  document.getElementById('main-play')?.classList.remove('hidden');
  document.getElementById('main-pause')?.classList.add('hidden');
  isPlaying = false;
};

window.loadMix = function(mixNumber) {
  if (currentMix === mixNumber && isPlaying) return;

  const tracks = {
    1: { src: "./Audio/Rumbling_Wind.mp3", title: "Mix 1 – Wedding Floor Fillers" },
    2: { src: "audio2.mp3", title: "Mix 2 – Slow & Romantic" },
    3: { src: "audio3.mp3", title: "Mix 3 – Party Starters" }
  };

  const track = tracks[mixNumber];
  if (!track) return;

  mainAudio.pause();
  mainAudio.src = track.src;
  if (currentTitle) currentTitle.textContent = track.title;
  currentMix = mixNumber;

  // Remove active from all cards
  document.querySelectorAll('.mix-preview-card').forEach(card => {
    card.classList.remove('active');
  });

  // Add active to clicked card
  const clickedCard = document.querySelector(`.mix-preview-card[onclick="loadMix(${mixNumber})"]`);
  if (clickedCard) clickedCard.classList.add('active');

  // Auto-play
  mainAudio.play().then(() => {
    document.getElementById('main-play')?.classList.add('hidden');
    document.getElementById('main-pause')?.classList.remove('hidden');
    isPlaying = true;
  }).catch(err => console.log("Auto-play prevented:", err));
};

// ──────────────────────────────────────────────
// PAGE STARTUP – ONE SINGLE DOMContentLoaded
// ──────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {

  // 1. FAQ accordion
  document.querySelectorAll(".faq-question").forEach((question) => {
    question.addEventListener("click", () => {
      const answer = question.nextElementSibling;
      const toggle = question.querySelector(".faq-toggle");

      if (!answer || !toggle) return;

      document.querySelectorAll(".faq-answer").forEach((ans) => {
        if (ans !== answer) {
          ans.style.maxHeight = null;
          ans.style.padding = "0 15px";
          const otherToggle = ans.previousElementSibling?.querySelector(".faq-toggle");
          if (otherToggle) otherToggle.textContent = "+";
        }
      });

      if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
        answer.style.padding = "0 15px";
        toggle.textContent = "+";
      } else {
        answer.style.maxHeight = answer.scrollHeight + "px";
        answer.style.padding = "15px 15px 15px 25px";
        toggle.textContent = "−";
      }
    });
  });

  // 2. Media Player Setup (variables + slideshow + progress + default active)
  mainAudio = document.getElementById('main-audio');
  if (mainAudio) {
    mainProgress = document.getElementById('main-progress');
    currentTitle = document.getElementById('current-track-title');
    mainSlides = document.querySelectorAll('#main-slideshow .mySlides');

    // Main cover slideshow
    let slideIndex = 0;
    setInterval(() => {
      if (!mainSlides.length) return;
      mainSlides[slideIndex].classList.remove('active');
      slideIndex = (slideIndex + 1) % mainSlides.length;
      mainSlides[slideIndex].classList.add('active');
    }, 5000);

    // Progress bar
    mainAudio.addEventListener('timeupdate', () => {
      const progress = (mainAudio.currentTime / mainAudio.duration) * 100 || 0;
      if (mainProgress) mainProgress.style.width = `${progress}%`;
    });

    mainAudio.addEventListener('ended', () => {
      document.getElementById('main-play')?.classList.remove('hidden');
      document.getElementById('main-pause')?.classList.add('hidden');
      isPlaying = false;
    });

    // Activate Mix 1 by default
    const initialCard = document.querySelector('.mix-preview-card[onclick="loadMix(1)"]');
    if (initialCard) initialCard.classList.add('active');
  }

  // 3. Back to Top Button
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      backToTopBtn.classList.toggle('show', window.scrollY > 300);
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 4. PHOTO GALLERY LIGHTBOX
  const galleryItems = document.querySelectorAll('.gallery-masonry .gallery-item img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');

  if (lightbox && lightboxImg && galleryItems.length) {
    let currentIndex = 0;

    function showLightbox(index) {
      currentIndex = index;
      lightboxImg.src = galleryItems[index].src;
      lightboxImg.alt = galleryItems[index].alt || "Gallery photo";
      lightbox.classList.add('show');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('show');
      document.body.style.overflow = '';
      lightboxImg.classList.remove('zoomed');
    }

    function changeImage(direction) {
      currentIndex = (currentIndex + direction + galleryItems.length) % galleryItems.length;
      lightboxImg.src = galleryItems[currentIndex].src;
      lightboxImg.alt = galleryItems[currentIndex].alt || "Gallery photo";
      lightboxImg.classList.remove('zoomed');
    }

    galleryItems.forEach((img, idx) => {
      img.addEventListener('click', () => showLightbox(idx));
    });

    document.querySelector('.close-lightbox')?.addEventListener('click', closeLightbox);
    document.querySelector('.prev')?.addEventListener('click', () => changeImage(-1));
    document.querySelector('.next')?.addEventListener('click', () => changeImage(1));

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    lightboxImg.addEventListener('click', (e) => {
      e.stopPropagation();
      lightboxImg.classList.toggle('zoomed');
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('show')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') changeImage(-1);
      if (e.key === 'ArrowRight') changeImage(1);
    });

    let touchStartX = 0;
    lightbox.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 60) {
        changeImage(diff > 0 ? 1 : -1);
      }
    }, { passive: true });
  }

    // 5. TESTIMONIALS SLIDER
  const testimonialSlides = document.querySelectorAll(".testimonial-slide");
  const testimonialThumbs = document.querySelectorAll(".testimonial-thumb");
  const testimonialPrev = document.querySelector(".testimonial-prev");
  const testimonialNext = document.querySelector(".testimonial-next");
  const testimonialSlider = document.querySelector(".testimonial-slider");

  if (
    testimonialSlides.length &&
    testimonialThumbs.length &&
    testimonialPrev &&
    testimonialNext &&
    testimonialSlider
  ) {
    let currentTestimonial = 0;
    let testimonialInterval;

    const showTestimonial = (index) => {
      testimonialSlides.forEach((slide) => slide.classList.remove("active"));
      testimonialThumbs.forEach((thumb) => thumb.classList.remove("active"));

      testimonialSlides[index].classList.add("active");
      testimonialThumbs[index].classList.add("active");
      currentTestimonial = index;
    };

    const nextTestimonial = () => {
      const nextIndex = (currentTestimonial + 1) % testimonialSlides.length;
      showTestimonial(nextIndex);
    };

    const prevTestimonial = () => {
      const prevIndex =
        (currentTestimonial - 1 + testimonialSlides.length) %
        testimonialSlides.length;
      showTestimonial(prevIndex);
    };

    const startTestimonialAuto = () => {
      clearInterval(testimonialInterval);
      testimonialInterval = setInterval(nextTestimonial, 6000);
    };

    testimonialNext.addEventListener("click", nextTestimonial);
    testimonialPrev.addEventListener("click", prevTestimonial);

    testimonialThumbs.forEach((thumb, index) => {
      thumb.addEventListener("click", () => {
        showTestimonial(index);
        startTestimonialAuto();
      });
    });

    testimonialSlider.addEventListener("mouseenter", () => {
      clearInterval(testimonialInterval);
    });

    testimonialSlider.addEventListener("mouseleave", () => {
      startTestimonialAuto();
    });

    showTestimonial(0);
    startTestimonialAuto();
  }

}); // End of DOMContentLoaded