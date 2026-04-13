# @deja-dev/dsr-verify

Verification library for DSR/1.0 — the open standard for
cryptographically signed production incident receipts.

MIT Licensed · No dependencies · No network calls · No Déjà account required

## Install

**TypeScript / JavaScript (Node.js, browser)**

```bash
npm install @deja-dev/dsr-verify
```

**Python**

```bash
pip install dsr-verify
```

## Usage

**TypeScript**

```ts
import { verifyReceipt } from '@deja-dev/dsr-verify'
const result = verifyReceipt(receiptJson)
console.log(result.valid) // true or false
console.log(result.attribution_method) // "deterministic_sde"
```

**Python**

```python
from dsr_verify import verify_receipt
result = verify_receipt(receipt_dict)
print(result['valid'])  # True or False
```

## Spec

Full specification: https://standard.deja.dev/v1

## Repository

Source: [github.com/BeWallow/dsr-verify](https://github.com/BeWallow/dsr-verify)

## Repository layout

- `packages/typescript` — npm package `@deja-dev/dsr-verify`
- `packages/python` — PyPI package `dsr-verify`

## License

MIT © 2026 Déjà, Inc.
