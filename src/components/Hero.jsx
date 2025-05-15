import { styles } from "@/styles";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import Resume from "../../public/Pranay_Patle_Resume.pdf";
import { toast } from "./ui/use-toast";
import Clock from 'react-clock';

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
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000 * 60);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const now = new Date();
  const day = days[now.getDay()]; // e.g., "Monday"

  const date = now.toLocaleDateString('en-GB');


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
        <div className="col-span-3 grid grid-rows-6 border-l border-r border-b ">

          <div className="row-span-4 flex border-b justify-center items-center">
            <span
              className={`${styles.sectionSubText}font-semibold text-neutral-400 hover:text-white  transition duration-200`}
            >
              About me
            </span>
          </div>
          <div className="row-span-2 flex flex-col  justify-center items-center">
            <div className=" flex flex-col md:flex-row md:gap-4 items-center justify-center">


              <span
                className={`${styles.sectionSubText}font-semibold text-neutral-400 hover:text-white  transition duration-200`}
              >
                {day}{ }
              </span>
              <span
                className={`${styles.sectionSubText}font-semibold text-neutral-400 hover:text-white  transition duration-200`}
              >
                {date}
              </span>
            </div>
            <span
              className={`${styles.sectionSubText}font-semibold text-neutral-400 hover:text-white  transition duration-200`}
            >
              {value.getHours() + ":" + value.getMinutes()}
            </span>
          </div>



        </div>
      </div>
    </section >
  );
};

export default Hero;
