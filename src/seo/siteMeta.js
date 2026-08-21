/**
 * Single source of truth for the site's SEO metadata, consumed twice: at build
 * time by scripts/prerender.mjs, and at runtime by useSeo() on route changes.
 */

// The apex 308-redirects to www in production, so www is canonical. Change it here only.
export const SITE_URL = "https://www.adityabhalerao.com";

export const RESUME_URL =
  "https://drive.google.com/file/d/12k8htg9CS3fOwn5GKpeUynS15ZxbMGE2/view";

export const PROFILES = {
  linkedin: "https://www.linkedin.com/in/arbhalerao/",
  github: "https://github.com/arbhalerao",
  medium: "https://arbhalerao.medium.com/",
};

/** This site's own repository, linked from the footer. */
export const SOURCE_URL = "https://github.com/arbhalerao/adityabhalerao";

export const PERSON = {
  name: "Aditya Bhalerao",
  jobTitle: "Software Engineer",
  employer: { name: "Geminus Space", url: "https://geminus.space/" },
  locality: "Pune",
  region: "Maharashtra",
  country: "IN",
  image: `${SITE_URL}/aditya-bhalerao.webp`,
  sameAs: [PROFILES.linkedin, PROFILES.github, PROFILES.medium],
  knowsAbout: [
    "Backend Engineering",
    "Distributed Systems",
    "Go",
    "Python",
    "Kubernetes",
    "Docker",
    "gRPC",
    "PostgreSQL",
    "Argo Workflows",
    "Keycloak",
    "Google Cloud Platform",
  ],
};

export const OG_IMAGE = {
  url: `${SITE_URL}/aditya-bhalerao-og.png`,
  width: 1200,
  height: 630,
  alt: "Aditya Bhalerao, Software Engineer",
};

export const THEME_COLOR = "#e08a3c";

export const PAGES = {
  "/": {
    title: "Aditya Bhalerao",
    description:
      "Aditya Bhalerao is a software engineer in Pune, India, building scalable distributed systems in Go. Projects, open-source work, and writing.",
    changefreq: "weekly",
    priority: "1.0",
  },
};

/** robots.txt body. Generated at build time so the sitemap host can never drift from SITE_URL. */
export function robotsTxt() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
}

/** Absolute, canonical URL for a route. The site has no trailing slashes except at the root. */
export function canonicalFor(path) {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

export function pageMeta(path) {
  const page = PAGES[path] ?? PAGES["/"];
  return { ...page, path, canonical: canonicalFor(path) };
}

const PERSON_ID = `${SITE_URL}/#person`;

function personSchema() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: PERSON.name,
    url: `${SITE_URL}/`,
    image: PERSON.image,
    jobTitle: PERSON.jobTitle,
    description: PAGES["/"].description,
    worksFor: {
      "@type": "Organization",
      name: PERSON.employer.name,
      url: PERSON.employer.url,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: PERSON.locality,
      addressRegion: PERSON.region,
      addressCountry: PERSON.country,
    },
    knowsAbout: PERSON.knowsAbout,
    sameAs: PERSON.sameAs,
  };
}

/** Schema.org graph for a route, as a plain object ready to be JSON-stringified. */
export function jsonLdFor() {
  const person = personSchema();

  return {
    "@context": "https://schema.org",
    "@graph": [
      person,
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: PERSON.name,
        description: PAGES["/"].description,
        inLanguage: "en",
        about: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
      },
    ],
  };
}

const escapeAttr = (value) =>
  String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/**
 * The full block of route-specific head tags, as an HTML string.
 * `scripts/prerender.mjs` swaps this into the <!--seo:start-->/<!--seo:end--> slot
 * of index.html. Kept in sync with the static fallback block in index.html.
 */
export function headTags(path) {
  const meta = pageMeta(path);
  const tag = (html) => `    ${html}`;

  return [
    tag(`<title>${escapeAttr(meta.title)}</title>`),
    tag(`<meta name="description" content="${escapeAttr(meta.description)}" />`),
    tag(`<link rel="canonical" href="${meta.canonical}" />`),
    tag(`<meta name="author" content="${PERSON.name}" />`),
    tag(`<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`),
    tag(`<meta name="theme-color" content="${THEME_COLOR}" />`),
    "",
    tag(`<meta property="og:type" content="${path === "/" ? "profile" : "website"}" />`),
    tag(`<meta property="og:site_name" content="${PERSON.name}" />`),
    tag(`<meta property="og:title" content="${escapeAttr(meta.title)}" />`),
    tag(`<meta property="og:description" content="${escapeAttr(meta.description)}" />`),
    tag(`<meta property="og:url" content="${meta.canonical}" />`),
    tag(`<meta property="og:locale" content="en_US" />`),
    tag(`<meta property="og:image" content="${OG_IMAGE.url}" />`),
    tag(`<meta property="og:image:width" content="${OG_IMAGE.width}" />`),
    tag(`<meta property="og:image:height" content="${OG_IMAGE.height}" />`),
    tag(`<meta property="og:image:alt" content="${escapeAttr(OG_IMAGE.alt)}" />`),
    ...(path === "/"
      ? [
          tag(`<meta property="profile:first_name" content="Aditya" />`),
          tag(`<meta property="profile:last_name" content="Bhalerao" />`),
        ]
      : []),
    "",
    tag(`<meta name="twitter:card" content="summary_large_image" />`),
    tag(`<meta name="twitter:title" content="${escapeAttr(meta.title)}" />`),
    tag(`<meta name="twitter:description" content="${escapeAttr(meta.description)}" />`),
    tag(`<meta name="twitter:image" content="${OG_IMAGE.url}" />`),
    tag(`<meta name="twitter:image:alt" content="${escapeAttr(OG_IMAGE.alt)}" />`),
    "",
    tag(
      `<script type="application/ld+json">${JSON.stringify(jsonLdFor()).replace(/</g, "\\u003c")}</script>`
    ),
  ].join("\n");
}
