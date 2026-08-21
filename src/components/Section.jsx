import { suppressMultiClickSelect } from "../lib/dom";

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
  return (
    <section id={id} className="mt-14 border-t border-rule pt-8">
      <details data-section open={defaultOpen} className="group/section">
        <summary
          onMouseDown={suppressMultiClickSelect}
          className="section-heading flex cursor-pointer select-none list-none items-baseline justify-between gap-4 transition-colors hover:text-brand"
        >
          <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            {title}
            {intro ? (
              <span className="depth-2 lowercase font-normal text-muted group-open/section:hidden">
                {intro}
              </span>
            ) : null}
          </span>

          <span aria-hidden="true" className="text-lg leading-none text-muted">
            <span className="group-open/section:hidden">+</span>
            <span className="hidden group-open/section:inline">−</span>
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
