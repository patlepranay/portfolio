import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const ThemeContext = createContext(undefined);
const PALETTE_KEY = "portfolio-palette";

/** Options shown in the first-visit chooser. */
export const THEME_OPTIONS = [
  {
    id: "white",
    label: "White",
    hint: "Clean monochrome light",
    preview: ["#f0f0f0", "#ffffff", "#0a0a0a"],
  },
  {
    id: "dark",
    label: "Dark",
    hint: "Monochrome midnight",
    preview: ["#0b0b0d", "#1a1a1d", "#f5f5f5"],
  },
  {
    id: "brand",
    label: "Cobalt Lime",
    hint: "Midnight, cobalt & acid lime",
    preview: ["#030407", "#1558c9", "#d4ff24"],
  },
  {
    id: "random",
    label: "Random",
    hint: "Three colors, rolled fresh",
    preview: null,
  },
];

const DEFAULT_THEME = { id: "dark" };
const VALID_IDS = ["white", "dark", "brand", "random"];

/* Vars a random palette writes inline on <html>. */
const INLINE_VARS = [
  "--background",
  "--foreground",
  "--card",
  "--card-foreground",
  "--muted",
  "--muted-foreground",
  "--border",
  "--input",
  "--ring",
  "--primary",
  "--primary-foreground",
  "--secondary",
  "--secondary-foreground",
  "--accent",
  "--accent-foreground",
];

/* --- random palette helpers --------------------------------------- */

const hslToRgb = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [f(0), f(8), f(4)].map((x) => Math.round(x * 255));
};

const luminance = ([r, g, b]) => {
  const c = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};

/* Black or white text, whichever reads better on the fill. */
const readable = (h, s, l) =>
  luminance(hslToRgb(h, s, l)) > 0.18 ? "233 43% 2%" : "0 0% 100%";

const hue = () => Math.round(Math.random() * 360);

function randomPalette() {
  const dark = Math.random() < 0.72;
  const h = hue();
  const a1 = hue();
  const a2 = (a1 + 60 + Math.round(Math.random() * 240)) % 360;
  const [pS, pL] = [82, dark ? 48 : 42];
  const [aS, aL] = [92, 60];
  const fg = `${h} ${dark ? 22 : 30}% ${dark ? 96 : 8}%`;

  return {
    id: "random",
    dark,
    vars: {
      "--background": `${h} ${dark ? 38 : 34}% ${dark ? 4 : 96}%`,
      "--foreground": fg,
      "--card": dark ? `${h} 30% 8%` : "0 0% 100%",
      "--card-foreground": fg,
      "--muted": `${h} ${dark ? 22 : 26}% ${dark ? 12 : 91}%`,
      "--muted-foreground": `${h} ${dark ? 12 : 14}% ${dark ? 65 : 42}%`,
      "--border": `${h} 22% ${dark ? 18 : 80}%`,
      "--input": `${h} 22% ${dark ? 20 : 80}%`,
      "--ring": `${a1} ${pS}% ${pL}%`,
      "--primary": `${a1} ${pS}% ${pL}%`,
      "--primary-foreground": readable(a1, pS, pL),
      "--secondary": `${h} 22% ${dark ? 14 : 92}%`,
      "--secondary-foreground": fg,
      "--accent": `${a2} ${aS}% ${aL}%`,
      "--accent-foreground": readable(a2, aS, aL),
    },
    preview: [
      `hsl(${h} ${dark ? 38 : 34}% ${dark ? 4 : 96}%)`,
      `hsl(${a1} ${pS}% ${pL}%)`,
      `hsl(${a2} ${aS}% ${aL}%)`,
    ],
  };
}

/* --- apply / persist ----------------------------------------------- */

function clearInlineVars(root) {
  INLINE_VARS.forEach((v) => root.style.removeProperty(v));
}

function applyTheme(theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.remove("dark", "brand", "palette-random");
  clearInlineVars(root);

  if (theme.id === "white") {
    root.style.colorScheme = "light";
  } else if (theme.id === "dark") {
    root.classList.add("dark");
    root.style.colorScheme = "dark";
  } else if (theme.id === "brand") {
    root.classList.add("brand", "dark");
    root.style.colorScheme = "dark";
  } else {
    if (theme.dark) root.classList.add("dark");
    root.classList.add("palette-random");
    root.style.colorScheme = theme.dark ? "dark" : "light";
    Object.entries(theme.vars || {}).forEach(([k, v]) => root.style.setProperty(k, v));
  }
}

function readStoredTheme() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PALETTE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && VALID_IDS.includes(parsed.id) ? parsed : null;
  } catch {
    return null;
  }
}

function persist(theme) {
  try {
    localStorage.setItem(PALETTE_KEY, JSON.stringify(theme));
  } catch {
    /* ignore */
  }
}

export const ThemeProvider = ({ children }) => {
  // Server and first client render use the default; storage is read after
  // hydration so the prerendered markup never depends on localStorage.
  const [theme, setThemeState] = useState(DEFAULT_THEME);
  const [chooserOpen, setChooserOpen] = useState(false);

  // The chooser is opened from the navbar theme button, never on landing.
  useEffect(() => {
    const stored = readStoredTheme();
    if (stored) setThemeState(stored);
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const chooseTheme = useCallback((id) => {
    const next = id === "random" ? randomPalette() : { id };
    setThemeState(next);
    persist(next);
    setChooserOpen(false);
  }, []);

  const closeChooser = useCallback(() => {
    persist(theme); // closing without picking keeps the current palette
    setChooserOpen(false);
  }, [theme]);

  const isDark =
    theme.id === "dark" ||
    theme.id === "brand" ||
    (theme.id === "random" && !!theme.dark);

  const value = useMemo(
    () => ({
      theme,
      isDark,
      chooserOpen,
      chooseTheme,
      closeChooser,
      openChooser: () => setChooserOpen(true),
    }),
    [theme, isDark, chooserOpen, chooseTheme, closeChooser]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const ctx = useContext(ThemeContext);
  if (ctx === undefined) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return ctx;
};
