---
description: >-
  Below you will find the standard Polygon JSON-RPC calls that are compatible
  with Alchemy.
---

# 🧊 Polygon API

For more information on Polygon's API check out the [official documentation](https://docs.matic.network).

{% hint style="warning" %}
**NOTE:** Not all standard Ethereum methods are supported by Polygon. Likewise, not all Polygon methods are currently supported on Alchemy. For the full list of supported Polygon methods, check out the [official documentation](https://docs.matic.network).
{% endhint %}

## Mainnet vs. Testnet

There are two networks on Polygon: Mainnet and Mumbai testnet. The endpoints are as follows:

* **Mainnet:** `https://polygon-mainnet.g.alchemy.com/v2/your-api-key`
* **Mumbai:**  `https://polygon-mumbai.g.alchemy.com/v2/your-api-key`

## 📦 Retrieving Block

Calls related to retrieving blocks and block information.

### eth\_blockNumber

Returns the number of the most recent block.

#### Parameters

none

#### Returns

`QUANTITY` - integer of the current block number the client is on.

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key
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
    "id": 0,
    "result": "0xf93d16",
    "jsonrpc": "2.0"
}
```

### eth\_getBlockByHash

Returns information about a block by hash.

#### Parameters

* `DATA`, 32 Bytes - Hash of a block.
* `Boolean` - If true it returns the full transaction objects, if false it returns only the hashes of the transactions.

```javascript
params: [
    '0xc0f4906fea23cf6f3cce98cb44e8e1449e455b28d684dfa9ff65426495584de6',
    true
]
```

#### Returns

`Object` - A block object with the following fields, or null when no block was found:

* `number`: QUANTITY - the block number. null when its pending block.
* `hash`: DATA, 32 Bytes - hash of the block. null when its pending block.
* `parentHash`: DATA, 32 Bytes - hash of the parent block.
* `nonce`: DATA, 8 Bytes - hash of the generated proof-of-work. null when its pending block.
* `sha3Uncles`: DATA, 32 Bytes - SHA3 of the uncles data in the block.
* `logsBloom`: DATA, 256 Bytes - the bloom filter for the logs of the block. null when its pending block.
* `transactionsRoot`: DATA, 32 Bytes - the root of the transaction trie of the block.
* `stateRoot`: DATA, 32 Bytes - the root of the final state trie of the block.
* `receiptsRoot`: DATA, 32 Bytes - the root of the receipts trie of the block.
* `miner`: DATA, 20 Bytes - the address of the beneficiary to whom the mining rewards were given.
* `difficulty`: QUANTITY - integer of the difficulty for this block.
* `totalDifficulty`: QUANTITY - integer of the total difficulty of the chain until this block.
* `extraData`: DATA - the "extra data" field of this block.
* `size`: QUANTITY - integer the size of this block in bytes.
* `gasLimit`: QUANTITY - the maximum gas allowed in this block.
* `gasUsed`: QUANTITY - the total used gas by all transactions in this block.
* `timestamp`: QUANTITY - the unix timestamp for when the block was collated.
* `transactions`: Array - Array of transaction objects, or 32 Bytes transaction hashes depending on the last given parameter.
* `uncles`: Array - Array of uncle hashes.

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getBlockByHash","params":["0xe2885b25d0863ce4df48facee18d5dd4b4be7366abc59133c2de66ab57d7b71e", true],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getBlockByHash",
    "params":["0xe2885b25d0863ce4df48facee18d5dd4b4be7366abc59133c2de66ab57d7b71e", true],
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
        "difficulty": "0x13",
        "extraData": "0xd783010a0383626f7288676f312e31352e35856c696e7578000000000000000029adbbaf99a3f97b2baefa11e865cf9d74435716ef8618caaa388619f5ae7d8e5d2cadab0cd2f5becd4ebf7d48f5584c9e414c2a4a6ea2bc6ea8f02dbf5675cd01",
        "gasLimit": "0x1385aa8",
        "gasUsed": "0x1380a56",
        "hash": "0xe2885b25d0863ce4df48facee18d5dd4b4be7366abc59133c2de66ab57d7b71e",
        "logsBloom": "0x3eb4221d73001e540126a703d8666026b3480983cccc083c04ba806267cc27149835341b440290711abcd3188b4c1da12b84cd48131caa0860a6c1d136bebe8a89918c04184b6e00827328c802a23ca738981432097c0300823b0d34d0d0c6c4682508ecdaf0b4190deb480c4b5a9ca01db86eacca08c5f1d7d0d2f6245c099a010967474dcab60810d55c224564a88b0b29fcdba123000a78643a750604e002f68930330062607a9eaa05ca59a60a4e4449de00f2bb86708121d1093ac8415b18048416334214e80491cc6613434e0272df878498eab4320239d4d77881fbc433d0ca83051d010128102226cd58a248cb008e2240fcd658148169358e502d53",
        "miner": "0x0000000000000000000000000000000000000000",
        "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "nonce": "0x0000000000000000",
        "number": "0xf93d47",
        "parentHash": "0x745ffd6d21e961040b0821f93be0f9533d2f01f87289abe78af4d8052a4c5528",
        "receiptsRoot": "0xc9cb68ece0290f11a0c3e96e8c7ef52bc0b7a6f0543360c4967400750c2ea23f",
        "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
        "size": "0xf747",
        "stateRoot": "0xdd45900534469c5fcbf7b9ac3a56639e2ff6821500804347a5b9332bfa880813",
        "timestamp": "0x60dcae89",
        "totalDifficulty": "0xa4be87e",
        "transactions": [
            {
                "blockHash": "0xe2885b25d0863ce4df48facee18d5dd4b4be7366abc59133c2de66ab57d7b71e",
                "blockNumber": "0xf93d47",
                "from": "0x8a18a2fee7dc9c2002e21fda8c10f0feb0abf05e",
                "gas": "0x61899",
                "gasPrice": "0x17a27db936",
                "hash": "0x78f825c7d0c09709b82a54b170887d000c58408725cd8d44d10df3382fc5fa1c",
                "input": "0xf98a9e410000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000007b0900000000000000f5a20b000000002791bca1f2de4661ed88a30c99a7a9449aa841741e00f38a214f0f8c02b5b1f5b93fe646a4390e842a2d1e014395bb4d53f0f9fe088a7b1a0c2924e4eab7712f1e01d4deec3fd8578887ba3cd6549e188307033600d91e01f36ad6a25ed157b896ce5178ffd82ee6203d760d0000000000",
                "nonce": "0xa9ee",
                "to": "0xeee49495242da9e0bdbe29a7098388cea8348de4",
                "transactionIndex": "0x0",
                "value": "0x0",
                "type": "0x0",
                "v": "0x136",
                "r": "0x8aa119caab9667a1cad06f6fdaf1d01ee80b3c50cf5b53a71dcaff557dfb9b24",
                "s": "0x305482180355f212cad7a07fda4ce4e1832f1c3013316b660c647f3e5f8c231b"
            }
            ...
        ],
        "transactionsRoot": "0xe3394943ac8e86ee3f0112719f1f4e9eb229b7221792a4279c2bdb390bce1ba3",
        "uncles": []
    }
}
```

### eth\_getBlockByNumber

Returns information about a block by block number.

#### Parameters

* `QUANTITY|TAG` - integer of a block number, or the string "earliest", "latest" or "pending", as in the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter).
* `Boolean` - If true it returns the full transaction objects, if false only the hashes of the transactions.

```javascript
params: [
    '0x1b4', 
    true
]
```

#### Returns

See [`eth_getBlockByHash`](ethereum/#eth\_getblockbyhash)

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x1b4", true],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getBlockByNumber",
    "params":["0x1b4", true],
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
        "difficulty": "0x7",
        "extraData": "0xd58301090083626f7286676f312e3133856c696e757800000000000000000000e14198dde4da0ea1015e9d38ad288f5ba62cf8d1b9a98ccd02fb6f75553ee51c70caa1c376cf4a937c644cae060effe8bf25409cef9ecd25013a608b3a51cbef00",
        "gasLimit": "0xe984c2",
        "gasUsed": "0x0",
        "hash": "0xa284f649d7d9a3c0dea48e3bf3d295767a4893902e61d27e1590d4cece691b6f",
        "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        "miner": "0x0000000000000000000000000000000000000000",
        "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "nonce": "0x0000000000000000",
        "number": "0x1b4",
        "parentHash": "0x9481d3bb2bbe842f0e4703cb5be094d95650fe8345b4da5642ed27bec3acd0d5",
        "receiptsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
        "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
        "size": "0x260",
        "stateRoot": "0x01b797385461764bd56336dd5e810f3d57529d47bcbf3260c7d9c770bf6c5af4",
        "timestamp": "0x5ed28d86",
        "totalDifficulty": "0xbed",
        "transactions": [],
        "transactionsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
        "uncles": []
    }
}
```

## 🧾 Reading Transactions

Calls for reading transactions.

### eth\_getTransactionByHash

Returns the information about a transaction requested by transaction hash. In the response object, `blockHash`, `blockNumber`, and `transactionIndex` are `null` when the transaction is pending.

#### Parameters

`DATA`, 32 Bytes - hash of a transaction

```javascript
params: [
    "0x4ec492e0ba174ddca1324e9867c4e4c10a6eca6a1f77b56a19de875ae869b195"
]
```

#### Returns

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

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d'{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0x4ec492e0ba174ddca1324e9867c4e4c10a6eca6a1f77b56a19de875ae869b195,"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getTransactionByHash",
    "params":["0x4ec492e0ba174ddca1324e9867c4e4c10a6eca6a1f77b56a19de875ae869b195"],
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
        "blockHash": "0xb5acef6bbf84c1c0ec7a5009757e3a09ee25ec129b564d11fb976ce75f426c59",
        "blockNumber": "0xd7b488",
        "from": "0x7b5fc677cf27a807adf2ebcef72db3b935df6c0a",
        "gas": "0xb352c",
        "gasPrice": "0x9502f900",
        "hash": "0x4ec492e0ba174ddca1324e9867c4e4c10a6eca6a1f77b56a19de875ae869b195",
        "input": "0x405cec6700000000000000000000000024cf788254bb130bacb6ff519ef875b1d4b0008e000000000000000000000000ab45c5a4b0c941a2f231c04c3f49182e1a25405200000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000046000000000000000000000000000000000000000000000000000000009502f900000000000000000000000000000000000000000000000000000000000004ffa0000000000000000000000000000000000000000000000000000000000000104f0000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000048000000000000000000000000000000000000000000000000000000000000002a434ee9791000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000000010000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa84174000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000044095ea7b3000000000000000000000000750fd34fbb97abe5492338a3918552291a799ca0000000000000000000000000000000000000000000000000000000002114a0c0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000750fd34fbb97abe5492338a3918552291a799ca000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000006440993b26000000000000000000000000000000000000000000000000000000002114a0c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005fd8004400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000041dc112fa5131cb8f424321830c246c7aec27a5f86968d6eaace1926600716676633ec1f49b2d2eaea0ba7c10d9d97922f13e92002ab2e0610fc17d6ff3e4c60761b000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        "nonce": "0x3059e",
        "to": "0xd216153c06e857cd7f72665e0af1d7d82172f494",
        "transactionIndex": "0x4",
        "value": "0x0",
        "type": "0x0",
        "v": "0x1c",
        "r": "0x39aeddb2b67676e65e7d6f43fd57c731e17534fcfea0eb40d37be1224a8bb8f0",
        "s": "0x284defe0787533fc62c637acd2d9e89b2609350c1c26fd4dbb5386242e85a795"
    }
}
```

### eth\_getTransactionCount

Returns the number of transactions sent from an address.

#### Parameters

* `DATA`, 20 Bytes - address.
* `QUANTITY|TAG` - integer block number, or the string "latest", "earliest" or "pending", see the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter).

