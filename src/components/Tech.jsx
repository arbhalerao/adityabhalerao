import tech from "../data/techData.js";
import Section from "./Section";

/* The stack skips depth-2 for depth-3: keywords, not prose — at 16px they crowd the names. */
const Tech = () => (
  <Section id="tech" title="Tech" intro="Languages, tools, and infrastructure I work with">
    <dl className="space-y-2.5">
      {tech.map((item) => (
        <div key={item.name} className="sm:flex sm:gap-6">
          <dt className="depth-1 shrink-0 font-medium sm:w-56">
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="link">
              {item.name}
            </a>
          </dt>
          <dd className="depth-3 pt-0.5 text-muted">{item.stack.join(", ")}</dd>
        </div>
      ))}
    </dl>
  </Section>
);

export default Tech;
