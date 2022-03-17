---
description: >-
  Arbitrum API - Cancels an existing subscription so that no further events are
  sent.
---

# eth\_unsubscribe - Arbitrum

### Parameters

1. Subscription ID, as previously returned from an [`eth_subscribe`](eth\_subscribe.md) call.

### Returns

`true` if a subscription was successfully cancelled, or `false` if no subscription existed with the given ID.

### Example <a href="#example-1" id="example-1"></a>

Request

{% tabs %}
{% tab title="wscat" %}
```bash
wscat -c wss://arb-mainnet.g.alchemy.com/v2/your-api-key

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
