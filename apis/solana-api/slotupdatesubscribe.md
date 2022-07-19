---
description: >-
  Subscribe to receive a notification from the validator on a variety of updates
  on every slot
---

# slotUpdateSubscribe

{% hint style="warning" %}
This subscription is unstable; the format of this subscription may change in the future and it may not always be supported
{% endhint %}

## **Parameters**

* None

## **Results**

* `integer` - subscription id (needed to unsubscribe)

**Notification Format:**

The notification will be an object with the following fields:

* `parent: <u64>` - The parent slot
* `slot: <u64>` - The newly updated slot
* `timestamp: <i64>` - The Unix timestamp of the update
* `type: <string>` - The update type, one of:
  * "firstShredReceived"
  * "completed"
  * "createdBank"
  * "frozen"
  * "dead"
  * "optimisticConfirmation"
  * "root"

## **Example**

### Request

```shell
{ "jsonrpc": "2.0", "id": 1, "method": "slotsUpdatesSubscribe" }
```

### Result

```javascript
{ "jsonrpc": "2.0", "result": 0, "id": 1 }

// notification 
{
  "jsonrpc": "2.0",
  "method": "slotsUpdatesNotification",
  "params": {
    "result": {
      "parent": 75,
      "slot": 76,
      "timestamp": 1625081266243,
      "type": "optimisticConfirmation"
    },
    "subscription": 0
  }
}
```
