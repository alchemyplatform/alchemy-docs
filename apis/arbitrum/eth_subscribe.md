---
description: >-
  Arbitrum API - Subscribe to different event types like newHeads, logs,
  pendingTransactions, and syncing using websockets.
---

# eth\_subscribe - Arbitrum

{% hint style="warning" %}
**A note on limits over WebSocket connections**

* There is a limit of 20,000 **** WebSocket connections per API Key as well as 1,000 parallel WebSocket subscriptions per WebSocket connection, creating a maximum of 20 million subscriptions per application.
* The maximum size of a JSON-RPC `batch` request that can be sent over a WebSocket connection is 10
* Free tier users will be limited to 10 concurrent requests per WebSocket connection.
{% endhint %}

### Parameters

1. [Subscription type](../../guides/using-websockets.md#subscription-types)
2. Optional params

The first argument specifies the type of event for which to listen. The second argument contains additional options which depend on the first argument. The different description types, their options, and their event payloads are described below.

### Returns

The subscription ID. This ID will be attached to any received events, and can also be used to cancel the subsciption using `eth_unsubscribe`.

### Subscription Events

While the subscription is active, you will receive events which are objects with the following fields:

* `jsonrpc`: Always "2.0"
* `method`: Always "eth\_subscription"
* `params`: An object with the following fields:
  * `subscription`: The subscription ID returned by the `eth_subscription` call which created this subscription.
  * `result`: An object whose contents vary depending on the type of subscription.

## Subscription types

### newHeads

Emits an event any time a new header is added to the chain, including during a chain reorganization.

{% hint style="info" %}
**NOTE: Chain Reorganizations (ReOrgs)**

When a chain reorganization occurs, this subscription will emit an event containing all new headers for the new chain. This means that you may see multiple headers emitted with the same height, and when this happens the later header should be taken as the correct one after a reorganization.
{% endhint %}

### Parameters

* None

### Example

**Request**

{% tabs %}
{% tab title="wscat" %}
```bash
wscat -c wss://arb-mainnet.g.alchemy.com/v2/your-api-key

{"jsonrpc":"2.0","id": 1, "method": "eth_subscribe", "params": ["newHeads"]}
```
{% endtab %}
{% endtabs %}

**Result**

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

### logs

Emits logs which are part of newly added blocks that match specified filter criteria.

{% hint style="info" %}
**NOTE: Chain Reorganizations (ReOrgs)**

When a chain reorganization occurs, logs that are part of blocks on the old chain will be emitted **again** with the property `removed` set to `true`.&#x20;

Logs which are part of the blocks on the new chain are also emitted, it is possible to see logs for the same transaction multiple times in the case of a reorganization.
{% endhint %}

### Parameters

1. An object with the following fields:
   * `adddress` (optional): either a string representing an address or an array of such strings.
     * Only logs created from one of these addresses will be emitted.
   * `topics`: an array of topic specifiers.
     * Each topic specifier is either `null`, a string representing a topic, or an array of strings.
     * Each position in the array which is not `null` restricts the emitted logs to only those who have one of the given topics in that position.

Some examples of topic specifications:

* `[]`: Any topics allowed.
* `[A]`: A in first position (and anything after).
* `[null, B]`: Anything in first position and B in second position (and anything after).
* `[A, B]`: A in first position and B in second position (and anything after).
* `[[A, B], [A, B]]`: (A or B) in first position and (A or B) in second position (and anything after).

### Example

#### Request

{% tabs %}
{% tab title="wscat" %}
```bash
wscat -c wss://arb-mainnet.g.alchemy.com/v2/your-api-key

{"jsonrpc":"2.0","id": 1, "method": "eth_subscribe", "params": ["logs", {"address": "0x8320fe7702b96808f7bbc0d4a888ed1468216cfd", "topics": ["0xd78a0cb8bb633d06981248b816e7bd33c2a35a6089241d099fa519e361cab902"]}]}
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

### syncing

Indicates when the node starts or stops synchronizing. The result can either be a boolean indicating that the synchronization has started (true), finished (false) or an object with various progress indicators.

### **Parameters**

* None

### **Example**

**Request**

{% tabs %}
{% tab title="wscat" %}
```bash
wscat -c wss://arb-mainnet.g.alchemy.com/v2/your-api-key

{"jsonrpc":"2.0","id": 1, "method": "eth_subscribe", "params": ["syncing"]}
```
{% endtab %}
{% endtabs %}

**Result**

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
```
