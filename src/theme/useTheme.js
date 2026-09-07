import { useThemeContext } from "./ThemeContext";

/**
 * Lightweight accessor for the active theme. Returns `{ theme, setTheme, toggleTheme }`
 * where `theme` is `"light"` | `"dark"`.
 */
export const useTheme = () => useThemeContext();
