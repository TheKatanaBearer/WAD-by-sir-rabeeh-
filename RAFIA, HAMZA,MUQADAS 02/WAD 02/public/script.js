function lazyLoadImages() {
    const images = document.querySelectorAll("img[data-src]");
    const viewportHeight = window.innerHeight;
    const scrollPosition = window.pageYOffset;

    images.forEach(img => {
        if (img.offsetTop < viewportHeight + scrollPosition ) {
            img.src = img.dataset.src;
            img.alt = img.dataset.alt ;
            img.classList.remove('lazy');
          
            img.removeAttribute("data-src");
        }
    });
}

window.addEventListener("scroll", lazyLoadImages);
window.addEventListener("load", lazyLoadImages);
window.addEventListener("resize", lazyLoadImages);
lazyLoadImages();