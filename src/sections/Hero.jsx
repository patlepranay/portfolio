import React, { useEffect, useState } from "react";
import { Reveal } from "@/components/deck/reveal";

const RESUME_URL = "/Pranay_Patle_Resume.pdf";

const LiveClock = ({ className = "" }) => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);
  const time = now.toLocaleTimeString([], { hour12: false });
  const date = now.toLocaleDateString("en-GB");
  return (
    <span className={`font-hud text-foreground/80 ${className}`}>
      {date} <span className="text-muted-foreground">//</span> {time} IST
    </span>
  );
};

const Hero = () => {
  return (
    <section
      id="home"
      className="relative flex min-h-full flex-col justify-between overflow-hidden pt-16 pb-10 sm:pt-24"
    >
      {/* faint cinematic glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/[0.03] blur-[140px]" />

      {/* main copy sits above the canvas */}
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 sm:px-10">
        <Reveal
          as="p"
          index={0}
          className="mb-2 font-hud text-sm text-muted-foreground sm:text-base"
        >
          <span className="text-foreground">▸</span> full-stack software engineer
          <span className="mx-2 text-border">//</span>
          <span className="hidden sm:inline">web · cloud · realtime</span>
        </Reveal>

        {/* GIANT NAME */}
        <Reveal
          as="h1"
          index={1}
          className="font-display font-extrabold uppercase leading-[0.82] tracking-[-0.02em] text-foreground text-[clamp(3.4rem,14.5vw,12.5rem)]"
        >
          Pranay
          <br />
          <span className="text-transparent" style={{ WebkitTextStroke: "1px hsl(var(--foreground))" }}>
            Patle
          </span>
        </Reveal>

        {/* HUD descriptor strip */}
        <Reveal
          index={2}
          className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-border py-3 font-hud text-[13px] text-muted-foreground sm:text-sm"
        >
          <span>
            <b className="text-foreground">5+ yrs</b> shipping
          </span>
          <span className="text-border">|</span>
          <span>scalable web</span>
          <span className="text-border hidden sm:inline">|</span>
          <span className="hidden sm:inline">hybrid apps</span>
          <span className="text-border hidden sm:inline">|</span>
          <span className="hidden sm:inline">cloud · aws/gcp</span>
        </Reveal>

        {/* CTAs */}
        <Reveal
          index={3}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 bg-foreground px-6 py-3 font-hud text-sm font-bold uppercase tracking-widest text-background transition-transform hover:-translate-y-0.5"
          >
            view work <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 border border-foreground/40 px-6 py-3 font-hud text-sm font-bold uppercase tracking-widest text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
          >
            contact me
          </a>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noreferrer"
            className="px-2 py-3 font-hud text-sm uppercase tracking-widest text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            résumé ↗
          </a>
        </Reveal>
      </div>

      {/* bottom HUD bar */}
      <Reveal
        index={4}
        className="relative z-10 mx-auto mt-10 flex w-full max-w-[1400px] flex-wrap items-center justify-between gap-3 border-t border-border px-5 pt-4 font-hud text-[11px] uppercase tracking-widest text-muted-foreground sm:px-10"
      >
        <span>
          <span className="mr-2 text-foreground">↳</span>scroll — build · ship · scale
        </span>
        <span className="hidden lg:inline">
          <span className="text-muted-foreground/60">2D · 2026</span>
        </span>
        <LiveClock className="hidden md:inline" />
      </Reveal>
    </section>
  );
};

export default Hero;
