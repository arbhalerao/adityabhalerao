import contributions from "../data/ossData";
import Section from "./Section";

const byPriority = [...contributions].sort((a, b) => a.priority - b.priority);
const totalPRs = byPriority.reduce((acc, c) => acc + c.prs.length, 0);
const totalIssues = byPriority.reduce((acc, c) => acc + c.issues.length, 0);

/**
 * The two fixed-width metadata columns — status, then kind — that every row
 * leads with, so titles line up down a single left edge.
 *
 * `sm:contents` drops this wrapper out of the layout from sm up, letting the
 * two cells become flex children of the row itself; below sm they stay on
 * their own line above the title rather than squeezing it into a sliver.
 */
const Tags = ({ status, kind }) => (
  <span className="meta flex gap-3 sm:contents">
    <span className="w-16 shrink-0 sm:pt-1">{status}</span>
    <span className="w-16 shrink-0 sm:pt-1">{kind}</span>
  </span>
);

const OSS = () => (
  <Section
    id="oss"
    title="Open source"
    intro={`${totalPRs} pull requests and ${totalIssues} issues across ${byPriority.length} projects`}
  >
    <div className="space-y-8">
      {byPriority.map((contribution) => (
        <article key={contribution.title}>
          <h3 className="depth-1 font-medium">
            <a href={contribution.link} target="_blank" rel="noopener noreferrer" className="link">
              {contribution.title}
            </a>
          </h3>
          <p className="depth-2 mt-1 text-body">{contribution.summary}</p>

          <ul className="depth-3 mt-3 space-y-2">
            {contribution.prs.map((pr) => (
              <li key={pr.link} className="sm:flex sm:gap-3">
                <Tags status={pr.status} kind={pr.kind.toLowerCase()} />
                <a href={pr.link} target="_blank" rel="noopener noreferrer" className="link">
                  {pr.title}
                </a>
              </li>
            ))}
            {contribution.issues.map((issue) => (
              <li key={issue.link} className="sm:flex sm:gap-3">
                <Tags status="issue" kind="" />
                <a href={issue.link} target="_blank" rel="noopener noreferrer" className="link">
                  {issue.title}
                </a>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  </Section>
);

export default OSS;
