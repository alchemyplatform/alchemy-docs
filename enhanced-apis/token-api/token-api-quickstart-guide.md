---
description: >-
  A new developer's guide to using the Token API and mastering how to get token
  information. Learn how to query Token data using alchemy-web3 (recommended),
  fetch, or axios.
---

# Token API Quickstart Guide

For this **Javascript** quickstart guide, we recommend using `alchemy-web3`, a module that allows you to more easily interact with Alchemy APIs. The `alchemy-web3` SDK give you websocket support and other benefits right out of the box! Fetch or Axios are two alternative modules that also allow you to make HTTP requests.

## Common setup steps

If you're new to the Alchemy Quickstart series, you should start with these steps before choosing any of the modules below. If you're a returning dev, go ahead and skip.

### Choose a package manager (npm or yarn)

For this guide we will be using `npm`  or `yarn` as our package manager to install either `alchemy-web3`, `fetch`, or `axios`.&#x20;

#### npm

To get started with `npm`, follow the documentation to install Node.js and `npm` for your operating system: [https://docs.npmjs.com/downloading-and-installing-node-js-and-npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

#### yarn

To get started with `yarn`, follow these steps: [https://classic.yarnpkg.com/lang/en/docs/install](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)

### Set up your repo (npm or yarn)

#### npm

Open up a terminal, and from the command line, create a new repository to hold your quickstart scripts. We'll also initialize the repo as an npm project.

```
mkdir alchemy-token-api
cd alchemy-token-api
npm init --yes
```

#### yarn

```
mkdir alchemy-token-api
cd alchemy-token-api
yarn init --yes
```

### Support import syntax

Since we'll be using import syntax to load ES6 modules, add `'type': 'module'` to your `package.json` file:

```json
// package.json
{
  ...
  "type": "module"
}
```

See this discussion for more context: [https://stackoverflow.com/questions/61401475/why-is-type-module-in-package-json-file](https://stackoverflow.com/questions/61401475/why-is-type-module-in-package-json-file)

## Alchemy Web3 SDK (_**Recommended**_)

You can install the `alchemy-web3` module to easily interact with Alchemy APIs. We highly recommend using the `alchemy-web3` sdk because you also get websocket support, retries, and other benefits without the complexity!

For full documentation on `alchemy-web3`, check the github repo: [https://github.com/alchemyplatform/alchemy-web3](https://github.com/alchemyplatform/alchemy-web3)

### Installation

{% tabs %}
{% tab title="npm" %}
Run the following command to install `alchemy-web3` with `npm`

```
npm install @alch/alchemy-web3
```
{% endtab %}

{% tab title="yarn" %}
Run the following command to install `alchemy-web3` with `yarn`

```
yarn add @alch/alchemy-web3
```
{% endtab %}
{% endtabs %}

### Usage

{% embed url="https://github.com/alchemyplatform/token-api-javascript-scripts/blob/main/alchemy-web3-script.js" %}

```
touch alchemy-web3-script.js
```

and then paste the following code snippet into the file:

```javascript
// alchemy-token-api/alchemy-web3-script.js
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

// Replace with your Alchemy api key:
const apiKey = "demo";

// Initialize an alchemy-web3 instance:
const web3 = createAlchemyWeb3(
  `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`,
);

// The wallet address / token we want to query for:
const ownerAddr = "0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be";
const balances = await web3.alchemy.getTokenBalances(ownerAddr,["0x607f4c5bb672230e8672085532f7e901544a7375"])

// The token address we want to query for metadata:
const metadata = await web3.alchemy.getTokenMetadata("0x607f4c5bb672230e8672085532f7e901544a7375")

console.log("BALANCES->");
console.log(balances);
console.log("TOKEN METADATA->");
console.log(metadata);

```

From your command line, you can execute the script with:

```bash
node alchemy-web3-script.js
```

You should see output like this:

```bash
BALANCES->
{
  address: '0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be',
  tokenBalances: [
    {
      contractAddress: '0x607f4c5bb672230e8672085532f7e901544a7375',
      tokenBalance: '65972300000000',
      error: null
    }
  ]
}
TOKEN METADATA->
{
  decimals: 9,
  logo: 'https://static.alchemyapi.io/images/assets/1637.png',
  name: 'iExec RLC',
  symbol: 'RLC'
}

```

For full documentation on the available endpoints for `alchemy-web3` sdk, check the github repo:

{% embed url="https://github.com/alchemyplatform/alchemy-web3" %}

## Javascript Fetch&#x20;

`node-fetch` a lightweight, common module that brings the Fetch API to Node.js and allows us to make our HTTP requests.&#x20;

See the documentation for more info: [https://www.npmjs.com/package/node-fetch](https://www.npmjs.com/package/node-fetch)

### Installation

{% tabs %}
{% tab title="npm" %}
Run the following command to install `node-fetch` with `npm`

```
npm install node-fetch
```
{% endtab %}

{% tab title="yarn" %}
Run the following command to install `node-fetch` with `yarn`

```
yarn add node-fetch
```
{% endtab %}
{% endtabs %}

### Usage

{% embed url="https://github.com/alchemyplatform/token-api-javascript-scripts/blob/main/fetch-script.js" %}

```
touch fetch-script.js
```

and then paste the following code snippet into the file to explore the `getNFTs` method:=

```javascript
// alchemy-token-api/fetch-script.js
import fetch from 'node-fetch';

// Replace with your Alchemy API key:
const apiKey = "demo";
const fetchURL = `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`;

// Replace with the wallet address you want to query:
const ownerAddr = "0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be";
// Replace with the token contract address you want to query:
const tokenAddr = "0x607f4c5bb672230e8672085532f7e901544a7375";

var raw = JSON.stringify({
  "jsonrpc": "2.0",
  "method": "alchemy_getTokenBalances",
  "headers": {
    "Content-Type": "application/json"
  },
  "params": [
    `${ownerAddr}`,
    [
      `${tokenAddr}`,
    ]
  ],
  "id": 42
});

var requestOptions = {
  method: 'POST',
  body: raw,
  redirect: 'follow'
};

// Make the request and print the formatted response:
fetch(fetchURL, requestOptions)
  .then(response => response.json())
  .then(response => JSON.stringify(response, null, 2))
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

```

From your command line, you can execute the script with:

```javascript
node fetch-script.js
```

Your output should look like the following:

```javascript
{
  "jsonrpc": "2.0",
  "id": 42,
  "result": {
    "address": "0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be",
    "tokenBalances": [
      {
        "contractAddress": "0x607f4c5bb672230e8672085532f7e901544a7375",
        "tokenBalance": "0x00000000000000000000000000000000000000000000000000003c005f81ab00",
        "error": null
      }
    ]
  }
}
```

For full documentation on the NFT API `getNFTs` method, check out the docs:

{% content-ref url="./" %}
[.](./)
{% endcontent-ref %}

## Javascript Axios

`axios` is a promise-based HTTP client for the browser and Node.js, which allows us to make a raw request to the Alchemy API.

See the documentation for more info: [https://www.npmjs.com/package/axios](https://www.npmjs.com/package/axios)

### Installation

{% tabs %}
{% tab title="npm" %}
Run the following command to install `axios` with `npm`

```
npm install axios
```
{% endtab %}

{% tab title="yarn" %}
Run the following command to install `axios` with `yarn`

```
yarn add axios
```
{% endtab %}
{% endtabs %}

### Usage

{% embed url="https://github.com/alchemyplatform/token-api-javascript-scripts/blob/main/axios-script.js" %}

```
touch axios-script.js
```

and then paste the following code snippet in to explore the `getNFTs` method

```javascript
// alchemy-token-api/axios-script.js
import axios from 'axios';

// Replace with your Alchemy API key:
const apiKey = "demo";
const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`;
// Replace with the wallet address you want to query:
const ownerAddr = "0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be";
// Replace with the token contract address you want to query:
const tokenAddr = "0x607f4c5bb672230e8672085532f7e901544a7375";

var data = JSON.stringify({
  "jsonrpc": "2.0",
  "method": "alchemy_getTokenBalances",
  "params": [
    `${ownerAddr}`,
    [
      `${tokenAddr}`
    ]
  ],
  "id": 42
});

var config = {
  method: 'post',
  url: baseURL,
  headers: {
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data, null, 2))
})
.catch(function (error) {
  console.log(error);
});

```

From your command line, you can execute the script with:

```javascript
node axios-script.js
```

Your output should look like the following:

```javascript
alchemy-token-api % node axios-script.js

{
  "jsonrpc": "2.0",
  "id": 42,
  "result": {
    "address": "0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be",
    "tokenBalances": [
      {
        "contractAddress": "0x607f4c5bb672230e8672085532f7e901544a7375",
        "tokenBalance": "0x00000000000000000000000000000000000000000000000000003c005f81ab00",
        "error": null
      }
    ]
  }
}
```

For full documentation on the available Token API methods , check out the docs:

{% content-ref url="./" %}
[.](./)
{% endcontent-ref %}
