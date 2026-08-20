/**
 * The data files under src/data mark emphasis with **…**. The typographic
 * layout renders that copy as plain prose — a third of every achievement line
 * used to be bold, which is exactly the noise this layout is trying to avoid.
 *
 * Swap this for a real renderer if the emphasis is ever wanted back.
 */
export const plain = (text) => text.replace(/\*\*(.*?)\*\*/g, "$1");
