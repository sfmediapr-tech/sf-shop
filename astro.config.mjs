import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import node from '@astrojs/node'

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
  adapter: node({ mode: 'standalone' }),
  integrations: [react(), sitemap()],
  server: { port: 4340 },
})
