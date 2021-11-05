---
description: >-
  Below you will find the standard Optimism JSON-RPC calls that are compatible
  with Alchemy.
---

# ✨ Optimism API

{% hint style="warning" %}
**IMPORTANT:** In order to deploy to Optimism, users have to apply to be whitelisted. [Click here](https://community.optimism.io/docs/developers/l2/deploy.html) for more information from the Optimism documentation, and use [this form](https://docs.google.com/forms/d/e/1FAIpQLSfBGsJN3nZQRLdMjqCS\_svfQoPkn35o\_cc4HUVnLlXN2BHmPw/viewform) to apply.
{% endhint %}

For more information on the Optimism, JSON-RPC check out the[ Optimism Wiki](https://community.optimism.io/docs/developers/l2/rpc.html#frontmatter-title).

{% hint style="info" %}
**HINT: **Most JSON-RPC methods in Optimistic Ethereum are identical to the corresponding methods in the Ethereum JSON-RPC API. However, a few JSON-RPC methods have been added or changed to better fit the needs of Optimistic Ethereum.&#x20;
{% endhint %}

## Mainnet vs. Testnet

There are two networks on Optimism: Mainnet and Kovan testnet. The endpoints are as follows:

* **Mainnet:** `https://opt-mainnet.g.alchemy.com/v2/your-api-key`
* **Kovan:**  `https://opt-kovan.g.alchemy.com/v2/your-api-key`

{% hint style="warning" %}
Currently, Alchemy does not support pending transactions for Optimism websockets.
{% endhint %}

## :package: Retrieving Blocks

Calls related to retrieving blocks and block information.&#x20;

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

### eth\_getBlockByHash

{% hint style="info" %}
&#x20;Currently, Optimistic Ethereum blocks only include a single transaction. If you query `eth_getBlockByNumber` or `eth_getBlockByHash`, you should expect to only see one transaction.&#x20;
{% endhint %}

Returns information about a block by hash.

#### Parameters

* `DATA`, 32 Bytes - Hash of a block.
* `Boolean` - If true it returns the full transaction objects, if false it returns only the hashes of the transactions.

```javascript
params: [
    '0x02b853cf50bc1c335b70790f93d5a390a35a166bea9c895e685cc866e4961cae',
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
curl https://opt-mainnet.g.alchemy.com/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getBlockByHash","params":["0x02b853cf50bc1c335b70790f93d5a390a35a166bea9c895e685cc866e4961cae", true],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://opt-mainnet.g.alchemy.com/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getBlockByHash",
    "params":["0x02b853cf50bc1c335b70790f93d5a390a35a166bea9c895e685cc866e4961cae", true],
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

{% hint style="info" %}
&#x20;Currently, Optimistic Ethereum blocks only include a single transaction. If you query `eth_getBlockByNumber` or `eth_getBlockByHash`, you should expect to only see one transaction.&#x20;
{% endhint %}

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
curl https://opt-mainnet.g.alchemy.com/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x1b4", true],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://opt-mainnet.g.alchemy.com/v2/your-api-key
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
        "difficulty": "0x2",
        "extraData": "0xd98301090a846765746889676f312e31352e3133856c696e7578000000000000138670a98dc89f978cb46c35cf92c6308bc63660af42e30e6639e401e11da77c693dde6324c8ec5ed641ecc2f82b8d747d6ffcd7f4e03c7694dde6b12f5b252000",
        "gasLimit": "0xa7d8c0",
        "gasUsed": "0x379e70",
        "hash": "0x02b853cf50bc1c335b70790f93d5a390a35a166bea9c895e685cc866e4961cae",
        "logsBloom": "0x00000000000000000000000000400100000000000000000000040000000000000000000000000000000000900002000100000000000000000000000000000000000000000001000000000008104000000000000000000000000000400000000000000000000000000000000000000000200000000040000000000010000000000008000000040000000000000000000000000000002000000000040000000000000000000000000000000000000000000000000000000000000000000000000000000002000100000000000000000000000000020000000000000000000000000000000000200008000000000000000000000000000000000000000000000000",
        "miner": "0x0000000000000000000000000000000000000000",
        "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "nonce": "0x0000000000000000",
        "number": "0x1b4",
        "parentHash": "0x17433dcb86d75391996efcef54b00846f1375551009328c98e2f17da793c9414",
        "receiptsRoot": "0x437d8dec027b1798878814d484fcf1cfb315f0b401767f150613e7ce1bb67d8c",
        "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
        "size": "0x2cc",
        "stateRoot": "0x86830e056ff5841c615b0a3f1d0dac42bd0e27ca1206593b25f6d358c3c7fe24",
        "timestamp": "0x60d34b60",
        "totalDifficulty": "0x369",
        "transactions": [
            {
                "blockHash": "0x02b853cf50bc1c335b70790f93d5a390a35a166bea9c895e685cc866e4961cae",
                "blockNumber": "0x1b4",
                "from": "0x3b179dcfc5faa677044c27dce958e4bc0ad696a6",
                "gas": "0x11cbbdc",
                "gasPrice": "0x0",
                "hash": "0x2642e960d3150244e298d52b5b0f024782253e6d0b2c9a01dd4858f7b4665a3f",
                "input": "0xd294f093",
                "nonce": "0xa2",
                "to": "0x4a16a42407aa491564643e1dfc1fd50af29794ef",
                "transactionIndex": "0x0",
                "value": "0x0",
                "v": "0x38",
                "r": "0x6fca94073a0cf3381978662d46cf890602d3e9ccf6a31e4b69e8ecbd995e2bee",
                "s": "0xe804161a2b56a37ca1f6f4c4b8bce926587afa0d9b1acc5165e6556c959d583",
                "queueOrigin": "sequencer",
                "txType": "",
                "l1TxOrigin": null,
                "l1BlockNumber": "0xc1a65c",
                "l1Timestamp": "0x60d34b60",
                "index": "0x1b3",
                "queueIndex": null,
                "rawTransaction": "0xf86681a28084011cbbdc944a16a42407aa491564643e1dfc1fd50af29794ef8084d294f09338a06fca94073a0cf3381978662d46cf890602d3e9ccf6a31e4b69e8ecbd995e2beea00e804161a2b56a37ca1f6f4c4b8bce926587afa0d9b1acc5165e6556c959d583"
            }
        ],
        "transactionsRoot": "0x874e61dfee4625c52bf64a90805f60c03cfd37eb35f43f46fa1f755b80a12223",
        "uncles": []
    }
}
```

## :receipt: Reading Transactions

Calls for reading transactions.&#x20;

{% hint style="info" %}
**NOTE: **On Optimism, there is one L2 block mined for each L2 transaction. &#x20;
{% endhint %}

### eth\_getTransactionByHash

Returns the information about a transaction requested by transaction hash. In the response object, `blockHash`, `blockNumber`, and `transactionIndex` are `null` when the transaction is pending.

#### Parameters

`DATA`, 32 Bytes - hash of a transaction&#x20;

```javascript
params: [
    "0x2642e960d3150244e298d52b5b0f024782253e6d0b2c9a01dd4858f7b4665a3f"
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
curl https://opt-mainnet.g.alchemy.com/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d'{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0x2642e960d3150244e298d52b5b0f024782253e6d0b2c9a01dd4858f7b4665a3f"],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://opt-mainnet.g.alchemy.com/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getTransactionByHash",
    "params":["0x2642e960d3150244e298d52b5b0f024782253e6d0b2c9a01dd4858f7b4665a3f"],
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
        "blockHash": "0x02b853cf50bc1c335b70790f93d5a390a35a166bea9c895e685cc866e4961cae",
        "blockNumber": "0x1b4",
        "from": "0x3b179dcfc5faa677044c27dce958e4bc0ad696a6",
        "gas": "0x11cbbdc",
        "gasPrice": "0x0",
        "hash": "0x2642e960d3150244e298d52b5b0f024782253e6d0b2c9a01dd4858f7b4665a3f",
        "input": "0xd294f093",
        "nonce": "0xa2",
        "to": "0x4a16a42407aa491564643e1dfc1fd50af29794ef",
        "transactionIndex": "0x0",
        "value": "0x0",
        "v": "0x38",
        "r": "0x6fca94073a0cf3381978662d46cf890602d3e9ccf6a31e4b69e8ecbd995e2bee",
        "s": "0xe804161a2b56a37ca1f6f4c4b8bce926587afa0d9b1acc5165e6556c959d583",
        "queueOrigin": "sequencer",
        "txType": "",
        "l1TxOrigin": null,
        "l1BlockNumber": "0xc1a65c",
        "l1Timestamp": "0x60d34b60",
        "index": "0x1b3",
        "queueIndex": null,
        "rawTransaction": "0xf86681a28084011cbbdc944a16a42407aa491564643e1dfc1fd50af29794ef8084d294f09338a06fca94073a0cf3381978662d46cf890602d3e9ccf6a31e4b69e8ecbd995e2beea00e804161a2b56a37ca1f6f4c4b8bce926587afa0d9b1acc5165e6556c959d583"
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

### eth\_getTransactionReceipt

Returns the receipt of a transaction by transaction hash.&#x20;

This can also be used to track the status of a transaction, since the result will be null until the transaction is mined. However, unlike [`eth_getTransactionByHash`](ethereum/#eth\_gettransactionbyhash) , which returns `null` for unknown transactions, and a non-null response with 3 null fields for a pending transaction, `eth_getTransactionReceipt` returns null for both pending and unknown transactions.&#x20;

This call is also commonly used to get the contract address for a contract creation tx.

{% hint style="warning" %}
**Note:** The receipt is not available for pending transactions.
{% endhint %}

#### Parameters

`DATA`, 32 Bytes - hash of a transaction&#x20;

```javascript
params: [ 
    '0x09947eaa4920d9d1a5b443c22e3cda1a14baa6b1f8607559de38ac05ff99e5ad' 
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
curl https://opt-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0x09947eaa4920d9d1a5b443c22e3cda1a14baa6b1f8607559de38ac05ff99e5ad"],"id":0}
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://opt-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getTransactionReceipt",
    "params":["0x09947eaa4920d9d1a5b443c22e3cda1a14baa6b1f8607559de38ac05ff99e5ad"],
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
        "blockHash": "0x7cf4df93eb84897abd5b913e0e8625d1158f7661759c22d4b5995702e576398b",
        "blockNumber": "0x41fe0",
        "contractAddress": null,
        "cumulativeGasUsed": "0x169e81",
        "from": "0xd44fd1c1fe3f3f0d93a8867af4041ab231783fcb",
        "gasUsed": "0x169e81",
        "logs": [
            {
                "address": "0x4200000000000000000000000000000000000006",
                "topics": [
                    "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                    "0x000000000000000000000000d44fd1c1fe3f3f0d93a8867af4041ab231783fcb",
                    "0x0000000000000000000000004200000000000000000000000000000000000011"
                ],
                "data": "0x0000000000000000000000000000000000000000000000000001f4d05e595b80",
                "blockNumber": "0x41fe0",
                "transactionHash": "0x09947eaa4920d9d1a5b443c22e3cda1a14baa6b1f8607559de38ac05ff99e5ad",
                "transactionIndex": "0x0",
                "blockHash": "0x7cf4df93eb84897abd5b913e0e8625d1158f7661759c22d4b5995702e576398b",
                "logIndex": "0x0",
                "removed": false
            },
            {
                "address": "0x2e4a187732166a0282e52527b931c96146ac7c58",
                "topics": [
                    "0x92e98423f8adac6e64d0608e519fd1cefb861498385c6dee70d58fc926ddc68c",
                    "0x00000000000000000000000000000000000000000000000000000000384d73c0",
                    "0x0000000000000000000000000000000000000000000000000000000000001314",
                    "0x000000000000000000000000d44fd1c1fe3f3f0d93a8867af4041ab231783fcb"
                ],
                "data": "0x",
                "blockNumber": "0x41fe0",
                "transactionHash": "0x09947eaa4920d9d1a5b443c22e3cda1a14baa6b1f8607559de38ac05ff99e5ad",
                "transactionIndex": "0x0",
                "blockHash": "0x7cf4df93eb84897abd5b913e0e8625d1158f7661759c22d4b5995702e576398b",
                "logIndex": "0x1",
                "removed": false
            },
            {
                "address": "0x2e4a187732166a0282e52527b931c96146ac7c58",
                "topics": [
                    "0x0559884fd3a460db3073b7fc896cc77986f16e378210ded43186175bf646fc5f",
                    "0x0000000000000000000000000000000000000000000000000000000038538e40",
                    "0x0000000000000000000000000000000000000000000000000000000000001314"
                ],
                "data": "0x000000000000000000000000000000000000000000000000000000006108559e",
                "blockNumber": "0x41fe0",
                "transactionHash": "0x09947eaa4920d9d1a5b443c22e3cda1a14baa6b1f8607559de38ac05ff99e5ad",
                "transactionIndex": "0x0",
                "blockHash": "0x7cf4df93eb84897abd5b913e0e8625d1158f7661759c22d4b5995702e576398b",
                "logIndex": "0x2",
                "removed": false
            },
            {
                "address": "0x2e4a187732166a0282e52527b931c96146ac7c58",
                "topics": [
                    "0xfe25c73e3b9089fac37d55c4c7efcba6f04af04cebd2fc4d6d7dbb07e1e5234f",
                    "0x00000000000000000000000000000000000000000000000e34ac9e997f1d0000"
                ],
                "data": "0x",
                "blockNumber": "0x41fe0",
                "transactionHash": "0x09947eaa4920d9d1a5b443c22e3cda1a14baa6b1f8607559de38ac05ff99e5ad",
                "transactionIndex": "0x0",
                "blockHash": "0x7cf4df93eb84897abd5b913e0e8625d1158f7661759c22d4b5995702e576398b",
                "logIndex": "0x3",
                "removed": false
            }
        ],
        "logsBloom": "0x000000000000000000000000000000a0000000000000000000042000008000000000400000004000000000100000004100000000000200000040000000000000100000000000000004000008002000000000000000000000000000400000000000000000080000000000002020040000400000000400000000000010100000000000000000000000000000000000000000000480002000000000000000000000000000000000000000000008000000000000000000000010000000000000000000400002000000000000000000000008000000002000000000000000000000000000000000001008000000000000000000000000000000000000000000000000",
        "status": "0x1",
        "to": "0x2e4a187732166a0282e52527b931c96146ac7c58",
        "transactionHash": "0x09947eaa4920d9d1a5b443c22e3cda1a14baa6b1f8607559de38ac05ff99e5ad",
        "transactionIndex": "0x0"
    }
}
```

### eth\_getBlockTransactionCountByHash

Returns the number of transactions in a block matching the given block hash.

#### Parameters

*   `DATA`, 32 Bytes - hash of a block.

    ```javascript
    params: [ 
        '0x02b853cf50bc1c335b70790f93d5a390a35a166bea9c895e685cc866e4961cae' 
    ]
    ```

#### Returns

* `QUANTITY` - integer of the number of transactions in this block.

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://opt-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0x02b853cf50bc1c335b70790f93d5a390a35a166bea9c895e685cc866e4961cae"],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://opt-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getBlockTransactionCountByHash",
    "params":["0x02b853cf50bc1c335b70790f93d5a390a35a166bea9c895e685cc866e4961cae"],
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
curl https://opt-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["latest"],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://opt-mainnet.g.alchemyapi.io/v2/your-api-key
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
    "result": "0x1"
}
```

### eth\_getTransactionByBlockHashAndIndex

Returns information about a transaction by block hash and transaction index position.

#### Parameters

`DATA`, 32 Bytes - hash of a block.&#x20;

`QUANTITY` - integer of the transaction index position.&#x20;

```javascript
params: [ 
    '0x02b853cf50bc1c335b70790f93d5a390a35a166bea9c895e685cc866e4961cae', 
    '0x0' // 0 
]
```

#### Returns

See [`eth_getTransactionByHash`](ethereum/#eth\_gettransactionbyhash)``

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://opt-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x02b853cf50bc1c335b70790f93d5a390a35a166bea9c895e685cc866e4961cae", "0x0"],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://opt-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getTransactionByBlockHashAndIndex",
    "params":["0x02b853cf50bc1c335b70790f93d5a390a35a166bea9c895e685cc866e4961cae", "0x0"],
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
        "blockHash": "0x02b853cf50bc1c335b70790f93d5a390a35a166bea9c895e685cc866e4961cae",
        "blockNumber": "0x1b4",
        "from": "0x3b179dcfc5faa677044c27dce958e4bc0ad696a6",
        "gas": "0x11cbbdc",
        "gasPrice": "0x0",
        "hash": "0x2642e960d3150244e298d52b5b0f024782253e6d0b2c9a01dd4858f7b4665a3f",
        "input": "0xd294f093",
        "nonce": "0xa2",
        "to": "0x4a16a42407aa491564643e1dfc1fd50af29794ef",
        "transactionIndex": "0x0",
        "value": "0x0",
        "v": "0x38",
        "r": "0x6fca94073a0cf3381978662d46cf890602d3e9ccf6a31e4b69e8ecbd995e2bee",
        "s": "0xe804161a2b56a37ca1f6f4c4b8bce926587afa0d9b1acc5165e6556c959d583",
        "queueOrigin": "sequencer",
        "txType": "",
        "l1TxOrigin": null,
        "l1BlockNumber": "0xc1a65c",
        "l1Timestamp": "0x60d34b60",
        "index": "0x1b3",
        "queueIndex": null,
        "rawTransaction": "0xf86681a28084011cbbdc944a16a42407aa491564643e1dfc1fd50af29794ef8084d294f09338a06fca94073a0cf3381978662d46cf890602d3e9ccf6a31e4b69e8ecbd995e2beea00e804161a2b56a37ca1f6f4c4b8bce926587afa0d9b1acc5165e6556c959d583"
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

See [`eth_getTransactionByHash`](ethereum/#eth\_gettransactionbyhash)``



Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://opt-mainnet.g.alchemyapi.io/v2/your-api-key \
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
        "blockHash": "0x02b853cf50bc1c335b70790f93d5a390a35a166bea9c895e685cc866e4961cae",
        "blockNumber": "0x1b4",
        "from": "0x3b179dcfc5faa677044c27dce958e4bc0ad696a6",
        "gas": "0x11cbbdc",
        "gasPrice": "0x0",
        "hash": "0x2642e960d3150244e298d52b5b0f024782253e6d0b2c9a01dd4858f7b4665a3f",
        "input": "0xd294f093",
        "nonce": "0xa2",
        "to": "0x4a16a42407aa491564643e1dfc1fd50af29794ef",
        "transactionIndex": "0x0",
        "value": "0x0",
        "v": "0x38",
        "r": "0x6fca94073a0cf3381978662d46cf890602d3e9ccf6a31e4b69e8ecbd995e2bee",
        "s": "0xe804161a2b56a37ca1f6f4c4b8bce926587afa0d9b1acc5165e6556c959d583",
        "queueOrigin": "sequencer",
        "txType": "",
        "l1TxOrigin": null,
        "l1BlockNumber": "0xc1a65c",
        "l1Timestamp": "0x60d34b60",
        "index": "0x1b3",
        "queueIndex": null,
        "rawTransaction": "0xf86681a28084011cbbdc944a16a42407aa491564643e1dfc1fd50af29794ef8084d294f09338a06fca94073a0cf3381978662d46cf890602d3e9ccf6a31e4b69e8ecbd995e2beea00e804161a2b56a37ca1f6f4c4b8bce926587afa0d9b1acc5165e6556c959d583"
    }
}
```

## :writing\_hand: Writing Transactions&#x20;

Call to write to the blockchain.&#x20;

### eth\_sendRawTransaction

Creates a new message call transaction or a contract creation for signed transactions.

{% hint style="warning" %}
Alchemy does not store keys, so transactions sent via Alchemy must be signed ahead of time using another provider like [ethers](https://docs.ethers.io/v5/api/signer/) (via `eth_signTransaction`) and sent with `eth_sendRawTransaction`.\

{% endhint %}

{% hint style="danger" %}
NOTE: Writing data on Optimism is handled by its sequencers; for more information on specifics, please refer to the [Optimism docs](https://community.optimism.io/docs/).
{% endhint %}

#### Parameters

`DATA`, The signed transaction data.&#x20;

```javascript
params: ["0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"]
```

#### Returns

`DATA`, 32 Bytes - the transaction hash, or the zero hash if the transaction is not yet available.&#x20;

Use [`eth_getTransactionReceipt`](ethereum/#eth\_gettransactionreceipt) to get the contract address after the transaction was mined when you created a contract.

{% hint style="danger" %}
**Note: **Since `eth_sendRawTransaction` is a request used for writing to the blockchain and changes its state, it is impossible to execute the same request twice. This means if you were to copy the example given below you will not get the expected response.&#x20;
{% endhint %}

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://opt-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":["0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"],"id":1}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://opt-mainnet.g.alchemyapi.io/v2/your-api-key
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

## :open\_file\_folder: Account Information&#x20;

Calls to get information about an account.&#x20;

### eth\_getBalance

Returns the balance of the account of a given address.&#x20;

#### Parameters

1. `DATA`, 20 Bytes - address to check for balance.
2. `QUANTITY|TAG` - integer block number, or the string `"latest"`, `"earliest"` or `"pending"`, see the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter).

```javascript
params: [
   '0xf69d0bbc95db6287ef02f19e5b2789972f776c2f',
   'latest'
]
```

#### Returns

`QUANTITY` - integer of the current balance for the given address in wei.&#x20;

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://opt-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0xf69d0bbc95db6287ef02f19e5b2789972f776c2f", "latest"],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://opt-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getBalance",
    "params":["0xf69d0bbc95db6287ef02f19e5b2789972f776c2f", "latest"],
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
    "result": "0x206c36e81d47c480"
}
```

### eth\_getCode

Returns code at a given address. This method can be used to [distinguish between contract addresses and wallet addresses](../resources/faq.md#how-do-i-distinguish-between-a-contract-address-and-a-wallet-address).&#x20;

#### Parameters

* `DATA`, 20 Bytes - address.
* `QUANTITY|TAG` - integer block number, or the string "latest", "earliest" or "pending", see the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter).

```javascript
params: [
    '0xf69d0bbc95db6287ef02f19e5b2789972f776c2f',
    'latest'
]
```

#### Returns

* `DATA` - the code from the given address.

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://opt-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getCode","params":["0xf69d0bbc95db6287ef02f19e5b2789972f776c2f", "latest"],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://opt-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getCode",
    "params":["0xf69d0bbc95db6287ef02f19e5b2789972f776c2f", "latest"],
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
    "result": "0x6080604052600436106100295760003560e01c80630900f010146100c8578063aaf10f4214610117575b600080610034610159565b6001600160a01b0316600036604051808383808284378083019250505092505050600060405180830381855a610068610405565b50505050509150503d806000811461009c576040513d603f01601f191681016040523d815291503d6000602084013e6100a1565b606091505b509150915081156100b457805160208201f35b8051602082016100c26104f2565b50505050005b5a6100d161055d565b80156100e5576000806100e26104f2565b50505b5061011560048036036020811015610105576000806101026104f2565b50505b50356001600160a01b03166101bf565b005b5a61012061055d565b8015610134576000806101316104f2565b50505b5061013d610159565b6040516001600160a01b03909116815260200160405180910390f35b6000807f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc6101856105b7565b9050600061019282610269565b90506001600160a01b0381166101b3576003602160991b01925050506101bc565b91506101bc9050565b90565b6101c7610270565b6001600160a01b03165a6101d9610603565b6001600160a01b0316146102275760405162461bcd60e51b815260040180806020018281038252603381526020018061069860339139604001915050604051809103906102246104f2565b50505b610230816102dd565b806001600160a01b03167fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b60405160405180910390a250565b805b919050565b6000806102af604051602401604051601f1981830301815260409190915263996d79a560e01b6020820180516001600160e01b0316909117905261031a565b905060208101815160208110156102ce576000806102cb6104f2565b50505b81019080805194505050505090565b60006102e8826103f9565b9050807f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc610314610649565b50505050565b6060600080600b602160991b01846040518082805190602001908083835b602083106103575780518252601f199092019160209182019101610338565b6001836020036101000a038019825116818451168082178552505050505050905001915050600060405180830381855a61038f610405565b50505050509150503d80600081146103c3576040513d603f01601f191681016040523d815291503d6000602084013e6103c8565b606091505b509092509050600182151514156103e257915061026b9050565b8051602082016103f06104f2565b50505050919050565b6001600160a01b031690565b63ffe73914598160e01b8152610438565b80808311156104225750815b92915050565b8080831015610422575090919050565b836004820152846024820152606060448201528660648201526084810160005b88811015610470578088015182820152602001610458565b506060828960a40184336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b815160408301513d6000853e8b8b82606087013350600060045af150596104c58d3d610428565b8c016104d18187610416565b5b828110156104e657600081526020016104d2565b50929c50505050505050565b632a2a7adb598160e01b8152600481016020815285602082015260005b8681101561052a57808601518282016040015260200161050f565b506020828760640184336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b505050565b63a8c4c5ec598160e01b8152602081600483336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b8051935060005b60408110156105b25760008282015260200161059b565b505050565b6303daa959598160e01b8152836004820152602081602483336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b8051600082529350602061059b565b6373509064598160e01b8152602081600483336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b8051600082529350602061059b565b6322bd64c0598160e01b8152836004820152846024820152600081604483336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b60008152602061059b56fe454f41732063616e206f6e6c792075706772616465207468656972206f776e20454f4120696d706c656d656e746174696f6e2e"
}
```

### eth\_getStorageAt

Returns the value from a storage position at a given address, or in other words, returns the state of the contract's storage, which may not be exposed via the contract's methods.&#x20;

#### Parameters

* `DATA`, 20 Bytes - address of the storage.
* `QUANTITY` - integer of the position in the storage.
* `QUANTITY|TAG` - integer block number, or the string "latest", "earliest" or "pending", see the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter).

#### Returns

* `DATA` - the value at this storage position.

#### Example

Calculating the correct position depends on the storage to retrieve. Consider the following contract deployed at `0x295a70b2de5e3953354a6a8344e616ed314d7251` by address `0x391694e7e0b0cce554cb130d723a9d27458f9298`.&#x20;

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

Retrieving the value of `pos0` is straight forward:&#x20;

Request

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
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x0000000000000000000000000000000000000000000000000000000000000000"
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

#### ****[**Example**](https://composer.alchemyapi.io/?composer\_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth\_accounts%22%2C%22paramValues%22%3A%5B%5D%7D)****

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://opt-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://opt-mainnet.g.alchemyapi.io/v2/your-api-key
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

Returns the account and storage values of the specified account including the Merkle-proof. This call can be used to verify that the data you are pulling from is not tampered with.&#x20;

#### **Parameters**

1. `DATA`, 20 Bytes - address of the account.
2. `ARRAY`, 32 Bytes - array of storage-keys which should be proofed and included. See[`eth_getStorageAt`](ethereum/#eth\_getstorageat)
3. `QUANTITY|TAG` - integer block number, or the string `"latest"` or `"earliest"`, see the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter)

#### **Returns**

`Object` - A account object:

* `balance`: `QUANTITY` - the balance of the account. See[`eth_getBalance`](ethereum/#eth\_getbalance)
* `codeHash`: `DATA`, 32 Bytes - hash of the code of the account. For a simple Account without code it will return `"0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470"`
* `nonce`: `QUANTITY`, - nonce of the account. See [`eth_getTransactionCount`](ethereum/#eth\_gettransactioncount)``
* `storageHash`: `DATA`, 32 Bytes - SHA3 of the StorageRoot. All storage will deliver a MerkleProof starting with this rootHash.
* `accountProof`: `ARRAY` - Array of rlp-serialized MerkleTree-Nodes, starting with the stateRoot-Node, following the path of the SHA3 (address) as key.
* `storageProof`: `ARRAY` - Array of storage-entries as requested. Each entry is a object with these properties:
  * `key`: `QUANTITY` - the requested storage key
  * `value`: `QUANTITY` - the storage value
  * `proof`: `ARRAY` - Array of rlp-serialized MerkleTree-Nodes, starting with the storageHash-Node, following the path of the SHA3 (key) as path.

#### **Example**

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://opt-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getProof","params":["0x7F0d15C7FAae65896648C8273B6d7E43f58Fa842",["0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421"],"latest"],"id":1}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://opt-mainnet.g.alchemyapi.io/v2/your-api-key
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
            "0xf90211a0d7dc80b53c5a1a28358e0d82f16ff4ae106e8adbcf3e4239172fba8ddd12c1d4a092cb4da4b44b102a8332663b8d7b20a582634718303ee838d83758653f081cc1a00ddb674b5111842fdd915f527d9ca0922008a0a885332a917f71ea02ac6354dfa09425abc221eb269f2d060f781172c2a9751757bdb315064971eccd82728e12aea0975634869e5299014af63a257d0536aee0ad4fd69c96ae99e1fd738aee07b07ba03c4ea143bed466fb3af6b4d57864404573cee9e0b2ef91e0298dc8bc8fd79d53a01120ffadd9a474eaa45903bff7a82e9f0d1330b9c7cac5bbccd91bfe2cfd99a7a0d676f25ed57c17a93af1071bb8db098be3ec20b1e5e9a22037376edfa81c107aa00882e30957ba0a0fe9c5ea08179eed885a8726b2aea9dfa9ba992f8406323385a027f7755c9a6d79e04b2be68508e341221628ce487f527e80fdfd21c7b7792703a03c3bffdf7c1dded8fe905091363eefd7d5ba5377fa44bdfdb57b46ddda7ac4dba0c9707a8a06562408d0023bd2f45fb0b21cf84b51e49befd4ea9e8fe1fb2849bda0e35969f07e05b406a76d41474286e1990564d7a0ddcf83d84aa3357c23e05b74a00ee0ab4e7c8096531969fb112da6e41ed7ce8f735e64dfad114a31128f54dfd2a094cef26c0eff8ebd2d76cdd0d6ed0558cb4c9fed5461e72cc333290040a1b9a4a08e208e33d570923c0dad413bf8cbc95dcad5fcb9022307981189f7cfdce94e9080",
            "0xf90211a0fec8d5accd59675bf753f843970111ee50495a793f1054079104b21aaa6f675aa091d04b7dfc585193f471b7de8f94c3542523f65ced37015e7d231abcda6f76cda055523a5d3b3706ee22f40ba98ad1aeb1ad3548cf737ccb797d1681b33b65c7cca03c2a96d6c5d8c2d63798719815d18c7e67f8faacfbf928aaa76267c2f2e1e865a01ac13ebdcee1238e5b0f26435c0c5874d81dd6cd3c83acd238aaca921ed109f0a0a4c6132bec935b1e50e80d86bd4eb3146694f8004deb2cec63970ad5b1393369a00bd9ba937ce9ed9c5a59d5dad4a8d980c8256a90574c67ac3a952527f33bf42aa0852032a71de30350102a51a89ea50f177a08fb848cb0998cd8312fad1e7836b4a09e61d43d30b3a4566e940af24533cddc9f2f8c09ba5d740d30e89f87eab4a3aaa0405f4ba35682cbf1d48a87e1336f3d9c5c48244323d9371b334664b19a75714ba03ab20f3157b6f6c7e5503e1aa21ea5d092b54b389f2506dc382ca5f417613cf8a0fc8280a16ff2e29b75b342c4b55575610b3a81191201f30fcc67dc8e4bbee418a00b7ef0ba8d144a4ec1dced99be3ec7a0232f62a9b24408f0b05cc9b495ea4d3aa0f17436a18ad4b72f6c0d5e7ee192734e5752ec10ee193c3a7368bc0c13d476f1a01619aeadec4a8d79f0dc71f74aafdb7a57d27bd48ee93efbb5bc11e809f4aa27a07cea9a2a3217b78150b0dc24462017c8ad575d0ce06933c5ff21b1606badc70e80",
            "0xf90211a0072ecc9487ea63b098c17eff08b793e2c4c531b15900e9711aa8af5fd086bf1ba078284f97f9cd08021dac8849ecd88bb664f7662679c586311c0971e5e3561889a0aa66520345d15cc6804957c7b23324cc032fc734034bae4d705cdc01967f1613a03b6d63ec4ec0b81ba2d6e9d6743a7f7f43bef8d22c75195ada5830ef2824c998a087c2dfab32a2460243337fd79ee333495d593c5bdf8f404b17d296f1294ad1dea02ea002fc9ba7e806594c98483fc76dc7e099660ddee1278f61c2b6b4f421add7a0fd91c5d3145fb79612e3c4dce3fa3788c1c60bcd90305a3b80e6e81f87fd8a43a0a6d5c595d4b3ecedc6f031ab4efa714ef24b654ed693953ef59a6de2dc53323fa0a3a39bd0d3920147a0517845cf2959d98f499a2f653cc479a3355fe3cdc904efa08ff187fe654c362091cc859cefb2c400f4167731a217d4e1b4fa9f1a31336ac4a04e9bb9b6cb36e587b683287f6a3b6773daf9a1809122059f768df02576da3ba4a0b6e0bcff39514900f189d126a6527d179eeaf6a271564ce8ae5b3a665fd9ceffa0b08b367a6388b2d864217d8efe986992dc68ad3a2fff44aa7f9f1774ba880117a0121ab98e844c8a6da5760506fed424bdfbd4d5290bdfd5f3b1c3f555abcec332a0a3750cb1ba839d50679e432dd4c61e034e091765c750f65a062536a3619f1867a02042084b278f0bb5ce1dc1d8cef7af2174c3f950c41b0d2197c11bf74c589e0880",
            "0xf85180808080808080808080808080a025d6f1dc4386bd418fed96dd4b888b8c824a2b11243bbaca2dda9d12ad039a37a0989102957c6d9aefb386ee6354af3a800be029ad6fa0cad30da75dd9ba04a59c8080"
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

## :brain: EVM/Smart Contract Execution

### eth\_call

Executes a new message call immediately without creating a transaction on the block chain.&#x20;

This is one of the most commonly used API calls. It is used to read from the blockchain which includes executing smart contracts, but does not publish anything to the blockchain. This call does not consume any Ether. &#x20;

{% hint style="warning" %}
Starting from [Geth 1.9.13](https://github.com/ethereum/go-ethereum/pull/20783), `eth_call`will check the balance of the sender (to make sure that the sender has enough gas to complete the request) before executing the call. This means that even though the call doesn't consume any gas, the `from` address must have enough gas to execute the call as if it were a transaction.&#x20;
{% endhint %}

#### Parameters

* `Object` - The transaction call object
  * `from`: `DATA`, 20 Bytes - (optional) The address the transaction is sent from.
  * `to`: `DATA`, 20 Bytes - The address the transaction is directed to.
  * `gas`: `QUANTITY` - (optional) Integer of the gas provided for the transaction execution. `eth_call` consumes zero gas, but this parameter may be needed by some executions.&#x20;
  * `gasPrice`: `QUANTITY` - (optional) Integer of the gasPrice used for each paid gas. **Note: most of our users (95%+) never set the `gasPrice` on eth\_call.**
  * `value`: `QUANTITY` - (optional) Integer of the value sent with this transaction
  * `data`: `DATA` - (optional) Hash of the method signature and encoded parameters. For details see Ethereum Contract ABI
* `QUANTITY|TAG` - integer block number, or the string "latest", "earliest" or "pending" (see the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter)), OR the `blockHash` (in accordance with [EIP-1898](https://eips.ethereum.org/EIPS/eip-1898)) **Note: the parameter is an object instead of a string and should be specified as: `{"blockHash": "0x<some-hash>"}.` **Learn more [here](https://eips.ethereum.org/EIPS/eip-1898).

{% hint style="danger" %}
**Note: **`eth_call` has a timeout restriction at the node level. Batching multiple `eth_call`  together on-chain using pre-deployed smart contracts might result in unexpected timeouts that cause none of your calls to complete. Instead, consider serializing these calls, or using smaller batches if they fail with a node error code.&#x20;
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

#### [Example](https://composer.alchemyapi.io/?composer\_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth\_call%22%2C%22paramValues%22%3A%5B%7B%22to%22%3A%220xd46e8dd67c5d32be8058bb8eb970870f07244567%22%2C%22from%22%3A%220xb60e8dd61c5d32be8058bb8eb970870f07233155%22%2C%22gas%22%3A%220x76c0%22%2C%22gasPrice%22%3A%220x9184e72a000%22%2C%22value%22%3A%220x9184e72a%22%2C%22data%22%3A%220xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675%22%7D%2C%22latest%22%5D%7D)

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://opt-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_call","params":[{"from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155","to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567","gas": "0x76c0","gasPrice": "0x9184e72a000","value": "0x9184e72a","data": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"}, "latest"],"id":1}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://opt-mainnet.g.alchemyapi.io/v2/your-api-key
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

## :bookmark\_tabs: Event Logs

### eth\_getLogs

Returns an array of all logs matching a given filter object. For more information about `eth_getLogs` check out our [Deep Dive into eth\_getLogs](../guides/eth\_getlogs.md) page.&#x20;

{% hint style="warning" %}
**NOTE**: You can make `eth_getLogs` requests with up to a _**2K block range**_ and _**a 150MB limit on the response size**_.

If you absolutely need to query larger block ranges, please contact us over [discord](https://alchemy.com/discord) or at support@alchemy.com. We can open access to larger block ranges based on your use case.

_If you need to pull logs frequently, we recommend _[_using WebSockets_](../guides/using-websockets.md)_ to push new logs to you when they are available. _
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
* `blockHash`: `DATA`, 32 Bytes - (optional) With the addition of EIP-234 (Geth >= v1.8.13 or Parity >= v2.1.0), blockHash is a new filter option which restricts the logs returned to the single block with the 32-byte hash blockHash. Using blockHash is equivalent to fromBlock = toBlock = the block number with hash `blockHash`.** If blockHash is present in the filter criteria, then neither `fromBlock` nor `toBlock` are allowed.**

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

#### [Example](https://composer.alchemyapi.io/?composer\_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth\_getLogs%22%2C%22paramValues%22%3A%5B%7B%22address%22%3A%220xb59f67a8bff5d8cd03f6ac17265c550ed8f33907%22%2C%22topics%22%3A%22%5B%5C%220xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef%5C%22%5D%22%2C%22blockHash%22%3A%220x8243343df08b9751f5ca0c5f8c9c0460d8a9b6351066fae0acbd4d3e776de8bb%22%7D%5D%7D)

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

## :chains: Chain Information

Calls to receive information about the current blockchain.&#x20;

### eth\_protocolVersion

Returns the current ethereum protocol version.

#### Parameters

none

#### Returns

`String` - The current ethereum protocol version.

#### [Example](https://composer.alchemyapi.io/?composer\_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth\_protocolVersion%22%2C%22paramValues%22%3A%5B%5D%7D)

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://opt-mainnet.g.alchemy.com/v2/your-api-key  \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_protocolVersion","params":[],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://opt-mainnet.g.alchemy.com/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_protocolVersion",
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
    "result": "64"
}
```

