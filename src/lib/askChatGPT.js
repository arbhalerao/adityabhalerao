/**
 * The "ask ChatGPT about me" link. The prompt is assembled from the same data
 * files the sections render, so it never drifts from what the site says.
 *
 * It asks ChatGPT to browse the live site first, and carries a compact snapshot
 * for when it can't. The snapshot stays short on purpose: the whole prompt rides
 * in the URL, and long ?q= values get truncated or rejected.
 */
import blogs from "../data/blogsData";
import education from "../data/educationData";
import experiences from "../data/experienceData";
import contributions from "../data/ossData";
import papers from "../data/papershelfData";
import { projects } from "../data/projectsData";
import tech from "../data/techData";
import { PERSON, PROFILES, SITE_URL } from "../seo/siteMeta";

const plain = (text) => text.replace(/\*\*/g, "");

// The first clause of a project description: the "what", without the detail.
const gist = (text) => plain(text).split(/ - |\. |, (?=[a-z])/)[0].replace(/\.$/, "");

// The headline of an achievement, up to its first clause break.
const headline = (text) => plain(text).split(/, |—/)[0].replace(/\.$/, "");

const experienceBlock = ({ role, company, duration, projects }) =>
  [
    `- ${role}, ${company} (${duration})`,
    ...projects.flatMap(({ name, achievements }) =>
      achievements.map((a) => `  - ${name ? `${name}: ` : ""}${headline(a)}`)
    ),
  ].join("\n");

const ossLine = ({ title, prs }) => {
  const merged = prs.filter((pr) => pr.status === "merged").length;
  const open = prs.length - merged;
  const counts = [merged && `${merged} merged`, open && `${open} open`].filter(Boolean);
  return `${title} (${counts.join(", ")} PR${prs.length > 1 ? "s" : ""})`;
};

const [degree] = education;

const prompt = `Hey! Who's ${PERSON.name}? I just came across his site: ${SITE_URL}

Have a look around (his GitHub ${PROFILES.github} and blog ${PROFILES.medium} too, if you can) and tell me about him, like you're telling a friend about a cool engineer you found.

Here's what's on his site, in case you can't open it:
Now: ${PERSON.jobTitle} at ${PERSON.employer.name}, ${PERSON.locality}, India

At work:
${experiences.map(experienceBlock).join("\n")}

Beyond work:
- Projects: ${projects.map((p) => `${p.title} (${gist(p.description)})`).join("; ")}
- Open source: ${contributions.filter((c) => c.prs.length).map(ossLine).join("; ")}
- Tech: ${tech.flatMap((group) => group.items.map((item) => item.name)).join(", ")}
- Education: ${degree.degree}, ${degree.institution}, ${degree.grade} (${degree.duration})
- Recent writing: ${blogs.slice(0, 5).map((b) => `"${b.title}"`).join(", ")}
- Papers he's studied: ${papers.map((p) => p.title).join("; ")}

What's he working on, what's the coolest stuff he's built, and what is he clearly into? Keep it short, casual and fun to read, no formal report, no critique. And if I want to say hi, he's at ${SITE_URL}/contact.`;

// hints=search turns on web search, so it can read the live site.
export const ASK_CHATGPT_URL = `https://chatgpt.com/?hints=search&q=${encodeURIComponent(prompt)}`;
