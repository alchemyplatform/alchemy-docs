---
description: >-
  Learn how to trace the ownership history of an NFT using the Alchemy Transfers
  API
---

# How to get the transfer history of an NFT

If you're building a marketplace like [OpenSea](https://opensea.io/), an NFT price estimator, or an analytics platform like [Nansen](https://www.nansen.ai/), chances are you will want to trace the ownership history of an NFT and display this information to your customers.

![An example of BAYC #5672's transfer history](<../../.gitbook/assets/Screenshot 2022-06-28 at 2.44.24 PM.png>)

There are a couple of ways to trace the ownership history of an NFT. One way is to parse all transactions of the blockchain since the genesis block, filter for transactions associated with the NFT, then display that information in a human-readable format. Typically, this method involves a massive amount of engineering resources and time.Typically, this involves a massive amount of engineering resources and time.

A more straightforward way is to use Alchemy's [Transfers API](https://docs.alchemy.com/alchemy/enhanced-apis/transfers-api) and bypass the effort required to ingest and analyze an entire blockchain. This article details how to use the Alchemy Transfer API to get the ownership and transfer history of an NFT.

## Creating the NFT Transfer History Script

In this tutorial, we will write a script in Node that retrieves the transfer history of an NFT in the Bored Ape Yacht Club collection. We will achieve this by using [Alchemy](https://alchemy.com/?a=e1a99cf277) and the [Transfers API](https://docs.alchemy.com/alchemy/enhanced-apis/transfers-api).

![](<../../.gitbook/assets/Screenshot 2022-06-28 at 2.56.30 PM.png>)

### Prerequisites

Before you begin the steps in this tutorial, ensure you complete the following steps:

* Install both[ Node.js ](https://nodejs.org/en/)(> 14) and [npm](https://www.npmjs.com/) on your local machine.&#x20;
  * If you do not have node or npm installed, you can find instructions to install them [here](../../guides/how-to-set-up-core-web3-developer-tools.md). To check your Node version, run the following command in your terminal:

```bash
node -v
```

* [Create a free Alchemy account.](https://alchemy.com/?a=e1a99cf277)

### Step 1: Create an Alchemy app

To create an Alchemy app:

1. From [Alchemy's dashboard](https://dashboard.alchemyapi.io/), hover over the **Apps** drop-down menu and choose **Create App**.
2. Fill out the fields in the **Create App** form:
   * Provide a **Name** and **Description** for your app.&#x20;
   * For **Chain**, select **Ethereum.**&#x20;
   * For **Network** select **Mainnet**.&#x20;
3. Click the **Create App** button.&#x20;

![Creating an app on the Alchemy Dashboard](<../../.gitbook/assets/Screenshot 2022-06-28 at 2.57.06 PM.png>)

Once you have created your app, click on your app's **View Key** button in the dashboard and save the **API KEY**. We will use this later.

### Step 2: Create a Node project

Let's create an empty repository and install all node dependencies. We recommend using the [Alchemy SDK](https://docs.alchemy.com/alchemy/sdk/sdk-quickstart) to make requests to the Transfers API. However, you can also use the `axios` or `fetch` libraries. We provide code samples for all three methods. Run the following commands in your terminal:

{% tabs %}
{% tab title="Alchemy Web3 (Recommended)" %}
```bash
mkdir nft-transfers && cd nft-transfers
npm init -y
npm install --save @alch/alchemy-sdk web3
touch main.js
```
{% endtab %}

{% tab title="Axios" %}
```bash
mkdir nft-transfers && cd nft-transfers
npm init -y
npm install --save axios web3
touch main.js
```
{% endtab %}

{% tab title="Fetch" %}
```bash
mkdir nft-transfers && cd nft-transfers
npm init -y
npm install --save web3
touch main.js
```
{% endtab %}
{% endtabs %}

This creates a repository named `nft-transfers` with all the files and dependencies we need. Open this repo in your preferred code editor (e.g., VS Code). We will write the remainder of our code in the `main.js` file.

### Step 3: Get the transfer history of a particular NFT

To get the transfer history of a particular NFT, we will use the `getAssetTransfers` function. This function accepts several required and optional arguments. In our example, we will use the following arguments:

* `fromBlock`: The block to start tracing transfer history from. We will set this to the genesis block or `0x0`.
* `contractAddresses`: A list of contract addresses we want to trace transfer history for. In our case, this will be just the [main BAYC contract.](https://etherscan.io/address/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d)
* `category`: A list of categories of transactions we want to track. In our case, we only want to track `erc721` and `token` transactions.
* `excludeZeroValue`: A Boolean flag to exclude transfers with zero value. We will set this to `false` since we are interested in all transfers.

The function also takes in other arguments that allow us to filter transactions by origin wallet address, destination wallet address, etc. For the list of parameters, check out the [Transfers API documentation.](https://docs.alchemy.com/alchemy/enhanced-apis/transfers-api)

By default, Alchemy returns only the first 1000 transactions recorded for that particular smart contract. If you want to get subsequent transactions, you need to set the `pageKey` argument.

Since the BAYC contract has hundreds of thousands of transactions, we will focus on only the first 1000 for the sake of simplicity.

Add the following code to the `main.js` file, being sure to use your Alchemy API key:

{% tabs %}
{% tab title="Alchemy SDK (Recommended)" %}
```javascript
const { initializeAlchemy, getAssetTransfers } = require('@alch/alchemy-sdk');
const web3 = require('web3')

// Alchemy app API key
const settings = {
    apiKey: '<-- YOUR ALCHEMY APP API KEY -->',
};

const alchemy = initializeAlchemy(settings);

const main = async () => {
    
    // Contract address
    const address = ['0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D']

    // Get all NFTs
    const response = await getAssetTransfers(alchemy, {
        fromBlock: "0x0",
        contractAddresses: address,
        category: ["erc721"],
        excludeZeroValue: false
    });

    // Set NFT ID
    const nftId = 3;

    // Get transactions for the NFT
    txns = response['transfers'].filter(txn => web3.utils.hexToNumber(txn['erc721TokenId']) === nftId)
    console.log(txns)
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
const web3 = require('web3')

// BAYC contract address
const address =
    ['0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D']

// NFT Token ID
const nftId = 3 

// Alchemy API key
const apiKey = '<-- ALCHEMY APP API KEY -->';

var data = JSON.stringify({
  "jsonrpc": "2.0",
  "id": 0,
  "method": "alchemy_getAssetTransfers",
  "params": [
    {
      "fromBlock": "0x0",
      "contractAddresses": address,
      "excludeZeroValue": false,
      "category": ["erc721"],
    }
  ]
});

var config = {
  method: 'post',
  url: `https://eth-mainnet.alchemyapi.io/v2/${apiKey}`,
  headers: {
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  // Get transactions for the NFT
  txns = response['data']['result']['transfers'].filter(
    txn => web3.utils.hexToNumber(txn['erc721TokenId']) === nftId)
  console.log(txns)
})
.catch(function (error) {
  console.log(error);
});
```
{% endtab %}

{% tab title="Fetch" %}
```javascript
import fetch from 'node-fetch';
import web3 from 'web3';

// BAYC contract address
const address =
    ['0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D']

// NFT Token ID
const tokenId = 3

// Alchemy API key
const apiKey = '<-- ALCHEMY APP API KEY -->';

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "jsonrpc": "2.0",
  "id": 0,
  "method": "alchemy_getAssetTransfers",
  "params": [
    {
      "fromBlock": "0x0",
      "contractAddresses": address,
      "excludeZeroValue": false,
      "category": ["erc721"],
    }
  ]
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(`https://eth-mainnet.alchemyapi.io/v2/${apiKey}`, requestOptions)
  .then(response => {
     // Get transactions for the NFT
     txns = response['data']['result']['transfers'].filter(txn => web3.utils.hexToNumber(txn['erc721TokenId']) === nftId)
     console.log(txns)
  })
  .catch(error => console.log('error', error));
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
**Note:** Check out the code comments for more information about what the function achieves.
{% endhint %}

Run this script by typing the following command in your terminal:

```bash
node main.js
```

If successful, you should see output that looks something like this:

```
[
  {
    blockNum: '0xbb933a',
    hash: '0xcfb197f62ec5c7f0e71a11ec0c4a0e394a3aa41db5386e85526f86c84b3f2796',
    from: '0x0000000000000000000000000000000000000000',
    to: '0xaba7161a7fb69c88e16ed9f455ce62b791ee4d03',
    value: null,
    erc721TokenId: '0x0000000000000000000000000000000000000000000000000000000000000003',
    erc1155Metadata: null,
    tokenId: '0x0000000000000000000000000000000000000000000000000000000000000003',
    asset: 'BAYC',
    category: 'erc721',
    rawContract: {
      value: null,
      address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
      decimal: null
    }
  },
  {
    blockNum: '0xbc5b5a',
    hash: '0x3c6c5ea49f24ba9fedd8c2de7016564f124ce562cf719581efd484d36e4e5b10',
    from: '0xaba7161a7fb69c88e16ed9f455ce62b791ee4d03',
    to: '0x03546b22bc80b3e6b64c4445963d981250267a68',
    value: null,
    erc721TokenId: '0x0000000000000000000000000000000000000000000000000000000000000003',
    erc1155Metadata: null,
    tokenId: '0x0000000000000000000000000000000000000000000000000000000000000003',
    asset: 'BAYC',
    category: 'erc721',
    rawContract: {
      value: null,
      address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
      decimal: null
    }
  }
]
```

You can see that the BAYC #3 was minted to address `0xab..03` and then transferred from `0xab..03` to `0x03..68`.

## Conclusion

Congratulations! You just used the Alchemy Transfer's API to retrieve the transfer history for BAYC #3! You can adapt this script to retrieve the history for other NFTs in a collection or even for collections on other blockchain networks (e.g., Polygon).

If you enjoyed this tutorial about how to trace the transfer history of NFTs, tweet us at [@AlchemyPlatform](https://twitter.com/AlchemyPlatform) and give the authors [@rounak\_banik](https://twitter.com/Rounak\_Banik) and [@ankg404](https://twitter.com/ankg404) a shoutout!

Don't forget to join our [Discord server](https://www.alchemy.com/discord) to meet other blockchain devs, builders, and entrepreneurs!

Ready to start using the Alchemy NFT API? [Create a free Alchemy account ](https://alchemy.com/?a=e1a99cf277)and do share your project with us!
