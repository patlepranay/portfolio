import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";

import { SectionWrapper } from "../hoc";
import { TCS } from "@/assets";
import { workExp } from "@/constants";

const Experience = () => {
  return (
    <>
      <div id="experience">
        <p className={`${styles.sectionSubText} text-center`}>
          My Professional Journey
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Work Experience
        </h2>
      </div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {workExp.map((exp, index) => (
            <VerticalTimelineElement
              key={index}
              contentStyle={{
                background: "transparent",
                color: "#fff",
              }}
              contentArrowStyle={{ borderRight: "7px solid  #fff" }}
              date={<span>{exp.date}</span>}
              iconStyle={{ background: "black" }}
              icon={
                <div className="flex justify-center items-center w-full h-full ">
                  <img
                    alt={"tcs"}
                    src={exp.icon}
                    className=" object-contain p-1"
                  />
                </div>
              }
            >
              <div>
                <h3 className="text-white text-[24px] font-bold">
                  {exp.jobTitle}
                </h3>
                <p
                  className="text-secondary text-[16px] font-semibold"
                  style={{ margin: 0 }}
                >
                  {exp.companyName}
                </p>
                <ul className="mt-5 list-disc ml-5 space-y-2">
                  {exp.details.map((point, index) => (
                    <li
                      key={index}
                      className="text-white-100 text-[14px] pl-1 tracking-wider"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
