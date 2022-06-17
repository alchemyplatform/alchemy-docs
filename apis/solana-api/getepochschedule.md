---
description: Returns epoch schedule information from this cluster's genesis config
---

# getEpochSchedule

## Parameters

None

## Returns

* `slotsPerEpoch:` \<u64>, the maximum number of slots in each epoch
* `leaderScheduleSlotOffset:` \<u64>, the number of slots before beginning of an epoch to calculate a leader schedule for that epoch
* `warmup:` \<bool>, whether epochs start short and grow
* `firstNormalEpoch:` \<u64>, first normal-length epoch => log2(slotsPerEpoch) - log2(MINIMUM\_SLOTS\_PER\_EPOCH)
* `firstNormalSlot:` \<u64> => minimum slots per epoch \* (2.pow(firstNormalEpoch) - 1)

## Example&#x20;

### Request

{% tabs %}
{% tab title="cURL" %}
```python
curl --location --request POST 'https://solana-mainnet.g.alchemy.com/v2/demo' \
--header 'Content-Type: application/json' \
--data-raw '{"jsonrpc":"2.0","id":1, "method":"getEpochSchedule"}'
```
{% endtab %}
{% endtabs %}

### Response

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "firstNormalEpoch": 0,
        "firstNormalSlot": 0,
        "leaderScheduleSlotOffset": 432000,
        "slotsPerEpoch": 432000,
        "warmup": false
    },
    "id": 1
}
```
