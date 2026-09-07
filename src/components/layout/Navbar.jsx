import React from "react";
import { ThemeToggle } from "@/theme/ThemeToggle";
import { useDeck } from "@/components/deck/deck-context";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Tech", href: "#tech" },
  { label: "Work", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const RESUME_URL = "/Pranay_Patle_Resume.pdf";

/**
 * Floating bottom pill. Sits centered above the fold line (bottom-4), always
 * visible, glass; horizontal-scrolls on very small screens so links never wrap.
 *
 * Active link is driven by the deck's current page index. Clicks are ordinary
 * hash anchors — the deck's global click handler routes them to the matching
 * page, so the direction is derived automatically.
 */
export const Navbar = () => {
  const { index, order } = useDeck();
  const active = `#${order[index]}`;

  return (
    <header className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-3 sm:bottom-5">
      <nav className="pointer-events-auto glass-strong flex max-w-[calc(100vw-1.5rem)] items-center gap-0.5 rounded-full py-1.5 pl-1.5 pr-1.5 shadow-xl shadow-black/5 sm:gap-1">
        <a
          href="#home"
          aria-label="Pranay Patle — back to home"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-foreground/30 font-display text-xs font-extrabold uppercase text-foreground transition-colors hover:bg-foreground hover:text-background sm:h-9 sm:w-9"
        >
          PP
        </a>

        <div className="flex items-center gap-0.5 overflow-x-auto no-scrollbar">
          {LINKS.map((l) => {
            const isActive = active === l.href;
            return (
              <a
                key={l.href}
                href={l.href}
                aria-current={isActive ? "true" : undefined}
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
          href={RESUME_URL}
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
