/**
 * Post-build step: turn the client-rendered SPA into static HTML.
 *
 * `vite build` produces dist/index.html with an empty #root, which means a
 * crawler's first fetch sees no content at all. This renders every route in
 * src/seo/siteMeta.js#PAGES to HTML, injects the route's head tags, and writes
 * one static file per route — plus sitemap.xml.
 *
 * The client still boots normally on top of it (main.jsx calls createRoot,
 * which replaces the prerendered markup with the identical live tree).
 */
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = resolve(root, "dist");
const ssrDir = resolve(root, "dist-ssr");

const SEO_SLOT = /<!--seo:start-->[\s\S]*?<!--seo:end-->/;
const APP_SLOT = "<!--app-html-->";

const outputFileFor = (path) => (path === "/" ? "index.html" : `${path.slice(1)}.html`);

async function main() {
  const { render } = await import(resolve(ssrDir, "entry-server.js"));
  // siteMeta is plain ESM with no JSX, so node can load it straight from source.
  const { headTags, PAGES, canonicalFor, robotsTxt } = await import(
    resolve(root, "src/seo/siteMeta.js")
  );

  const template = await readFile(resolve(distDir, "index.html"), "utf8");

  if (!SEO_SLOT.test(template) || !template.includes(APP_SLOT)) {
    throw new Error("index.html is missing the <!--seo:*--> or <!--app-html--> slots");
  }

  for (const path of Object.keys(PAGES)) {
    const appHtml = render(path);
    const html = template
      .replace(SEO_SLOT, () => `<!--seo:start-->\n${headTags(path)}\n    <!--seo:end-->`)
      .replace(APP_SLOT, () => appHtml);

    const outFile = resolve(distDir, outputFileFor(path));
    await mkdir(dirname(outFile), { recursive: true });
    await writeFile(outFile, html, "utf8");
    console.log(`prerendered ${path} -> dist/${outputFileFor(path)} (${html.length} bytes)`);
  }

  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = Object.entries(PAGES)
    .map(
      ([path, page]) =>
        `  <url>\n` +
        `    <loc>${canonicalFor(path)}</loc>\n` +
        `    <lastmod>${lastmod}</lastmod>\n` +
        `    <changefreq>${page.changefreq}</changefreq>\n` +
        `    <priority>${page.priority}</priority>\n` +
        `  </url>`
    )
    .join("\n");

  await writeFile(
    resolve(distDir, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    "utf8"
  );
  console.log(`wrote dist/sitemap.xml (${Object.keys(PAGES).length} urls)`);

  await writeFile(resolve(distDir, "robots.txt"), robotsTxt(), "utf8");
  console.log("wrote dist/robots.txt");

  await rm(ssrDir, { recursive: true, force: true });
}

main().catch((error) => {
  console.error("prerender failed:", error);
  process.exit(1);
});
