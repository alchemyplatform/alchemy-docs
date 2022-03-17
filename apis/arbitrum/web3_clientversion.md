---
description: Arbitrum API - Returns the current client version.
---

# web3\_clientVersion

## **Parameters**

none

## **Returns**

`String` - The current client version

## Example

### [Alchemy Composer](https://composer.alchemyapi.io/?composer\_state=%7B%22chain%22%3A1%2C%22network%22%3A201%2C%22methodName%22%3A%22web3\_clientVersion%22%2C%22paramValues%22%3A%5B%5D%7D)

The Alchemy Composer allows you to make a no-code example request via your browser. Try it out above!

### Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://arb-mainnet.g.alchemy.com/v2/your-api-key\
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://arb-mainnet.g.alchemy.com/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"web3_clientVersion",
    "params":[],
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
  "result": "Geth/v1.9.15-stable-0f77f34b/linux-amd64/go1.14.4"
}
```

###

#### \*\*\*\*
