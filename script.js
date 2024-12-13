const navLinks = document.querySelectorAll(".nav ul li a");

const mainPic = document.getElementById("main-pic");
const showVid = document.getElementById("showVideoBtn");
const videoContainer = document.getElementById("videoContainer");

const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

// navLinks.forEach((link, index) => {
//   link.classList.add("show");
// });

showVid.addEventListener(
  "click",
  () => (videoContainer.style.display = "block")
);

mainPic.addEventListener(
  "click",
  () => (videoContainer.style.display = "none")
);

let currentIndex = 0;

// Preload images and set as background
slides.forEach((slide, index) => {
  const img = slide.querySelector("img");
  const imgSrc = img.src;
  img.style.display = "none";
  slide.style.backgroundImage = `url(${imgSrc})`;
});

function showSlide(index) {
  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;

  slider.style.transform = `translateX(-${index * 100}%)`;
  currentIndex = index;
}

prevButton.addEventListener("click", () => showSlide(currentIndex - 1));
nextButton.addEventListener("click", () => showSlide(currentIndex + 1));

// Optional: Auto-slide
setInterval(() => showSlide(currentIndex + 1), 5000);

/*FAQ's section*/

function toggleNav() {
  const sidenav = document.getElementById("mySidenav");
  const hamburger = document.querySelector('.hamburger');

  if (sidenav.style.width === "250px") {
    sidenav.style.width = "0";
    hamburger.classList.remove('change');
  } else {
    sidenav.style.width = "250px";
    hamburger.classList.add('change');
  }
}

document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const answer = question.nextElementSibling;
    const toggle = question.querySelector('.faq-toggle');

    // Collapse other open items (optional)
    document.querySelectorAll('.faq-answer').forEach(ans => {
      if (ans !== answer) {
        ans.style.maxHeight = null;
        ans.style.padding = '0 15px';
        ans.previousElementSibling.querySelector('.faq-toggle').textContent = '+';
      }
    });

    // Toggle current item
    if (answer.style.maxHeight) {
      answer.style.maxHeight = null;
      answer.style.padding = '0 25px';
      toggle.textContent = '+';
    } else {
      answer.style.maxHeight = answer.scrollHeight + 'px';
      answer.style.padding = '25px';
      toggle.textContent = '-';
    }
  });
});


// SOCIAL PANEL JS
// const floating_btn = document.querySelector('.floating-btn');
// const close_btn = document.querySelector('.close-btn');
// const social_panel_container = document.querySelector('.social-panel-container');

// floating_btn.addEventListener('click', () => {
// 	social_panel_container.classList.toggle('visible')
// });

// close_btn.addEventListener('click', () => {
// 	social_panel_container.classList.remove('visible')
// });


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

const prevImage = () => {
  const newIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  showLightbox(newIndex);
};

const nextImage = () => {
  const newIndex = (currentIndex + 1) % galleryItems.length;
  showLightbox(newIndex);
};

