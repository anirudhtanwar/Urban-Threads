
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { Outlet, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

export function Layout() {
  const isMobile = useIsMobile();
  const location = useLocation();
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const isHomePage = location.pathname === '/';
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Page transition animation
    setIsPageLoaded(false);
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);
  
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Playful background elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Gradient background */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-playful-purple/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-playful-blue/20 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-playful-pink/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        
        {/* Decorative elements */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div 
            key={i}
            className={cn(
              "absolute rounded-full opacity-70 animate-float",
              i % 3 === 0 ? "bg-playful-purple/30 w-8 h-8" : 
              i % 3 === 1 ? "bg-playful-pink/30 w-6 h-6" : 
              "bg-playful-blue/30 w-4 h-4",
              "blur-sm"
            )}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 5}s`
            }}
          />
        ))}
        
        {/* Sparkle icon */}
        <div className="fixed top-20 right-20 opacity-20 animate-spin-slow">
          <Sparkles className="text-playful-yellow w-12 h-12" />
        </div>
      </div>
      
      <Navbar />
      <main 
        className={cn(
          "flex-grow transition-all duration-500 ease-in-out opacity-0 relative z-10",
          isPageLoaded && "opacity-100",
          "pt-16"
        )}
        id="main-content"
      >
        {isMobile ? (
          <div className="overflow-y-auto min-h-[calc(100vh-4rem)]">
            <Outlet />
            <Footer />
          </div>
        ) : (
          <div className="h-full overflow-y-auto">
            <Outlet />
            <Footer />
          </div>
        )}
      </main>
    </div>
  );
}
