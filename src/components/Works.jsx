import React from "react";

import { motion } from "framer-motion";

import { styles } from "../styles";

import { SectionWrapper } from "../hoc";

import { HoverEffect } from "./ui/hover-effect";
import { projects, works } from "@/constants";

const Works = () => {
  return (
    <>
      <motion.div id="projects">
        <p className={`${styles.sectionSubText} `}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]">
          {works.title}
        </motion.p>
      </div>

      <HoverEffect
        items={projects}
        type="object"
        className="mt-20 grid grid-cols-1 md:grid-cols-3 "
      />
    </>
  );
};

export default SectionWrapper(Works, "");
