
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Accessibility helper functions
export function srOnly(message: string) {
  return { className: "sr-only", children: message };
}

// Function to ensure proper contrast for text colors against backgrounds
export function ensureContrast(bgColor: string, lightTextColor: string = "text-white", darkTextColor: string = "text-black") {
  // This is a simplified version - in a real app you'd use a color contrast algorithm
  const lightBackgrounds = ["white", "light", "gray-100", "gray-200", "gray-300"];
  
  for (const light of lightBackgrounds) {
    if (bgColor.includes(light)) {
      return darkTextColor;
    }
  }
  
  return lightTextColor;
}

// Helper function for creating unique IDs for accessibility
export function uniqueId(prefix: string = 'id') {
  return `${prefix}-${Math.random().toString(36).substring(2, 11)}`;
}

// Manage focus trap for modals and dialogs
export function trapFocus(containerElement: HTMLElement | null) {
  if (!containerElement) return () => {};
  
  const focusableElements = containerElement.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
  
  if (firstElement) {
    firstElement.focus();
  }
  
  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    
    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  };
  
  document.addEventListener('keydown', handleTabKey);
  return () => document.removeEventListener('keydown', handleTabKey);
}
