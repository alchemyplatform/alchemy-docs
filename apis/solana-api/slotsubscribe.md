---
description: Subscribe to receive notification anytime a slot is processed by the validator
---

# slotSubscribe

## **Parameters**

* none

## **Results**

* `integer` - subscription id (needed to unsubscribe)

#### Notification Format

The notification will be an object with the following fields:

* `parent: <u64>` - The parent slot
* `root: <u64>` - The current root slot
* `slot: <u64>` - The newly set slot value

## **Example**

### Request

```shell
{ "jsonrpc": "2.0", "id": 1, "method": "slotSubscribe" }
```

### Result

```javascript
{ "jsonrpc": "2.0", "result": 0, "id": 1 }

// notification
{
  "jsonrpc": "2.0",
  "method": "slotNotification",
  "params": {
    "result": {
      "parent": 75,
      "root": 44,
      "slot": 76
    },
    "subscription": 0
  }
}
```
