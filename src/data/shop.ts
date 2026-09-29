/**
 * The shop. Everything in this file is fixed price, fixed scope, and already
 * sold that way today — which is the whole test for whether something belongs
 * in a basket rather than behind a quote.
 *
 * Prices are from Dieter's 2026 Label and Packaging Design Service proposals,
 * the Add-on Services T&Cs attached to the P90 Labs quotation (18 May 2026), and
 * the SF Lab testing price list. VAT applies to UK-based clients and is handled
 * by Stripe at checkout rather than baked into these figures.
 */

export type Category = 'design' | 'compliance' | 'add-on' | 'lab'

export interface Product {
  sku: string
  name: string
  category: Category
  /** Pence, because money in floats is how rounding bugs reach an invoice. */
  pricePence: number
  unit: string
  blurb: string
  includes?: string[]
  /** Shown where a price needs defending rather than just stating. */
  note?: string
  /** Some items only make sense bought against an existing project. */
  requiresProject?: boolean
}

const p = (pounds: number) => Math.round(pounds * 100)

export const PRODUCTS: Product[] = [
  // ── Design ────────────────────────────────────────────────────────────
  {
    sku: 'DSN-LABEL',
    name: 'Label Design Service',
    category: 'design',
    pricePence: p(750),
    unit: 'per product, one pack format',
    blurb:
      'One product, one packaging format. A questionnaire brief, a print-ready proposal, three revision rounds and a compliance check before anything goes to print.',
    includes: [
      'Questionnaire brief',
      'Print-ready design proposal',
      'Up to 3 revision rounds',
      'Compliance check with Quality and Technical',
      'AI, PSD and PDF handover files',
    ],
    note: '4 to 6 weeks, from the point we have what we need.',
  },
  {
    sku: 'DSN-PKG-1',
    name: 'Packaging Design — Tier 1',
    category: 'design',
    pricePence: p(1000),
    unit: 'per product, bottle jar or tub',
    blurb: 'One product in a bottle, jar or tub. A label wraps a cylinder, so the join is designed rather than discovered.',
    includes: [
      'Design proposal',
      'Up to 3 revision rounds',
      'Compliance check against your market',
      'Final artwork files, full ownership',
    ],
  },
  {
    sku: 'DSN-PKG-2',
    name: 'Packaging Design — Tier 2',
    category: 'design',
    pricePence: p(1250),
    unit: 'per product, pouch',
    blurb:
      'One product in a pouch. Front, back, both gussets and the seal are laid out as a single artwork against the supplier’s cutter guide.',
    includes: [
      'Design proposal',
      'Up to 3 revision rounds',
      'Compliance check against your market',
      'Final artwork files, full ownership',
    ],
  },
  {
    sku: 'DSN-PKG-3',
    name: 'Packaging Design — Tier 3',
    category: 'design',
    pricePence: p(1500),
    unit: 'per product, dual type',
    blurb:
      'Two components that have to work as one product — a stick and its carton, a tub and its box. Two artworks, one design system.',
    includes: [
      'Design proposal',
      'Up to 3 revision rounds',
      'Compliance check across both artworks',
      'Final artwork files, full ownership',
    ],
  },

  // ── Compliance ────────────────────────────────────────────────────────
  {
    sku: 'CMP-CHECK',
    name: 'Compliance Check',
    category: 'compliance',
    pricePence: p(750),
    unit: 'per artwork',
    blurb:
      'You already have a design and you are not sure it is legal where you sell. Our Technical and Quality team review it and tell you what has to change.',
    includes: [
      'Twelve-point review against your market',
      'Report with the modifications needed',
    ],
  },
  {
    sku: 'CMP-PLUS',
    name: 'Compliance Check Plus',
    category: 'compliance',
    pricePence: p(1000),
    unit: 'per artwork',
    blurb: 'The same review, plus one design amendment to make the artwork fully compliant.',
    includes: [
      'Twelve-point review against your market',
      'Report with the modifications needed',
      'One design amendment applied',
    ],
  },

  // ── Add-ons ───────────────────────────────────────────────────────────
  {
    sku: 'ADD-DUAL',
    name: 'Dual-type packaging',
    category: 'add-on',
    pricePence: p(250),
    unit: 'per SKU',
    blurb: 'A second pack component on an existing design project.',
    requiresProject: true,
  },
  {
    sku: 'ADD-LANG-LTR',
    name: 'Additional language, left-to-right',
    category: 'add-on',
    pricePence: p(200),
    unit: 'per language, per artwork',
    blurb: 'Each extra left-to-right language on one artwork.',
    requiresProject: true,
  },
  {
    sku: 'ADD-LANG-RTL',
    name: 'Additional language, right-to-left',
    category: 'add-on',
    pricePence: p(400),
    unit: 'per language, per artwork',
    blurb: 'Each extra right-to-left language on one artwork.',
    note:
      'Double the left-to-right price, and it should be: a right-to-left pack is a mirrored layout with different typesetting, rebuilt rather than translated.',
    requiresProject: true,
  },
  {
    sku: 'ADD-REV',
    name: 'Additional revision round',
    category: 'add-on',
    pricePence: p(200),
    unit: 'per round, per artwork',
    blurb: 'Each round beyond the three included in your tier.',
    note: 'Recorded between £100 and £200 across sources. Published here at £200, per the Add-on Services T&Cs.',
    requiresProject: true,
  },
  {
    sku: 'ADD-TERR',
    name: 'Artwork territory variation',
    category: 'add-on',
    pricePence: p(500),
    unit: 'per territory',
    blurb: 'A variation of your primary artwork, compliant with a new territory of sale.',
    note: 'A Canadian pack is not a US pack with the French removed. It is a second artwork.',
    requiresProject: true,
  },
  {
    sku: 'ADD-MOCKUP',
    name: 'Mockup photo',
    category: 'add-on',
    pricePence: p(100),
    unit: 'per mockup',
    blurb: 'A rendered pack shot of your finished artwork, for listings and decks.',
    requiresProject: true,
  },
]

