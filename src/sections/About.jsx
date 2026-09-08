import React from "react";
import { GraduationCap, MapPin, Cog } from "lucide-react";
import { Reveal } from "@/components/deck/reveal";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Seo } from "@/components/seo/Seo";
import { about, aboutFacts, focusAreas, headings } from "@/data/constants";

const FACT_ICONS = {
  role: Cog,
  based: MapPin,
  education: GraduationCap,
};

const About = () => {
  return (
    <section
      id="about"
      className="pg-about relative flex min-h-dvh items-center overflow-hidden py-24 font-body sm:py-28"
    >
      {/* ambient hue glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-44 -top-40 h-[46vh] w-[40vw] rounded-full opacity-70 blur-[130px]"
        style={{ background: "radial-gradient(circle, hsl(var(--pg-hue) / 0.2), transparent 70%)" }}
      />
      <Seo id="about" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading index={headings.about.index} eyebrow={headings.about.eyebrow} title={headings.about.title} />

        <div className="grid items-start gap-10 lg:grid-cols-[1.6fr_1fr]">
          <Reveal
            index={1}
            className="space-y-6 text-lg font-body leading-relaxed text-foreground "
          >
            <p className=" first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-6xl first-letter:leading-[0.8] first-letter:text-primary">
              {about.overview1.trim()}
            </p>
            <p>{about.overview2.trim()}</p>
            <p>{about.overview3.trim()}</p>
          </Reveal>

          <div className="space-y-4">
            <Reveal index={2} className="space-y-4">
              {aboutFacts.map((f) => {
                const Icon = FACT_ICONS[f.icon] || Cog;
                return (
                  <div
                    key={f.label}
                    className="glass-exp flex items-center gap-4 p-5"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center bg-primary/15 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-hud text-[11px] uppercase tracking-widest text-muted-foreground">
                        {f.label}
                      </p>
                      <p className="text-lg font-semibold text-foreground">{f.value}</p>
                    </div>
                  </div>
                );
              })}
            </Reveal>

            <Reveal index={3} className="glass-exp p-5">
              <p className="mb-3 font-hud text-xs uppercase tracking-widest text-muted-foreground">
                Focus areas
              </p>
              <div className="flex flex-wrap gap-2">
                {focusAreas.map((t) => (
                  <span
                    key={t}
                    className="border border-border bg-background/60 px-3 py-1 text-xs text-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