```javascript
params: [
    '0x0e11795884b28b08f9978bb85938280967cda041',
    'latest' // state at the latest block
]
```

#### Returns

`QUANTITY` - integer of the number of transactions send from this address.

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0x0e11795884b28b08f9978bb85938280967cda041","latest"],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getTransactionCount",
    "params":["0x0e11795884b28b08f9978bb85938280967cda041","latest"],
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
    "result": "0xb6d7"
}
```

### eth\_getTransactionReceipt

Returns the receipt of a transaction by transaction hash.

This can also be used to track the status of a transaction, since result will be null until the transaction is mined. However, unlike [`eth_getTransactionByHash`](ethereum/#eth\_gettransactionbyhash) , which returns `null` for unknown transactions, and a non-null response with 3 null fields for a pending transaction, `eth_getTransactionReceipt` returns null for both pending and unknown transactions.

This call is also commonly used to get the contract address for a contract creation tx.

{% hint style="warning" %}
**Note:** the receipt is not available for pending transactions.
{% endhint %}

#### Parameters

`DATA`, 32 Bytes - hash of a transaction

```javascript
params: [ 
    '0x9ee9891518b06f4b5bf76a4bef4ba6d93e8d38a17b7aaad492f5555865da7dbb' 
]
```

#### Returns

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

Request

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

Result

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

### eth\_getBlockTransactionCountByHash

Returns the number of transactions in a block matching the given block hash.

#### Parameters

*   `DATA`, 32 Bytes - hash of a block.

    ```javascript
    params: [ 
        '0xbb63603be7a656f34e7a8fa41cb610f33a6c9e74536159a7676fc00eed072d90' 
    ]
    ```

#### Returns

* `QUANTITY` - integer of the number of transactions in this block.

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0xbb63603be7a656f34e7a8fa41cb610f33a6c9e74536159a7676fc00eed072d90"],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getBlockTransactionCountByHash",
    "params":["0xbb63603be7a656f34e7a8fa41cb610f33a6c9e74536159a7676fc00eed072d90"],
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
    "result": "0xaa"
}
```

### eth\_getBlockTransactionCountByNumber

Returns the number of transactions in a block matching the given block number.

#### Parameters

* `QUANTITY|TAG` - integer of a block number, or the string "earliest", "latest" or "pending", as in the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter).

```javascript
params: [
    'latest',
]
```

#### Returns

* `QUANTITY` - integer of the number of transactions in this block.

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["latest"],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getBlockTransactionCountByNumber",
    "params":["latest"],
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
    "result": "0x146"
}
```

### eth\_getTransactionByBlockHashAndIndex

Returns information about a transaction by block hash and transaction index position.

#### Parameters

`DATA`, 32 Bytes - hash of a block.

`QUANTITY` - integer of the transaction index position.

```javascript
params: [ 
    '0xbb63603be7a656f34e7a8fa41cb610f33a6c9e74536159a7676fc00eed072d90', 
    '0x0' // 0 
]
```

#### Returns

See [`eth_getTransactionByHash`](ethereum/#eth\_gettransactionbyhash)\`\`

Request

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

Result

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

### eth\_getTransactionByBlockNumberAndIndex

Returns information about a transaction by block number and transaction index position.

#### Parameters

* `QUANTITY|TAG` - a block number, or the string "earliest", "latest" or "pending", as in the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter).
* `QUANTITY` - the transaction index position.

```javascript
 params: [ 
     'latest', // 668 
     '0x0' // 0 
 ]
```

#### Returns

See [`eth_getTransactionByHash`](ethereum/#eth\_gettransactionbyhash)\`\`

Request

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

Result

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

## Polygon-Bor Methods

Bor specific calls supported on Polygon

### bor\_getAuthor

Returns address of Author

#### Parameters

* block number (in hexadecimal format)

#### Returns

`AUTHOR` - address

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"bor_getAuthor","params":["0x1234"], "id":1}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"bor_getAuthor",
    "params":["0x1234"], 
    "id":1
}
```
{% endtab %}
{% endtabs %}

Result

```javascript
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x5973918275c01f50555d44e92c9d9b353cadad54"
}
```

### bor\_getCurrentValidators

Returns current validators

#### Parameters

`NONE`

#### Returns

`AUTHOR` - address

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"bor_getCurrentValidators","params":[], "id":1}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"bor_getCurrentValidators",
    "params":[],
    "id":1
}
```
{% endtab %}
{% endtabs %}

Result

```javascript
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": [
        {
            "ID": 0,
            "signer": "0x46a3a41bd932244dd08186e4c19f1a7e48cbcdf4",
            "power": 1,
            "accum": -15
        },
        {
            "ID": 0,
            "signer": "0x6a654ca3bfb5cfb23bf30bafbf96b3b6ec26bb0e",
            "power": 1,
            "accum": -21
        },
        {
            "ID": 0,
            "signer": "0x7c7379531b2aee82e4ca06d4175d13b9cbeafd49",
            "power": 5,
            "accum": -8
        },
        {
            "ID": 0,
            "signer": "0xe77bbfd8ed65720f187efdd109e38d75eaca7385",
            "power": 2,
            "accum": 5
        },
        {
            "ID": 0,
            "signer": "0xf0245f6251bef9447a08766b9da2b07b28ad80b0",
            "power": 7,
            "accum": -4
        }
    ]
}
```

### bor\_getCurrentProposer

Returns current proposer's address

#### Parameters

`NONE`

#### Returns

`AUTHOR` - address

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"bor_getCurrentProposer","params":[], "id":1}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"bor_getCurrentProposer",
    "params":[],
    "id":1
}
```
{% endtab %}
{% endtabs %}

Result

```javascript
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0xb79fad4ca981472442f53d16365fdf0305ffd8e9"
}
```

### bor\_getRootHash

Returns the root hash given a block range

{% hint style="warning" %}
The current supported maximum block range for **`bor_getRootHash`** is **`32767`**
{% endhint %}

#### Parameters

* `from` block number (in `int` format)
* `to` block number (in `int` format)

#### Returns

`HASH`

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"bor_getRootHash","params":[1000000, 1032767], "id":1}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"bor_getRootHash",
    "params":[1000000, 1032767],
    "id":1
}
```
{% endtab %}
{% endtabs %}

Result

```javascript
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "04b073e17b7186ab4daae17c5e2cc2d5a729cffd102cede41ee458a2d5573994"
}
```

### eth\_getRootHash

Returns the root hash given a block range

{% hint style="warning" %}
The current supported maximum block range for **`eth_getRootHash`** is **`32767`**
{% endhint %}

#### Parameters

* `from` block number (in `int` format)
* `to` block number (in `int` format)

#### Returns

`HASH`

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getRootHash","params":[1000000, 1032767], "id":1}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getRootHash",
    "params":[1000000, 1032767],
    "id":1
}
```
{% endtab %}
{% endtabs %}

Result

```javascript
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "04b073e17b7186ab4daae17c5e2cc2d5a729cffd102cede41ee458a2d5573994"
}
```

### eth\_getSignersAtHash

Returns all signs given a blockhash

#### Parameters

* `blockhash`&#x20;

#### Returns

`HASH`

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"bor_getSignersAtHash","params":["0x29fa73e3da83ddac98f527254fe37002e052725a88904bac14f03e919e1e2876"], "id":1'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"bor_getSignersAtHash",
    "params":["0x29fa73e3da83ddac98f527254fe37002e052725a88904bac14f03e919e1e2876"], 
    "id":1
}
```
{% endtab %}
{% endtabs %}

Result

```javascript
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": [
        "0x0375b2fc7140977c9c76d45421564e354ed42277",
        "0x42eefcda06ead475cde3731b8eb138e88cd0bac3",
        "0x5973918275c01f50555d44e92c9d9b353cadad54",
        "0x7fcd58c2d53d980b247f1612fdba93e9a76193e6",
        "0xb702f1c9154ac9c08da247a8e30ee6f2f3373f41",
        "0xb8bb158b93c94ed35c1970d610d1e2b34e26652c",
        "0xf84c74dea96df0ec22e11e7c33996c73fcc2d822"
    ]
}
```

### eth\_getTransactionReceiptsByBlock

Returns all transaction receipts for the given block number or hash

#### Parameters

`block_number` in hex OR `block_hash`

#### Returns

Array of transaction receipt objects

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getTransactionReceiptsByBlock","params":["0x989689"], "id":1}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getTransactionReceiptsByBlock",
    "params":["0x989689"], 
    "id":1
}
```
{% endtab %}
{% endtabs %}

Result

