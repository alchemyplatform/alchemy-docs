---
description: >-
  Polygon API - If successful this returns the subscription id. Subscriptions
  are creates with a regular RPC call with eth_subscribe as method and the
  subscription name as first parameter.
---

# eth\_subscribe

### Parameters <a href="#parameters" id="parameters"></a>

1. subscription name
2. optional arguments ([see below](../ethereum/#optional-arguments))

### **Returns**

If successful this returns the subscription id.

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
-d '{"jsonrpc":"2.0","id": 1, "method": "eth_subscribe", "params": ["newHeads", {"includeTransactions": true}]}'
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
    "params":["newHeads", {"includeTransactions": true}],
    "id":1
}
```
{% endtab %}
{% endtabs %}

### Result

```java
{
    "id": 1, 
    "jsonrpc": "2.0", 
    "result": "0x9cef478923ff08bf67fde6c64013158d"
}
```
