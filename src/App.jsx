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
import OSS from "./components/OSS";
import ParticlesBackground from "./components/ParticlesBackground";
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
      <div className="w-full px-4 md:px-8 lg:px-16">
        <Tech />
      </div>

      <WaveSeparator />

      {/* Experience Section */}
      <div className="w-full px-4 md:px-8 lg:px-16">
        <Experience />
      </div>

      <WaveSeparator />

      {/* Projects Section */}
      <div className="w-full px-4 md:px-8 lg:px-16">
        <Projects />
      </div>

      <WaveSeparator />

      {/* OSS Section */}
      <div className="w-full px-4 md:px-8 lg:px-16">
        <OSS />
      </div>

      <WaveSeparator />

      {/* Papershelf Section */}
      <div className="w-full px-4 md:px-8 lg:px-16">
        <Papershelf />
      </div>

      <WaveSeparator />

      {/* Contact Section */}
      <div className="w-full px-4 md:px-8 lg:px-16">
        <Contact />
      </div>

    </main>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="fixed -z-20 min-h-screen w-full bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-black dark:via-[#0a0a23] dark:to-[#111132]"></div>
        <ParticlesBackground />

        <Navbar />
        <Analytics />
        <Routes>
          <Route path="/" element={<MainContent />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
