/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Mirrors the custom properties in src/index.css — change colours there.
      colors: {
        brand: 'var(--brand)',
        page: 'var(--bg)',
        ink: 'var(--fg)',
        body: 'var(--body)',
        muted: 'var(--muted)',
        rule: 'var(--rule)',
      },
      borderColor: {
        DEFAULT: 'var(--rule)',
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'SF Mono', 'Menlo', 'Consolas', 'Liberation Mono', 'monospace'],
      },
      maxWidth: {
        // The single reading column the whole page sits in.
        column: '64rem',
      },
    },
  },
  plugins: [],
}
