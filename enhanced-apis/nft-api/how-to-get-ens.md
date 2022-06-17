---
description: >-
  In this tutorial, we’ll be using Alchemy’s NFT API to fetch all ENS Domain
  Names owned by a user.
---

# How to Resolve ENS Domains Given a Wallet Address

## What tools do you need to find an ENS name? <a href="#ens-4" id="ens-4"></a>

1. Create a [free Alchemy account](https://alchemy.com/?a=eb01f405c5) to access the [NFT API](./)
2. Select a wallet address to request ENS domains from (i.e. “0x…XXX”)
3. [AlchemyWeb3.js](../../documentation/alchemy-web3/) (recommended)

## How do you find a wallet’s owned ENS names? <a href="#ens-5" id="ens-5"></a>

Because all ENS domains are ERC721  tokens (NFTs), [Alchemy's NFT API](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api) is a powerful tool for querying blockchains for data about wallets that own ENS domains. Let’s set up our basic environment in your code editor and terminal by following instructions as mentioned in the [NFT API Quickstart Guide](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api/nft-api-quickstart-guide). We’ll be using npm in this example.

### 1. Create a new repository with Alchemy's NFT API

Open up a terminal, and from the command line, create a new repository to hold your quickstart scripts. We'll also initialize the repo as an npm project.

```
mkdir alchemy-nft-api
cd alchemy-nft-api
npm init --yes
```

### 2. Install the Alchemy Web3 SDK

Navigate into your project directory and run:

```
npm install @alch/alchemy-web3
```

### 3. \[optional] Load ES6 modules

If you run into module errors, you may need to add `'type':'module'` to your `package.json` because we'll be utilizing import syntax to load ES6 modules in our script.&#x20;

{% code title="package.json" %}
```json
{
...
"type": "module"
}

```
{% endcode %}

### 4. Write script using [getNFTs](getnfts.md) to get ENS domains&#x20;

To get the ENS domains for a given address, we'll make a request to [getNFTs with contract filtering](getnfts.md#request-with-contract-filtering) The contract that we'll specify in the request is the address for all ENS contracts: `0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85`

In this example we'll get the owned ENS domains for address 0x458d1E307CcA61C0Bea82f7663F66831175EcDe8

Create a file in your repository called `resolve-ens.js` and paste in the following

{% code title="resolve-ens.js" %}
```javascript
// Installation: https://github.com/alchemyplatform/alchemy-web3
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

const apiKey = "demo"; // replace with your unique Alchemy API Key
const web3 = createAlchemyWeb3(
"https://eth-mainnet.alchemyapi.io/v2/"+ apiKey
);

const walletAddress = "0x458d1E307CcA61C0Bea82f7663F66831175EcDe8"; // replace with wallet address
const ensContractAddress = "0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85";
const nfts = await web3.alchemy.getNfts({owner: walletAddress, contractAddresses: [ensContractAddress]})

console.log(nfts);
```
{% endcode %}

### 5.  Print ENS objects&#x20;

From the command line, run `node resolve-ens.js` :

```
{
  ownedNfts: [
    {
      contract: [Object],
      id: [Object],
      balance: '1',
      title: 'elanhalpern.eth',
      description: 'elanhalpern.eth, an ENS name.',
      tokenUri: [Object],
      media: [Array],
      metadata: [Object],
      timeLastUpdated: '2022-03-07T07:50:03.443Z'
    },
    {
      contract: [Object],
      id: [Object],
      balance: '1',
      title: 'cryptocreamery.eth',
      description: 'cryptocreamery.eth, an ENS name.',
      tokenUri: [Object],
      media: [Array],
      metadata: [Object],
      timeLastUpdated: '2022-03-05T06:21:12.583Z'
    }
  ],
  totalCount: 2,
  blockHash: '0xc983065bae1b5a52a87b3bdce7f3669cb56f9f843c348ffe44d23742bf5fff76'
}

```

The title field in our `ownedNFT` objects is the name of the ENS domain. In this case, the address owns two ENS domains:

* `elanhalpern.eth`
* `cryptocreamery.eth`

And that's it! You can now easily get any ENS domains from a given wallet address :tada:
