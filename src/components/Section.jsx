import { useLocation } from "react-router-dom";

import { suppressMultiClickSelect } from "../lib/dom";

/*
 * Same stroke weight and 24-box as the ThemeToggle glyphs, so every icon on the
 * page reads as one set.
 *
 * The +/- marker is drawn rather than typed for the same reason: as text it
 * inherited the heading's font-medium and sat next to the link icon looking
 * bolder and a different size, and no type size fixes that mismatch.
 */
const Glyph = ({ children }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="h-4 w-4"
  >
    {children}
  </svg>
);

const OpenInNew = () => (
  <Glyph>
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </Glyph>
);

const Plus = () => (
  <Glyph>
    <path d="M12 5v14M5 12h14" />
  </Glyph>
);

const Minus = () => (
  <Glyph>
    <path d="M5 12h14" />
  </Glyph>
);

/**
 * Native <details>, so closed content stays in the DOM and in the prerendered HTML.
 *
 * The intro is rendered twice and CSS shows one: inline while closed, as a
 * standfirst once open. Rendering both beats moving a node — only the short
 * inline copy ends up inside the click target.
 *
 * `data-section` marks the page-level sections, so the expand/collapse controls
 * and nav links skip the per-project <details> inside Projects.
 */
export default function Section({ id, title, intro, defaultOpen = false, children }) {
  // A section rendered at its own URL IS the page: no disclosure to open, no
  // link back to where you already are, and its title is the page's <h1>.
  const standalone = useLocation().pathname === `/${id}`;

  if (standalone) {
    return (
      <section id={id} className="pt-12">
        <h1 className="section-heading text-brand">{title}</h1>

        {intro ? (
          <p className="depth-2 mt-2 max-w-[42rem] lowercase text-muted">{intro}</p>
        ) : null}

        <div className="mt-6">{children}</div>
      </section>
    );
  }

  return (
    <section id={id} className="mt-14 border-t border-rule pt-8">
      <details data-section open={defaultOpen} className="group/section">
        <summary
          onMouseDown={suppressMultiClickSelect}
          className="section-heading flex cursor-pointer select-none list-none items-baseline justify-between gap-4 transition-colors hover:text-brand group-open/section:text-brand"
        >
          <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            {title}
            {intro ? (
              <span className="depth-2 lowercase font-normal text-muted group-open/section:hidden">
                {intro}
              </span>
            ) : null}
          </span>

          {/*
            * A real <a> is its own activation target, so clicking it opens the
            * tab without also toggling the <summary> it sits in — no handler
            * needed. /<id> is a prerendered route of its own, not a jump link.
            */}
          <span className="flex shrink-0 items-center gap-5 text-muted">
            <span className="flex">
              <span className="group-open/section:hidden">
                <Plus />
              </span>
              <span className="hidden group-open/section:block">
                <Minus />
              </span>
            </span>

            <a
              href={`/${id}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${title} on its own page, in a new tab`}
              className="transition-colors hover:text-brand"
            >
              <OpenInNew />
            </a>
          </span>
        </summary>

        {intro ? (
          <p className="depth-2 mt-2 hidden max-w-[42rem] lowercase text-muted group-open/section:block">
            {intro}
          </p>
        ) : null}

        <div className="mt-6">{children}</div>
      </details>
    </section>
  );
}
