---
description: >-
  Polygon API - Returns the number of uncles in a block matching the give block
  number.
---

# eth\_getUncleCountByBlockNumber

## Parameters

`QUANTITY|TAG` - integer of a block number, or the string "latest", "earliest" or "pending", see the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter).

```javascript
 params: [ 
  '0xe8', // 232 
 ]
```

## Returns

`QUANTITY` - integer of the number of uncles in this block.

## Example

### [Alchemy Composer](https://composer.alchemyapi.io/?composer\_state=%7B%22chain%22%3A2%2C%22network%22%3A401%2C%22methodName%22%3A%22eth\_getUncleCountByBlockNumber%22%2C%22paramValues%22%3A%5B%22latest%22%5D%7D)

The Alchemy Composer allows you to make a no-code example request via your browser. Try it out above!

### Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockNumber","params":["0xe8"],"id":1}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getUncleCountByBlockNumber",
    "params":["0xe8"],
    "id":1
}
```
{% endtab %}
{% endtabs %}

### Result

```javascript
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x0"
}
```
