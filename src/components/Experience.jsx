import { motion } from "framer-motion";
import experiences from "../data/experienceData";
import { useTheme } from "../context/ThemeContext";

const Experience = () => {
    const { theme } = useTheme();
    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    };

    const boldText = (text) => {
        return text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    };

    return (
        <div id="experience" className="flex flex-col items-center w-full px-8 py-16 pt-36">
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
                    Experience
                </motion.h1>
            </div>

            <div className="flex flex-col gap-16 w-full max-w-7xl">
                {experiences.map((exp, index) => (
                    <motion.div
                        key={exp.company}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.04, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)" }}
                        transition={{ duration: 0.5 }}
                        className="bg-gray-100/80 dark:bg-black/80 p-6 rounded-lg shadow-lg border border-gray-300 dark:border-gray-800 flex items-start gap-6"
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
                                    alt={`${exp.company} Logo`}
                                    className="max-w-full max-h-full object-contain rounded-lg transition-all duration-300 hover:scale-110"
                                />
                            </div>
                        </a>

                        {/* Company Info */}
                        <div>
                            {/* Company Name (Visible as a link on small screens) */}
                            <a
                                href={exp.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xl font-semibold text-gray-900 dark:text-white md:text-2xl block sm:hidden hover:underline"
                            >
                                {exp.company}
                            </a>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white md:text-2xl hidden sm:block">
                                {exp.company}
                            </h2>
                            <h3 className="text-lg text-gray-600 dark:text-gray-400">{exp.role}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-500">{exp.duration}</p>

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
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Experience;