import type { APIRoute } from 'astro'
import Stripe from 'stripe'
import { ALL_BUYABLE } from '../../data/shop'

/** Runs on the server: the secret key must never reach the browser. */
export const prerender = false

/**
 * Creates a Stripe Checkout Session from a list of SKUs and quantities.
 *
 * The request carries no prices. Every line is re-priced here from the
 * catalogue, so what the customer pays is what the catalogue says regardless of
 * what the browser sent — the client-side basket is a convenience, not a source
 * of truth.
 */
export const POST: APIRoute = async ({ request }) => {
  const key = import.meta.env.STRIPE_SECRET_KEY
  if (!key) {
    return json({ error: 'Payment is not configured on this deployment.' }, 503)
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Could not read the request.' }, 400)
  }

  const raw = (body as { lines?: unknown })?.lines
  if (!Array.isArray(raw) || raw.length === 0) {
    return json({ error: 'Your basket is empty.' }, 400)
  }
  if (raw.length > 50) {
    return json({ error: 'Too many lines in one order.' }, 400)
  }

  const items: Stripe.Checkout.SessionCreateParams.LineItem[] = []
  for (const entry of raw) {
    const sku = (entry as { sku?: unknown })?.sku
    const qtyRaw = (entry as { qty?: unknown })?.qty
    if (typeof sku !== 'string') return json({ error: 'A basket line was malformed.' }, 400)

    const item = ALL_BUYABLE.find((p) => p.sku === sku)
    if (!item) return json({ error: `We no longer sell ${sku}.` }, 400)

    const qty = Math.floor(Number(qtyRaw))
    if (!Number.isFinite(qty) || qty < 1 || qty > 99) {
      return json({ error: `Quantity for ${sku} is out of range.` }, 400)
    }

    items.push({
      quantity: qty,
      price_data: {
        currency: 'gbp',
        unit_amount: item.pricePence, // from the catalogue, never from the client
        product_data: {
          name: item.name,
          metadata: { sku: item.sku },
        },
      },
    })
  }

  const origin = import.meta.env.PUBLIC_SITE_URL || new URL(request.url).origin

  try {
    const stripe = new Stripe(key)
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: items,
      success_url: `${origin}/order-confirmed?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/basket`,
      // VAT applies to UK-based clients. Stripe Tax decides from the billing
      // address rather than us guessing from an IP.
      automatic_tax: { enabled: true },
      billing_address_collection: 'required',
      customer_creation: 'always',
      phone_number_collection: { enabled: true },
    })
    return json({ url: session.url })
  } catch (e) {
    console.error('[checkout] Stripe session failed', e)
    return json({ error: 'Payment could not be started. Nothing has been charged.' }, 502)
  }
}

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}
