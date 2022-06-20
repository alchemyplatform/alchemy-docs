---
description: >-
  Polygon API - Returns information about a transaction by block number and
  transaction index position.
---

# eth\_getTransactionByBlockNumberAndIndex - Polygon

Parameters

* `QUANTITY|TAG` - a block number, or the string "earliest", "latest" or "pending", as in the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter).
* `QUANTITY` - the transaction index position.

```javascript
 params: [ 
     'latest', // 668 
     '0x0' // 0 
 ]
```

## Returns

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
* `s`: `DATA`, 32 Bytes - ECDSA signature

## Example

### [Alchemy Composer](https://composer.alchemyapi.io/?composer\_state=%7B%22chain%22%3A2%2C%22network%22%3A401%2C%22methodName%22%3A%22eth\_getTransactionByBlockNumberAndIndex%22%2C%22paramValues%22%3A%5B%22latest%22%2C%22%22%5D%7D)

The Alchemy Composer allows you to make a no-code example request via your browser. Try it out above!

### Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["latest", "0x0"],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getTransactionByBlockNumberAndIndex",
    "params":["latest", "0x0"],
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
        "blockHash": "0x19ece445ee0ad85d1f07d6852d2722fd47d5c9976ac62d9446842bf767a65bb3",
        "blockNumber": "0xf94012",
        "from": "0x9b814233894cd227f561b78cc65891aa55c62ad2",
        "gas": "0x289ec",
        "gasPrice": "0x4cd5886400",
        "hash": "0x44374bfbe757797e181de0a43643a9e5dce9dbb1e7360a04667d4703ac3c7a2b",
        "input": "0x0c53c51c0000000000000000000000007a2c8466603a4d9ef3a294672d5402b2ebe5826000000000000000000000000000000000000000000000000000000000000000a0b703dab06e91938eb7c85c5261cf8c46c55a6a7f17efc8910d5148f7cf993ac7333d10bd3fadaf8c4f99b729152e10a148aa56e94863e761aef4a3babe4f7cdd000000000000000000000000000000000000000000000000000000000000001c0000000000000000000000000000000000000000000000000000000000000044a22cb46500000000000000000000000058807bad0b376efc12f5ad86aac70e78ed67deae000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000",
        "nonce": "0xf167",
        "to": "0xa5f1ea7df861952863df2e8d1312f7305dabf215",
        "transactionIndex": "0x0",
        "value": "0x0",
        "type": "0x0",
        "v": "0x136",
        "r": "0x9121dd82b8b8e6a2f6fc89ad6b1461b563444d2518cf4bc3301c21d81dd3c740",
        "s": "0x52f252d1aeff76206d0f21ee9236ab74b6e7452ef0466cd56534646f9d4d7af4"
    }
}
```

{% embed url="https://docs.alchemy.com/alchemy/apis/polygon" %}
