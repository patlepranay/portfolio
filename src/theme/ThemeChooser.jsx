import React, { useEffect, useRef } from "react";
import { useTheme } from "./useTheme";
import { THEME_OPTIONS } from "./ThemeContext";

/**
 * Palette chooser, opened from the navbar's theme button (never on landing).
 * Rendered only after hydration, so the prerendered HTML that crawlers read
 * never contains the overlay.
 */
export const ThemeChooser = () => {
  const { chooserOpen, chooseTheme, closeChooser } = useTheme();
  const firstRef = useRef(null);

  useEffect(() => {
    if (!chooserOpen) return;
    firstRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") closeChooser();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [chooserOpen, closeChooser]);

  if (!chooserOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="theme-chooser-title"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-md"
    >
      <div className="glass-strong w-full max-w-lg rounded-2xl p-6 sm:p-8">
        <p className="font-hud text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          <span className="text-foreground">/</span> theme
        </p>
        <h2
          id="theme-chooser-title"
          className="mt-2 font-display text-2xl font-extrabold uppercase leading-none text-foreground sm:text-3xl"
        >
          Pick your palette
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Choose how the site looks. You can come back to this anytime from the
          theme button in the navbar.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {THEME_OPTIONS.map((opt, i) => (
            <button
              key={opt.id}
              ref={i === 0 ? firstRef : undefined}
              type="button"
              onClick={() => chooseTheme(opt.id)}
              className="group rounded-xl border border-border bg-background/40 p-3 text-left transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="flex gap-1.5" aria-hidden="true">
                {opt.preview ? (
                  opt.preview.map((c) => (
                    <span
                      key={c}
                      className="h-7 w-7 rounded-full border border-black/20"
                      style={{ background: c }}
                    />
                  ))
                ) : (
                  <span
                    className="h-7 w-7 rounded-full border border-black/20"
                    style={{
                      background:
                        "conic-gradient(from 0deg, #ff4d6d, #ffd166, #4cc9f0, #8b5cf6, #ff4d6d)",
                    }}
                  />
                )}
              </span>
              <span className="mt-3 block font-hud text-xs uppercase tracking-widest text-foreground">
                {opt.label}
              </span>
              <span className="mt-0.5 block text-[11px] leading-snug text-muted-foreground">
                {opt.hint}
              </span>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={closeChooser}
          className="mt-5 font-hud text-[11px] uppercase tracking-widest text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          Keep current
        </button>
      </div>
    </div>
  );
};
