import { create } from "zustand";

export const useThemeStore = create((set) => {
  // Get saved theme or default to 'dark'
  const savedTheme = localStorage.getItem("theme") || "dark";

  // Set initial attribute on load (important!)
  if (typeof window !== "undefined") {
    document.documentElement.setAttribute("data-theme", savedTheme);
  }

  return {
    theme: savedTheme,
    
    setTheme: (newTheme) => {
      localStorage.setItem("theme", newTheme); // Save to localStorage
      document.documentElement.setAttribute("data-theme", newTheme); // Set attribute
      set({ theme: newTheme }); // Update Zustand state
    },
  };
});
