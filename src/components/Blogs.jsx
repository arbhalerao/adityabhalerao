import blogs from "../data/blogsData";
import Section from "./Section";

const groupedByYear = blogs.reduce((acc, blog) => {
  const year = blog.date.trim().split(/\s+/).pop();
  (acc[year] = acc[year] || []).push(blog);
  return acc;
}, {});

const years = Object.keys(groupedByYear).sort((a, b) => b - a);

/** "Jun 14, 2026" -> "Jun 14"; the year is already the group heading. */
const dayAndMonth = (date) => date.replace(/,?\s*\d{4}\s*$/, "");

const Blogs = () => (
  <Section
    id="blogs"
    title="Writing"
    intro={`${blogs.length} posts, all on Medium`}
  >
    <div className="space-y-8">
      {years.map((year) => (
        <div key={year}>
          <h3 className="depth-1">{year}</h3>
          <ul className="mt-3 space-y-3 sm:space-y-2">
            {groupedByYear[year].map((blog) => (
              <li key={blog.link} className="depth-2 sm:flex sm:gap-4">
                <span className="meta block w-20 shrink-0 sm:pt-1.5">{dayAndMonth(blog.date)}</span>
                <a href={blog.link} target="_blank" rel="noopener noreferrer" className="link">
                  {blog.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </Section>
);

export default Blogs;
