import React, { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Reveal } from "@/components/deck/reveal";
import { FxSplit } from "@/components/deck/fx";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Seo } from "@/components/seo/Seo";
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
    <TiltCard className="group font-body relative flex h-full">
      <div className="glass-exp font-body flex w-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-2xl hover:shadow-primary/10">
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
                className="grid h-8 w-8 place-items-center glass-strong text-foreground transition-colors hover:text-primary"
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
                className="grid h-8 w-8 place-items-center glass-strong text-foreground transition-colors hover:text-primary"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        {/* body */}
        <div className="flex flex-1 flex-col p-5" style={{ transform: "translateZ(20px)" }}>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-body text-xl font-bold text-foreground sm:text-2xl">
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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedProject = projects[selectedIndex];

  return (
    <section
      id="projects"
      className="pg-works relative overflow-hidden py-24 sm:py-28"
    >
      <Seo id="projects" />
      {/* ambient hue glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-24 h-[46vh] w-[42vw] rounded-full opacity-70 blur-[130px]"
        style={{ background: "radial-gradient(circle, hsl(var(--pg-hue) / 0.2), transparent 70%)" }}
      />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left — Heading & Description */}
          <div className="max-w-xl">
            <SectionHeading
              index={headings.works.index}
              eyebrow={headings.works.eyebrow}
              title={headings.works.title}
            />

            <Reveal
              index={1}
              className="mt-6 max-w-lg text-base font-body leading-relaxed text-muted-foreground sm:text-lg"
            >
              {works.title.trim()}
            </Reveal>
          </div>

          {/* Right — Selected Project */}
          <div className="relative w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedProject.title}
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -60, opacity: 0 }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <ProjectCard item={selectedProject} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom — Project Gallery */}
        <div className="mt-10 border-t border-border/50 pt-6">
          <div className="flex gap-3 overflow-x-auto px-1 py-2 sm:justify-center">
            {projects.map((project, index) => {
              const isSelected = selectedIndex === index;

              return (
                <button
                  key={project.title}
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  aria-label={`View ${project.title}`}
                  aria-pressed={isSelected}
                  className="group relative shrink-0"
                >
                  <div
                    className={`
                      relative h-16 w-24 overflow-hidden
                      border transition-all duration-300
                      sm:h-20 sm:w-32
                      ${isSelected
                        ? "scale-105 border-foreground opacity-100"
                        : "border-border/50 opacity-40 hover:scale-105 hover:opacity-90"
                      }
                    `}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {!isSelected && (
                      <div className="absolute inset-0 bg-background/25 transition-opacity group-hover:opacity-0" />
                    )}

                    <span className="absolute bottom-1.5 left-2 font-hud text-[10px] font-medium text-white drop-shadow-md">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {isSelected && (
                      <motion.div
                        layoutId="selected-project"
                        className="absolute inset-0 border-2 border-foreground"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Works;
