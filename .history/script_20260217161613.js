// ──────────────────────────────────────────────
// HAMBURGER MENU (mobile nav) – runs immediately
// ──────────────────────────────────────────────

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

// Optional: close when clicking outside the menu
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
// ONE SINGLE PAGE STARTUP BLOCK – everything runs after HTML is loaded
// ──────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {

  // 1. FAQ accordion
  document.querySelectorAll(".faq-question").forEach((question) => {
    question.addEventListener("click", () => {
      const answer = question.nextElementSibling;
      const toggle = question.querySelector(".faq-toggle");

      // Close others
      document.querySelectorAll(".faq-answer").forEach((ans) => {
        if (ans !== answer) {
          ans.style.maxHeight = null;
          ans.style.padding = "0 15px";
          ans.previousElementSibling.querySelector(".faq-toggle").textContent = "+";
        }
      });

      // Toggle current
      if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
        answer.style.padding = "0 25px";
        toggle.textContent = "+";
      } else {
        answer.style.maxHeight = answer.scrollHeight + "px";
        answer.style.padding = "25px";
        toggle.textContent = "-";
      }
    });
  });

  // 2. MEDIA – Single Player + Mix Switching
  const mainAudio = document.getElementById('main-audio');
  if (mainAudio) {
    const mainProgress = document.getElementById('main-progress');
    const currentTitle = document.getElementById('current-track-title');
    const mainSlides = document.querySelectorAll('#main-slideshow .mySlides');

    let currentMix = 1;
    let isPlaying = false;

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

    window.toggleMainPlay = function() {
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

      // Remove .active from ALL mix cards first
      document.querySelectorAll('.mix-preview-card').forEach(card => {
        card.classList.remove('active');
      });

      // Add .active to the clicked card
      const clickedCard = document.querySelector(`.mix-preview-card[onclick="loadMix(${mixNumber})"]`);
      if (clickedCard) clickedCard.classList.add('active');

      // Auto-play the new track
      mainAudio.play().then(() => {
        document.getElementById('main-play')?.classList.add('hidden');
        document.getElementById('main-pause')?.classList.remove('hidden');
        isPlaying = true;
      }).catch(err => console.log("Auto-play prevented:", err));
    };

    // Activate Mix 1 by default on page load
    const initialCard = document.querySelector('.mix-preview-card[onclick="loadMix(1)"]');
    if (initialCard) initialCard.classList.add('active');
  }

  // 3. PHOTO GALLERY LIGHTBOX
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

  // 4. TESTIMONIALS CAROUSEL
  const carouselItems = document.querySelectorAll('.carousel-item');
  const thumbs = document.querySelectorAll('.thumb');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');

  let currentIndex = 0;
  let autoInterval;

  function showTestimonial(index) {
    carouselItems.forEach(item => item.classList.remove('active'));
    thumbs.forEach(thumb => thumb.classList.remove('active'));

    if (carouselItems[index]) carouselItems[index].classList.add('active');
    if (thumbs[index]) thumbs[index].classList.add('active');

    currentIndex = index;
  }

  function nextTestimonial() {
    let newIndex = (currentIndex + 1) % carouselItems.length;
    showTestimonial(newIndex);
  }

  function prevTestimonial() {
    let newIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    showTestimonial(newIndex);
  }

  if (carouselItems.length > 0) {
    showTestimonial(0);
    autoInterval = setInterval(nextTestimonial, 6000);

    thumbs.forEach((thumb, idx) => {
      thumb.addEventListener('click', () => {
        clearInterval(autoInterval);
        showTestimonial(idx);
        autoInterval = setInterval(nextTestimonial, 6000);
      });
    });

    if (prevBtn) prevBtn.addEventListener('click', prevTestimonial);
    if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);

    const carousel = document.querySelector('.testimonial-carousel');
    if (carousel) {
      carousel.addEventListener('mouseenter', () => clearInterval(autoInterval));
      carousel.addEventListener('mouseleave', () => {
        autoInterval = setInterval(nextTestimonial, 6000);
      });
    }
  }

  // 5. TESTIMONIAL CARD FADE-IN ANIMATION (when scrolled into view)
  const testimonialCard = document.querySelector('.testimonial-card');

  if (testimonialCard) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          testimonialCard.classList.add('visible');
          observer.unobserve(testimonialCard); // only animate once
        }
      });
    }, { threshold: 0.2 });

    observer.observe(testimonialCard);
  }

  // ← Add any future code here, before the closing });

}); // End of DOMContentLoaded