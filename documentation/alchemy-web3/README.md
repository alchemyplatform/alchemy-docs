---
description: >-
  Alchemy Web3 is a drop-in replacement for web3.js, built and configured to
  work seamlessly with Alchemy and provide multiple advantages such as automatic
  retries and robust WebSocket support.
---

# 🪐 Alchemy Web3.js

#### _**Get access to **_[_**Alchemy for free here**_](https://alchemy.com/?r=e68b2f77-7fc7-4ef7-8e9c-cdfea869b9b5)_**.**_

## :wave: Introduction 

[Alchemy Web3 ](https://github.com/alchemyplatform/alchemy-web3)is a wrapper around [Web3.js](https://web3js.readthedocs.io/en/v1.2.9/), providing enhanced API methods and other crucial benefits listed below. It is designed to require minimal configuration so you can start using it in your app right away.

### Benefits:

* **Effortless integration** Alchemy Web3 is an extension of Web3.js. If you're already using Web3, then you can start using Alchemy Web3 with a one-line change.
* **Enhanced Alchemy APIs** The client exposes methods to call Alchemy's exclusive features.
* **Automatic Retries** If Alchemy returns a 429 response (rate limited), automatically retry after a short delay. This behavior is configurable.
* **Upgraded WebSockets** which don't miss events if the WebSocket needs to be reconnected.
* **Seamless provider handling** Most requests will be sent through Alchemy, but requests involving signing and sending transactions are sent via a browser provider like Metamask or Trust Wallet if the user has it installed, or via a custom provider specified in options.

## Sturdier WebSockets

WebSocket connections are ephemeral by nature, which makes it necessary for clients to engineer non-trivial mechanisms around reconnects and backfills of missed events.

Alchemy Web3 brings multiple improvements to ensure correct WebSocket behavior in cases of temporary network failure or dropped connections. As with any network connection, you should not assume that a WebSocket will remain open forever without interruption, but correctly handling dropped connections and reconnection by hand can be challenging to get right. Alchemy Web3 automatically handles these failures with no configuration necessary.

If you use your WebSocket URL when initializing, then when you create subscriptions using `web3.eth.subscribe()`, Alchemy Web3 will bring the following advantages over standard Web3 subscriptions:

* Unlike standard Web3, you will not permanently miss events which arrive while the backing WebSocket is temporarily down. Instead, you will receive these events as soon as the connection is reopened. Note that if the connection is down for more than 120 blocks (approximately 20 minutes), you may still miss some events that were not part of the most recent 120 blocks.
* Compared to standard Web3, lowered rate of failure when sending requests over the WebSocket while the connection is down. Alchemy Web3 will attempt to send the requests once the connection is reopened. Note that it is still possible, with a lower likelihood, for outgoing requests to be lost, so you should still have error handling as with any network request.

## Installation 

### With a package manager

Navigate to your project directory and run: 

#### With Yarn:

```
yarn add @alch/alchemy-web3
```

#### With NPM:

```
npm install @alch/alchemy-web3
```

### With a CDN in the browser

Add the following script tag to your webpage:

```
<script src="https://cdn.jsdelivr.net/npm/@alch/alchemy-web3@latest/dist/alchemyWeb3.min.js"></script>
```

When using this option, you can create Alchemy-Web3 instances using the global variable `AlchemyWeb3.createAlchemyWeb3`.

## Usage

### Basic Usage

Create the client by importing the function `createAlchemyWeb3` and then passing it your Alchemy app's URL and optionally a configuration object.

Using HTTPS:

```javascript
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

// Using HTTPS
const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/<api-key>");
```

Using WebSockets:

```javascript
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

// Using WebSockets
const web3 = createAlchemyWeb3(
  "wss://eth-mainnet.ws.alchemyapi.io/ws/<api-key>",
);
```

You can use any of the methods described in the [web3.js API](https://web3js.readthedocs.io/en/1.0/) and they will send requests to Alchemy:

```javascript
// Many web3.js methods return promises.
web3.eth.getBlock("latest").then(block => {
  /* … */
});

web3.eth
  .estimateGas({
    from: "0xge61df…",
    to: "0x087a5c…",
    data: "0xa9059c…",
    gasPrice: "0xa994f8…",
  })
  .then(gasAmount => {
    /* … */
  });

web3.eth
  .getMaxPriorityFeePerGas().then(console.log);

web3.eth
  .getFeeHistory(4, "latest", [25, 50, 75]).then(console.log);
```

### With a Browser Provider

If the user has a provider in their browser available at `window.ethereum`, then any methods which involve user accounts or signing will automatically use it. This provider might be injected by [Metamask](https://metamask.io), [Trust Wallet](https://trustwallet.com/dapp) or other browsers or browser extensions if the user has them installed. For example, the following will use a provider from the user's browser:

```javascript
web3.eth.getAccounts().then(accounts => {
  web3.eth.sendTransaction({
    from: accounts[0],
    to: "0x6A823E…",
    value: "1000000000000000000",
  });
});
```

#### **Note on using Metamask**

As just discussed, Metamask will automatically be used for accounts and signing if it is installed. However, for this to work **you must first request permission from the user to access their accounts in Metamask**. This is a security restriction required by Metamask: details can be found [here](https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8).

To enable Metamask, you must call `ethereum.enable()`. Here's an example:

```javascript
if (window.ethereum) {
  window.ethereum
    .enable()
    .then(accounts => {
      // Metamask is ready to go!
    })
    .catch(reason => {
      // Handle error. Likely the user rejected the login.
    });
} else {
  // The user doesn't have Metamask installed.
}
```

Note that doing this will display a Metamask dialog to the user if they have not already seen it and accepted, so you might want to wait before enabling Metamask until the user is about to perform an action that requires it. This is also why Alchemy Web3 will not automatically enable Metamask on page load.

### With a Custom Provider

You may also choose to bring your own provider for writes rather than relying on one being present in the browser environment. To do so, use the `writeProvider` option when creating your client:

```javascript
const web3 = createAlchemyWeb3(ALCHEMY_URL, { writeProvider: provider });
```

Your provider should expose at least one of `sendAsync()` or `send()`, as specified in [EIP 1193](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1193.md).

You may swap out the custom provider at any time by calling the `setWriteProvider()` method:

```javascript
web3.setWriteProvider(provider);
```

You may also disable the write provider entirely by passing a value of `null`.

## Automatic Retries

If Alchemy Web3 encounters a rate limited response, it will automatically retry the request after a short delay. This behavior can be configured by passing the following options when creating your client. To disable retries, set `maxRetries` to 0.

### **maxRetries**

The number of times the client will attempt to resend a rate limited request before giving up. Default: 3.

### **retryInterval**

The minimum time waited between consecutive retries, in milliseconds. Default: 1000.

### **retryJitter**

A random amount of time is added to the retry delay to help avoid additional rate errors caused by too many concurrent connections, chosen as a number of milliseconds between 0 and this value. Default: 250.
