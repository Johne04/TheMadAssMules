const navLinks = document.querySelectorAll(".nav ul li a");

const mainPic = document.getElementById("main-pic");
const showVid = document.getElementById("showVideoBtn");
const videoContainer = document.getElementById("videoContainer");

const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

navLinks.forEach((link, index) => {
  link.classList.add("show");
  link.style.transitionDelay = `${index * 0.1}s`;
});

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
const navToggle = document.querySelector(
  '[aria-controls="primary-navigation"]'
);

navToggle?.addEventListener("click", () => {
  const navOpened = navToggle.getAttribute("aria-expanded");

  if (navOpened === "false") {
    navToggle.setAttribute("aria-expanded", true);
  } else {
    navToggle.setAttribute("aria-expanded", false);
  }
});

const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});

// Show button when scrolling down
window.onscroll = function() {
  const button = document.getElementById("backToTop");
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      button.classList.add("show");
  } else {
      button.classList.remove("show");
  }
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

const scrollToTopBtn = document.getElementById('scrollToTopBtn');
let isScrolling;

window.addEventListener('scroll', () => {
    scrollToTopBtn.classList.add('show');

    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
        scrollToTopBtn.classList.add('hide');
    }, 1000);

    scrollToTopBtn.classList.remove('hide');
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});






