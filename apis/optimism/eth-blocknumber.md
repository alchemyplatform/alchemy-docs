# eth\_blockNumber - Optimism

#### Parameters

none

#### Returns

`QUANTITY` - integer of the current block number the client is on.

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://opt-mainnet.g.alchemy.com/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://opt-mainnet.g.alchemy.com/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_blockNumber",
    "params":[],
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
  "result": "0x41881"
}
```

{% embed url="https://docs.alchemy.com/alchemy/apis/optimism-api" %}
