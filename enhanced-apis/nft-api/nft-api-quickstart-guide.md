---
description: >-
  Go from zero to hero with the Alchemy NFT API. Learn how to query NFT data
  using the Alchemy SDK (recommended), fetch, or axios.
---

# NFT API Quickstart Guide

For this **Javascript** quickstart guide, we recommend using `alchemy-sdk-js`, a full-featured SDK that allows you to more easily interact with Alchemy APIs. [The Alchemy SDK](../../sdk/alchemy-sdk-quickstart.md) give you WebSocket support and other benefits right out of the box! Fetch or Axios are two alternative modules that also allow you to make standard HTTP requests.

## Common setup steps

You should start with these steps before choosing any of the modules below.

### Choose a package manager (npm or yarn)

For this guide we will be using `npm`  or `yarn` as our package manager to install either `@alch/alchemy-sdk`, `fetch`, or `axios`.&#x20;

#### npm

To get started with `npm`, follow the documentation to install Node.js and `npm` for your operating system: [https://docs.npmjs.com/downloading-and-installing-node-js-and-npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

#### yarn

To get started with `yarn`, follow these steps: [https://classic.yarnpkg.com/lang/en/docs/install](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)

### Set up your repo (npm or yarn)

#### npm

Open up a terminal, and from the command line, create a new repository to hold your quickstart scripts. We'll also initialize the repo as an npm project.

```
mkdir alchemy-nft-api
cd alchemy-nft-api
npm init --yes
```

#### yarn

```
mkdir alchemy-nft-api
cd alchemy-nft-api
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

See this discussion for more context:

{% embed url="https://stackoverflow.com/questions/61401475/why-is-type-module-in-package-json-file" %}

## Alchemy SDK (_**Recommended**_)

You can install the `alchemy-sdk-js` module to easily interact with Alchemy APIs. We highly recommend using the Alchemy SDK because you also get WebSocket support, retries, and other benefits without the complexity!

For full documentation on `alchemy-sdk-js`, check the github repo:&#x20;

{% embed url="https://github.com/alchemyplatform/alchemy-sdk-js" %}

### Installation

{% tabs %}
{% tab title="npm" %}
Run the following command to install `alchemy-web3` with `npm`

```
npm install @alch/alchemy-sdk
```
{% endtab %}

{% tab title="yarn" %}
Run the following command to install `alchemy-web3` with `yarn`

```
yarn add @alch/alchemy-sdk
```
{% endtab %}
{% endtabs %}

### Usage

{% embed url="https://github.com/alchemyplatform/nft-api-javascript-scripts/blob/main/alchemy-sdk-script.js" %}
The demo script for the Alchemy SDK
{% endembed %}

In your `alchemy-nft-api` directory, you can create a new file called `alchemy-sdk-script.js` using your favorite file browser, code editor, or just directly in the terminal using the `touch` command like this:

```
touch alchemy-sdk-script.js
```

and then paste the following code snippet into the file:

```javascript
// This script demonstrates access to the NFT API via the Alchemy SDK.
import { Network, Alchemy } from "@alch/alchemy-sdk";

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: "demo", // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
  maxRetries: 10,
};

const alchemy = new Alchemy(settings);

async function main() {
  // Print owner's wallet address:
  const ownerAddr = "0xshah.eth";
  console.log("fetching NFTs for address:", ownerAddr);
  console.log("...");

  // Print total NFT count returned in the response:
  const nftsForOwner = await alchemy.getNftsForOwner("0xshah.eth");
  console.log("number of NFTs found:", nftsForOwner.totalCount);
  console.log("...");

  // Print contract address and tokenId for each NFT:
  for (const nft of nftsForOwner.ownedNfts) {
    console.log("===");
    console.log("contract address:", nft.contract.address);
    console.log("token ID:", nft.tokenId);
  }
  console.log("===");

  // Fetch metadata for a particular NFT:
  console.log("fetching metadata for a Crypto Coven NFT...");
  const response = await alchemy.getNftMetadata(
    "0x5180db8F5c931aaE63c74266b211F580155ecac8",
    "1590"
  );

  // Uncomment this line to see the full api response:
  // console.log(response);

  // Print some commonly used fields:
  console.log("NFT name: ", response.title);
  console.log("token type: ", response.tokenType);
  console.log("tokenUri: ", response.tokenUri.gateway);
  console.log("image url: ", response.rawMetadata.image);
  console.log("time last updated: ", response.timeLastUpdated);
  console.log("===");
}

main();
```

From your command line, you can execute the script with:

```bash
node alchemy-sdk-script.js
```

You should see output like this:

```bash
node alchemy-sdk-script.js   ✔  4s
fetching NFTs for address: 0xshah.eth
...
number of NFTs found: 516
...
===
contract address: 0x000386e3f7559d9b6a2f5c46b4ad1a9587d59dc3
token ID: 29
===
contract address: 0x000386e3f7559d9b6a2f5c46b4ad1a9587d59dc3
token ID: 238
===
...........
===
fetching metadata for a Crypto Coven NFT...
NFT name:  balsa vault
token type:  ERC721
tokenUri:  https://alchemy.mypinata.cloud/ipfs/QmaXzZhcYnsisuue5WRdQDH6FDvqkLQX1NckLqBYeYYEfm/1590.json
image url:  https://cryptocoven.s3.amazonaws.com/a7875f5758f85544dcaab79a8a1ca406.png
time last updated:  2022-06-23T06:48:33.229Z
===
```

For full documentation on the available endpoints for `alchemy-sdk`, check the github repo:

{% embed url="https://github.com/alchemyplatform/alchemy-sdk-js" %}

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

{% embed url="https://github.com/alchemyplatform/nft-api-javascript-scripts/blob/main/fetch-script.js" %}

In your `alchemy-nft-api` directory, you can create a new file called `fetch-script.js` using your favorite file browser, code editor, or just directly in the terminal using the `touch` command like this:

```
touch fetch-script.js
```

and then paste the following code snippet into the file to explore the `getNFTs` method:

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
const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getNFTs/`;
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

From your command line, you can execute the script with:

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

For full documentation on the NFT API `getNFTs` method, check out the docs:

{% content-ref url="getnfts.md" %}
[getnfts.md](getnfts.md)
{% endcontent-ref %}

Now, in your `alchemy-nft-api` directory, let's now re-edit `fetch-script.js` using your favorite file browser, code editor, or just directly in the terminal using the `touch` command like this:

```
touch fetch-script.js
```

Paste the following code snippet into the file to explore the `getNFTMetadata` method:

```javascript
import fetch from 'node-fetch';

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  const apiKey = "demo"
  const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${demo}/getNFTMetadata`;
  const contractAddr = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d";
  const tokenId = "2";
  const tokenType = "erc721";
  const fetchURL = `${baseURL}?contractAddress=${contractAddr}&tokenId=${tokenId}&tokenType=${tokenType}`;

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
  "contract": {
    "address": "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"
  },
  "id": {
    "tokenId": "2",
    "tokenMetadata": {
      "tokenType": "ERC721"
    }
  },
  "title": "",
  "description": "",
  "tokenUri": {
    "raw": "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/2",
    "gateway": "https://ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/2"
  },
  "media": [
    {
      "uri": {
        "raw": "ipfs://QmcJYkCKK7QPmYWjp4FD2e3Lv5WCGFuHNUByvGKBaytif4",
        "gateway": "https://ipfs.io/ipfs/QmcJYkCKK7QPmYWjp4FD2e3Lv5WCGFuHNUByvGKBaytif4"
      }
    }
  ],
  "metadata": {
    "image": "ipfs://QmcJYkCKK7QPmYWjp4FD2e3Lv5WCGFuHNUByvGKBaytif4",
    "attributes": [
      {
        "value": "3d",
        "trait_type": "Eyes"
      },
      {
        "value": "Bored Cigarette",
        "trait_type": "Mouth"
      },
      {
        "value": "Robot",
        "trait_type": "Fur"
      },
      {
        "value": "Sea Captain's Hat",
        "trait_type": "Hat"
      },
      {
        "value": "Aquamarine",
        "trait_type": "Background"
      }
    ]
  },
  "timeLastUpdated": "2022-02-01T00:30:04.643Z"
}

