import React from 'react';
import { motion } from 'framer-motion';
import papers from '../data/papershelfData';
import { useTheme } from '../context/ThemeContext';

const Papershelf = () => {
  const { theme } = useTheme();

  return (
    <div id="papershelf" className="flex flex-col items-center w-full px-8 py-16 pt-36">
      <div className="title-container">
        <motion.h1
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.currentTarget.closest("[id]").scrollIntoView({ behavior: "smooth" })} className="section-title no-underline cursor-pointer">
          Papershelf
        </motion.h1>
      </div>

      <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-12">
        A collection of research papers I've found insightful. These papers span various fields and have broadened my understanding of different concepts.
      </p>

      <div className="flex flex-wrap justify-center gap-6 w-full">
        {papers.map((paper, index) => (
          <div
            key={index}
            className="group flex flex-col bg-[#f3f3f3] p-6 rounded-lg border border-black hover:border-brand transition-colors w-full max-w-md flex-shrink-0"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-brand transition-colors mb-3">
              <a href={paper.link} target="_blank" rel="noopener noreferrer">
                {paper.title}
              </a>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-0 flex-grow">{paper.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Papershelf;