---
description: Arbitrum API - eth_getTransactionCount
---

# eth\_getTransactionCount

## Parameters

* `DATA`, 20 Bytes - address.
* `QUANTITY|TAG` - integer block number, or the string "latest", "earliest" or "pending", see the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter).

```javascript
params: [
    '0xc94770007dda54cF92009BFF0dE90c06F603a09f',
    'latest' // state at the latest block
]
```

## Returns

`QUANTITY` - integer of the number of transactions send from this address.

## Example

### [Alchemy Composer](https://composer.alchemyapi.io/?composer\_state=%7B%22chain%22%3A0%2C%22network%22%3A0%2C%22methodName%22%3A%22eth\_getTransactionCount%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D)

The Alchemy Composer allows you to make a no-code example request via your browser. Try it out above!

### Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://arb-mainnet.g.alchemy.com/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0xc94770007dda54cF92009BFF0dE90c06F603a09f","latest"],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://arb-mainnet.g.alchemy.com/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getTransactionCount",
    "params":["0xc94770007dda54cF92009BFF0dE90c06F603a09f","latest"],
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
  "result": "0x219"
}
```
