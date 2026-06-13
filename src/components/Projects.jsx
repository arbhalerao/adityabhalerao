import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ChevronRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { projects, sideProjects } from "../data/projectsData.js";

const Projects = () => {
  const { theme } = useTheme();
  const [expandedIndex, setExpandedIndex] = useState(null);
  const sectionRef = useRef(null);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  const boldText = (text) => {
    return text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
  };

  const toggleDetails = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  // Collapse the expanded project on Escape key press
  useEffect(() => {
    const handleEscapeKeyPress = (e) => {
      if (e.key === 'Escape') {
        setExpandedIndex(null);
      }
    };

    window.addEventListener('keydown', handleEscapeKeyPress);
    return () => {
      window.removeEventListener('keydown', handleEscapeKeyPress);
    };
  }, []);

  // Collapse any open details once the Projects section is fully out of view
  // (whether the user scrolls past the top or the bottom).
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setExpandedIndex(null);
        }
      },
      { threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const getThemeImage = (project) => {
    return theme === 'dark' ? project.images.dark : project.images.light;
  };

  const renderProjectCard = (project, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group flex flex-col bg-[#f3f3f3] p-6 rounded-lg border border-black hover:border-brand transition-colors w-full"
    >
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="w-full md:w-[220px] h-48 mb-4 md:mb-0 md:mr-6 overflow-hidden rounded-lg flex items-center justify-center shrink-0">
          <img
            src={getThemeImage(project)}
            alt={project.title}
            className="w-full h-full object-contain rounded-md"
          />
        </div>

        <div className="flex flex-col flex-grow">
          <div className="mb-3">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-brand transition-colors mb-2">
              {project.github ? (
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  {project.title}
                </a>
              ) : (
                project.title
              )}
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 rounded border border-black"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <p
            className="text-gray-600 dark:text-gray-400 text-sm flex-grow mb-4"
            dangerouslySetInnerHTML={{ __html: boldText(project.description) }}
          />

          <div className="flex flex-wrap gap-4 mt-auto">
            <button
              onClick={() => toggleDetails(index)}
              aria-expanded={expandedIndex === index}
              className="flex items-center gap-2 text-sm font-medium text-brand transition-all duration-300 hover:scale-105"
            >
              <ChevronRight
                size={18}
                className={`transition-transform duration-300 ${expandedIndex === index ? "rotate-90" : ""}`}
              />
              <span className="inline-block w-14 text-left">{expandedIndex === index ? "Less" : "Details"}</span>
            </button>

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-brand hover:text-brand border border-brand rounded-lg px-2 py-1 transition-all duration-300 hover:scale-105"
              >
                <Github size={18} />
                <span>Code</span>
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand dark:hover:text-brand transition-all duration-300 hover:scale-105"
              >
                <ExternalLink size={18} />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {expandedIndex === index && (
          <motion.div
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-6 pt-6 border-t border-black space-y-5">
              {project.features?.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Features</h3>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-2">
                    {project.features.map((feature, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: boldText(feature) }} />
                    ))}
                  </ul>
                </div>
              )}
              {project.challenges && (
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Challenges</h3>
                  <p
                    className="text-gray-600 dark:text-gray-400"
                    dangerouslySetInnerHTML={{ __html: boldText(project.challenges) }}
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <div ref={sectionRef} id="projects" className="flex flex-col items-center w-full px-8 py-16 pt-36 relative">
      <div className="title-container">
        <motion.h1
          variants={variants}
          initial="hidden"
          whileInView="visible"
          whileHover={{ scale: 1.05 }}
          transition={{
            duration: 0.5,
            scale: { duration: 0.2 }
          }}
          onClick={(e) => e.currentTarget.closest("[id]").scrollIntoView({ behavior: "smooth" })} className="section-title no-underline cursor-pointer">
          Projects
        </motion.h1>
      </div>


      {/* ── Main Projects (one per row) ── */}
      <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto">
        {projects.map((project, index) => renderProjectCard(project, index))}
      </div>

      {/* ── Side Projects ── */}
      {sideProjects.length > 0 && (
        <div className="w-full max-w-[1400px] mt-16 mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-xl font-medium text-gray-500 dark:text-gray-400 text-center mb-8 tracking-wide uppercase"
          >
            For the Curiosity
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-base text-gray-400 dark:text-gray-500 text-center -mt-4 mb-4"
          >
            Smaller builds, weekend hacks, and rabbit holes explored along the way.
          </motion.p>

          <div className="flex flex-wrap justify-center gap-4 w-full">
            {sideProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group flex flex-col justify-between bg-[#f3f3f3] border border-black hover:border-brand transition-colors rounded-lg p-6 gap-4 w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] min-w-[320px]"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-brand transition-colors mb-2">
                    {project.github ? (
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        {project.title}
                      </a>
                    ) : (
                      project.title
                    )}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-brand hover:text-brand border border-brand rounded-lg px-2 py-1 transition-all duration-300 hover:scale-105 w-fit"
                  >
                    <Github size={18} />
                    <span>Code</span>
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;