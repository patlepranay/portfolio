import React from "react";
import { Github, Heart, Linkedin } from "lucide-react";
import { FxSplit } from "@/components/deck/fx";
import { footer, lastUpdated } from "@/data/constants";

export const Footer = () => {
  return (
    <footer className="relative border-t border-border/70 bg-background/40 backdrop-blur-sm">
      <FxSplit block={5}>
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-center font-hud text-[12px] uppercase tracking-widest sm:flex-row sm:text-left">
          <p className="text-muted-foreground">
            <span className="text-foreground">{footer.marker}</span> © {new Date().getFullYear()} ·{" "}
            {footer.builtWith}{" "}
            <Heart className="inline h-3.5 w-3.5 text-foreground" fill="currentColor" />
            {" "}{footer.by}{" "}
            <span className="text-foreground">{footer.name}</span>
          </p>

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <a
              href="https://github.com/patlepranay"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/pranayhpatle/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={footer.sourceHref}
              target="_blank"
              rel="noreferrer"
              className="text-xs underline-offset-4 hover:underline"
            >
              {footer.source}
            </a>
          </div>

          <p className="text-xs text-muted-foreground">
            {footer.updatedLabel} · {lastUpdated}
          </p>
        </div>
      </FxSplit>
    </footer>
  );
};
