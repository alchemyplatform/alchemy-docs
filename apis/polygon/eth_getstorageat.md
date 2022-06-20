---
description: >-
  Polygon API - Returns the value from a storage position at a given address, or
  in other words, returns the state of the contract's storage, which may not be
  exposed via the contract's methods.
---

# eth\_getStorageAt - Polygon

Parameters

* `DATA`, 20 Bytes - address of the storage.
* `QUANTITY` - integer of the position in the storage.
* `QUANTITY|TAG` - integer block number, or the string "latest", "earliest" or "pending", see the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter).

## Returns

* `DATA` - the value at this storage position.

{% embed url="https://docs.alchemy.com/alchemy/apis/polygon" %}
