import React from "react";
import { useLocation } from "react-router-dom";
import { ThemeToggle } from "@/theme/ThemeToggle";
import { useDeck } from "@/components/deck/deck-context";
import { navItems, resumeUrl } from "@/data/constants";

/**
 * Floating bottom pill. Sits centered above the fold line (bottom-4), always
 * visible, glass; horizontal-scrolls on very small screens so links never wrap.
 *
 * Each link routes to its own page via the deck's power swap: the current page
 * powers down (letters blink off), the route changes, then the new page powers
 * up. Active state follows the URL.
 */
export const Navbar = () => {
  const { go } = useDeck();
  const { pathname } = useLocation();

  return (
    <header className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-3 sm:bottom-5">
      <nav className="pointer-events-auto glass-strong flex max-w-[calc(100vw-1.5rem)] items-center gap-0.5 rounded-full py-1.5 pl-1.5 pr-1.5 shadow-xl shadow-black/5 sm:gap-1">
        <a
          href="/"
          aria-label="Pranay Patle — back to home"
          onClick={(e) => {
            e.preventDefault();
            go("/");
          }}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-foreground/30 font-display text-xs font-extrabold uppercase text-foreground transition-colors hover:bg-foreground hover:text-background sm:h-9 sm:w-9"
        >
          PP
        </a>

        <div className="flex items-center gap-0.5 overflow-x-auto no-scrollbar">
          {navItems.map((l) => {
            const isActive = pathname === l.path;
            return (
              <a
                key={l.id}
                href={l.path}
                aria-current={isActive ? "true" : undefined}
                onClick={(e) => {
                  // Only the "power" swap drives navigation (no default jump).
                  e.preventDefault();
                  go(l.path);
                }}
                className={`shrink-0 rounded-full px-2.5 py-1.5 font-hud text-[11px] uppercase tracking-widest transition-colors sm:px-3.5 sm:text-xs ${
                  isActive
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
              </a>
            );
          })}
        </div>

        <span className="mx-1 hidden h-5 w-px shrink-0 bg-border sm:block" />

        <a
          href={resumeUrl}
          target="_blank"
          rel="noreferrer"
          className="hidden shrink-0 rounded-full px-3.5 py-1.5 font-hud text-xs uppercase tracking-widest text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline md:block"
        >
          Résumé ↗
        </a>

        <div className="shrink-0">
          <ThemeToggle className="!h-8 !w-8 rounded-full sm:!h-9 sm:!w-9" />
        </div>
      </nav>
    </header>
  );
};
