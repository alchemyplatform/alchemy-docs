---
description: >-
  Arbitrum API - Returns Keccak-256 (not the standardized SHA3-256) of the given
  data.
---

# web3\_sha3

## **Parameters**

1. `DATA` - the data in hex form to convert into a SHA3 hash

{% hint style="warning" %}
Note: `web3_sha3` takes in a hexidecimal number, not a direct string. So, if you wanted to convert "hello world" to it's Keccak-256 hash you would need to input the hex number for "hello world", which is "68656c6c6f20776f726c64".
{% endhint %}

```bash
params: [
  "0x68656c6c6f20776f726c64"
]
```

## **Returns**

`DATA` - The SHA3 result of the given string.

## Example

### [Alchemy Composer](https://composer.alchemyapi.io/?composer\_state=%7B%22chain%22%3A1%2C%22network%22%3A201%2C%22methodName%22%3A%22web3\_sha3%22%2C%22paramValues%22%3A%5B%220x0%22%5D%7D)

The Alchemy Composer allows you to make a no-code example request via your browser. Try it out above!

### Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://arb-mainnet.g.alchemy.com/v2/your-api-key\
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"web3_sha3","params":["0x68656c6c6f20776f726c64"],"id":64}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://arb-mainnet.g.alchemy.com/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"web3_sha3",
    "params":["0x68656c6c6f20776f726c64"],
    "id":64
}
```
{% endtab %}
{% endtabs %}

### Result

```javascript
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad"
}
```

###
