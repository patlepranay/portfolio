import React, { createContext, useContext, useMemo } from "react";

/* ------------------------------------------------------------------ */
/*  Letter-by-letter "power" FX                                        */
/*                                                                     */
/*  Every text run on a page is split into per-character <span>s.       */
/*  Each span carries a CSS delay (`--d`) so, when the page's power     */
/*  toggles, characters switch off (and on) — like an LED sign losing   */
/*  its pixels. The whole-page surface (cards, icons, inputs) fades      */
/*  slightly later so nothing is left glowing after the letters die.     */
/*                                                                     */
/*  Characters switch in a RANDOM order (each has an independent delay), */
/*  not a left-to-right sweep — no line reads as a directional wave.     */
/*  Layout is preserved: spans are inline, spaces stay as real spaces,   */
/*  and opacity changes never reflow, so nothing shifts mid-transition.  */
/* ------------------------------------------------------------------ */

/* Timing knob (ms). A page's letters take this long to go out (and back
   in). Each character draws an independent random delay inside it, so the
   blink feels scattered rather than sequential. */
const CHAR_WINDOW = 600;

/* The parent block's reveal index, provided by <Reveal index={…}>. */
export const FxBaseContext = createContext(0);

export const useFxBase = () => useContext(FxBaseContext);

/** Random per-character delay (ms) within the power window. */
const charDelay = () => Math.random() * CHAR_WINDOW;

/* Host elements we must not clone or reparent. `form` is safe to clone —
   React.cloneElement preserves a host element's ref — but inputs keep user
   content and controls, images/canvas are media, void elements carry no text. */
const PROTECTED_TAGS = new Set([
  "img",
  "input",
  "textarea",
  "select",
  "option",
  "br",
  "hr",
  "svg",
  "canvas",
  "video",
]);

const WHITESPACE = /\s/;

/**
 * Recursively turns the text inside `children` into character spans.
 * Host elements are cloned (so tags/classes/handlers survive); custom
 * components are treated as opaque and left untouched (they letter-split
 * themselves by rendering through <FxSplit>, see Reveal / Works / …).
 */
const makeRun = (text, block, run, keyBase) => {
  const chars = Array.from(String(text));
  const out = [];
  let pos = 0;
  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i];
    if (WHITESPACE.test(ch)) {
      // keep real spaces so wrapping/spacing is unchanged
      out.push(" ");
    } else {
      const delay = charDelay(block, run, pos, chars.length).toFixed(1);
      out.push(
        React.createElement(
          "span",
          { key: `${keyBase}-${i}`, className: "fx-char", style: { "--d": `${delay}ms` } },
          ch
        )
      );
      pos++;
    }
  }
  return out.length === 0 ? null : out;
};

const splitChildren = (children, block, runState) => {
  const next = (child) => splitNode(child, block, runState);
  const arr = React.Children.toArray(children);
  const out = [];
  for (const child of arr) {
    const r = next(child);
    if (r == null) continue;
    if (Array.isArray(r)) out.push(...r);
    else out.push(r);
  }
  return out;
};

const splitNode = (node, block, runState) => {
  // Leaf primitive → a run of character spans.
  if (typeof node === "string" || typeof node === "number") {
    const run = runState.seq;
    runState.seq += 1;
    return makeRun(node, block, run, runState.keySeed + run);
  }
  if (!React.isValidElement(node)) return node;

  const { type, props } = node;

  // Custom components are opaque — leave untouched (no cloning).
  if (typeof type !== "string") return node;

  // Void / interactive elements we must not reparent or clone.
  if (PROTECTED_TAGS.has(type) || props.children == null) return node;

  const transformed = splitChildren(props.children, block, runState);
  return React.cloneElement(node, { key: node.key }, transformed);
};

/**
 * Renders `children` as letter-spans that participate in the page's power
 * on/off sweep. `block` overrides the reveal order (defaults to the nearest
 * <Reveal index={…}> ancestor, or 0).
 */
export const FxSplit = ({ children, block }) => {
  const inherited = useFxBase();
  const base = block ?? inherited;
  const tree = useMemo(
    () => splitChildren(children ?? "", base, { seq: 0, keySeed: 0 }),
    [base, children]
  );
  return React.createElement(React.Fragment, null, tree);
};
