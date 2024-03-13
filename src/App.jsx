import { BrowserRouter } from "react-router-dom";

import {
  About,
  Contact,
  Experience,
  Hero,
  Tech,
  Works,
  StarsCanvas,
} from "./components";
import React from "react";
import Footer from "./components/Footer";
import { SparklesCore } from "./components/ui/sparkles";

const App = () => {
  return (
    <div className="relative z-5">
      <div className="w-full absolute inset-0  -z-10 h-full">
        {/* <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1  }
          particleDensity={8}
          className="w-full h-full z-0"
          particleColor="#FFFFFF"
        /> */}
      </div>
      <Hero className='z-6'/>
      <About />
      <Experience />
      <Tech />
      <Works />
      <Contact />
      <Footer />
      {/* <StarsCanvas /> */}
     
    </div>  
  );
};

export default App;


