import { useEffect } from "react";
import { jsonLdFor, pageMeta, OG_IMAGE, PERSON } from "./siteMeta";

const upsert = (selector, create, attrs) => {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
  return el;
};

const metaByName = (name, content) =>
  upsert(`meta[name="${name}"]`, () => document.createElement("meta"), { name, content });

const metaByProperty = (property, content) =>
  upsert(`meta[property="${property}"]`, () => document.createElement("meta"), {
    property,
    content,
  });

/**
 * Keeps the head correct after client-side navigation. The initial head is baked
 * in by scripts/prerender.mjs, so with a single route this is a no-op on load.
 */
export function useSeo(path) {
  useEffect(() => {
    const meta = pageMeta(path);

    document.title = meta.title;
    metaByName("description", meta.description);
    metaByName("author", PERSON.name);

    upsert('link[rel="canonical"]', () => document.createElement("link"), {
      rel: "canonical",
      href: meta.canonical,
    });

    metaByProperty("og:type", path === "/" ? "profile" : "website");
    metaByProperty("og:title", meta.title);
    metaByProperty("og:description", meta.description);
    metaByProperty("og:url", meta.canonical);
    metaByProperty("og:image", OG_IMAGE.url);

    metaByName("twitter:card", "summary_large_image");
    metaByName("twitter:title", meta.title);
    metaByName("twitter:description", meta.description);
    metaByName("twitter:image", OG_IMAGE.url);

    const script =
      document.head.querySelector('script[type="application/ld+json"]') ??
      document.head.appendChild(
        Object.assign(document.createElement("script"), { type: "application/ld+json" })
      );
    script.textContent = JSON.stringify(jsonLdFor());
  }, [path]);
}
