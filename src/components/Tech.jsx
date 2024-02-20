import React from "react";
import { SectionWrapper } from "../hoc";

import { styles } from "../styles";

const Tech = () => {
  const tech = {
    languages: ["Javascript", "C#", "Python"],
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
             <div className="grid md:grid-cols-3 grid-cols-2 gap-2 justify-start mt-4">
              {tech.languages.map((technology, index) => (
                <div
                  className="p-6 border border-neutral-700 transition duration-200 hover:border-white "
                  key={index}
                >
                  <span>{technology}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className={styles.sectionSubText}>Frameworks</p>
            <p className="mt-4 text-secondary sm:text-[18px] text-[14px] text-neutral-400">
              Frameworks I love working with
            </p>
             <div className="grid md:grid-cols-3 grid-cols-2 gap-2 justify-start mt-4">
              {tech.framework.map((technology, index) => (
                <div
                  className="p-6 border border-neutral-700 transition duration-200 hover:border-white "
                  key={index}
                >
                  <span>{technology}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* grid that divides in 2 col */}
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <p className={styles.sectionSubText}>Technologies</p>
            <p className="mt-4 text-secondary sm:text-[18px] text-[14px] text-neutral-400">
              Technologies I got a chance to interact with
            </p>
            <div className="grid md:grid-cols-3 grid-cols-2 gap-2 justify-start mt-4">
              {tech.tecnologies.map((technology, index) => (
                <div
                  className="p-6 border border-neutral-700 transition duration-200 hover:border-white  "
                  key={index}
                >
                  <p className="">{technology}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className={styles.sectionSubText}>Miscellaneous</p>
            <p className="mt-4 text-secondary sm:text-[18px] text-[14px] text-neutral-400">
              Stuff I worked with
            </p>
             <div className="grid md:grid-cols-3 grid-cols-2 gap-2 justify-start mt-4">
              {tech.misc.map((technology, index) => (
                <div
                  className="p-6 border border-neutral-700 transition duration-200 hover:border-white "
                  key={index}
                >
                  <span>{technology}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, "");
