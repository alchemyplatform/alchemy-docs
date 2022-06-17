---
description: >-
  Returns the slot of the lowest confirmed block that has not been purged from
  the ledger
---

# getFirstAvailableBlock

## Parameters

None

## Returns

* `<u64>` - Slot of the lowest confirmed block

## Example&#x20;

### Request

{% tabs %}
{% tab title="cURL" %}
```python
curl --location --request POST 'https://solana-mainnet.g.alchemy.com/v2/demo' \
--header 'Content-Type: application/json' \
--data-raw '{"jsonrpc":"2.0","id":1, "method":"getFirstAvailableBlock"}'
```
{% endtab %}
{% endtabs %}

### Response

```javascript
{
    "jsonrpc": "2.0",
    "result": 0,
    "id": 1
}
```
