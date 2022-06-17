---
description: Returns the current health of the node.
---

# getHealth

## Parameters

None

## Returns

* `<string>` - If the node is healthy, returns `"ok"`; otherwise, a JSON RPC error response is returned.

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
    "method": "getHealth"
}'
```
{% endtab %}
{% endtabs %}

### Response

{% tabs %}
{% tab title="Healthy Result" %}
```javascript
{
    "jsonrpc": "2.0",
    "result": "ok",
    "id": 1
}
```
{% endtab %}

{% tab title="Unhealthy Result" %}
```javascript
{
  "jsonrpc": "2.0",
  "error": {
    "code": -32005,
    "message": "Node is behind by 42 slots",
    "data": {
      "numSlotsBehind": 42
    }
  },
  "id": 1
}
```
{% endtab %}
{% endtabs %}
