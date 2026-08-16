import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import blogs from "../data/blogsData";

const groupedByYear = blogs.reduce((acc, blog) => {
  const year = blog.date.trim().split(/\s+/).pop();
  (acc[year] = acc[year] || []).push(blog);
  return acc;
}, {});
const years = Object.keys(groupedByYear).sort((a, b) => b - a);

const getDefaultYear = () => years[0] ?? null;

const Blogs = () => {
  const [expandedYear, setExpandedYear] = useState(getDefaultYear);
  const sectionRef = useRef(null);

  const toggleYear = (year) => {
    setExpandedYear((prev) => (prev === year ? null : year));
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setExpandedYear(getDefaultYear());
        }
      },
      { threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} id="blogs" className="flex flex-col items-center w-full px-8 py-16 pt-36">
      <div className="title-container">
        <motion.h2
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.currentTarget.closest("[id]").scrollIntoView({ behavior: "smooth" })} className="section-title no-underline cursor-pointer">
          Blogs
        </motion.h2>
      </div>

      <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-12">
        Things I write about — engineering, systems, and lessons learned along the way.
      </p>

      <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto">
        {years.map((year) => (
          <div key={year} className="w-full">
            <button
              onClick={() => toggleYear(year)}
              aria-expanded={expandedYear === year}
              className="group w-full flex items-center gap-2 pb-2 border-b border-black hover:border-brand text-brand transition-colors"
            >
              <ChevronRight
                size={20}
                className={`transition-transform duration-300 ${expandedYear === year ? "rotate-90" : ""}`}
              />
              <span className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-brand transition-colors">{year}</span>
              <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">
                {groupedByYear[year].length} {groupedByYear[year].length === 1 ? "post" : "posts"}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {expandedYear === year && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-wrap justify-center gap-6 w-full mt-6">
                    {groupedByYear[year].map((blog, index) => (
                      <div
                        key={index}
                        className="group flex flex-col bg-[#f3f3f3] p-6 rounded-lg border border-black hover:border-brand transition-colors w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
                      >
                        {blog.date && (
                          <span className="mb-2 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            {blog.date}
                          </span>
                        )}
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-brand transition-colors">
                          <a href={blog.link} target="_blank" rel="noopener noreferrer">
                            {blog.title}
                          </a>
                        </h3>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
