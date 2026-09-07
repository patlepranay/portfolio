import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Reveal } from "@/components/deck/reveal";
import { FxSplit } from "@/components/deck/fx";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { projects, works, headings } from "@/data/constants";

/** Per-card smooth 3D tilt toward the cursor (no re-render churn). */
const TiltCard = ({ children, className = "" }) => {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [9, -9]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-11, 11]), {
    stiffness: 200,
    damping: 20,
  });

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 900 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      onMouseLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
      className={className}
    >
      {children ? <FxSplit>{children}</FxSplit> : null}
    </motion.div>
  );
};

const ProjectCard = ({ item }) => {
  const hasTwoRepos = item.source_code_link?.length > 1;
  const links = item.source_code_link ?? [];

  return (
    <TiltCard className="group relative flex h-full">
      <div className="glass flex w-full flex-col overflow-hidden rounded-2xl transition-shadow duration-300 hover:shadow-2xl hover:shadow-primary/10">
        {/* image */}
        <div className="relative h-44 overflow-hidden border-b border-border/60 bg-muted/30">
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="h-full w-full object-contain object-center p-4 transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute right-3 top-3 flex gap-2" style={{ transform: "translateZ(30px)" }}>
            {links.length > 0 && (
              <a
                href={links[0]}
                target="_blank"
                rel="noreferrer"
                aria-label="Source code"
                className="grid h-8 w-8 place-items-center rounded-lg glass-strong text-foreground transition-colors hover:text-primary"
              >
                <Github className="h-4 w-4" />
              </a>
            )}
            {item.deploy_link && (
              <a
                href={item.deploy_link}
                target="_blank"
                rel="noreferrer"
                aria-label="Live demo"
                className="grid h-8 w-8 place-items-center rounded-lg glass-strong text-foreground transition-colors hover:text-primary"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        {/* body */}
        <div className="flex flex-1 flex-col p-5" style={{ transform: "translateZ(20px)" }}>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-xl font-bold text-foreground sm:text-2xl">
              {item.title}
            </h3>
            {hasTwoRepos && (
              <a
                href={links[1]}
                target="_blank"
                rel="noreferrer"
                className="whitespace-nowrap font-hud text-xs uppercase tracking-wider text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
              >
                + repo
              </a>
            )}
          </div>
          <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">
            {item.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="font-hud text-xs uppercase tracking-wide text-foreground/80"
              >
                <span className="text-foreground/40">#</span>{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </TiltCard>
  );
};

const Works = () => {
  return (
    <section id="projects" className="relative overflow-hidden py-24 sm:py-28">
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading index={headings.works.index} eyebrow={headings.works.eyebrow} title={headings.works.title} />
        <Reveal
          index={1}
          className="mb-14 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {works.title.trim()}
        </Reveal>

        <div className="grid grid-cols-1 gap-8 pb-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((item, index) => (
            <Reveal key={item.title} index={index + 2}>
              <ProjectCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Works;
