import type { APIRoute } from 'astro'

/**
 * Disallow everything unless indexing has been explicitly switched on. Paired
 * with the noindex meta tag in the layout: the meta tag covers a crawler that
 * has already fetched a page, this stops a well-behaved one fetching at all.
 */
export const GET: APIRoute = ({ site }) => {
  const allow = import.meta.env.PUBLIC_ALLOW_INDEXING === 'true'
  const body = allow
    ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', site)}\n`
    : 'User-agent: *\nDisallow: /\n'
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
