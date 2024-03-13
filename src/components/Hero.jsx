import { styles } from "@/styles";
import React from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const Hero = () => {
  return (
    <section className={` flex flex-col  w-full h-screen mx-auto z-5 `}>
      <div className="grid grid-cols-10  h-[65%] w-full ">
        <div className=" flex h-full col-span-3 border  items-center justify-center p-6">
          <HashLink to="/#tech">
            <span
              className={`${styles.sectionSubText}font-semibold text-neutral-400 hover:text-white  transition duration-200 `}
            >
              Tech Stack I work on
            </span>
          </HashLink>
        </div>
        <div className="h-full col-span-7 grid grid-rows-10">
          <div className="h-full row-span-3 border-t border-r  items-center justify-center p-6 flex">
            {" "}
            <HashLink to="/#experience">
              <span
                className={`${styles.sectionSubText}font-semibold text-neutral-400 hover:text-white  transition duration-200`}
              >
                My Professional Experience
              </span>
            </HashLink>
          </div>
          <div className="h-full row-span-7 border-t border-r border-b items-center justify-center p-6 flex">
            <Link to="/">
              <span className="font-semibold text-4xl hover:scale-50	mb-4">
                {`Hi,`}
                <br /> {`I'm Pranay`}
              </span>
              <p>I develop Softwares & Web Applications.</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-9    h-[34%] w-full ">
        <div className="h-full col-span-3 border-l border-b items-center justify-center p-6 flex ">
          <HashLink to="#about">
            <span
              className={`${styles.sectionSubText}font-semibold text-neutral-400 hover:text-white  transition duration-200`}
            >
              About me
            </span>
          </HashLink>
        </div>
        <div className="h-full col-span-3 border-l border-b items-center justify-center p-6 flex">
          <HashLink to="#projects">
            <span
              className={`${styles.sectionSubText}font-semibold text-neutral-400 hover:text-white  transition duration-200`}
            >
              Projects I learned from
            </span>
          </HashLink>
        </div>
        <div className="h-full col-span-3 border-l border-b border-r items-center justify-center p-6 flex">
          <HashLink to="#contact">
            <span
              className={`${styles.sectionSubText}font-semibold text-neutral-400 hover:text-white  transition duration-200`}
            >
              Reach out to me{" "}
            </span>
          </HashLink>
        </div>
      </div>
    </section>
  );
};

export default Hero;
