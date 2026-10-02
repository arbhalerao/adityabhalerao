import tech from "../data/techData.js";
import Section from "./Section";

/*
 * Laid out like Experience: the category is the entry (depth-1, same as a
 * company name) and each tool sits a rung down at depth-3, same as a project
 * name. The stack shares the tool's size and weight and is set apart by colour.
 */
const Tech = () => (
  <Section id="tech" title="Tech" intro="Languages, tools, and infrastructure I work with">
    <div className="space-y-10">
      {tech.map((group) => (
        <article key={group.category}>
          <h3 className="depth-1">{group.category}</h3>

          <dl className="mt-4 space-y-4 sm:space-y-2.5">
            {group.items.map((item) => (
              <div key={item.name} className="sm:flex sm:gap-6">
                <dt className="depth-3 shrink-0 sm:w-56">{item.name}</dt>
                <dd className="depth-3 text-muted">{item.stack.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </article>
      ))}
    </div>
  </Section>
);

export default Tech;
