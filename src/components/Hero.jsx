import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { styles } from "@/styles";
import React from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";


const Hero = () => {
  return (
    <section className={` w-full h-screen mx-auto`}>
      <div className="  w-full flex justify-center items-center ">
        <ResizablePanelGroup
          direction="vertical"
          className=" rounded-lg  min-h-screen p-2"
        >
          <ResizablePanel defaultSize={65}>
            <ResizablePanelGroup direction={"horizontal"}>
              <ResizablePanel defaultSize={40}>
                <div className="flex h-full items-center justify-center p-6">
                  <HashLink to="/#tech">
                    <span className={`${styles.sectionSubText}font-semibold`}>Tech Stack I work on</span>
                  </HashLink>
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={60}>
                <ResizablePanelGroup direction={"vertical"}>
                  <ResizablePanel defaultSize={60}>
                    <div className="flex  h-full items-center justify-center p-6">
                    <HashLink to="/#experience">
                      <span className={`${styles.sectionSubText}font-semibold`}>
                        My Professional Experience
                      </span>
                      </HashLink>
                    </div>
                  </ResizablePanel>
                  <ResizableHandle />
                  <ResizablePanel defaultSize={40}>
                    <div className="flex flex-col h-full items-center justify-center px-6 py-10">
                      <Link to="/">
                        <span className="font-semibold text-4xl hover:scale-50	">
                          {`Hi, I'm Pranay`}
                        </span>
                        <p>I develop softwares and web applications</p>
                      </Link>
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={35}>
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize={33}>
                <div className="flex h-full items-center justify-center p-6">
                  <HashLink to="#projects">
                    <span className={`${styles.sectionSubText}font-semibold`}>
                      Projects I learned from
                    </span>
                  </HashLink>
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={34}>
                <div className="flex h-full items-center justify-center p-6">
                  <HashLink to="#about">
                    <span className={`${styles.sectionSubText}font-semibold`}>About me</span>
                  </HashLink>
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={33}>
                <div className="flex h-full items-center justify-center p-6">
                  <HashLink to="#contact">
                    <span className={`${styles.sectionSubText}font-semibold`}>Reach out to me on</span>
                  </HashLink>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </section>
  );
};

export default Hero;
