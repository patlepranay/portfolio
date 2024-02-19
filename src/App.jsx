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
        {/* <More /> */}
        <Footer />
        <StarsCanvas />
      </div>
    </BrowserRouter>
  );
};

export default App;