```javascript
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": [
    {
      "blockHash": "0x224c0c3153d6bf1f45f461053aee6cbf71e5b5209685c91d81c288b59c82fb47",
      "blockNumber": "0x989689",
      "contractAddress": null,
      "cumulativeGasUsed": "0x63ee1",
      "from": "0x7b5fc677cf27a807adf2ebcef72db3b935df6c0a",
      "gasUsed": "0x63ee1",
      "logs": [
        {
          "address": "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
          "topics": [
            "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925",
            "0x0000000000000000000000003d8a89a20aa73fba0f30d080e8120de9f9555724",
            "0x000000000000000000000000170f88be2538b8aca98a87c1b186ce5f773cc028"
          ],
          "data": "0x000000000000000000000000000000000000000000000000000000007dd34dc0",
          "blockNumber": "0x989689",
          "transactionHash": "0x19a2ba50b19ee8ed28fb902fe8cd0a64b0f7a4fe01281e70e2387fdd00ffd5f0",
          "transactionIndex": "0x0",
          "blockHash": "0x224c0c3153d6bf1f45f461053aee6cbf71e5b5209685c91d81c288b59c82fb47",
          "logIndex": "0x0",
          "removed": false
        },
        {
          "address": "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
          "topics": [
            "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
            "0x0000000000000000000000003d8a89a20aa73fba0f30d080e8120de9f9555724",
            "0x000000000000000000000000170f88be2538b8aca98a87c1b186ce5f773cc028"
          ],
          "data": "0x000000000000000000000000000000000000000000000000000000007dd34dc0",
          "blockNumber": "0x989689",
          "transactionHash": "0x19a2ba50b19ee8ed28fb902fe8cd0a64b0f7a4fe01281e70e2387fdd00ffd5f0",
          "transactionIndex": "0x0",
          "blockHash": "0x224c0c3153d6bf1f45f461053aee6cbf71e5b5209685c91d81c288b59c82fb47",
          "logIndex": "0x1",
          "removed": false
        },
        {
          "address": "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
          "topics": [
            "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925",
            "0x0000000000000000000000003d8a89a20aa73fba0f30d080e8120de9f9555724",
            "0x000000000000000000000000170f88be2538b8aca98a87c1b186ce5f773cc028"
          ],
          "data": "0x0000000000000000000000000000000000000000000000000000000000000000",
          "blockNumber": "0x989689",
          "transactionHash": "0x19a2ba50b19ee8ed28fb902fe8cd0a64b0f7a4fe01281e70e2387fdd00ffd5f0",
          "transactionIndex": "0x0",
          "blockHash": "0x224c0c3153d6bf1f45f461053aee6cbf71e5b5209685c91d81c288b59c82fb47",
          "logIndex": "0x2",
          "removed": false
        },
        {
          "address": "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
          "topics": [
            "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925",
            "0x000000000000000000000000170f88be2538b8aca98a87c1b186ce5f773cc028",
            "0x0000000000000000000000004d97dcd97ec945f40cf65f87097ace5ea0476045"
          ],
          "data": "0x000000000000000000000000000000000000000000000000000000007dd34dc0",
          "blockNumber": "0x989689",
          "transactionHash": "0x19a2ba50b19ee8ed28fb902fe8cd0a64b0f7a4fe01281e70e2387fdd00ffd5f0",
          "transactionIndex": "0x0",
          "blockHash": "0x224c0c3153d6bf1f45f461053aee6cbf71e5b5209685c91d81c288b59c82fb47",
          "logIndex": "0x3",
          "removed": false
        },
        {
          "address": "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
          "topics": [
            "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
            "0x000000000000000000000000170f88be2538b8aca98a87c1b186ce5f773cc028",
            "0x0000000000000000000000004d97dcd97ec945f40cf65f87097ace5ea0476045"
          ],
          "data": "0x000000000000000000000000000000000000000000000000000000007dd34dc0",
          "blockNumber": "0x989689",
          "transactionHash": "0x19a2ba50b19ee8ed28fb902fe8cd0a64b0f7a4fe01281e70e2387fdd00ffd5f0",
          "transactionIndex": "0x0",
          "blockHash": "0x224c0c3153d6bf1f45f461053aee6cbf71e5b5209685c91d81c288b59c82fb47",
          "logIndex": "0x4",
          "removed": false
        },
        {
          "address": "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
          "topics": [
            "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925",
            "0x000000000000000000000000170f88be2538b8aca98a87c1b186ce5f773cc028",
            "0x0000000000000000000000004d97dcd97ec945f40cf65f87097ace5ea0476045"
          ],
          "data": "0x0000000000000000000000000000000000000000000000000000000000000000",
          "blockNumber": "0x989689",
          "transactionHash": "0x19a2ba50b19ee8ed28fb902fe8cd0a64b0f7a4fe01281e70e2387fdd00ffd5f0",
          "transactionIndex": "0x0",
          "blockHash": "0x224c0c3153d6bf1f45f461053aee6cbf71e5b5209685c91d81c288b59c82fb47",
          "logIndex": "0x5",
          "removed": false
        },
        {
          "address": "0x4d97dcd97ec945f40cf65f87097ace5ea0476045",
          "topics": [
            "0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb",
            "0x000000000000000000000000170f88be2538b8aca98a87c1b186ce5f773cc028",
            "0x0000000000000000000000000000000000000000000000000000000000000000",
            "0x000000000000000000000000170f88be2538b8aca98a87c1b186ce5f773cc028"
          ],
          "data": "0x000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000239452b461f6d1a911080d87ceec9e2d988aa2533f71478dd340ea5b887011c808669b451aa838890f860952c26092f53231c81a4091fef087b29548325b0d7210000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000007dd34dc0000000000000000000000000000000000000000000000000000000007dd34dc0",
          "blockNumber": "0x989689",
          "transactionHash": "0x19a2ba50b19ee8ed28fb902fe8cd0a64b0f7a4fe01281e70e2387fdd00ffd5f0",
          "transactionIndex": "0x0",
          "blockHash": "0x224c0c3153d6bf1f45f461053aee6cbf71e5b5209685c91d81c288b59c82fb47",
          "logIndex": "0x6",
          "removed": false
        },
        {
          "address": "0x4d97dcd97ec945f40cf65f87097ace5ea0476045",
          "topics": [
            "0x2e6bb91f8cbcda0c93623c54d0403a43514fabc40084ec96b6d5379a74786298",
            "0x000000000000000000000000170f88be2538b8aca98a87c1b186ce5f773cc028",
            "0x0000000000000000000000000000000000000000000000000000000000000000",
            "0xb6efcb062820c882a6a7c4753c1160fe7d00e46608c5b945e7881f091f2316e5"
          ],
          "data": "0x0000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000007dd34dc0000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002",
          "blockNumber": "0x989689",
          "transactionHash": "0x19a2ba50b19ee8ed28fb902fe8cd0a64b0f7a4fe01281e70e2387fdd00ffd5f0",
          "transactionIndex": "0x0",
          "blockHash": "0x224c0c3153d6bf1f45f461053aee6cbf71e5b5209685c91d81c288b59c82fb47",
          "logIndex": "0x7",
          "removed": false
        },
        {
          "address": "0x170f88be2538b8aca98a87c1b186ce5f773cc028",
          "topics": [
            "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
            "0x0000000000000000000000000000000000000000000000000000000000000000",
            "0x0000000000000000000000003d8a89a20aa73fba0f30d080e8120de9f9555724"
          ],
          "data": "0x000000000000000000000000000000000000000000000000000000005b7dfb2c",
          "blockNumber": "0x989689",
          "transactionHash": "0x19a2ba50b19ee8ed28fb902fe8cd0a64b0f7a4fe01281e70e2387fdd00ffd5f0",
          "transactionIndex": "0x0",
          "blockHash": "0x224c0c3153d6bf1f45f461053aee6cbf71e5b5209685c91d81c288b59c82fb47",
          "logIndex": "0x8",
          "removed": false
        },
        {
          "address": "0x4d97dcd97ec945f40cf65f87097ace5ea0476045",
          "topics": [
            "0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb",
            "0x000000000000000000000000170f88be2538b8aca98a87c1b186ce5f773cc028",
            "0x000000000000000000000000170f88be2538b8aca98a87c1b186ce5f773cc028",
            "0x0000000000000000000000003d8a89a20aa73fba0f30d080e8120de9f9555724"
          ],
          "data": "0x000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000239452b461f6d1a911080d87ceec9e2d988aa2533f71478dd340ea5b887011c808669b451aa838890f860952c26092f53231c81a4091fef087b29548325b0d72100000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003b4c5777",
          "blockNumber": "0x989689",
          "transactionHash": "0x19a2ba50b19ee8ed28fb902fe8cd0a64b0f7a4fe01281e70e2387fdd00ffd5f0",
          "transactionIndex": "0x0",
          "blockHash": "0x224c0c3153d6bf1f45f461053aee6cbf71e5b5209685c91d81c288b59c82fb47",
          "logIndex": "0x9",
          "removed": false
        },
        {
          "address": "0x170f88be2538b8aca98a87c1b186ce5f773cc028",
          "topics": [
            "0xec2dc3e5a3bb9aa0a1deb905d2bd23640d07f107e6ceb484024501aad964a951",
            "0x0000000000000000000000003d8a89a20aa73fba0f30d080e8120de9f9555724"
          ],
          "data": "0x0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000005b7dfb2c0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000007dd34dc0000000000000000000000000000000000000000000000000000000004286f649",
          "blockNumber": "0x989689",
          "transactionHash": "0x19a2ba50b19ee8ed28fb902fe8cd0a64b0f7a4fe01281e70e2387fdd00ffd5f0",
          "transactionIndex": "0x0",
          "blockHash": "0x224c0c3153d6bf1f45f461053aee6cbf71e5b5209685c91d81c288b59c82fb47",
          "logIndex": "0xa",
          "removed": false
        },
        {
          "address": "0xd216153c06e857cd7f72665e0af1d7d82172f494",
          "topics": [
            "0xab74390d395916d9e0006298d47938a5def5d367054dcca78fa6ec84381f3f22",
            "0x0000000000000000000000007b5fc677cf27a807adf2ebcef72db3b935df6c0a",
            "0x000000000000000000000000671da88c76061a1f0683127a1c6e1dd1a79db621",
            "0x000000000000000000000000ab45c5a4b0c941a2f231c04c3f49182e1a254052"
          ],
          "data": "0x34ee97910000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006d895ea20aa80",
          "blockNumber": "0x989689",
          "transactionHash": "0x19a2ba50b19ee8ed28fb902fe8cd0a64b0f7a4fe01281e70e2387fdd00ffd5f0",
          "transactionIndex": "0x0",
          "blockHash": "0x224c0c3153d6bf1f45f461053aee6cbf71e5b5209685c91d81c288b59c82fb47",
          "logIndex": "0xb",
          "removed": false
        },
        {
          "address": "0x0000000000000000000000000000000000001010",
          "topics": [
            "0x4dfe1bbbcf077ddc3e01291eea2d5c70c2b422b415d95645b9adcfd678cb1d63",
            "0x0000000000000000000000000000000000000000000000000000000000001010",
            "0x0000000000000000000000007b5fc677cf27a807adf2ebcef72db3b935df6c0a",
            "0x000000000000000000000000c6869257205e20c2a43cb31345db534aecb49f6e"
          ],
          "data": "0x0000000000000000000000000000000000000000000000000003a2ab85ead90000000000000000000000000000000000000000000000000203f61a3a8191a0aa0000000000000000000000000000000000000000000000004ea18c6904e776cc00000000000000000000000000000000000000000000000203f2778efba6c7aa0000000000000000000000000000000000000000000000004ea52f148ad24fcc",
          "blockNumber": "0x989689",
          "transactionHash": "0x19a2ba50b19ee8ed28fb902fe8cd0a64b0f7a4fe01281e70e2387fdd00ffd5f0",
          "transactionIndex": "0x0",
          "blockHash": "0x224c0c3153d6bf1f45f461053aee6cbf71e5b5209685c91d81c288b59c82fb47",
          "logIndex": "0xc",
          "removed": false
        }
      ],
      "logsBloom": "0x0400000002000000000100000000000000000000000000001000000000104000000000000000000001000020200000001000800000000000001008014020004000000000001000000000000c000200840000000000000000202100000000000000000000020000000001000000000800000000000800000980100010000000002001000000000000000000000000000000100000020000000000000000000000220000000400000000000000008001000008000000000020000000000000004000000002000000000001000000000000000404000600000000100000100020000010008000002000040000000000000010000000000000008000100002100000",
      "status": "0x1",
      "to": "0xd216153c06e857cd7f72665e0af1d7d82172f494",
      "transactionHash": "0x19a2ba50b19ee8ed28fb902fe8cd0a64b0f7a4fe01281e70e2387fdd00ffd5f0",
      "transactionIndex": "0x0"
    }
  ]
}
```

## ✍ Writing Transactions

Call to write to the blockchain.

### eth\_sendRawTransaction

Creates a new message call transaction or a contract creation for signed transactions.

{% hint style="warning" %}
Alchemy does not store keys, so transactions sent via Alchemy must be signed ahead of time using another provider like [ethers](https://docs.ethers.io/v5/api/signer/) (via `eth_signTransaction`) and sent with `eth_sendRawTransaction`.
{% endhint %}

#### Parameters

`DATA`, The signed transaction data.

```javascript
params: ["0x29adbbaf99a3f97b2baefa11e865cf9d74435716ef8618caaa388619f5ae7d8e5d2cadab0cd2f5becd4ebf7d48f5584c9e414c2a4a6ea2bc6ea8f02dbf5675cd01"]
```

#### Returns

`DATA`, 32 Bytes - the transaction hash, or the zero hash if the transaction is not yet available.

Use [`eth_getTransactionReceipt`](ethereum/#eth\_gettransactionreceipt) to get the contract address after the transaction was mined when you created a contract.

{% hint style="danger" %}
**Note:** Since `eth_sendRawTransaction` is a request used for writing to the blockchain and changes its state, it is impossible to execute the same request twice. This means if you were to copy the example given below you will not get the expected response.
{% endhint %}

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":["0x29adbbaf99a3f97b2baefa11e865cf9d74435716ef8618caaa388619f5ae7d8e5d2cadab0cd2f5becd4ebf7d48f5584c9e414c2a4a6ea2bc6ea8f02dbf5675cd01"],"id":1}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_sendRawTransaction",
    "params":["0x29adbbaf99a3f97b2baefa11e865cf9d74435716ef8618caaa388619f5ae7d8e5d2cadab0cd2f5becd4ebf7d48f5584c9e414c2a4a6ea2bc6ea8f02dbf5675cd01"],
    "id":1
}
```
{% endtab %}
{% endtabs %}

Result

```javascript
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

## 📂 Account Information

Calls to get information about an account.

### eth\_getBalance

Returns the balance of the account of a given address.

#### Parameters

1. `DATA`, 20 Bytes - address to check for balance.
2. `QUANTITY|TAG` - integer block number, or the string `"latest"`, `"earliest"` or `"pending"`, see the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter).

