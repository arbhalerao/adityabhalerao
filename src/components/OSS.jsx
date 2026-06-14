import React, { useState } from 'react';
import { motion } from 'framer-motion';
import contributions from '../data/ossData';
import { useTheme } from '../context/ThemeContext';

const OSS = () => {
  const { theme } = useTheme();

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
      <div
        key={originalIndex}
        className="group flex flex-col bg-[#f3f3f3] p-4 rounded-lg border border-black hover:border-brand transition-colors w-full"
      >
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-brand transition-colors">
            <a
              href={contribution.link}
              target="_blank"
              rel="noopener noreferrer"
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
                  ? "bg-brand/80 dark:bg-brand/80 text-white"
                  : "border border-brand dark:border-brand text-brand dark:text-brand"
                  }`}
              >
                PRs
              </button>
            )}

            {contribution.issues.length > 0 && (
              <button
                onClick={() => setTabs(prev => ({ ...prev, [originalIndex]: 'issues' }))}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors duration-200 ${tab === 'issues'
                  ? "bg-brand/80 dark:bg-brand/80 text-white"
                  : "border border-brand dark:border-brand text-brand dark:text-brand"
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
                        <span className="text-brand flex-shrink-0 mt-0.5">➜</span>
                      )}

                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-400 hover:text-brand transition-colors leading-relaxed"
                      >
                        {tab === "prs" && (
                          <span>
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
      </div>
    );
  };

  return (
    <div id="oss" className="flex flex-col items-center w-full px-8 py-16 pt-36">
      <div className="title-container">
        <motion.h1
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.currentTarget.closest("[id]").scrollIntoView({ behavior: "smooth" })} className="section-title no-underline cursor-pointer">
          OSS Contributions
        </motion.h1>
      </div>

      <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-6">
        Browse the PRs and Issues I've created in various open-source projects.
      </p>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <div className="group bg-[#f3f3f3] p-4 rounded-lg border border-black hover:border-brand transition-colors text-center w-28">
          <p className="text-2xl font-bold text-black dark:text-white group-hover:text-brand transition-colors">{sortedContributions.length}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Projects</p>
        </div>
        <div className="group bg-[#f3f3f3] p-4 rounded-lg border border-black hover:border-brand transition-colors text-center w-28">
          <p className="text-2xl font-bold text-black dark:text-white group-hover:text-brand transition-colors">{totalPRs}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">PRs</p>
        </div>
        <div className="group bg-[#f3f3f3] p-4 rounded-lg border border-black hover:border-brand transition-colors text-center w-28">
          <p className="text-2xl font-bold text-black dark:text-white group-hover:text-brand transition-colors">{totalIssues}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Issues</p>
        </div>
      </div>

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
