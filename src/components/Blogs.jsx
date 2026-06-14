import { motion } from 'framer-motion';
import blogs from '../data/blogsData';

const Blogs = () => {
  return (
    <div id="blogs" className="flex flex-col items-center w-full px-8 py-16 pt-36">
      <div className="title-container">
        <motion.h1
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.currentTarget.closest("[id]").scrollIntoView({ behavior: "smooth" })} className="section-title no-underline cursor-pointer">
          Blogs
        </motion.h1>
      </div>

      <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-12">
        Things I write about — engineering, systems, and lessons learned along the way.
      </p>

      <div className="flex flex-wrap justify-center gap-6 w-full">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="group flex flex-col bg-[#f3f3f3] p-6 rounded-lg border border-black hover:border-brand transition-colors w-full max-w-md flex-shrink-0"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-brand transition-colors">
              <a href={blog.link} target="_blank" rel="noopener noreferrer">
                {blog.title}
              </a>
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
