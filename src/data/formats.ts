/**
 * The ten manufacturing formats, all offered bulk or finished-packed.
 *
 * Nothing here is purchasable. Every one of these is quoted, because the MOQs
 * run from 25,000 to 500,000 units and no per-unit price list exists anywhere in
 * the business. The pages sell the capability and route to the quote builder.
 */

export interface ManufacturingFormat {
  slug: string
  name: string
  /** One line for the catalogue card. */
  summary: string
  variants: string[]
  packaging: string[]
  /** As published. See MOQ_CONFLICT below. */
  moq: string
  moqUnits: number | null
  leadTime: string
  /** Real products we have made, from the design and spec files. */
  examples: string[]
  /** The Hive's product_group value, where one maps. Keeps a quote traceable. */
  hiveGroup: string | null
}

export const FORMATS: ManufacturingFormat[] = [
  {
    slug: 'capsules',
    name: 'Capsules',
    summary: 'Clear HPMC vegan, gelatin or liquid-fill, in sizes 0 through 00el.',
    variants: ['Clear HPMC (vegan) size 0', 'Gelatin', 'Liquid-fill'],
    packaging: ['Bulk', 'Pots and bottles', 'Pouches', 'Blister', 'Carton'],
    moq: '25,000 · 300,000 for blister',
    moqUnits: 25000,
    leadTime: '6–12 weeks',
    examples: ['Nabs Delight Fit 30s and 90s', 'NextGenU Liquid Curcumin 60s'],
    hiveGroup: 'capsules',
  },
  {
    slug: 'tablets',
    name: 'Tablets',
    summary: 'Hard, chewable or dissolvable, with shape and colour set by the formulation.',
    variants: ['Iron 25 mg', 'Zinc 20 mg', 'Folic acid 400 µg', 'Vitamin C 500 / 1000 mg'],
    packaging: ['Bulk', 'Pots', 'Pouches'],
    moq: '25,000',
    moqUnits: 25000,
    leadTime: '6–12 weeks',
    examples: ['Shufersal range'],
    hiveGroup: 'tablets',
  },
  {
    slug: 'softgels',
    name: 'Softgels',
    summary: 'Oval, oblong and fish shapes in bovine gelatin, Halal certified.',
    variants: ['Bovine gelatin', 'Halal certified', 'Oval 100–800 mg', 'Oblong 800–1,500 mg', 'Fish 150–500 mg'],
    packaging: ['Bulk', 'Pots', 'Pouches'],
    moq: '300,000',
    moqUnits: 300000,
    leadTime: '6–12 weeks',
    examples: ['Wawan Mega Omega 3, 90s'],
    hiveGroup: 'softgels',
  },
  {
    slug: 'gummies',
    name: 'Gummies',
    summary: 'Pectin, vegan, in eight stock shapes or a bespoke mould.',
    variants: ['Pectin (vegan)', 'Shapes: berry, diamond, cylinder, dome, rose, paw, heart, sun', 'Bespoke moulds'],
    packaging: ['Bulk', 'Pots and bottles', 'Pouches'],
    moq: '300,000',
    moqUnits: 300000,
    leadTime: '6–12 weeks',
    examples: ['Primark Hair Skin Nails 60s', 'Ameri-Vita Iron, Multi and Lutein'],
    hiveGroup: 'gummies',
  },
  {
    slug: 'powders',
    name: 'Powders',
    summary: 'Collagen, protein and meal shakes, greens, nootropics, pre-workout, lattes and teas.',
    variants: ['Collagen', 'Protein and meal shakes', 'Greens', 'Nootropics', 'Pre-workout', 'Lattes and teas'],
    packaging: ['Bulk 200 kg', 'Tubs and pots', 'Pouches', 'Sachets', 'Stick packs'],
    moq: '200 units in pots or pouches · 50,000 sticks or sachets',
    moqUnits: 200,
    leadTime: '6–12 weeks · 8–12 for pot and carton',
    examples: ['Simply Glow 318 g pouch', 'Epithe 14-day pouch', 'Primark Destress Food', 'Dewty 8 g Glowsticks', 'LevelSup 375 g'],
    hiveGroup: 'powder',
  },
  {
    slug: 'liquids-and-gels',
    name: 'Liquids and gels',
    summary: 'Shots, tinctures, sprays, liquid sachets and gel sticks.',
    variants: ['Shots', 'Tinctures', 'Sprays', 'Liquid sachets', 'Gel sticks'],
    packaging: ['Bottles', 'Sachets', 'Stick packs', '12-count carton'],
    moq: '10,000 bottles · 50,000 sticks',
    moqUnits: 10000,
    leadTime: '8–12 weeks',
    examples: ['P90 Labs 30 ml Performance Gel, 12 per box', 'Ameri-Vita Fe+ and Liver drinks'],
    hiveGroup: 'liquid',
  },
  {
    slug: 'licaps',
    name: 'Licaps',
    summary: 'Liquid-filled hard capsules, sealed for liquid actives.',
    variants: ['Liquid-filled hard capsules'],
    packaging: ['Bulk', 'Pots', 'Pouches', 'Blister'],
    moq: '500,000',
    moqUnits: 500000,
    leadTime: '6–12 weeks',
    examples: ['Ben Coomber Algae Licaps'],
    hiveGroup: null,
  },
  {
    slug: 'duocaps',
    name: 'Duocaps',
    summary: 'Capsule-in-capsule, for separating two actives in one dose.',
    variants: ['Capsule-in-capsule'],
    packaging: ['Bulk', 'Pots', 'Pouches', 'Blister'],
    moq: '500,000',
    moqUnits: 500000,
    leadTime: '6–12 weeks',
    examples: [],
    hiveGroup: null,
  },
  {
    slug: 'beadlets',
    name: 'Beadlets',
    summary: 'Specialty beadlet formats for controlled release.',
    variants: ['Specialty'],
    packaging: ['Bulk', 'Pots', 'Pouches', 'Blister'],
    moq: '500,000',
    moqUnits: 500000,
    leadTime: '6–12 weeks',
    examples: ['Sample tracker only'],
    hiveGroup: null,
  },
  {
    slug: 'functional-foods',
    name: 'Functional foods',
    summary: 'Protein cookies, brownies, pancakes and teas.',
    variants: ['Protein cookies', 'Brownies', 'Pancakes', 'Teas'],
    packaging: ["Client's own pack"],
    moq: 'Not published — quoted per project',
    moqUnits: null,
    leadTime: 'Quoted per project',
    examples: ['Tentorium', 'Protein Kitchen', 'On Group samples'],
    hiveGroup: null,
  },
]

export const formatBySlug = (slug: string) => FORMATS.find((f) => f.slug === slug)

/**
 * The website homepage says capsules are "MOQ from 30,000 units" while the MOQ
 * page says 25,000. This site publishes 25,000 — the MOQ page is the more
 * specific source — and the conflict is in the README for someone to settle.
 * Changing it is one number in this file.
 */
export const MOQ_CONFLICT =
  'Capsule MOQ is published here as 25,000, per the MOQ page. The homepage of the main site says 30,000. Settle before launch.'

/** Nothing on a manufacturing page is a checkout item, and the pages say so. */
export const QUOTE_ONLY =
  'Manufacturing is quoted, not bought online. Tell us the format, the volume and the market and we will price it properly.'
