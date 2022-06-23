---
description: >-
  Learn how to find the owner of an NFT on Ethereum and Polygon. The
  getOwnersForCollection is particularly useful for checking the owner of a
  specific ERC-721 or ERC-155 token.
---

# How to Check the Owner of an NFT

One of the most fundamental aspects of an NFT is ownership.&#x20;

Whether you're [building an NFT marketplace](../../road-to-web3/weekly-learning-challenges/7.-how-to-build-an-nft-marketplace-from-scratch.md) like OpenSea, a [web3 wallet](https://www.alchemy.com/web3-wallets-overview) like Rainbow, or an analytics platform like rarity.tools, knowing who owns an NFT is important information.

![A Beeple NFT owned by chronology.eth](<../../.gitbook/assets/Screenshot 2022-06-18 at 12.02.00 PM.png>)

An NFT can have [a single owner (ERC-721) or multiple owners (ERC-1155)](https://www.alchemy.com/blog/comparing-erc-721-to-erc-1155).&#x20;

Typically, getting ownership data on an NFT requires you to:

1. spin up a node
2. call functions on the NFT contract
3. parse the output

Now, getting a list of owners for an NFT collection takes one API call using [Alchemy's NFT API](https://www.alchemy.com/nft-api?a=d3d4c6ebf1).

How to Create

## How to Check the Owner of an NFT

In this tutorial, we will write a script in Node.js that tells us who the owner of an NFT is using the [NFT API](./). In this example, we will use an NFT called **Safe Haven** from the **TIMEPieces** collection.

### Step 0: Configure your developer environment

Before you begin, complete the following steps to [set up your web3 developer environment](../../guides/how-to-set-up-core-web3-developer-tools.md):&#x20;

1\. Install [Node.js ](https://nodejs.org/en/)(> 14) on your local machine

2\. Install [npm](https://www.npmjs.com/) on your local machine

To check your Node version, run the following command in your terminal:

```bash
node -v
```

3\. [Create a free Alchemy account](https://alchemy.com/?a=d3d4c6ebf1)

### Step 1: Create a new Alchemy app

To create an Alchemy app:

1. Go to your [Alchemy dashboard](https://dashboard.alchemyapi.io/)
2. Hover over the **Apps** drop-down menu
3. Choose **Create App**
4. Write a **Name**
5. Add a **description**
6. Select Ethereum as your **Chain**
7. Choose Mainnet as your **Network**
8. Click the **Create App** button

![Creating an app on the Alchemy Dashboard](<../../.gitbook/assets/Screenshot 2022-06-18 at 12.19.18 PM.png>)

Once you have created your app, get your API key that we will use later in this tutorial.

1. Click on your app's **View Key** button in the dashboard
2. Copy and save the **API KEY**

### Step 2: Create a Node project

Let's create an empty repository and install all node dependencies.&#x20;

To make requests to the NFT API, we recommend using the [Alchemy SDK](https://docs.alchemy.com/alchemy/sdk/sdk-quickstart).&#x20;

However, you can also use the `axios` or `fetch` libraries. We provide code samples for each.&#x20;

From your terminal, run the following commands:

{% tabs %}
{% tab title="Alchemy Web3 (Recommended)" %}
```bash
mkdir nft-owner && cd nft-owner
npm init -y
npm install --save @alch/alchemy-sdk
touch main.js
```
{% endtab %}

{% tab title="Axios" %}
```bash
mkdir nft-owner && cd nft-owner
npm init -y
npm install --save axios
touch main.js
```
{% endtab %}

{% tab title="Fetch" %}
```bash
mkdir nft-owner && cd nft-owner
npm init -y
touch main.js
```
{% endtab %}
{% endtabs %}

This will create a repository named `nft-owner` that holds all the files and dependencies we need.&#x20;

Open this repo in your preferred code editor, where we'll write our code in the `main.js` file.

### Step 3: Find the owner of an NFT

To get the owner of a single NFT, use the [`getOwnersForToken`](getOwnersForToken.md) function.&#x20;

**This function accepts two required arguments.**

1. `contractAddress`: The NFT's smart contract address (ERC-721 or ERC-1155)
2. `tokenId`: The ID of the NFT (decimal or hexadecimal format)

We require these two arguments because any NFT on any blockchain can be uniquely identified only by specifying both its contract address and token ID.&#x20;

For more information, check out the [NFT API FAQ.](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api/nft-api-faq#understanding-nft-metadata)

Next, add the following code to the `main.js` file, using your Alchemy API key:

{% tabs %}
{% tab title="Alchemy SDK (Recommended)" %}
```javascript
const { initializeAlchemy, getOwnersForNft } = require('@alch/alchemy-sdk');

// Alchemy app API key
const settings = {
    apiKey: '<-- YOUR ALCHEMY APP API KEY -->',
};

const alchemy = initializeAlchemy(settings);

const main = async () => {
    
    // TIMEPieces contract address
    const address =
        '0xDd69da9a83ceDc730bc4d3C56E96D29Acc05eCDE'

    // Safe Haven Token ID
    const tokenId = 4254

    // Get owner of NFT
    const owner = await getOwnersForNft(alchemy, address, tokenId)
    console.log(owner)
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();
```
{% endtab %}

{% tab title="Axios" %}
```javascript
const axios = require('axios')

// TIMEPieces contract address
const address =
    '0xDd69da9a83ceDc730bc4d3C56E96D29Acc05eCDE'

// Safe Haven Token ID
const tokenId = 4254

// Alchemy API key
const apiKey = '<-- ALCHEMY APP API KEY -->';

// Alchemy URL
const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getOwnersForToken`;
const url = `${baseURL}?contractAddress=${address}&tokenId=${tokenId}`;

const config = {
    method: 'get',
    url: url,
};

axios(config)
    .then(response => console.log(response.data))
    .catch(error => console.log(error));
```
{% endtab %}

{% tab title="Fetch" %}
```javascript
import fetch from 'node-fetch';

// TIMEPieces contract address
const address =
    '0xDd69da9a83ceDc730bc4d3C56E96D29Acc05eCDE'

// Safe Haven Token ID
const tokenId = 4254

// Alchemy API key
const apiKey = '<-- ALCHEMY APP API KEY -->';

// Alchemy URL
const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getOwnersForToken`;
const url = `${baseURL}?contractAddress=${address}&tokenId=${tokenId}`;

var requestOptions = {
  method: 'get',
  redirect: 'follow'
};

fetch(url, requestOptions)
  .then(response => console.log)
  .catch(error => console.log('error', error))
```
{% endtab %}
{% endtabs %}

Run this script by running the following command in your terminal:

```bash
node main.js
```

If successful, you should see output that looks something like this:

```
{ owners: [ '0xc9391d1ea5d092f774cf66312a9a347aaedf95a5' ] }
```

Since the NFT we were interested in was of the ERC-721 standard, we retrieved an array with only a single wallet address as the owner.&#x20;

If we were retrieving information for an ERC-1155 NFT, which can have multiple owners, the array might contain multiple wallet addresses.

## Conclusion

You now know how to [use the Alchemy NFT API to check the owner of an NFT](https://www.alchemy.com/nft-api?a=d3d4c6ebf1).&#x20;

If you enjoyed this tutorial about how to get all NFTs owned by an address, tweet us at **@AlchemyPlatform** and give the authors **@rounak\_banik** and **@ankg404** a shoutout!

Don't forget to join our [Discord server](https://www.alchemy.com/discord) to meet other blockchain devs, builders, and entrepreneurs!
