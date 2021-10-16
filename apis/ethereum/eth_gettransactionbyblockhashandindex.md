---
description: >-
  Returns information about a transaction by block hash and transaction index
  position.
---

# eth\_getTransactionByBlockHashAndIndex

### Parameters

`DATA`, 32 Bytes - hash of a block.

`QUANTITY` - integer of the transaction index position.

```javascript
params: [ 
    '0xc0f4906fea23cf6f3cce98cb44e8e1449e455b28d684dfa9ff65426495584de6', 
    '0x0' // 0 
]
```

### Returns

See [`eth_getTransactionByHash`](./#eth_gettransactionbyhash)\`\`

### [Example](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getTransactionByBlockHashAndIndex%22%2C%22paramValues%22%3A%5B%220xc0f4906fea23cf6f3cce98cb44e8e1449e455b28d684dfa9ff65426495584de6%22%2C%220x0%22%5D%7D)

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0xc0f4906fea23cf6f3cce98cb44e8e1449e455b28d684dfa9ff65426495584de6", "0x0"],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getTransactionByBlockHashAndIndex",
    "params":["0xc0f4906fea23cf6f3cce98cb44e8e1449e455b28d684dfa9ff65426495584de6", "0x0"],
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
  "result": {
    "blockHash": "0xc0f4906fea23cf6f3cce98cb44e8e1449e455b28d684dfa9ff65426495584de6",
    "blockNumber": "0x1e8480",
    "from": "0x32be343b94f860124dc4fee278fdcbd38c102d88",
    "gas": "0x51615",
    "gasPrice": "0x6fc23ac00",
    "hash": "0xc55e2b90168af6972193c1f86fa4d7d7b31a29c156665d15b9cd48618b5177ef",
    "input": "0x",
    "nonce": "0x1efc5",
    "to": "0x104994f45d9d697ca104e5704a7b77d7fec3537c",
    "transactionIndex": "0x0",
    "value": "0x821878651a4d70000",
    "v": "0x1b",
    "r": "0x51222d91a379452395d0abaff981af4cfcc242f25cfaf947dea8245a477731f9",
    "s": "0x3a997c910b4701cca5d933fb26064ee5af7fe3236ff0ef2b58aa50b25aff8ca5"
  }
}
```

