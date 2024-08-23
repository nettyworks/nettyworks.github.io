document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".menu");
  const hamburgerIcon = document.querySelector(".hamburger-icon");
  const contentArea = document.getElementById("content-area");
  const infoPanel = document.querySelector(".info-panel");
  function updateInfoPanelPosition() {
    if (window.innerWidth <= 1024 && document.body.classList.contains("home")) {
      const footerHeight = document.querySelector(".footer").offsetHeight;
      infoPanel.style.bottom = `${footerHeight}px`;
      infoPanel.style.maxHeight = "40vh";
    } else {
      infoPanel.style.bottom = "";
      infoPanel.style.maxHeight = "";
    }
  }
  function loadContent(url) {
    fetch(url)
      .then((response) => response.text())
      .then((html) => {
        contentArea.innerHTML = html;
        contentArea.querySelectorAll("img").forEach((img) => {
          const src = img.getAttribute("src");
          if (src && !src.startsWith("/")) {
            img.src = `/tb-dev/work/${src}`;
          }
        });
        const isHome = url.includes("landed.html");
        document.body.classList.toggle("home", isHome);
        document.body.classList.toggle("work", !isHome);
        updateInfoPanelPosition();
        // Add event listeners to all images to update layout after they load
        contentArea.querySelectorAll("img").forEach((img) => {
          img.addEventListener("load", updateInfoPanelPosition);
        });
      });
  }
  document.querySelector("#home-link").addEventListener("click", (e) => {
    e.preventDefault();
    loadContent("work/landed.html");
  });
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      loadContent(link.getAttribute("href"));
      if (window.innerWidth <= 1024) {
        menu.classList.remove("active");
      }
    });
  });
  hamburgerIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("active");
  });
  document.addEventListener("click", (event) => {
    if (!menu.contains(event.target) && event.target !== hamburgerIcon) {
      menu.classList.remove("active");
    }
  });
  window.addEventListener("resize", updateInfoPanelPosition);
  loadContent("work/landed.html");
  updateInfoPanelPosition();
});
