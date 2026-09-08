import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./theme/ThemeContext";
import App from "./App";

/**
 * SSR entry used by the prerender step (scripts/prerender.mjs). Renders the
 * whole app for a given URL to static HTML and captures the per-page <Helmet>
 * head tags so they can be baked into each route's file.
 *
 * Providers mirror the client entry (main.jsx) but swap BrowserRouter for a
 * StaticRouter pinned to the requested URL.
 */
export function render(url) {
  const helmetContext = {};
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </StaticRouter>
    </HelmetProvider>
  );
  return { html, head: helmetContext.helmet };
}
