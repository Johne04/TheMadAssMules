const navLinks = document.querySelectorAll(".nav ul li a");

const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

// Audio Controls for slideshow
const audio = document.getElementById('audio');
const progressBarFill = document.getElementById('progress-bar-fill');

const playAudio = () => audio.play();
const pauseAudio = () => audio.pause();
const stopAudio = () => {
  audio.pause();
  audio.currentTime = 0;
};

audio.addEventListener('timeupdate', () => {
  const progress = (audio.currentTime / audio.duration) * 100;
  progressBarFill.style.width = progress + '%';
});

//step 1: get DOM
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoNext = 7000;

nextDom.onclick = function(){
    showSlider('next');    
}

prevDom.onclick = function(){
    showSlider('prev');    
}
let runTimeOut;
let runNextAuto = setTimeout(() => {
    next.click();
}, timeAutoNext)
function showSlider(type){
    let  SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    
    if(type === 'next'){
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    }else{
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        next.click();
    }, timeAutoNext)
}

// Slideshow Logic
document.addEventListener('DOMContentLoaded', function () {
  const slideshows = document.querySelectorAll('.slideshow-container');
  slideshows.forEach((slideshow) => {
    const slides = slideshow.querySelectorAll('.mySlides');
    let currentIndex = 0;

    // Ensure the first slide is visible on load (already handled by CSS, but reinforce here)
    slides.forEach((slide, index) => {
      slide.style.display = index === 0 ? 'block' : 'none';
    });

    // Start the slideshow
    setInterval(() => {
      slides[currentIndex].style.display = 'none'; // Hide current slide
      currentIndex = (currentIndex + 1) % slides.length; // Move to next index
      slides[currentIndex].style.display = 'block'; // Show next slide
    }, 3000); // Change image every 3 seconds
  });
});
/*FAQ's section*/

//Hamburger side menu
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

