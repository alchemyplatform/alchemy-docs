---
description: >-
  Subscriptions are canceled with a regular RPC call with eth_unsubscribe as
  method and the subscription id as first parameter. It returns a bool
  indicating if the subscription was canceled successfully
---

# eth\_unsubscribe - Optimism

#### Parameters <a href="#parameters-1" id="parameters-1"></a>

1. subscription id

#### Example <a href="#example-1" id="example-1"></a>

{% hint style="info" %}
**NOTE**: `eth_unsubscribe` requests cannot be replicated in the [composer](https://composer.alchemyapi.io) tool
{% endhint %}

Request

{% tabs %}
{% tab title="Curl" %}
```bash
wscat -c wss://opt-mainnet.g.alchemy.com/v2/<"YOUR KEY">

{"jsonrpc":"2.0","method":"eth_subscribe","params":["0x9cef478923ff08bf67fde6c64013158d"],"id":1}
```
{% endtab %}
{% endtabs %}

```javascript
{
    "jsonrpc":"2.0",
    "id":1,
    "result":true
}
```

{% embed url="https://docs.alchemy.com/alchemy/apis/optimism-api" %}
