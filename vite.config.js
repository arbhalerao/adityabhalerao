import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import process from 'node:process'

// https://vite.dev/config/
// Every env var the site needs. None has a fallback on purpose: a deploy missing
// one should fail here rather than ship a dead resume link or a broken contact
// form. Set them in Vercel, or in .env.local for local dev.
const REQUIRED_ENV = [
  // Baked into the client bundle at build time.
  'VITE_RESUME_URL',
  // Read at runtime by api/sendEmail.js.
  'EMAILJS_SERVICE_ID',
  'EMAILJS_TEMPLATE_ID',
  'EMAILJS_PUBLIC_KEY',
  'EMAILJS_PRIVATE_KEY',
]

export default defineConfig(({ mode }) => {
  // The '' prefix loads every var, not just VITE_ ones. This only checks they
  // exist; only VITE_ vars ever reach the client bundle.
  const env = loadEnv(mode, process.cwd(), '')
  const missing = REQUIRED_ENV.filter((name) => !env[name])
  if (missing.length) {
    throw new Error(`Missing env vars: ${missing.join(', ')}. Add them to the Vercel project env or .env.local.`)
  }

  return {
    plugins: [react()],
    define: {
      // Stamped at build time so the footer reports when the site was last
      // deployed, not what the visitor's clock says. Baked into both the client
      // and SSR bundles, so the prerendered HTML carries the same value.
      __BUILD_DATE__: JSON.stringify(new Date().toISOString().slice(0, 10)),
    },
  }
})
