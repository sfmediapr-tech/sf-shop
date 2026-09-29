import type { APIRoute } from 'astro'
import { appendFile, mkdir } from 'node:fs/promises'
import { dirname } from 'node:path'

/** Runs on the server: it writes to disk and may hold a mail credential. */
export const prerender = false

/**
 * The enquiry form endpoint.
 *
 * Every enquiry is written to a JSONL file first and forwarded second, in that
 * order and deliberately: if the mail provider is down, unconfigured or rejects
 * the message, the enquiry still exists on disk rather than evaporating into a
 * 500 while the customer is told it was sent. Nothing here reports success it
 * has not actually achieved.
 *
 * Forwarding is off unless RESEND_API_KEY and ENQUIRY_FORWARD_TO are both set.
 * Until then the file is the inbox, and the README says so plainly.
 */

const LOG = process.env.ENQUIRY_LOG ?? '.data/enquiries.jsonl'
const MAX = 4000

export const POST: APIRoute = async ({ request, redirect, clientAddress }) => {
  let form: FormData
  try {
    form = await request.formData()
  } catch {
    return redirect('/contact?error=unreadable', 303)
  }

  // Honeypot. A real person never fills a field they cannot see; a bot fills
  // everything. Accepted silently so the bot does not learn to skip it.
  if (str(form.get('website'))) return redirect('/enquiry-received', 303)

  const name = str(form.get('name'))
  const email = str(form.get('email'))
  const company = str(form.get('company'))
  const brief = str(form.get('brief')) || str(form.get('product'))
  const market = str(form.get('market'))

  if (!name || !email) return redirect('/contact?error=missing', 303)
  // Not a validator — just enough to catch a typo before it becomes an
  // unreplyable enquiry. Anything stricter rejects real addresses.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return redirect('/contact?error=email', 303)
  }

  const enquiry = {
    at: new Date().toISOString(),
    name, email, company, brief, market,
    source: new URL(request.url).origin,
    ip: clientAddress ?? null,
  }

  try {
    await mkdir(dirname(LOG), { recursive: true })
    await appendFile(LOG, JSON.stringify(enquiry) + '\n', 'utf8')
  } catch (e) {
    // If it cannot be stored it must not be reported as received.
    console.error('[enquiry] could not be stored', e)
    return redirect('/contact?error=storage', 303)
  }

  const key = process.env.RESEND_API_KEY
  const to = process.env.ENQUIRY_FORWARD_TO
  if (key && to) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: process.env.ENQUIRY_FROM ?? 'enquiries@mysupplementfactory.com',
          to: [to],
          reply_to: email,
          subject: `Enquiry — ${company || name}`,
          text: [
            `Name:    ${name}`,
            `Email:   ${email}`,
            `Company: ${company || '—'}`,
            `Market:  ${market || '—'}`,
            '',
            brief || '(no brief given)',
          ].join('\n'),
        }),
      })
      if (!res.ok) console.error('[enquiry] forward rejected', res.status, await res.text())
    } catch (e) {
      // Already on disk, so this is a delivery problem rather than a lost lead.
      console.error('[enquiry] forward failed', e)
    }
  } else {
    console.warn(`[enquiry] stored in ${LOG}; forwarding is not configured`)
  }

  return redirect('/enquiry-received', 303)
}

function str(v: FormDataEntryValue | null): string {
  return typeof v === 'string' ? v.trim().slice(0, MAX) : ''
}
