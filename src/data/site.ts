export const SITE = {
  name: 'Supplement Factory',
  tagline: 'We formulate, make, test and pack food supplements under your brand.',
  /** Ten formats, bulk or finished-packed. The one-line version of the offer. */
  summary:
    'A contract manufacturer with ten delivery formats, a white-label range, and the design, compliance and testing that go around them.',
  mainSite: 'https://www.supplementfactoryuk.com',
  designSite: '/design',
} as const

export const CONTACT = {
  /** Still unassigned since Dieter left. Same open decision as the design site. */
  namedPerson: null as string | null,
  salesEmail: 'sales@mysupplementfactory.com',
  responseTime: 'One working day',
} as const

export interface NavItem { label: string; href: string; children?: NavItem[] }

export const NAV: NavItem[] = [
  {
    label: 'Manufacturing',
    href: '/manufacturing',
    children: [
      { label: 'All ten formats', href: '/manufacturing' },
      { label: 'Capsules', href: '/manufacturing/capsules' },
      { label: 'Powders', href: '/manufacturing/powders' },
      { label: 'Gummies', href: '/manufacturing/gummies' },
      { label: 'Liquids and gels', href: '/manufacturing/liquids-and-gels' },
    ],
  },
  { label: 'White label', href: '/white-label' },
  { label: 'Packaging', href: '/packaging' },
  {
    label: 'Shop',
    href: '/shop',
    children: [
      { label: 'Design services', href: '/shop/design' },
      { label: 'Compliance checks', href: '/shop/compliance' },
      { label: 'Add-ons', href: '/shop/add-ons' },
      { label: 'Lab testing', href: '/shop/lab-testing' },
    ],
  },
  { label: 'Services', href: '/services' },
  { label: 'Our work', href: '/work' },
]

/**
 * The split that decides how the whole site behaves: what can be bought, and
 * what has to be quoted. Stated in one place so no page gets it wrong.
 */
export const COMMERCE_RULE = {
  buyable: 'Fixed price, fixed scope, and already sold that way — design, compliance checks, add-ons and lab tests.',
  quoted:
    'Everything with a minimum order quantity. Manufacturing, white label and packaging components are priced against volume, format and market, and no per-unit price list exists to sell them from.',
} as const
