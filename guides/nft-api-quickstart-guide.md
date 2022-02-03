---
description: >-
  Go from zero to hero with the Alchemy NFT API. Learn how to query NFT data
  using alchemy-web3, fetch, or axios.
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
yarn add @alch/alchemy-web
```
{% endtab %}
{% endtabs %}

### Usage

In your `alchemy-nft-api` directory, you can create a new file called `alchemy-web3-script.js` and paste the following code snippet in:

```javascript
// alchemy-nft-api/alchemy-web3-script.js
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

// Print owner's wallet address:
console.log("fetching NFTs for address:", ownerAddr);
console.log("...");

// Print total NFT count returned in the response:
console.log("number of NFTs found:", nfts.totalCount);
console.log("...");

// Print contract address and tokenId for each NFT:
for (const nft of nfts.ownedNfts) {
  console.log("===");
  console.log("contract address:", nft.contract.address);
  console.log("token ID:", nft.id.tokenId);
}
console.log("===");

// Fetch metadata for a particular NFT:
console.log("fetching metadata for a crypto coven NFT...");
const response = await web3.alchemy.getNftMetadata({
  contractAddress: "0x5180db8F5c931aaE63c74266b211F580155ecac8",
  tokenId: "1590"
})

// Uncomment this line to see the full api response:
// console.log(metadata);

// Print some commonly used fields:
console.log("NFT name: ", response.title);
console.log("token type: ", response.id.tokenMetadata.tokenType);
console.log("tokenUri: ", response.tokenUri.gateway);
console.log("image url: ", response.metadata.image);
console.log("time last updated: ", response.timeLastUpdated);
console.log("===");
```

And then from your command line, you can execute the script with:

```bash
node alchemy-web3-script.js
```

You should see output like this:

```bash
alchemy-nft-api % node alchemyweb3-script.js
fetching NFTs for address: 0xC33881b8FD07d71098b440fA8A3797886D831061
...
number of NFTs found: 1
...
===
contract address: 0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85
token ID: 0x3ee4ed8824659deea1bb8fa6d4090b11d263417704c0a0fbc78fa8c4fc177909
===
fetching metadata for a crypto coven NFT...
NFT name:  balsa vault
token type:  ERC721
tokenUri:  https://ipfs.io/ipfs/QmZHKZDavkvNfA9gSAg7HALv8jF7BJaKjUc9U2LSuvUySB/1590.json
image url:  https://cryptocoven.s3.amazonaws.com/a7875f5758f85544dcaab79a8a1ca406.png
time last updated:  2022-01-25T07:41:32.003Z
===
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

In your `alchemy-nft-api` directory, you can create a new file called `fetch-script.js` and paste the following code snippet in:

```javascript
// alchemy-nft-api/fetch-script.js
import fetch from 'node-fetch';

// Setup request options:
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

// Replace with your Alchemy API key:
const apiKey = "demo";
const baseURL = `https://eth-mainnet.g.alchemy.com/${apiKey}/v1/getNFTs/`;
// Replace with the wallet address you want to query:
const ownerAddr = "0xF5FFF32CF83A1A614e15F25Ce55B0c0A6b5F8F2c";
const fetchURL = `${baseURL}?owner=${ownerAddr}`;

// Make the request and print the formatted response:
fetch(fetchURL, requestOptions)
  .then(response => response.json())
  .then(response => JSON.stringify(response, null, 2))
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

```

And then from your command line, you can execute the script with:

```javascript
node fetch-script.js
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

For full documentation on the available NFT API configurations, check out the docs:

{% content-ref url="../enhanced-apis/nft-api/getnfts.md" %}
[getnfts.md](../enhanced-apis/nft-api/getnfts.md)
{% endcontent-ref %}

{% content-ref url="../enhanced-apis/nft-api/getnftmetadata.md" %}
[getnftmetadata.md](../enhanced-apis/nft-api/getnftmetadata.md)
{% endcontent-ref %}

## Javascript Axios

`axios` is a promise-based HTTP client for the browser and Node.js.

See the documentation for more info: [https://www.npmjs.com/package/axios](https://www.npmjs.com/package/axios)

### Installation

{% tabs %}
{% tab title="npm" %}
Run the following command to install `axios` with `npm`

```
nnpm install axios
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

In your `alchemy-nft-api` directory, you can create a new file called `axios-script.js` and paste the following code snippet in:

```javascript
// alchemy-nft-api/axios-script.js
import axios from 'axios';

// Replace with your Alchemy API key:
const apiKey = "demo";
const baseURL = `https://eth-mainnet.g.alchemy.com/${apiKey}/v1/getNFTs/`;
// Replace with the wallet address you want to query for NFTs:
const ownerAddr = "0xF5FFF32CF83A1A614e15F25Ce55B0c0A6b5F8F2c";

// Construct the axios request:
var config = {
  method: 'get',
  url: `${baseURL}?owner=${ownerAddr}`
};

// Make the request and print the formatted response:
axios(config)
.then(response => console.log(JSON.stringify(response.data, null, 2)))
.catch(error => console.log(error));
```

And then from your command line, you can execute the script with:

```javascript
node axios-script.js
```

Your output should look like the following:

```javascript
alchemy-nft-api % node axios-script.js
{
  "ownedNfts": [
    {
      "contract": {
        "address": "0x049aba7510f45ba5b64ea9e658e342f904db358d"
      },
      "id": {
        "tokenId": "0x3651c7a73d3eea6a637f10a28ad1d8d296223e321b06626b2b4eac48eef4af4e"
      },
      "balance": "1"
    },
    ...
    {
      "contract": {
        "address": "0xf3e778f839934fc819cfa1040aabacecba01e049"
      },
      "id": {
        "tokenId": "0x00000000000000000000000000000000000000000000000000000000000060ed"
      },
      "balance": "1"
    }
  ],
  "totalCount": 36,
  "blockHash": "0x282c0c43a9eb14c0c42d72c3102421c76af27d9afa7f79cee595c4fec9e63535"
}
```

For full documentation on the available NFT API configurations, check out the docs:

{% content-ref url="../enhanced-apis/nft-api/getnfts.md" %}
[getnfts.md](../enhanced-apis/nft-api/getnfts.md)
{% endcontent-ref %}

{% content-ref url="../enhanced-apis/nft-api/getnftmetadata.md" %}
[getnftmetadata.md](../enhanced-apis/nft-api/getnftmetadata.md)
{% endcontent-ref %}
