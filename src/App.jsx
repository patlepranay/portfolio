import React from "react";
import { DeckProvider } from "./components/deck/deck-context";
import { Deck } from "./components/deck/Deck";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { DustField } from "./components/effects/DustField";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Tech from "./sections/Tech";
import Works from "./sections/Works";
import Contact from "./sections/Contact";
import { navItems } from "@/data/constants";

/**
 * Section order doubles as the page order of the deck. It follows the single
 * `navItems` list in src/data/constants.js — reorder there and navigation,
 * highlight, and hash routing all follow.
 */
const ORDER = navItems.map((n) => n.id);

const PAGES = [
  <Hero key="home" />,
  <About key="about" />,
  <Experience key="experience" />,
  <Tech key="tech" />,
  <Works key="projects" />,
  // Contact is the final page; the site footer closes it out.
  (
    <React.Fragment key="contact">
      <Contact />
      <Footer />
    </React.Fragment>
  ),
];

const App = () => {
  return (
    <DeckProvider order={ORDER}>
      <div className="relative h-dvh w-full overflow-hidden bg-background">
        <DustField />
        <div className="relative z-10 h-full">
          <Deck pages={PAGES} />
        </div>
        <Navbar />
      </div>
    </DeckProvider>
  );
};

export default App;
