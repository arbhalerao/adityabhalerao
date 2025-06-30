import React, { useState } from 'react';
import { motion } from 'framer-motion';
import contributions from '../data/ossData';
import { useTheme } from '../context/ThemeContext';

const OSS = () => {
  const { theme } = useTheme();
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  const totalPRs = contributions.reduce((acc, curr) => acc + curr.prs.length, 0);
  const totalIssues = contributions.reduce((acc, curr) => acc + curr.issues.length, 0);

  const [tabs, setTabs] = useState(
    Object.fromEntries(contributions.map((_, i) => [i, 'prs']))
  );

  return (
    <div id="oss" className="flex flex-col items-center w-full px-8 py-16 pt-36">
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
          OSS Contributions
        </motion.h1>
      </div>

      <motion.p
        variants={variants}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5 }}
        className="text-lg text-gray-700 dark:text-gray-300 text-center mb-6">
        Browse the <b>PRs</b> and <b>Issues</b> I've created in various open-source projects.
      </motion.p>

      <motion.div
        variants={variants}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5 }}
        className="flex flex-wrap justify-center gap-4 mb-12"
      >
        <motion.div
          whileHover={{ scale: 1.05, boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.15)" }}
          transition={{ duration: 0.2 }}
          className="bg-white dark:bg-black/80 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700 text-center w-28"
        >
          <p className="text-2xl font-bold text-black dark:text-white">{contributions.length}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Projects</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05, boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.15)" }}
          transition={{ duration: 0.2 }}
          className="bg-white dark:bg-black/80 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700 text-center w-28"
        >
          <p className="text-2xl font-bold" style={{ color: "#8957e5" }}>{totalPRs}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">PRs</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05, boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.15)" }}
          transition={{ duration: 0.2 }}
          className="bg-white dark:bg-black/80 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700 text-center w-28"
        >
          <p className="text-2xl font-bold" style={{ color: "#cf222e" }}>{totalIssues}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Issues</p>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
        {contributions.map((contribution, index) => {
          const tab = tabs[index];
          const filtered = tab === 'prs' ? contribution.prs : contribution.issues;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.04, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)" }}
              transition={{ duration: 0.5 }}
              className="flex flex-col h-[16rem] bg-gray-100/80 dark:bg-black/80 p-4 rounded-lg shadow-lg border border-gray-300 dark:border-gray-800 w-full"
            >
              {/* ─────── Row 1: Title, Description, Toggle ─────── */}
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">
                  <a
                    href={contribution.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    {contribution.title}
                  </a>
                </h2>

                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {contribution.summary}
                </p>

                <div className="flex gap-3">
                  {contribution.prs.length > 0 && (
                    <button
                      onClick={() => setTabs(prev => ({ ...prev, [index]: 'prs' }))}
                      className={`px-3 py-1 rounded text-xs font-medium ${tab === 'prs'
                        ? "bg-sky-400 dark:bg-blue-600 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                        }`}
                    >
                      PRs
                    </button>
                  )}

                  {contribution.issues.length > 0 && (
                    <button
                      onClick={() => setTabs(prev => ({ ...prev, [index]: 'issues' }))}
                      className={`px-3 py-1 rounded text-xs font-medium ${tab === 'issues'
                        ? "bg-sky-400 dark:bg-blue-600 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                        }`}
                    >
                      Issues
                    </button>
                  )}
                </div>

              </div>

              {/* ─────── Row 2: Scrollable List ─────── */}
              <div className="overflow-y-auto flex-1 mt-4 pr-1">
                <ul className="space-y-2 text-sm">
                  {filtered.length === 0 ? (
                    <li className="text-gray-500 dark:text-gray-400 italic">
                      No {tab.toUpperCase()}s
                    </li>
                  ) : (
                    filtered.map((item, i) => (
                      <li key={i}>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline"
                        >
                          ➜{" "}
                          {tab === "prs" && (
                            <span className="text-gray-600 dark:text-gray-400">
                              [{item.kind}]
                            </span>
                          )}{" "}
                          {item.title}
                        </a>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default OSS;