document.querySelectorAll(".faq-question").forEach((question) => {
  question.addEventListener("click", () => {
    const answer = question.nextElementSibling;
    const toggle = question.querySelector(".faq-toggle");

    // Collapse other open items (optional)
    document.querySelectorAll(".faq-answer").forEach((ans) => {
      if (ans !== answer) {
        ans.style.maxHeight = null;
        ans.style.padding = "0 15px";
        ans.previousElementSibling.querySelector(".faq-toggle").textContent =
          "+";
      }
    });

    // Toggle current item
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


document.addEventListener("DOMContentLoaded", () => {
  const galleryItems = document.querySelectorAll(".gallery-item img");
  const lightbox = document.querySelector(".lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeLightbox = document.querySelector(".close-lightbox");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");

  let currentIndex = -1;
  let startX = 0; // To capture touch start position

  // Function to show the lightbox with the image at the specified index
  const showLightbox = (index) => {
    currentIndex = index;
    lightboxImg.src = galleryItems[index].src;
    lightbox.style.display = "flex";
  };

  // Function to close the lightbox
  const close = () => {
    lightbox.style.display = "none";
    currentIndex = -1;
  };

  // Navigate to the previous image
  const prevImage = () => {
    if (currentIndex > 0) {
      showLightbox(currentIndex - 1);
    }
  };

  // Navigate to the next image
  const nextImage = () => {
    if (currentIndex < galleryItems.length - 1) {
      showLightbox(currentIndex + 1);
    }
  };

  // Handle swipe gestures
  const handleTouchStart = (e) => {
    startX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (diff > 50) {
      // Swipe left
      nextImage();
    } else if (diff < -50) {
      // Swipe right
      prevImage();
    }
  };

  // Attach click event listeners to gallery items
  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => showLightbox(index));
  });

  // Attach click event listeners to lightbox controls
  closeLightbox.addEventListener("click", close);
  prevButton.addEventListener("click", prevImage);
  nextButton.addEventListener("click", nextImage);

  // Close lightbox when clicking outside the image
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });

  // Add touch event listeners to the lightbox for swipe functionality
  lightbox.addEventListener("touchstart", handleTouchStart, { passive: true });
  lightbox.addEventListener("touchend", handleTouchEnd, { passive: true });

  // Add keyboard navigation support
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "ArrowRight") nextImage();
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

  // Slideshow for main cover
  let slideIndex = 0;
  setInterval(() => {
    mainSlides[slideIndex].classList.remove('active');
    slideIndex = (slideIndex + 1) % mainSlides.length;
    mainSlides[slideIndex].classList.add('active');
  }, 5000);

  // Progress
  mainAudio.addEventListener('timeupdate', () => {
    const progress = (mainAudio.currentTime / mainAudio.duration) * 100 || 0;
    mainProgress.style.width = `${progress}%`;
  });

  mainAudio.addEventListener('ended', () => {
    document.getElementById('main-play').classList.remove('hidden');
    document.getElementById('main-pause').classList.add('hidden');
    isPlaying = false;
  });

  window.toggleMainPlay = function() {
    if (mainAudio.paused) {
      mainAudio.play();
      document.getElementById('main-play').classList.add('hidden');
      document.getElementById('main-pause').classList.remove('hidden');
      isPlaying = true;
    } else {
      mainAudio.pause();
      document.getElementById('main-play').classList.remove('hidden');
      document.getElementById('main-pause').classList.add('hidden');
      isPlaying = false;
    }
  };

  window.stopMainAudio = function() {
    mainAudio.pause();
    mainAudio.currentTime = 0;
    document.getElementById('main-play').classList.remove('hidden');
    document.getElementById('main-pause').classList.add('hidden');
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

    // Pause current
    mainAudio.pause();

    // Load new track
    mainAudio.src = track.src;
    currentTitle.textContent = track.title;
    currentMix = mixNumber;

    // Auto-play after load
    mainAudio.play().then(() => {
      document.getElementById('main-play').classList.add('hidden');
      document.getElementById('main-pause').classList.remove('hidden');
      isPlaying = true;
    }).catch(err => console.log("Auto-play prevented:", err));
  };
});

// ──────────────────────────────────────────────
// PHOTO GALLERY – Enhanced Lightbox
// ──────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  const galleryItems = document.querySelectorAll('.gallery-item img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  let currentIndex = 0;

  function showLightbox(index) {
    currentIndex = index;
    lightboxImg.src = galleryItems[index].src;
    lightboxImg.alt = galleryItems[index].alt;
    lightbox.classList.add('show');
    document.body.style.overflow = 'hidden'; // prevent scroll behind
  }

  function closeLightbox() {
    lightbox.classList.remove('show');
    document.body.style.overflow = '';
    lightboxImg.classList.remove('zoomed');
  }

  function changeImage(direction) {
    currentIndex = (currentIndex + direction + galleryItems.length) % galleryItems.length;
    lightboxImg.src = galleryItems[currentIndex].src;
    lightboxImg.alt = galleryItems[currentIndex].alt;
    lightboxImg.classList.remove('zoomed');
  }

  // Click on image to open
  galleryItems.forEach((img, index) => {
    img.addEventListener('click', () => showLightbox(index));
  });

  // Controls
  document.querySelector('.close-lightbox').addEventListener('click', closeLightbox);
  document.querySelector('.prev').addEventListener('click', () => changeImage(-1));
  document.querySelector('.next').addEventListener('click', () => changeImage(1));

  // Click outside image to close
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Zoom on click inside lightbox image
  lightboxImg.addEventListener('click', () => {
    lightboxImg.classList.toggle('zoomed');
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('show')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') changeImage(-1);
    if (e.key === 'ArrowRight') changeImage(1);
  });

  // Swipe support (mobile)
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener('touchend', e => {
    const touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 60) changeImage(1);   // swipe left → next
    if (touchEndX - touchStartX > 60) changeImage(-1);  // swipe right → prev
  }, { passive: true });
});