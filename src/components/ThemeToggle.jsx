/**
 * Theme lives in the `dark` class on <html>: index.html sets it before first
 * paint, this flips it. Both icons render and CSS picks one — holding it in
 * React state would mismatch the prerendered HTML on hydration.
 *
 * The -translate-y values sit each glyph on the nav text's baseline, and differ
 * because the two glyphs aren't the same height.
 */
const Sun = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    aria-hidden="true"
    className="hidden h-4 w-4 -translate-y-[2px] dark:block"
  >
    <circle cx="12" cy="12" r="4.25" />
    <path d="M12 2v2.25M12 19.75V22M4.22 4.22l1.6 1.6M18.18 18.18l1.6 1.6M2 12h2.25M19.75 12H22M4.22 19.78l1.6-1.6M18.18 5.82l1.6-1.6" />
  </svg>
);

const Moon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="h-4 w-4 -translate-y-[3px] dark:hidden"
  >
    <path d="M20.5 14.6A8.75 8.75 0 0 1 9.4 3.5a8.75 8.75 0 1 0 11.1 11.1Z" />
  </svg>
);

export default function ThemeToggle() {
  const toggle = () => {
    const dark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {
      /* storage blocked */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      className="flex items-center text-muted transition-colors hover:text-brand"
    >
      <Moon />
      <Sun />
    </button>
  );
}
