/**
 * Products we have actually made, from the design and specification files.
 *
 * Names and figures here are what the files record, not a current price list,
 * and several are commercially sensitive (unit prices, order values). Nothing
 * with a price attached is published — the `value` fields stay internal and are
 * not rendered anywhere on the site.
 */

export interface ClientProduct {
  client: string
  product: string
  format: string
  pack: string
  engagement: 'Manufacturing' | 'Manufacturing + artwork' | 'Design only' | 'Manufacturing + label'
}

export const CLIENT_PRODUCTS: ClientProduct[] = [
  { client: 'Simply Glow', product: 'Peptan bovine collagen peptides, unflavoured, 318 g, 31 servings', format: 'Powder', pack: '188 × 260 mm stand-up pouch', engagement: 'Manufacturing + artwork' },
  { client: 'P90 Labs', product: 'Soccer Specific Performance Gel — Cognizin, magnesium malate, B5, B6, 30 ml', format: 'Gel', pack: 'Unette U03 stick with 12-count carton', engagement: 'Manufacturing + artwork' },
  { client: 'Epithe', product: "Women's gut and brain wellness powder, 14-day pack", format: 'Powder', pack: 'Matte stand-up pouch', engagement: 'Design only' },
  { client: 'Nabs', product: 'Delight Fit caffeine capsules', format: 'Capsules', pack: '100 and 150 ml PET bottle with 30s and 90s carton', engagement: 'Manufacturing' },
  { client: 'Wawan Nutrition', product: 'Mega Omega 3', format: 'Softgels', pack: '90 softgels, bilingual EN/AR label', engagement: 'Manufacturing' },
  { client: 'Dewty Beauty', product: 'Glowsticks collagen, Strawberry and Lemon', format: 'Powder', pack: '8 g foil stick packs', engagement: 'Manufacturing' },
  { client: 'Primark', product: 'Destress Food powder, Hair Skin Nails gummies, D3', format: 'Powder and gummies', pack: '300 ml and 250 ml bottles', engagement: 'Manufacturing' },
  { client: 'NextGenU', product: 'NovaSOL Liquid Curcumin + D3', format: 'Licaps', pack: '60 liquid capsules', engagement: 'Manufacturing' },
  { client: 'LevelSup', product: 'Pure Marine Collagen 375 g', format: 'Powder', pack: '300 × 110 mm foil-stamped label', engagement: 'Manufacturing + label' },
  { client: 'Ameri-Vita', product: 'Iron gummies and drink, multivitamin and lutein gummies, liver support drink', format: 'Gummies and liquid', pack: 'Bottles and liquid sachets', engagement: 'Manufacturing' },
]

/**
 * The design portfolio, grouped by pack format. Roughly 60 client artworks from
 * November 2025 to September 2026 — the best evidence of what we actually
 * deliver.
 */
export const PORTFOLIO = [
  { format: 'Pouches', brands: ['JMG', 'UNIQ Vigor', 'Harlo', 'Fuel Ex', 'Sero', 'AMARENE', 'Simply Glow', 'Epithe'] },
  { format: 'Bottle and jar labels', brands: ['Bower Botanicals', 'ERYNOQ', 'The Sozial Club', 'Nova Vita', 'MaYu', 'TIENS', 'Absolute Collagen'] },
  { format: 'Stick packs and sachets', brands: ['SIGRID', 'Fuel Ex', 'AMARENE', 'Nutra', 'P90'] },
  { format: 'Cartons and boxes', brands: ['Bower Botanicals', 'SIGRID', 'Nutra', 'ELVYA', 'Genesyx', 'AMARENE'] },
  { format: 'Retail display', brands: ['Ameri-Vita 4-tier FSDU'] },
  { format: 'Pet', brands: ['AniVatio / Petraceuticals', 'Arborea', 'LitPet'] },
] as const

/** From the Our Work showcase, across pouches, bottles, tubs, tubes and boxes. */
export const SHOWCASE = [
  'Dewty', 'FIT20', 'Origin', 'TRIP', 'Revivo', 'Elemis', 'ELEEK', 'New Sunset',
  'JSHealth', 'Basix', 'VOW', 'Onbord', 'Rheal', 'nutrifi', 'Up Swing', 'Hydrate', 'SYP',
] as const

/**
 * Same rule as the packaging design site: these are real client names, and
 * publishing them as endorsement needs their agreement. Names appear as a
 * portfolio of work delivered; no quotes, no logos, no claims on their behalf
 * until that is cleared.
 */
export const NAMES_CLEARED = false
