import { Route, Routes } from "react-router-dom";
import { PowerProvider } from "./components/deck/deck-context";
import { Deck } from "./components/deck/Deck";
import { Navbar } from "./components/layout/Navbar";
import { DustField } from "./components/effects/DustField";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Tech from "./sections/Tech";
import Works from "./sections/Works";
import Contact from "./sections/Contact";

/**
 * Each section is its own route. <Deck> is the pathless shell that fills a
 * viewport and renders the active route's section through <Outlet/>, applying
 * the letter "power" effect around navigation (see PowerProvider). Unknown
 * paths fall back to the home page.
 *
 * Paths match the `path` field on navItems in src/data/constants.js.
 */
const App = () => {
  return (
    <PowerProvider>
      <div className="relative h-dvh w-full overflow-hidden bg-background">
        <DustField />
        <div className="relative z-10 h-full">
          <Routes>
            <Route element={<Deck />}>
              <Route index element={<Hero />} />
              <Route path="about" element={<About />} />
              <Route path="experience" element={<Experience />} />
              <Route path="tech" element={<Tech />} />
              <Route path="work" element={<Works />} />
              {/* Contact is the final page; its sign-off is folded into the section. */}
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<Hero />} />
            </Route>
          </Routes>
        </div>
        <Navbar />
      </div>
    </PowerProvider>
  );
};

export default App;
