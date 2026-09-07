import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Reveal } from "@/components/deck/reveal";
import { FxSplit } from "@/components/deck/fx";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { workExp, headings } from "@/data/constants";

const Experience = () => {
  return (
    <section id="experience" className="relative overflow-hidden py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index={headings.experience.index}
          align="center"
          eyebrow={headings.experience.eyebrow}
          title={headings.experience.title}
        />

        <Reveal index={1}>
          <VerticalTimeline lineColor="hsl(var(--border))">
          {workExp.map((exp, index) => (
            <VerticalTimelineElement
              key={index}
              contentStyle={{
                background: "color-mix(in srgb, hsl(var(--card)) 88%, transparent)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid hsl(var(--border))",
                borderRadius: "14px",
                boxShadow: "0 8px 30px hsl(var(--ring) / 0.06)",
                color: "hsl(var(--foreground))",
              }}
              contentArrowStyle={{
                borderRight: "7px solid color-mix(in srgb, hsl(var(--card)) 92%, transparent)",
              }}
              date={exp.date}
              iconStyle={{
                background: "hsl(var(--card))",
                boxShadow: "0 0 0 4px hsl(var(--background)), inset 0 0 0 1px hsl(var(--border))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              icon={
                <img
                  alt={exp.companyName}
                  src={exp.icon}
                  className="h-full w-full rounded-full object-cover p-1.5"
                />
              }
            >
              {/* VerticalTimelineElement is a library component (opaque to the
                  splitter), so split its text explicitly here, per card. */}
              <FxSplit block={index + 2}>
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display text-xl text-foreground sm:text-2xl">
                      {exp.jobTitle}
                    </h3>
                    <span className="rounded-full border border-border px-3 py-0.5 text-xs font-semibold text-primary">
                      {exp.date}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-primary">
                    {exp.companyName}
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {exp.details.map((point, i) => (
                      <li
                        key={i}
                        className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{point.trim()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FxSplit>
            </VerticalTimelineElement>
          ))}
          </VerticalTimeline>
        </Reveal>
      </div>
    </section>
  );
};

export default Experience;
