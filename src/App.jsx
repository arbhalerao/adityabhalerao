import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from "./context/ThemeContext";

import { WaveSeparator } from "./components/SectionSeparator";

import Contact from "./components/Contact";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Tech from "./components/Tech";
import Experience from "./components/Experience";
import Papershelf from "./components/Papershelf";
import Blogs from "./components/Blogs";
import OSS from "./components/OSS";
// import ParticlesBackground from "./components/ParticlesBackground";
import Projects from "./components/Projects";

function MainContent() {
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    };

    handleHashNavigation();

    window.addEventListener('hashchange', handleHashNavigation);

    return () => {
      window.removeEventListener('hashchange', handleHashNavigation);
    };
  }, []);

  return (
    <main className="flex flex-col items-center">

      {/* Hero Section */}
      <div className="w-full px-4 md:px-8 lg:px-16">
        <Hero />
      </div>

      <WaveSeparator />

      {/* Tech Section */}
      <div className="w-full px-4 md:px-8 lg:px-16 bg-brand/[0.035]">
        <Tech />
      </div>

      <WaveSeparator />

      {/* Experience Section */}
      <div className="w-full px-4 md:px-8 lg:px-16">
        <Experience />
      </div>

      <WaveSeparator />

      {/* OSS Section */}
      <div className="w-full px-4 md:px-8 lg:px-16 bg-brand/[0.035]">
        <OSS />
      </div>

      <WaveSeparator />
      {/* Projects Section */}
      <div className="w-full px-4 md:px-8 lg:px-16">
        <Projects />
      </div>

      <WaveSeparator />

      {/* Blogs Section */}
      <div className="w-full px-4 md:px-8 lg:px-16 bg-brand/[0.035]">
        <Blogs />
      </div>

      <WaveSeparator />

      {/* Papershelf Section */}
      <div className="w-full px-4 md:px-8 lg:px-16">
        <Papershelf />
      </div>

      <WaveSeparator />

      {/* Contact Section */}
      <div className="w-full px-4 md:px-8 lg:px-16 bg-brand/[0.035]">
        <Contact />
      </div>

    </main>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="fixed -z-20 min-h-screen w-full bg-[#f3f3f3] dark:bg-[#2e3033]"></div>
        {/* <ParticlesBackground /> */}

        <Navbar />
        <Analytics />
        <Routes>
          <Route path="/" element={<MainContent />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
