import { useEffect, useState } from 'react'
import { add, read, setQty } from './basketStore'

/**
 * The add button. Shows what is already in the basket rather than silently
 * adding a fourth compliance check, because these are services and buying two
 * by accident is a real refund conversation.
 */
export default function AddToBasket({
  sku,
  label = 'Add to basket',
  variant = 'primary',
}: {
  sku: string
  label?: string
  variant?: 'primary' | 'ink' | 'ghost'
}) {
  const [qty, setLocalQty] = useState(0)
  const [justAdded, setJustAdded] = useState(false)

  useEffect(() => {
    const sync = () => setLocalQty(read().find((l) => l.sku === sku)?.qty ?? 0)
    sync()
    window.addEventListener('sf:basket', sync)
    return () => window.removeEventListener('sf:basket', sync)
  }, [sku])

  if (qty > 0) {
    return (
      <div className="atb atb--in">
        <button className="atb__step" aria-label="Remove one" onClick={() => setQty(sku, qty - 1)}>−</button>
        <span className="atb__qty spec">{qty} in basket</span>
        <button className="atb__step" aria-label="Add one" onClick={() => setQty(sku, qty + 1)}>+</button>
        <a href="/basket" className="atb__link small">Basket</a>
      </div>
    )
  }

  return (
    <button
      className={`btn btn--${variant}`}
      onClick={() => {
        add(sku)
        setJustAdded(true)
        setTimeout(() => setJustAdded(false), 1200)
      }}
    >
      {justAdded ? 'Added' : label}
    </button>
  )
}
