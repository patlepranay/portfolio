import {
  About,
  Contact,
  Experience,
  Hero,
  StarsCanvas,
  Tech,
  Works,
} from "./components";
import React from "react";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="relative z-5">
      <Hero className="z-6" />
      <About />
      <Experience />
      <Tech />
      <Works />
      <Contact />
      <Footer />
      <div className="hidden md:block">
        <StarsCanvas />
      </div>
    </div>
  );
};

export default App;
