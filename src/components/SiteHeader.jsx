import ThemeToggle from "./ThemeToggle";
import { useBackToTop } from "../hooks/useBackToTop";
import { revealSection } from "../lib/dom";
import { RESUME_URL } from "../seo/siteMeta";

const SECTIONS = [
  { id: "tech", label: "tech" },
  { id: "experience", label: "experience" },
  { id: "education", label: "education" },
  { id: "oss", label: "oss" },
  { id: "projects", label: "projects" },
  { id: "blogs", label: "writing" },
  { id: "papershelf", label: "papers" },
  { id: "contact", label: "contact" },
];

/* Plain anchors plus scroll-margin-top in index.css — no scroll listeners. */
export default function SiteHeader() {
  const backToTop = useBackToTop();

  return (
    <header className="sticky top-0 z-10 border-b border-rule bg-page">
      <div className="mx-auto flex max-w-column flex-wrap items-center gap-x-5 gap-y-2 px-5 py-3 sm:px-8">
        {/* "~" alone means nothing to a screen reader, so the link keeps a real name. */}
        <a
          href="/"
          onClick={backToTop}
          aria-label="Aditya Bhalerao, back to top"
          className="font-mono text-base leading-none translate-y-[2px] hover:text-brand"
        >
          ~
        </a>

        <nav aria-label="Primary" className="ml-auto flex flex-wrap gap-x-4 gap-y-1 font-mono text-[14px] text-muted">
          {SECTIONS.map(({ id, label }) => (
            <a key={id} href={`/#${id}`} onClick={() => revealSection(id)} className="hover:text-brand">
              {label}
            </a>
          ))}
          <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="hover:text-brand">
            resume
          </a>
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}
