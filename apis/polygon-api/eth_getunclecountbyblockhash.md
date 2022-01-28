---
description: >-
  Polygon API - Returns the number of uncles in a block matching the given block
  hash.
---

# eth\_getUncleCountByBlockHash

## Parameters

* `DATA`, 32 Bytes - hash of a block.

```javascript
params: [
 '0x17fd2777f5f4f15912a6ea49bcb213c6991ba7ef57cdd64a572f719aa2a46c23'
]
```

## Returns

`QUANTITY` - integer of the number of uncles in this block.

## Example

### [Alchemy Composer](https://composer.alchemyapi.io/?composer\_state=%7B%22chain%22%3A2%2C%22network%22%3A401%2C%22methodName%22%3A%22eth\_getUncleCountByBlockHash%22%2C%22paramValues%22%3A%5B%22%22%5D%7D)

The Alchemy Composer allows you to make a no-code example request via your browser. Try it out above!

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockHash","params":["0x17fd2777f5f4f15912a6ea49bcb213c6991ba7ef57cdd64a572f719aa2a46c23"],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getUncleCountByBlockHash",
    "params":["0x17fd2777f5f4f15912a6ea49bcb213c6991ba7ef57cdd64a572f719aa2a46c23"],
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
    "result": "0x0"
}
```

###
