import React from 'react';
import { motion } from 'framer-motion';
import papers from '../data/papershelfData';
import { useTheme } from '../context/ThemeContext';

const Papershelf = () => {
  const { theme } = useTheme();

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div id="papershelf" className="flex flex-col items-center w-full px-8 py-16 pt-36">
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
          Papershelf
        </motion.h1>
      </div>

      <motion.p
        variants={variants}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5 }}
        className="text-lg text-gray-700 dark:text-gray-300 text-center mb-12">
        A collection of research papers I've found insightful. These papers span various fields and have broadened my understanding of different concepts.
      </motion.p>

      <div className="flex flex-wrap justify-center gap-6 w-full">
        {papers.map((paper, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.04, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)" }}
            transition={{ duration: 0.5 }}
            className="bg-gray-100/80 dark:bg-black/80 p-6 rounded-lg shadow-lg border border-gray-300 dark:border-gray-800 w-full max-w-md flex-shrink-0"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{paper.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">{paper.summary}</p>
            <a
              href={paper.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline mt-4 inline-block"
            >
              Read Paper
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Papershelf;