```javascript
params: [
   '0x0ef2e86a73c7be7f767d7abe53b1d4cbfbccbf3a',
   'latest'
]
```

#### Returns

`QUANTITY` - integer of the current balance for the given address in wei.

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x0ef2e86a73c7be7f767d7abe53b1d4cbfbccbf3a", "latest"],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getBalance",
    "params":["0x0ef2e86a73c7be7f767d7abe53b1d4cbfbccbf3a", "latest"],
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
    "result": "0x7a6ab9fd8c8eb937"
}
```

### eth\_getCode

Returns code at a given address. This method can be used to [distinguish between contract addresses and wallet addresses](../resources/faq.md#how-do-i-distinguish-between-a-contract-address-and-a-wallet-address).

#### Parameters

* `DATA`, 20 Bytes - address.
* `QUANTITY|TAG` - integer block number, or the string "latest", "earliest" or "pending", see the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter).

```javascript
params: [
    '0x0ef2e86a73c7be7f767d7abe53b1d4cbfbccbf3a',
    'latest'
]
```

#### Returns

* `DATA` - the code from the given address.

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getCode","params":["0x0ef2e86a73c7be7f767d7abe53b1d4cbfbccbf3a", "latest"],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getCode",
    "params":["0x0ef2e86a73c7be7f767d7abe53b1d4cbfbccbf3a", "latest"],
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
    "result": "0x"
}
```

### eth\_getStorageAt

Returns the value from a storage position at a given address, or in other words, returns the state of the contract's storage, which may not be exposed via the contract's methods.

#### Parameters

* `DATA`, 20 Bytes - address of the storage.
* `QUANTITY` - integer of the position in the storage.
* `QUANTITY|TAG` - integer block number, or the string "latest", "earliest" or "pending", see the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter).

#### Returns

* `DATA` - the value at this storage position.

{% hint style="info" %}
Pending example!
{% endhint %}

### eth\_accounts

Returns a list of addresses owned by client.

{% hint style="warning" %}
Since Alchemy does not store keys, this will always return empty.
{% endhint %}

#### **Parameters**

none

#### **Returns**

`Array of DATA`, 20 Bytes - addresses owned by the client.

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_accounts",
    "params":[],
    "id":1
}
```
{% endtab %}
{% endtabs %}

Result

```javascript
{
  "id":1,
  "jsonrpc": "2.0",
  "result": []
}
```

### eth\_getProof

Returns the account and storage values of the specified account including the Merkle-proof. This call can be used to verify that the data you are pulling from is not tampered with.

#### **Parameters**

1. `DATA`, 20 Bytes - address of the account.
2. `ARRAY`, 32 Bytes - array of storage-keys which should be proofed and included. See[`eth_getStorageAt`](ethereum/#eth\_getstorageat)
3. `QUANTITY|TAG` - integer block number, or the string `"latest"` or `"earliest"`, see the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter)

#### **Returns**

`Object` - A account object:

* `balance`: `QUANTITY` - the balance of the account. See[`eth_getBalance`](ethereum/#eth\_getbalance)
* `codeHash`: `DATA`, 32 Bytes - hash of the code of the account. For a simple Account without code it will return `"0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470"`
* `nonce`: `QUANTITY`, - nonce of the account. See [`eth_getTransactionCount`](ethereum/#eth\_gettransactioncount)\`\`
* `storageHash`: `DATA`, 32 Bytes - SHA3 of the StorageRoot. All storage will deliver a MerkleProof starting with this rootHash.
* `accountProof`: `ARRAY` - Array of rlp-serialized MerkleTree-Nodes, starting with the stateRoot-Node, following the path of the SHA3 (address) as key.
* `storageProof`: `ARRAY` - Array of storage-entries as requested. Each entry is a object with these properties:
  * `key`: `QUANTITY` - the requested storage key
  * `value`: `QUANTITY` - the storage value
  * `proof`: `ARRAY` - Array of rlp-serialized MerkleTree-Nodes, starting with the storageHash-Node, following the path of the SHA3 (key) as path.

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getProof","params":["0x7F0d15C7FAae65896648C8273B6d7E43f58Fa842",["0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421"],"latest"],"id":1}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getProof",
    "params":["0x7F0d15C7FAae65896648C8273B6d7E43f58Fa842",["0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421"],"latest"],
    "id":1
}
```
{% endtab %}
{% endtabs %}

Result

```javascript
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "address": "0x7f0d15c7faae65896648c8273b6d7e43f58fa842",
        "accountProof": [
            "0xf90211a001f8376b07906c3c694512eb5a0006def0a41ddf0ec1774530625f64987f6103a0300cb44fdb8d037c9e7f129b4616b7312b13e6a689dd8108dfc4d4cda796a5f3a0300e28a0e966b994458344c424246de7fe27f22913a05f55485802769f92e14fa0fbb5da243cd3d8f3da9baabcdd8c9af1c4041895b6d9fee9602fe8ffa04bd1dca04be995644174846bddc5a0a1a18038c04ac8501d86dbd883b83aeb9d4d36a927a0a03845280edee05f1bcbeebb71af107f2415d8aa9fa0ace8ed19889c2002a18ba02f33c81b8fffb065c0dd0fa4e0af1cd08638571524c5b017aa7b6ab9a159d36ca0ff38c0ecd978d7d7c477e1d73ce3f56f6fa9a38bab8692553f3e0227cf44c500a0b8555e51efb8e8e183c7518fbfeae60d6fabcfffb7b58439475fa6b3deb209faa06c909fb9839543f0dd2bd0af923bb67a7b21fcffe26226c525be226714eb982ca06921abc56c2f24e909faf626a8a2dd5dff9b20028090725eb714c3c93a3228d8a058028c4a84c95a65b41b5ace65904ecc0cd184f2ab8a53b347ef4591d41c477ea0eac35cd0c3a0844910c6db9eab9cef372e62f63c35b1c0265e803f4412c91694a0eb6d08245a3a3491a6f030b957a4f962cd95be60a67ae8f467f17c341a7c61bea09bfa39350897c43f913d0893a9dabc41468ed20698e6706353fea03078e6be05a0ccc62b8ec6ef0a5c9982ad5d9b6f2b8aa9a07cf2c8dd029b93c3e7fe37d1be8180",
            "0xf90211a037b245b091d2248b80be2408f8c9d185070dc900f1e72171481f6ef0f6badae7a0847344c73d91591e9c058ea03936241dc838ac05e1432209ab6596421465bd27a0913d0c384266ded7463d722457a2ff2292e9875b53448008b7245601cd70ab98a0440fcfb3de03209df7cca338ab349c8760b87b72709bd10cbfb4aabacba57f5aa0e42285d3c469abb208f9586010e50983b44d2850d36fbdcc5db10bee3b4664eda05967d65750144d225c16b3d17258d216e8914c6fdcfd746ea6ff512954cc8a7ba0f1e261e7bff8fe91222feaa5d1cbaa0931a90979ef7552de959ed2e8c4797201a0bd1e1a762c6f78b5f13b81d5d12fabc91d8674dd5f1bdecfa66a5f0cdd88f22da09ee8162165b3dff6d1db5f501d65eeac48fc5e49e1073720efe19a701c13369fa0832edf1f1b496db86a4b1629816abc859f71da6d4bcfbc3ed8e46ee6abc83c7ca0bda4e256aeaf979b484873ed80536596c92cc3e3a1f0ec5a0696b0e2ad4cb609a0f7a1fcf40c535e57df607137bf51d05032b2ab56ffde3c910ee754b1d414698ea059b6f3de5a9f5a2fb8a8cf2d421a7a6436ef9f07cbf447aa7a41d515c5db8a52a0caa16f34c0528765ec2b580f2c2f1d6955d5fc4250a4a86f1d6b2b931ad111f9a05f086bc0721f6f17a16bd0200779fbdb0939ed8c2494b1aad4204a09ae3b35b1a0b62c66790820a11613c8b9baa6d0fa9568bebaaf607905614d8bae4bdcfefafc80",
            "0xf90211a03303c753b4f488b4c049e479cc4796de78ead917901bee2f28a1bd85fdec09e3a0b68db45646f1bb767ee0d5414982b05472965f4ccb650f9045fef7c93a0f739da00e205af885bb806199ae2502e8a40d1c1e66669a20d9f8be21cb67cb2b130ef4a0d91bbd8f15ce274e4c769090329155a771bcd64226b67e607d588c941e659d6ea070fae56ea95c13a2d810afca5225e12fbf48161ec690e05d867d59aeab2e274da0980737cd1b0e7f693ce223c750b5d211ee1a569366f2cbd7f76ee88a8a62f902a0273c36c050cbeb67537c63ca39a6aa2365bce660234a2bc34edda64cb5cbbdc3a03f6ad0780afcfb7a57429256905d5ca9221ddb22c9c054111aaa0c3452393d1da0a515e8cde54e122baa67c51f9661aa377ff713e29effca0e4361d687f7577abfa000f3578da1733fdca7f56e69f8ab1601c3b4cc909cb926afac60487432bd5c72a012e1f42be181208f128c868c833693dd8e6f3c0d58112a5f2086e6d3ad08c8a3a05643c184c4b63ac5ee2574f8e5d3f3d58e9bc93334cb2ac8170e8d9af2e6e64ba08c27431b31a8318954c8ebea1be8afa19f5520b7000a539af8fb8caf6a757e42a0fb709b734f5dab2d647c862f9ff189ea60422135915d01829d6fea886afa6c2aa047601d9151b2ba33e9e73bdeb697b93534cd34d052530b40f1e4627bee79e8fba0c99ed933ca8ceb5414db1a3192f24ed7c44526716d17b046f0d92b04d862ae4c80",
            "0xf90211a00d7751dc79c9156f2357704ccc0c8fd590f6bb0c8ef01b32aa347689ae1b7177a0a4fb1a518b73ed70159eb3be9d6692ab4e7271f1fc2bc8c3a870ef98850efe43a0642c0db960ab327f7dcbaa4f76b0e01aee2db72cb5ee92880d0d4393c6d2e48fa006e5f9e16d96ed4f38f5854a65bcee0ccdc3108d5e462187c66659426cf341ffa0f3132e2aa744438ae54c50561199a11e9391d758dc602a59520a0680ed8d313aa018260f95ebf9fa543d526847fd89ceb81c60a7abc3c5f318a5fdb884f5a1a5a5a00034799a077b472409e51abc46758298cd74dd131b81935427116cda6d44705fa0b2117d267a54626509f5f2cc23719a81d9440387de231cea6fb6f5f0594b7a39a0a2ffa5a52791d85322458b995381cc131844c5fc58f8cc6cd4561fc64d6d8f55a06d94dad3d3b7a9789707e96cc25231499453c779b0634a96f8cab0d5cba42a90a062f8558dfbd67248347121f5c7c35c9418723cff00191d238f8d3d5e5f696b5fa0d3bd2acd4035e94b4cd66462e33a6548d203bf5d3ce91d4c705e2d9a088b2f63a070df6544606e44e128e9aefe79c60746d4229fd011411e4fa0b214cadbbefbada09fb29e72acbfb83bb255644d833e5935d1472231ebb8f404e096f7c712bf363aa0dfafc10973c9986fd7316c159af401e3e62bf0e526bb04aa6e255e2615104766a0fdf63393eec26d77eda30a9e50f7e929d3d646ddd5ff015a4585fe9bac93e0d880",
            "0xf90211a03d917f4a11219ba0c039107f9d9022a038ec5adcfce78c082393c4e4033da504a034f0f69773413969b5e5402a551c11943db0870a3dd741ffb080389ed6330d5ba0e21d064290c007d5dbd856a94cf0055e2bb00b39fcc9a9e211c30fd79d0ec2d7a077d7c53e2d34aa1d90e13e59ee0fa79959fd8c90be69f9285c801e6942e21ed5a0a6521f6086e249135f8737f5b86d9993ee47f124dd13795a24b62c146b5b9b91a0ae83d7d4f3e30acedc78fdf005befa04a129b9ea56a02e8cb56ae71f79ff803fa0a29f80b4bad24b764146a9cfe1e707b83f603d8193e8d65096e87d3799a2fb13a0d03350ff011c2dd5b01ff0de94d0314cba0a66eb23310bf76984b235e8d580eba07b5849bd464f2462a6950c378f88b098bb48d57571aeed7d77dbfccd2108c6bea030cf7fc983434e4137d8e983b3be89545037c8ab72947f1b85803f1b7af6e868a0d233b40fd2d6c08f5b31df464e0ae61a6670249051ccaac74b7a196d678e3182a02fd11d6567ebf44f3b83de7116e4d7982537f32915d01702b07e0d44b5976ec5a07bf5fd9d2d8c19ba71a44f40987c60185a03dab62e304d957a1a7ba8862e306ba09d2e0a5a31090bc96cffecf0250bdef07c115c5e498cf0485f01524150ecec1ea0cbae19f56cd37a94e521a693f91b0b5ff7ff958c9c3d0a7779b44b6f554acb40a0139e14b60742fd987226078408790d6cf21f3a05eec8ff00bc258f96f3e251dd80",
            "0xf8d1a01d608a24a8a811af295fffd1a840539826c4b342b451e5293c1aaf88d4fef08aa0501a846e6b2680d86643c6211f5ac33ef404a382894f8d49a3e887ccf2c257c2a0d427f04f25079e46a7ae205fe2862bd155eb68e693adaa36b1dfb6d7a9bba210a066460be340441b1ec0e5b0596b6968ab68ea54d2830a4a38def70cdb2ea558c5808080808080a046fbdd730771362a13e30bda783543b18baa113f446176f27c86eeee609e80d5a0a10c55dd71e81b3aa87b167fbfc1c154bc7227ca8cdea3b5b1bb567bc07981be8080808080",
            "0xf8679e2067f29e142d49f8824d4e7f1735ec3da219687387629b5fccd86812df84b846f8440180a056e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421a01d93f60f105899172f7255c030301c3af4564edd4a48577dbdc448aec7ddb0ac"
        ],
        "balance": "0x0",
        "codeHash": "0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
        "nonce": "0x0",
        "storageHash": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
        "storageProof": [
            {
                "key": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
                "value": "0x0",
                "proof": []
            }
        ]
    }
}
```

