---
description: >-
  This tutorial describes how to mint an NFT on the Ethereum blockchain using
  Web3 and our smart contract from Part I: How to Create an NFT
---

# 🏗 How to Mint an NFT Using Web3.js (option 1)

_Estimated time to complete this guide: \~10 minutes_

{% hint style="warning" %}
If you've already completed  "How to Mint an NFT with Ethers.js (option 2)", you do not need to complete this tutorial!
{% endhint %}

"Minting an NFT" is the act of publishing a unique instance of your ERC721 token on the blockchain. Now that we successfully [deployed a smart contract to the Ropsten network in Part I](https://docs.alchemyapi.io/alchemy/tutorials/how-to-write-and-deploy-a-nft-smart-contract) of this NFT tutorial series, let's flex our web3 skills and mint an NFT!

At the end of this tutorial, you'll be able to mint as many NFTs as you'd like with this code —let's get started!

### Step 1: Install web3 <a href="step-1-install-web-3" id="step-1-install-web-3"></a>

If you followed the first tutorial on [creating your NFT smart contract](https://docs.alchemyapi.io/alchemy/tutorials/hello-world-smart-contract#create-and-deploy-your-smart-contract-using-hardhat), you already have experience using Ethers.js. Web3 is similar to Ethers, as it is a library used to make creating requests to the Ethereum blockchain easier. In this tutorial we'll be using [Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3), which is an enhanced web3 library that offers automatic retries and robust WebSocket support.

In your project home directory run:

```
npm install @alch/alchemy-web3
```

### Step 2: Create a mint-nft.js file <a href="step-2-create-a-mint-nft-js-file" id="step-2-create-a-mint-nft-js-file"></a>

Inside your scripts directory, create an `mint-nft.js` file and add the following lines of code:

```
require('dotenv').config();
const API_URL = process.env.API_URL;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);
```

### Step 3: Grab your contract ABI <a href="step-3-grab-your-contract-abi" id="step-3-grab-your-contract-abi"></a>

Our contract ABI (Application Binary Interface) is the interface to interact with our smart contract. You can learn more about Contract ABIs [here](https://docs.alchemyapi.io/alchemy/guides/eth_getlogs#what-are-ab-is). Hardhat automatically generates an ABI for us and saves it in the MyNFT.json file. In order to use this we'll need to parse out the contents by adding the following lines of code to our `mint-nft.js` file:

```
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
```

If you want to see the ABI you can print it to your console:

```
console.log(JSON.stringify(contract.abi));
```

To run `mint-nft.js`and see your ABI printed to the console navigate to your terminal and run

```
node scripts/mint-nft.js
```

### Step 4: Configure the metadata for your NFT using IPFS <a href="step-4-configure-the-metadata-for-your-nft-using-ipfs" id="step-4-configure-the-metadata-for-your-nft-using-ipfs"></a>

If you remember from our tutorial in Part I, our `mintNFT` smart contract function takes in a tokenURI parameter that should resolve to a JSON document describing the NFT's metadata— which is really what brings the NFT to life, allowing it to have configurable properties, such as a name, description, image, and other attributes.

> Interplanetary File System (IPFS) is a decentralized protocol and peer-to-peer network for storing and sharing data in a distributed file system.

We will use [Pinata](https://pinata.cloud), a convenient IPFS API and toolkit, to store our NFT asset and metadata to ensure our NFT is truly decentralized. If you don't have a Pinata account, sign up for a free account [here](https://pinata.cloud/signup) and complete the steps to verify your email.

Once you've created an account:

* Navigate to the "Pinata Upload" button on the top right
* Upload an image to pinata - this will be the image asset for your NFT. Feel free to name the asset whatever you wish
* After you upload, at the top of the page, there should be a green popup that allows you to view the hash of your upload —> Copy that hashcode. You can view your upload at: [https://gateway.pinata.cloud/ipfs/<](https://gateway.pinata.cloud/ipfs/QmarPqdEuzh5RsWpyH2hZ3qSXBCzC5RyK3ZHnFkAsk7u2f)hash-code>

For the more visual learners, the steps above are summarized here: Now, we're going to want to upload one more document to Pinata. But before we do that, we need to create it!

![](https://static.slab.com/prod/uploads/7adb25ff/posts/images/gcCjisV9jQvt6CYOjUkM1NxU.gif)

In your root directory, make a new file called nft-metadata.json and add the following json code:

```
{
    "attributes" : [ {
      "trait_type" : "Breed",
      "value" : "Maltipoo"
    }, {
      "trait_type" : "Eye color",
      "value" : "Mocha"
    } ],
    "description" : "The world's most adorable and sensitive pup.",
    "image" : "https://gateway.pinata.cloud/ipfs/QmWmvTJmJU3pozR9ZHFmQC2DNDwi2XJtf3QGyYiiagFSWb",
    "name" : "Ramses"
}
```

Feel free to change the data in the json. You can remove or add to the attributes section. Most importantly, make sure the image field points to the location of your IPFS image— otherwise, your NFT will include a photo of a (very cute!) dog.

Once you're done editing the json file, save it and upload it to Pinata, following the same steps we did for uploading the image.

![](https://static.slab.com/prod/uploads/7adb25ff/posts/images/77NWEdyRHvtY4Da2CGi2S4SW.gif)

### Step 5: Create an instance of your contract <a href="step-5-create-an-instance-of-your-contract" id="step-5-create-an-instance-of-your-contract"></a>

Now, to interact with our contract, we need to create an instance of it in our code. To do so we'll need our contract address which we can get from the deployment or [Etherscan](https://ropsten.etherscan.io) by looking up the address you used to deploy the contract.

![](https://static.slab.com/prod/uploads/7adb25ff/posts/images/Bz93i5qS3V3oat0VNorEsHvf.png)

In the above example, our contract address is `0x81c587EB0fE773404c42c1d2666b5f557C470eED.`

Next we will use the web3 [contract method](https://web3js.readthedocs.io/en/v1.2.0/web3-eth-contract.html?highlight=constructor#web3-eth-contract) to create our contract using the ABI and address. In your `mint-nft.js` file, add the following:

```
const contractAddress = "0x81c587EB0fE773404c42c1d2666b5f557C470eED";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);
```

### Step 6: Update the `.env` file <a href="step-6-update-the-env-file" id="step-6-update-the-env-file"></a>

Now, in order to create and send transactions to the Ethereum chain, we'll use your public ethereum account address to get the account `nonce` (will explain below).

Add your public key to your `.env` file —if you completed part 1 of the tutorial, our .`env` file should now look like this:

```
API_URL = "https://eth-ropsten.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

### Step 7: Create your transaction <a href="step-7-create-your-transaction" id="step-7-create-your-transaction"></a>

First, let's define a function called `mintNFT(tokenData)` and create our transaction by doing the following:

1. Grab your `PRIVATE_KEY` and `PUBLIC_KEY` from the .env file.
2. Next, we'll need to figure out the account `nonce`. The nonce specification is used to keep track of the number of transactions sent from your address— which we need for security purposes and to prevent [replay attacks](https://docs.alchemyapi.io/alchemy/resources/blockchain-glossary#account-nonce). To get the number of transactions sent from your address, we use [getTransactionCount](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount).
3. Finally we'll set up our `transaction` with the following info:
4. `'from': PUBLIC_KEY` : The origin of our transaction is our public address
5. `'to': contractAddress` : The contract we wish to interact with and send the transaction
6. `'nonce': nonce` : The account nonce with the number of transactions sent from our address
7. `'gas': estimatedGas` : The estimated gas needed to complete the transaction
8. `'maxPriorityFeePerGas': estimatedFee`: The estimated fee to bid per gas.
9. `'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()` : The computation we wish to perform in this transaction— which in this case is minting an NFT

Your `mint-nft.js` file should look like this now:

```javascript
require('dotenv').config();
const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
const contractAddress = "0x81c587EB0fE773404c42c1d2666b5f557C470eED";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce

  //the transaction
  const tx = {
    'from': PUBLIC_KEY,
    'to': contractAddress,
    'nonce': nonce,
    'gas': 500000,
    'maxPriorityFeePerGas': 1999999987,
    'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
  };
}​
```

{% hint style="info" %}
## How can I mint multiple NFTs? <a href="how-do-i-distinguish-between-a-contract-address-and-a-wallet-address" id="how-do-i-distinguish-between-a-contract-address-and-a-wallet-address"></a>

To mint `x` number of NFTs in a single command, we can use a simple `for loop` running from `0` to `x-1` within a function wrapping the minting process. This would allow us to effectively mint `x` NFTs every time the wrapper mint function is called.
{% endhint %}

### Step 8: Sign the transaction <a href="step-8-sign-the-transaction" id="step-8-sign-the-transaction"></a>

Now that we've created our transaction, we need to sign it in order to send it off. Here is where we'll use our private key.

`web3.eth.sendSignedTransaction` will give us the transaction hash, which we can use to make sure our transaction was mined and didn't get dropped by the network. You'll notice in the transaction signing section, we've added some error checking so we know if our transaction successfully went through.

```javascript
require('dotenv').config();
const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
const contractAddress = "0x81c587EB0fE773404c42c1d2666b5f557C470eED";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce

  //the transaction
  const tx = {
    'from': PUBLIC_KEY,
    'to': contractAddress,
    'nonce': nonce,
    'gas': 500000,
    'maxPriorityFeePerGas': 1999999987,
    'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
  };


  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  signPromise.then((signedTx) => {

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(err, hash) {
      if (!err) {
        console.log("The hash of your transaction is: ", hash, "\nCheck Alchemy's Mempool to view the status of your transaction!"); 
      } else {
        console.log("Something went wrong when submitting your transaction:", err)
      }
    });
  }).catch((err) => {
    console.log("Promise failed:", err);
  });
}
```

### Step 9: Call `mintNFT` and run `node scripts/mint-nft.js` <a href="step-9-call-mint-nft-and-run-node-contract-interact-js" id="step-9-call-mint-nft-and-run-node-contract-interact-js"></a>

Remember the metadata.json you uploaded to Pinata? Get its hashcode from Pinata and pass the following into a call to `mintNFT` [https://gateway.pinata.cloud/ipfs/\<metadata-hash-code>](https://gateway.pinata.cloud/ipfs/%3Chash-code%3E)

Here's how to get the hashcode:

![](https://static.slab.com/prod/uploads/7adb25ff/posts/images/AnI4KrRVhT6RWzcXcivtp9ig.gif)

{% hint style="warning" %}
Double check that the hashcode you copied links to your **metadata.json** by loading [https://gateway.pinata.cloud/ipfs/\<metadata-hash-code>](https://gateway.pinata.cloud/ipfs/%3Chash-code%3E) into a separate window. The page should look similar to the screenshot below:
{% endhint %}

![](<../../.gitbook/assets/image (1).png>)

Altogether, your code should look something like this:

```javascript
require('dotenv').config();
const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
const contractAddress = "0x81c587EB0fE773404c42c1d2666b5f557C470eED";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce

  //the transaction
  const tx = {
    'from': PUBLIC_KEY,
    'to': contractAddress,
    'nonce': nonce,
    'gas': 500000,
    'maxPriorityFeePerGas': 1999999987,
    'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
  };

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  signPromise.then((signedTx) => {

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(err, hash) {
      if (!err) {
        console.log("The hash of your transaction is: ", hash, "\nCheck Alchemy's Mempool to view the status of your transaction!"); 
      } else {
        console.log("Something went wrong when submitting your transaction:", err)
      }
    });
  }).catch((err) => {
    console.log("Promise failed:", err);
  });
}

mintNFT("https://gateway.pinata.cloud/ipfs/QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP");
```

Now, run `node scripts/mint-nft.js` to deploy your NFT. After a couple of seconds, you should see a response like this in your terminal :

```
The hash of your transaction is: 0x10e5062309de0cd0be7edc92e8dbab191aa2791111c44274483fa766039e0e00
Check Alchemy's Mempool to view the status of your transaction!
```

Next, visit your [Alchemy mempool](https://dashboard.alchemyapi.io/mempool) to see the status of your transaction (whether it's pending, mined, or got dropped by the network). If your transaction got dropped, it's also helpful to check [Ropsten Etherscan](https://ropsten.etherscan.io) and search for your transaction hash.

![](https://static.slab.com/prod/uploads/7adb25ff/posts/images/8mFvcM8er_zqvFq7TyKrMEhr.png)

And that's it! You've now deployed AND minted an NFT on the Ethereum blockchain 🎉

Using the `mint-nft.js` you can mint as many NFT's as your heart (and wallet) desires! Just be sure to pass in a new `tokenURI` describing the NFT's metadata --otherwise, you'll just end up making a bunch of identical ones with different IDs.

Presumably, you'd like to be able to show off your NFT in your wallet 😉— so be sure to check out Part III: [How to View Your NFT in Your Wallet](https://docs.alchemyapi.io/alchemy/tutorials/how-to-write-and-deploy-a-nft-smart-contract/how-to-view-your-nft-in-your-wallet).
