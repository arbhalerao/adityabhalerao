import { motion } from 'framer-motion';
import blogs from '../data/blogsData';

const Blogs = () => {
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div id="blogs" className="flex flex-col items-center w-full px-8 py-16 pt-36">
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
          onClick={(e) => e.currentTarget.closest("[id]").scrollIntoView({ behavior: "smooth" })} className="section-title no-underline cursor-pointer">
          Blogs
        </motion.h1>
      </div>

      <motion.p
        variants={variants}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5 }}
        className="text-lg text-gray-700 dark:text-gray-300 text-center mb-12">
        Things I write about — engineering, systems, and lessons learned along the way.
      </motion.p>

      <div className="flex flex-wrap justify-center gap-6 w-full">
        {blogs.map((blog, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="group flex flex-col bg-[#f3f3f3] p-6 rounded-lg border border-black hover:border-brand transition-colors w-full max-w-md flex-shrink-0"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-brand transition-colors">
              <a href={blog.link} target="_blank" rel="noopener noreferrer">
                {blog.title}
              </a>
            </h2>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
