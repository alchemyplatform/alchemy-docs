---
description: Get the max slot seen from retransmit stage.
---

# getMaxRetransmitSlot

## **Parameters**

None&#x20;

## **Results**

* `<u64>` - Slot

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
    "method": "getMaxRetransmitSlot"
}'
```
{% endtab %}
{% endtabs %}

### Response

```javascript
{
    "jsonrpc": "2.0",
    "result": 136011655,
    "id": 1
}
```
