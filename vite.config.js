import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Stamped at build time so the footer reports when the site was last
    // deployed, not what the visitor's clock says. Baked into both the client
    // and SSR bundles, so the prerendered HTML carries the same value.
    __BUILD_DATE__: JSON.stringify(new Date().toISOString().slice(0, 10)),
  },
})
