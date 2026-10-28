import React, { useMemo } from "react";
import { FxSplit, FxBaseContext } from "./fx";

/* ------------------------------------------------------------------ */
/*  Reveal block                                                       */
/*                                                                     */
/*  A single meaningful block (heading, paragraph, card row, …). It     */
/*  sets the block's position in the page's letter sweep (via `index`)  */
/*  and letter-splits its text through <FxSplit>. Text higher up the     */
/*  page switches first; later blocks follow.                           */
/*                                                                     */
/*  Used to be an entrance animation — power on/off is now handled      */
/*  centrally by the deck, so this component only tags + splits.        */
/* ------------------------------------------------------------------ */

const TAG_MAP = {
  div: "div",
  p: "p",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  section: "section",
  li: "li",
  span: "span",
};

export const Reveal = ({
  as = "div",
  index = 0,
  className,
  children,
  ...rest
}) => {
  const Tag = TAG_MAP[as] || "div";
  const value = useMemo(() => index, [index]);
  return (
    <FxBaseContext.Provider value={value}>
      <Tag className={className} {...rest}>
        {children ? <FxSplit block={index}>{children}</FxSplit> : null}
      </Tag>
    </FxBaseContext.Provider>
  );
};
