---
description: Everything you need to get started using Alchemy on a Mac.
---

# 🍎 Alchemy Set-up for Macs

_**Get access to Alchemy for free **_[_**here**_](https://alchemy.com/?r=affiliate:186ee05a-043c-44a8-b3ee-e5a05c8dba04)_**.**_

_Estimated time to complete this guide: \~5 minutes** **_

For a quick start, you can interact with Ethereum nodes using JSON RPC shell commands. This can be quite manual, and you can write POST requests, GET requests, or others. See examples [here](../introduction/getting-started.md#2-make-a-request).

Rather than writing out requests manually, you can use Web3 to interact with the Ethereum blockchain. Web3 is a collection of libraries that allow you to connect to a node using HTTP, WebSockets, or IPC. You can use Web3 libraries in whichever language you are most comfortable with, the most common being Javascript, Java, and Python.

## 1. Install NodeJS and NPM

First, install [Homebrew](https://brew.sh). Homebrew is a great installation software for macs so you can easily download other packages in the future. To install Homebrew, open Terminal and run:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

Next, install [NodeJS](https://nodejs.org/en/) and [npm](https://www.npmjs.com) using Homebrew (npm will be installed with Node):

```
brew install node
```

You can now run Javascript in Terminal:

```
node
```

## 2. \[Optional] Install Alchemy Web3

There are tons of Web3 libraries you can integrate with Alchemy, however, we recommend using [Alchemy Web3](../documentation/alchemy-web3/), a drop-in replacement for web3.js, built and configured to work seamlessly with Alchemy. This provides multiple advantages such as automatic retries and robust WebSocket support.

In Terminal on the command line:

```
npm install @alch/alchemy-web3
```

## 3. \[Optional] Install WebSockets 

WebSockets are a great way to subscribe to events and changes, learn more through our [Using WebSockets](using-websockets.md) page. To use WebSockets, first install WebSocket cat.

```
npm install -g wscat
```

Now connect to Alchemy's blockchain infrastructure using WebSockets:

Using Alchemy's demo: 

```
wscat -c wss://eth-mainnet.ws.alchemyapi.io/ws/demo
```

Using your own key:

```
wscat -c wss://eth-mainnet.alchemyapi.io/ws/<api-key>
```

Create a Web3 instance and set your provider as Alchemy:

```javascript
const web3 = new Web3("wss://eth-mainnet.ws.alchemyapi.io/ws/demo");
```

## 4. Start Building! 

Now that you have everything you need installed, start building your first app. Here are a couple great starting points:

1. Write your first [web3 script](../tutorials/simple-web3-script.md) 
2. Check out the [Demo App](demo-app.md) we seeded in your Alchemy dashboard
3. Follow this [tutorial to create a smart contract](../tutorials/hello-world-smart-contract/)! 