## 🧠 EVM/Smart Contract Execution

### eth\_call

Executes a new message call immediately without creating a transaction on the block chain.

This is one of the most commonly used API calls. It is used to read from the blockchain which includes executing smart contracts, but does not publish anything to the blockchain. This call does not consume any Ether.

{% hint style="warning" %}
Starting from [Geth 1.9.13](https://github.com/ethereum/go-ethereum/pull/20783), `eth_call`will check the balance of the sender (to make sure that the sender has enough gas to complete the request) before executing the call. This means that even though the call doesn't consume any gas, the `from` address must have enough gas to execute the call as if it were a transaction.
{% endhint %}

#### Parameters

* `Object` - The transaction call object
  * `from`: `DATA`, 20 Bytes - (optional) The address the transaction is sent from.
  * `to`: `DATA`, 20 Bytes - The address the transaction is directed to.
  * `gas`: `QUANTITY` - (optional) Integer of the gas provided for the transaction execution. `eth_call` consumes zero gas, but this parameter may be needed by some executions.&#x20;
  * `gasPrice`: `QUANTITY` - (optional) Integer of the gasPrice used for each paid gas. **Note: most of our users (95%+) never set the `gasPrice` on eth\_call.**
  * `value`: `QUANTITY` - (optional) Integer of the value sent with this transaction
  * `data`: `DATA` - (optional) Hash of the method signature and encoded parameters. For details see Ethereum Contract ABI
* `QUANTITY|TAG` - integer block number, or the string "latest", "earliest" or "pending" (see the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter)), OR the `blockHash` (in accordance with [EIP-1898](https://eips.ethereum.org/EIPS/eip-1898)) **Note: the parameter is an object instead of a string and should be specified as: `{"blockHash": "0x<some-hash>"}.`** Learn more [here](https://eips.ethereum.org/EIPS/eip-1898).

{% hint style="danger" %}
**Note:** `eth_call` has a timeout restriction at the node level. Batching multiple `eth_call` together on-chain using pre-deployed smart contracts might result in unexpected timeouts that cause none of your calls to complete. Instead, consider serializing these calls, or using smaller batches if they fail with a node error code.
{% endhint %}

```javascript
params: [
    {
        "from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
        "to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
        "gas": "0x76c0",
        "gasPrice": "0x9184e72a000",
        "value": "0x9184e72a",
        "data": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"
    }, 
    "latest"]
]
```

#### Returns

`DATA` - the return value of executed contract.

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_call","params":[{"from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155","to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567","gas": "0x76c0","gasPrice": "0x9184e72a000","value": "0x9184e72a","data": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"}, "latest"],"id":1}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_call",
    "params":[{"from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155","to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567","gas": "0x76c0","gasPrice": "0x9184e72a000","value": "0x9184e72a","data": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"}, "latest"],
    "id":1
}
```
{% endtab %}
{% endtabs %}

Result

```javascript
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x"
}
```

## 📑 Event Logs

### eth\_getLogs

Returns an array of all logs matching a given filter object. For more information about `eth_getLogs` check out our [Deep Dive into eth\_getLogs](../guides/eth\_getlogs.md) page.

{% hint style="warning" %}
**NOTE**: You can make `eth_getLogs` requests with up to a _**2K block range**_ and_**150MB limit on the response size**_.

If you absolutely need to query larger block ranges, please contact us over [discord](https://alchemy.com/discord) or at support@alchemy.com. We can open access to larger block ranges based on your use case.

_If you need to pull logs frequently, we recommend_ [_using WebSockets_](../guides/using-websockets.md) _to push new logs to you when they are available._
{% endhint %}

#### Parameters

`Object` - The filter options:

* `fromBlock`: `QUANTITY|TAG` - (optional, default: "latest") Value:
  * Integer block number
  * "latest" for the last mined block
  * "pending", "earliest" for not yet mined transactions.
* `toBlock`: `QUANTITY|TAG` - (optional, default: "latest") Value:
  * Integer block number
  * "latest" for the last mined block
  * "pending", "earliest" for not yet mined transactions.
* `address`: `DATA|Array`, 20 Bytes - (optional) Contract address or a list of addresses from which logs should originate.
* `topics`: `Array` of `DATA`, - (optional) Array of 32 Bytes DATA topics.&#x20;
  * Topics are order-dependent. Each topic can also be an array of DATA with "or" options.&#x20;
  * Check out more details on how to format topics in [eth\_newFilter](ethereum/#eth\_newfilter).
* `blockHash`: `DATA`, 32 Bytes - (optional) With the addition of EIP-234 (Geth >= v1.8.13 or Parity >= v2.1.0), blockHash is a new filter option which restricts the logs returned to the single block with the 32-byte hash blockHash. Using blockHash is equivalent to fromBlock = toBlock = the block number with hash `blockHash`. **If blockHash is present in the filter criteria, then neither `fromBlock` nor `toBlock` are allowed.**

```javascript
params: [
  {
    "address": "0xb59f67a8bff5d8cd03f6ac17265c550ed8f33907",
    "topics": [
      "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
    ],
    "blockHash": "0x8243343df08b9751f5ca0c5f8c9c0460d8a9b6351066fae0acbd4d3e776de8bb"
  }
]
```

#### Returns

See [`eth_getFilterChanges`](ethereum/#eth\_getfilterchanges)

{% hint style="info" %}
Pending example!
{% endhint %}

## ⛓ Chain Information

Calls to receive information about the current blockchain.

### eth\_gasPrice

Returns the current price per gas in wei.

{% hint style="info" %}
There may be slight disrepancies due to calculation differences between this method and the [matic gas station](https://gasstation-mainnet.matic.network).
{% endhint %}

#### Parameters

none

#### Returns

`QUANTITY` - integer of the current gas price in wei.

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_gasPrice",
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
    "result": "0x77359400"
}
```

### eth\_estimateGas

Generates and returns an estimate of how much gas is necessary to allow the transaction to complete. The transaction will not be added to the blockchain.

{% hint style="info" %}
**Note:** The estimate may be significantly more than the amount of gas actually used by the transaction, for a variety of reasons including EVM mechanics and node performance. Estimates are served directly from nodes, we're not doing anything special to the value so the rest of the network is likely seeing the same.
{% endhint %}

#### **Parameters**

* `Object` - The transaction call object
  * `from`: `DATA`, 20 Bytes - (optional) The address the transaction is sent from.
  * `to`: `DATA`, 20 Bytes - The address the transaction is directed to.
  * `gas`: `QUANTITY` - (optional) Integer of the gas provided for the transaction execution. `eth_call` consumes zero gas, but this parameter may be needed by some executions.&#x20;
  * `gasPrice`: `QUANTITY` - (optional) Integer of the gasPrice used for each paid gas. **Note: most of our users (95%+) never set the `gasPrice` on eth\_call.**
  * `value`: `QUANTITY` - (optional) Integer of the value sent with this transaction
  * `data`: `DATA` - (optional) Hash of the method signature and encoded parameters. For details see Ethereum Contract ABI
* `QUANTITY|TAG` - integer block number, or the string "latest", "earliest" or "pending", see the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter).

{% hint style="warning" %}
**NOTE**

* `eth_estimateGas` _\*\*_will check the balance of the sender (to make sure that the sender has enough gas to complete the request). This means that even though the call doesn't consume any gas, the `from` address must have enough gas to execute the transaction.
* If no `gas` is specified geth uses the block gas limit from the pending block as an upper bound. As a result the returned estimate might not be enough to executed the call/transaction when the amount of actual gas needed is higher than the pending block gas limit.
{% endhint %}

#### Returns

`QUANTITY` - the amount of gas used.

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_estimateGas","params":[{see above}],"id":1}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_estimateGas",
    "params":[{see above}],
    "id":1
}
```
{% endtab %}
{% endtabs %}

Result

```javascript
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x5208" // 21000
}
```

### eth\_chainId

Returns the currently configured chain ID, a value used in replay-protected transaction signing as introduced by [EIP-155](https://eips.ethereum.org/EIPS/eip-155).

The chain ID returned should always correspond to the information in the current known head block. This ensures that caller of this RPC method can always use the retrieved information to sign transactions built on top of the head.

If the current known head block does not specify a chain ID, the client should treat any calls to `eth_chainId` as though the method were not supported, and return a suitable error.

You should prefer `eth_chainId` over `net_version`, so that you can reliably identify the chain you are communicating with.

#### **Parameters**

None.

#### **Returns**

`QUANTITY` - integer of the current chain ID.

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":83}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_chainId",
    "params":[],
    "id":83
}
```
{% endtab %}
{% endtabs %}

Result

```javascript
{
    "jsonrpc": "2.0",
    "id": 83,
    "result": "0x89"
}
```

### net\_version

Returns the current network id.

#### **Parameters**

none

#### **Returns**

`String` - The current network id.

* `"1"`: Ethereum Mainnet
* `"2"`: Morden Testnet (deprecated)
* `"3"`: Ropsten Testnet
* `"4"`: Rinkeby Testnet
* `"42"`: Kovan Testnet

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.g.alchemyapi.io/v2/your-api-keyy \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"net_version",
    "params":[],
    "id":67
}
```
{% endtab %}
{% endtabs %}

Result

```javascript
{
    "jsonrpc": "2.0",
    "id": 67,
    "result": "137"
}
```

### net\_listening

Returns `true` if client is actively listening for network connections.

#### **Parameters**

none

#### **Returns**

`Boolean` - `true` when listening, otherwise `false`.

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"net_listening",
    "params":[],
    "id":67
}
```
{% endtab %}
{% endtabs %}

