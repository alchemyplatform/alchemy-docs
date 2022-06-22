---
description: >-
  How to use websockets when building on Ethereum, Polygon, Optimism, and
  Arbitrum.
---

# 🌐 Best Practices for Using WebSockets in Web3

## What are WebSockets and how do they differ from HTTP requests?&#x20;

WebSockets is a bidirectional communication protocol that maintains a network connection between two parties, typically a server and a client. Unlike HTTP, with WebSockets clients don't need to continuously make requests when they want information.

Instead, in an open WebSocket connection a server can push network updates to clients by allowing them to subscribe to certain network states, such as new transactions or blocks being added to the blockchain.

This dramatically improves the efficiency of certain HTTP “push” network requests - instead of making an HTTP request every second to pull the latest data, the client can simply open a WebSocket connection and wait for the updates to arrive.&#x20;

## How can I set up a WebSocket connection?&#x20;

It’s quite simple to set up a new WebSocket connection to Ethereum - try the command below in your terminal.

```
wscat -c wss://eth-mainnet.ws.alchemyapi.io/ws/demo
```

If you’d like an endpoint with higher rate limits, sign up for a free Alchemy account , grab a new API key to replace the command above, and get access to over 300 million compute units for free per month.

In addition to Ethereum, Alchemy currently supports WebSocket connections to these EVM-compatible blockchains:&#x20;

* [Polygon](https://docs.alchemy.com/alchemy/apis/polygon/eth-subscribe)&#x20;
* [Optimism](https://docs.alchemy.com/alchemy/apis/optimism/eth-subscribe)&#x20;
* [Arbitrum](https://docs.alchemy.com/alchemy/apis/arbitrum/eth-subscribe)

## How can I make WebSocket subscriptions for Ethereum blockchain updates?&#x20;

Once you’ve run the command above, you’ll have an open WebSocket connection to an Ethereum node. To start / stop receiving push updates on certain state changes in the Ethereum network, you’ll need to send one of the following methods:&#x20;

1. ``[`eth_subscribe`](https://docs.alchemy.com/alchemy/enhanced-apis/subscription-api-websockets#eth\_subscribe)&#x20;
2. ``[`eth_unsubscribe`](https://docs.alchemy.com/alchemy/enhanced-apis/subscription-api-websockets#eth\_unsubscribe)``

These two requests enable blockchain app developers to create and delete subscriptions. By setting their parameters properly, you’ll get push updates whenever new transactions are sent or new blocks are created.

Here’s an example of an `eth_subscribe` request:

```
// initiate websocket stream first 
wscat -c wss://eth-mainnet.alchemyapi.io/v2/demo

// then call subscription 
{"jsonrpc":"2.0","id": 2, 
 "method": "eth_subscribe", 
 "params": ["alchemy_newFullPendingTransactions"]
 }
```

Using Alchemy’s [Subscription API](https://docs.alchemy.com/alchemy/enhanced-apis/subscription-api-websockets), there are four main types of WebSocket subscriptions you can make to receive push updates to an Ethereum node: ​

1. ****[**alchemy\_pendingTransactions**](./#alchemy\_pendingtransactions)**​:** Emits full transactions that are sent to the network, marked as "pending", and are sent from or to a certain address. A custom Alchemy subscription.&#x20;
2. ​[**newPendingTransactions​:** ](https://docs.alchemy.com/alchemy/enhanced-apis/subscription-api-websockets#newpendingtransactions)Emits transaction hashes that are sent to the network and marked as "pending". ​
3. ****[**newHeads​:**](https://docs.alchemy.com/alchemy/enhanced-apis/subscription-api-websockets#newheads) Emits new blocks that are added to the blockchain.&#x20;
4. ​[**logs**](https://docs.alchemy.com/alchemy/enhanced-apis/subscription-api-websockets#logs)​: Emits logs attached to a new block that match certain topic filters. Note: ​newFullPendingTransactions​ and ​filteredNewFullPendingTransactions​ are being combined into a single API with parameters.&#x20;

## 4 Reasons to Use HTTPS instead of WebSockets for JSON-RPC Node Requests&#x20;

In general, the best practice that we recommend is that developers don’t send standard Ethereum JSON-RPC requests over WebSockets, and instead use HTTP(S) requests. Sending JSON-RPC requests over WebSockets may become unsupported in the future.

This is for four main reasons:

* Silent failures&#x20;
* Load balancing&#x20;
* Retries HTTP&#x20;
* status codes

### 1. Silent failures&#x20;

WebSockets client-side handling has many tricky edge cases and silent failure modes, which can make web3 dApp less stable.

### 2. Load balancing&#x20;

When making requests to distributed systems such as Alchemy, individual HTTP requests are load-balanced to the fastest possible server.

When developers open a WebSocket connection, they incur additional latency by sending JSON-RPC requests only to a single node rather than the most available resource.&#x20;

### 3. Retries&#x20;

In most common request frameworks, support for retrying failed HTTP requests comes automatically, and can be configured easily. Conversely, in WebSockets retrying failed requests typically requires custom JSON-RPC id based tracking.&#x20;

### 4. HTTP status codes&#x20;

When web3 developers use WebSockets they won't receive HTTP status codes in WebSockets responses, which can be useful for debugging or sorting responses.

## Conclusion

If you’re interested in getting pushed updates on the state of the Ethereum network and avoiding HTTP workaround strategies such as [long polling](https://www.educative.io/edpresso/what-is-http-long-polling), start using [WebSockets today](https://docs.alchemy.com/alchemy/enhanced-apis/subscription-api-websockets) to streamline your request workflow!
