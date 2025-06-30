import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import tech from "../data/techData.js";
import { useTheme } from "../context/ThemeContext";

const Tech = () => {
    const { theme } = useTheme();
    const [selectedTech, setSelectedTech] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div id="tech" className="flex flex-col items-center w-full px-8 py-16 pt-36">
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
                    Tech Stack
                </motion.h1>
            </div>

            <motion.p
                variants={variants}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.5 }}
                className="text-lg text-gray-700 dark:text-gray-300 text-center mb-12">
                Technologies I work with daily – from programming languages and frameworks to containerization tools, databases and cloud services.
            </motion.p>

            <div className="flex flex-wrap items-center justify-center gap-10 p-5">
                {tech.map((item, index) => (
                    <motion.div
                        key={index}
                        variants={variants}
                        initial="hidden"
                        whileInView="visible"
                        transition={{ duration: 0.5 }}
                        onMouseEnter={() => !isMobile && setSelectedTech(item)}
                        onMouseLeave={() => !isMobile && setSelectedTech(null)}
                        onClick={() => isMobile && setSelectedTech(item)}
                        className="cursor-pointer relative group flex flex-col items-center gap-3"
                    >
                        <img
                            src={item.image}
                            alt={item.name}
                            className="transition-all duration-300 hover:-translate-y-2 hover:scale-110 w-[80px] sm:w-[100px] md:w-[120px]"
                        />
                    </motion.div>
                ))}
            </div>

            <div className="mt-12 w-full max-w-3xl min-h-[150px]">
                {selectedTech ? (
                    <div className="p-6 bg-gray-100/50 dark:bg-black/50 backdrop-blur-md rounded-2xl border-gray-300 dark:border-white/10 border shadow-xl text-center transition-all duration-300">
                        <p className="font-semibold text-2xl text-gray-900 dark:text-white mb-4 tracking-wide">
                            {selectedTech.name} <span className="text-gray-600 dark:text-gray-400">{selectedTech.stackType}</span>
                        </p>
                        <ul className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-700 dark:text-gray-300">
                            {selectedTech.stack.map((item, i) => (
                                <li
                                    key={i}
                                    className="px-4 py-2 bg-gray-200/50 dark:bg-gray-800/50 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300/80 dark:hover:bg-gray-700/80 transition-all duration-300"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className="p-5 bg-gray-200/30 dark:bg-black/30 backdrop-blur-md rounded-2xl border-gray-300 dark:border-white/10 border shadow-lg text-center text-gray-600 dark:text-gray-400">
                        {isMobile ? "* Tap on any tech to explore more *" : "* Hover over any tech to explore more *"}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Tech;
