const navLinks = document.querySelectorAll('.nav ul li a');

const mainPic = document.getElementById('main-pic');
const showVid = document.getElementById("showVideoBtn");
const videoContainer = document.getElementById("videoContainer")

navLinks.forEach((link, index) => {
  link.classList.add('show');
  link.style.transitionDelay = `${index * 0.1}s`;
});


showVid.addEventListener('click', () =>  videoContainer.style.display = "block"); 

mainPic.addEventListener('click', () =>   videoContainer.style.display = "none"); 

