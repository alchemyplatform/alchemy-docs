---
description: Polygon API - Returns information about a block by hash.
---

# eth\_getBlockByHash

## Parameters

* `DATA`, 32 Bytes - Hash of a block.
* `Boolean` - If true it returns the full transaction objects, if false it returns only the hashes of the transactions.

```javascript
params: [
    '0xc0f4906fea23cf6f3cce98cb44e8e1449e455b28d684dfa9ff65426495584de6',
    true
]
```

## Returns

`Object` - A block object with the following fields, or null when no block was found:

`number`: QUANTITY - the block number. null when its pending block.

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

## Example

### [Alchemy Composer](eth\_getblockbyhash.md#parameters)

The Alchemy Composer allows you to make a no-code example request via your browser. Try it out above!

### Request

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

### Result

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
