import { SOURCE_URL } from "../seo/siteMeta";

export default function SiteFooter() {
  return (
    <footer className="meta mt-14 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-rule pt-6">
      <p>© {__BUILD_DATE__.slice(0, 4)} Aditya Bhalerao</p>

      {/* Each chunk carries its own separator, so a narrow window never strands a lone "·". */}
      <p>
        <span className="whitespace-nowrap">
          <a href={SOURCE_URL} target="_blank" rel="noopener noreferrer" className="link">
            source
          </a>{" "}
          ·
        </span>{" "}
        <span className="whitespace-nowrap">
          updated <time dateTime={__BUILD_DATE__}>{__BUILD_DATE__}</time>
        </span>
      </p>
    </footer>
  );
}
