(function () {
  function resizeCaptions() {
    const containers = document.querySelectorAll(".image-container");
    const contentBody = document.querySelector(".content-body");

    containers.forEach((container) => {
      const img = container.querySelector("img");
      const caption = container.querySelector(".image-caption");
      if (img && caption) {
        // Set the caption width to match the image width, but not exceeding the content body width
        const maxWidth = contentBody.clientWidth;
        caption.style.width = `${Math.min(img.clientWidth, maxWidth)}px`;
        caption.style.textAlign = "center";
        caption.style.display = "inline-block";
      }
    });
  }

  window.addEventListener("resize", resizeCaptions);

  // Run on document load
  document.addEventListener("DOMContentLoaded", resizeCaptions);

  // Handle images loading dynamically
  window.addEventListener("load", resizeCaptions);
})();