```

For full documentation on the NFT API `getNFTMetadata` method, check out the docs:

{% content-ref url="getnftmetadata.md" %}
[getnftmetadata.md](getnftmetadata.md)
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

{% embed url="https://github.com/alchemyplatform/nft-api-javascript-scripts/blob/main/axios-script.js" %}

In your `alchemy-nft-api` directory, you can create a new file called `axios-script.js` using your favorite file browser, code editor, or just directly in the terminal using the `touch` command.&#x20;

```
touch axios-script.js
```

and then paste the following code snippet in to explore the `getNFTs` method

```javascript
// alchemy-nft-api/axios-script.js
import axios from 'axios';

// Replace with your Alchemy API key:
const apiKey = "demo";
const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getNFTs/`;
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

From your command line, you can execute the script with:

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

For full documentation on the available NFT API method  `getNFTs` , check out the docs:

{% content-ref url="getnfts.md" %}
[getnfts.md](getnfts.md)
{% endcontent-ref %}

Now, in your `alchemy-nft-api` directory, let's now re-edit `axios-script.js` using your favorite file browser, code editor, or just directly in the terminal using the `touch` command like this:

```
touch axios-script.js
```

and then paste the following code snippet in to explore the `getNFTs` method

```javascript
import axios from 'axios';

// replace with your Alchemy api key
const apiKey = "demo";
const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getNFTMetadata`;
const contractAddr = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d";
const tokenId = "2";
const tokenType = "erc721";

var config = {
  method: 'get',
  url: `${baseURL}?contractAddress=${contractAddr}&tokenId=${tokenId}&tokenType=${tokenType}`,
  headers: { }
};

axios(config)
.then(response => console.log(JSON.stringify(response.data, null, 2)))
.catch(error => console.log(error));
```

