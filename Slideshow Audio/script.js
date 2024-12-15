function startSlideshow(slideshow) {
  const images = slideshow.querySelectorAll("img");
  let currentIndex = 0;

  // Initially hide all images except the first one
  images.forEach((img, index) => {
    if (index !== 0) {
      img.style.display = "none";
    }
  });

  function showNextImage() {
    // Hide the current image
    images[currentIndex].style.display = "none";

    // Move to the next image (or back to the first if we're at the end)
    currentIndex = (currentIndex + 1) % images.length;

    // Show the next image
    images[currentIndex].style.display = "block";
  }

  // Change image every 3 seconds
  setInterval(showNextImage, 3000);
}

// Start a slideshow for each '.slideshow' container when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".slideshow").forEach(startSlideshow);
});
