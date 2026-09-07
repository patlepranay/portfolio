import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useDeck } from "./deck-context";

/* ------------------------------------------------------------------ */
/*  Full-screen page deck.                                             */
/*                                                                     */
/*  Each section is a full-viewport page. Navigation powers the current */
/*  page down (letters switch off one by one), swaps the page, then     */
/*  powers the new page up. (Directional sliding was intentionally       */
/*  dropped in favour of the light-switch effect.)                       */
/*                                                                     */
/*  When a page holds more content than one viewport, ↑/↓ arrows reveal  */
/*  the rest of that page; at the page's end, wheel/arrows step to the   */
/*  neighbouring section.                                               */
/* ------------------------------------------------------------------ */

const PAGE_STEP = 0.92; // fraction of the frame scrolled per arrow/wheel press

export const Deck = ({ pages }) => {
  const { index, power, goNext, goPrev, total } = useDeck();
  const frameRef = useRef(null);
  const [canDown, setCanDown] = useState(false);
  const [canUp, setCanUp] = useState(false);
  const safeIndex = Math.max(0, Math.min(index, total - 1));

  const measure = useCallback(() => {
    const el = frameRef.current;
    if (!el) return;
    setCanDown(el.scrollHeight - el.scrollTop - el.clientHeight > 4);
    setCanUp(el.scrollTop > 4);
  }, []);

  // Re-measure when the page changes or the frame resizes/scrolls.
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    el.addEventListener("scroll", measure, { passive: true });
    const t = setTimeout(measure, 80); // fonts/letters settle
    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", measure);
      clearTimeout(t);
    };
  }, [measure, index]);

  const step = useCallback(
    (dir) => {
      const el = frameRef.current;
      if (!el) return;
      if (dir > 0) {
        if (canDown) el.scrollBy({ top: el.clientHeight * PAGE_STEP, behavior: "smooth" });
        else goNext();
      } else {
        if (canUp) el.scrollBy({ top: -el.clientHeight * PAGE_STEP, behavior: "smooth" });
        else goPrev();
      }
    },
    [canDown, canUp, goNext, goPrev]
  );

  // Wheel = reveal this page's remaining content, or step sections at edges.
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const onWheel = (e) => {
      const frame = el;
      const down = frame.scrollHeight - frame.scrollTop - frame.clientHeight > 4;
      const up = frame.scrollTop > 4;
      if (e.deltaY > 0) {
        e.preventDefault();
        if (down) frame.scrollBy({ top: frame.clientHeight * PAGE_STEP, behavior: "smooth" });
        else goNext();
      } else if (e.deltaY < 0) {
        e.preventDefault();
        if (up) frame.scrollBy({ top: -frame.clientHeight * PAGE_STEP, behavior: "smooth" });
        else goPrev();
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [index, goNext, goPrev]);

  return (
    <div className={`deck-page w-full ${power ? "" : "power-off"}`}>
      <div
        ref={frameRef}
        className="deck-frame fx-stage no-scrollbar"
        style={{ touchAction: "pan-x" }}
      >
        {pages[safeIndex]}
      </div>

      {/* Reveal remaining content within a full section. */}
      {power && (
        <div className="pointer-events-none absolute right-3 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-2 sm:right-5">
          {canUp && (
            <button
              type="button"
              aria-label="Scroll up within this section"
              onClick={() => step(-1)}
              className="pointer-events-auto grid h-10 w-10 place-items-center rounded-full glass-strong text-foreground transition-colors hover:text-primary"
            >
              <ChevronUp className="h-5 w-5" />
            </button>
          )}
          {canDown && (
            <button
              type="button"
              aria-label="Scroll down within this section"
              onClick={() => step(1)}
              className="pointer-events-auto grid h-10 w-10 place-items-center rounded-full glass-strong text-foreground transition-colors hover:text-primary"
            >
              <ChevronDown className="h-5 w-5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
