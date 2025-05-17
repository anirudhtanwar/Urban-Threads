
import { useState, useEffect, useCallback } from "react";
import { CarouselApi } from "@/components/ui/carousel";

interface UseCarouselOptions {
  autoplay?: boolean;
  delay?: number;
  pauseOnHover?: boolean;
}

export function useCarousel(options: UseCarouselOptions = {}) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [paused, setPaused] = useState(false);

  const { 
    autoplay = false, 
    delay = 5000, 
    pauseOnHover = true 
  } = options;

  useEffect(() => {
    if (!api) return;

    try {
      // Add safety check for undefined scrollSnapList
      const snapList = api.scrollSnapList();
      if (snapList) {
        setCount(snapList.length);
      }
      
      setCurrent(api.selectedScrollSnap() || 0);

      api.on("select", () => {
        setCurrent(api.selectedScrollSnap() || 0);
      });
    } catch (error) {
      console.error("Error in carousel API:", error);
    }
  }, [api]);

  // Autoplay functionality with built-in loop support
  useEffect(() => {
    if (!api || !autoplay || paused) return;

    const timer = setInterval(() => {
      try {
        api.scrollNext();
      } catch (error) {
        console.error("Error in carousel scrollNext:", error);
      }
    }, delay);

    return () => clearInterval(timer);
  }, [api, autoplay, delay, paused]);

  // Mouse enter/leave handlers for pauseOnHover
  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) {
      setPaused(true);
    }
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) {
      setPaused(false);
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (!api || !pauseOnHover) return;

    try {
      const element = api.rootNode();
      if (!element) return; // Safety check for undefined rootNode

      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      };
    } catch (error) {
      console.error("Error setting carousel event listeners:", error);
    }
  }, [api, pauseOnHover, handleMouseEnter, handleMouseLeave]);

  return {
    api,
    setApi,
    current,
    count,
  };
}
