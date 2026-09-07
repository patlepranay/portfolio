import React from "react";
import { Reveal } from "@/components/deck/reveal";

/**
 * Section heading — big Syne title + Share Tech Mono eyebrow/index.
 * Numbers + eyebrow feel like a product-launch / three.js-style HUD.
 *
 * It participates in the page's accelerating cascade via <Reveal>; pass
 * `revealIndex` so subsequent blocks on the page can follow it.
 */
export const SectionHeading = ({
  eyebrow,
  title,
  align = "left",
  index,
  revealIndex = 0,
}) => {
  const alignCls =
    align === "center"
      ? "items-center text-center mx-auto"
      : "items-start text-left";

  return (
    <Reveal
      index={revealIndex}
      className={`flex flex-col ${alignCls} mb-14`}
    >
      <div className="mb-4 flex items-center gap-3 font-hud text-xs uppercase tracking-[0.3em] text-foreground sm:text-sm">
        {index && (
          <span className="border border-foreground/30 px-2 py-0.5 text-foreground/70">
            {index}
          </span>
        )}
        <span className="text-muted-foreground">{eyebrow}</span>
        <span className="h-px w-16 bg-border" />
      </div>
      <h2 className="max-w-3xl font-display text-4xl font-bold leading-[0.95] tracking-tight text-foreground sm:text-6xl md:text-7xl">
        {title}
      </h2>
    </Reveal>
  );
};
