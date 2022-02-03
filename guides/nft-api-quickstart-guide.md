---
description: >-
  From 0 to hero with the Alchemy NFT API. Learn how to query NFT data using
  alchemy-web3, fetch, and axios.
---

# NFT API Quickstart Guide

## Common setup steps

You should start with these steps before choosing any of the modules below.

### Choose a package manager

For this guide we will be using `npm`  or `yarn` as our package manager to install either `alchemy-web3`, `fetch`, or `axios`.&#x20;

#### npm

To get started with `npm`, follow the documentation to install Node.js and `npm` for your operating system: [https://docs.npmjs.com/downloading-and-installing-node-js-and-npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

#### yarn

To get started with `yarn`, follow these steps: [https://classic.yarnpkg.com/lang/en/docs/install](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)

### Set up your repo

Open up a terminal, and from the command line, create a new repository to hold your quickstart scripts. We'll also initialize the repo as an npm project.

```
mkdir alchemy-nft-api
cd alchemy-nft-api
npm init --yes
```

## Alchemy Web3 SDK

You can install `alchemy-web3`, a module that allows you to more easily interact with Alchemy APIs. We highly recommend using the `alchemy-web3` sdk because you also get websocket support and other benefits right out of the box!

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
yarn add @alch/alchemy-web
```
{% endtab %}
{% endtabs %}

### Usage

In your `alchemy-nft-api` directory, you can create a new file called `alchemy-web3-script.js` and paste the following code snippet in:

```javascript
// alchemy-web3-script.js

import { createAlchemyWeb3 } from "@alch/alchemy-web3";

// Replace with your Alchemy api key:
const apiKey = "demo";

// Initialize an alchemy-web3 instance:
const web3 = createAlchemyWeb3(
  `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`,
);

// The wallet address we want to query for NFTs:
const ownerAddr = "0xC33881b8FD07d71098b440fA8A3797886D831061";
const nfts = await web3.alchemy.getNfts({
  owner: ownerAddr
})

console.log("fetching NFTs for address:", ownerAddr);
console.log("...");
console.log("number of NFTs found:", nfts.totalCount);
console.log("...");

for (const nft of nfts.ownedNfts) {
  console.log("===");
  console.log("contract address:", nft.contract.address);
  console.log("token ID:", nft.id.tokenId);
}
console.log("===");
```

And then from your command line, you can execute the script with:

```bash
node alchemy-web3-script.js
```

You should see output like this:

```bash
alchemy-nft-api % node alchemyweb3-script.js
===
fetching NFTs for address: 0xC33881b8FD07d71098b440fA8A3797886D831061
...
number of NFTs found: 1
...
===
contract address: 0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85
token ID: 0x3ee4ed8824659deea1bb8fa6d4090b11d263417704c0a0fbc78fa8c4fc177909
===
```

## Javascript Fetch&#x20;

`node-fetch` a lightweight, common module that brings the Fetch API to Node.js and allows us to make our HTTP requests.&#x20;

### Installation

{% tabs %}
{% tab title="npm" %}
Run the following command to install `alchemy-web3` with `npm`

```
npm install node-fetch
```
{% endtab %}

{% tab title="yarn" %}
Run the following command to install `alchemy-web3` with `yarn`

```
yarn add node-fetch
```
{% endtab %}
{% endtabs %}

### Usage

In your `alchemy-nft-api` directory, you can create a new file called `alchemy-web3-script.js` and paste the following code snippet in:

```javascript
import fetch from 'node-fetch';

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

const baseURL = "https://eth-mainnet.g.alchemy.com/demo/v1/getNFTs/";
const ownerAddr = "0xfAE46f94Ee7B2Acb497CEcAFf6Cff17F621c693D";
const fetchURL = `${baseURL}?owner=${ownerAddr}`;

fetch(fetchURL, requestOptions)
  .then(response => response.json())
  .then(response => JSON.stringify(response, null, 2))
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

```

And then from your command line, you can execute the script with:

```javascript
node alchemy-web3-script.js

```

Your output should look like the following:

```javascript
{
  "ownedNfts": [
    {
      "contract": {
        "address": "0x0beed7099af7514ccedf642cfea435731176fb02"
      },
      "id": {
        "tokenId": "0x000000000000000000000000000000000000000000000000000000000000001c"
      },
      "balance": "1"
    },
    ......
    },
    {
      "contract": {
        "address": "0xc4c377565a4b9eb6e657c2422bd33b6e4859b041"
      },
      "id": {
        "tokenId": "0x01"
      },
      "balance": "1"
    }
  ],
  "totalCount": 12,
  "blockHash": "0x470e52bdaffff978b4a89b2cfb2b8a3f92ec523bffb4bdb3d9b656ff8be57f8d"
}

```

Axios
