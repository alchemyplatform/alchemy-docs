---
description: >-
  Returns an array of all logs matching a given filter object. For more
  information about eth_getLogs check out our Deep Dive into eth_getLogs page.
---

# eth\_getLogs

{% hint style="warning" %}
**NOTE**: You can make `eth_getLogs` requests with up to a _**2K block range**_ and _**150MB**_ _**limit on the response size**_. You can also request _**any block range**_ with a cap of _**10K logs in the response**_.

_If you need to pull logs frequently, we recommend_ [_using WebSockets_](https://app.gitbook.com/@alchemyapi/s/alchemy/\~/drafts/-MlDGr35scLrjjxOUl86/guides/using-websockets) _to push new logs to you when they are available_
{% endhint %}

### Parameters

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
  * Check out more details on how to format topics in [eth\_newFilter](./#eth\_newfilter).
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

### Returns

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

### **Example**

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
