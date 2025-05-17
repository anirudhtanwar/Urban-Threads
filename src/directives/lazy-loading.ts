
export const registerLazyLoading = () => {
  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    // Create a new IntersectionObserver instance
    const lazyImageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target as HTMLImageElement;
          const src = lazyImage.dataset.src;
          
          if (src) {
            lazyImage.src = src;
            lazyImage.classList.remove('lazy');
            lazyImageObserver.unobserve(lazyImage);
          }
        }
      });
    });

    // Get all lazy images
    const lazyImages = document.querySelectorAll('img.lazy');
    lazyImages.forEach(lazyImage => {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // Fallback for browsers without IntersectionObserver support
    const lazyImages = document.querySelectorAll('img.lazy');
    lazyImages.forEach(img => {
      const src = (img as HTMLImageElement).dataset.src;
      if (src) {
        (img as HTMLImageElement).src = src;
      }
      img.classList.remove('lazy');
    });
  }
};