### eth\_gasPrice

Returns the current price per gas in wei.&#x20;

{% hint style="info" %}
If you are curious about the difference in gas price between this method and the [eth gas station](https://ethgasstation.info), check out this [GitHub issue](https://github.com/ethereum/go-ethereum/issues/15825).
{% endhint %}

#### Parameters

none

#### Returns

`QUANTITY` - integer of the current gas price in wei.&#x20;

#### [Example](https://composer.alchemyapi.io/?composer\_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth\_gasPrice%22%2C%22paramValues%22%3A%5B%5D%7D)

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://opt-mainnet.g.alchemy.com/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://opt-mainnet.g.alchemy.com/v2/your-api-key
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
    "result": "0xe4e1c0"
}
```

### eth\_estimateGas

Generates and returns an estimate of how much gas is necessary to allow the transaction to complete. The transaction will not be added to the blockchain.&#x20;

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

* `eth_estimateGas`** **will check the balance of the sender (to make sure that the sender has enough gas to complete the request). This means that even though the call doesn't consume any gas, the `from` address must have enough gas to execute the transaction.
* If no `gas` is specified geth uses the block gas limit from the pending block as an upper bound. As a result the returned estimate might not be enough to executed the call/transaction when the amount of actual gas needed is higher than the pending block gas limit.
{% endhint %}

#### Returns

`QUANTITY` - the amount of gas used.

#### [Example](https://composer.alchemyapi.io/?composer\_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth\_estimateGas%22%2C%22paramValues%22%3A%5B%7B%22from%22%3A%220xb60e8dd61c5d32be8058bb8eb970870f07233155%22%2C%22to%22%3A%220xd46e8dd67c5d32be8058bb8eb970870f07244567%22%2C%22gasPrice%22%3A%220x9184e72a000%22%2C%22value%22%3A%220x9184e72a%22%2C%22data%22%3A%220xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675%22%2C%22gas%22%3A%220x76c0%22%7D%5D%7D)

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://opt-mainnet.g.alchemy.com/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_estimateGas","params":[{see above}],"id":1}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://opt-mainnet.g.alchemy.com/v2/your-api-key
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

#### **Example**

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://opt-mainnet.g.alchemy.com/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":83}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://opt-mainnet.g.alchemy.com/v2/your-api-key
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
    "result": "0xa"
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

#### ****[**Example**](https://composer.alchemyapi.io/?composer\_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22net\_version%22%2C%22paramValues%22%3A%5B%5D%7D)****

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://opt-mainnet.g.alchemy.com/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://opt-mainnet.g.alchemy.com/v2/your-api-key
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
    "result": "10"
}
```

