const menu = document.querySelector(".menu");
const hamburgerIcon = document.querySelector(".hamburger-icon");
const contentFrame = document.getElementById("content-frame");
const floatingFrame = document.querySelector('.floating-frame');

hamburgerIcon.addEventListener("click", () => {
    menu.classList.toggle("active");
});

document.addEventListener("click", (event) => {
    if (!menu.contains(event.target) && event.target !== hamburgerIcon) {
        menu.classList.remove("active");
    }
});

menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
            menu.classList.remove("active");
        }
    });
});

function adjustIframePosition() {
    const maxWidth = 700; // Maximum width of the iframe
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const frameWidth = Math.min(windowWidth * 0.9, maxWidth);
    const frameLeft = (windowWidth - frameWidth) / 2;
    const floatingFrameHeight = floatingFrame.offsetHeight;
    const buffer = 20; // Buffer space in pixels

    // Adjust the content frame's height to not intersect with the floating frame
    const contentFrameHeight = windowHeight - floatingFrameHeight - buffer;

    contentFrame.style.width = `${frameWidth}px`;
    contentFrame.style.left = `${frameLeft}px`;
    contentFrame.style.height = `${contentFrameHeight}px`;

    if (windowWidth <= 768) {
        contentFrame.style.marginLeft = '0';
        contentFrame.style.width = '100%';
    } else {
        contentFrame.style.marginLeft = '250px';
        contentFrame.style.width = `calc(100% - 250px)`;
    }

    // Ensure the content inside the iframe doesn't overflow
    const iframeContent = contentFrame.contentDocument || contentFrame.contentWindow.document;
    if (iframeContent.body) {
        iframeContent.body.style.maxHeight = `${contentFrameHeight}px`;
        iframeContent.body.style.overflowY = 'auto';
    }
}

window.addEventListener('resize', adjustIframePosition);
window.addEventListener('load', adjustIframePosition);

window.addEventListener('message', function(event) {
    if (event.data === 'resetIframe') {
        contentFrame.src = 'about:blank';
        if (window.innerWidth <= 768) {
            menu.classList.add("active");
        }
    }
});

function adjustIframeContent() {
    const iframeContent = contentFrame.contentDocument || contentFrame.contentWindow.document;
    const images = iframeContent.querySelectorAll('.image-container img');
   
    images.forEach(img => {
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
    });
}

contentFrame.addEventListener('load', () => {
    adjustIframeContent();
    adjustIframePosition();
});

// Add class to body when JavaScript is enabled
document.body.classList.add("js-enabled");

function resizeImages() {
    const containers = document.querySelectorAll('.image-container');
    containers.forEach(container => {
        const img = container.querySelector('img');
        if (img.naturalWidth > container.clientWidth || img.naturalHeight > (window.innerHeight * 0.87)) {
            const widthScale = container.clientWidth / img.naturalWidth;
            const heightScale = (window.innerHeight * 0.87) / img.naturalHeight;
            const scale = Math.min(widthScale, heightScale);
            img.style.width = '100%';
            img.style.height = 'auto';
        }
    });
}

window.addEventListener('load', resizeImages);
window.addEventListener('resize', resizeImages);
window.addEventListener('message', function (event) {
    if (event.data === 'resizeImages') {
        resizeImages();
    }
});
