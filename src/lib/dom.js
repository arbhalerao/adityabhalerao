/**
 * Stops the browser starting a word/paragraph selection when a control is
 * clicked repeatedly. `user-select: none` only protects the control's own
 * text — a double or triple click still extends a selection into whatever
 * sits around it, which is very easy to trigger on a toggle you click twice.
 *
 * Safe on a <summary> or <button>: the activation fires on click, not
 * mousedown, so preventing the default here suppresses only the selection.
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
