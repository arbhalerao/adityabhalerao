import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";

import SiteHeader from "./components/SiteHeader";
import SectionControls from "./components/SectionControls";
import Hero from "./components/Hero";
import Tech from "./components/Tech";
import Experience from "./components/Experience";
import Education from "./components/Education";
import OSS from "./components/OSS";
import Projects from "./components/Projects";
import Blogs from "./components/Blogs";
import Papershelf from "./components/Papershelf";
import Contact from "./components/Contact";
import EasterEgg from "./components/EasterEgg";
import { SOURCE_URL } from "./seo/siteMeta";
import { useSeo } from "./seo/useSeo";

function MainContent() {
  // On a cold load the native /#section jump can fire before hydration, and the
  // target may be collapsed — in which case it lands on a bare heading.
  useEffect(() => {
    const revealHashSection = () => {
      const id = window.location.hash.replace("#", "");
      if (!id) return;

      const section = document.getElementById(id);
      if (!section) return;

      const details = section.querySelector("details[data-section]");
      if (details) details.open = true;
      section.scrollIntoView();
    };

    revealHashSection();
    window.addEventListener("hashchange", revealHashSection);
    return () => window.removeEventListener("hashchange", revealHashSection);
  }, []);

  return (
    <main className="mx-auto w-full max-w-column px-5 pb-20 sm:px-8">
      <Hero />
      <SectionControls />
      <Tech />
      <Experience />
      <Education />
      <OSS />
      <Projects />
      <Blogs />
      <Papershelf />
      <Contact />

      <footer className="meta mt-14 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-rule pt-6">
        <p>© {__BUILD_DATE__.slice(0, 4)} Aditya Bhalerao</p>

        {/* Each chunk carries its own separator, so a narrow window never strands a lone "·". */}
        <p>
          <span className="whitespace-nowrap">
            <a href={SOURCE_URL} target="_blank" rel="noopener noreferrer" className="link">
              source
            </a>{" "}
            ·
          </span>{" "}
          <span className="whitespace-nowrap">
            updated <time dateTime={__BUILD_DATE__}>{__BUILD_DATE__}</time>
          </span>
        </p>
      </footer>
    </main>
  );
}

/** Split from <App /> so entry-server.jsx can mount the same tree under a StaticRouter. */
export function AppShell() {
  const { pathname } = useLocation();
  useSeo(pathname);

  return (
    <>
      <SiteHeader />
      <Routes>
        <Route path="/" element={<MainContent />} />
      </Routes>
      <EasterEgg />
      <Analytics />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}
