---
description: Returns the receipt of a transaction by transaction hash.
---

# eth_getTransactionReceipt

This can also be used to track the status of a transaction, since result will be null until the transaction is mined. However, unlike [`eth_getTransactionByHash`](./#eth_gettransactionbyhash) , which returns `null` for unknown transactions, and a non-null response with 3 null fields for a pending transaction, `eth_getTransactionReceipt` returns null for both pending and unknown transactions.

This call is also commonly used to get the contract address for a contract creation tx.

{% hint style="warning" %}
**Note:** the receipt is not available for pending transactions.
{% endhint %}

### Parameters

`DATA`, 32 Bytes - hash of a transaction

```javascript
params: [ 
    '0xab059a62e22e230fe0f56d8555340a29b2e9532360368f810595453f6fdd213b' 
]
```

### Returns

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

**Example**

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0xab059a62e22e230fe0f56d8555340a29b2e9532360368f810595453f6fdd213b"],"id":0}
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getTransactionReceipt",
    "params":["0xab059a62e22e230fe0f56d8555340a29b2e9532360368f810595453f6fdd213b"],
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
    "transactionHash": "0xab059a62e22e230fe0f56d8555340a29b2e9532360368f810595453f6fdd213b",
    "blockHash": "0x8243343df08b9751f5ca0c5f8c9c0460d8a9b6351066fae0acbd4d3e776de8bb",
    "blockNumber": "0x429d3b",
    "contractAddress": null,
    "cumulativeGasUsed": "0x64b559",
    "from": "0x00b46c2526e227482e2ebb8f4c69e4674d262e75",
    "gasUsed": "0xcaac",
    "logs": [
      {
        "blockHash": "0x8243343df08b9751f5ca0c5f8c9c0460d8a9b6351066fae0acbd4d3e776de8bb",
        "address": "0xb59f67a8bff5d8cd03f6ac17265c550ed8f33907",
        "logIndex": "0x56",
        "data": "0x000000000000000000000000000000000000000000000000000000012a05f200",
        "removed": false,
        "topics": [
          "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
          "0x00000000000000000000000000b46c2526e227482e2ebb8f4c69e4674d262e75",
          "0x00000000000000000000000054a2d42a40f51259dedd1978f6c118a0f0eff078"
        ],
        "blockNumber": "0x429d3b",
        "transactionIndex": "0xac",
        "transactionHash": "0xab059a62e22e230fe0f56d8555340a29b2e9532360368f810595453f6fdd213b"
      }
    ],
    "logsBloom": "0x00000000040000000000000000000000000000000000000000000000000000080000000010000000000000000000000000000000000040000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000010100000000000000000000000000004000000000000200000000000000000000000000000000000000000000",
    "root": "0x3ccba97c7fcc7e1636ce2d44be1a806a8999df26eab80a928205714a878d5114",
    "status": null,
    "to": "0xb59f67a8bff5d8cd03f6ac17265c550ed8f33907",
    "transactionIndex": "0xac"
  }
}
```
