const navLinks = document.querySelectorAll(".nav ul li a");
// const mainPic = document.getElementById("main-pic");
// const videoContainer = document.getElementById("videoContainer");

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

  if (sidenav.style.width === "250px") {
    sidenav.style.width = "0";
    hamburger.classList.remove("change");
  } else {
    sidenav.style.width = "250px";
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