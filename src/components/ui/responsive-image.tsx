import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  aspectRatio?: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function ResponsiveImage({
  src,
  alt,
  aspectRatio = "aspect-square",
  className,
  width,
  height,
  priority = false,
  ...props
}: ResponsiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  
  // Reset error state when src changes
  useEffect(() => {
    setHasError(false);
    setIsLoaded(false);
  }, [src]);
  
  // Handle intersection observer for lazy loading
  useEffect(() => {
    if (!priority && imageRef.current && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              observer.unobserve(img);
            }
          }
        });
      }, {
        rootMargin: '200px 0px', // Start loading 200px before it comes into view
      });
      
      observer.observe(imageRef.current);
      
      return () => {
        if (imageRef.current) {
          observer.unobserve(imageRef.current);
        }
      };
    }
    // For priority images, no need for lazy loading
  }, [priority]);
  
  // Choose appropriate fallback image based on the context of alt text
  const getFallbackImage = () => {
    const altText = alt.toLowerCase();
    
    if (altText.includes('fashion') || altText.includes('clothing') || altText.includes('outfit')) {
      return "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
    } else if (altText.includes('collection') || altText.includes('store') || altText.includes('shop')) {
      return "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
    } else if (altText.includes('person') || altText.includes('team') || altText.includes('profile')) {
      return "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
    } else if (altText.includes('sustainable') || altText.includes('environment')) {
      return "https://images.unsplash.com/photo-1536939459926-301728717817?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
    } else {
      return "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
    }
  };
  
  return (
    <div 
      className={cn(
        aspectRatio === "aspect-none" ? "" : aspectRatio,
        'relative overflow-hidden bg-gray-100 dark:bg-gray-800',
        className
      )}
    >
      <img
        ref={imageRef}
        src={priority ? src : undefined}
        data-src={!priority ? src : undefined}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={cn(
          aspectRatio === "aspect-none" ? "w-full h-full" : "object-cover w-full h-full",
          !isLoaded && !priority && 'opacity-0',
          isLoaded && 'opacity-100',
          'transition-opacity duration-300'
        )}
        {...props}
      />
      
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
      )}
      
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm">
          <img 
            src={getFallbackImage()}
            alt="Placeholder"
            className="object-cover w-full h-full"
          />
        </div>
      )}
    </div>
  );
}
