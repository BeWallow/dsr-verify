# dsr-verify (Python)

Python implementation of the DSR/1.0 receipt verifier. See the [repository root README](https://github.com/BeWallow/dsr-verify) for install instructions and usage.

```bash
pip install dsr-verify
```

```python
from dsr_verify import verify_receipt

result = verify_receipt(receipt_dict)
print(result["valid"])
```
