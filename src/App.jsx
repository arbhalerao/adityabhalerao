import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";

import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import SectionControls from "./components/SectionControls";
import SectionPage from "./components/SectionPage";
import Hero from "./components/Hero";
import EasterEgg from "./components/EasterEgg";
import { sections } from "./sections";
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
      {sections.map(({ id, Component }) => (
        <Component key={id} />
      ))}

      <SiteFooter />
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
        <Route path="/:sectionId" element={<SectionPage />} />
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
