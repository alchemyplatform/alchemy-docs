---
description: >-
  Returns the receipt of a transaction by transaction hash. This can also be
  used to track the status of a transaction, since result will be null until the
  transaction is mined. However, unlike eth_getT
---

# eth\_getTransactionReceipt

## Parameters

`DATA`, 32 Bytes - hash of a transaction

```javascript
params: [ 
    '0x9ee9891518b06f4b5bf76a4bef4ba6d93e8d38a17b7aaad492f5555865da7dbb' 
]
```

## Returns

`Object` - A transaction receipt object, or null when no receipt was found:

* `transactionHash`: `DATA`, 32 Bytes - hash of the transaction.
* `transactionIndex`: `QUANTITY` - integer of the transactions index position in the block.
* `blockHash`: `DATA`, 32 Bytes - hash of the block where this transaction was in.
* `blockNumber`: `QUANTITY` - block number where this transaction was in.
* `from`: `DATA`, 20 Bytes - address of the sender.
* `to`: `DATA`, 20 Bytes - address of the receiver. null when its a contract creation transaction.
* `cumulativeGasUsed`: `QUANTITY` - The total amount of gas used when this transaction was executed in the block.
* `gasUsed`: `QUANTITY` - The amount of gas used by this specific transaction alone.
* `contractAddress`: `DATA`, 20 Bytes - The contract address created, if the transaction was a contract creation, otherwise null.
* `logs`: `Array` - Array of log objects, which this transaction generated.
* `logsBloom`: `DATA`, 256 Bytes - Bloom filter for light clients to quickly retrieve related logs.

It also returns either:

* `root` : `DATA` 32 bytes of post-transaction stateroot (pre Byzantium)
* `status`: `QUANTITY` either 1 (success) or 0 (failure)

## Example

### [Alchemy Composer](https://composer.alchemyapi.io/?composer\_state=%7B%22chain%22%3A2%2C%22network%22%3A401%2C%22methodName%22%3A%22eth\_getTransactionReceipt%22%2C%22paramValues%22%3A%5B%22%22%5D%7D)

The Alchemy Composer allows you to make a no-code example request via your browser. Try it out above!

### Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0x9ee9891518b06f4b5bf76a4bef4ba6d93e8d38a17b7aaad492f5555865da7dbb"],"id":0}
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getTransactionReceipt",
    "params":["0x9ee9891518b06f4b5bf76a4bef4ba6d93e8d38a17b7aaad492f5555865da7dbb"],
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
        "blockHash": "0x6357724a8ccd4dc6f175267395466c005be8ca70f1a67d2232774e8b0fb968ae",
        "blockNumber": "0xf8ff26",
        "contractAddress": null,
        "cumulativeGasUsed": "0x24cf9c",
        "from": "0x0e11795884b28b08f9978bb85938280967cda041",
        "gasUsed": "0x303ab",
        "logs": [
            {
                "address": "0x4d97dcd97ec945f40cf65f87097ace5ea0476045",
                "topics": [
                    "0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb",
                    "0x000000000000000000000000cf5cea15e49b33b70a0bef2d42a46425c54c80a1",
                    "0x000000000000000000000000cf5cea15e49b33b70a0bef2d42a46425c54c80a1",
                    "0x0000000000000000000000000000000000000000000000000000000000000000"
                ],
                "data": "0x000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000002cb4e96cda2b16481b25e3d2b2cab2bd5c74e15de2495d5f78aa3b3fab67f94b87815b4e593d58ca91f171be3dd89ee2005a61df0a00445b8411dda6564c36ed0000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000067d109f00000000000000000000000000000000000000000000000000000000067d109f",
                "blockNumber": "0xf8ff26",
                "transactionHash": "0x9ee9891518b06f4b5bf76a4bef4ba6d93e8d38a17b7aaad492f5555865da7dbb",
                "transactionIndex": "0xc",
                "blockHash": "0x6357724a8ccd4dc6f175267395466c005be8ca70f1a67d2232774e8b0fb968ae",
                "logIndex": "0x63",
                "removed": false
            }
        ],
        "logsBloom": "0x04000000020000000000000000000000000000000000000000000000002040000000000000000000000000000000000010008000000000000000000100000040000000000000000000000008000600800000000000000000002100000002000000000000020000000000000000000800000000000800000180000112000000000001000002000000000080000000000000100000020010000000000000000000200000000400800000000000000001000000000000000000000000000000024000000042000000000001800000000000000404000400000000180000000020000800008000000000040000000000000000000020000000000000000002100002",
        "status": "0x1",
        "to": "0xd216153c06e857cd7f72665e0af1d7d82172f494",
        "transactionHash": "0x9ee9891518b06f4b5bf76a4bef4ba6d93e8d38a17b7aaad492f5555865da7dbb",
        "transactionIndex": "0xc",
        "type": "0x0"
    }
}
```
