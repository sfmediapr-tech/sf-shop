/**
 * Packaging and components. We supply the finished pack, not just the fill.
 *
 * These are the components that appear in our own specifications and artwork
 * files, with the sizes actually seen. None of them are priced online: no
 * per-unit component price, cutter cost, origination or print price exists
 * anywhere in the business, so quoting them from a website would be inventing
 * numbers.
 */

export interface Component {
  slug: string
  name: string
  sizes: string[]
  materials: string[]
  examples: string[]
}

export const COMPONENTS: Component[] = [
  {
    slug: 'bottles',
    name: 'Bottles',
    sizes: ['100 ml clear PET — 30 capsules', '150 ml clear PET — 90 capsules', '250 ml — 60 gummies', '300 ml — 112 g powder'],
    materials: ['PET'],
    examples: ['Nabs', 'Primark'],
  },
  {
    slug: 'pots-and-tubs',
    name: 'Pots and tubs',
    sizes: ['Standard and custom colours'],
    materials: ['PET and rPET, 15–100% recycled', 'Matte to gloss'],
    examples: [],
  },
  {
    slug: 'closures',
    name: 'Closures',
    sizes: ['38 mm grooved aluminium cap'],
    materials: ['Aluminium', 'Tin plate', 'Desiccant option'],
    examples: ['Nabs'],
  },
  {
    slug: 'labels',
    name: 'Labels',
    sizes: ['48 × 140 mm', '210 × 68 mm', '185 × 74 mm', '300 × 110 mm'],
    materials: ['Self-adhesive PP', 'Silver PP', 'Varnish or laminate', 'Foil stamping'],
    examples: ['Nabs', 'Primark', 'LevelSup'],
  },
  {
    slug: 'stand-up-pouches',
    name: 'Stand-up zip pouches',
    sizes: ['188 × 260 mm with 55 mm gusset', '130 × 190 mm face with 40 mm gusset, matte'],
    materials: ['Laminate', 'Metallised PET', 'Recyclable and compostable options'],
    examples: ['Simply Glow', 'Epithe'],
  },
  {
    slug: 'stick-packs',
    name: 'Stick packs',
    sizes: ['8 g printed laminate foil, powder', 'Unette U03 92 × 150.28 mm', 'Unette U016 92 × 156.63 mm', 'Unette U41 70 × 141.81 mm'],
    materials: ['Printed laminate foil'],
    examples: ['Dewty', 'P90 Labs'],
  },
  {
    slug: 'sachets',
    name: 'Sachets',
    sizes: ['Single-serve powder or liquid'],
    materials: ['Laminate'],
    examples: [],
  },
  {
    slug: 'retail-cartons',
    name: 'Retail cartons',
    sizes: ['30s and 90s capsule cartons', '12-stick gel box'],
    materials: ["Printed board, client's own die line"],
    examples: ['Nabs', 'P90 Labs'],
  },
  {
    slug: 'blister-packs',
    name: 'Blister packs',
    sizes: ['Capsules and tablets', 'Alu-Alu available'],
    materials: ['Foil', 'Child-resistant and senior-friendly options'],
    examples: [],
  },
  {
    slug: 'tubes-and-sleeves',
    name: 'Tubes and sleeves',
    sizes: ['Glass tubes', 'Fully printed card tubes', 'Viskrine tamper sleeve'],
    materials: ['Glass', 'Card'],
    examples: [],
  },
  {
    slug: 'outer-cases',
    name: 'Outer cases',
    sizes: ['168 bottles per case', 'Palletised on Standard Grade A'],
    materials: ['Corrugated'],
    examples: ['Nabs', 'P90'],
  },
  {
    slug: 'leaflets',
    name: 'Leaflets',
    sizes: ['Pack insert'],
    materials: ['Paper'],
    examples: ['P90'],
  },
]

export const FINISHES = [
  'Matte laminate',
  'Gloss laminate',
  'Spot gloss',
  'Foil stamping',
  'Gold stamping',
  'Embossing',
] as const

/**
 * Two hard rules that cost real money when they are missed, both from the P90
 * Labs file. Worth stating on the page rather than in a follow-up email.
 */
export const RULES = [
  {
    headline: 'Die lines come from your packaging supplier, in your own name',
    detail:
      'Unette for sticks, Glossop CAD for cartons. A die line drawn for another customer cannot be used — we have had exactly that on a live project, and the carton had to be redrawn.',
  },
  {
    headline: 'Artwork must reach us six weeks before the quoted lead time',
    detail:
      'Later than that and packs are produced unlabelled and retro-labelled at £0.35 per unit. On a 10,000-unit run that is £3,500 for being late with a PDF.',
  },
] as const

export const RETRO_LABEL_PENCE = 35
