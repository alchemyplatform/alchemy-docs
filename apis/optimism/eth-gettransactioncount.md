---
description: Returns the number of transactions sent from an address.
---

# eth\_getTransactionCount - Optimism

#### Parameters

* `DATA`, 20 Bytes - address.
* `QUANTITY|TAG` - integer block number, or the string "latest", "earliest" or "pending", see the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter).

```javascript
params: [
    '0xd44fd1c1fe3f3f0d93a8867af4041ab231783fcb',
    'latest' // state at the latest block
]
```

#### Returns

`QUANTITY` - integer of the number of transactions send from this address.

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://opt-mainnet.g.alchemy.com/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0xd44fd1c1fe3f3f0d93a8867af4041ab231783fcb","latest"],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://opt-mainnet.g.alchemy.com/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getTransactionCount",
    "params":["0xd44fd1c1fe3f3f0d93a8867af4041ab231783fcb","latest"],
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
    "result": "0x2fcf"
}
```

{% embed url="https://docs.alchemy.com/alchemy/apis/optimism-api" %}
