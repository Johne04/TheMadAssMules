// GLOBAL FUNCTIONS

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

// HEADER

const nav = document.querySelector(".nav");

window.addEventListener("scroll", () => {
  if (!nav) return;
  nav.classList.toggle("scrolled", window.scrollY > 50);
});

// MEDIA PLAYER

let currentMix = 1;
let isPlaying = false;
let mainAudio, mainProgress, currentTitle;

// LIGHTBOX

let galleryItemsGlobal = [];
let currentGalleryIndex = 0;

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
      src: "./Audio/everybody-needs-somebody.mp3",
      title: "Sample 1 - Everybody needs somebody",
    },
    2: {
      src: "./Audio/get-lucky.mp3",
      title: "Sample 2 - Get Lucky",
    },
    3: {
      src: "./Audio/this-is-the-life.mp3",
      title: "Sample 3 – This is the life",
    },
    4: {
      src: "./Audio/Does-your-mother-know.mp3",
      title: "Sample 4 – Does your mother know",
    },
    5: {
      src: "./Audio/dance-with-me-tonight.mp3",
      title: "Sample 5 – Dance with me tonight",
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
    `.mix-preview-card[data-mix="${mixNumber}"]`,
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

document.addEventListener("DOMContentLoaded", () => {
  // SIDENAV LINKS
  document.querySelectorAll("#mySidenav a").forEach((link) => {
    link.addEventListener("click", () => {
      if (document.getElementById("mySidenav").style.width === "100%") {
        toggleNav();
      }
    });
  });

  // CLICK OUTSIDE SIDENAV
  document.addEventListener("click", (e) => {
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

  // FAQ ACCORDION
  document.querySelectorAll(".faq-question").forEach((question) => {
    question.addEventListener("click", () => {
      const answer = question.nextElementSibling;
      const toggle = question.querySelector(".faq-toggle");

      if (!answer || !toggle) return;

      document.querySelectorAll(".faq-answer").forEach((ans) => {
        if (ans !== answer) {
          ans.style.maxHeight = null;
          ans.style.padding = "0 1.5rem";
          const otherToggle =
            ans.previousElementSibling?.querySelector(".faq-toggle");
          if (otherToggle) otherToggle.textContent = "+";
        }
      });

      if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
        answer.style.padding = "0 1.5rem";
        toggle.textContent = "+";
      } else {
        answer.style.maxHeight = answer.scrollHeight + "px";
        answer.style.padding = "0 1.5rem";
        toggle.textContent = "−";
      }
    });
  });

  // MEDIA PLAYER SETUP
  mainAudio = document.getElementById("main-audio");

  if (mainAudio) {
    mainProgress = document.getElementById("main-progress");
    currentTitle = document.getElementById("current-track-title");

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
      '.mix-preview-card[data-mix="1"]',
    );
    if (initialCard) initialCard.classList.add("active");
  }

  // BACK TO TOP
  const backToTopBtn = document.getElementById("back-to-top");

  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      backToTopBtn.classList.toggle("show", window.scrollY > 300);
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const nav = document.querySelector(".nav");

  if (nav) {
    const toggleNavScrollState = () => {
      if (window.scrollY > 80) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    };

    toggleNavScrollState();
    window.addEventListener("scroll", toggleNavScrollState);
  }

  // LIGHTBOX
  const galleryItems = document.querySelectorAll(
    ".gallery-masonry .gallery-item img",
  );
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  galleryItemsGlobal = Array.from(galleryItems);

  if (lightbox && lightboxImg && galleryItemsGlobal.length) {
    galleryItemsGlobal.forEach((img, idx) => {
      img.addEventListener("click", () => window.showLightbox(idx));
    });

    document
      .querySelector(".close-lightbox")
      ?.addEventListener("click", window.closeLightbox);
    document
      .querySelector(".prev")
      ?.addEventListener("click", () => window.changeImage(-1));
    document
      .querySelector(".next")
      ?.addEventListener("click", () => window.changeImage(1));

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
      { passive: true },
    );

    lightbox.addEventListener(
      "touchend",
      (e) => {
        const diff = touchStartX - e.changedTouches[0].screenX;
        if (Math.abs(diff) > 60) {
          window.changeImage(diff > 0 ? 1 : -1);
        }
      },
      { passive: true },
    );
  }

  // TESTIMONIALS SLIDER
  const testimonialTrack = document.querySelector(".testimonial-track");
  const testimonialSlides = document.querySelectorAll(".testimonial-slide");
  const testimonialPrev = document.querySelector(".testimonial-arrow-prev");
  const testimonialNext = document.querySelector(".testimonial-arrow-next");
  const testimonialDots = document.querySelectorAll(".testimonial-dot");
  const testimonialViewport = document.querySelector(".testimonial-viewport");

  if (
    testimonialTrack &&
    testimonialSlides.length &&
    testimonialPrev &&
    testimonialNext &&
    testimonialDots.length &&
    testimonialViewport
  ) {
    let currentTestimonial = 0;
    let testimonialInterval;
    let startX = 0;

    const updateTestimonials = (index) => {
      const slideWidth = testimonialSlides[0].offsetWidth;
      const trackGap =
        parseFloat(window.getComputedStyle(testimonialTrack).gap) || 0;
      const viewportWidth = testimonialViewport.offsetWidth;
      const trackWidth = testimonialTrack.scrollWidth;

      currentTestimonial = index;

      testimonialSlides.forEach((slide, i) => {
        slide.classList.toggle("active", i === currentTestimonial);
      });

      testimonialDots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentTestimonial);
      });

      const rawOffset =
        currentTestimonial * (slideWidth + trackGap) -
        (viewportWidth - slideWidth) / 2;

      const maxOffset = Math.max(0, trackWidth - viewportWidth);
      const finalOffset = Math.max(0, Math.min(rawOffset, maxOffset));

      testimonialTrack.style.transform = `translateX(-${finalOffset}px)`;
    };

    const nextTestimonial = () => {
      const nextIndex = (currentTestimonial + 1) % testimonialSlides.length;
      updateTestimonials(nextIndex);
    };

    const prevTestimonial = () => {
      const prevIndex =
        (currentTestimonial - 1 + testimonialSlides.length) %
        testimonialSlides.length;
      updateTestimonials(prevIndex);
    };

    const startTestimonialAuto = () => {
      clearInterval(testimonialInterval);
      testimonialInterval = setInterval(nextTestimonial, 6000);
    };

    testimonialNext.addEventListener("click", () => {
      nextTestimonial();
      startTestimonialAuto();
    });

    testimonialPrev.addEventListener("click", () => {
      prevTestimonial();
      startTestimonialAuto();
    });

    testimonialDots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const index = Number(dot.dataset.index);
        updateTestimonials(index);
        startTestimonialAuto();
      });
    });

    testimonialViewport.addEventListener("mouseenter", () => {
      clearInterval(testimonialInterval);
    });

    testimonialViewport.addEventListener("mouseleave", () => {
      startTestimonialAuto();
    });

    testimonialViewport.addEventListener(
      "touchstart",
      (e) => {
        startX = e.changedTouches[0].screenX;
      },
      { passive: true },
    );

    testimonialViewport.addEventListener(
      "touchend",
      (e) => {
        const endX = e.changedTouches[0].screenX;
        const diff = startX - endX;

        if (Math.abs(diff) > 50) {
          if (diff > 0) {
            nextTestimonial();
          } else {
            prevTestimonial();
          }
          startTestimonialAuto();
        }
      },
      { passive: true },
    );

    window.addEventListener("resize", () => {
      updateTestimonials(currentTestimonial);
    });

    updateTestimonials(0);
    startTestimonialAuto();
  }
});
