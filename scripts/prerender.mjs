/* ------------------------------------------------------------------ */
/*  Static prerender (SSG).                                             */
/*                                                                      */
/*  After `vite build` + an SSR build of src/server-entry.jsx, this      */
/*  renders every route to its own static HTML file (dist/<id>.html)     */
/*  using the built client shell (dist/index.html) as a template. It     */
/*  injects each page's rendered markup into #root and that page's       */
/*  <Helmet> head tags (title/canonical/OG/JSON-LD). It also writes      */
/*  sitemap.xml + robots.txt.                                            */
/*                                                                      */
/*  Run:  node scripts/prerender.mjs   (after the two vite builds)      */
/* ------------------------------------------------------------------ */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const dist = join(root, "dist");
const ssrEntry = join(root, "dist-server", "server-entry.js");

/* Mirror navItems in src/data/constants.js — keep in sync if routes change. */
const ROUTES = [
  { path: "/", file: "index.html" },
  { path: "/about", file: "about.html" },
  { path: "/experience", file: "experience.html" },
  { path: "/tech", file: "tech.html" },
  { path: "/work", file: "work.html" },
  { path: "/contact", file: "contact.html" },
];

const SITE_URL = (process.env.VITE_SITE_URL || "https://pranaypatle.dev").replace(/\/$/, "");
const lastmod = new Date().toISOString().slice(0, 10);

// Load the SSR bundle produced by `vite build --ssr`.
const { render } = await import(pathToFileURL(ssrEntry).href);

const stripDefaultHead = (shell) => {
  // Remove the shell's static description + title so react-helmet's per-page
  // tags don't duplicate them. ([^>]* spans newlines.)
  let s = shell.replace(/<meta[^>]*name="description"[^>]*>/i, "");
  s = s.replace(/<title>[^<]*<\/title>/i, "");
  return s;
};

const assemble = (shell, path) => {
  const { html, head } = render(path);
  const headTags = [
    head.title?.toString(),
    head.meta?.toString(),
    head.link?.toString(),
    head.script?.toString(),
  ]
    .filter(Boolean)
    .join("\n    ");

  let doc = stripDefaultHead(shell);
  doc = doc.replace("</head>", `\n    ${headTags}\n  </head>`);
  doc = doc.replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  return doc;
};

mkdirSync(dist, { recursive: true });
const shell = readFileSync(join(dist, "index.html"), "utf8");

for (const route of ROUTES) {
  const doc = assemble(shell, route.path);
  writeFileSync(join(dist, route.file), doc);
  console.log(`prerendered ${route.file}  (${route.path})`);
}

// 404 page — rendered from a URL that triggers the client's catch-all route,
// written to 404.html so Vercel serves it (with a 404 status) for missing paths.
{
  const doc = assemble(shell, "/__unknown-route-404__");
  writeFileSync(join(dist, "404.html"), doc);
  console.log("prerendered 404.html  (catch-all)");
}

// sitemap.xml
const urlset = ROUTES.map((r) => {
  const loc = SITE_URL + (r.path === "/" ? "/" : r.path);
  const priority = r.path === "/" ? "1.0" : "0.8";
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
}).join("\n");
writeFileSync(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlset}\n</urlset>\n`
);

// robots.txt
writeFileSync(
  join(dist, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
);

console.log("wrote sitemap.xml + robots.txt");
console.log(`SITE_URL: ${SITE_URL}`);
