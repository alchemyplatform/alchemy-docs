---
description: >-
  Arbitrum API - Returns the number of transactions in a block matching the
  given block hash.
---

# eth\_getBlockTransactionCountByHash

## Parameters

*   `DATA`, 32 Bytes - hash of a block.

    ```javascript
    params: [ 
        '0x8243343df08b9751f5ca0c5f8c9c0460d8a9b6351066fae0acbd4d3e776de8bb' 
    ]
    ```

## Returns

* `QUANTITY` - integer of the number of transactions in this block.

## Example

### [Alchemy Composer](eth\_getblocktransactioncountbyhash-1.md#parameters)

The Alchemy Composer allows you to make a no-code example request via your browser. Try it out above!

### Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://arb-mainnet.g.alchemy.com/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0x8243343df08b9751f5ca0c5f8c9c0460d8a9b6351066fae0acbd4d3e776de8bb"],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://arb-mainnet.g.alchemy.com/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getBlockTransactionCountByHash",
    "params":["0x8243343df08b9751f5ca0c5f8c9c0460d8a9b6351066fae0acbd4d3e776de8bb"],
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
  "result": "0xb0"
}
```
