/**
 * The off-the-shelf and white-label range: ready-made formulations under the
 * client's own brand.
 *
 * Note the MOQs here are much higher than the bespoke MOQs on the main site —
 * 200,000 to 300,000 against 25,000 capsules and 200 powder pouches. The two
 * sources genuinely disagree and sales should confirm which applies before
 * anyone quotes from this page. It is in the README as a launch blocker.
 */

export interface WhiteLabelRange {
  slug: string
  name: string
  detail: string
  moq: string
  topSellers: string[]
  packing: string[]
}

export const RANGES: WhiteLabelRange[] = [
  {
    slug: 'capsules',
    name: 'Capsules',
    detail: 'Sizes #1, #0, #00 and #00el, fill 300–900 mg. Coloured shells from 1M units.',
    moq: '300,000 bulk or packed',
    topSellers: ['Nootropic', 'B Complex', 'Male Enhancement'],
    packing: ['Pots', 'Pouches', 'Blister', 'Sachets'],
  },
  {
    slug: 'probiotic-capsules',
    name: 'Probiotic capsules',
    detail: 'DR acid-resistant shells with off-the-shelf formulas.',
    moq: '300,000',
    topSellers: ["Women's Health", 'Gut Health', 'Mental Wellbeing'],
    packing: ['Glass jars', 'Pouches', 'Alu-Alu blister'],
  },
  {
    slug: 'tablets',
    name: 'Tablets',
    detail: 'Hard, chewable or dissolvable. Shape and colour set by the formulation.',
    moq: '300,000',
    topSellers: ['A–Z Multivit', 'Calcium + Vitamin D', 'Magnesium'],
    packing: ['Pots', 'Jars', 'Pouches'],
  },
  {
    slug: 'powders',
    name: 'Powders',
    detail: 'White-label or bespoke, with flavour and product matching.',
    moq: '1 tonne bulk or 200,000 sachets',
    topSellers: ['Magnesium', 'Collagen', 'Energy'],
    packing: ['Tubs', 'Pouches', 'Stick packs', 'Sachets'],
  },
  {
    slug: 'softgels',
    name: 'Softgels',
    detail: 'Oval 100–800 mg, oblong 800–1,500 mg, fish 150–500 mg. Colour on request.',
    moq: '300,000',
    topSellers: ['Omega 3', 'Evening Primrose', 'Cod Liver Oil'],
    packing: ['Pots and pouches only'],
  },
  {
    slug: 'liquid',
    name: 'Liquid',
    detail: 'White-label or bespoke, in tubes, glass or PP bottles.',
    moq: '200,000 tubes or bottles · 1 tonne bulk',
    topSellers: ['Collagen', 'Energy', 'Endurance'],
    packing: ['Tubs', 'Pouches', 'Sticks', 'Sachets'],
  },
  {
    slug: 'gummies',
    name: 'Gummies',
    detail:
      'Fibre, ACV, elderberry, ashwagandha, calcium and beetroot. Shapes: berry, diamond, cylinder, dome, rose, paw, heart, sun. Bespoke moulds available.',
    moq: '200,000',
    topSellers: ['Creatine', 'Nootropic', 'Beauty'],
    packing: ['Pots', 'Pouches'],
  },
  {
    slug: 'pet',
    name: 'Pet — SF Pet and Petraceuticals',
    detail:
      'White-label cat and dog treats. ProJoint chews and oral gel, ProGut and Puppy Tummy Tamer under private label.',
    moq: 'Stock dependent',
    topSellers: [],
    packing: ['Jars', 'Sachets', 'Pouches'],
  },
]

export const MOQ_CONFLICT_NOTE =
  'Off-the-shelf minimums run higher than the bespoke ones published on the main site. Confirm with sales which applies to your project before you plan around a number.'
