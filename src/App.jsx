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

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-stone-950">
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
    </BrowserRouter>
  );
};

export default App;
