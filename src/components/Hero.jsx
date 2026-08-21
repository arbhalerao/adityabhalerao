import { useEffect, useState } from "react";

import { useBackToTop } from "../hooks/useBackToTop";
import { revealSection } from "../lib/dom";
import { PROFILES, PERSON, RESUME_URL } from "../seo/siteMeta";

const LINKS = [
  { href: PROFILES.github, label: "github" },
  { href: PROFILES.linkedin, label: "linkedin" },
  { href: PROFILES.medium, label: "medium" },
  { href: RESUME_URL, label: "resume" },
];

const timeInPune = () =>
  new Date().toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
  });

const Hero = () => {
  // Read once at render and the clock is frozen at page load, so keep it in
  // state. Ticking every second costs nothing: the formatted string only
  // changes once a minute, and React bails out when the value is unchanged.
  const [currentTime, setCurrentTime] = useState(timeInPune);
  const backToTop = useBackToTop();

  useEffect(() => {
    const id = setInterval(() => setCurrentTime(timeInPune()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="hero" className="pt-12">
      <div className="flex flex-col-reverse gap-6 sm:flex-row sm:items-start sm:gap-10">
        <div className="min-w-0 flex-1">
          <h1>
            <a
              href="/"
              onClick={backToTop}
              aria-label="Aditya Bhalerao, back to top"
              className="group inline-block"
            >
              <span className="signature h-12 group-hover:bg-brand sm:h-[3.75rem]" />
              <span className="sr-only">{PERSON.name}</span>
            </a>
          </h1>

          <p className="mt-2 text-[15px] text-muted">
            {PERSON.jobTitle} @{" "}
            <a href={PERSON.employer.url} target="_blank" rel="noopener noreferrer" className="link">
              {PERSON.employer.name}
            </a>
          </p>

          <p className="meta mt-1">Pune, MH, India · {currentTime} IST</p>

          <nav aria-label="Profiles" className="meta mt-4 flex flex-wrap gap-x-4 gap-y-1">
            {LINKS.map(({ href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="link">
                {label}
              </a>
            ))}
          </nav>

          <a
            href="/#contact"
            onClick={() => revealSection("contact")}
            className="meta link mt-3 inline-block"
          >
            get in touch →
          </a>
        </div>

        <img
          src="/aditya-bhalerao.webp"
          alt="Aditya Bhalerao, software engineer"
          width="800"
          height="800"
          // lowercase on purpose: React 18 passes it through as-is (camelCase is React 19+)
          // eslint-disable-next-line react/no-unknown-property
          fetchpriority="high"
          decoding="async"
          className="h-40 w-40 shrink-0 rounded-md object-cover sm:h-56 sm:w-56"
        />
      </div>

      {/* Full width, below the row. Beside the photo this copy left roughly
          126px of dead column under it at 70 words. */}
      <div className="prose-block mt-8 space-y-4 text-ink">
        <p>
          I’m a backend software engineer focused on building reliable, scalable systems with Go,
          Python, Kubernetes, and distributed systems. I enjoy working close to infrastructure,
          designing APIs, orchestration platforms, storage systems, and data pipelines that solve
          real-world problems.
        </p>
        <p>
          I’m particularly interested in distributed systems, cloud infrastructure, authorization,
          and space-data platforms. Outside work, I build systems from scratch, contribute to open
          source, and write about the engineering concepts I’m learning.
        </p>
      </div>
    </section>
  );
};

export default Hero;
