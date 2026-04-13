import hashlib
import json
from typing import Any, Dict


def _raw_sort(d: Dict[str, Any]) -> Dict[str, Any]:
    """Sort dict keys by raw Unicode code point order — NOT locale-sensitive."""
    return dict(sorted(d.items(), key=lambda x: x[0]))


def _sign_payload(payload: Dict[str, Any]) -> str:
    sorted_payload = _raw_sort(payload)
    # Compact JSON — no spaces after separators
    canonical = json.dumps(sorted_payload, separators=(",", ":"))
    return hashlib.sha256(canonical.encode("utf-8")).hexdigest()


def verify_receipt(receipt: Dict[str, Any]) -> Dict[str, Any]:
    """
    Verify a DSR/1.0 receipt.

    Args:
        receipt: dict parsed from the receipt JSON

    Returns:
        dict with keys:
            valid (bool), receipt_id, issued_at,
            attribution_method, ccs_score, confidence, reason
    """
    if not isinstance(receipt, dict):
        return {"valid": False, "reason": "Input must be a dict"}

    stored = receipt.get("sha256_signature")
    if not stored or not isinstance(stored, str) or len(stored) != 64:
        return {"valid": False, "reason": "Missing or invalid sha256_signature"}

    payload = {k: v for k, v in receipt.items() if k != "sha256_signature"}
    computed = _sign_payload(payload)

    if computed != stored:
        return {"valid": False, "reason": "Signature mismatch — receipt may have been tampered"}

    return {
        "valid": True,
        "receipt_id": receipt.get("receipt_id"),
        "issued_at": receipt.get("issued_at"),
        "attribution_method": receipt.get("attribution_method"),
        "ccs_score": receipt.get("ccs_score"),
        "confidence": receipt.get("confidence"),
    }
