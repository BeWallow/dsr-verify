Verification library for DSR/1.0 — the open standard for cryptographically
signed production incident receipts.

**MIT Licensed · Zero dependencies · No network calls · No Déjà account required**

## Install

```bash
npm install @deja-dev/dsr-verify
```

## Usage

```typescript
import { verifyReceipt } from "@deja-dev/dsr-verify";

const result = verifyReceipt(receiptJson);

if (result.valid) {
  console.log("✓ Receipt verified");
  console.log("Attribution:", result.attribution_method); // "deterministic_sde"
  console.log("CCS Score:", result.ccs_score); // 0.9200
} else {
  console.error("✕ Invalid:", result.reason);
}
```

## What it does

Verifies that a DSR/1.0 receipt has not been tampered with after issuance.
Recomputes the SHA-256 signature from the receipt fields using raw Unicode
key ordering and compares it against the stored signature.

## Return value

```typescript
{
  valid: boolean
  receipt_id?: string
  issued_at?: string
  attribution_method?: string  // "deterministic_sde" | "probabilistic_ml" | ...
  ccs_score?: number
  confidence?: string
  reason?: string              // present only when valid is false
}
```

## Python

Looking for the Python version? Install `dsr-verify` from PyPI:

```bash
pip install dsr-verify
```

## Spec

Full specification: https://standard.deja.dev/v1

## License

MIT © 2026 Déjà, Inc.
