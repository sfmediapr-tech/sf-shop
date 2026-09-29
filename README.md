# Supplement Factory — the shop

The ecommerce site, built from
[Supplement Factory Product & Packaging Overview](../../Downloads/Supplement%20Factory%20Product%20%26%20Packaging%20Overview.pdf)
(24 Sep 2026). Twenty-five pages: the full manufacturing catalogue, the white-label range, the
packaging components, a working basket and Stripe checkout, and a quote builder for everything
that cannot be bought online.

```bash
npm install && npm run dev    # http://localhost:4340
npm run build                 # static pages + a Node server for the two API routes
```

## The commercial rule this site is built on

**Almost nothing in the overview can take money at a checkout.** Bespoke manufacturing runs
25,000–500,000 unit MOQs, the off-the-shelf range runs 200,000–300,000, and no per-unit price
list exists anywhere in the business. Packaging components are the same — no component price,
cutter cost, origination or print price exists to sell from.

So the site splits cleanly, and says so on the homepage, in the footer and on every page:

| | |
|---|---|
| **Bought outright** | Design services (£750–£1,500), compliance checks (£750–£1,000), add-ons (£100–£500), SF Lab tests (£40–£897). All fixed price, fixed scope, and already sold that way. |
| **Quoted** | Manufacturing, white label, packaging components, branding, formulation, media, registration, export, the Brand Accelerator. |

Gold is reserved for a price you can actually pay. A quoted figure is never gold. That is the
commercial rule made visible, so a visitor can tell at a glance what is buyable.

## Layout

```
src/
├── data/
│   ├── formats.ts      ten manufacturing formats, MOQs, lead times, real examples
│   ├── shop.ts         everything with a price — the only file checkout trusts
│   ├── whitelabel.ts   eight off-the-shelf ranges
│   ├── packaging.ts    twelve component types, plus the two rules that cost money
│   ├── clients.ts      products made here, and the design portfolio by format
│   └── site.ts         nav, contact, and the buy-vs-quote rule in one place
├── islands/
│   ├── basketStore.ts  localStorage basket: SKUs and quantities only, never prices
│   ├── AddToBasket.tsx · BasketCount.tsx · Basket.tsx
│   └── QuoteBuilder.tsx  six questions, with the volume checked against the MOQ
├── pages/
│   ├── api/checkout.ts   Stripe Checkout Session, server-side re-pricing
│   └── …                 25 pages, ten of them generated from formats.ts
└── styles/global.css
```

## Checkout, and why it cannot be cheated

The basket stores **SKUs and quantities only**. No prices are ever written to localStorage, and
`/api/checkout` re-prices every line from `data/shop.ts` before creating the Stripe session. A
tampered basket cannot buy a £1,500 design tier for a pound — the request's own price field is
simply never read.

Verified against the running endpoint:

| Request | Response |
|---|---|
| Unknown SKU | `400 We no longer sell NOT-A-THING.` |
| Quantity 9,999 | `400 Quantity for DSN-PKG-3 is out of range.` |
| Empty basket | `400 Your basket is empty.` |
| Line with no SKU | `400 A basket line was malformed.` |
| Client sends its own `pricePence` | Ignored — the catalogue price is used |

VAT is left to Stripe Tax against the billing address rather than guessed from an IP, and
billing address collection is required so it can be worked out at all.

**Without `STRIPE_SECRET_KEY` set, the basket still works** and the checkout button says plainly
that card payment is not switched on, offering to send the basket as an enquiry instead. A
customer never fills a basket and hits a dead button.

Copy `.env.example` to `.env` and add test keys to switch it on. No keys are in this repo.

## The quote builder

`/quote`. Six questions, and it does the one check the packaging design site could not:
**a volume below the format's published minimum is caught before submission**, with the actual
figure quoted back. It also flags a US market (Supplement Facts panel, dual net weight, the
disclaimer), a Canadian one (NPN, bilingual panels matching the licence), having no formulation
yet, and having no artwork — which carries the £0.35-per-unit retro-labelling warning.

## Three contradictions this site did not paper over

All three are in the overview, and all three are one edit each once someone settles them.

1. **Capsule MOQ.** The main site's homepage says 30,000; the MOQ page says 25,000. Published
   here as 25,000 — `formats.ts`, `MOQ_CONFLICT`.
2. **The Branding Package.** £2,500 in the label proposal, £5,000 in the packaging proposal, and
   one live client invoiced £1,500 + £250. It is therefore **not** in the basket — it is quoted,
   and the page says why. `shop.ts`, `QUOTED_SERVICES`.
3. **Off-the-shelf versus bespoke MOQs.** 200,000–300,000 here against 25,000 capsules and 200
   powder pouches on the main site. Flagged on `/white-label` rather than silently picking one.

A fourth, smaller one: the additional revision round is recorded between £100 and £200 across
sources. Published at £200, per the Add-on Services T&Cs, and noted on the product.

## Still open

- **`CONTACT.namedPerson` is `null`** — nobody has replaced dieter@mysupplementfactory.com. Same
  open decision as the packaging design site.
- **`NAMES_CLEARED` is `false`** in `clients.ts`. Client names appear as a record of work
  delivered; pack photography, quotes and logos wait on each brand agreeing.
- **`/api/enquiry` does not exist.** Both forms post to it.
- **No order record.** Stripe holds the order; nothing writes it into The Hive yet. That is the
  obvious next integration, since The Hive already generates, signs and invoices quotes.
- **Commercially sensitive figures were left out.** The overview carries client unit prices and
  order values (one at £10,315.20, another at £12.92 a box). None are published; `clients.ts`
  records what was made, not what it cost.

## The three sites

| | | |
|---|---|---|
| `sf-pack-ai` | :5178 | The engine — die lines, 3D, compliance rules, PDF/X-4 |
| `sf-packaging-site` | :4330 | The packaging design service site |
| `sf-shop` | :4340 | This — the catalogue and the shop |

They share a visual language and no code. The compliance logic in `sf-pack-ai/src/core` is
headless and worth importing into the quote builder when format-rule validation goes deeper than
an MOQ comparison.
