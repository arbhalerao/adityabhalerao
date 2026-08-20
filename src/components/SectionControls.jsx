import { suppressMultiClickSelect } from "../lib/dom";

/** Opens or closes every page-level section at once. */
const setAll = (open) => {
  document.querySelectorAll("main details[data-section]").forEach((el) => {
    el.open = open;
  });
};

export default function SectionControls() {
  return (
    <div className="meta -mb-8 mt-16 flex justify-end gap-4">
      <button
        type="button"
        onClick={() => setAll(true)}
        onMouseDown={suppressMultiClickSelect}
        className="link select-none"
      >
        expand all
      </button>
      <button
        type="button"
        onClick={() => setAll(false)}
        onMouseDown={suppressMultiClickSelect}
        className="link select-none"
      >
        collapse all
      </button>
    </div>
  );
}
