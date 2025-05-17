
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setIsChanging(true);
    setTimeout(() => {
      setTheme(theme === "light" ? "dark" : "light");
      setTimeout(() => {
        setIsChanging(false);
      }, 300);
    }, 150);
  };

  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn(
        "rounded-full relative overflow-hidden group",
        isChanging && "animate-pop"
      )}
      aria-label="Toggle theme"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-transparent dark:from-playful-purple/20 dark:to-playful-blue/20 opacity-0 dark:opacity-100 transition-opacity duration-500"></div>
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0 text-playful-orange" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100 text-playful-blue" />
      
      {/* Add playful stars that appear in dark mode */}
      <div className="absolute inset-0 pointer-events-none opacity-0 dark:opacity-100">
        {[...Array(5)].map((_, i) => (
          <span 
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: `${2 + Math.random() * 2}px`,
              height: `${2 + Math.random() * 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0,
              transform: 'scale(0)',
              animation: `twinkling ${1 + Math.random() * 2}s infinite ${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      <style>
        {`
          @keyframes twinkling {
            0% { opacity: 0; transform: scale(0); }
            50% { opacity: 1; transform: scale(1); }
            100% { opacity: 0; transform: scale(0); }
          }
        `}
      </style>
    </Button>
  );
}