From your command line, you can execute the script with:

```javascript
node axios-script.js
```

Your output should look like the following:

```javascript
{
  "contract": {
    "address": "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"
  },
  "id": {
    "tokenId": "2",
    "tokenMetadata": {
      "tokenType": "ERC721"
    }
  },
  "title": "",
  "description": "",
  "tokenUri": {
    "raw": "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/2",
    "gateway": "https://ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/2"
  },
  "media": [
    {
      "uri": {
        "raw": "ipfs://QmcJYkCKK7QPmYWjp4FD2e3Lv5WCGFuHNUByvGKBaytif4",
        "gateway": "https://ipfs.io/ipfs/QmcJYkCKK7QPmYWjp4FD2e3Lv5WCGFuHNUByvGKBaytif4"
      }
    }
  ],
  "metadata": {
    "image": "ipfs://QmcJYkCKK7QPmYWjp4FD2e3Lv5WCGFuHNUByvGKBaytif4",
    "attributes": [
      {
        "value": "3d",
        "trait_type": "Eyes"
      },
      {
        "value": "Bored Cigarette",
        "trait_type": "Mouth"
      },
      {
        "value": "Robot",
        "trait_type": "Fur"
      },
      {
        "value": "Sea Captain's Hat",
        "trait_type": "Hat"
      },
      {
        "value": "Aquamarine",
        "trait_type": "Background"
      }
    ]
  },
  "timeLastUpdated": "2022-02-01T00:30:04.643Z"
}

```

For full documentation on the available NFT API method  `getNFTMetadata` , check out the docs:

{% content-ref url="getnftmetadata.md" %}
[getnftmetadata.md](getnftmetadata.md)
{% endcontent-ref %}

## Use Cases

Not sure where to start? Check out the following use cases and code examples:

1. [How to get all NFTs owned by an address](how-to-get-all-nfts-owned-by-an-address.md)
2. [How to get all NFTs in a collection](how-to-get-all-nfts-in-a-collection.md)&#x20;
3. [How to check the owner of an NFT](how-to-check-the-owner-of-an-nft.md)
4. [How to resolve ENS domains given a wallet address](how-to-get-ens.md)
