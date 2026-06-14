import { motion } from "framer-motion";
import tech from "../data/techData.js";
import { useTheme } from "../context/ThemeContext";

const Tech = () => {
    const { theme } = useTheme();

    return (
        <div id="tech" className="flex flex-col items-center w-full px-8 py-16 pt-36">
            <div className="title-container">
                <motion.h1
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    onClick={(e) => e.currentTarget.closest("[id]").scrollIntoView({ behavior: "smooth" })} className="section-title no-underline cursor-pointer">
                    Tech Stack
                </motion.h1>
            </div>

            <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-12">
                Technologies I work with daily – from programming languages and frameworks to containerization tools, databases and cloud services.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-10 p-5">
                {tech.map((item, index) => (
                    <div
                        key={index}
                        className="cursor-pointer relative group flex flex-col items-center gap-3"
                    >
                        <img
                            src={item.image}
                            alt={item.name}
                            title={item.name}
                            className="transition-all duration-300 hover:-translate-y-2 hover:scale-110 w-[60px] sm:w-[80px] md:w-[100px]"
                        />
                        <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-brand bg-[#f3f3f3] px-2 py-1 text-sm font-medium text-brand opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                            {item.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tech;
