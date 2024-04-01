import React from "react";
import { SectionWrapper } from "../hoc";

import { styles } from "../styles";
import { HoverEffect } from "./ui/hover-effect";

const Tech = () => {
  const tech = {
    languages: ["Javascript", "C#", "Python","Java"],
    framework: [
      "React",
      "NextJS",
      "Express ",
      "Node JS",
      ".Net Core",
      "Angular 9",
    ],
    tecnologies: ["AWS", "GCP", "Jenkins", "Docker", "Git", "Clerk", "Prisma"],
    misc: ["MSSQL", "MongoDB", "HTML5", "CSS", "ShadCN", "Tailwind CSS"],
  };
  return (
    <div
      className="flex flex-col flex-wrap justify-center items-center "
      id="tech"
    >
      <h2 className={`${styles.sectionHeadText} mb-11`}>Technologies</h2>
      {/* grid that divides in 2 row */}
      <div className="flex flex-col  gap-10 ">
        {/* grid that divides in 2 col */}
        <div className="grid md:grid-cols-2 gap-10	">
          <div>
            <p className={styles.sectionSubText}>Programming Languages</p>
            <p className="mt-4 text-secondary sm:text-[18px] text-[14px] text-neutral-400">
              Languages I have mastered
            </p>
            <HoverEffect items={tech.languages}  className="cursor-default" />
          </div>
          <div>
            <p className={styles.sectionSubText}>Frameworks</p>
            <p className="mt-4 text-secondary sm:text-[18px] text-[14px] text-neutral-400">
              Frameworks I love working with
            </p>
            <HoverEffect items={tech.framework}  className="cursor-default" />
           
          </div>
        </div>

        {/* grid that divides in 2 col */}
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <p className={styles.sectionSubText}>Technologies</p>
            <p className="mt-4 text-secondary sm:text-[18px] text-[14px] text-neutral-400">
              Technologies I got a chance to interact with
            </p>
            <HoverEffect items={tech.tecnologies} className="cursor-default" />
           
          </div>
          <div>
            <p className={styles.sectionSubText}>Miscellaneous</p>
            <p className="mt-4 text-secondary sm:text-[18px] text-[14px] text-neutral-400">
              Stuff I worked with
            </p>
            <HoverEffect items={tech.misc}  className="cursor-default" />
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, "");
