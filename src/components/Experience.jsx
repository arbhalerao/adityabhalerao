import experiences from "../data/experienceData";
import { plain } from "../lib/markup";
import Section from "./Section";

const firstYear = experiences[experiences.length - 1].duration.match(/\d{4}/)[0];
const intro = `${experiences.length} backend roles since ${firstYear}`;

const Experience = () => (
  <Section id="experience" title="Experience" intro={intro}>
    <div className="space-y-10">
      {experiences.map((exp) => (
        <article key={exp.company}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <h3 className="depth-1 font-medium">
              <a href={exp.link} target="_blank" rel="noopener noreferrer" className="link">
                {exp.company}
              </a>
            </h3>
            <span className="meta whitespace-nowrap">{exp.duration}</span>
          </div>
          <p className="depth-2 mt-1 text-muted">{exp.role}</p>

          {exp.projects.map((project, i) => (
            <div key={project.name ?? i} className="mt-4">
              {project.name ? <h4 className="depth-3 font-medium">{project.name}</h4> : null}
              <ul className="depth-4 mt-2 list-disc space-y-1.5 pl-5 text-body marker:text-rule">
                {project.achievements.map((achievement) => (
                  <li key={achievement}>{plain(achievement)}</li>
                ))}
              </ul>
            </div>
          ))}
        </article>
      ))}
    </div>
  </Section>
);

export default Experience;
