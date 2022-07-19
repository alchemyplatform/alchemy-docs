---
description: Unsubscribe from slot notifications
---

# slotUnsubscribe

## **Parameters**

* `<integer>` - subscription id to cancel

## **Results**

* `<bool>` - unsubscribe success message

## **Example**

### Request

```shell
{ "jsonrpc": "2.0", "id": 1, "method": "slotUnsubscribe", "params": [0] }
```

### Result

```javascript
{ "jsonrpc": "2.0", "result": true, "id": 1 }
```
