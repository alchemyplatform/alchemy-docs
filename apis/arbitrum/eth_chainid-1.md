---
description: >-
  Arbitrum API - Returns the currently configured chain ID, a value used in
  replay-protected transaction signing as introduced by EIP-155. The chain ID
  returned should always correspond to the informati
---

# eth\_chainId

## **Parameters**

None.

## **Returns**

`QUANTITY` - integer of the current chain ID.

## Example

### [Alchemy Composer](https://composer.alchemyapi.io/?composer\_state=%7B%22chain%22%3A1%2C%22network%22%3A201%2C%22methodName%22%3A%22eth\_chainId%22%2C%22paramValues%22%3A%5B%5D%7D)

The Alchemy Composer allows you to make a no-code example request via your browser. Try it out above!

### Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://arb-mainnet.g.alchemy.com/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":83}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://arb-mainnet.g.alchemy.com/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_chainId",
    "params":[],
    "id":83
}
```
{% endtab %}
{% endtabs %}

### Result

```javascript
{
  "id": 83,
  "jsonrpc": "2.0",
  "result": "0x3d" // 61
}
```
