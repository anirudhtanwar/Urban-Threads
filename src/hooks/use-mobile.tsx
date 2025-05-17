
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(
    typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : false
  )

  React.useEffect(() => {
    // Function to check if the window width is less than the breakpoint
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Add event listener with debounce for better performance
    let timeoutId: number | undefined;
    
    const handleResize = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      timeoutId = window.setTimeout(checkMobile, 100);
    };
    
    window.addEventListener("resize", handleResize);
    
    // Initial check
    checkMobile();
    
    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    }
  }, [])

  return isMobile
}
