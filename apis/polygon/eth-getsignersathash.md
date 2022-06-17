---
description: Polygon API - Returns all signs given a blockhash
---

# eth\_getSignersAtHash - Polygon

## Parameters

* `blockhash`

## Returns

`HASH`

## Example

### [Alchemy Composer](https://composer.alchemyapi.io/?composer\_state=%7B%22chain%22%3A2%2C%22network%22%3A401%2C%22methodName%22%3A%22eth\_getBlockByNumber%22%2C%22paramValues%22%3A%5B%22latest%22%2Cfalse%5D%7D)

The Alchemy Composer allows you to make a no-code example request via your browser. Try it out above!

### Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"bor_getSignersAtHash","params":["0x29fa73e3da83ddac98f527254fe37002e052725a88904bac14f03e919e1e2876"], "id":1'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"bor_getSignersAtHash",
    "params":["0x29fa73e3da83ddac98f527254fe37002e052725a88904bac14f03e919e1e2876"], 
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
    "result": [
        "0x0375b2fc7140977c9c76d45421564e354ed42277",
        "0x42eefcda06ead475cde3731b8eb138e88cd0bac3",
        "0x5973918275c01f50555d44e92c9d9b353cadad54",
        "0x7fcd58c2d53d980b247f1612fdba93e9a76193e6",
        "0xb702f1c9154ac9c08da247a8e30ee6f2f3373f41",
        "0xb8bb158b93c94ed35c1970d610d1e2b34e26652c",
        "0xf84c74dea96df0ec22e11e7c33996c73fcc2d822"
    ]
}
```

{% embed url="https://docs.alchemy.com/alchemy/apis/polygon" %}
