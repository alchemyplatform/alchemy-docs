---
description: >-
  Polygon API - Subscriptions are cancelled with a regular RPC call with
  eth_unsubscribe as method and the subscription id as first parameter. It
  returns a bool indicating if the subscription was cancel
---

# eth\_unsubscribe

## Parameters <a href="#parameters-1" id="parameters-1"></a>

1. subscription id

## Example

{% hint style="info" %}
**NOTE**: `eth_unsubscribe` requests cannot be replicated in the [composer](https://composer.alchemyapi.io) tool
{% endhint %}

### Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","id": 1, "method": "eth_unsubscribe", "params": ["0x9cef478923ff08bf67fde6c64013158d"]}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_subscribe",
    "params":["0x9cef478923ff08bf67fde6c64013158d"],
    "id":1
}
```
{% endtab %}
{% endtabs %}

### Result

```javascript
{
    "jsonrpc":"2.0",
    "id":1,
    "result":true
}
```
