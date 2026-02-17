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

  const sortedContributions = [...contributions].sort((a, b) => a.priority - b.priority);

  const totalPRs = sortedContributions.reduce((acc, curr) => acc + curr.prs.length, 0);
  const totalIssues = sortedContributions.reduce((acc, curr) => acc + curr.issues.length, 0);

  const [tabs, setTabs] = useState(
    Object.fromEntries(sortedContributions.map((_, i) => [i, 'prs']))
  );

  const getStatusIndicator = (status) => {
    switch (status) {
      case 'merged':
        return {
          icon: '/gh-pr-merged.svg',
          title: 'Merged',
          altText: 'Merged PR'
        };
      case 'open':
        return {
          icon: '/gh-pr-open.svg',
          title: 'Open',
          altText: 'Open PR'
        };
      case 'closed':
        return {
          icon: '/gh-pr-closed.svg',
          title: 'Closed',
          altText: 'Closed PR'
        };
      default:
        return {
          icon: null,
          title: 'Unknown',
          altText: 'Unknown status'
        };
    }
  };

  const renderContributionCard = (contribution, originalIndex) => {
    const tab = tabs[originalIndex];
    const filtered = tab === 'prs' ? contribution.prs : contribution.issues;

    return (
      <motion.div
        key={originalIndex}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)" }}
        transition={{ duration: 0.5 }}
        className="flex flex-col bg-gray-100/80 dark:bg-black/80 p-4 rounded-lg shadow-lg border border-gray-300 dark:border-gray-800 w-full"
      >
        <div className="space-y-3">
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
                onClick={() => setTabs(prev => ({ ...prev, [originalIndex]: 'prs' }))}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors duration-200 ${tab === 'prs'
                  ? "bg-sky-400 dark:bg-blue-600 text-white"
                  : "border border-sky-400 dark:border-blue-600 text-sky-400 dark:text-blue-500"
                  }`}
              >
                PRs
              </button>
            )}

            {contribution.issues.length > 0 && (
              <button
                onClick={() => setTabs(prev => ({ ...prev, [originalIndex]: 'issues' }))}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors duration-200 ${tab === 'issues'
                  ? "bg-sky-400 dark:bg-blue-600 text-white"
                  : "border border-sky-400 dark:border-blue-600 text-sky-400 dark:text-blue-500"
                  }`}
              >
                Issues
              </button>
            )}
          </div>

          <div className="pt-2">
            <ul className="space-y-2 text-sm">
              {filtered.length === 0 ? (
                <li className="text-gray-500 dark:text-gray-400 italic">
                  No {tab.toUpperCase()}s
                </li>
              ) : (
                filtered.map((item, i) => {
                  const statusInfo = item.status ? getStatusIndicator(item.status) : null;

                  return (
                    <li key={i} className="flex items-start gap-2">
                      {tab === "prs" && statusInfo && statusInfo.icon ? (
                        <img
                          src={statusInfo.icon}
                          alt={statusInfo.altText}
                          title={statusInfo.title}
                          className="w-4 h-4 flex-shrink-0 mt-0.5"
                        />
                      ) : tab === "issues" ? (
                        <img
                          src="/gh-issue.svg"
                          alt="GitHub Issue"
                          title="Issue"
                          className="w-4 h-4 flex-shrink-0 mt-0.5"
                        />
                      ) : (
                        <span className="text-blue-400 flex-shrink-0 mt-0.5">➜</span>
                      )}

                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline leading-relaxed"
                      >
                        {tab === "prs" && (
                          <span className="text-gray-600 dark:text-gray-400">
                            [{item.kind}]
                          </span>
                        )}{" "}
                        {item.title}
                      </a>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        </div>
      </motion.div>
    );
  };

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
          <p className="text-2xl font-bold text-black dark:text-white">{sortedContributions.length}</p>
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

      <div className="flex flex-col sm:flex-row sm:gap-6 w-full">
        <div className="flex flex-col gap-6 w-full sm:w-1/2">
          {sortedContributions
            .filter((_, index) => index % 2 === 0)
            .map((contribution, filteredIndex) => {
              const originalIndex = filteredIndex * 2;
              return renderContributionCard(contribution, originalIndex);
            })}
        </div>

        <div className="flex flex-col gap-6 w-full sm:w-1/2">
          {sortedContributions
            .filter((_, index) => index % 2 === 1)
            .map((contribution, filteredIndex) => {
              const originalIndex = filteredIndex * 2 + 1;
              return renderContributionCard(contribution, originalIndex);
            })}
        </div>
      </div>
    </div>
  );
};

export default OSS;
