import { useEffect, useState } from "react";

import ThemeToggle from "./ThemeToggle";
import { useBackToTop } from "../hooks/useBackToTop";
import { revealSection } from "../lib/dom";
import { RESUME_URL, SECTIONS } from "../seo/siteMeta";

/* Same stroke weight and 24-box as the ThemeToggle glyphs. */
const MenuIcon = ({ open }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    aria-hidden="true"
    className="h-5 w-5"
  >
    {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
  </svg>
);

/* Plain anchors plus scroll-margin-top in index.css — no scroll listeners. */
export default function SiteHeader() {
  const backToTop = useBackToTop();

  // Below sm the nav doesn't fit on one line, so it folds behind a menu button.
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const links = (
    <>
      {SECTIONS.map(({ id, label }) => (
        <a
          key={id}
          href={`/#${id}`}
          onClick={() => {
            revealSection(id);
            closeMenu();
          }}
          className="hover:text-brand"
        >
          {label}
        </a>
      ))}
      <a
        href={RESUME_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={closeMenu}
        className="hover:text-brand"
      >
        resume
      </a>
    </>
  );

  return (
    <header className="sticky top-0 z-10 border-b border-rule bg-page">
      <div className="mx-auto flex max-w-column flex-wrap items-center gap-x-5 gap-y-2 px-5 py-3 sm:px-8">
        {/* "~" alone means nothing to a screen reader, so the link keeps a real name. */}
        <a
          href="/"
          onClick={(e) => {
            closeMenu();
            backToTop(e);
          }}
          aria-label="Aditya Bhalerao, back to top"
          className="font-mono text-base leading-none translate-y-[2px] hover:text-brand"
        >
          ~
        </a>

        <nav
          aria-label="Primary"
          className="ml-auto flex flex-wrap gap-x-4 gap-y-1 font-mono text-[14px] text-muted max-sm:hidden"
        >
          {links}
        </nav>

        <div className="flex items-center gap-4 max-sm:ml-auto">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="flex items-center text-muted transition-colors hover:text-brand sm:hidden"
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="flex flex-col items-start border-t border-rule px-5 py-2 font-mono text-[15px] text-muted sm:hidden [&>a]:py-2"
        >
          {links}
        </nav>
      ) : null}
    </header>
  );
}
