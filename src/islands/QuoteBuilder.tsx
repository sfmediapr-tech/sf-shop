import { useMemo, useState } from 'react'
import { FORMATS } from '../data/formats'

/**
 * The manufacturing quote builder.
 *
 * No prices, because none exist to show: manufacturing is priced against volume,
 * format, market and components, and every figure in the business is a quote.
 * What this does instead is produce a specification complete enough to price
 * from, and catch the two things that waste a sales conversation — a volume
 * under the format's minimum, and a market nobody asked about until artwork.
 */

const MARKETS = ['UK', 'EU', 'USA', 'Canada', 'Middle East', 'Other'] as const
const STAGES = [
  { v: 'idea', l: 'An idea, no formulation yet' },
  { v: 'formula', l: 'I have a formulation' },
  { v: 'existing', l: 'Already selling, changing manufacturer' },
] as const

export default function QuoteBuilder({ presetFormat = '' }: { presetFormat?: string }) {
  const [formatSlug, setFormatSlug] = useState(presetFormat)
  const [units, setUnits] = useState<number | ''>('')
  const [packaging, setPackaging] = useState<string[]>([])
  const [markets, setMarkets] = useState<string[]>([])
  const [stage, setStage] = useState('')
  const [artwork, setArtwork] = useState('')

  const format = FORMATS.find((f) => f.slug === formatSlug)

  const toggle = (list: string[], set: (v: string[]) => void, v: string) =>
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v])

  const flags = useMemo(() => {
    const out: { level: 'stop' | 'warn'; text: string }[] = []

    // The check the other site could not do without this data: is the volume
    // above the published minimum for the chosen format?
    if (format && typeof units === 'number' && format.moqUnits && units < format.moqUnits) {
      out.push({
        level: 'stop',
        text: `${units.toLocaleString('en-GB')} units is below the published minimum for ${format.name.toLowerCase()} (${format.moq}). Either the volume goes up, or a different format may suit — powders start at 200 units in pots or pouches.`,
      })
    }
    if (markets.length > 1) {
      out.push({
        level: 'warn',
        text: `${markets.length} markets means ${markets.length} artworks and, usually, more than one specification. Worth deciding now rather than at artwork stage.`,
      })
    }
    if (markets.includes('USA')) {
      out.push({
        level: 'warn',
        text: 'A US pack needs a Supplement Facts panel in FDA format, dual oz/g net weight, and the FDA disclaimer if you make a structure/function claim.',
      })
    }
    if (markets.includes('Canada')) {
      out.push({
        level: 'warn',
        text: 'Canada needs an NPN on pack and mandatory bilingual English and French panels, with wording matching the licence exactly.',
      })
    }
    if (stage === 'idea') {
      out.push({
        level: 'warn',
        text: 'With no formulation yet, the first step is the Formulation Service — about 28 days, plus 6 weeks to samples, before manufacturing can be quoted properly.',
      })
    }
    if (artwork === 'none') {
      out.push({
        level: 'warn',
        text: 'No artwork yet. Design is a fixed-price service you can buy now, and artwork has to reach production six weeks before the quoted lead time or packs are run unlabelled and retro-labelled at £0.35 a unit.',
      })
    }
    return out
  }, [format, units, markets, stage, artwork])

  const ready = Boolean(format) && typeof units === 'number' && markets.length > 0 && stage !== ''
  const blocked = flags.some((f) => f.level === 'stop')

  return (
    <div className="qb">
      <div className="qb__questions">
        <Q n={1} label="What format?">
          <div className="qb__chips">
            {FORMATS.map((f) => (
              <button key={f.slug} type="button"
                      className={formatSlug === f.slug ? 'qb__chip is-on' : 'qb__chip'}
                      aria-pressed={formatSlug === f.slug}
                      onClick={() => { setFormatSlug(f.slug); setPackaging([]) }}>
                {f.name}
              </button>
            ))}
          </div>
        </Q>

        <Q n={2} label="How many units?" hint={format ? `Published minimum: ${format.moq}` : 'Pick a format first and we will show you the minimum.'}>
          <input
            className="qb__num"
            type="number"
            min={0}
            step={1000}
            value={units}
            placeholder="e.g. 25000"
            onChange={(e) => setUnits(e.target.value === '' ? '' : Math.max(0, Math.floor(+e.target.value)))}
          />
        </Q>

        {format && (
          <Q n={3} label="How should it be packed?" hint="Options shown are the ones this format actually runs in.">
            <div className="qb__chips">
              {format.packaging.map((p) => (
                <button key={p} type="button"
                        className={packaging.includes(p) ? 'qb__chip is-on' : 'qb__chip'}
                        aria-pressed={packaging.includes(p)}
                        onClick={() => toggle(packaging, setPackaging, p)}>{p}</button>
              ))}
            </div>
          </Q>
        )}

        <Q n={format ? 4 : 3} label="Where will you sell it?" hint="This decides the panel format, the claim rules and how many artworks the job is.">
          <div className="qb__chips">
            {MARKETS.map((m) => (
              <button key={m} type="button"
                      className={markets.includes(m) ? 'qb__chip is-on' : 'qb__chip'}
                      aria-pressed={markets.includes(m)}
                      onClick={() => toggle(markets, setMarkets, m)}>{m}</button>
            ))}
          </div>
        </Q>

        <Q n={format ? 5 : 4} label="Where are you up to?">
          <div className="qb__chips">
            {STAGES.map((s) => (
              <button key={s.v} type="button"
                      className={stage === s.v ? 'qb__chip is-on' : 'qb__chip'}
                      aria-pressed={stage === s.v}
                      onClick={() => setStage(s.v)}>{s.l}</button>
            ))}
          </div>
        </Q>

        <Q n={format ? 6 : 5} label="Do you have artwork?">
          <div className="qb__chips">
            {[
              { v: 'ready', l: 'Print-ready, with a die line' },
              { v: 'draft', l: 'A design, not print-ready' },
              { v: 'none', l: 'Nothing yet' },
            ].map((o) => (
              <button key={o.v} type="button"
                      className={artwork === o.v ? 'qb__chip is-on' : 'qb__chip'}
                      aria-pressed={artwork === o.v}
                      onClick={() => setArtwork(o.v)}>{o.l}</button>
            ))}
          </div>
        </Q>
      </div>

      <aside className="qb__panel">
        <div className="qb__sticky">
          <h2 className="micro">Your specification</h2>

          {!format ? (
            <p className="small qb__empty">Pick a format and the specification builds as you answer.</p>
          ) : (
            <dl className="qb__spec">
              <dt>Format</dt><dd>{format.name}</dd>
              <dt>Volume</dt><dd className="spec">{typeof units === 'number' ? `${units.toLocaleString('en-GB')} units` : '—'}</dd>
              <dt>Minimum</dt><dd className="spec">{format.moq}</dd>
              <dt>Packed in</dt><dd>{packaging.length ? packaging.join(', ') : '—'}</dd>
              <dt>Markets</dt><dd>{markets.length ? markets.join(', ') : '—'}</dd>
              <dt>Lead time</dt><dd className="spec">{format.leadTime}</dd>
            </dl>
          )}

          {flags.length > 0 && (
            <ul className="qb__flags">
              {flags.map((f, i) => <li key={i} className={f.level === 'stop' ? 'is-stop' : ''}>{f.text}</li>)}
            </ul>
          )}

          <p className="qb__price">
            Manufacturing is quoted, never priced online — against your volume, format, components
            and market.
          </p>

          <a href="/contact" className={ready && !blocked ? 'btn btn--primary qb__send' : 'btn btn--ghost qb__send'}>
            {ready && !blocked ? 'Send this specification' : 'Talk it through with us'}
          </a>

          {artwork === 'none' && (
            <a href="/shop/design" className="btn btn--ghost qb__send">Buy the artwork · from £750</a>
          )}
        </div>
      </aside>
    </div>
  )
}

function Q({ n, label, hint, children }: { n: number; label: string; hint?: string; children: React.ReactNode }) {
  return (
    <fieldset className="qb__q">
      <legend><span className="qb__n spec">{String(n).padStart(2, '0')}</span>{label}</legend>
      {hint && <p className="qb__hint small">{hint}</p>}
      {children}
    </fieldset>
  )
}
