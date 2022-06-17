---
description: >-
  Returns the lowest slot that the node has information about in its ledger.
  This value may increase over time if the node is configured to purge older
  ledger data
---

# minimumLedgerSlot

## **Parameters**

None&#x20;

## **Results**

* `<u64>` - Minimum ledger slot

## Example&#x20;

### Request

{% tabs %}
{% tab title="cURL" %}
```python
curl --location --request POST 'https://solana-mainnet.g.alchemy.com/v2/demo/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "minimumLedgerSlot"
}'
```
{% endtab %}
{% endtabs %}

### Response

```javascript
{
    "jsonrpc": "2.0",
    "result": 1234,
    "id": 1
}
```
