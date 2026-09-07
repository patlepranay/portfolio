import React from "react";
import { Reveal } from "@/components/deck/reveal";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { techStack } from "@/data/constants";

const GROUPS = [
  { key: "languages", label: "Languages" },
  { key: "frameworks", label: "Frameworks" },
  { key: "technologies", label: "Technologies" },
  { key: "misc", label: "Tools & Data" },
];

const Tech = () => {
  return (
    <section id="tech" className="relative overflow-hidden py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading index="03" eyebrow="Toolbox" title="Tech & tools" />

        <div className="glass grid gap-x-10 gap-y-9 rounded-3xl p-6 sm:p-10 lg:grid-cols-2">
          {GROUPS.map((g, gi) => (
            <Reveal key={g.key} index={gi + 1}>
              <p className="mb-3 font-hud text-[13px] uppercase tracking-widest text-muted-foreground">
                <span className="mr-1 text-foreground">/</span> {g.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {techStack[g.key].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border bg-background/60 px-3.5 py-1.5 text-sm font-semibold text-foreground backdrop-blur-sm transition-all hover:border-foreground/60 hover:bg-foreground hover:text-background"
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
