import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import experiences from "../data/experienceData";
import { useTheme } from "../context/ThemeContext";

const Experience = () => {
    const { theme } = useTheme();
    const [expandedIndex, setExpandedIndex] = useState(null);
    const sectionRef = useRef(null);

    const toggleDetails = (index) => {
        setExpandedIndex((prev) => (prev === index ? null : index));
    };

    // Collapse any open details once the Experience section is fully out of view.
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

    const boldText = (text) => {
        return text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    };

    return (
        <div ref={sectionRef} id="experience" className="flex flex-col items-center w-full px-8 py-16 pt-36">
            <div className="title-container">
                <motion.h2
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    onClick={(e) => e.currentTarget.closest("[id]").scrollIntoView({ behavior: "smooth" })} className="section-title no-underline cursor-pointer">
                    Experience
                </motion.h2>
            </div>

            <div className="flex flex-col gap-16 w-full max-w-5xl mx-auto">
                {experiences.map((exp, index) => (
                    <div
                        key={exp.company}
                        className="group bg-[#f3f3f3] p-6 rounded-lg border border-black hover:border-brand transition-colors flex items-start gap-6"
                    >
                        <a
                            href={exp.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:block"
                        >
                            <div className="w-16 h-16 flex items-center justify-center rounded-lg">
                                <img
                                    src={exp.logo}
                                    alt={`${exp.company} logo`}
                                    width="200"
                                    height="200"
                                    loading="lazy"
                                    decoding="async"
                                    className="max-w-full max-h-full object-contain rounded-lg transition-all duration-300 hover:scale-110"
                                />
                            </div>
                        </a>

                        {/* Company Info */}
                        <div>
                            {/* Company Name (also the only visible link to the company on small screens) */}
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-brand transition-colors md:text-2xl">
                                <a href={exp.link} target="_blank" rel="noopener noreferrer">
                                    {exp.company}
                                </a>
                            </h3>
                            <p className="text-lg text-gray-600 dark:text-gray-400">{exp.role}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-500">{exp.duration}</p>

                            <button
                                onClick={() => toggleDetails(index)}
                                aria-expanded={expandedIndex === index}
                                className="mt-3 flex items-center gap-2 text-sm font-medium text-brand transition-all duration-300 hover:scale-105"
                            >
                                <ChevronRight
                                    size={18}
                                    className={`transition-transform duration-300 ${expandedIndex === index ? "rotate-90" : ""}`}
                                />
                                <span>{expandedIndex === index ? "Less" : "Details"}</span>
                            </button>

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
                                        <div className="mt-4">
                                            {exp.projects.map((project, projectIndex) => (
                                                <div key={projectIndex} className={projectIndex > 0 ? "mt-4" : ""}>
                                                    {project.name && (
                                                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                                            {project.name}
                                                        </h4>
                                                    )}
                                                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
                                                        {project.achievements.map((achievement, achievementIndex) => (
                                                            <li
                                                                key={achievementIndex}
                                                                className="mb-1"
                                                                dangerouslySetInnerHTML={{ __html: boldText(achievement) }}
                                                            />
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Experience;