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
        "A web-based platform tailored for hospitals integrates a video calling feature for appointments and addresses the requirement for a centralized repository managing both appointment schedules and patient medical histories. The inclusion of a single-page application enhances the overall user experience, providing a seamless and efficient interface. ",
      tags: ["react", "express", "materialUI", "socket.io"],
      image: Telehealth,

      source_code_link: "https://github.com/",
    },
    {
      name: "Whatsapp Web Bulk Sender",
      description:
        "Application for web automation based on Python with a GUI, enabling users to send customized messages to thousands in a single operation. Ideal for replacing broadcast messages in Whatsapp, application offers a user-friendly interface for efficient communication.",
      tags: ["python", "tkinter", "selenium"],
      image: NoImage,

      source_code_link: "https://github.com/",
    },
    {
      name: "Realtime Note Editor",
      description:
        "Developed an intuitive online editor using NextJS, facilitating document publishing and secure note creation. Implemented a real-time database with Convex, integrated social media login through Clerk, and employed Shadcn and Tailwind for seamless UI components. Additionally, the editing functionality was optimized using BlockNote, resulting in a user-friendly platform with advanced features for a streamlined document creation experience..",
      tags: ["nextjs", "clerk", "tailwind", "blocknote"],
      image: Editor,

      source_code_link: "https://github.com/",
    },
    {
      name: "Ticket Booking Application",
      description:
        "An event booking and registration application that serves as a comprehensive platform for hosting events and facilitating ticket reservations. The application offers users a seamless experience to both organize and participate in events. To enhance user convenience, a secure payment gateway has been integrated, leveraging Stripe for efficient and reliable financial transactions..",
      tags: ["nextjs", "clerk", 'prisma',"shadcn"],
      image: Ticket,

      source_code_link: "https://github.com/",
    },
    {
      name: "Krushi Sarathi NGO Website",
      description:
        "Crafted and developed an aesthetically pleasing website for the Krushi Sarathi team, an organization dedicated to the well-being of farmers in the Vidarbha Region of Maharashtra.",
      tags: ["react", "tailwind"],
      image: KrushiSarathi,

      source_code_link: "https://github.com/",
    },
    {
      name: "Realtime React Dashboard",
      description:
        " Dynamic real-time data dashboard, showcasing information through visually appealing charts and graphs. This interactive platform not only provides a comprehensive view of data but also incorporates the capability to update information in real-time, thanks to the integration of Socket.IO. The user-friendly interface ensures a seamless experience for monitoring and analyzing data trends, making it a valuable tool for decision-makers and analysts alike.",
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
        Ever since my college days, I've immersed myself in development, relishing hands-on experiences across various domains. The projects below represent not only my completed works but also valuable learning experiences. These endeavors have not only showcased my skills but also served as stepping stones in my continuous journey of growth and proficiency. I am enthusiastic about sharing these projects as they reflect my passion for hands-on learning and the evolving nature of my expertise.
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
