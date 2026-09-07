import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/**
 * Deck navigation context.
 *
 * The whole portfolio is a stack of full-screen "pages" (one section per
 * page). Navigation is a two-phase "power" swap:
 *
 *   1. power OFF — every character of the current page switches off one by
 *      one (like an LED sign powering down),
 *   2. swap the page, then power ON — the new page's characters switch on
 *      in the same sweeping way.
 *
 * The provider owns which page is active (`index`), whether it is lit
 * (`power`), and routes internal `#section` anchors + keyboard nav.
 *
 * Page changes always run the two-phase power swap (off then on) — the
 * signature light-bulb effect plays for every visitor.
 */

const DeckContext = createContext(undefined);

export const useDeck = () => {
  const ctx = useContext(DeckContext);
  if (!ctx) throw new Error("useDeck must be used within <DeckProvider>");
  return ctx;
};

const OFF_DURATION = 760; // ms: let the old page finish powering down

const readInitialIndex = (order) => {
  if (typeof window === "undefined") return 0;
  const id = window.location.hash.replace("#", "");
  const i = order.indexOf(id);
  return i >= 0 ? i : 0;
};

export const DeckProvider = ({ order, children }) => {
  const [index, setIndex] = useState(() => readInitialIndex(order));
  const [power, setPower] = useState(false);

  const indexRef = useRef(index);
  indexRef.current = index;
  const busyRef = useRef(false);
  const timerRef = useRef(null);
  const turnOnRef = useRef(null);

  // Power the first page on after mount (a subtle "lights on" intro).
  useEffect(() => {
    const id = setTimeout(() => setPower(true), 60);
    return () => clearTimeout(id);
  }, []);

  useEffect(
    () => () => {
      clearTimeout(timerRef.current);
      clearTimeout(turnOnRef.current);
    },
    []
  );

  const commit = useCallback(
    (next) => {
      if (busyRef.current || next === indexRef.current) return;
      busyRef.current = true;

      setPower(false); // old page powers down
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setIndex(next); // mount new page dark (power still false)
        // Wait a beat so the browser paints the dark page, then power it up.
        // Characters therefore sweep 0→1. A timeout (not rAF) keeps this from
        // ever stalling when frames are throttled.
        turnOnRef.current = setTimeout(() => {
          setPower(true); // new page powers up
          busyRef.current = false;
        }, 60);
      }, OFF_DURATION);
    },
    []
  );

  const goTo = useCallback(
    (target) => {
      let next;
      if (typeof target === "number") next = target;
      else next = order.indexOf(target);
      if (next < 0) next = 0;
      commit(next);
    },
    [order, commit]
  );

  const goNext = useCallback(
    () => goTo(Math.min(indexRef.current + 1, order.length - 1)),
    [goTo, order.length]
  );
  const goPrev = useCallback(() => goTo(Math.max(indexRef.current - 1, 0)), [goTo]);

  // Intercept internal hash anchors → treat as page navigation.
  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented) return;
      const a = e.target && e.target.closest ? e.target.closest('a[href^="#"]') : null;
      if (!a) return;
      const id = a.getAttribute("href").slice(1);
      if (!order.includes(id)) return;
      e.preventDefault();
      goTo(id);
      try {
        history.replaceState(null, "", `#${id}`);
      } catch {
        /* noop */
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [order, goTo]);

  // Keyboard navigation (ignored while typing in a field / contenteditable).
  useEffect(() => {
    const onKey = (e) => {
      const t = e.target;
      if (
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.tagName === "SELECT" ||
          t.isContentEditable)
      ) {
        return;
      }
      switch (e.key) {
        case "ArrowRight":
        case "PageDown":
          e.preventDefault();
          goNext();
          break;
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          goPrev();
          break;
        case "Home":
          e.preventDefault();
          goTo(0);
          break;
        case "End":
          e.preventDefault();
          goTo(order.length - 1);
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev, goTo, order.length]);

  const value = useMemo(
    () => ({ index, power, goTo, goNext, goPrev, total: order.length, order }),
    [index, power, goTo, goNext, goPrev, order]
  );

  return <DeckContext.Provider value={value}>{children}</DeckContext.Provider>;
};
