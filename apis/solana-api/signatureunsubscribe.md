---
description: Unsubscribe from signature confirmation notification
---

# signatureUnsubscribe

## **Parameters**

* `<integer>` - subscription id to cancel

## **Results**

* `<bool>` - unsubscribe success message

## **Example**

### Request

```shell
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "signatureSubscribe",
  "params": [
    "2EBVM6cB8vAAD93Ktr6Vd8p67XPbQzCJX47MpReuiCXJAtcjaxpvWpcg9Ege1Nr5Tk3a2GFrByT7WPBjdsTycY9b"
  ]
}
```

### Result

```javascript
{ "jsonrpc": "2.0", "result": true, "id": 1 }
```
