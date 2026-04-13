import assert from 'node:assert/strict'
import { verifyReceipt } from './index.js'

assert.equal(verifyReceipt(null).valid, false)
assert.equal(verifyReceipt('x').valid, false)
assert.equal(verifyReceipt({}).valid, false)

const payload = {
  receipt_id: 'r1',
  issued_at: '2026-01-01T00:00:00Z',
  attribution_method: 'deterministic_sde',
}
const sorted = JSON.stringify(
  Object.fromEntries(Object.entries(payload).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))),
)
const { createHash } = await import('node:crypto')
const sig = createHash('sha256').update(sorted, 'utf8').digest('hex')
const ok = verifyReceipt({ ...payload, sha256_signature: sig })
assert.equal(ok.valid, true)
assert.equal(ok.attribution_method, 'deterministic_sde')

console.log('index.test.ts: ok')
