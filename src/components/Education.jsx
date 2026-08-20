import education from "../data/educationData";
import Section from "./Section";

/** A labelled list, rendered only when the entry actually carries one. */
const Detail = ({ label, items }) =>
  items?.length ? (
    <div className="mt-2 sm:flex sm:gap-4">
      <span className="meta w-24 shrink-0 sm:pt-0.5">{label}</span>
      <p className="depth-4 text-body">{items.join(", ")}</p>
    </div>
  ) : null;

/**
 * Institution and location on the first line, qualification and dates on the
 * second, CGPA or percentage below. Both right-hand items are metadata, so they
 * share the same column edge as the dates in Experience.
 */
const Education = () => (
  <Section id="education" title="Education" intro="Degrees and grades">
    <div className="space-y-8">
      {education.map((entry) => (
        <article key={entry.institution}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <h3 className="depth-1 font-medium">{entry.institution}</h3>
            <span className="meta whitespace-nowrap">{entry.location}</span>
          </div>

          <div className="mt-1 flex flex-wrap items-baseline justify-between gap-x-4">
            <p className="depth-2 text-muted">{entry.degree}</p>
            <span className="meta whitespace-nowrap">{entry.duration}</span>
          </div>

          {entry.grade ? <p className="meta mt-0.5">{entry.grade}</p> : null}

          <Detail label="coursework" items={entry.coursework} />
          <Detail label="highlights" items={entry.highlights} />
          <Detail label="activities" items={entry.activities} />
        </article>
      ))}
    </div>
  </Section>
);

export default Education;
