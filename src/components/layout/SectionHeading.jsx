import React from "react";
import { Reveal } from "@/components/deck/reveal";

/**
 * Section heading — big Syne title + Anta eyebrow/index.
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
      : align === "right"
        ? "items-end text-right ml-auto"
        : "items-start text-left";

  return (
    <Reveal
      index={revealIndex}
      className={`flex flex-col ${alignCls} `}
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
      {/* Each section page has exactly one heading — it is that page's <h1>. */}
      <Reveal
        as="h1"
        index={1}
        className="font-display font-extrabold uppercase leading-[0.82] tracking-[-0.02em] text-foreground text-xl sm:text-6xl md:text-7xl lg:text-7xl"
      >
        {title.split(" ")[0]}
        <br />
        <span className="text-transparent" style={{ WebkitTextStroke: "1px hsl(var(--foreground))" }}>
          {title.split(" ")[1]}
        </span>
      </Reveal>
    </Reveal>
  );
};
