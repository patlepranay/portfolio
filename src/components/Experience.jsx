import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";


import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";

import { SectionWrapper } from "../hoc";
import { TCS } from "@/assets";

const Experience = () => {
  return (
    <>
      <div id='experience'>
        <p className={`${styles.sectionSubText} text-center`}>
          My Professional Journey
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Work Experience.
        </h2>
      </div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          <VerticalTimelineElement
            contentStyle={{
              background:'transparent',
              color: "#fff",
            }}
            contentArrowStyle={{ borderRight: "7px solid  #fff" }}
            date={<span>{`Jul'21-Present`}</span>}
            iconStyle={{ background:'black' }}
            icon={
              <div className="flex justify-center items-center w-full h-full ">
                <img
                  alt={'tcs'}
                  src={TCS}
                  className=" object-contain w-[70%] h-[70%]"
                />
              </div>
            }
          >
            <div>
              <h3 className="text-white text-[24px] font-bold">{`System Engineer`}</h3>
              <p
                className="text-secondary text-[16px] font-semibold"
                style={{ margin: 0 }}
              >
                {`Tata Consultancy Services`}
              </p>
            </div>

            <ul className="mt-5 list-disc ml-5 space-y-2">
              <li className="text-white-100 text-[14px] pl-1 tracking-wider">
                {`Played different role of Full Stack Developer & Support Lead in two different client projects. `}
              </li>
              <li className="text-white-100 text-[14px] pl-1 tracking-wider">
                {` Lead Backend Engineer for client project handling all of the backend and mentoring colleagues.`}
              </li>
              <li className="text-white-100 text-[14px] pl-1 tracking-wider">
                {` Demonstrated expertise in implementing APIs, incorporating AWS cloud services, refining authentication middleware, and streamlining database performance.`}
              </li>
              <li className="text-white-100 text-[14px] pl-1 tracking-wider">
                {`Successfully managed an 8-member team, supervising stand-up calls, client interactions, code reviews, and the formulation of project development strategies`}
              </li>
            </ul>
          </VerticalTimelineElement>
          
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
