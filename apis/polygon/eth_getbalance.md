---
description: Polygon API - Returns the balance of the account of a given address.
---

# eth\_getBalance

## Parameters

1. `DATA`, 20 Bytes - address to check for balance.
2. `QUANTITY|TAG` - integer block number, or the string `"latest"`, `"earliest"` or `"pending"`, see the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter).

```javascript
params: [
   '0x0ef2e86a73c7be7f767d7abe53b1d4cbfbccbf3a',
   'latest'
]
```

## Returns

`QUANTITY` - integer of the current balance for the given address in wei.

## Example

### [Alchemy Composer](https://composer.alchemyapi.io/?composer\_state=%7B%22chain%22%3A2%2C%22network%22%3A401%2C%22methodName%22%3A%22eth\_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D)

The Alchemy Composer allows you to make a no-code example request via your browser. Try it out above!

### Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x0ef2e86a73c7be7f767d7abe53b1d4cbfbccbf3a", "latest"],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getBalance",
    "params":["0x0ef2e86a73c7be7f767d7abe53b1d4cbfbccbf3a", "latest"],
    "id":0
}
```
{% endtab %}
{% endtabs %}

### Result

```javascript
{
    "jsonrpc": "2.0",
    "id": 0,
    "result": "0x7a6ab9fd8c8eb937"
}
```
