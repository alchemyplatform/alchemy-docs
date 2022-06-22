---
description: >-
  Learn how to subscribe to pending transactions, log events, new blocks and
  more using WebSockets on Ethereum, Polygon, Arbitrum, and Optimism.
---

# Subscription API (WebSockets)

## WebSockets vs. HTTP

WebSockets is a bidirectional communication protocol that maintains a network connection between a server and a client. Unlike HTTP, with WebSockets clients don't need to continuously make requests when they want information.&#x20;

Instead, an open WebSocket connection can push network updates to clients by allowing them to subscribe to certain network states, such as new transactions or blocks being added to the blockchain.

As with any network connection, you should not assume that a WebSocket will remain open forever without interruption.

{% hint style="info" %}
[Alchemy Web3 ](../../documentation/alchemy-web3/)automatically adds handling for WebSocket failures with no configuration necessary.
{% endhint %}

## Try It Out

The easiest way to test our APIs with WebSockets is to install a command line tool for making WebSocket requests such as [wscat](https://github.com/websockets/wscat). Using wscat, you can send requests as follows:

```bash
$ wscat -c wss://eth-mainnet.ws.alchemyapi.io/ws/demo

> {"jsonrpc": "2.0", "id": 0, "method": "eth_gasPrice"}
< {"jsonrpc": "2.0", "result": "0xb2d05e00", "id": 0}
```

{% hint style="warning" %}
Though it's currently possible to send all your JSON-RPC requests over Websockets, we discourage our developers from doing so. Instead, you should primarily send `eth_subscribe` __ and __ `eth_unsubscribe` __ requests to WebSockets.&#x20;

This is for several reasons:&#x20;

* You won't receive HTTP status codes in WebSockets responses, which can be useful and actionable.
* Because individual HTTP requests are load-balanced in our infrastructure to the fastest possible server, you'll add additional latency by sending JSON-RPC requests over WebSockets.
* WebSockets client-side handling has many tricky edge cases and silent failure modes, which can make your dApp less stable.
{% endhint %}

## How to Use WebSockets

To begin, open a WebSocket using the WebSocket URL for your app. You can find your app's WebSocket URL by opening the app's page in [your dashboard](https://dashboard.alchemyapi.io) and clicking "View Key". Note that your app's URL for WebSockets is different from its URL for HTTP requests, but both can be found by clicking "View Key".

![](<../../.gitbook/assets/websocket key copy.gif>)

Any of the APIs listed in the [Alchemy API Reference](../../apis/ethereum/) or Enhanced APIs can also be used via WebSocket. To do so, use the same payload that would be sent as the body of a POST request, but instead send that payload through the WebSocket.

{% hint style="warning" %}
**NOTE:** We do not recommend using Geth's WebSocket library for subscriptions as there are known issues in the websocket keep-alive and reconnection logic.
{% endhint %}

### Use [AlchemyWeb3.js](../../documentation/alchemy-web3/)

Transitioning to WebSockets while using a client library like Web3 is simple. Simply pass the WebSocket URL instead of the HTTP one when instantiating your Web3 client. For example:

```javascript
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

const web3 = createAlchemyWeb3("wss://eth-mainnet.ws.alchemyapi.io/ws/demo");
web3.eth.getBlockNumber().then(console.log);  // -> 7946893
```

### Example Projects

Check out the guide below for an example use case:

{% content-ref url="how-to-listen-to-nft-mints.md" %}
[how-to-listen-to-nft-mints.md](how-to-listen-to-nft-mints.md)
{% endcontent-ref %}



## eth\_subscribe

Creates a new subscription for desired events. Sends data as soon as it occurs.

{% hint style="warning" %}
#### A note on limits over WebSocket connections

* There is a limit of 20,000 **** WebSocket connections per API Key as well as 1,000 parallel WebSocket subscriptions per WebSocket connection, creating a maximum of 20 million subscriptions per application.
* The maximum size of a JSON-RPC `batch` request that can be sent over a WebSocket connection is 20
* Free tier users will be limited to 10 concurrent requests per WebSocket connection.
{% endhint %}

### Parameters

* ****[**Subscription type**](./#subscription-types) **** - specifies the type of event to listen to (ex: [new pending transactions](./#3.-newpendingtransactions), [logs](./#5.-logs), etc.)
* **Optional params** - optional parameters to include to describe the type of event to listen to (ex: `address`)&#x20;

### Returns

* **Subscription ID**: This ID will be attached to all received events and can also be used to cancel the subsciption using [`eth_unsubscribe`](./#eth\_unsubscribe).

### Subscription Events

While the subscription is active, you will receive events formatted as an object described below:

* Event Object:
  * `jsonrpc`: Always "2.0"
  * `method`: Always "eth\_subscription"
  * `params`: An object with the following fields:
    * `subscription`: The subscription ID returned by the `eth_subscribe` call which created this subscription.
    * `result`: An object whose contents vary depending on the [type of subscription](./#subscription-types).

## Subscription types

The following subscription types are accepted in all `eth_subscribe` websocket requests through your Alchemy endpoint.&#x20;

| Subscription Type                                                                    | Description                                                                                                                     |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| [newFullPendingTransactions](./#alchemy\_newfullpendingtransactions)                 | Emits full transactions that are sent to the network and marked as "pending".                                                   |
| [filteredNewFullPendingTransactions](./#alchemy\_filterednewfullpendingtransactions) | Emits full transactions that are sent to the network, marked as "pending", and are sent from **** or to **** a certain address. |
| [newPendingTransactions](./#newpendingtransactions)                                  | Emits transaction hashes that are sent to the network and marked as "pending".                                                  |
| [newHeads](./#newheads)                                                              | Emits new blocks that are added to the blockchain.                                                                              |
| [logs](./#logs)                                                                      | Emits logs attached to a new block that match certain topic filters.                                                            |

### alchemy\_newFullPendingTransactions

Returns the transaction information for all transactions that are added to the pending state. This subscription type subscribes to pending transactions, similar to the standard Web3 call `web3.eth.subscribe("pendingTransactions")`, but differs in that it emits **full** transaction information rather than just transaction hashes.

{% hint style="warning" %}
The `alchemy_newFullPendingTransactions` subscription type is costly to maintain and thus requires a large number of compute units since it emits full transaction information instead of just transaction hashes. We do not recommend keeping this subscription open for long periods of time for non-enterprise tier users.

**NOTE:**&#x20;

* The naming of this subscription is different from the naming of the web3 subscription API, [`alchemy_fullPendingTransactions`](../../documentation/alchemy-web3/enhanced-web3-api.md#web-3-eth-subscribe-alchemy\_fullpendingtransactions). This is to maintain naming standard with  Web3.js.
* This method is only supported on Ethereum and Polygon networks (Mainnet and Mumbai).
{% endhint %}

#### **Parameters**

* None

#### Returns

* Transaction object for pending transaction, same response payload as [eth\_getTransactionByHash](../../apis/ethereum/eth\_gettransactionbyhash.md#returns)&#x20;

#### Request

{% tabs %}
{% tab title="wscat" %}
```javascript
// initiate websocket stream first
wscat -c wss://eth-mainnet.alchemyapi.io/v2/demo

// then call subscription 
{"jsonrpc":"2.0","id": 2, "method": "eth_subscribe", "params": ["alchemy_newFullPendingTransactions"]}
```
{% endtab %}

{% tab title="alchemyweb3.js" %}
```javascript
// Installation: https://github.com/alchemyplatform/alchemy-web3
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

// Initialize alchemy-web3 object.
const web3 = createAlchemyWeb3(`wss://eth-mainnet.alchemyapi.io/v2/demo`);

// Subcribes to the event and prints results 
web3.eth.subscribe("alchemy_newFullPendingTransactions").on("data", (data) => console.log(data));
```
{% endtab %}
{% endtabs %}

#### Result

```javascript
{"id":1,"result":"0x9a52eeddc2b289f985c0e23a7d8427c8","jsonrpc":"2.0"}

{
    "jsonrpc":"2.0",
    "method":"eth_subscription",
    "params":{
        "result":{
            "blockHash":null,
            "blockNumber":null,
            "from":"0xa36452fc31f6f482ad823cd1cf5515177d57667f",
            "gas":"0x1adb0",
            "gasPrice":"0x7735c4d40",
            "hash":"0x50bff0736c713458c92dd1848d12f3354149be1363123dae35e94e0f2a9d56bf",
            "input":"0xa9059cbb0000000000000000000000000d0707963952f2fba59dd06f2b425ace40b492fe0000000000000000000000000000000000000000000015b1111266cfca100000",
            "nonce":"0x0",
            "to":"0xea38eaa3c86c8f9b751533ba2e562deb9acded40",
            "transactionIndex":null,
            "value":"0x0",
            "v":"0x26",
            "r":"0x195c2c1ed126088e12d290aa93541677d3e3b1d10f137e11f86b1b9227f01e3b",
            "s":"0x60fc4edbf1527832a2a36dbc1e63ed6193a6eee654472fbebbf88ef1750b5344"},
            "subscription":"0x9a52eeddc2b289f985c0e23a7d8427c8"
        }
}
```

### alchemy\_filteredNewFullPendingTransactions

Returns the transaction information for all transactions that are added to the pending state that match a given filter. Currently supports a `fromAddress` filter, which will return all transactions **from** an address, a `toAddress` filter, which will return all transactions **to** an address, and a `hashesOnly` filter, which when set to `true` specifies that the payload only contain the transaction hashes.

{% hint style="warning" %}
**NOTE:** This method is only supported on Ethereum and Polygon networks (Mainnet and Mumbai).
{% endhint %}

#### **Parameters**&#x20;

* `fromAddress` (optional): `string` or \[`array of strings`]
  * Singular address or array of addresses to receive pending transactions sent **from** this address.
* `toAddress` (optional): `string` or \[`array of strings`]
  * Singular address or array of addresses to receive pending transactions **to** this address
* `hashesOnly` (optional): `boolean`&#x20;
  * Default value is `false`, where the response matches the payload of [eth\_getTransactionByHash](https://www.notion.so/alchemy/apis/ethereum/eth-gettransactionbyhash#returns) . If set to `true`, the payload returned contains _only the hashes of the transactions_ that are added to the pending state, which matches the payload of [newPendingTransactions](https://docs.alchemy.com/alchemy/enhanced-apis/subscription-api-websockets#newpendingtransactions))

{% hint style="info" %}
**NOTE:** Excluding all parameters returns the transaction information for all transactions that are added to the pending state.
{% endhint %}

#### Returns

* The transaction object for pending transactions has the same payload as [eth\_getTransactionByHash](https://www.notion.so/alchemy/apis/ethereum/eth-gettransactionbyhash#returns) unless `hashesOnly` is set to `true`, in which case the payload contains only the hash of the transaction (same payload as [newPendingTransactions](https://docs.alchemy.com/alchemy/enhanced-apis/subscription-api-websockets#newpendingtransactions)).

#### Request

{% tabs %}
{% tab title="wscat" %}
```javascript
// initiate websocket stream first
wscat -c wss://eth-mainnet.alchemyapi.io/v2/demo

// then call subscription 
{"jsonrpc":"2.0","id": 1, "method": "eth_subscribe", "params": ["alchemy_filteredNewFullPendingTransactions", {"toAddress": ["0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", "0xdAC17F958D2ee523a2206206994597C13D831ec7" ], "hashesOnly": false}]}
```
{% endtab %}

{% tab title="alchemyweb3.js" %}
```javascript
// Installation: https://github.com/alchemyplatform/alchemy-web3
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

// Initialize alchemy-web3 object.
const web3 = createAlchemyWeb3(`wss://eth-mainnet.alchemyapi.io/v2/demo`);

// Subcribes to the event and prints results 
web3.eth.subscribe("alchemy_filteredNewFullPendingTransactions", {"toAddress": ["0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", "0xdAC17F958D2ee523a2206206994597C13D831ec7"], "hashesOnly": false}).on("data", (data) => console.log(data));
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

To learn more about how log topics work, check out [this page](how-to-listen-to-nft-mints.md#what-are-log-topics).&#x20;
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

## eth\_unsubscribe

Cancels an existing subscription so that no further events are sent.

### Parameters

* **Subscription ID** - ID for the subscription to cancel, previously returned from an [`eth_subscribe`](./#eth\_subscribe) call.

### Returns

`true` if a subscription was successfully cancelled, or `false` if no subscription existed with the given ID.

**Request**

{% tabs %}
{% tab title="wscat" %}
```javascript
// initiate websocket stream first
wscat -c wss://eth-mainnet.alchemyapi.io/v2/demo

// then call unsubscribe 
{"jsonrpc":"2.0", "id": 1, "method": "eth_unsubscribe", "params": ["0x9cef478923ff08bf67fde6c64013158d"]}
```
{% endtab %}

{% tab title="alchemyweb3.js" %}
```javascript
// Installation: https://github.com/alchemyplatform/alchemy-web3
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

// Initialize alchemy-web3 object.
const web3 = createAlchemyWeb3(`wss://eth-mainnet.alchemyapi.io/v2/demo`);

// Example subscription
sub = web3.eth.subscribe("newHeads");

// Unsubscribe
sub.unsubscribe((error, success) => {
    if (success) {
         console.log("F yea, I freed my resources");
    }
);
// unsubscribes the subscription
subscription.unsubscribe(
```
{% endtab %}
{% endtabs %}

**Result**

```javascript
{
    "jsonrpc":"2.0",
    "id":1,
    "result":true
}
```

## Error Codes

| Error Code | Error Message                                                                                                                | Solution                                                                                                                                                         |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `32600`    | `"The maximum batch size that can be sent over a websocket connection is 10. Please decrease the batch size and try again."` | Occurs when user attempts to send high-volume JSON-RPC traffic over Websockets. We recommend this traffic be sent over HTTP instead to optimize server backends. |

