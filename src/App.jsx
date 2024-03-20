import { About, Contact, Experience, Hero, Tech, Works } from "./components";
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
    </div>
  );
};

export default App;
