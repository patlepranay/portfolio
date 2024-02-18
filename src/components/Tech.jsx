import React from "react";
import { SectionWrapper } from "../hoc";

import { styles } from "../styles";

const Tech = () => {
  const tech = {
    languages: ["Javascript", "C#", "Python"],
    framework: [
      "React",
      "Angular 9",
      "Express ",
      "Node JS",
      ".Net Core",
      "Git",
    ],
    tecnologies: [
      "AWS(S3,SQS, SNS, Lambda)",
      "Google Maps Platform",
      "Jenkins",
      "Docker",
    ],
    misc: ["MSSQL", "MongoDB", "HTML5", "CSS", "ShadCN", "Tailwind CSS"],
  };
  return (
    <div className="flex flex-col flex-wrap justify-center items-center ">
      <h2 className={`${styles.sectionHeadText} mb-11`}>Technologies</h2>
      {/* grid that divides in 2 row */}
      <div className="grid grid-rows-2  gap-10 ">
        {/* grid that divides in 2 col */}
        <div className="grid md:grid-cols-2 gap-10	">
          <div>
            <p className={styles.sectionSubText}>Programming Languages</p>
            <p className="mt-4 text-secondary sm:text-[18px] text-[14px] text-neutral-400">
              Languages I have mastered till now
            </p>
            <div className="grid grid-cols-3 gap-2 justify-start mt-4">
              {tech.languages.map((technology, index) => (
                <div
                  className="p-4 border border-neutral-700 hover:border-white hover:cursor-pointer"
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
            <div className="grid grid-cols-3 gap-2 justify-start mt-4">
              {tech.framework.map((technology, index) => (
                <div
                  className="p-4 border border-neutral-700 hover:border-white hover:cursor-pointer"
                  key={index}
                >
                  <span>{technology}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
       
          {/* grid that divides in 2 col */}
          <div className="grid md:grid-cols-2 gap-10	">
            <div>
              <p className={styles.sectionSubText}>Technologies</p>
              <p className="mt-4 text-secondary sm:text-[18px] text-[14px] text-neutral-400">
                Technologies I got chance to interact with
              </p>
              <div className="grid grid-cols-3 gap-2 justify-start mt-4">
                {tech.tecnologies.map((technology, index) => (
                  <div
                    className="p-4 border border-neutral-700 hover:border-white hover:cursor-pointer"
                    key={index}
                  >
                    <span>{technology}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className={styles.sectionSubText}>Miscellaneous</p>
              <p className="mt-4 text-secondary sm:text-[18px] text-[14px] text-neutral-400">
                Random Stuff I worked with
              </p>
              <div className="grid grid-cols-3 gap-2 justify-start mt-4">
                {tech.misc.map((technology, index) => (
                  <div
                    className="p-4 border border-neutral-700 hover:border-white hover:cursor-pointer"
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
