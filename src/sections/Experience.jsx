import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Seo } from "@/components/seo/Seo";
import { workExp, headings } from "@/data/constants";
import { Reveal } from "@/components/deck/reveal";

/* ------------------------------------------------------------------ */
/*  Career Log — a single "current" experience card at a time.          */
/*                                                                     */
/*  Instead of a scrolling timeline, one employer is highlighted and    */
/*  the left/right arrows (plus the 0X / 0X counter) make it obvious    */
/*  there is more to see. The card is keyed by the active index and     */
/*  re-mounted with a directional slide-in so each switch reads as a    */
/*  fresh "screen".                                                     */
/*                                                                     */
/*  Layout notes:                                                       */
/*  - The page is a full-viewport flex column. The heading is pinned in */
/*    place and only the card area below it changes, so switching cards */
/*    never re-centers and nudges the heading.                          */
/*  - The card is capped to the leftover space above the bottom pill    */
/*    (the fixed navbar). Its detail <ul> scrolls internally when a     */
/*    role has a lot of text, so the pane never runs underneath that    */
/*    pill.                                                             */
/* ------------------------------------------------------------------ */

const splitCompany = (name) => {
  const i = name.indexOf(",");
  return i === -1 ? { title: name, meta: null } : { title: name.slice(0, i), meta: name.slice(i + 1).trim() };
};

const Experience = () => {
  const total = workExp.length;
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (delta) => {
    if (total < 2) return;
    setDir(delta);
    setIdx((i) => (i + delta + total) % total);
  };

  const active = workExp[idx];
  const { title: company, meta: location } = splitCompany(active.companyName);

  // Tracks whether the card's detail list has more content below the fold,
  // so we can show a "scroll for more" arrow at the card's bottom edge.
  const listRef = useRef(null);
  const [canScrollDown, setCanScrollDown] = useState(false);

  const checkScroll = useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    setCanScrollDown(el.scrollHeight - el.scrollTop - el.clientHeight > 12);
  }, []);

  useEffect(() => {
    // Re-evaluate whenever the card content changes (keyed remount) or the
    // viewport resizes. The timeout gives fonts/layout a beat to settle.
    checkScroll();
    const t = setTimeout(checkScroll, 250);
    return () => clearTimeout(t);
  }, [idx, dir, total, checkScroll]);

  useEffect(() => {
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [checkScroll]);

  const scrollMore = () => {
    listRef.current?.scrollBy({ top: 140, behavior: "smooth" });
  };

  return (
    <section id="experience" className="pg-exp relative flex h-dvh flex-col overflow-hidden py-24 font-body sm:py-28">
      {/* ambient hue glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-44 bottom-0 h-[48vh] w-[44vw] rounded-full opacity-70 blur-[140px]"
        style={{ background: "radial-gradient(circle, hsl(var(--pg-hue) / 0.2), transparent 70%)" }}
      />
      <Seo id="experience" />
      <div className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col px-5 sm:px-8">
        <SectionHeading
          index={headings.experience.index}
          align="right"
          eyebrow={headings.experience.eyebrow}
          title={headings.experience.title}
        />
        <Reveal className="relative flex min-h-0 flex-1 flex-col justify-center sm:mt-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-10 -top-8 bottom-0"

          />

          <div
            key={`${idx}-${dir}-${active.date}`}
            className={`glass-exp relative flex min-h-0 max-h-full flex-col overflow-hidden py-6 pl-6 pr-4 sm:py-8 sm:pl-10 sm:pr-6 ${dir > 0 ? "animate-exp-in-right" : "animate-exp-in-left"
              }`}
          >
            {/* accent hairline across the top edge */}
            <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/60 to-transparent" />

            {/* header row — logo + role tag */}
            <div className="mt-2 flex flex-col gap-4 pr-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4 sm:pr-8">
              <div className="flex min-w-0 flex-col gap-2">
                <h3 className="font-hud text-2xl uppercase leading-[0.95] tracking-[1.2px] text-foreground sm:text-3xl">
                  {company}
                </h3>
                <div className="flex flex-col items-start justify-between text-left">
                  <p className="mt-2 flex items-center font-hud text-sm uppercase text-muted-foreground sm:text-base">
                    {active.jobTitle}
                  </p>
                  <p className="mt-2 flex items-center font-hud text-sm uppercase tracking-widest text-muted-foreground sm:text-base">
                    {location ? `${location} · ` : ""}Full-time
                  </p>
                </div>
              </div>
              <div className="flex w-full flex-row items-center justify-between gap-3 sm:w-auto sm:flex-col sm:items-end sm:justify-start sm:gap-2 sm:text-right">
                <img
                  src={active.icon}
                  alt={company}
                  className="h-12 object-cover p-1.5 dark:bg-primary sm:h-14 sm:p-2"
                />
                <p className="mt-0 flex items-center font-hud text-sm uppercase tracking-widest text-muted-foreground sm:mt-2 sm:text-base">
                  {active.date}
                </p>
              </div>
            </div>

            {/* detail bullets — the only part that grows; scrolls when long */}
            <div className="relative mt-6 min-h-0 flex-1 border-t border-border pt-6">
              <ul
                ref={listRef}
                onScroll={checkScroll}
                className="h-full space-y-3 overflow-y-auto pr-2 exp-scroll"
              >
                {active.details.map((point, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{point.trim()}</span>
                  </li>
                ))}
              </ul>

              {/* fade + bottom-centre arrow when there is more below the fold */}
              {canScrollDown && (
                <>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/10 to-transparent" />
                  <button
                    type="button"
                    onClick={scrollMore}
                    aria-label="Show more details"
                    className="absolute bottom-2 left-1/2 -translate-x-1/2 border border-border bg-background/60 p-1.5 text-muted-foreground shadow-sm backdrop-blur transition-colors hover:border-foreground hover:text-foreground"
                  >
                    <ChevronDown className="h-4 w-4 animate-bounce" />
                  </button>
                </>
              )}
            </div>

            {/* mobile footer control — pinned below the scrolling bullets */}
            {total > 1 && (
              <div className="mt-6 flex shrink-0 items-center justify-center gap-6 border-t border-border pt-4 md:hidden">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous experience"
                  className="border border-border p-2 text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <span className="font-hud text-xs tracking-[0.3em] text-muted-foreground">
                  {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next experience"
                  className="border border-border p-2 text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>

          {/* side arrows — desktop only ("there is more") */}
          {total > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous experience"
                className="absolute top-1/2 -left-4 hidden -translate-y-1/2 border border-border bg-card/70 p-2.5 text-muted-foreground shadow-sm backdrop-blur transition-colors hover:border-foreground hover:text-foreground md:block"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next experience"
                className="absolute top-1/2 -right-4 hidden -translate-y-1/2 border border-border bg-card/70 p-2.5 text-muted-foreground shadow-sm backdrop-blur transition-colors hover:border-foreground hover:text-foreground md:block"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </Reveal>

      </div>
    </section>
  );
};

export default Experience;
