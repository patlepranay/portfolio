import React from "react";
import { Helmet } from "react-helmet-async";
import { useDeck } from "@/components/deck/deck-context";
import { ArrowLeft } from "lucide-react";

/**
 * Custom 404. Rendered by the client's catch-all route (<Route path="*">) for
 * any unknown URL, and prerendered to dist/404.html so the host (Vercel)
 * serves it for missing paths too. Sits in the deck shell so the navbar and
 * starfield stay available — the user can always navigate out.
 */
const NotFound = () => {
  const { go } = useDeck();

  const home = (e) => {
    e.preventDefault();
    go("/");
  };

  return (
    <>
      <Helmet>
        <title>404 · Page not found · Pranay Patle</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="prerender-status-code" content="404" />
      </Helmet>

      <section
        id="not-found"
        className="relative flex h-dvh items-center justify-center overflow-hidden font-body"
      >
        {/* faint cinematic glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[50vh] w-[55vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/[0.04] blur-[140px]"
        />

        <div className="relative z-10 mx-auto max-w-xl px-5 text-center">
          <p className="font-hud text-sm uppercase tracking-[0.5em] text-muted-foreground">
            <span className="text-foreground">/</span> error 404
          </p>

          <h1 className="mt-4 font-display text-7xl font-extrabold leading-none text-foreground sm:text-8xl">
            Lost in
            <span className="block text-primary">space</span>
          </h1>

          <p className="mx-auto mt-6 max-w-sm text-base leading-relaxed text-muted-foreground">
            The page you're after drifted out of orbit, or the link is stale.
            Head back to the mission control desk and try again.
          </p>

          <a
            href="/"
            onClick={home}
            className="group mt-8 inline-flex items-center gap-2 border border-foreground/40 px-7 py-3.5 font-hud text-sm uppercase tracking-widest text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to home
          </a>
        </div>
      </section>
    </>
  );
};

export default NotFound;
