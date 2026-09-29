import { useEffect, useMemo, useState } from 'react'
import { read, remove, setQty, subscribe, type Line } from './basketStore'
import { ALL_BUYABLE, gbp } from '../data/shop'

/**
 * The basket page.
 *
 * Prices are looked up from the catalogue by SKU, never read from storage — and
 * the same lookup happens again on the server at checkout. A line whose SKU no
 * longer exists is dropped with a note rather than silently ignored.
 */
export default function Basket({ stripeConfigured }: { stripeConfigured: boolean }) {
  const [lines, setLines] = useState<Line[]>([])
  const [ready, setReady] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLines(read())
    setReady(true)
    return subscribe(setLines)
  }, [])

  const resolved = useMemo(
    () =>
      lines.map((l) => ({
        line: l,
        item: ALL_BUYABLE.find((p) => p.sku === l.sku) ?? null,
      })),
    [lines],
  )

  const valid = resolved.filter((r) => r.item !== null)
  const stale = resolved.filter((r) => r.item === null)
  const subtotal = valid.reduce((n, r) => n + r.item!.pricePence * r.line.qty, 0)

  async function checkout() {
    setBusy(true)
    setError(null)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lines: valid.map((r) => ({ sku: r.line.sku, qty: r.line.qty })) }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error ?? 'Checkout could not start.')
      if (data.url) window.location.href = data.url
      else throw new Error('Checkout did not return a payment page.')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Checkout could not start.')
      setBusy(false)
    }
  }

  // Server-rendered and pre-hydration: show nothing rather than an empty basket
  // that flashes into a full one.
  if (!ready) return <div className="bsk__loading small">Loading your basket…</div>

  if (valid.length === 0) {
    return (
      <div className="bsk__empty">
        <h2>Your basket is empty</h2>
        <p className="lead">
          Design services, compliance checks and lab tests can be bought outright. Manufacturing is
          quoted against your volume and market.
        </p>
        <div className="btn-row">
          <a href="/shop" className="btn btn--ink">Browse the shop</a>
          <a href="/quote" className="btn btn--ghost">Get a manufacturing quote</a>
        </div>
      </div>
    )
  }

  return (
    <div className="bsk">
      <div className="bsk__lines">
        {valid.map(({ line, item }) => (
          <div className="bsk__line" key={line.sku}>
            <div className="bsk__info">
              <h3>{item!.name}</h3>
              <p className="micro">{'unit' in item! ? item!.unit : 'per test'} · {item!.sku}</p>
            </div>

            <div className="bsk__qty">
              <button aria-label="Fewer" onClick={() => setQty(line.sku, line.qty - 1)}>−</button>
              <span className="spec">{line.qty}</span>
              <button aria-label="More" onClick={() => setQty(line.sku, line.qty + 1)}>+</button>
            </div>

            <div className="bsk__amt spec">{gbp(item!.pricePence * line.qty)}</div>

            <button className="bsk__rm small" onClick={() => remove(line.sku)}>Remove</button>
          </div>
        ))}

        {stale.length > 0 && (
          <p className="note note--warn">
            {stale.length} item{stale.length > 1 ? 's are' : ' is'} no longer in the catalogue and
            {stale.length > 1 ? ' have' : ' has'} been left out of the total.
          </p>
        )}
      </div>

      <aside className="bsk__sum">
        <h2 className="micro">Summary</h2>

        <div className="bsk__row">
          <span>Subtotal</span>
          <strong className="spec">{gbp(subtotal)}</strong>
        </div>
        <div className="bsk__row bsk__row--muted">
          <span>VAT</span>
          <span className="small">Calculated at checkout</span>
        </div>

        <p className="price bsk__total">{gbp(subtotal)}<sup>+VAT</sup></p>

        {stripeConfigured ? (
          <button className="btn btn--primary bsk__go" onClick={checkout} disabled={busy}>
            {busy ? 'Starting checkout…' : 'Checkout'}
          </button>
        ) : (
          <>
            <button className="btn btn--primary bsk__go" disabled>Checkout</button>
            <p className="note note--warn">
              Card payment is not switched on yet — Stripe keys are not set on this deployment. Send
              the basket through as an enquiry and we will invoice it.
            </p>
            <a href="/contact" className="btn btn--ghost bsk__go">Send as an enquiry</a>
          </>
        )}

        {error && <p className="note note--pencil">{error}</p>}

        <p className="micro bsk__vat">
          VAT applies to UK-based clients and is added by Stripe at checkout.
        </p>
      </aside>
    </div>
  )
}