### net\_listening

Returns `true` if client is actively listening for network connections.

#### **Parameters**

none

#### **Returns**

`Boolean` - `true` when listening, otherwise `false`.

#### ****[**Example**](https://composer.alchemyapi.io/?composer\_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22net\_listening%22%2C%22paramValues%22%3A%5B%5D%7D)****

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://opt-mainnet.g.alchemy.com/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://opt-mainnet.g.alchemy.com/v2/your-api-key
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
    "jsonrpc": "2.0",
    "id": 67,
    "result": true
}
```

## :bearded\_person: Retrieving Uncles

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

See [`eth_getBlockByHash`](ethereum/#eth\_getblockbyhash)&#x20;

#### [Example](https://composer.alchemyapi.io/?composer\_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth\_getUncleByBlockNumberAndIndex%22%2C%22paramValues%22%3A%5B%220x29c%22%2C%220x0%22%5D%7D)

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://opt-mainnet.g.alchemy.com/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0x29c", "0x0"],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://opt-mainnet.g.alchemy.com/v2/your-api-key
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

Result&#x20;

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

*   `QUANTITY|TAG` - a block number, or the string "earliest", "latest" or "pending", as in the&#x20;

    [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter).
* `QUANTITY` - the uncle's index position.

```javascript
params: [
    '0xb3b20624f8f0f86eb50dd04688409e5cea4bd02d700bf6e79e9384d47d6a5a35',
    '0x0' // 0
]
```

#### Returns

See [`eth_getBlockByHash`](ethereum/#eth\_getblockbyhash)&#x20;

#### [Example](https://composer.alchemyapi.io/?composer\_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth\_getUncleByBlockHashAndIndex%22%2C%22paramValues%22%3A%5B%220xb3b20624f8f0f86eb50dd04688409e5cea4bd02d700bf6e79e9384d47d6a5a35%22%2C%220x0%22%5D%7D)

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://opt-mainnet.g.alchemy.com/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0xb3b20624f8f0f86eb50dd04688409e5cea4bd02d700bf6e79e9384d47d6a5a35", "0x0"],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://opt-mainnet.g.alchemy.com/v2/your-api-key
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

#### [Example](https://composer.alchemyapi.io/?composer\_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth\_getUncleCountByBlockHash%22%2C%22paramValues%22%3A%5B%220xb3b20624f8f0f86eb50dd04688409e5cea4bd02d700bf6e79e9384d47d6a5a35%22%5D%7D)

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://opt-mainnet.g.alchemy.com/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockHash","params":["0xb3b20624f8f0f86eb50dd04688409e5cea4bd02d700bf6e79e9384d47d6a5a35"],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://opt-mainnet.g.alchemy.com/v2/your-api-key
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

#### [Example](https://composer.alchemyapi.io/?composer\_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth\_getUncleCountByBlockNumber%22%2C%22paramValues%22%3A%5B%220xe8%22%5D%7D)

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://opt-mainnet.g.alchemy.com/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockNumber","params":["0xe8"],"id":1}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://opt-mainnet.g.alchemy.com/v2/your-api-key
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

## :flashlight: Filters

Calls related to creating, getting, and reading from filters.&#x20;

Eth filters expose the same information as the [`eth_subscribe`](ethereum/#eth\_subscribe) methods, except that updates are received by polling rather than receiving pushes. A user may create a filter than repeatedly call `eth_getFilterChanges`on it, each time receiving events that have occurred since the last time `eth_getFilterChanges`was called (or since the filter was created if this is the first time `eth_getFilterChanges`is being called.

{% hint style="warning" %}
**Note**: Filters expire after 5 minutes of inactivity, so several of the example requests below will return`"filter not found"` if you try and call them.&#x20;
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

#### ****[**Example**](https://composer.alchemyapi.io/?composer\_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth\_getFilterChanges%22%2C%22paramValues%22%3A%5B%220xfe704947a3cd3ca12541458a4321c869%22%5D%7D)****

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

Returns an array of all logs matching filter with given id. Can compute the same results with an `eth_getLogs` call (see hint below).&#x20;

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

See [`eth_getFilterChanges`](ethereum/#eth\_getfilterchanges)``

#### ****[**Example**](https://composer.alchemyapi.io/?composer\_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth\_getFilterLogs%22%2C%22paramValues%22%3A%5B%220xfe704947a3cd3ca12541458a4321c869%22%5D%7D)****

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

#### ****[**Example**](https://composer.alchemyapi.io/?composer\_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth\_newBlockFilter%22%2C%22paramValues%22%3A%5B%5D%7D)****

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

Creates a filter object, based on filter options, to notify when the state changes (logs). Unlike `eth_newBlockFilter`which notifies you of **all **new** **blocks, you can pass in filter options to track new logs matching the topics specified. ** **

To check if the state has changed, call [`eth_getFilterChanges.`](ethereum/#eth\_getfilterchanges)``

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

#### ****[**Example**](https://composer.alchemyapi.io/?composer\_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth\_newFilter%22%2C%22paramValues%22%3A%5B%7B%22fromBlock%22%3A%220x1%22%2C%22toBlock%22%3A%220x2%22%2C%22address%22%3A%220x8888f1f195afa192cfee860698584c030f4c9db1%22%2C%22topics%22%3A%22%5B%5C%220x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b%5C%22%2C%20null%2C%20%5B%5C%220x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b%5C%22%2C%20%5C%220x0000000000000000000000000aff3454fce5edbc8cca8697c15331677e6ebccc%5C%22%5D%5D%22%7D%5D%7D)****

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

#### ****[**Example**](https://composer.alchemyapi.io/?composer\_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth\_uninstallFilter%22%2C%22paramValues%22%3A%5B%220xfe704947a3cd3ca12541458a4321c869%22%5D%7D)****

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

## :desktop: Web3

### web3\_clientVersion

Returns the current client version.

#### **Parameters**

none

#### **Returns**

`String` - The current client version

#### ****[**Example**](https://composer.alchemyapi.io/?composer\_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22web3\_clientVersion%22%2C%22paramValues%22%3A%5B%5D%7D)****

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://opt-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://opt-mainnet.g.alchemyapi.io/v2/your-api-key
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
    "result": "Geth/v1.9.10-stable/linux-amd64/go1.15.13"
}
```