/**
 * SF Lab testing. A real menu with real per-test prices, which makes it the one
 * part of the technical side that can genuinely be bought online.
 */
export interface LabTest {
  sku: string
  name: string
  pricePence: number
  group: 'Microbiology' | 'Heavy metals' | 'Vitamins' | 'Allergens' | 'Contaminants'
  detail?: string
}

export const LAB_TESTS: LabTest[] = [
  { sku: 'LAB-MICRO', name: 'Microbiology screen', pricePence: p(100), group: 'Microbiology' },
  { sku: 'LAB-MICRO-LIS', name: 'Microbiology screen with Listeria', pricePence: p(150), group: 'Microbiology' },
  { sku: 'LAB-METALS', name: 'Heavy metals', pricePence: p(70), group: 'Heavy metals' },
  { sku: 'LAB-METALS-EXT', name: 'Extended metals', pricePence: p(101.5), group: 'Heavy metals' },
  { sku: 'LAB-VIT', name: 'Vitamin assay', pricePence: p(59), group: 'Vitamins', detail: 'From £59 per vitamin, to £139 depending on the assay' },
  { sku: 'LAB-GLUTEN', name: 'Gluten', pricePence: p(92), group: 'Allergens' },
  { sku: 'LAB-ALLERGEN', name: 'Single allergen', pricePence: p(40), group: 'Allergens', detail: 'From £40 per allergen, to £107 depending on the method' },
  { sku: 'LAB-NUT9', name: '9-nut screen', pricePence: p(897), group: 'Allergens' },
  { sku: 'LAB-PEST', name: 'Pesticides', pricePence: p(316), group: 'Contaminants' },
]

