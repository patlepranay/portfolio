import { styles } from "@/styles";
import React from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import Resume from "../../public/Pranay_Patle_Resume.pdf";
import { toast } from "./ui/use-toast";

const Hero = () => {
  const onResumeClick = () => {
    try {

      window.open(Resume);
    } catch (error) {

      toast({
        title: 'Error displaying resume.',
        description: 'Please try again later'
      })
    }
  };
  return (
    <section className={` flex flex-col  w-full h-screen mx-auto z-5 p-1`}>
      <div className="grid grid-cols-10  h-[65%] w-full ">
        <div className="h-full  grid-rows-2 col-span-4   ">
          <div className="flex border-r border-l border-t row-span-1 h-1/2 items-center justify-center">
            <a onClick={onResumeClick}>
              <span
                className={`${styles.sectionSubText}font-semibold text-neutral-400 hover:text-white text-center transition cursor-pointer duration-200 `}
              >
                MY RESUME
              </span>
            </a>
          </div>
          <div className="flex border row-span-1 h-1/2 items-center justify-center">
            <HashLink to="/#tech" className={`${styles.sectionSubText}font-semibold text-neutral-400 hover:text-white  transition duration-200 p-8`}>
              <p

              >
                Tech Stack I work on
              </p>
            </HashLink>
          </div>
        </div>
        <div className="h-full col-span-6 grid grid-rows-10">
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
