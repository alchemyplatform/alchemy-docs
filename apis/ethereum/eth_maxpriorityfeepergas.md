---
description: >-
  Returns a fee per gas that is an estimate of how much you can pay as a
  priority fee, or "tip", to get a transaction included in the current block.
---

# eth\_maxPriorityFeePerGas

Generally you will use the value returned from this method to set the `maxFeePerGas` in a subsequent transaction that you are submitting. This method was introduced with [EIP 1559](https://blog.alchemy.com/blog/eip-1559).

### Parameters

none

### **Returns**

`QUANTITY` - the estimated priority fee per gas.

#### **Example**

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-rinkeby.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_maxPriorityFeePerGas","params":[],"id":1}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_maxPriorityFeePerGas",
    "params":[],
    "id":1
}
```
{% endtab %}
{% endtabs %}

Result

```javascript
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x12a05f1f9"
}
```

