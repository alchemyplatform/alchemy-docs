# eth\_getTransactionReceipt - Optimism

This can also be used to track the status of a transaction, since the result will be null until the transaction is mined. However, unlike [`eth_getTransactionByHash`](eth-gettransactionbyhash.md) , which returns `null` for unknown transactions, and a non-null response with 3 null fields for a pending transaction, `eth_getTransactionReceipt` returns null for both pending and unknown transactions.

This call is also commonly used to get the contract address for a contract creation tx.

{% hint style="warning" %}
**Note:** The receipt is not available for pending transactions.
{% endhint %}

#### Parameters

`DATA`, 32 Bytes - hash of a transaction

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

{% embed url="https://docs.alchemy.com/alchemy/apis/optimism-api" %}