/**
 * Sold, but not in the basket — because the price genuinely varies or the
 * sources disagree and publishing a number would be guessing.
 */
export interface QuotedService {
  slug: string
  name: string
  blurb: string
  priceLabel: string
  detail: string[]
  /** Where the price is unsettled, say so rather than pick one. */
  unresolved?: string
}

export const QUOTED_SERVICES: QuotedService[] = [
  {
    slug: 'branding-package',
    name: 'Branding Package',
    blurb: 'A logo suite, brand guidelines, one packaging design and a compliance check.',
    priceLabel: 'Quoted per project',
    detail: [
      'Brand direction moodboard',
      'Logo proposal, then a logo suite — wordmark, brandmark, stampmark',
      'Palette and typography',
      'Branding sheet',
      'One packaging design with compliance check',
    ],
    unresolved:
      'Priced at £2,500 in the label proposal and £5,000 in the packaging proposal, with one live client invoiced £1,500 plus £250. Quoted per project until that is reconciled.',
  },
  {
    slug: 'formulation',
    name: 'Formulation Service',
    blurb: 'Market analysis, regulatory and claims review, a formulation draft and a sample.',
    priceLabel: 'Target-cost led',
    detail: [
      'Kick-off and market analysis',
      'Regulatory and claims review',
      'Formulation draft',
      'Sample, then a draft quote',
      'About 28 days, plus 6 weeks to samples',
      'The formula becomes yours',
    ],
  },
  {
    slug: 'sf-media',
    name: 'SF Media Services',
    blurb: 'Storyboard, filming, drone footage and social content.',
    priceLabel: 'Quoted per project',
    detail: ['Storyboard proposal', 'Filming and drone footage', 'Footage delivery', 'Social content'],
  },
  {
    slug: 'brand-accelerator',
    name: 'SF Brand Accelerator',
    blurb: 'A three-phase growth programme, from company formation to international retail.',
    priceLabel: 'From £5,000 per month',
    detail: [
      'Phase 1 Launch — company formation, trademark, compliance, positioning, identity, e-commerce site. £5,000/month × 6',
      'Phase 2 Incubation — PR, social, email, paid ads, TikTok Shop, Amazon, fulfilment, reporting. £8–10k/month × 6–9',
      'Phase 3 Growth — national PR, influencers, marketplaces, retail, international, advisory. £10k+/month rolling',
    ],
  },
  {
    slug: 'product-registration',
    name: 'Product Registration',
    blurb: 'Registration in your market, through third-party regulatory experts.',
    priceLabel: 'Quoted per market',
    detail: ['Handled via third-party experts', 'Market-by-market'],
  },
  {
    slug: 'export-support',
    name: 'Global Export Support',
    blurb: 'Export documentation and market entry across 35+ countries.',
    priceLabel: 'Quoted per project',
    detail: ['Exports team covers 35+ countries', 'Documentation and market entry'],
  },
  {
    slug: 'market-research',
    name: 'Market Research',
    blurb: 'Category and competitor analysis before you commit to a formulation.',
    priceLabel: 'Quoted per project',
    detail: ['Category analysis', 'Competitor review'],
  },
  {
    slug: 'stability',
    name: 'Stability and Product Passport',
    blurb: 'Stability programme and the product passport that comes out of it.',
    priceLabel: 'Quoted per project',
    detail: ['Stability testing programme', 'Product passport'],
  },
]

export const gbp = (pence: number) =>
  '£' + (pence / 100).toLocaleString('en-GB', { minimumFractionDigits: pence % 100 ? 2 : 0, maximumFractionDigits: 2 })

export const productBySku = (sku: string): Product | LabTest | undefined =>
  PRODUCTS.find((x) => x.sku === sku) ?? LAB_TESTS.find((x) => x.sku === sku)

/** Every basket line has to resolve to one of these, or checkout refuses it. */
export const ALL_BUYABLE = [...PRODUCTS, ...LAB_TESTS]
