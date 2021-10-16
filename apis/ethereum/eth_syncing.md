---
description: >-
  Returns an object with data about the sync status or falseif the node is fully
  synced.
---

# eth_syncing

{% hint style="success" %}
**Note**: Your response from `eth_syncing` will likely return false because Alchemy only supports nodes in production that are completed synced. 
{% endhint %}

### **Parameters**

none

### **Returns**

`Object|Boolean`, An object with sync status data or `FALSE`, when not syncing:

* `startingBlock`: `QUANTITY` - The block at which the import started (will only be reset, after the sync reached his head)
* `currentBlock`: `QUANTITY` - The current block, same as eth_blockNumber
* `highestBlock`: `QUANTITY` - The estimated highest block

### ****[**Example**](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_syncing%22%2C%22paramValues%22%3A%5B%5D%7D)****

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_syncing",
    "params":[],
    "id":1
}
```
{% endtab %}
{% endtabs %}

Response

```javascript
{
  "id":1,
  "jsonrpc": "2.0",
  "result": false
}
```
