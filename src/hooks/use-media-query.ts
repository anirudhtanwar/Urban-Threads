
import { useEffect, useState, useCallback } from "react";

export function useMediaQuery(query: string): boolean {
  const getMatches = useCallback((): boolean => {
    // Prevent SSR issues
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  }, [query]);
  
  const [matches, setMatches] = useState<boolean>(getMatches());

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    
    // Set initial value
    setMatches(mediaQuery.matches);

    // Define a listener for changes
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    
    // Add event listener
    mediaQuery.addEventListener("change", handler);
    
    // Clean up
    return () => {
      mediaQuery.removeEventListener("change", handler);
    };
  }, [query, getMatches]);

  return matches;
}
