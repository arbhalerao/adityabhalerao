import { SECTIONS } from "./seo/siteMeta";

import Tech from "./components/Tech";
import Experience from "./components/Experience";
import Education from "./components/Education";
import OSS from "./components/OSS";
import Projects from "./components/Projects";
import Blogs from "./components/Blogs";
import Papershelf from "./components/Papershelf";
import Contact from "./components/Contact";

/**
 * Binds the section ids in siteMeta.js to their components. Kept apart from
 * siteMeta so that file stays JSX-free for scripts/prerender.mjs to import.
 */
const COMPONENTS = {
  tech: Tech,
  experience: Experience,
  education: Education,
  oss: OSS,
  projects: Projects,
  blogs: Blogs,
  papershelf: Papershelf,
  contact: Contact,
};

const missing = SECTIONS.filter(({ id }) => !COMPONENTS[id]).map(({ id }) => id);
if (missing.length) throw new Error(`sections.jsx has no component for: ${missing.join(", ")}`);

/** In page order, so the homepage and the routes can't fall out of sync. */
export const sections = SECTIONS.map((section) => ({
  ...section,
  Component: COMPONENTS[section.id],
}));

export const componentFor = (id) => COMPONENTS[id] ?? null;