### web3\_sha3

Returns Keccak-256 (_not_ the standardized SHA3-256) of the given data.

#### **Parameters**

1. `DATA` - the data in hex form to convert into a SHA3 hash

{% hint style="warning" %}
**Note: **web3\_sha3 takes in a hexidecimal number, not a direct string. So, if you wanted to convert "hello world" to it's Keccak-256 hash you would need to input the hex number for "hello world", which is "68656c6c6f20776f726c64".&#x20;
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
curl https://opt-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"web3_sha3","params":["0x68656c6c6f20776f726c64"],"id":64}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://opt-mainnet.g.alchemyapi.io/v2/your-api-key
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
    "jsonrpc": "2.0",
    "id": 64,
    "result": "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad"
}
```

## :alarm\_clock: Real-Time Events

Geth v1.4 and later support subscribing using JSON-RPC notifications. This allows clients to wait for events instead of polling for them.

It works by subscribing to particular events where the node will return a subscription id. For each event that matches the subscription, a notification with relevant data is sent together with the subscription id.

Below are several methods used for retrieving real time events.&#x20;

### eth\_syncing

Returns an object with data about the sync status or `false`if the node is fully synced.&#x20;

{% hint style="success" %}
**Note**: Your response from `eth_syncing` will likely return false because Alchemy only supports nodes in production that are completely synced.&#x20;
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
curl https://opt-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://opt-mainnet.g.alchemyapi.io/v2/your-api-key
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

If successful this returns the subscription id. Subscriptions are created through websockets

#### Parameters <a href="parameters" id="parameters"></a>

1. subscription name
2. optional arguments ([see below](ethereum/#optional-arguments))

#### **Returns **

If successful this returns the subscription id.

#### Example <a href="example" id="example"></a>

{% hint style="info" %}
**NOTE**: `eth_subscribe` requests cannot be replicated in the [composer](https://composer.alchemyapi.io) tool
{% endhint %}

#### Optional Arguments:&#x20;

#### 1. newHeads <a href="newheads" id="newheads"></a>

Fires a notification each time a new header is appended to the chain, including chain reorganizations.&#x20;

In case of a chain reorganization the subscription will emit all new headers for the new chain. Therefore the subscription can emit multiple headers on the same height.

**Paramaters**

none

Wscat request:

{% tabs %}
{% tab title="wscat" %}
```bash
wscat -c wss://opt-mainnet.g.alchemy.com/v2/<"YOUR KEY">

