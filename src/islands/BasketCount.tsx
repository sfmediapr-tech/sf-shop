import { useEffect, useState } from 'react'
import { count, read, subscribe } from './basketStore'

/** The header badge. Renders nothing until there is something in the basket. */
export default function BasketCount() {
  const [n, setN] = useState(0)

  useEffect(() => {
    setN(count(read()))
    return subscribe((lines) => setN(count(lines)))
  }, [])

  return (
    <a href="/basket" className="hdr__basket" aria-label={n ? `Basket, ${n} items` : 'Basket, empty'}>
      Basket
      {n > 0 && <span className="hdr__badge spec">{n}</span>}
    </a>
  )
}
