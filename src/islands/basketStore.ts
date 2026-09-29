/**
 * The basket.
 *
 * Deliberately tiny: a list of { sku, qty } in localStorage, plus an event so
 * every island on the page re-reads it when one of them changes it. There is no
 * server-side cart and no account, because the catalogue is about twenty fixed
 * price items and a session is not worth a database.
 *
 * Prices are never stored here. Only SKUs and quantities — the price is read
 * from the catalogue at render time and re-derived server side at checkout, so a
 * tampered localStorage cannot buy a £1,500 design tier for a pound.
 *
 * Every storage access is wrapped: localStorage throws in a private window and
 * can come back empty after a clear, and the basket must not take the page down
 * with it.
 */

const KEY = 'sf-basket-v1'
export const BASKET_EVENT = 'sf:basket'

export interface Line {
  sku: string
  qty: number
}

export function read(): Line[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter((l) => l && typeof l.sku === 'string' && Number.isFinite(l.qty) && l.qty > 0)
      .map((l) => ({ sku: l.sku, qty: Math.min(99, Math.floor(l.qty)) }))
  } catch {
    return []
  }
}

function write(lines: Line[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(lines))
  } catch {
    // Private window, or storage full. The in-memory basket still works for this
    // page view; it just will not survive a reload.
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(BASKET_EVENT, { detail: lines }))
  }
}

export function add(sku: string, qty = 1) {
  const lines = read()
  const found = lines.find((l) => l.sku === sku)
  if (found) found.qty = Math.min(99, found.qty + qty)
  else lines.push({ sku, qty })
  write(lines)
  return lines
}

export function setQty(sku: string, qty: number) {
  const lines = read().filter((l) => (l.sku === sku ? qty > 0 : true))
  const found = lines.find((l) => l.sku === sku)
  if (found) found.qty = Math.min(99, Math.max(1, Math.floor(qty)))
  write(lines)
  return lines
}

export function remove(sku: string) {
  write(read().filter((l) => l.sku !== sku))
}

export function clear() {
  write([])
}

export function count(lines = read()) {
  return lines.reduce((n, l) => n + l.qty, 0)
}

/** Subscribe to basket changes, including from another island on the page. */
export function subscribe(fn: (lines: Line[]) => void) {
  const handler = () => fn(read())
  window.addEventListener(BASKET_EVENT, handler)
  // Another tab changing the basket fires `storage`, not our custom event.
  window.addEventListener('storage', handler)
  return () => {
    window.removeEventListener(BASKET_EVENT, handler)
    window.removeEventListener('storage', handler)
  }
}
