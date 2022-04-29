---
description: >-
  Polygon API - Subscriptions are cancelled with a regular RPC call with
  eth_unsubscribe as method and the subscription id as first parameter. It
  returns a bool indicating if the subscription was cancel
---

# eth\_unsubscribe - Polygon

### Parameters

1. Subscription ID, as previously returned from an [`eth_subscribe`](eth\_subscribe.md) call.

### Returns

`true` if a subscription was successfully cancelled, or `false` if no subscription existed with the given ID.

### Example <a href="#example-1" id="example-1"></a>

Request

{% tabs %}
{% tab title="wscat" %}
```bash
wscat -c wss://polygon-mainnet.g.alchemyapi.io/v2/your-api-key

{"jsonrpc":"2.0", "id": 1, "method": "eth_unsubscribe", "params": ["0x9cef478923ff08bf67fde6c64013158d"]}
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
