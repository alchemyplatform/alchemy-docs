---
description: >-
  Polygon API - Returns information about an uncle of a block by hash and uncle
  index position.
---

# eth\_getUncleByBlockHashAndIndex

## Parameters

*   `QUANTITY|TAG` - a block number, or the string "earliest", "latest" or "pending", as in the

    [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter).
* `QUANTITY` - the uncle's index position.

```javascript
params: [
    '0x17fd2777f5f4f15912a6ea49bcb213c6991ba7ef57cdd64a572f719aa2a46c23',
    '0x0' // 0
]
```

## Returns

See [`eth_getBlockByHash`](../ethereum/#eth\_getblockbyhash)

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

## Example

### [Alchemy Composer](eth\_getunclebyblockhashandindex.md#parameters)

The Alchemy Composer allows you to make a no-code example request via your browser. Try it out above!

### Request

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

### Result

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

###
