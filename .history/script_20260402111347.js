// ──────────────────────────────────────────────
// GLOBAL FUNCTIONS – available immediately
// ──────────────────────────────────────────────

// Hamburger Menu (mobile nav)
function toggleNav() {
  const sidenav = document.getElementById("mySidenav");
  const hamburger = document.querySelector(".hamburger");

  if (!sidenav || !hamburger) return;

  if (sidenav.style.width === "100%") {
    sidenav.style.width = "0";
    hamburger.classList.remove("change");
  } else {
    sidenav.style.width = "100%";
    hamburger.classList.add("change");
  }
}

// Close menu when clicking any link inside sidenav
document.querySelectorAll("#mySidenav a").forEach((link) => {
  link.addEventListener("click", () => {
    if (document.getElementById("mySidenav").style.width === "100%") {
      toggleNav();
    }
  });
});

// Close menu when clicking outside
document.addEventListener("click", function (e) {
  const sidenav = document.getElementById("mySidenav");
  const hamburger = document.querySelector(".hamburger");

  if (!sidenav || !hamburger) return;

  if (
    sidenav.style.width === "100%" &&
    !hamburger.contains(e.target) &&
    !sidenav.contains(e.target)
  ) {
    toggleNav();
  }
});

// ──────────────────────────────────────────────
// MEDIA PLAYER – Single Player + Mix Switching
// ──────────────────────────────────────────────

let currentMix = 1;
let isPlaying = false;
let mainAudio, mainProgress, currentTitle, mainSlides;

window.toggleMainPlay = function () {
  if (!mainAudio) return;

  const playBtn = document.getElementById("main-play");
  const pauseBtn = document.getElementById("main-pause");

  if (mainAudio.paused) {
    mainAudio.play().catch((err) => console.log("Play prevented:", err));
    playBtn?.classList.add("hidden");
    pauseBtn?.classList.remove("hidden");
    isPlaying = true;
  } else {
    mainAudio.pause();
    playBtn?.classList.remove("hidden");
    pauseBtn?.classList.add("hidden");
    isPlaying = false;
  }
};

window.stopMainAudio = function () {
  if (!mainAudio) return;

  const playBtn = document.getElementById("main-play");
  const pauseBtn = document.getElementById("main-pause");

  mainAudio.pause();
  mainAudio.currentTime = 0;
  playBtn?.classList.remove("hidden");
  pauseBtn?.classList.add("hidden");
  isPlaying = false;

  if (mainProgress) {
    mainProgress.style.width = "0%";
  }
};

window.loadMix = function (mixNumber) {
  if (!mainAudio) return;
  if (currentMix === mixNumber && isPlaying) return;

  const tracks = {
    1: {
      src: "./Audio/Rumbling_Wind.mp3",
      title: "Mix 1 – Wedding Floor Fillers",
    },
    2: {
      src: "audio2.mp3",
      title: "Mix 2 – Slow & Romantic",
    },
    3: {
      src: "audio3.mp3",
      title: "Mix 3 – Party Starters",
    },
  };

  const track = tracks[mixNumber];
  if (!track) return;

  const playBtn = document.getElementById("main-play");
  const pauseBtn = document.getElementById("main-pause");

  mainAudio.pause();
  mainAudio.src = track.src;
  mainAudio.load();

  if (currentTitle) currentTitle.textContent = track.title;
  currentMix = mixNumber;

  document.querySelectorAll(".mix-preview-card").forEach((card) => {
    card.classList.remove("active");
  });

  const clickedCard = document.querySelector(
    `.mix-preview-card[data-mix="${mixNumber}"]`
  );
  if (clickedCard) clickedCard.classList.add("active");

  mainAudio
    .play()
    .then(() => {
      playBtn?.classList.add("hidden");
      pauseBtn?.classList.remove("hidden");
      isPlaying = true;
    })
    .catch((err) => {
      console.log("Auto-play prevented:", err);
      playBtn?.classList.remove("hidden");
      pauseBtn?.classList.add("hidden");
      isPlaying = false;
    });
};

// ──────────────────────────────────────────────
// PHOTO GALLERY LIGHTBOX – globals for inline onclick
// ──────────────────────────────────────────────

let galleryItemsGlobal = [];
let currentGalleryIndex = 0;

