import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { navItems } from "@/data/constants";

/**
 * Deck navigation context.
 *
 * The portfolio is a stack of full-screen "pages", each now its own route.
 * Navigating is a two-phase "power" swap:
 *
 *   1. power OFF — every character of the current page switches off one by
 *      one (like an LED sign powering down),
 *   2. navigate to the new route, then power ON — the new page's characters
 *      switch on in the same sweeping way.
 *
 * The provider owns whether the active page is lit (`power`) and converts a
 * target route into that off → swap → on sequence via React Router. Route
 * order + paths come from `navItems` in src/data/constants.js, so reordering
 * there changes nav + sitemap together.
 *
 * Page changes always run the two-phase power swap (off then on) — the
 * signature light-bulb effect plays for every visitor. Motion is forced:
 * there is deliberately no `prefers-reduced-motion` bypass.
 */

const DeckContext = createContext(undefined);

export const useDeck = () => {
  const ctx = useContext(DeckContext);
  if (!ctx) throw new Error("useDeck must be used within <PowerProvider>");
  return ctx;
};

const OFF_DURATION = 760; // ms: let the old page finish powering down

export const PowerProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Pages start LIT so the static/SSR markup shows visible text for crawlers
  // and no-JS readers. The off→on sweep still plays on every *navigation*.
  const [power, setPower] = useState(true);

  const pathRef = useRef(location.pathname);
  pathRef.current = location.pathname;
  const busyRef = useRef(false);
  const timerRef = useRef(null);
  const turnOnRef = useRef(null);

  const order = useMemo(() => navItems.map((n) => n.path), []);
  const total = order.length;

  // Intro reveal after the first client paint. The `boot` class (added by an
  // inline script in index.html) has held the page invisible until now; drop it
  // once mounted so every character sweeps on together. Nothing was ever shown
  // to flash beforehand. (No-JS readers never got `boot`, so they see the SSR
  // text directly.)
  //
  // Deliberately no early-return guard: in dev React StrictMode runs effects
  // twice (mount → cleanup → mount). A guard + cleanup would cancel the first
  // reveal and bail on the second, leaving `boot` stuck and the page blank.
  // Removing the class is idempotent, so running it twice is harmless.
  useEffect(() => {
    const id = setTimeout(() => {
      document.documentElement.classList.remove("boot");
    }, 140);
    return () => clearTimeout(id);
  }, []);

  useEffect(
    () => () => {
      clearTimeout(timerRef.current);
      clearTimeout(turnOnRef.current);
    },
    []
  );

  const go = useCallback(
    (targetPath) => {
      if (busyRef.current || targetPath === pathRef.current) return;
      busyRef.current = true;

      setPower(false); // old page powers down
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        navigate(targetPath); // mount new page dark (power still false)
        // Wait a beat so the browser paints the dark page, then power it up.
        // Characters therefore sweep 0→1. A timeout (not rAF) keeps this from
        // ever stalling when frames are throttled.
        turnOnRef.current = setTimeout(() => {
          setPower(true); // new page powers up
          busyRef.current = false;
        }, 60);
      }, OFF_DURATION);
    },
    [navigate]
  );

  const goStep = useCallback(
    (dir) => {
      const i = order.indexOf(pathRef.current);
      const target = order[Math.max(0, Math.min(i + dir, total - 1))];
      if (target && target !== pathRef.current) go(target);
    },
    [order, total, go]
  );

  const goNext = useCallback(() => goStep(1), [goStep]);
  const goPrev = useCallback(() => goStep(-1), [goStep]);

  // No keyboard shortcut switches sections — section changes are deliberate
  // (navbar links), not driven by arrow/PageUp/PageDown/Home/End keys.

  const value = useMemo(
    () => ({ power, go, goNext, goPrev, total, order }),
    [power, go, goNext, goPrev, total, order]
  );

  return <DeckContext.Provider value={value}>{children}</DeckContext.Provider>;
};
