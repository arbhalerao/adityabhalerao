import { projects, sideProjects } from "../data/projectsData.js";
import { suppressMultiClickSelect } from "../lib/dom";
import { plain } from "../lib/markup";
import Section from "./Section";

const Projects = () => (
  <Section id="projects" title="Projects" intro="Things built outside work">
    <div className="space-y-12">
      {projects.map((project) => (
        <article key={project.title}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <h3 className="depth-1 font-medium">
              {project.github ? (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="link">
                  {project.title}
                </a>
              ) : (
                project.title
              )}
            </h3>
            <span className="meta">{project.technologies.join(" · ")}</span>
          </div>

          <p className="depth-2 mt-1.5 text-body">{plain(project.description)}</p>

          {/* The group MUST stay named: this <details> is nested inside the section's
              own, and an unnamed `group-open:` resolves against the nearest ancestor
              `.group[open]` — the marker then tracks the section, not the project. */}
          {project.features?.length > 0 || project.challenges ? (
            <details className="group/project mt-3">
              <summary
                onMouseDown={suppressMultiClickSelect}
                className="meta cursor-pointer select-none list-none hover:text-brand"
              >
                <span className="group-open/project:hidden">+ details</span>
                <span className="hidden group-open/project:inline">− details</span>
              </summary>

              {project.features?.length > 0 ? (
                <ul className="depth-3 mt-3 list-disc space-y-1.5 pl-5 text-body marker:text-rule">
                  {project.features.map((feature) => (
                    <li key={feature}>{plain(feature)}</li>
                  ))}
                </ul>
              ) : null}

              {project.challenges ? (
                <p className="depth-3 mt-3 text-body">{plain(project.challenges)}</p>
              ) : null}
            </details>
          ) : null}

          {project.demo ? (
            <p className="meta mt-3">
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="link">
                live demo
              </a>
            </p>
          ) : null}
        </article>
      ))}
    </div>

    {sideProjects.length > 0 ? (
      <div className="mt-12">
        <h3 className="depth-1 font-medium text-muted">
          Smaller builds
        </h3>
        <div className="mt-5 space-y-6">
          {sideProjects.map((project) => (
            <article key={project.title}>
              <h4 className="depth-2 font-medium">
                {project.github ? (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="link">
                    {project.title}
                  </a>
                ) : (
                  project.title
                )}
              </h4>
              <p className="depth-3 mt-1 text-body">{project.description}</p>
            </article>
          ))}
        </div>
      </div>
    ) : null}
  </Section>
);

export default Projects;
