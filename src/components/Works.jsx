import React from "react";

import { motion } from "framer-motion";

import { styles } from "../styles";

import { SectionWrapper } from "../hoc";
import {
  Dashboard,
  Editor,
  KrushiSarathi,
  NoImage,
  Telehealth,
  Ticket,
} from "@/assets";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
}) => {
  return (
    <div className="border p-2">
      <div className="w-full h-[230px] ">
        <img
          src={image}
          alt="project_image"
          className="w-full h-full object-contain rounded-2xl"
        />
      </div>

      <h3 className="text-white font-bold text-[24px] mt-5">{name}</h3>

      <div className="mt-4 flex-col   space-y-4">
        <div>
          <p className="mt-2 text-secondary text-[14px]">{description}</p>
        </div>
        <div className="flex gap-2">
          {tags.map((tag, index) => (
            <p key={`${index}`} className={`text-[14px]`}>
              #{tag}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

const Works = () => {
  const projects = [
    {
      name: "Telehealth Consultation",
      description:
        "Web-based platform for hospitals that has video calling feature for appointment and caters the need of central repository for appointments and medical history of patient",
      tags: ["react", "express", "materialUI", "socket.io"],
      image: Telehealth,

      source_code_link: "https://github.com/",
    },
    {
      name: "Whatsapp Web Bulk Sender",
      description:
        "Python GUI based web automation application. Allows user to send thousands of customizable message to users in one go. Best suited for replacement of broadcast messages in Whatsapp",
      tags: ["python", "tkinter", "selenium"],
      image: NoImage,

      source_code_link: "https://github.com/",
    },
    {
      name: "Realtime Note Editor",
      description:
        "Created a user-friendly online editor in NextJS that facilitates document publishing and secure note creation. Integrated a real-time database with Convex, incorporated social media login through Clerk, and utilized Shadcn and Tailwind for seamless UI components, while leveraging BlockNote for the editing functionality.",
      tags: ["nextjs", "clerk", "tailwind", "blocknote"],
      image: Editor,

      source_code_link: "https://github.com/",
    },
    {
      name: "Ticket Booking Application",
      description:
        "Created a mobile responsive application for event booking and registration. Application provides platform to host events and book tickets for users.",
      tags: ["nextjs", "clerk", 'prisma',"shadcn"],
      image: Ticket,

      source_code_link: "https://github.com/",
    },
    {
      name: "Krushi Sarathi NGO Website",
      description:
        "Designed and developed beautful website for Krushi Sarathi team. Krushi Sarathi works for the welfare of the farmers in Vidarbha Region of Maharashtra",
      tags: ["react", "tailwind"],
      image: KrushiSarathi,

      source_code_link: "https://github.com/",
    },
    {
      name: "Realtime React Dashboard",
      description:
        "Designed and developed realtime data dashboard displaying data in charts, graph. Has support to update data in realtime using socket io.",
      tags: ["react", "express", "socket.io", "tremor", "shadcn"],
      image: Dashboard,

      source_code_link: "https://github.com/",
    },
  ];
  return (
    <>
      <motion.div>
        <p className={`${styles.sectionSubText} `}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]">
          Following projects showcases my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos in it. It reflects my
          ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </motion.p>
      </div>

      <div className="mt-20 grid md:grid-cols-3  flex-wrap gap-7">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");