Result

```javascript
{
  "id":67,
  "jsonrpc":"2.0",
  "result":true
}
```

## 🧔 Retrieving Uncles

Calls to get information about uncles.

{% hint style="warning" %}
**Note**: An uncle doesn't contain individual transactions.
{% endhint %}

### eth\_getUncleByBlockNumberAndIndex

Returns information about an uncle of a block by number and uncle index position.

#### Parameters

* `QUANTITY|TAG` - a block number, or the string "earliest", "latest" or "pending", as in the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter).
* `QUANTITY` - the uncle's index position.

```javascript
params: [
   '0x29c', // 668
   '0x0' // 0
]
```

#### Returns

See [`eth_getBlockByHash`](ethereum/#eth\_getblockbyhash)

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0x29c", "0x0"],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getUncleByBlockNumberAndIndex",
    "params":["0x29c", "0x0"],
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
    "difficulty": "0x57f117f5c",
    "extraData": "0x476574682f76312e302e302f77696e646f77732f676f312e342e32",
    "gasLimit": "0x1388",
    "gasUsed": "0x0",
    "hash": "0x932bdf904546a2287a2c9b2ede37925f698a7657484b172d4e5184f80bdd464d",
    "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "miner": "0x5bf5e9cf9b456d6591073513de7fd69a9bef04bc",
    "mixHash": "0x4500aa4ee2b3044a155252e35273770edeb2ab6f8cb19ca8e732771484462169",
    "nonce": "0x24732773618192ac",
    "number": "0x299",
    "parentHash": "0xa779859b1ee558258b7008bbabff272280136c5dd3eb3ea3bfa8f6ae03bf91e5",
    "receiptsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
    "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
    "size": "0x21d",
    "stateRoot": "0x2604fbf5183f5360da249b51f1b9f1e0f315d2ff3ffa1a4143ff221ad9ca1fec",
    "timestamp": "0x55ba4827",
    "transactionsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
    "uncles": []
  }
}
```

### eth\_getUncleByBlockHashAndIndex

Returns information about an uncle of a block by hash and uncle index position.

#### Parameters

*   `QUANTITY|TAG` - a block number, or the string "earliest", "latest" or "pending", as in the

    [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter).
* `QUANTITY` - the uncle's index position.

```javascript
params: [
    '0x17fd2777f5f4f15912a6ea49bcb213c6991ba7ef57cdd64a572f719aa2a46c23',
    '0x0' // 0
]
```

#### Returns

See [`eth_getBlockByHash`](ethereum/#eth\_getblockbyhash)

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0x17fd2777f5f4f15912a6ea49bcb213c6991ba7ef57cdd64a572f719aa2a46c23", "0x0"],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://ethhhhhgon-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getUncleByBlockHashAndIndex",
    "params":["0x17fd2777f5f4f15912a6ea49bcb213c6991ba7ef57cdd64a572f719aa2a46c23", "0x0"],
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
    "difficulty": "0xbf93da424b943",
    "extraData": "0x65746865726d696e652d657539",
    "gasLimit": "0x7a121d",
    "gasUsed": "0x79ea62",
    "hash": "0x824cce7c7c2ec6874b9fa9a9a898eb5f27cbaf3991dfa81084c3af60d1db618c",
    "logsBloom": "0x0948432021200401804810002000000000381001001202440000010020000080a016262050e44850268052000400100505022305a64000054004200b0c04110000080c1055c42001054b804940a0401401008a00112d80082113400c10006580140005011a40220020000010001c0a00082300434002000050840010102082801c2000148540201004491814020480080111a0300600000003800640024200109c00202010044000880000106810a1a010000028a0100000422000140011000050a2a44b3080001060800000540c108102102600d000004730404a880100600021080100403000180000062642408b440060590400080101e046f08000000430",
    "miner": "0xea674fdde714fd979de3edf0f56aa9716b898ec8",
    "mixHash": "0x0b15fe0a9aa789c167b0f5ade7b72969d9f2193014cb4e98382254f60ffb2f4a",
    "nonce": "0xa212d6400b89b3f6",
    "number": "0x5bad54",
    "parentHash": "0x05e19fb68d9ec798073808e8b3170875cb327d4b6cde7d6f60fe194677bb26fd",
    "receiptsRoot": "0x90807b32c4aa4610c57289de57fa68ba50ed53f14dd2c25f1862aa049029dcd6",
    "sha3Uncles": "0xf763576c1ea6a8c61a206e16b1a2451bec5cba1c7545d7ff733a1e8c78715569",
    "size": "0x216",
    "stateRoot": "0xebc7a1603bfffe0a14bdb89f898e2f2824abb40f04579beb7b920c56d6e273c9",
    "timestamp": "0x5b54143f",
    "transactionsRoot": "0x7562cba41e067b364b933e7b566fb2444f6954fef3964a5a487d4cd79d97a56c",
    "uncles": []
  }
}
```

### eth\_getUncleCountByBlockHash

Returns the number of uncles in a block matching the given block hash.

#### Parameters

* `DATA`, 32 Bytes - hash of a block.

```javascript
params: [
 '0x17fd2777f5f4f15912a6ea49bcb213c6991ba7ef57cdd64a572f719aa2a46c23'
]
```

#### Returns

`QUANTITY` - integer of the number of uncles in this block.

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockHash","params":["0x17fd2777f5f4f15912a6ea49bcb213c6991ba7ef57cdd64a572f719aa2a46c23"],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getUncleCountByBlockHash",
    "params":["0x17fd2777f5f4f15912a6ea49bcb213c6991ba7ef57cdd64a572f719aa2a46c23"],
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
    "result": "0x0"
}
```

### eth\_getUncleCountByBlockNumber

Returns the number of uncles in a block matching the give block number.

#### Parameters

`QUANTITY|TAG` - integer of a block number, or the string "latest", "earliest" or "pending", see the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter).

```javascript
 params: [ 
  '0xe8', // 232 
 ]
```

#### Returns

`QUANTITY` - integer of the number of uncles in this block.

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockNumber","params":["0xe8"],"id":1}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getUncleCountByBlockNumber",
    "params":["0xe8"],
    "id":1
}
```
{% endtab %}
{% endtabs %}

Result

```javascript
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x0"
}
```

## 🔦 Filters

Calls related to creating, getting, and reading from filters.

