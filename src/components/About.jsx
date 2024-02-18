import React from "react";

import { styles } from "../styles";

import { SectionWrapper } from "../hoc";

const About = () => {
  return (
    <>
      <div id="#about">
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </div>

      <p className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]">
        {`Passionate full-stack developer with two and half years of
professional experience in developing and managing
applications, web apps, and much more. Well-versed in
a range of programming languages, frameworks, and
database technologies and able to rapidly learn new
technologies. Great at problem-solving and analytical
thinking.`}
      </p>
    </>
  );
};

export default SectionWrapper(About, "about");
