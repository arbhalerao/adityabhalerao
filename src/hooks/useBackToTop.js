import { useNavigate } from "react-router-dom";

/**
 * Click handler for anything that means "back to the top of the homepage".
 *
 * Navigates rather than only scrolling, so any #section is cleared from the
 * URL too — scrolling alone would leave the address bar reading /#projects
 * while the viewport sits at the top. A plain href="/" would reload the page.
 *
 * Shared by the header's "~" and the hero's name so the two can't drift.
 */
export function useBackToTop() {
  const navigate = useNavigate();

  return (event) => {
    event.preventDefault();
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
}
