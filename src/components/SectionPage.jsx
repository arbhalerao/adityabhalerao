import { Navigate, useParams } from "react-router-dom";

import SiteFooter from "./SiteFooter";
import { componentFor } from "../sections";

/**
 * One section on a page of its own at /<id> — what the "open in a new tab" icon
 * in each section heading points at.
 *
 * The section component is the same one the homepage renders; <Section> notices
 * it is at its own URL and drops the disclosure wrapper. An unknown slug is a
 * dead URL rather than an empty page, so it lands on the homepage instead.
 */
export default function SectionPage() {
  const { sectionId } = useParams();
  const Section = componentFor(sectionId);

  if (!Section) return <Navigate to="/" replace />;

  return (
    <main className="mx-auto w-full max-w-column px-5 pb-20 sm:px-8">
      <Section />
      <SiteFooter />
    </main>
  );
}
