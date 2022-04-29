---
description: Returns the number of transactions in a block matching the given block hash.
---

# eth\_getBlockTransactionCountByHash - Optimism

#### Parameters

*   `DATA`, 32 Bytes - hash of a block.

    ```javascript
    params: [ 
        '0x02b853cf50bc1c335b70790f93d5a390a35a166bea9c895e685cc866e4961cae' 
    ]
    ```

#### Returns

* `QUANTITY` - integer of the number of transactions in this block.

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://opt-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0x02b853cf50bc1c335b70790f93d5a390a35a166bea9c895e685cc866e4961cae"],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://opt-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getBlockTransactionCountByHash",
    "params":["0x02b853cf50bc1c335b70790f93d5a390a35a166bea9c895e685cc866e4961cae"],
    "id":0
}
```
{% endtab %}
{% endtabs %}

Result

```javascript
{
    "jsonrpc": "2.0",
    "id": 0,
    "result": "0x1"
}
```

{% embed url="https://docs.alchemy.com/alchemy/apis/optimism-api" %}
