---
description: Returns the balance of the account of a given address.
---

# eth\_getBalance - Optimism

#### Parameters

1. `DATA`, 20 Bytes - address to check for balance.
2. `QUANTITY|TAG` - integer block number, or the string `"latest"`, `"earliest"` or `"pending"`, see the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter).

```javascript
params: [
   '0xf69d0bbc95db6287ef02f19e5b2789972f776c2f',
   'latest'
]
```

#### Returns

`QUANTITY` - integer of the current balance for the given address in wei.

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://opt-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0xf69d0bbc95db6287ef02f19e5b2789972f776c2f", "latest"],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://opt-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getBalance",
    "params":["0xf69d0bbc95db6287ef02f19e5b2789972f776c2f", "latest"],
    "id":0
}
```
{% endtab %}
{% endtabs %}

Result

```javascript
{
    "jsonrpc": "2.0",
    "id": 0,
    "result": "0x206c36e81d47c480"
}
```

{% embed url="https://docs.alchemy.com/alchemy/apis/optimism-api" %}
