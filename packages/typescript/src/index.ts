import { createHash } from 'node:crypto'

export interface VerificationResult {
  valid: boolean
  receipt_id?: string
  issued_at?: string
  attribution_method?: string
  ccs_score?: number
  confidence?: string
  reason?: string
}

// Raw Unicode sort — NOT localeCompare
function rawSort(entries: [string, unknown][]): [string, unknown][] {
  return [...entries].sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
}

function signPayload(payload: Record<string, unknown>): string {
  const sorted = Object.fromEntries(rawSort(Object.entries(payload)))
  const canonical = JSON.stringify(sorted) // compact, no whitespace
  return createHash('sha256').update(canonical, 'utf8').digest('hex')
}

export function verifyReceipt(receipt: unknown): VerificationResult {
  if (!receipt || typeof receipt !== 'object') {
    return { valid: false, reason: 'Input must be a JSON object' }
  }

  const { sha256_signature: stored, ...payload } = receipt as Record<string, unknown>

  if (typeof stored !== 'string' || stored.length !== 64) {
    return { valid: false, reason: 'Missing or invalid sha256_signature' }
  }

  const computed = signPayload(payload)

  if (computed !== stored) {
    return { valid: false, reason: 'Signature mismatch — receipt may have been tampered' }
  }

  const r = payload as Record<string, unknown>
  return {
    valid: true,
    receipt_id: r.receipt_id as string,
    issued_at: r.issued_at as string,
    attribution_method: r.attribution_method as string,
    ccs_score: r.ccs_score as number,
    confidence: r.confidence as string,
  }
}
