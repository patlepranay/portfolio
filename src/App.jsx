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
import { Toaster } from "./components/ui/toaster";

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-black">
        <div className="flex-col">
          {/* <Navbar /> */}
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        <Works />
        {/* <Feedbacks /> */}
        <Contact />
        <StarsCanvas />
      </div>
      {/* <Toaster/> */}
    </BrowserRouter>
  );
};

export default App;
