
import React, { createContext, useContext, useState, useEffect } from "react";

interface AccessibilityOptions {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  screenReader: boolean;
}

interface AccessibilityContextType {
  enabled: boolean;
  toggleEnabled: () => void;
  options: AccessibilityOptions;
  updateOption: (option: keyof AccessibilityOptions, value: boolean) => void;
  resetOptions: () => void;
}

const defaultAccessibilityOptions: AccessibilityOptions = {
  highContrast: false,
  largeText: false,
  reducedMotion: false,
  screenReader: false,
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState<boolean>(false);
  const [options, setOptions] = useState<AccessibilityOptions>(defaultAccessibilityOptions);

  // Load settings from localStorage on initial render
  useEffect(() => {
    const savedEnabled = localStorage.getItem("accessibility-enabled");
    const savedOptions = localStorage.getItem("accessibility-options");
    
    if (savedEnabled) {
      setEnabled(JSON.parse(savedEnabled));
    }
    
    if (savedOptions) {
      setOptions(JSON.parse(savedOptions));
    }
  }, []);

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem("accessibility-enabled", JSON.stringify(enabled));
    localStorage.setItem("accessibility-options", JSON.stringify(options));
    
    // Apply accessibility styles to document
    document.documentElement.classList.toggle("a11y-enabled", enabled);
    document.documentElement.classList.toggle("a11y-high-contrast", enabled && options.highContrast);
    document.documentElement.classList.toggle("a11y-large-text", enabled && options.largeText);
    document.documentElement.classList.toggle("a11y-reduced-motion", enabled && options.reducedMotion);
    document.documentElement.classList.toggle("a11y-screen-reader", enabled && options.screenReader);
    
  }, [enabled, options]);

  const toggleEnabled = () => {
    setEnabled(!enabled);
  };

  const updateOption = (option: keyof AccessibilityOptions, value: boolean) => {
    setOptions(prev => ({ ...prev, [option]: value }));
  };

  const resetOptions = () => {
    setOptions(defaultAccessibilityOptions);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        enabled,
        toggleEnabled,
        options,
        updateOption,
        resetOptions,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider");
  }
  return context;
};
