---
description: >-
  Ethereum API - Subscribe to different event types like newHeads, logs, and
  pendingTransactions using websockets.
---

# eth\_subscribe - Ethereum

{% hint style="warning" %}
**A note on limits over WebSocket connections**

* There is a limit of 20,000 **** WebSocket connections per API Key as well as 1,000 parallel WebSocket subscriptions per WebSocket connection, creating a maximum of 20 million subscriptions per application.
* The maximum size of a JSON-RPC `batch` request that can be sent over a WebSocket connection is 20
* Free tier users will be limited to 10 concurrent requests per WebSocket connection.
{% endhint %}

### Parameters

1. [Subscription type](../../enhanced-apis/subscription-api-websockets/)
2. Optional params

The first argument specifies the type of event for which to listen. The second argument contains additional options which depend on the first argument. The different description types, their options, and their event payloads are described below.

### Returns

The subscription ID. This ID will be attached to any received events, and can also be used to cancel the subsciption using [`eth_unsubscribe`](../../enhanced-apis/subscription-api-websockets/#eth\_unsubscribe).

### Subscription Events

While the subscription is active, you will receive events which are objects with the following fields:

* `jsonrpc`: Always "2.0"
* `method`: Always "eth\_subscription"
* `params`: An object with the following fields:
  * `subscription`: The subscription ID returned by the `eth_subscription` call which created this subscription.
  * `result`: An object whose contents vary depending on the type of subscription.

## Subscription types

The following subscription types are accepted in all `eth_subscribe` websocket requests through your Alchemy endpoint.&#x20;

| Subscription Type                                                               | Description                                                                                                                     |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| [alchemy\_pendingTransactions](eth-subscribe-1.md#alchemy\_pendingtransactions) | Emits full transactions that are sent to the network, marked as "pending", and are sent from **** or to **** a certain address. |
| [newPendingTransactions](eth-subscribe-1.md#newpendingtransactions)             | Emits transaction hashes that are sent to the network and marked as "pending".                                                  |
| [newHeads](eth-subscribe-1.md#newheads)                                         | Emits new blocks that are added to the blockchain.                                                                              |
| [logs](eth-subscribe-1.md#logs)                                                 | Emits logs attached to a new block that match certain topic filters.                                                            |

### alchemy\_pendingTransactions

Returns the transaction information for all pending transactions that match a given filter.

{% hint style="warning" %}
**NOTE:** This method is only supported on **Ethereum** and **Polygon** networks (Mainnet and Mumbai).
{% endhint %}

#### **Parameters**&#x20;

* `fromAddress` (optional): `string` or \[`array of strings`]
  * Singular address or array of addresses to receive pending transactions sent **from** this address.
* `toAddress` (optional): `string` or \[`array of strings`]
  * Singular address or array of addresses to receive pending transactions **to** this address
* `hashesOnly` (optional): `boolean`&#x20;
  * Default value is `false`, where the response matches the payload of [eth\_getTransactionByHash](eth\_gettransactionbyhash.md#returns) . If set to `true`, the payload returned contains _only the hashes of the transactions_ that are added to the pending state, which matches the payload of [newPendingTransactions](https://docs.alchemy.com/alchemy/enhanced-apis/subscription-api-websockets#newpendingtransactions))

{% hint style="info" %}
**NOTE:** Excluding all parameters returns the transaction information for **all transactions** that are added to the pending state.
{% endhint %}

#### Returns

With `hashesOnly` = `true`&#x20;

* `result`: ** **_**\[string]** -_ transaction __ hash for pending transaction
* `subscription`: _**\[string]** -_ subscription ID __&#x20;

With `hashesOnly` = `false`

* `result` - _**\[object]**_ A transaction object:
  * `blockHash`: `DATA`, 32 Bytes -  `null` when it's pending.
  * `blockNumber`: `QUANTITY` - `null` when it's pending.
  * `from`: `DATA`, 20 Bytes - address of the sender.
  * `gas`: `QUANTITY` - gas provided by the sender.
  * `gasPrice`: `QUANTITY` - gas price provided by the sender in Wei.
  * `hash`: `DATA`, 32 Bytes - hash of the transaction.
  * `input`: `DATA` - the data send along with the transaction.
  * `nonce`: `QUANTITY` - the number of transactions made by the sender prior to this one.
  * `to`: `DATA`, 20 Bytes - address of the receiver. `null` when it's a contract creation transaction.
  * `transactionIndex`: `QUANTITY` -  `null` when its pending.
  * `value`: `QUANTITY` - value transferred in Wei.
  * `v`: `QUANTITY` - ECDSA recovery id
  * `r`: `DATA`, 32 Bytes - ECDSA signature r
  * `s`: `DATA`, 32 Bytes - ECDSA signature s
* `subscription` - _**\[string]**_ subscription ID

#### Request

{% tabs %}
{% tab title="wscat" %}
```javascript
// initiate websocket stream first
wscat -c wss://eth-mainnet.alchemyapi.io/v2/demo

// then call subscription 
{"jsonrpc":"2.0","id": 2, "method": "eth_subscribe", "params": ["alchemy_pendingTransactions", {"toAddress": ["0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", "0xdAC17F958D2ee523a2206206994597C13D831ec7"], "hashesOnly": false}]}
```
{% endtab %}

{% tab title="alchemyweb3.js" %}
```javascript
// Installation: https://github.com/alchemyplatform/alchemy-web3
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

// Initialize alchemy-web3 object.
const web3 = createAlchemyWeb3(`wss://eth-mainnet.alchemyapi.io/v2/demo`);

// Subcribes to the event and prints results 
web3.eth.subscribe("alchemy_pendingTransactions", {"toAddress": ["0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", "0xdAC17F958D2ee523a2206206994597C13D831ec7"], "hashesOnly": false}).on("data", (data) => console.log(data));
```
{% endtab %}
{% endtabs %}

#### Result

```javascript
{"id":1,"result":"0xf13f7073ddef66a8c1b0c9c9f0e543c3","jsonrpc":"2.0"}

{
  "jsonrpc": "2.0",
  "method": "eth_subscription",
  "params": {
    "result": {
      "blockHash": null,
      "blockNumber": null,
      "from": "0x098bdcdc84ab11a57b7c156557dca8cef853523d",
      "gas": "0x1284a",
      "gasPrice": "0x6fc23ac00",
      "hash": "0x10466101bd8979f3dcba18eb72155be87bdcd4962527d97c84ad93fc4ad5d461",
      "input": "0xa9059cbb00000000000000000000000054406f1ec84f89532f83768f3f159b73b237257f0000000000000000000000000000000000000000000000000000000001c9c380",
      "nonce": "0x11",
      "to": "0xdac17f958d2ee523a2206206994597c13d831ec7",
      "transactionIndex": null,
      "value": "0x0",
      "type": "0x0",
      "v": "0x26",
      "r": "0x93ddd646056f365352f7e53dfe5dc81bde53f5b7c7bbe5deea555a62540d6995",
      "s": "0x79ed82a681930feb11eb68feccd1df2e53e1b96cf9171ae4ffcf53e9b2a40e8e"
    },
    "subscription": "0xf13f7073ddef66a8c1b0c9c9f0e543c3"
  }
}
```

### newPendingTransactions

Returns the hash for all transactions that are added to the pending state (regardless if you sent them or not).

{% hint style="warning" %}
NOTE: This method is only supported on Ethereum and Polygon networks (Mainnet and Mumbai).
{% endhint %}

#### **Parameters**

* None

**Returns**

* `result`: ** **_**\[string]** -_ transaction __ hash for pending transaction
* `subscription`: _**\[string]** -_ subscription ID __&#x20;

**Request**

{% tabs %}
{% tab title="wscat" %}
```java
// initiate websocket stream first
wscat -c wss://eth-mainnet.alchemyapi.io/v2/demo

// then call subscription 
{"jsonrpc":"2.0","id": 2, "method": "eth_subscribe", "params": ["newPendingTransactions"]}
```
{% endtab %}

{% tab title="alchemyweb3.js" %}
```javascript
// Installation: https://github.com/alchemyplatform/alchemy-web3
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

// Initialize alchemy-web3 object.
const web3 = createAlchemyWeb3(`wss://eth-mainnet.alchemyapi.io/v2/demo`);

// Subcribes to the event and prints results 
web3.eth.subscribe("newPendingTransactions").on("data", (data) => console.log(data));
```
{% endtab %}
{% endtabs %}

**Result**

```javascript
{"id":1,"result":"0xc3b33aa549fb9a60e95d21862596617c","jsonrpc":"2.0"}

{
    "jsonrpc":"2.0",
    "method":"eth_subscription",
    "params":{
        "subscription":"0xc3b33aa549fb9a60e95d21862596617c",
        "result":"0xd6fdc5cc41a9959e922f30cb772a9aef46f4daea279307bc5f7024edc4ccd7fa"
    }
}
```

### newHeads

Emits an event any time a new header (block) is added to the chain, including during a chain reorganization.

{% hint style="info" %}
**NOTE: Chain Reorganizations (ReOrgs)**

When a chain reorganization occurs, this subscription will emit an event containing all new headers (blocks) for the new chain. This means that you may see multiple headers emitted with the same height, and when this happens the later header should be taken as the correct one after a reorganization.
{% endhint %}

#### Parameters

* None

**Request**

{% tabs %}
{% tab title="wscat" %}
```javascript
// initiate websocket stream first
wscat -c wss://eth-mainnet.alchemyapi.io/v2/demo

// then call subscription 
{"jsonrpc":"2.0","id": 1, "method": "eth_subscribe", "params": ["newHeads"]}
```
{% endtab %}

{% tab title="alchemyweb3.js" %}
```javascript
// Installation: https://github.com/alchemyplatform/alchemy-web3
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

// Initialize alchemy-web3 object.
const web3 = createAlchemyWeb3(`wss://eth-mainnet.alchemyapi.io/v2/demo`);

// Subcribes to the event and prints results 
web3.eth.subscribe("newHeads").on("data", (data) => console.log(data));
```
{% endtab %}
{% endtabs %}

**Result**

```java
{"jsonrpc":"2.0", "id":1, "result":"0x9ce59a13059e417087c02d3236a0b1cc"}

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

### logs

Emits logs which are part of newly added blocks that match specified filter criteria.

{% hint style="info" %}
**NOTE: Chain Reorganizations (ReOrgs)**

When a chain reorganization occurs, logs that are part of blocks on the old chain will be emitted **again** with the property `removed` set to `true`.&#x20;

Logs which are part of the blocks on the new chain are also emitted, it is possible to see logs for the same transaction multiple times in the case of a reorganization.
{% endhint %}

#### Parameters

An object with the following fields:

* `adddress` (optional): \[`string`] or \[`array of strings`] Singular address or array of addresses.
  * Only logs created from one of these addresses will be emitted.
* `topics`: an array of topic specifiers.
  * Each topic specifier is either `null`, a single string, or an array of strings.
  * For every non `null` topic, a log will be emitted when activity associated with that topic occurs.

{% hint style="info" %}
**Topic Specifications:**&#x20;

* `[]`: Any topics allowed.
* `[A]`: A in first position (and anything after).
* `[null, B]`: Anything in first position and B in second position (and anything after).
* `[A, B]`: A in first position and B in second position (and anything after).
* `[[A, B], [A, B]]`: (A or B) in first position and (A or B) in second position (and anything after).

To learn more about how log topics work, check out [this page](../../enhanced-apis/subscription-api-websockets/how-to-listen-to-nft-mints.md#what-are-log-topics).&#x20;
{% endhint %}

#### Request

{% tabs %}
{% tab title="wscat" %}
```javascript
// initiate websocket stream first
wscat -c wss://eth-mainnet.alchemyapi.io/v2/demo

// then call subscription 
{"jsonrpc":"2.0","id": 1, "method": "eth_subscribe", "params": ["logs", {"address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", "topics": ["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"]}]}
```
{% endtab %}

{% tab title="alchemyweb3.js" %}
```javascript
// Installation: https://github.com/alchemyplatform/alchemy-web3
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

// Initialize alchemy-web3 object.
const web3 = createAlchemyWeb3(`wss://eth-mainnet.alchemyapi.io/v2/demo`);

// Subcribes to the event and prints results 
web3.eth.subscribe("logs", {"address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", "topics": ["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"]}).on("data", (data) => console.log(data));
```
{% endtab %}
{% endtabs %}

#### Result

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

{% embed url="https://docs.alchemy.com/alchemy/apis/ethereum" %}
