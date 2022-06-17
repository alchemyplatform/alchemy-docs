---
description: Returns whether a blockhash is still valid or not
---

# isBlockhashValid

## Parameters

* `blockhash:` \<base-58 encoded string> - the blockhash of this block
* `<object>` - (optional) Config object:
  * `commitment:` (optional) Configures the commitment level of the blocks queried\
    Accepts one of the following strings: \[`"finalized"`, `"confirmed"`, `"processed"]` \
    For more info, refer to this [doc](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment).
  * `minContextSlot:` (optional)\<number> - set the minimum slot that the request can be evaluated at

## Returns

* `<bool>` - True if the blockhash is still valid

## Example&#x20;

### Request

{% tabs %}
{% tab title="cURL" %}
```python
curl --location --request POST 'https://solana-mainnet.g.alchemy.com/v2/demo/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": 45,
    "jsonrpc": "2.0",
    "method": "isBlockhashValid",
    "params": [
        "J7rBdM6AecPDEZp8aPq5iPSNKVkU5Q76F3oAV4eW5wsW",
        {
            "commitment": "processed"
        }
    ]
}'
```
{% endtab %}
{% endtabs %}

### Response

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "context": {
            "slot": 136103237
        },
        "value": false
    },
    "id": 45
}
```
