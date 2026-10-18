import { createElement, Fragment } from "react";

/** Set to false to render the **…** emphasis in src/data as plain prose again. */
export const EMPHASIS = true;

/** Strips the **…** emphasis, for places that need plain text. */
export const plain = (text) => text.replace(/\*\*(.*?)\*\*/g, "$1");

/** Renders **…** as emphasis: medium weight in the same colour as the regular-weight text around it. */
export const rich = (text) => {
  if (!EMPHASIS) return plain(text);
  return text.split(/\*\*(.*?)\*\*/g).map((part, i) =>
    i % 2 === 1
      ? createElement("strong", { key: i, className: "font-medium" }, part)
      : createElement(Fragment, { key: i }, part),
  );
};
