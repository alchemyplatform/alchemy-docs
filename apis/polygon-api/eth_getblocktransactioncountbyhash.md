---
description: >-
  Polygon API - Returns the number of transactions in a block matching the given
  block hash.
---

# eth\_getBlockTransactionCountByHash

## Parameters

*   `DATA`, 32 Bytes - hash of a block.

    ```javascript
    params: [ 
        '0xbb63603be7a656f34e7a8fa41cb610f33a6c9e74536159a7676fc00eed072d90' 
    ]
    ```

## Returns

* `QUANTITY` - integer of the number of transactions in this block.

## Example

### [Alchemy Composer](https://composer.alchemyapi.io/?composer\_state=%7B%22chain%22%3A2%2C%22network%22%3A401%2C%22methodName%22%3A%22eth\_getBlockTransactionCountByHash%22%2C%22paramValues%22%3A%5B%22%22%5D%7D)

The Alchemy Composer allows you to make a no-code example request via your browser. Try it out above!

### Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0xbb63603be7a656f34e7a8fa41cb610f33a6c9e74536159a7676fc00eed072d90"],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getBlockTransactionCountByHash",
    "params":["0xbb63603be7a656f34e7a8fa41cb610f33a6c9e74536159a7676fc00eed072d90"],
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
    "result": "0xaa"
}
```