> {"jsonrpc":"2.0","id": 1, "method": "eth_subscribe", "params": ["newHeads"]}
```
{% endtab %}
{% endtabs %}

Result

```java
< {
    "id":1,
    "result":"0xde95ea99676eb5dde5297f20127f9b8e",
    "jsonrpc":"2.0"
}
< {
    "jsonrpc":"2.0",
    "method":"eth_subscription",
    "params":{
        "result":{
        "difficulty":"0x2",
        "extraData":"0xd98301090a846765746889676f312e31352e3133856c696e7578000000000000c8cdd94b40dac783885ec85ad21aec710fedc3842099a13b8d41535f4d5dc31833ffc77619a6f7f5c9a36de11fac45d277d03013be75dfe4bbaeb9631e614adb00",
        "gasLimit":"0xa7d8c0",
        "gasUsed":"0xe00e9",
        "hash":"0xcb2bcae95dde795f36400fb84ec576dc25aa379486b0efa7bab41151b3ac346c",
        "logsBloom":"0x00000000000000000000000000000000000000100000000000040000000000000000000000000000000000100000000100000000000000000000000000000000000020000000000000020008000000000000000000000000000000400000000000000000000000000000000100000000000000000000000000000010000000000000000000201000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000","miner":"0x0000000000000000000000000000000000000000",
        "mixHash":"0x0000000000000000000000000000000000000000000000000000000000000000",
        "nonce":"0x0000000000000000",
        "number":"0xa2709",
        "parentHash":"0x1da3b2391c9e87b7d21a4cf3057fff7c41230f0b2bb54d030c03e338957b1b30",
        "receiptsRoot":"0x0a52e59ad1cb2e6139865aa3ba1f440601dc80d41de4a8c1c9ef58f874849f34",
        "sha3Uncles":"0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
        "size":"0x2d2",
        "stateRoot":"0x98aac867e0f5adaa2731ef1693e0b96c04663b266d6b7288b0658f2849e24d8b",
        "timestamp":"0x611ae145",
        "transactionsRoot":"0x15ab2582dd7c1ae471dc1b15e0d0d365c4ae4ffaab7b6c185c651e95d84df565"
        },
    "subscription":"0xde95ea99676eb5dde5297f20127f9b8e"
    }
}
```

#### 2. logs <a href="logs" id="logs"></a>

Returns logs that are included in new imported blocks and match the given filter criteria.

In case of a chain reorganization previous sent logs that are on the old chain will be resent with the `removed`property set to true. Logs from transactions that ended up in the new chain are emitted. Therefore a subscription can emit logs for the same transaction multiple times.

**Parameters**

1. `object` with the following (optional) fields
   * **address**, either an address or an array of addresses. Only logs that are created from these addresses are returned (optional)
   * **topics**, only logs that match the specified topics (optional)

**Example**

Request

{% tabs %}
{% tab title="Curl" %}
```bash
wscat -c wss://opt-mainnet.g.alchemy.com/v2/<"YOUR KEY">

