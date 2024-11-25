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


function openNav() {
  document.getElementById("mySidenav").style.width = "200px";
  document.getElementById("main").style.marginLeft = "200px";
  document.querySelector('.hamburger').classList.add('change');
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
  document.querySelector('.hamburger').classList.remove('change');
}

function toggleNav() {
  const navWidth = document.getElementById("mySidenav").style.width;
  if (navWidth === "200px") {
      closeNav();
  } else {
      openNav();
  }
}

document.querySelectorAll('#mySidenav a').forEach(link => {
  link.addEventListener('click', () => {
    closeNav(); // Close the side nav
  });
});

const toggles = document.querySelectorAll('.faq-toggle');

toggles.forEach(toggle => {
	toggle.addEventListener('click', () => {
		toggle.parentNode.classList.toggle('active');
	});
});

// SOCIAL PANEL JS
const floating_btn = document.querySelector('.floating-btn');
const close_btn = document.querySelector('.close-btn');
const social_panel_container = document.querySelector('.social-panel-container');

floating_btn.addEventListener('click', () => {
	social_panel_container.classList.toggle('visible')
});

close_btn.addEventListener('click', () => {
	social_panel_container.classList.remove('visible')
});