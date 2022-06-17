---
description: Returns information about the current epoch
---

# getEpochInfo

## Parameters

* `<object>` - (optional) Config object:
  * `commitment:` \<object> - (optional) Configures the commitment level of the blocks queried\
    Accepts one of the following strings: \[`"finalized"`, `"confirmed"`, `"processed"]` \
    For more info, refer to this [doc](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment).
  * `minContextSlot:` \<number> - (optional) set the minimum slot that the request can be evaluated at.

## Returns

* `absoluteSlot:` \<u64>, the current slot
* `blockHeight:` \<u64>, the current block height
* `epoch:` \<u64>, the current epoch
* `slotIndex:` \<u64>, the current slot relative to the start of the current epoch
* `slotsInEpoch:` \<u64>, the number of slots in this epoch
* `transactionCount:` \<u64 | null>, total number of transactions processed without error since genesis

## Example&#x20;

### Request

{% tabs %}
{% tab title="cURL" %}
```python
curl --location --request POST 'https://solana-mainnet.g.alchemy.com/v2/demo' \
--header 'Content-Type: application/json' \
--data-raw '{"jsonrpc":"2.0","id":1, "method":"getEpochInfo"}'
```
{% endtab %}
{% endtabs %}

### Response

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "absoluteSlot": 135142194,
        "blockHeight": 122413408,
        "epoch": 312,
        "slotIndex": 358194,
        "slotsInEpoch": 432000,
        "transactionCount": 75726772195
    },
    "id": 1
}
```
