---
description: >-
  Polygon API - Returns information about a transaction by block hash and
  transaction index position.
---

# eth\_getTransactionByBlockHashAndIndex

### Parameters

`DATA`, 32 Bytes - hash of a block.

`QUANTITY` - integer of the transaction index position.

```javascript
params: [ 
    '0xbb63603be7a656f34e7a8fa41cb610f33a6c9e74536159a7676fc00eed072d90', 
    '0x0' // 0 
]
```

### Returns

`Object` - A transaction object, or null when no transaction was found:

* `blockHash`: `DATA`, 32 Bytes - hash of the block where this transaction was in. null when its pending.
* `blockNumber`: `QUANTITY` - block number where this transaction was in. null when it's pending.
* `from`: `DATA`, 20 Bytes - address of the sender.
* `gas`: `QUANTITY` - gas provided by the sender.
* `gasPrice`: `QUANTITY` - gas price provided by the sender in Wei.
* `hash`: `DATA`, 32 Bytes - hash of the transaction.
* `input`: `DATA` - the data send along with the transaction.
* `nonce`: `QUANTITY` - the number of transactions made by the sender prior to this one.
* `to`: `DATA`, 20 Bytes - address of the receiver. null when it's a contract creation transaction.
* `transactionIndex`: `QUANTITY` - integer of the transactions index position in the block. null when its pending.
* `value`: `QUANTITY` - value transferred in Wei.
* `v`: `QUANTITY` - ECDSA recovery id
* `r`: `DATA`, 32 Bytes - ECDSA signature r
* `s`: `DATA`, 32 Bytes - ECDSA signature s

## Example

### [Alchemy Composer](https://composer.alchemyapi.io/?composer\_state=%7B%22chain%22%3A2%2C%22network%22%3A401%2C%22methodName%22%3A%22eth\_getTransactionByBlockHashAndIndex%22%2C%22paramValues%22%3A%5B%22%22%2C%22%22%5D%7D)

The Alchemy Composer allows you to make a no-code example request via your browser. Try it out above!

### Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0xbb63603be7a656f34e7a8fa41cb610f33a6c9e74536159a7676fc00eed072d90", "0x0"],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getTransactionByBlockHashAndIndex",
    "params":["0xbb63603be7a656f34e7a8fa41cb610f33a6c9e74536159a7676fc00eed072d90", "0x0"],
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
    "result": {
        "blockHash": "0xbb63603be7a656f34e7a8fa41cb610f33a6c9e74536159a7676fc00eed072d90",
        "blockNumber": "0xf93fba",
        "from": "0x5604fdedd03bfb5e9331a44ba67cd2aa3c99276d",
        "gas": "0x4bd12",
        "gasPrice": "0xe8d4a51000",
        "hash": "0x45e81b15ce93fc99af5ea6631fc0416515fbb2bd982fb6f9ef7ad66027e85e21",
        "input": "0x38ed1739000000000000000000000000000000000000000000000000000000000301c1fa00000000000000000000000000000000000000000022057090352a28bb23ac7e00000000000000000000000000000000000000000000000000000000000000a00000000000000000000000005604fdedd03bfb5e9331a44ba67cd2aa3c99276d00000000000000000000000000000000000000000000000000000000c1b96bbc00000000000000000000000000000000000000000000000000000000000000030000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf1270000000000000000000000000aaa5b9e6c589642f98a1cda99b9d024b8407285a",
        "nonce": "0x3d",
        "to": "0xa5e0829caced8ffdd4de3c43696c57f7d7a678ff",
        "transactionIndex": "0x0",
        "value": "0x0",
        "type": "0x0",
        "v": "0x136",
        "r": "0x52903fb1e680b74b775c4415b16bc77f6f8f511c80826679452900061cbd5d97",
        "s": "0x2cc237b42925f108fcfa351fade6717f2473708f89affca8f7fab6d78c013107"
    }
}
```