{"jsonrpc":"2.0","id": 1, "method": "eth_subscribe", "params": ["logs", {"address": "0x8320fe7702b96808f7bbc0d4a888ed1468216cfd", "topics": ["0xd78a0cb8bb633d06981248b816e7bd33c2a35a6089241d099fa519e361cab902"]}]}
```
{% endtab %}
{% endtabs %}

Result

```java
>{
    "jsonrpc":"2.0",
    "id":1,
    "result":"0x4a8a4c0517381924f9838102c5a4dcb7"
}

>{
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

### eth\_unsubscribe

Subscriptions are canceled with a regular RPC call with `eth_unsubscribe` as method and the subscription id as first parameter. It returns a bool indicating if the subscription was canceled successfully.

#### Parameters <a href="parameters-1" id="parameters-1"></a>

1. subscription id

#### Example <a href="example-1" id="example-1"></a>

{% hint style="info" %}
**NOTE**: `eth_unsubscribe` requests cannot be replicated in the [composer](https://composer.alchemyapi.io) tool
{% endhint %}

Request

{% tabs %}
{% tab title="Curl" %}
```bash
wscat -c wss://opt-mainnet.g.alchemy.com/v2/<"YOUR KEY">

{"jsonrpc":"2.0","method":"eth_subscribe","params":["0x9cef478923ff08bf67fde6c64013158d"],"id":1}
```
{% endtab %}
{% endtabs %}

```javascript
{
    "jsonrpc":"2.0",
    "id":1,
    "result":true
}
```
