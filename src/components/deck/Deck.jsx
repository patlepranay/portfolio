import React, { useCallback, useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useDeck } from "./deck-context";

/* ------------------------------------------------------------------ */
/*  Full-screen page shell (one route per page).                        */
/*                                                                      */
/*  Each route renders a single full-viewport page. Navigating powers    */
/*  the current page down (letters switch off one by one), swaps the      */
/*  route's <Outlet/>, then powers the new page up. (Directional sliding  */
/*  was intentionally dropped in favour of the light-switch effect.)      */
/*                                                                      */
/*  When a page holds more content than one viewport, ↑/↓ arrows reveal   */
/*  the rest of that page; at the page's end, wheel/arrows step to the    */
/*  neighbouring route.                                                  */
/* ------------------------------------------------------------------ */

const PAGE_STEP = 0.92; // fraction of the frame scrolled per arrow/wheel press

export const Deck = () => {
  const { power, goNext, goPrev } = useDeck();
  const location = useLocation();
  const frameRef = useRef(null);
  const [canDown, setCanDown] = useState(false);
  const [canUp, setCanUp] = useState(false);

  const measure = useCallback(() => {
    const el = frameRef.current;
    if (!el) return;
    setCanDown(el.scrollHeight - el.scrollTop - el.clientHeight > 4);
    setCanUp(el.scrollTop > 4);
  }, []);

  // Re-measure when the route's content changes or the frame resizes/scrolls.
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
  }, [measure, location.pathname]);

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

  // Wheel only reveals this page's remaining content — it never steps routes.
  // Switching sections is reserved for explicit controls (navbar / the on-page
  // chevrons when a section overflows its viewport).
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const onWheel = (e) => {
      const frame = el;
      const down = frame.scrollHeight - frame.scrollTop - frame.clientHeight > 4;
      const up = frame.scrollTop > 4;
      if (e.deltaY > 0) {
        if (down) {
          e.preventDefault();
          frame.scrollBy({ top: frame.clientHeight * PAGE_STEP, behavior: "smooth" });
        }
      } else if (e.deltaY < 0) {
        if (up) {
          e.preventDefault();
          frame.scrollBy({ top: -frame.clientHeight * PAGE_STEP, behavior: "smooth" });
        }
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [location.pathname]);

  return (
    <div className={`deck-page w-full ${power ? "" : "power-off"}`}>
      <div
        ref={frameRef}
        className="deck-frame fx-stage no-scrollbar"
        style={{ touchAction: "pan-x" }}
      >
        <Outlet />
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
