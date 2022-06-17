---
description: Returns the highest slot information that the node has snapshots for.
---

# getHighestSnapshotSlot

## Parameters

None

## Returns

`<object>`

* `full:` \<u64> - Highest full snapshot slot
* `incremental:` \<u64 | undefined> - Highest incremental snapshot slot _based on_ `full` if available

## Example&#x20;

### Request

{% tabs %}
{% tab title="cURL" %}
```python
curl --location --request POST 'https://solana-mainnet.g.alchemy.com/v2/demo' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getHighestSnapshotSlot"
}'
```
{% endtab %}
{% endtabs %}

### Response

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "full": 135143295,
        "incremental": null
    },
    "id": 1
}
```
