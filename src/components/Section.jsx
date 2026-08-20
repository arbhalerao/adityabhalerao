import { suppressMultiClickSelect } from "../lib/dom";

/**
 * Every section on the page: a hairline rule, then a <details> whose <summary>
 * is the heading. Native disclosure — no JS, no animation, and the content
 * stays in the DOM (and so in the prerendered HTML) when closed.
 *
 * The intro appears twice and CSS shows exactly one: beside the title while
 * closed, so a collapsed page still says what each section holds, and below it
 * once open, where it reads as a normal standfirst. Rendering both beats moving
 * one node, because only the short inline copy ends up inside the click target.
 *
 * `data-section` marks these as the page-level sections, so the expand/collapse
 * controls and the nav links can find them without also hitting the per-project
 * <details> inside Projects.
 */
export default function Section({ id, title, intro, defaultOpen = false, children }) {
  return (
    <section id={id} className="mt-14 border-t border-rule pt-8">
      <details data-section open={defaultOpen} className="group/section">
        {/* The marker sits at the far right so the label keeps the same left
            edge as the section content below it. */}
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
