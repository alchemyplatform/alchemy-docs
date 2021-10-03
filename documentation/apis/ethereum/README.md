---
description: >-
  Below you will find the api documentation for the standard Ethereum JSON-RPC
  calls that Alchemy supports.
---

# Ethereum API

For more information on Ethereum JSON-RPC check out the [Ethereum Wiki](https://eth.wiki/json-rpc/API).

{% hint style="info" %}
**HINT:** If you click on the "**Example**" title you can try out all the example requests in real-time using our [Composer](https://composer.alchemyapi.io/) tool!
{% endhint %}

## 📦 Retrieving Blocks

Calls related to retrieving blocks and block information. 

### eth\_blockNumber

Returns the number of the most recent block.

#### Parameters

none

#### Returns

`QUANTITY` - integer of the current block number the client is on.

#### \`\`[Example](https://composer.alchemyapi.io?composer_state=%7B%22chain%22%3A0%2C%22network%22%3A0%2C%22methodName%22%3A%22eth_getBlockByNumber%22%2C%22paramValues%22%3A%5B%22latest%22%2Cfalse%5D%7D)

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
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
  "result": "0xa1c054"
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
* `baseFeePerGas`: QUANTITY - The block's baseline network fee per gas; the baseFee is burned. Before London, this field must empty. After London, this field must be set to the block's base fee per gas value.
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

#### [Example](https://composer.alchemyapi.io?composer_state=%7B%22chain%22%3A0%2C%22network%22%3A0%2C%22methodName%22%3A%22eth_getBlockByHash%22%2C%22paramValues%22%3A%5B%220xc0f4906fea23cf6f3cce98cb44e8e1449e455b28d684dfa9ff65426495584de6%22%2Cfalse%5D%7D)

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getBlockByHash","params":["0xc0f4906fea23cf6f3cce98cb44e8e1449e455b28d684dfa9ff65426495584de6", true],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getBlockByHash",
    "params":["0xc0f4906fea23cf6f3cce98cb44e8e1449e455b28d684dfa9ff65426495584de6", true],
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
    "baseFeePerGas":"0x12",
    "difficulty": "0x2d50ba175407",
    "extraData": "0xe4b883e5bda9e7a59ee4bb99e9b1bc",
    "gasLimit": "0x47e7c4",
    "gasUsed": "0x5208",
    "hash": "0xc0f4906fea23cf6f3cce98cb44e8e1449e455b28d684dfa9ff65426495584de6",
    "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "miner": "0x61c808d82a3ac53231750dadc13c777b59310bd9",
    "mixHash": "0xc38853328f753c455edaa4dfc6f62a435e05061beac136c13dbdcd0ff38e5f40",
    "nonce": "0x3b05c6d5524209f1",
    "number": "0x1e8480",
    "parentHash": "0x57ebf07eb9ed1137d41447020a25e51d30a0c272b5896571499c82c33ecb7288",
    "receiptsRoot": "0x84aea4a7aad5c5899bd5cfc7f309cc379009d30179316a2a7baa4a2ea4a438ac",
    "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
    "size": "0x28a",
    "stateRoot": "0x96dbad955b166f5119793815c36f11ffa909859bbfeb64b735cca37cbf10bef1",
    "timestamp": "0x57a1118a",
    "totalDifficulty": "0x262c34a6fd1268f6c",
    "transactions": [
      "0xc55e2b90168af6972193c1f86fa4d7d7b31a29c156665d15b9cd48618b5177ef"
    ],
    "transactionsRoot": "0xb31f174d27b99cdae8e746bd138a01ce60d8dd7b224f7c60845914def05ecc58",
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

See [`eth_getBlockByHash`](./#eth_getblockbyhash)

#### [Example](https://composer.alchemyapi.io?composer_state=%7B%22chain%22%3A0%2C%22network%22%3A0%2C%22methodName%22%3A%22eth_getBlockByNumber%22%2C%22paramValues%22%3A%5B%22latest%22%2Cfalse%5D%7D)

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x1b4", true],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
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
    "baseFeePerGas":"0x12",
    "number": "0x1b4",
    "difficulty": "0x4ea3f27bc",
    "extraData": "0x476574682f4c5649562f76312e302e302f6c696e75782f676f312e342e32",
    "gasLimit": "0x1388",
    "gasUsed": "0x0",
    "hash": "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
    "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "miner": "0xbb7b8287f3f0a933474a79eae42cbca977791171",
    "mixHash": "0x4fffe9ae21f1c9e15207b1f472d5bbdd68c9595d461666602f2be20daf5e7843",
    "nonce": "0x689056015818adbe",
    "parentHash": "0xe99e022112df268087ea7eafaf4790497fd21dbeeb6bd7a1721df161a6657a54",
    "receiptsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
    "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
    "size": "0x220",
    "stateRoot": "0xddc8b0234c2e0cad087c8b389aa7ef01f7d79b2570bccb77ce48648aa61c904d",
    "timestamp": "0x55ba467c",
    "totalDifficulty": "0x78ed983323d",
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
    "0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"
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

#### [Example](https://composer.alchemyapi.io?composer_state=%7B%22chain%22%3A0%2C%22network%22%3A0%2C%22methodName%22%3A%22eth_getTransactionByHash%22%2C%22paramValues%22%3A%5B%220x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b%22%5D%7D)

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d'{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getTransactionByHash",
    "params":["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"],
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
    "hash": "0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b",
    "blockHash": "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
    "blockNumber": "0x5daf3b",
    "from": "0xa7d9ddbe1f17865597fbd27ec712455208b6b76d",
    "gas": "0xc350",
    "gasPrice": "0x4a817c800",
    "input": "0x68656c6c6f21",
    "nonce": "0x15",
    "r": "0x1b5e176d927f8e9ab405058b2d2457392da3e20f328b16ddabcebc33eaac5fea",
    "s": "0x4ba69724e8f69de52f0125ad8b3c5c2cef33019bac3249e2c0a2192766d1721c",
    "to": "0xf02c1c8e6114b1dbe8937a39260b5b0a374432bb",
    "transactionIndex": "0x41",
    "v": "0x25",
    "value": "0xf3dbb76162000"
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
    '0xc94770007dda54cF92009BFF0dE90c06F603a09f',
    'latest' // state at the latest block
]
```

#### Returns

`QUANTITY` - integer of the number of transactions send from this address.

#### [Example](https://composer.alchemyapi.io?composer_state=%7B%22chain%22%3A0%2C%22network%22%3A0%2C%22methodName%22%3A%22eth_getTransactionCount%22%2C%22paramValues%22%3A%5B%220xc94770007dda54cF92009BFF0dE90c06F603a09f%22%2C%22latest%22%5D%7D)

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0xc94770007dda54cF92009BFF0dE90c06F603a09f","latest"],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getTransactionCount",
    "params":["0xc94770007dda54cF92009BFF0dE90c06F603a09f","latest"],
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
  "result": "0x219"
}
```

### eth\_getTransactionReceipt

Returns the receipt of a transaction by transaction hash. 

This can also be used to track the status of a transaction, since result will be null until the transaction is mined. However, unlike [`eth_getTransactionByHash`](./#eth_gettransactionbyhash) , which returns `null` for unknown transactions, and a non-null response with 3 null fields for a pending transaction, `eth_getTransactionReceipt` returns null for both pending and unknown transactions. 

This call is also commonly used to get the contract address for a contract creation tx.

{% hint style="warning" %}
**Note:** the receipt is not available for pending transactions.
{% endhint %}

#### Parameters

`DATA`, 32 Bytes - hash of a transaction 

```javascript
params: [ 
    '0xab059a62e22e230fe0f56d8555340a29b2e9532360368f810595453f6fdd213b' 
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
* `effectiveGasPrice`: `QUANTITY` - The fee per gas that this transaction paid \(EIP 1559\).
* `gasUsed`: `QUANTITY` - The amount of gas used by this specific transaction alone.
* `contractAddress`: `DATA`, 20 Bytes - The contract address created, if the transaction was a contract creation, otherwise null.
* `logs`: `Array` - Array of log objects, which this transaction generated.
* `logsBloom`: `DATA`, 256 Bytes - Bloom filter for light clients to quickly retrieve related logs.

It also returns either:

* `root` : `DATA` 32 bytes of post-transaction stateroot \(pre Byzantium\)
* `status`: `QUANTITY` either 1 \(success\) or 0 \(failure\)

#### [Example](https://composer.alchemyapi.io?composer_state=%7B%22chain%22%3A0%2C%22network%22%3A0%2C%22methodName%22%3A%22eth_getTransactionReceipt%22%2C%22paramValues%22%3A%5B%220xab059a62e22e230fe0f56d8555340a29b2e9532360368f810595453f6fdd213b%22%5D%7D)

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
    "effectiveGasPrice":"0x77359404",
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

### eth\_getBlockTransactionCountByHash

Returns the number of transactions in a block matching the given block hash.

#### Parameters

* `DATA`, 32 Bytes - hash of a block.

  ```javascript
  params: [ 
      '0x8243343df08b9751f5ca0c5f8c9c0460d8a9b6351066fae0acbd4d3e776de8bb' 
  ]
  ```

#### Returns

* `QUANTITY` - integer of the number of transactions in this block.

#### [Example](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBlockTransactionCountByHash%22%2C%22paramValues%22%3A%5B%220x8243343df08b9751f5ca0c5f8c9c0460d8a9b6351066fae0acbd4d3e776de8bb%22%5D%7D)

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0x8243343df08b9751f5ca0c5f8c9c0460d8a9b6351066fae0acbd4d3e776de8bb"],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getBlockTransactionCountByHash",
    "params":["0x8243343df08b9751f5ca0c5f8c9c0460d8a9b6351066fae0acbd4d3e776de8bb"],
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
  "result": "0xb0"
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

#### [Example](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBlockTransactionCountByNumber%22%2C%22paramValues%22%3A%5B%22latest%22%5D%7D)

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["latest"],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
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
  "result": "0xee"
}
```

### eth\_getTransactionByBlockHashAndIndex

Returns information about a transaction by block hash and transaction index position.

#### Parameters

`DATA`, 32 Bytes - hash of a block. 

`QUANTITY` - integer of the transaction index position. 

```javascript
params: [ 
    '0xc0f4906fea23cf6f3cce98cb44e8e1449e455b28d684dfa9ff65426495584de6', 
    '0x0' // 0 
]
```

#### Returns

See [`eth_getTransactionByHash`](./#eth_gettransactionbyhash)\`\`

#### [Example](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getTransactionByBlockHashAndIndex%22%2C%22paramValues%22%3A%5B%220xc0f4906fea23cf6f3cce98cb44e8e1449e455b28d684dfa9ff65426495584de6%22%2C%220x0%22%5D%7D)

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

See [`eth_getTransactionByHash`](./#eth_gettransactionbyhash)\`\`

#### [Example](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getTransactionByBlockNumberAndIndex%22%2C%22paramValues%22%3A%5B%22latest%22%2C%220x0%22%5D%7D)

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["latest", "0x0"],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
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
    "blockHash": "0xf345d6ac2cb6290489915178fef0b2fc7f5a7312dd06773c77532de6740b2b4d",
    "blockNumber": "0xa1c0ff",
    "from": "0x79c384ac9c32e90f00a214c77caac1392ec8cdea",
    "gas": "0xafbe",
    "gasPrice": "0x1270b01800",
    "hash": "0x61b27f711f58ee3090c0976c7e90d2b7eafeb7b889f0db593234f04f8ce07f22",
    "input": "0xa9059cbb0000000000000000000000004b1a99467a284cc690e3237bc69105956816f7620000000000000000000000000000000000000000000000000000001919617600",
    "nonce": "0xa",
    "to": "0xf9e5af7b42d31d51677c75bbbd37c1986ec79aee",
    "transactionIndex": "0x0",
    "value": "0x0",
    "v": "0x1b",
    "r": "0x2123cdbd1130f726ebed55fd2295239778dd4161495d2733f374d7863fc42ab1",
    "s": "0x1f08fd53ff2c3969b88d5e622561d62a799ae68e36f5142689dbfde44bbe1bed"
  }
}
```

## ✍ Writing Transactions 

Call to write to the blockchain. 

### eth\_sendRawTransaction

Creates a new message call transaction or a contract creation for signed transactions.

{% hint style="warning" %}
Alchemy does not store keys, so transactions sent via Alchemy must be signed ahead of time using another provider like [ethers](https://docs.ethers.io/v5/api/signer/) \(via `eth_signTransaction`\) and sent with `eth_sendRawTransaction`.
{% endhint %}

#### Parameters

`DATA`, The signed transaction data. 

```javascript
params: ["0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"]
```

#### Returns

`DATA`, 32 Bytes - the transaction hash, or the zero hash if the transaction is not yet available. 

Use [`eth_getTransactionReceipt`](./#eth_gettransactionreceipt) to get the contract address after the transaction was mined when you created a contract.

#### [Example](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_sendRawTransaction%22%2C%22paramValues%22%3A%5B%220xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675%22%5D%7D)

{% hint style="danger" %}
**Note:** Since `eth_sendRawTransaction` is a request used for writing to the blockchain and changes its state, it is impossible to execute the same request twice. This means if you were to copy the example given below you will not get the expected response. 
{% endhint %}

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":["0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"],"id":1}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_sendRawTransaction",
    "params":["0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"],
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
   '0xc94770007dda54cF92009BFF0dE90c06F603a09f',
   'latest'
]
```

#### Returns

`QUANTITY` - integer of the current balance for the given address in wei. 

#### [Example](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%220xc94770007dda54cF92009BFF0dE90c06F603a09f%22%2C%22latest%22%5D%7D)

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0xc94770007dda54cF92009BFF0dE90c06F603a09f", "latest"],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getBalance",
    "params":["0xc94770007dda54cF92009BFF0dE90c06F603a09f", "latest"],
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
  "result": "0x7c2562030800"
}
```

### eth\_getCode

Returns code at a given address. This method can be used to [distinguish between contract addresses and wallet addresses](../../../resources/faq.md#how-do-i-distinguish-between-a-contract-address-and-a-wallet-address). 

#### Parameters

* `DATA`, 20 Bytes - address.
* `QUANTITY|TAG` - integer block number, or the string "latest", "earliest" or "pending", see the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter).

```javascript
params: [
    '0xb59f67a8bff5d8cd03f6ac17265c550ed8f33907',
    'latest'
]
```

#### Returns

* `DATA` - the code from the given address.

#### [Example](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getCode%22%2C%22paramValues%22%3A%5B%220xb59f67a8bff5d8cd03f6ac17265c550ed8f33907%22%2C%22latest%22%5D%7D)

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getCode","params":["0xb59f67a8bff5d8cd03f6ac17265c550ed8f33907", "latest"],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getCode",
    "params":["0xb59f67a8bff5d8cd03f6ac17265c550ed8f33907", "latest"],
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
  "result": "0x606060405236156100965763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166306fdde0381146100a557806313af40351461012f57806318160ddd1461014e578063313ce5671461017357806370a082311461019c57806375ad319a146101bb5780638da5cb5b146101ee57806395d89b411461021d578063a9059cbb14610230575b34156100a157600080fd5bfe5b005b34156100b057600080fd5b6100b8610252565b60405160208082528190810183818151815260200191508051906020019080838360005b838110156100f45780820151838201526020016100dc565b50505050905090810190601f1680156101215780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561013a57600080fd5b6100a3600160a060020a0360043516610289565b341561015957600080fd5b61016161030f565b60405190815260200160405180910390f35b341561017e57600080fd5b610186610315565b60405160ff909116815260200160405180910390f35b34156101a757600080fd5b610161600160a060020a036004351661031a565b34156101c657600080fd5b6101da600160a060020a0360043516610335565b604051901515815260200160405180910390f35b34156101f957600080fd5b61020161038e565b604051600160a060020a03909116815260200160405180910390f35b341561022857600080fd5b6100b861039d565b341561023b57600080fd5b6101da600160a060020a03600435166024356103d4565b60408051908101604052601881527f444f5420416c6c6f636174696f6e20496e64696361746f720000000000000000602082015281565b60005433600160a060020a039081169116146102a457600080fd5b600054600160a060020a0380831691167f70aea8d848e8a90fb7661b227dc522eb6395c3dac71b63cb59edd5c9899b236460405160405180910390a36000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055565b60015481565b600381565b600160a060020a031660009081526002602052604090205490565b33600160a060020a03811660009081526002602052604081206001015490919060ff16151561036357600080fd5b5050600160a060020a031660009081526002602052604090206001908101805460ff19168217905590565b600054600160a060020a031681565b60408051908101604052600381527f444f540000000000000000000000000000000000000000000000000000000000602082015281565b33600160a060020a03811660009081526002602052604081205490919083908190101561040057600080fd5b33600160a060020a03811660009081526002602052604090206001015460ff16151561042b57600080fd5b85600160a060020a031633600160a060020a03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8760405190815260200160405180910390a3600160a060020a033381166000908152600260205260408082208054899003905591881681522080548601905560019350505050929150505600a165627a7a72305820228dfae3e67abcdc7f73fb3f83a7d23f45acd853774acad9d2e1ac83b940fbe90029"
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

#### Example

Calculating the correct position depends on the storage to retrieve. Consider the following contract deployed at `0x295a70b2de5e3953354a6a8344e616ed314d7251` by address `0x391694e7e0b0cce554cb130d723a9d27458f9298`. 

```javascript
contract Storage {
    uint pos0;
    mapping(address => uint) pos1;

    function Storage() {
        pos0 = 1234;
        pos1[msg.sender] = 5678;
    }
}
```

Retrieving the value of `pos0` is straight forward: 

[Request](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getStorageAt%22%2C%22paramValues%22%3A%5B%220x295a70b2de5e3953354a6a8344e616ed314d7251%22%2C%220x0%22%2C%22latest%22%5D%7D)

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getStorageAt",
    "params":["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"],
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
    "result":"0x00000000000000000000000000000000000000000000000000000000000004d2"
}
```

Retrieving an element of the map is harder. The position of an element in the map is calculated with:

```javascript
keccack(LeftPad32(key, 0), LeftPad32(map position, 0))
```

This means to retrieve the storage on `pos1[“0x391694e7e0b0cce554cb130d723a9d27458f9298”]` we need to calculate the position with:

```javascript
keccak(decodeHex("000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"))
```

The geth console which comes with the web3 library can be used to make the calculation:

```bash
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

Now to fetch the storage:

[Request](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getStorageAt%22%2C%22paramValues%22%3A%5B%220x295a70b2de5e3953354a6a8344e616ed314d7251%22%2C%220x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9%22%2C%22latest%22%5D%7D)

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getStorageAt",
    "params":["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"],
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
    "result":"0x000000000000000000000000000000000000000000000000000000000000162e"
}
```

### eth\_accounts

Returns a list of addresses owned by client.

{% hint style="warning" %}
Since Alchemy does not store keys, this will always return empty.
{% endhint %}

#### **Parameters**

none

#### **Returns**

`Array of DATA`, 20 Bytes - addresses owned by the client.

#### \*\*\*\*[**Example**](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_accounts%22%2C%22paramValues%22%3A%5B%5D%7D)\*\*\*\*

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
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
2. `ARRAY`, 32 Bytes - array of storage-keys which should be proofed and included. See[`eth_getStorageAt`](./#eth_getstorageat)
3. `QUANTITY|TAG` - integer block number, or the string `"latest"` or `"earliest"`, see the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter)

#### **Returns**

`Object` - A account object:

* `balance`: `QUANTITY` - the balance of the account. See[`eth_getBalance`](./#eth_getbalance)
* `codeHash`: `DATA`, 32 Bytes - hash of the code of the account. For a simple Account without code it will return `"0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470"`
* `nonce`: `QUANTITY`, - nonce of the account. See [`eth_getTransactionCount`](./#eth_gettransactioncount)\`\`
* `storageHash`: `DATA`, 32 Bytes - SHA3 of the StorageRoot. All storage will deliver a MerkleProof starting with this rootHash.
* `accountProof`: `ARRAY` - Array of rlp-serialized MerkleTree-Nodes, starting with the stateRoot-Node, following the path of the SHA3 \(address\) as key.
* `storageProof`: `ARRAY` - Array of storage-entries as requested. Each entry is a object with these properties:
  * `key`: `QUANTITY` - the requested storage key
  * `value`: `QUANTITY` - the storage value
  * `proof`: `ARRAY` - Array of rlp-serialized MerkleTree-Nodes, starting with the storageHash-Node, following the path of the SHA3 \(key\) as path.

#### **Example**

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getProof","params":["0x7F0d15C7FAae65896648C8273B6d7E43f58Fa842",["0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421"],"latest"],"id":1}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
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
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "accountProof": [
      "0xf90211a...0701bc80",
      "0xf90211a...0d832380",
      "0xf90211a...5fb20c80",
      "0xf90211a...0675b80",
      "0xf90151a0...ca08080"
    ],
    "balance": "0x0",
    "codeHash": "0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
    "nonce": "0x0",
    "storageHash": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
    "storageProof": [
      {
        "key": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
        "proof": [
          "0xf90211a...0701bc80",
          "0xf90211a...0d832380"
        ],
        "value": "0x1"
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
Starting from [Geth 1.9.13](https://github.com/ethereum/go-ethereum/pull/20783), `eth_call`will check the balance of the sender \(to make sure that the sender has enough gas to complete the request\) before executing the call. This means that even though the call doesn't consume any gas, the `from` address must have enough gas to execute the call as if it were a transaction. 
{% endhint %}

#### Parameters

* `Object` - The transaction call object
  * `from`: `DATA`, 20 Bytes - \(optional\) The address the transaction is sent from.
  * `to`: `DATA`, 20 Bytes - The address the transaction is directed to.
  * `gas`: `QUANTITY` - \(optional\) Integer of the gas provided for the transaction execution. `eth_call` consumes zero gas, but this parameter may be needed by some executions. 
  * `gasPrice`: `QUANTITY` - \(optional\) Integer of the gasPrice used for each paid gas. **Note: most of our users \(95%+\) never set the `gasPrice` on eth\_call.**
  * `value`: `QUANTITY` - \(optional\) Integer of the value sent with this transaction
  * `data`: `DATA` - \(optional\) Hash of the method signature and encoded parameters. For details see Ethereum Contract ABI
* `QUANTITY|TAG` - integer block number, or the string "latest", "earliest" or "pending" \(see the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter)\), OR the `blockHash` \(in accordance with [EIP-1898](https://eips.ethereum.org/EIPS/eip-1898)\) **Note: the parameter is an object instead of a string and should be specified as: `{"blockHash": "0x<some-hash>"}.`** Learn more [here](https://eips.ethereum.org/EIPS/eip-1898).

{% hint style="danger" %}
**Note:** `eth_call` has a timeout restriction at the node level. Batching multiple `eth_call`  together on-chain using pre-deployed smart contracts might result in unexpected timeouts that cause none of your calls to complete. Instead, consider serializing these calls, or using smaller batches if they fail with a node error code. 
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

#### [Example](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_call%22%2C%22paramValues%22%3A%5B%7B%22to%22%3A%220xd46e8dd67c5d32be8058bb8eb970870f07244567%22%2C%22from%22%3A%220xb60e8dd61c5d32be8058bb8eb970870f07233155%22%2C%22gas%22%3A%220x76c0%22%2C%22gasPrice%22%3A%220x9184e72a000%22%2C%22value%22%3A%220x9184e72a%22%2C%22data%22%3A%220xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675%22%7D%2C%22latest%22%5D%7D)

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_call","params":[{"from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155","to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567","gas": "0x76c0","gasPrice": "0x9184e72a000","value": "0x9184e72a","data": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"}, "latest"],"id":1}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
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

Returns an array of all logs matching a given filter object. For more information about `eth_getLogs` check out our [Deep Dive into eth\_getLogs](../../../guides/eth_getlogs.md) page. 

{% hint style="warning" %}
**NOTE**: You can make `eth_getLogs` requests with up to a _**2K block range**_ and _**no limit on the response size**_. You can also request _**any block range**_ with a cap of _**10K logs in the response**_. 

_If you need to pull logs frequently, we recommend_ [_using WebSockets_](../../../guides/using-websockets.md) _to push new logs to you when they are available._ 
{% endhint %}

#### Parameters

`Object` - The filter options:

* `fromBlock`: `QUANTITY|TAG` - \(optional, default: "latest"\) Value:
  * Integer block number
  * "latest" for the last mined block
  * "pending", "earliest" for not yet mined transactions.
* `toBlock`: `QUANTITY|TAG` - \(optional, default: "latest"\) Value:
  * Integer block number
  * "latest" for the last mined block
  * "pending", "earliest" for not yet mined transactions.
* `address`: `DATA|Array`, 20 Bytes - \(optional\) Contract address or a list of addresses from which logs should originate.
* `topics`: `Array` of `DATA`, - \(optional\) Array of 32 Bytes DATA topics. 
  * Topics are order-dependent. Each topic can also be an array of DATA with "or" options. 
  * Check out more details on how to format topics in [eth\_newFilter](./#eth_newfilter).
* `blockHash`: `DATA`, 32 Bytes - \(optional\) With the addition of EIP-234 \(Geth &gt;= v1.8.13 or Parity &gt;= v2.1.0\), blockHash is a new filter option which restricts the logs returned to the single block with the 32-byte hash blockHash. Using blockHash is equivalent to fromBlock = toBlock = the block number with hash `blockHash`. **If blockHash is present in the filter criteria, then neither `fromBlock` nor `toBlock` are allowed.**

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

See [`eth_getFilterChanges`](./#eth_getfilterchanges)

#### [Example](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getLogs%22%2C%22paramValues%22%3A%5B%7B%22address%22%3A%220xb59f67a8bff5d8cd03f6ac17265c550ed8f33907%22%2C%22topics%22%3A%22%5B%5C%220xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef%5C%22%5D%22%2C%22blockHash%22%3A%220x8243343df08b9751f5ca0c5f8c9c0460d8a9b6351066fae0acbd4d3e776de8bb%22%7D%5D%7D)

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"address": "0xb59f67a8bff5d8cd03f6ac17265c550ed8f33907","topics": ["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"],"blockHash": "0x8243343df08b9751f5ca0c5f8c9c0460d8a9b6351066fae0acbd4d3e776de8bb"}],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getLogs",
    "params":[{"address": "0xb59f67a8bff5d8cd03f6ac17265c550ed8f33907","topics": ["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"],"blockHash": "0x8243343df08b9751f5ca0c5f8c9c0460d8a9b6351066fae0acbd4d3e776de8bb"}],
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
  "result": [
    {
      "address": "0xb59f67a8bff5d8cd03f6ac17265c550ed8f33907",
      "topics": [
        "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
        "0x00000000000000000000000000b46c2526e227482e2ebb8f4c69e4674d262e75",
        "0x00000000000000000000000054a2d42a40f51259dedd1978f6c118a0f0eff078"
      ],
      "data": "0x000000000000000000000000000000000000000000000000000000012a05f200",
      "blockNumber": "0x429d3b",
      "transactionHash": "0xab059a62e22e230fe0f56d8555340a29b2e9532360368f810595453f6fdd213b",
      "transactionIndex": "0xac",
      "blockHash": "0x8243343df08b9751f5ca0c5f8c9c0460d8a9b6351066fae0acbd4d3e776de8bb",
      "logIndex": "0x56",
      "removed": false
    }
  ]
}
```

## ⛓ Chain Information

Calls to receive information about the current blockchain. 

### eth\_protocolVersion

Returns the current ethereum protocol version.

#### Parameters

none

#### Returns

`String` - The current ethereum protocol version.

#### [Example](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_protocolVersion%22%2C%22paramValues%22%3A%5B%5D%7D)

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_protocolVersion","params":[],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_protocolVersion",
    "params":[]
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
  "result": "0x40"
}
```

### eth\_gasPrice

Returns the current price per gas in wei. 

{% hint style="warning" %}
This method will be deprecated by the Ethereum spec at a time TBD due to EIP 1559. For EIP 1559 please use either  [`eth_feeHistory`](./#eth_feehistory) or [`eth_maxPriorityFeePerGas`](./#eth_maxpriorityfeepergas)\`\`
{% endhint %}

{% hint style="info" %}
If you are curious about the difference in gas price between this method and the [eth gas station](https://ethgasstation.info/), check out this [GitHub issue](https://github.com/ethereum/go-ethereum/issues/15825).
{% endhint %}

#### Parameters

none

#### Returns

`QUANTITY` - integer of the current gas price in wei. 

#### [Example](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_gasPrice%22%2C%22paramValues%22%3A%5B%5D%7D)

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
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
  "result": "0x98bca5a00"
}
```

### eth\_estimateGas

Generates and returns an estimate of how much gas is necessary to allow the transaction to complete. The transaction will not be added to the blockchain. 

{% hint style="info" %}
**Note:** The estimate may be significantly more than the amount of gas actually used by the transaction, for a variety of reasons including EVM mechanics and node performance. Estimates are served directly from nodes, we're not doing anything special to the value so the rest of the network is likely seeing the same.
{% endhint %}

#### **Parameters**

* `Object` - The transaction call object
  * `from`: `DATA`, 20 Bytes - \(optional\) The address the transaction is sent from.
  * `to`: `DATA`, 20 Bytes - The address the transaction is directed to.
  * `gas`: `QUANTITY` - \(optional\) Integer of the gas provided for the transaction execution. `eth_call` consumes zero gas, but this parameter may be needed by some executions. 
  * `gasPrice`: `QUANTITY` - \(optional\) Integer of the gasPrice used for each paid gas. **Note: most of our users \(95%+\) never set the `gasPrice` on eth\_call.**
  * `value`: `QUANTITY` - \(optional\) Integer of the value sent with this transaction
  * `data`: `DATA` - \(optional\) Hash of the method signature and encoded parameters. For details see Ethereum Contract ABI
* `QUANTITY|TAG` - integer block number, or the string "latest", "earliest" or "pending", see the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter).

{% hint style="warning" %}
**NOTE**

* `eth_estimateGas` ****will check the balance of the sender \(to make sure that the sender has enough gas to complete the request\). This means that even though the call doesn't consume any gas, the `from` address must have enough gas to execute the transaction.
* If no `gas` is specified geth uses the block gas limit from the pending block as an upper bound. As a result the returned estimate might not be enough to executed the call/transaction when the amount of actual gas needed is higher than the pending block gas limit.
{% endhint %}

#### Returns

`QUANTITY` - the amount of gas used.

#### [Example](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_estimateGas%22%2C%22paramValues%22%3A%5B%7B%22from%22%3A%220xb60e8dd61c5d32be8058bb8eb970870f07233155%22%2C%22to%22%3A%220xd46e8dd67c5d32be8058bb8eb970870f07244567%22%2C%22gasPrice%22%3A%220x9184e72a000%22%2C%22value%22%3A%220x9184e72a%22%2C%22data%22%3A%220xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675%22%2C%22gas%22%3A%220x76c0%22%7D%5D%7D)

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_estimateGas","params":[{see above}],"id":1}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
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

### eth\_feeHistory

Returns a collection of historical gas information from which you can decide what to submit as your `maxFeePerGas` and/or `maxPriorityFeePerGas`. This method was introduced with [EIP 1559](https://blog.alchemy.com/blog/eip-1559).

**Parameters**

* `BLOCKCOUNT` - Number of blocks in the requested range. Between 1 and 1024 blocks can be requested in a single query. Less than requested may be returned if not all blocks are available.
* `NEWESTBLOCK` - Highest number block of the requested range.
* `REWARDPERCENTILES` - \(optional\) A monotonically increasing list of percentile values to sample from each block's effective priority fees per gas in ascending order, weighted by gas used.

**Returns**

`Object`

* `OLDESTBLOCK` - Lowest number block of the returned range.
* `BASEFEEPERGAS` - An array of block base fees per gas. This includes the next block after the newest of the returned range, because this value can be derived from the newest block. Zeroes are returned for pre-EIP-1559 blocks.
* `GASUSEDRATIO` - An array of block gas used ratios. These are calculated as the ratio of gasUsed and gasLimit.
* `REWARD` - \(Optional\) An array of effective priority fee per gas data points from a single block. All zeroes are returned if the block is empty. 

**Example**

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-rinkeby.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_feeHistory","params":[4, "latest", [25, 75]],"id":1}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_feeHistory",
    "params":[4, "latest", [25, 75]],
    "id":1
}
```
{% endtab %}
{% endtabs %}

Result

```javascript
{
  "id": "1",
  "jsonrpc": "2.0",
  "result": {
    "oldestBlock": 10762137,
    "reward": [
      [
        "0x4a817c7ee",
        "0x4a817c7ee"
      ], [
        "0x773593f0",
        "0x773593f5"
      ], [
        "0x0",
        "0x0"
      ], [
        "0x773593f5",
        "0x773bae75"
      ]
    ],
    "baseFeePerGas": [
      "0x12",
      "0x10",
      "0x10",
      "0xe",
      "0xd"
    ],
    "gasUsedRatio": [
      0.026089875,
      0.406803,
      0,
      0.0866665
    ]
  }
}
```

### eth\_maxPriorityFeePerGas

Returns a fee per gas that is an estimate of how much you should submit as a priority fee, or "tip", to get a transaction included in the current block. Generally you will use the value returned from this method to set the `maxPriorityFeePerGas` in a subsequent transaction that you are submitting. This is a geth-only method and was introduced with [EIP 1559](https://blog.alchemy.com/blog/eip-1559).

**Returns**

`QUANTITY` - the estimated priority fee per gas.

**Example**

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-rinkeby.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_maxPriorityFeePerGas","params":[],"id":1}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_maxPriorityFeePerGas",
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
  "result": "0x12a05f1f9"
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

#### **Example**

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":83}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
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
  "id": 83,
  "jsonrpc": "2.0",
  "result": "0x3d" // 61
}
```

### net\_version

Returns the current network id.

#### **Parameters**

none

#### **Returns**

`String` - The current network id.

* `"1"`: Ethereum Mainnet
* `"2"`: Morden Testnet \(deprecated\)
* `"3"`: Ropsten Testnet
* `"4"`: Rinkeby Testnet
* `"42"`: Kovan Testnet

#### \*\*\*\*[**Example**](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22net_version%22%2C%22paramValues%22%3A%5B%5D%7D)\*\*\*\*

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
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
  "id":67,
  "jsonrpc": "2.0",
  "result": "3"
}
```

### net\_listening

Returns `true` if client is actively listening for network connections.

#### **Parameters**

none

#### **Returns**

`Boolean` - `true` when listening, otherwise `false`.

#### \*\*\*\*[**Example**](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22net_listening%22%2C%22paramValues%22%3A%5B%5D%7D)\*\*\*\*

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
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

See [`eth_getBlockByHash`](./#eth_getblockbyhash) 

{% hint style="warning" %}
**NOTE:** The return does not contain a list of transactions in the uncle block, to get this, make another request to [eth\_getBlockByHash](eth_getblockbyhash.md) _or_ [eth\_getBlockByNumber](eth_getblockbynumber.md)
{% endhint %}

#### [Example](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getUncleByBlockNumberAndIndex%22%2C%22paramValues%22%3A%5B%220x29c%22%2C%220x0%22%5D%7D)

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0x29c", "0x0"],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
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

* `QUANTITY|TAG` - a block number, or the string "earliest", "latest" or "pending", as in the 

  [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter).

* `QUANTITY` - the uncle's index position.

```javascript
params: [
    '0xb3b20624f8f0f86eb50dd04688409e5cea4bd02d700bf6e79e9384d47d6a5a35',
    '0x0' // 0
]
```

#### Returns

See [`eth_getBlockByHash`](./#eth_getblockbyhash) 

{% hint style="warning" %}
**NOTE:** The return does not contain a list of transactions in the uncle block, to get this, make another request to [eth\_getBlockByHash](eth_getblockbyhash.md) _or_ [eth\_getBlockByNumber](eth_getblockbynumber.md)
{% endhint %}

#### [Example](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getUncleByBlockHashAndIndex%22%2C%22paramValues%22%3A%5B%220xb3b20624f8f0f86eb50dd04688409e5cea4bd02d700bf6e79e9384d47d6a5a35%22%2C%220x0%22%5D%7D)

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0xb3b20624f8f0f86eb50dd04688409e5cea4bd02d700bf6e79e9384d47d6a5a35", "0x0"],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getUncleByBlockHashAndIndex",
    "params":["0xb3b20624f8f0f86eb50dd04688409e5cea4bd02d700bf6e79e9384d47d6a5a35", "0x0"],
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
 '0xb3b20624f8f0f86eb50dd04688409e5cea4bd02d700bf6e79e9384d47d6a5a35'
]
```

#### Returns

`QUANTITY` - integer of the number of uncles in this block.

#### [Example](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getUncleCountByBlockHash%22%2C%22paramValues%22%3A%5B%220xb3b20624f8f0f86eb50dd04688409e5cea4bd02d700bf6e79e9384d47d6a5a35%22%5D%7D)

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockHash","params":["0xb3b20624f8f0f86eb50dd04688409e5cea4bd02d700bf6e79e9384d47d6a5a35"],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getUncleCountByBlockHash",
    "params":["0xb3b20624f8f0f86eb50dd04688409e5cea4bd02d700bf6e79e9384d47d6a5a35"],
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

#### [Example](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getUncleCountByBlockNumber%22%2C%22paramValues%22%3A%5B%220xe8%22%5D%7D)

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockNumber","params":["0xe8"],"id":1}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
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
  "id": 0,
  "result": "0x0"
}
```

## 🔦 Filters

Calls related to creating, getting, and reading from filters. 

Eth filters expose the same information as the [`eth_subscribe`](./#eth_subscribe) methods, except that updates are received by polling rather than receiving pushes. A user may create a filter than repeatedly call `eth_getFilterChanges`on it, each time receiving events that have occurred since the last time `eth_getFilterChanges`was called \(or since the filter was created if this is the first time `eth_getFilterChanges`is being called.

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

* For filters created with `eth_newBlockFilter` the return are block hashes \(`DATA`, 32 Bytes\), e.g. `["0x3454645634534..."]`.
* For filters created with `eth_newPendingTransactionFilter`  the return are transaction hashes \(`DATA`, 32 Bytes\), e.g. `["0x6345343454645..."]`.
* For filters created with `eth_newFilter` logs are objects with following params:
  * `removed`: `TAG` - `true` when the log was removed, due to a chain reorganization. `false` if its a valid log.
  * `logIndex`: `QUANTITY` - integer of the log index position in the block. `null` when its pending log.
  * `transactionIndex`: `QUANTITY` - integer of the transactions index position log was created from. `null` when its pending log.
  * `transactionHash`: `DATA`, 32 Bytes - hash of the transactions this log was created from. `null` when its pending log.
  * `blockHash`: `DATA`, 32 Bytes - hash of the block where this log was in. `null` when its pending. `null` when its pending log.
  * `blockNumber`: `QUANTITY` - the block number where this log was in. `null` when its pending. `null` when its pending log.
  * `address`: `DATA`, 20 Bytes - address from which this log originated.
  * `data`: `DATA` - contains one or more 32 Bytes non-indexed arguments of the log.
  * `topics`: `Array of DATA` - Array of 0 to 4 32 Bytes `DATA` of indexed log arguments. 
    * In _solidity_: The first topic is the _hash_ of the signature of the event \(e.g. `Deposit(address,bytes32,uint256)`\), except you declare the event with the `anonymous` specifier.

#### \*\*\*\*[**Example**](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getFilterChanges%22%2C%22paramValues%22%3A%5B%220xfe704947a3cd3ca12541458a4321c869%22%5D%7D)\*\*\*\*

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

Returns an array of all logs matching filter with given id. Can compute the same results with an `eth_getLogs` call \(see hint below\). 

{% hint style="warning" %}
This method only works for filters creates with [`eth_newFilter`](./#eth_newfilter)not for filters created using [`eth_newBlockFilter`](./#eth_newblockfilter) or [`eth_newPendingTransactionFilter`](./#eth_newpendingtransactionfilter), which will return `"filter not found".`

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

See [`eth_getFilterChanges`](./#eth_getfilterchanges)\`\`

#### \*\*\*\*[**Example**](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getFilterLogs%22%2C%22paramValues%22%3A%5B%220xfe704947a3cd3ca12541458a4321c869%22%5D%7D)\*\*\*\*

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

Creates a filter in the node, to notify when a new block arrives. To check if the state has changed, call [`eth_getFilterChanges`](./#eth_getfilterchanges).

#### **Parameters**

None

#### **Returns**

`QUANTITY` - A filter id.

#### \*\*\*\*[**Example**](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_newBlockFilter%22%2C%22paramValues%22%3A%5B%5D%7D)\*\*\*\*

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

Creates a filter object, based on filter options, to notify when the state changes \(logs\). Unlike `eth_newBlockFilter`which notifies you of **all** new ****blocks, you can pass in filter options to track new logs matching the topics specified.  ****

To check if the state has changed, call [`eth_getFilterChanges.`](./#eth_getfilterchanges)\`\`

{% hint style="info" %}
#### A note on specifying topic filters:

Topics are order-dependent. A transaction with a log with topics \[A, B\] will be matched by the following topic filters:

* `[]` “anything”
* `[A]` “A in first position \(and anything after\)”
* `[null, B]` “anything in first position AND B in second position \(and anything after\)”
* `[A, B]` “A in first position AND B in second position \(and anything after\)”
* `[[A, B], [A, B]]` “\(A OR B\) in first position AND \(A OR B\) in second position \(and anything after\)”
{% endhint %}

#### **Parameters**

* `Object` - The filter options:
  1. `fromBlock`: `QUANTITY|TAG` - \(optional, default: `"latest"`\) Integer block number, or `"latest"` for the last mined block or `"pending"`, `"earliest"` for not yet mined transactions.
  2. `toBlock`: `QUANTITY|TAG` - \(optional, default: `"latest"`\) Integer block number, or `"latest"` for the last mined block or `"pending"`, `"earliest"` for not yet mined transactions.
  3. `address`: `DATA|Array`, 20 Bytes - \(optional\) Contract address or a list of addresses from which logs should originate.
  4. `topics`: `Array of DATA`, - \(optional\) Array of 32 Bytes `DATA` topics. Topics are order-dependent. Each topic can also be an array of DATA with “or” options.

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

#### \*\*\*\*[**Example**](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_newFilter%22%2C%22paramValues%22%3A%5B%7B%22fromBlock%22%3A%220x1%22%2C%22toBlock%22%3A%220x2%22%2C%22address%22%3A%220x8888f1f195afa192cfee860698584c030f4c9db1%22%2C%22topics%22%3A%22%5B%5C%220x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b%5C%22%2C%20null%2C%20%5B%5C%220x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b%5C%22%2C%20%5C%220x0000000000000000000000000aff3454fce5edbc8cca8697c15331677e6ebccc%5C%22%5D%5D%22%7D%5D%7D)\*\*\*\*

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

Creates a filter in the node, to notify when new pending transactions arrive.To check if the state has changed, call [`eth_getFilterChanges`](./#eth_getfilterchanges)\`\`

#### **Parameters**

None

#### **Returns**

`QUANTITY` - A filter id.

#### \*\*\*\*[**Example**](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_newPendingTransactionFilter%22%2C%22paramValues%22%3A%5B%5D%7D)\*\*\*\*

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

Uninstalls a filter with given id. Should always be called when watch is no longer needed. Additionally, Filters timeout when they aren’t requested with [`eth_getFilterChanges`](./#eth_getfilterchanges)for a period of time.

#### **Parameters**

1. `QUANTITY` - The filter id.

```javascript
params: [
  "0xfe704947a3cd3ca12541458a4321c869"
]
```

#### **Returns**

`Boolean` - `true` if the filter was successfully uninstalled, otherwise `false`.

#### \*\*\*\*[**Example**](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_uninstallFilter%22%2C%22paramValues%22%3A%5B%220xfe704947a3cd3ca12541458a4321c869%22%5D%7D)\*\*\*\*

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

#### \*\*\*\*[**Example**](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22web3_clientVersion%22%2C%22paramValues%22%3A%5B%5D%7D)\*\*\*\*

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
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
  "result": "Geth/v1.9.15-stable-0f77f34b/linux-amd64/go1.14.4"
}
```

### web3\_sha3

Returns Keccak-256 \(_not_ the standardized SHA3-256\) of the given data.

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

#### \*\*\*\*[**Example**](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22web3_sha3%22%2C%22paramValues%22%3A%5B%220x68656c6c6f20776f726c64%22%5D%7D)\*\*\*\*

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
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

## ⏰ Real Time Events

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

* `startingBlock`: `QUANTITY` - The block at which the import started \(will only be reset, after the sync reached his head\)
* `currentBlock`: `QUANTITY` - The current block, same as eth\_blockNumber
* `highestBlock`: `QUANTITY` - The estimated highest block

#### \*\*\*\*[**Example**](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_syncing%22%2C%22paramValues%22%3A%5B%5D%7D)\*\*\*\*

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

### eth\_subscribe

If successful this returns the subscription id. Subscriptions are creates with a regular RPC call with `eth_subscribe` as method and the subscription name as first parameter. 

#### Parameters <a id="parameters"></a>

1. subscription name
2. optional arguments \([see below](./#optional-arguments)\)

#### **Returns** 

If successful this returns the subscription id.

#### Example <a id="example"></a>

{% hint style="info" %}
**NOTE**: `eth_subscribe` requests cannot be replicated in the [composer](https://composer.alchemyapi.io/) tool
{% endhint %}

Request

{% tabs %}
{% tab title="wscat" %}
```python
wscat -c wss://eth-mainnet.alchemyapi.io/v2/<"YOUR KEY">

{"jsonrpc":"2.0","id": 1, "method": "eth_subscribe", "params": ["newHeads"]}

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

#### 1. newHeads <a id="newheads"></a>

Fires a notification each time a new header is appended to the chain, including chain reorganizations. 

In case of a chain reorganization the subscription will emit all new headers for the new chain. Therefore the subscription can emit multiple headers on the same height.

**Paramaters**

none

**Example**

Request

{% tabs %}
{% tab title="wscat" %}
```bash
wscat -c wss://eth-mainnet.alchemyapi.io/v2/<"YOUR KEY">

{"jsonrpc":"2.0","id": 1, "method": "eth_subscribe", "params": ["newHeads"]}

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

#### 2. logs <a id="logs"></a>

Returns logs that are included in new imported blocks and match the given filter criteria.

In case of a chain reorganization previous sent logs that are on the old chain will be resend with the `removed` property set to true. Logs from transactions that ended up in the new chain are emitted. Therefore a subscription can emit logs for the same transaction multiple times.

**Parameters**

1. `object` with the following \(optional\) fields
   * **address**, either an address or an array of addresses. Only logs that are created from these addresses are returned \(optional\)
   * **topics**, only logs which match the specified topics \(optional\)

**Example**

Request

{% tabs %}
{% tab title="wscat" %}
```bash
wscat -c wss://opt-mainnet.g.alchemy.com/v2/<"YOUR KEY">

{"jsonrpc":"2.0","id": 1, "method": "eth_subscribe", "params": ["logs", {"address": "0x8320fe7702b96808f7bbc0d4a888ed1468216cfd", "topics": ["0xd78a0cb8bb633d06981248b816e7bd33c2a35a6089241d099fa519e361cab902"]}]}

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

#### 3. newPendingTransactions <a id="newpendingtransactions"></a>

Returns the hash for all transactions that are added to the pending state. 

When a transaction that was previously part of the canonical chain isn’t part of the new canonical chain after a reorganization its again emitted.

{% hint style="info" %}
**NOTE:**

* If you want the full transaction object instead of just the hash, check out the Enhanced API [`alchemy_newFullPendingTransactions`](../../../guides/using-websockets.md#1-alchemy_newfullpendingtransactions)
* If you want pending transactions for a specific address, check out the Enhanced API 

  \`\`[`alchemy_filteredNewFullPendingTransactions`](../../../guides/using-websockets.md#2-alchemy_filterednewfullpendingtransactions)\`\`
{% endhint %}

**Parameters**

none

**Example**

Request

{% tabs %}
{% tab title="wscat" %}
```bash
wscat -c wss://eth-mainnet.alchemyapi.io/v2/<"YOUR KEY">

'{"jsonrpc":"2.0","id": 2, "method": "eth_subscribe", "params": ["newPendingTransactions"]}'

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

Indicates when the node starts or stops synchronizing. The result can either be a boolean indicating that the synchronization has started \(true\), finished \(false\) or an object with various progress indicators.

**Parameters**

none

**Example**

Request

{% tabs %}
{% tab title="wscat" %}
```bash
wscat -c wss://eth-mainnet.alchemyapi.io/v2/<"YOUR KEY">

'{"jsonrpc":"2.0","id": 1, "method": "eth_subscribe", "params": ["syncing"]}'
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

#### Parameters <a id="parameters-1"></a>

1. subscription id

#### Example <a id="example-1"></a>

{% hint style="info" %}
**NOTE**: `eth_unsubscribe` requests cannot be replicated in the [composer](https://composer.alchemyapi.io/) tool
{% endhint %}

Request

{% tabs %}
{% tab title="wscat" %}
```python
wscat -c wss://eth-mainnet.alchemyapi.io/v2/<"YOUR KEY">

{"jsonrpc":"2.0","method":"eth_subscribe","params":["0x9cef478923ff08bf67fde6c64013158d"],"id":1}
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

