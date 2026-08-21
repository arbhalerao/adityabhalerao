/** Strips the **…** emphasis in src/data; this layout renders that copy as plain prose. */
export const plain = (text) => text.replace(/\*\*(.*?)\*\*/g, "$1");
