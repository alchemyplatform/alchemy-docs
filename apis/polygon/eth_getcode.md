---
description: >-
  Polygon API - Returns code at a given address. This method can be used to
  distinguish between contract addresses and wallet addresses.
---

# eth\_getCode - Polygon

## Parameters

* `DATA`, 20 Bytes - address.
* `QUANTITY|TAG` - integer block number, or the string "latest", "earliest" or "pending", see the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter).

```javascript
params: [
    '0x0ef2e86a73c7be7f767d7abe53b1d4cbfbccbf3a',
    'latest'
]
```

## Returns

* `DATA` - the code from the given address.

## Example

### [Alchemy Composer](eth\_getcode.md#parameters)

The Alchemy Composer allows you to make a no-code example request via your browser. Try it out above!

### Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getCode","params":["0x0ef2e86a73c7be7f767d7abe53b1d4cbfbccbf3a", "latest"],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getCode",
    "params":["0x0ef2e86a73c7be7f767d7abe53b1d4cbfbccbf3a", "latest"],
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
    "result": "0x"
}
```

{% embed url="https://docs.alchemy.com/alchemy/apis/polygon" %}
