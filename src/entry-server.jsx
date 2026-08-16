import { renderToString } from "react-dom/server";
// react-router v7 moved StaticRouter out of react-router-dom/server.
import { StaticRouter } from "react-router";

import { AppShell } from "./App.jsx";

/** Renders a route to static HTML for scripts/prerender.mjs. */
export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <AppShell />
    </StaticRouter>
  );
}
