import React from "react";
import { GraduationCap, MapPin, Cog } from "lucide-react";
import { Reveal } from "@/components/deck/reveal";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { about } from "@/data/constants";

const FACTS = [
  {
    icon: Cog,
    label: "Role",
    value: "Senior Software Engineer · Full Stack",
  },
  {
    icon: MapPin,
    label: "Based",
    value: "Remote · Bengaluru, India",
  },
  {
    icon: GraduationCap,
    label: "Education",
    value: "B.Tech CSE · GCOE Amravati, 2021",
  },
];

const About = () => {
  return (
    <section id="about" className="relative overflow-hidden py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading index="01" eyebrow="Who I am" title="About me" />

        <div className="grid items-start gap-10 lg:grid-cols-[1.6fr_1fr]">
          <Reveal
            index={1}
            className="space-y-6 text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            <p className="text-foreground/90 first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-6xl first-letter:leading-[0.8] first-letter:text-primary">
              {about.overview1.trim()}
            </p>
            <p>{about.overview2.trim()}</p>
            <p>{about.overview3.trim()}</p>
          </Reveal>

          <div className="space-y-4">
            <Reveal index={2} className="space-y-4">
              {FACTS.map((f) => (
                <div
                  key={f.label}
                  className="glass flex items-center gap-4 rounded-2xl p-5"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-hud text-[11px] uppercase tracking-widest text-muted-foreground">
                      {f.label}
                    </p>
                    <p className="text-lg font-semibold text-foreground">{f.value}</p>
                  </div>
                </div>
              ))}
            </Reveal>

            <Reveal index={3} className="glass rounded-2xl p-5">
              <p className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">
                Focus areas
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Distributed systems",
                  "System design",
                  "Real-time apps",
                  "Cloud",
                  "Full-stack",
                ].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-semibold text-foreground"
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
