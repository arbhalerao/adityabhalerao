import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ChevronRight, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { projects, sideProjects } from "../data/projectsData.js";

const Projects = () => {
  const { theme } = useTheme();
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  const boldText = (text) => {
    return text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
  };

  const openProjectDetails = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Close modal on Escape key press
  useEffect(() => {
    const handleEscapeKeyPress = (e) => {
      if (showModal && e.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleEscapeKeyPress);
    return () => {
      window.removeEventListener('keydown', handleEscapeKeyPress);
    };
  }, [showModal]);

  const getThemeImage = (project) => {
    return theme === 'dark' ? project.images.dark : project.images.light;
  };

  return (
    <div id="projects" className="flex flex-col items-center w-full px-8 py-16 pt-36 relative">
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
          className="section-title no-underline">
          Projects
        </motion.h1>
      </div>


      {/* ── Main Projects ── */}
      <div className="flex flex-wrap justify-center gap-8 w-full">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.04, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row h-full bg-gray-100/80 dark:bg-black/80 p-6 rounded-lg shadow-lg border border-gray-300 dark:border-gray-800 w-full max-w-2xl flex-shrink-0"
          >
            <div className="w-full md:w-1/3 h-48 md:h-auto md:min-h-[12rem] mb-4 md:mb-0 md:mr-6 overflow-hidden rounded-lg flex items-center justify-center shrink-0">
              <img
                src={getThemeImage(project)}
                alt={project.title}
                className="w-auto h-auto max-w-full max-h-full object-contain transition-all duration-500 hover:scale-110 rounded-md"
              />
            </div>

            <div className="flex flex-col flex-grow">
              <div className="mb-3">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs font-medium bg-gray-300/90 dark:bg-gray-700/70 text-gray-700 dark:text-gray-300 rounded"
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
                  onClick={() => openProjectDetails(project)}
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors duration-300"
                >
                  <ChevronRight size={18} />
                  <span>Details</span>
                </button>

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-orange-400 hover:text-orange-500 border border-orange-600 rounded-lg px-2 py-1 transition-all duration-300 hover:scale-105"
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
                    className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-sky-500 dark:hover:text-sky-400 transition-all duration-300 hover:scale-105"
                  >
                    <ExternalLink size={18} />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
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
                whileHover={{ scale: 1.04, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)" }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex flex-col justify-between bg-gray-100/80 dark:bg-black/80 border border-gray-300 dark:border-gray-800 rounded-lg p-6 gap-4 w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] min-w-[320px]"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {project.title}
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
                    className="flex items-center gap-2 text-sm font-medium text-orange-400 hover:text-orange-500 border border-orange-600 rounded-lg px-2 py-1 transition-all duration-300 hover:scale-105 w-fit"
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

      {/* ── Modal ── */}
      <AnimatePresence>
        {showModal && selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={closeModal}
              style={{ pointerEvents: 'auto' }}
            />

            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "tween", duration: 0.15, ease: "easeOut" }}
                className="bg-gray-100 dark:bg-black overflow-y-auto rounded-xl shadow-2xl border border-gray-300 dark:border-gray-700 max-w-6xl w-full max-h-[90vh] pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {selectedProject.title}
                    </h2>
                    <button
                      onClick={closeModal}
                      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-300"
                      aria-label="Close modal"
                    >
                      <X size={24} className="text-gray-700 dark:text-gray-300" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <div className="lg:col-span-1">
                      <div className="w-full h-48 md:h-64 overflow-hidden rounded-lg flex items-center justify-center p-4">
                        <img
                          src={getThemeImage(selectedProject)}
                          alt={selectedProject.title}
                          className="w-auto h-auto max-w-full max-h-full object-contain rounded-lg shadow-md"
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 mt-4 justify-center">
                        {selectedProject.github && (
                          <a
                            href={selectedProject.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 rounded-lg border border-orange-600 bg-gray-100 dark:bg-black px-4 py-2 text-orange-400 transition-all duration-300 hover:scale-105 w-full"
                          >
                            <Github size={16} />
                            <span className="font-medium">Code</span>
                          </a>
                        )}
                        {selectedProject.demo && (
                          <a
                            href={selectedProject.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-sky-500 text-white hover:bg-sky-600 rounded-lg transition-colors duration-300 w-full"
                          >
                            <ExternalLink size={16} />
                            <span className="font-medium">Live Demo</span>
                          </a>
                        )}
                      </div>

                      <div className="mt-4">
                        <h3 className="font-medium text-gray-900 dark:text-white mb-2">Technologies:</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 text-xs font-medium bg-gray-300/90 dark:bg-gray-700/70 text-gray-700 dark:text-gray-300 rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-2">
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white mb-2">Description:</h3>
                          <p
                            className="text-gray-600 dark:text-gray-400"
                            dangerouslySetInnerHTML={{ __html: boldText(selectedProject.description) }}
                          />
                        </div>

                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white mb-2">Features:</h3>
                          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-2">
                            {selectedProject.features?.map((feature, i) => (
                              <li
                                key={i}
                                dangerouslySetInnerHTML={{ __html: boldText(feature) }}
                              />
                            ))}
                          </ul>
                        </div>

                        {selectedProject.challenges && (
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Challenges:</h3>
                            <p
                              className="text-gray-600 dark:text-gray-400"
                              dangerouslySetInnerHTML={{ __html: boldText(selectedProject.challenges) }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;