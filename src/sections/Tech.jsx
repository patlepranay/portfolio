import React from "react";
import { Reveal } from "@/components/deck/reveal";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Seo } from "@/components/seo/Seo";
import { techStack, techGroups, headings } from "@/data/constants";

const Tech = () => {
  return (
    <section id="tech" className="pg-tech relative overflow-hidden py-24 sm:py-28">
      {/* ambient hue glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-32 h-[46vh] w-[42vw] rounded-full opacity-70 blur-[130px]"
        style={{ background: "radial-gradient(circle, hsl(var(--pg-hue) / 0.2), transparent 70%)" }}
      />
      <Seo id="tech" />
      <div className="flex flex-col  object-center  mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading index={headings.tech.index} eyebrow={headings.tech.eyebrow} title={headings.tech.title} />

        <div className="glass-exp grid md:mt-10 gap-x-10 gap-y-9 p-6 sm:p-10 lg:grid-cols-2 ">
          {techGroups.map((g, gi) => (
            <Reveal key={g.key} index={gi + 1}>
              <p className="mb-3 font-hud text-[13px] uppercase tracking-widest text-muted-foreground">
                <span className="mr-1 text-foreground">/</span> {g.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {techStack[g.key].map((t) => (
                  <span
                    key={t}
                    className="cursor-pointer border border-border bg-background/60 px-3.5 py-1.5 text-sm text-foreground backdrop-blur-sm transition-all hover:border-foreground hover:bg-foreground hover:text-background"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tech;
