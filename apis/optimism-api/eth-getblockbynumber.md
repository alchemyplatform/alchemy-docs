---
description: Returns information about a block by block number.
---

# eth\_getBlockByNumber - Optimism

{% hint style="info" %}
Currently, Optimistic Ethereum blocks only include a single transaction. If you query `eth_getBlockByNumber` or `eth_getBlockByHash`, you should expect to only see one transaction.
{% endhint %}

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

See [`eth_getBlockByHash`](eth-getblockbyhash.md)

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

{% embed url="https://docs.alchemy.com/alchemy/apis/optimism-api" %}
