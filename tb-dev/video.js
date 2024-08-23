document.addEventListener("DOMContentLoaded", function () {
  var video = document.getElementById("myVideo");
  var resetLink = document.getElementById("reset-link");

  // Remove unwanted control options
  video.disablePictureInPicture = true;
  video.controlsList.remove("download");

  // Ensure video pauses when navigating away
  window.addEventListener("beforeunload", function () {
    if (!video.paused) {
      video.pause();
    }
  });

  // Handle reset link
  resetLink.addEventListener("click", function (event) {
    event.preventDefault();
    if (window.parent && window.parent.document) {
      var parentFrame = window.parent.document.getElementById("content-frame");
      var parentMenu = window.parent.document.querySelector(".menu");
      if (parentFrame) {
        parentFrame.src = "";
      }
      if (parentMenu) {
        parentMenu.style.display = "block";
      }
    }
  });

  // Optional: Log video events for debugging
  ["loadedmetadata", "play", "pause", "ended"].forEach(function (eventName) {
    video.addEventListener(eventName, function () {
      console.log("Video event:", eventName);
    });
  });
});
