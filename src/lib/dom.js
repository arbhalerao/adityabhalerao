/**
 * Stops a repeated click starting a text selection. `user-select: none` only
 * protects the control's own text; a double click still extends a selection
 * into whatever sits around it. Safe on <summary>/<button> — activation fires
 * on click, not mousedown, so only the selection is suppressed.
 */
export const suppressMultiClickSelect = (e) => {
  if (e.detail > 1) e.preventDefault();
};

/**
 * Opens a collapsed section so a link pointing at it doesn't land on a bare
 * heading. Clicking the same hash twice fires no hashchange, so links call this
 * directly rather than relying on the listener in App.jsx.
 */
export const revealSection = (id) => {
  const details = document.getElementById(id)?.querySelector("details[data-section]");
  if (details) details.open = true;
};
