import papers from "../data/papershelfData";
import Section from "./Section";

const Papershelf = () => (
  <Section
    id="papershelf"
    title="Papers"
    intro="Papers and what I took from them"
  >
    <ul className="space-y-6">
      {papers.map((paper) => (
        <li key={paper.link}>
          <h3 className="depth-1 font-medium">
            <a href={paper.link} target="_blank" rel="noopener noreferrer" className="link">
              {paper.title}
            </a>
          </h3>
          <p className="depth-2 mt-1 text-body">{paper.summary}</p>
        </li>
      ))}
    </ul>
  </Section>
);

export default Papershelf;
