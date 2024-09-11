document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".menu");
  const hamburgerIcon = document.querySelector(".hamburger-icon");
  const contentArea = document.getElementById("content-area");
  const contentWrapper = document.querySelector(".content-wrapper");

  function updateLayout() {
    const headerHeight = document.querySelector(".header").offsetHeight;
    const footerHeight = document.querySelector(".footer").offsetHeight;
    contentWrapper.style.height = `calc(100vh - ${
      headerHeight + footerHeight
    }px)`;

    if (window.innerWidth <= 860) {
      menu.style.top = `${headerHeight}px`;
      menu.style.bottom = `${footerHeight}px`;
    } else {
      menu.style.top = "";
      menu.style.bottom = "";
    }
  }

  function loadContent(url) {
    const baseUrl = "/tb-dev/";
    const fullUrl = url.startsWith("/") ? url : `${baseUrl}${url}`;
    console.log("Attempting to load content from:", fullUrl);
    fetch(fullUrl)
      .then((response) => {
        console.log("Response status:", response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((html) => {
        console.log("Content loaded successfully. Length:", html.length);
        const contentArea = document.getElementById("content-area");
        contentArea.innerHTML = html;
        // Update image sources
        contentArea.querySelectorAll("img").forEach((img) => {
          const src = img.getAttribute("src");
          console.log("Original image src:", src);
          if (src) {
            if (src.startsWith("http://") || src.startsWith("https://")) {
              img.src = src;
            } else if (src.startsWith("/")) {
              img.src = src;
            } else {
              img.src = `${baseUrl}work/${src}`;
            }
            console.log("Updated image src:", img.src);
          }
          img.onload = () => {
            console.log("Image loaded successfully:", img.src);
            updateLayout(); // Call updateLayout after each image loads
          };
          img.onerror = () => console.error("Failed to load image:", img.src);
        });
        const isHome = url.includes("landed.html");
        document.body.classList.toggle("home", isHome);
        document.body.classList.toggle("work", !isHome);
        console.log("Body classes:", document.body.classList.toString());
        updateLayout();
      })
      .catch((error) => {
        console.error("Error loading content:", error);
        document.getElementById(
          "content-area"
        ).innerHTML = `<p>Error loading content. Please try again later.</p>`;
      });
  }

  function loadHeroImage() {
    loadContent("work/landed.html");
  }

  // Load hero image on initial page load
  loadHeroImage();

  document.querySelector("#home-link").addEventListener("click", (e) => {
    e.preventDefault();
    loadHeroImage();
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");

      if (
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:")
      ) {
        // For external links and mailto links, allow default behavior
        return;
      }

      e.preventDefault();
      loadContent(href);
      if (window.innerWidth <= 860) {
        menu.classList.remove("active");
      }
    });
  });

  hamburgerIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("active");
  });

  document.addEventListener("click", (event) => {
    if (
      window.innerWidth <= 860 &&
      !menu.contains(event.target) &&
      event.target !== hamburgerIcon
    ) {
      menu.classList.remove("active");
    }
  });

  window.addEventListener("resize", updateLayout);
  updateLayout();
});
