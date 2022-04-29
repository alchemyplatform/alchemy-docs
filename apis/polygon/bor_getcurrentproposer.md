---
description: Polygon API - Returns current proposer's address
---

# bor\_getCurrentProposer

## Parameters

`NONE`

## Returns

`AUTHOR` - address

## Example

### [Alchemy Composer](https://composer.alchemyapi.io/?composer\_state=%7B%22chain%22%3A2%2C%22network%22%3A401%2C%22methodName%22%3A%22bor\_getCurrentProposer%22%2C%22paramValues%22%3A%5B%5D%7D)

The Alchemy Composer allows you to make a no-code example request via your browser. Try it out above!

### Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"bor_getCurrentProposer","params":[], "id":1}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"bor_getCurrentProposer",
    "params":[],
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
    "result": "0xb79fad4ca981472442f53d16365fdf0305ffd8e9"
}
```
