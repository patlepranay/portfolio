import React from "react";

import { styles } from "../styles";

import { SectionWrapper } from "../hoc";
import { about } from "@/constants";

const About = () => {
  return (
    <>
      <div id="#about">
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview</h2>
      </div>

      <p
        style={{ textIndent: "1.5rem" }}
        className="  text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        {about.overview1}
      </p>
      <br />
      <p
        style={{ textIndent: "1.5rem" }}
        className="  text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        {about.overview2}
      </p>
      <br />
      <p
        style={{ textIndent: "1.5rem" }}
        className=" text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        {about.overview3}
      </p>
    </>
  );
};

export default SectionWrapper(About, "about");
