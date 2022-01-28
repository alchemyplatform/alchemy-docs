---
description: Polygon API - Returns the root hash given a block range
---

# bor\_getRootHash

## Parameters

* `from` block number (in `int` format)
* `to` block number (in `int` format)

## Returns

`HASH`

## Example

### [Alchemy Composer](bor\_getroothash.md#parameters)

The Alchemy Composer allows you to make a no-code example request via your browser. Try it out above!

### Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"bor_getRootHash","params":[1000000, 1032767], "id":1}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"bor_getRootHash",
    "params":[1000000, 1032767],
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
    "result": "04b073e17b7186ab4daae17c5e2cc2d5a729cffd102cede41ee458a2d5573994"
}
```
