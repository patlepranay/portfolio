import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./useTheme";

export const ThemeToggle = ({ className = "" }) => {
  const { isDark, openChooser } = useTheme();

  return (
    <button
      type="button"
      onClick={openChooser}
      aria-label="Choose theme"
      className={`group relative inline-flex h-9 w-9 items-center justify-center overflow-hidden border border-foreground/30 text-foreground transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground ${className}`}
    >
      <Sun
        className={`h-[18px] w-[18px] text-current transition-all duration-500 ${
          isDark
            ? "rotate-90 scale-0 opacity-0"
            : "rotate-0 scale-100 opacity-100"
        }`}
      />
      <Moon
        className={`absolute h-[18px] w-[18px] text-current transition-all duration-500 ${
          isDark
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-0 opacity-0"
        }`}
      />
    </button>
  );
};
