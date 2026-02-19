// ──────────────────────────────────────────────
// HAMBURGER MENU (mobile nav)
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

// ──────────────────────────────────────────────
// FAQ ACCORDION
// ──────────────────────────────────────────────

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

// ──────────────────────────────────────────────
// MEDIA – Single Player + Mix Switching
// ──────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  const mainAudio = document.getElementById('main-audio');
  const mainProgress = document.getElementById('main-progress');
  const currentTitle = document.getElementById('current-track-title');
  const mainSlides = document.querySelectorAll('#main-slideshow .mySlides');

  let currentMix = 1;
  let isPlaying = false;

  // Main cover slideshow
  let slideIndex = 0;
  const slideInterval = setInterval(() => {
    if (!mainSlides.length) return;
    mainSlides[slideIndex].classList.remove('active');
    slideIndex = (slideIndex + 1) % mainSlides.length;
    mainSlides[slideIndex].classList.add('active');
  }, 5000);

  // Progress bar
  mainAudio.addEventListener('timeupdate', () => {
    const progress = (mainAudio.currentTime / mainAudio.duration) * 100 || 0;
    mainProgress.style.width = `${progress}%`;
  });

  mainAudio.addEventListener('ended', () => {
    document.getElementById('main-play')?.classList.remove('hidden');
    document.getElementById('main-pause')?.classList.add('hidden');
    isPlaying = false;
  });

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
    if (!mainAudio) return;
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

    mainAudio.play().then(() => {
      document.getElementById('main-play')?.classList.add('hidden');
      document.getElementById('main-pause')?.classList.remove('hidden');
      isPlaying = true;
    }).catch(err => console.log("Auto-play prevented:", err));
  };
});

// ──────────────────────────────────────────────
// PHOTO GALLERY LIGHTBOX (only this version – clean & working)
// ──────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  const galleryItems = document.querySelectorAll('.gallery-masonry .gallery-item img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');

  if (!lightbox || !lightboxImg || !galleryItems.length) {
    console.warn("Lightbox elements or gallery images not found.");
    return;
  }

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

  // Open on click
  galleryItems.forEach((img, idx) => {
    img.addEventListener('click', () => showLightbox(idx));
  });

  // Controls
  document.querySelector('.close-lightbox')?.addEventListener('click', closeLightbox);
  document.querySelector('.prev')?.addEventListener('click', () => changeImage(-1));
  document.querySelector('.next')?.addEventListener('click', () => changeImage(1));

  // Click outside image → close
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Zoom toggle on image click
  lightboxImg.addEventListener('click', (e) => {
    e.stopPropagation(); // prevent closing
    lightboxImg.classList.toggle('zoomed');
  });

  // Keyboard
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('show')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') changeImage(-1);
    if (e.key === 'ArrowRight') changeImage(1);
  });

  // Touch swipe
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
});