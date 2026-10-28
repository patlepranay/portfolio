import { useThemeContext } from "./ThemeContext";

/**
 * Lightweight accessor for the active palette. Returns
 * `{ theme, isDark, chooserOpen, chooseTheme, closeChooser, openChooser }`
 * where `theme` is `{ id: "white" | "dark" | "brand" | "random", ... }`.
 */
export const useTheme = () => useThemeContext();
