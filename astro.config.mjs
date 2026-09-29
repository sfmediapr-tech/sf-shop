import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import node from '@astrojs/node'
import vercel from '@astrojs/vercel'

/* Two adapters, picked by environment. Node locally, because `npm run dev` and a
   plain `node dist/server/entry.mjs` should keep working without a cloud
   account. Vercel when Vercel is doing the building, because its standalone
   server has nowhere to run there. VERCEL=1 is set by their build container. */
const onVercel = Boolean(process.env.VERCEL)

/**
 * Static by default, because the catalogue is what carries the search traffic.
 * Only the two Stripe endpoints opt out with `export const prerender = false`,
 * so the secret key never has to exist at build time.
 *
 * The adapter is Node so this runs anywhere. Swapping it for @astrojs/vercel
 * is a one-line change if this deploys beside sf-pack-ai.
 */
export default defineConfig({
  site: 'https://shop.mysupplementfactory.com',
  output: 'static',
  adapter: onVercel ? vercel() : node({ mode: 'standalone' }),
  // Astro's built-in origin check compares the Origin header against the request
  // URL, which behind a proxy carries an internal host — so a genuinely
  // same-origin form POST is rejected. The enquiry endpoint runs the same check
  // itself against x-forwarded-host, which is the header that survives the hop.
  security: { checkOrigin: false },
  integrations: [react(), sitemap()],
  server: { port: 4340 },
})