Eth filters expose the same information as the [`eth_subscribe`](ethereum/#eth\_subscribe) methods, except that updates are received by polling rather than receiving pushes. A user may create a filter than repeatedly call `eth_getFilterChanges`on it, each time receiving events that have occurred since the last time `eth_getFilterChanges`was called (or since the filter was created if this is the first time `eth_getFilterChanges`is being called.

{% hint style="warning" %}
**Note**: Filters expire after 5 minutes of inactivity, so several of the example requests below will return`"filter not found"` if you try and call them.
{% endhint %}

### eth\_getFilterChanges

Polling method for a filter, which returns an array of logs which occurred since last poll.

#### **Parameters**

1. `QUANTITY` - the filter id.

```javascript
params: [
  "0xfe704947a3cd3ca12541458a4321c869"
]
```

#### **Returns**

`Array` - Array of log objects, or an empty array if nothing has changed since last poll.

* For filters created with `eth_newBlockFilter` the return are block hashes (`DATA`, 32 Bytes), e.g. `["0x3454645634534..."]`.
* For filters created with `eth_newPendingTransactionFilter`  the return are transaction hashes (`DATA`, 32 Bytes), e.g. `["0x6345343454645..."]`.
* For filters created with `eth_newFilter` logs are objects with following params:
  * `removed`: `TAG` - `true` when the log was removed, due to a chain reorganization. `false` if its a valid log.
  * `logIndex`: `QUANTITY` - integer of the log index position in the block. `null` when its pending log.
  * `transactionIndex`: `QUANTITY` - integer of the transactions index position log was created from. `null` when its pending log.
  * `transactionHash`: `DATA`, 32 Bytes - hash of the transactions this log was created from. `null` when its pending log.
  * `blockHash`: `DATA`, 32 Bytes - hash of the block where this log was in. `null` when its pending. `null` when its pending log.
  * `blockNumber`: `QUANTITY` - the block number where this log was in. `null` when its pending. `null` when its pending log.
  * `address`: `DATA`, 20 Bytes - address from which this log originated.
  * `data`: `DATA` - contains one or more 32 Bytes non-indexed arguments of the log.
  * `topics`: `Array of DATA` - Array of 0 to 4 32 Bytes `DATA` of indexed log arguments.&#x20;
    * In _solidity_: The first topic is the _hash_ of the signature of the event (e.g. `Deposit(address,bytes32,uint256)`), except you declare the event with the `anonymous` specifier.

#### \*\*\*\*[**Example**](https://composer.alchemyapi.io/?composer\_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth\_getFilterChanges%22%2C%22paramValues%22%3A%5B%220xfe704947a3cd3ca12541458a4321c869%22%5D%7D)\*\*\*\*

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getFilterChanges","params":["0xfe704947a3cd3ca12541458a4321c869"],"id":73}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getFilterChanges",
    "params":["0xfe704947a3cd3ca12541458a4321c869"],
    "id":73
}
```
{% endtab %}
{% endtabs %}

Result

```javascript
{
    "jsonrpc": "2.0",
    "id": 73,
    "result": [{
        "address": "0xb5a5f22694352c15b00323844ad545abb2b11028",
        "blockHash": "0x99e8663c7b6d8bba3c7627a17d774238eae3e793dee30008debb2699666657de",
        "blockNumber": "0x5d12ab",
        "data": "0x0000000000000000000000000000000000000000000000a247d7a2955b61d000",
        "logIndex": "0x0",
        "removed": false,
        "topics": ["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef", "0x000000000000000000000000bdc0afe57b8e9468aa95396da2ab2063e595f37e", "0x0000000000000000000000007503e090dc2b64a88f034fb45e247cbd82b8741e"],
        "transactionHash": "0xa74c2432c9cf7dbb875a385a2411fd8f13ca9ec12216864b1a1ead3c99de99cd",
        "transactionIndex": "0x3"
    }, {
        "address": "0xe38165c9f6deb144afc9c32c206b024817e1496d",
        "blockHash": "0x99e8663c7b6d8bba3c7627a17d774238eae3e793dee30008debb2699666657de",
        "blockNumber": "0x5d12ab",
        "data": "0x0000000000000000000000000000000000000000000000000000000025c6b720",
        "logIndex": "0x3",
        "removed": false,
        "topics": ["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef", "0x00000000000000000000000080e73e47173b2d00b531bf83bc39e710157125c3", "0x0000000000000000000000008f6cc93795969e5bbbf07c66dfee7d41ad24f1ef"],
        "transactionHash": "0x9e8f1cb1facb9a11a1cf947634053a0b2d557399f926b12127aa10497a2f0153",
        "transactionIndex": "0x5"
    }
}
```

### eth\_getFilterLogs

Returns an array of all logs matching filter with given id. Can compute the same results with an `eth_getLogs` call (see hint below).

{% hint style="warning" %}
This method only works for filters creates with [`eth_newFilter`](ethereum/#eth\_newfilter)not for filters created using [`eth_newBlockFilter`](ethereum/#eth\_newblockfilter) or [`eth_newPendingTransactionFilter`](ethereum/#eth\_newpendingtransactionfilter), which will return `"filter not found".`

### eth\_getLogs vs. eth\_getFilterLogs

These two computations will return the same results:

1. Calling `eth_getLogs` with params `[<options>]`
2. Calling `eth_newFilter` with params `[<options>]`, getting a filter id `<filterId>` back, then calling `eth_getFilterLogs` with params `[<filterId>]`
{% endhint %}

#### **Parameters**

1. `QUANTITY` - The filter id.

```javascript
params: [
  "0xfe704947a3cd3ca12541458a4321c869"
]
```

#### **Returns**

See [`eth_getFilterChanges`](ethereum/#eth\_getfilterchanges)\`\`

#### \*\*\*\*[**Example**](https://composer.alchemyapi.io/?composer\_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth\_getFilterLogs%22%2C%22paramValues%22%3A%5B%220xfe704947a3cd3ca12541458a4321c869%22%5D%7D)\*\*\*\*

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0xfe704947a3cd3ca12541458a4321c869"],"id":74}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getFilterLogs",
    "params":["0xfe704947a3cd3ca12541458a4321c869"],
    "id":74
}
```
{% endtab %}
{% endtabs %}

Result

```javascript
{
    "jsonrpc": "2.0",
    "id": 73,
    "result": [{
        "address": "0xb5a5f22694352c15b00323844ad545abb2b11028",
        "blockHash": "0x99e8663c7b6d8bba3c7627a17d774238eae3e793dee30008debb2699666657de",
        "blockNumber": "0x5d12ab",
        "data": "0x0000000000000000000000000000000000000000000000a247d7a2955b61d000",
        "logIndex": "0x0",
        "removed": false,
        "topics": ["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef", "0x000000000000000000000000bdc0afe57b8e9468aa95396da2ab2063e595f37e", "0x0000000000000000000000007503e090dc2b64a88f034fb45e247cbd82b8741e"],
        "transactionHash": "0xa74c2432c9cf7dbb875a385a2411fd8f13ca9ec12216864b1a1ead3c99de99cd",
        "transactionIndex": "0x3"
    }, {
        "address": "0xe38165c9f6deb144afc9c32c206b024817e1496d",
        "blockHash": "0x99e8663c7b6d8bba3c7627a17d774238eae3e793dee30008debb2699666657de",
        "blockNumber": "0x5d12ab",
        "data": "0x0000000000000000000000000000000000000000000000000000000025c6b720",
        "logIndex": "0x3",
        "removed": false,
        "topics": ["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef", "0x00000000000000000000000080e73e47173b2d00b531bf83bc39e710157125c3", "0x0000000000000000000000008f6cc93795969e5bbbf07c66dfee7d41ad24f1ef"],
        "transactionHash": "0x9e8f1cb1facb9a11a1cf947634053a0b2d557399f926b12127aa10497a2f0153",
        "transactionIndex": "0x5"
    }
}
```

### eth\_newBlockFilter

Creates a filter in the node, to notify when a new block arrives. To check if the state has changed, call [`eth_getFilterChanges`](ethereum/#eth\_getfilterchanges).

#### **Parameters**

None

#### **Returns**

`QUANTITY` - A filter id.

#### \*\*\*\*[**Example**](https://composer.alchemyapi.io/?composer\_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth\_newBlockFilter%22%2C%22paramValues%22%3A%5B%5D%7D)\*\*\*\*

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_newBlockFilter","params":[],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_newBlockFilter",
    "params":[],
    "id":73
}
```
{% endtab %}
{% endtabs %}

Result

```javascript
{
  "jsonrpc": "2.0",
  "id": 0,
  "result": "0x9fb7f13924bb605fd29f3ddd6d193ece"
}
```

### eth\_newFilter

Creates a filter object, based on filter options, to notify when the state changes (logs). Unlike `eth_newBlockFilter`which notifies you of **all** new **blocks, you can pass in filter options to track new logs matching the topics specified. **

To check if the state has changed, call [`eth_getFilterChanges.`](ethereum/#eth\_getfilterchanges)\`\`

{% hint style="info" %}
#### A note on specifying topic filters:

Topics are order-dependent. A transaction with a log with topics \[A, B] will be matched by the following topic filters:

* `[]` “anything”
* `[A]` “A in first position (and anything after)”
* `[null, B]` “anything in first position AND B in second position (and anything after)”
* `[A, B]` “A in first position AND B in second position (and anything after)”
* `[[A, B], [A, B]]` “(A OR B) in first position AND (A OR B) in second position (and anything after)”
{% endhint %}

#### **Parameters**

* `Object` - The filter options:
  1. `fromBlock`: `QUANTITY|TAG` - (optional, default: `"latest"`) Integer block number, or `"latest"` for the last mined block or `"pending"`, `"earliest"` for not yet mined transactions.
  2. `toBlock`: `QUANTITY|TAG` - (optional, default: `"latest"`) Integer block number, or `"latest"` for the last mined block or `"pending"`, `"earliest"` for not yet mined transactions.
  3. `address`: `DATA|Array`, 20 Bytes - (optional) Contract address or a list of addresses from which logs should originate.
  4. `topics`: `Array of DATA`, - (optional) Array of 32 Bytes `DATA` topics. Topics are order-dependent. Each topic can also be an array of DATA with “or” options.

```javascript
params: [{
  "fromBlock": "0x1",
  "toBlock": "0x2",
  "address": "0x8888f1f195afa192cfee860698584c030f4c9db1",
  "topics": ["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b", null, ["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b", "0x0000000000000000000000000aff3454fce5edbc8cca8697c15331677e6ebccc"]]
}]
```

#### **Returns**

`QUANTITY` - A filter id.

#### \*\*\*\*[**Example**](https://composer.alchemyapi.io/?composer\_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth\_newFilter%22%2C%22paramValues%22%3A%5B%7B%22fromBlock%22%3A%220x1%22%2C%22toBlock%22%3A%220x2%22%2C%22address%22%3A%220x8888f1f195afa192cfee860698584c030f4c9db1%22%2C%22topics%22%3A%22%5B%5C%220x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b%5C%22%2C%20null%2C%20%5B%5C%220x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b%5C%22%2C%20%5C%220x0000000000000000000000000aff3454fce5edbc8cca8697c15331677e6ebccc%5C%22%5D%5D%22%7D%5D%7D)\*\*\*\*

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_newFilter","params":[{"fromBlock": "0x1","toBlock": "0x2","address": "0x8888f1f195afa192cfee860698584c030f4c9db1","topics": ["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b", null, ["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b", "0x0000000000000000000000000aff3454fce5edbc8cca8697c15331677e6ebccc"]]}],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_newFilter",
    "params":[{"fromBlock": "0x1","toBlock": "0x2","address": "0x8888f1f195afa192cfee860698584c030f4c9db1","topics": ["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b", null, ["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b", "0x0000000000000000000000000aff3454fce5edbc8cca8697c15331677e6ebccc"]]}],
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
  "result": "0xdcc9a819f80efa9e1d215a9d41b2d22e"
}
```

### eth\_newPendingTransactionFilter

Creates a filter in the node, to notify when new pending transactions arrive.To check if the state has changed, call [`eth_getFilterChanges`](ethereum/#eth\_getfilterchanges)\`\`

#### **Parameters**

None

#### **Returns**

`QUANTITY` - A filter id.

#### \*\*\*\*[**Example**](https://composer.alchemyapi.io/?composer\_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth\_newPendingTransactionFilter%22%2C%22paramValues%22%3A%5B%5D%7D)\*\*\*\*

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_newPendingTransactionFilter","params":[],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```python
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_newPendingTransactionFilter",
    "params":[],
    "id":73
}
```
{% endtab %}
{% endtabs %}

Result

```javascript
{
  "jsonrpc": "2.0",
  "id": 0,
  "result": "0xa08914f1caedfcbe814d9fb33e69678d"
}
```

### eth\_uninstallFilter

Uninstalls a filter with given id. Should always be called when watch is no longer needed. Additionally, Filters timeout when they aren’t requested with [`eth_getFilterChanges`](ethereum/#eth\_getfilterchanges)for a period of time.

#### **Parameters**

1. `QUANTITY` - The filter id.

```javascript
params: [
  "0xfe704947a3cd3ca12541458a4321c869"
]
```

#### **Returns**

`Boolean` - `true` if the filter was successfully uninstalled, otherwise `false`.

#### \*\*\*\*[**Example**](https://composer.alchemyapi.io/?composer\_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth\_uninstallFilter%22%2C%22paramValues%22%3A%5B%220xfe704947a3cd3ca12541458a4321c869%22%5D%7D)\*\*\*\*

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_uninstallFilter","params":["0xfe704947a3cd3ca12541458a4321c869"],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_uninstallFilter",
    "params":["0xfe704947a3cd3ca12541458a4321c869"],
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
  "result": false
}
```

## 🖥 Web3

### web3\_clientVersion

Returns the current client version.

#### **Parameters**

none

#### **Returns**

`String` - The current client version

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"web3_clientVersion",
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
    "result": "bor/v1.10.3-stable-d33ce83c/linux-amd64/go1.15.5"
}
```

### web3\_sha3

Returns Keccak-256 (_not_ the standardized SHA3-256) of the given data.

#### **Parameters**

1. `DATA` - the data in hex form to convert into a SHA3 hash

{% hint style="warning" %}
**Note:** web3\_sha3 takes in a hexidecimal number, not a direct string. So, if you wanted to convert "hello world" to it's Keccak-256 hash you would need to input the hex number for "hello world", which is "68656c6c6f20776f726c64".
{% endhint %}

```bash
params: [
  "0x68656c6c6f20776f726c64"
]
```

#### **Returns**

`DATA` - The SHA3 result of the given string.

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"web3_sha3","params":["0x68656c6c6f20776f726c64"],"id":64}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"web3_sha3",
    "params":["0x68656c6c6f20776f726c64"],
    "id":64
}
```
{% endtab %}
{% endtabs %}

Result

```javascript
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad"
}
```

## ⏰Real Time Events

Geth v1.4 and later support subscribing using JSON-RPC notifications. This allows clients to wait for events instead of polling for them.

It works by subscribing to particular events where the node will return a subscription id. For each event that matches the subscription, a notification with relevant data is sent together with the subscription id.

Below are several methods used for retrieving real time events.

### eth\_syncing

Returns an object with data about the sync status or `false`if the node is fully synced.

{% hint style="success" %}
**Note**: Your response from `eth_syncing` will likely return false because Alchemy only supports nodes in production that are completed synced.
{% endhint %}

#### **Parameters**

none

#### **Returns**

`Object|Boolean`, An object with sync status data or `FALSE`, when not syncing:

* `startingBlock`: `QUANTITY` - The block at which the import started (will only be reset, after the sync reached his head)
* `currentBlock`: `QUANTITY` - The current block, same as eth\_blockNumber
* `highestBlock`: `QUANTITY` - The estimated highest block

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key
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

### eth\_subscribe

If successful this returns the subscription id. Subscriptions are creates with a regular RPC call with `eth_subscribe` as method and the subscription name as first parameter.

#### Parameters <a href="parameters" id="parameters"></a>