window.showLightbox = function (index) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  if (!lightbox || !lightboxImg || !galleryItemsGlobal.length) return;

  currentGalleryIndex = index;
  lightboxImg.src = galleryItemsGlobal[index].src;
  lightboxImg.alt = galleryItemsGlobal[index].alt || "Gallery photo";
  lightbox.classList.add("show");
  document.body.style.overflow = "hidden";
};

window.closeLightbox = function () {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  if (!lightbox || !lightboxImg) return;

  lightbox.classList.remove("show");
  document.body.style.overflow = "";
  lightboxImg.classList.remove("zoomed");
};

window.changeImage = function (direction) {
  const lightboxImg = document.getElementById("lightbox-img");

  if (!lightboxImg || !galleryItemsGlobal.length) return;

  currentGalleryIndex =
    (currentGalleryIndex + direction + galleryItemsGlobal.length) %
    galleryItemsGlobal.length;

  lightboxImg.src = galleryItemsGlobal[currentGalleryIndex].src;
  lightboxImg.alt =
    galleryItemsGlobal[currentGalleryIndex].alt || "Gallery photo";
  lightboxImg.classList.remove("zoomed");
};

// ──────────────────────────────────────────────
// PAGE STARTUP – ONE SINGLE DOMContentLoaded
// ──────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
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

          const otherToggle =
            ans.previousElementSibling?.querySelector(".faq-toggle");
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

  // 2. Media Player Setup
  mainAudio = document.getElementById("main-audio");

  if (mainAudio) {
    mainProgress = document.getElementById("main-progress");
    currentTitle = document.getElementById("current-track-title");
    mainSlides = document.querySelectorAll("#main-slideshow .mySlides");

    let slideIndex = 0;

    if (mainSlides.length) {
      setInterval(() => {
        mainSlides[slideIndex].classList.remove("active");
        slideIndex = (slideIndex + 1) % mainSlides.length;
        mainSlides[slideIndex].classList.add("active");
      }, 5000);
    }

    mainAudio.addEventListener("timeupdate", () => {
      const progress = (mainAudio.currentTime / mainAudio.duration) * 100 || 0;
      if (mainProgress) mainProgress.style.width = `${progress}%`;
    });

    mainAudio.addEventListener("ended", () => {
      document.getElementById("main-play")?.classList.remove("hidden");
      document.getElementById("main-pause")?.classList.add("hidden");
      isPlaying = false;

      if (mainProgress) mainProgress.style.width = "0%";
    });

    const initialCard = document.querySelector(
      '.mix-preview-card[data-mix="1"]'
    );
    if (initialCard) initialCard.classList.add("active");
  }

  // 3. Back to Top Button
  const backToTopBtn = document.getElementById("back-to-top");

  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      backToTopBtn.classList.toggle("show", window.scrollY > 300);
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // 4. PHOTO GALLERY LIGHTBOX
  const galleryItems = document.querySelectorAll(".gallery-masonry .gallery-item img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  galleryItemsGlobal = Array.from(galleryItems);

  if (lightbox && lightboxImg && galleryItemsGlobal.length) {
    galleryItemsGlobal.forEach((img, idx) => {
      img.addEventListener("click", () => window.showLightbox(idx));
    });

    document.querySelector(".close-lightbox")?.addEventListener("click", window.closeLightbox);
    document.querySelector(".prev")?.addEventListener("click", () => window.changeImage(-1));
    document.querySelector(".next")?.addEventListener("click", () => window.changeImage(1));

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) window.closeLightbox();
    });

    lightboxImg.addEventListener("click", (e) => {
      e.stopPropagation();
      lightboxImg.classList.toggle("zoomed");
    });

    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("show")) return;

      if (e.key === "Escape") window.closeLightbox();
      if (e.key === "ArrowLeft") window.changeImage(-1);
      if (e.key === "ArrowRight") window.changeImage(1);
    });

    let touchStartX = 0;

    lightbox.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    lightbox.addEventListener(
      "touchend",
      (e) => {
        const diff = touchStartX - e.changedTouches[0].screenX;
        if (Math.abs(diff) > 60) {
          window.changeImage(diff > 0 ? 1 : -1);
        }
      },
      { passive: true }
    );
  }

  
});