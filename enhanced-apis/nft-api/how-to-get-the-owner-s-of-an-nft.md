---
description: Learn how to get ownership information of NFTs using the Alchemy NFT API
---

# How to Get the Owner(s) of an NFT

One of the most fundamental aspects of an NFT is ownership. Whether you're building an NFT marketplace like [OpenSea](https://opensea.io/), a wallet like [Rainbow](https://rainbow.me/), or an analytics platform like [rarity.tools](https://rarity.tools/), it is imperative you provide information on which NFTs are owned by which wallets.

![A Beeple NFT owned by chronology.eth](<../../.gitbook/assets/Screenshot 2022-06-18 at 12.02.00 PM.png>)

An NFT can have a single owner (ERC-721) or multiple owners (ERC-1155). Typically, getting ownership data on an NFT requires you to spin up a node, call functions on the contract you're interested in, and parse the output. You can however replace these steps with a single API call using Alchemy.

In this tutorial, we will use the Alchemy NFT API to get the owners of a particular NFT.

## Our Example

In our example, we will write a script in Node that retrieves ownership information of an NFT called [Safe Haven](https://opensea.io/assets/ethereum/0xdd69da9a83cedc730bc4d3c56e96d29acc05ecde/4254) from the [TIMEPieces](https://opensea.io/collection/timepieces-build-a-better-future-genesis-drop) NFT collection. We will achieve this by using [Alchemy](https://alchemy.com/?a=e1a99cf277) and the [NFT API](./).

## Creating the NFT Owner Script

### Prerequisites

Before you begin the steps in this tutorial, ensure you complete the following steps:&#x20;

* Install both[ Node.js ](https://nodejs.org/en/)(> 14) and [npm](https://www.npmjs.com/) on your local machine. If you do not have node or npm already installed you can find instructions to install them [here](../../guides/how-to-set-up-core-web3-developer-tools.md). To check your Node version, run the following command in your terminal:

```bash
node -v
```

* [Create a free Alchemy account.](https://alchemy.com/?a=e1a99cf277)

### Step 1: Create an Alchemy app

To create an Alchemy app:

1. From [Alchemy's dashboard](https://dashboard.alchemyapi.io/), hover over the **Apps** drop-down menu and choose **Create App**.
2. Provide a **Name** and **Description** for your app. For **Chain**, select **Ethereum** and for **Network** select **Mainnet**.&#x20;
3. Click the **Create App** button.&#x20;

![Creating an app on the Alchemy Dashboard](<../../.gitbook/assets/Screenshot 2022-06-18 at 12.19.18 PM.png>)

Once you have created your app, click on your app's **View Key** button in the dashboard and save the **API KEY**. We will use this later.

### Step 2: Create a Node project

Let's create an empty repository and install all node dependencies. In order to make requests to the NFT API, we recommend using the [Alchemy SDK](https://docs.alchemy.com/alchemy/sdk/sdk-quickstart). However, you can also use the `axios` or `fetch` libraries. We provide code samples for each. Run the following commands in your terminal:

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

This should create a repository named `nft-owner` that holds all the files and dependencies we need. Open this repo in your preferred code editor (e.g., VS Code). We will write the remainder of our code in the `main.js` file.

### Step 3: Get the owner of a particular NFT

To get the owner of a particular NFT, we will use the `getOwnersForToken` function. This function accepts two required arguments.

* `contractAddress`: The address of the contract that the NFT belongs to. This can be either an ERC-721 or an ERC-1155 contract.
* `tokenId`: The ID of the NFT we're interested in. This can be in either decimal or hexadecimal format.

We require these two arguments because any NFT on any blockchain can be uniquely identified only by specifying both its contract address and token ID. For more information, check out the [NFT API FAQ.](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api/nft-api-faq#understanding-nft-metadata)

Add the following code to the `main.js` file, using your Alchemy API key:

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

Since the NFT we were interested in was of the ERC-721 standard, we retrieved an array with only a single wallet address as the owner. If we were retrieving information for an ERC-1155 NFT, which can have multiple owners, the array might contain multiple wallet addresses.

## Conclusion

Congratulations! You now know how to use the Alchemy NFT API to retrieve ownership information for any NFT. You can adapt this for any network (e.g., Ethereum, Polygon, etc.).

If you enjoyed this tutorial about how to get all NFTs owned by an address, tweet us at [@AlchemyPlatform](https://twitter.com/AlchemyPlatform) and give the authors [@rounak\_banik](https://twitter.com/Rounak\_Banik) and [@ankg404](https://twitter.com/ankg404) a shoutout!

Don't forget to join our [Discord server](https://www.alchemy.com/discord) to meet other blockchain devs, builders, and entrepreneurs!

Ready to start using the Alchemy NFT API?

[Create a free Alchemy account ](https://alchemy.com/?a=e1a99cf277)and do share your project with us!