1. subscription name
2. optional arguments ([see below](ethereum/#optional-arguments))

#### **Returns**

If successful this returns the subscription id.

{% hint style="info" %}
**NOTE**: `eth_subscribe` requests cannot be replicated in the [composer](https://composer.alchemyapi.io) tool
{% endhint %}

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","id": 1, "method": "eth_subscribe", "params": ["newHeads", {"includeTransactions": true}]}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_subscribe",
    "params":["newHeads", {"includeTransactions": true}],
    "id":1
}
```
{% endtab %}
{% endtabs %}

Result

```java
{
    "id": 1, 
    "jsonrpc": "2.0", 
    "result": "0x9cef478923ff08bf67fde6c64013158d"
}
```

#### Optional Arguments:

#### 1. newHeads <a href="newheads" id="newheads"></a>

Fires a notification each time a new header is appended to the chain, including chain reorganizations.

In case of a chain reorganization the subscription will emit all new headers for the new chain. Therefore the subscription can emit multiple headers on the same height.

**Paramaters**

none

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","id": 1, "method": "eth_subscribe", "params": ["newHeads"]}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_subscribe",
    "params":["newHeads"]
    "id":1
}
```
{% endtab %}
{% endtabs %}

Result

```java
{
  "jsonrpc":"2.0",
  "id":1,
  "result":"0x9ce59a13059e417087c02d3236a0b1cc"
}
{
   "jsonrpc": "2.0",
   "method": "eth_subscription",
   "params": {
     "result": {
       "difficulty": "0x15d9223a23aa",
       "extraData": "0xd983010305844765746887676f312e342e328777696e646f7773",
       "gasLimit": "0x47e7c4",
       "gasUsed": "0x38658",
       "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
       "miner": "0xf8b483dba2c3b7176a3da549ad41a48bb3121069",
       "nonce": "0x084149998194cc5f",
       "number": "0x1348c9",
       "parentHash": "0x7736fab79e05dc611604d22470dadad26f56fe494421b5b333de816ce1f25701",
       "receiptRoot": "0x2fab35823ad00c7bb388595cb46652fe7886e00660a01e867824d3dceb1c8d36",
       "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
       "stateRoot": "0xb3346685172db67de536d8765c43c31009d0eb3bd9c501c9be3229203f15f378",
       "timestamp": "0x56ffeff8",
       "transactionsRoot": "0x0167ffa60e3ebc0b080cdb95f7c0087dd6c0e61413140e39d94d3468d7c9689f"
     },
   "subscription": "0x9ce59a13059e417087c02d3236a0b1cc"
   }
 }
```

#### 2. logs <a href="logs" id="logs"></a>

Returns logs that are included in new imported blocks and match the given filter criteria.

In case of a chain reorganization previous sent logs that are on the old chain will be resend with the `removed` property set to true. Logs from transactions that ended up in the new chain are emitted. Therefore a subscription can emit logs for the same transaction multiple times.

**Parameters**

1. `object` with the following (optional) fields
   * **address**, either an address or an array of addresses. Only logs that are created from these addresses are returned (optional)
   * **topics**, only logs which match the specified topics (optional)

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","id": 1, "method": "eth_subscribe", "params": ["logs", {"address": "0x8320fe7702b96808f7bbc0d4a888ed1468216cfd", "topics": ["0xd78a0cb8bb633d06981248b816e7bd33c2a35a6089241d099fa519e361cab902"]}]}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_subscribe",
    "params":["logs", {"address": "0x8320fe7702b96808f7bbc0d4a888ed1468216cfd", "topics": ["0xd78a0cb8bb633d06981248b816e7bd33c2a35a6089241d099fa519e361cab902"]}]
    "id":1
}
```
{% endtab %}
{% endtabs %}

Result

```java
{
    "jsonrpc":"2.0",
    "id":1,
    "result":"0x4a8a4c0517381924f9838102c5a4dcb7"
}

{
    "jsonrpc":"2.0",
    "method":"eth_subscription",
    "params": {
        "subscription":"0x4a8a4c0517381924f9838102c5a4dcb7",
        "result":{
            "address":"0x8320fe7702b96808f7bbc0d4a888ed1468216cfd",
            "blockHash":"0x61cdb2a09ab99abf791d474f20c2ea89bf8de2923a2d42bb49944c8c993cbf04",
            "blockNumber":"0x29e87",
            "data":"0x00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000003",
            "logIndex":"0x0",
            "topics":["0xd78a0cb8bb633d06981248b816e7bd33c2a35a6089241d099fa519e361cab902"],
            "transactionHash":"0xe044554a0a55067caafd07f8020ab9f2af60bdfe337e395ecd84b4877a3d1ab4",
            "transactionIndex":"0x0"
        }
    }
}
```

#### 3. newPendingTransactions

Returns the hash for all transactions that are added to the pending state.

When a transaction that was previously part of the canonical chain isn’t part of the new canonical chain after a reorganization its again emitted.

{% hint style="info" %}
**NOTE:**

* If you want the full transaction object instead of just the hash, check out the Enhanced API [`alchemy_newFullPendingTransactions`](../guides/using-websockets.md#1-alchemy\_newfullpendingtransactions)
*   If you want pending transactions for a specific address, check out the Enhanced API

    \`\`[`alchemy_filteredNewFullPendingTransactions`](../guides/using-websockets.md#2-alchemy\_filterednewfullpendingtransactions)\`\`
{% endhint %}

**Parameters**

none

**Example**

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","id": 2, "method": "eth_subscribe", "params": ["newPendingTransactions"]}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_subscribe",
    "params":["newPendingTransactions"]
    "id":2
}
```
{% endtab %}
{% endtabs %}

Result

```javascript
{
    "jsonrpc":"2.0",
    "id":2,
    "result":"0xc3b33aa549fb9a60e95d21862596617c"
}
{
    "jsonrpc":"2.0",
    "method":"eth_subscription",
    "params":{
        "subscription":"0xc3b33aa549fb9a60e95d21862596617c",
        "result":"0xd6fdc5cc41a9959e922f30cb772a9aef46f4daea279307bc5f7024edc4ccd7fa"
    }
}
```

#### 4. syncing

Indicates when the node starts or stops synchronizing. The result can either be a boolean indicating that the synchronization has started (true), finished (false) or an object with various progress indicators.

**Parameters**

none

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","id": 1, "method": "eth_subscribe", "params": ["syncing"]}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_subscribe",
    "params":["syncing"]
    "id":1
}
```
{% endtab %}
{% endtabs %}

Result

```java
{
    "jsonrpc":"2.0",
    "id":1,
    "result":"0xe2ffeb2703bcf602d42922385829ce96"
}

{
    "subscription":"0xe2ffeb2703bcf602d42922385829ce96",
    "result":{
        "syncing":true,
        "status":{
            "startingBlock":674427,
            "currentBlock":67400,
            "highestBlock":674432,
            "pulledStates":0,
            "knownStates":0}
        }
    }
}
```

### eth\_unsubscribe

Subscriptions are cancelled with a regular RPC call with `eth_unsubscribe` as method and the subscription id as first parameter. It returns a bool indicating if the subscription was cancelled successfully.

#### Parameters <a href="parameters-1" id="parameters-1"></a>

1. subscription id

{% hint style="info" %}
**NOTE**: `eth_unsubscribe` requests cannot be replicated in the [composer](https://composer.alchemyapi.io) tool
{% endhint %}

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","id": 1, "method": "eth_unsubscribe", "params": ["0x9cef478923ff08bf67fde6c64013158d"]}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_subscribe",
    "params":["0x9cef478923ff08bf67fde6c64013158d"],
    "id":1
}
```
{% endtab %}
{% endtabs %}

Result

```javascript
{
    "jsonrpc":"2.0",
    "id":1,
    "result":true
}
```

## Debug API

### debug\_traceTransaction

The `traceTransaction` debugging method will attempt to run the transaction in the exact same manner as it was executed on the network. It will replay any transaction that may have been executed prior to this one before it will finally attempt to execute the transaction that corresponds to the given hash.

The `traceTransaction` debugging method will attempt to run the transaction in the exact same manner as it was executed on the network. It will replay any transaction that may have been executed prior to this one before it will finally attempt to execute the transaction that corresponds to the given hash.

### Parameters

### Parameters

In addition to the hash of the transaction you may give it a secondary _optional_ argument, which specifies the options for this specific call. The possible options are:

In addition to the hash of the transaction you may give it a secondary _optional_ argument, which specifies the options for this specific call. The possible options are:

* `disableStorage`: `BOOL`. Setting this to true will disable storage capture (default = false).
* `disableMemory`: `BOOL`. Setting this to true will disable memory capture (default = false).
* `disableStack`: `BOOL`. Setting this to true will disable stack capture (default = false).
* `tracer`: `STRING`. Setting this will enable JavaScript-based transaction tracing, described below. If set, the previous four arguments will be ignored.
* `timeout`: `STRING`. Overrides the default timeout of 5 seconds for JavaScript-based tracing calls. Valid values are described [here](https://golang.org/pkg/time/#ParseDuration).
* `disableStorage`: `BOOL`. Setting this to true will disable storage capture (default = false).
* `disableMemory`: `BOOL`. Setting this to true will disable memory capture (default = false).
* `disableStack`: `BOOL`. Setting this to true will disable stack capture (default = false).
* `tracer`: `STRING`. Setting this will enable JavaScript-based transaction tracing, described below. If set, the previous four arguments will be ignored.
* `timeout`: `STRING`. Overrides the default timeout of 5 seconds for JavaScript-based tracing calls. Valid values are described [here](https://golang.org/pkg/time/#ParseDuration).

| Client  | Method Invocation                                                                            |
| ------- | -------------------------------------------------------------------------------------------- |
| Go      | `debug.TraceTransaction(txHash common.Hash, logger *vm.LogConfig) (*ExecutionResurt, error)` |
| Console | `debug.traceTransaction(txHash, [options])`                                                  |
| RPC     | `{"method": "debug_traceTransaction", "params": [txHash, {}]}`                               |

| Client  | Method Invocation                                                                            |
| ------- | -------------------------------------------------------------------------------------------- |
| Go      | `debug.TraceTransaction(txHash common.Hash, logger *vm.LogConfig) (*ExecutionResurt, error)` |
| Console | `debug.traceTransaction(txHash, [options])`                                                  |
| RPC     | `{"method": "debug_traceTransaction", "params": [txHash, {}]}`                               |

### **Example**

### **Example**

Request

Request

```javascript
debug.traceTransaction("0x2059dd53ecac9827faad14d364f9e04b1d5fe5b506e3acc886eff7a6f88a696a")
```

```javascript
debug.traceTransaction("0x2059dd53ecac9827faad14d364f9e04b1d5fe5b506e3acc886eff7a6f88a696a")
```

Result

Result

```javascript
{
  gas: 85301,
  returnValue: "",
  structLogs: [{
      depth: 1,
      error: "",
      gas: 162106,
      gasCost: 3,
      memory: null,
      op: "PUSH1",
      pc: 0,
      stack: [],
      storage: {}
  },
    /* snip */
  {
      depth: 1,
      error: "",
      gas: 100000,
      gasCost: 0,
      memory: ["0000000000000000000000000000000000000000000000000000000000000006", "0000000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000000000000000060"],
      op: "STOP",
      pc: 120,
      stack: ["00000000000000000000000000000000000000000000000000000000d67cbec9"],
      storage: {
        0000000000000000000000000000000000000000000000000000000000000004: "8241fa522772837f0d05511f20caa6da1d5a3209000000000000000400000001",
        0000000000000000000000000000000000000000000000000000000000000006: "0000000000000000000000000000000000000000000000000000000000000001",
        f652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d3f: "00000000000000000000000002e816afc1b5c0f39852131959d946eb3b07b5ad"
      }
  }]
```

```javascript
{
  gas: 85301,
  returnValue: "",
  structLogs: [{
      depth: 1,
      error: "",
      gas: 162106,
      gasCost: 3,
      memory: null,
      op: "PUSH1",
      pc: 0,
      stack: [],
      storage: {}
  },
    /* snip */
  {
      depth: 1,
      error: "",
      gas: 100000,
      gasCost: 0,
      memory: ["0000000000000000000000000000000000000000000000000000000000000006", "0000000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000000000000000060"],
      op: "STOP",
      pc: 120,
      stack: ["00000000000000000000000000000000000000000000000000000000d67cbec9"],
      storage: {
        0000000000000000000000000000000000000000000000000000000000000004: "8241fa522772837f0d05511f20caa6da1d5a3209000000000000000400000001",
        0000000000000000000000000000000000000000000000000000000000000006: "0000000000000000000000000000000000000000000000000000000000000001",
        f652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d3f: "00000000000000000000000002e816afc1b5c0f39852131959d946eb3b07b5ad"
      }
  }]
```

{% hint style="warning" %}
Block, and Trace APIs under Enhanced APIs are not currently supported by Alchemy for Polygon.
{% endhint %}
