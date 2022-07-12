---
description: >-
  This tutorial describes how to mint an NFT using the ethers library, and the
  smart contract from Part I: How to Create an NFT.
---

# How to Mint an NFT with Ethers

_Estimated time to complete this guide: \~10 minutes_\
\_\_

_Minting an NFT_ is the act of publishing a unique instance of an ERC721 token on the blockchain. Now that we have successfully [deployed a smart contract to the Goerli network in Part I](https://docs.alchemyapi.io/alchemy/tutorials/how-to-write-and-deploy-a-nft-smart-contract) of this NFT tutorial series, let's flex our web3 skills and mint an NFT!

At the end of this tutorial, you'll be able to mint as many NFTs as you'd like with this code —let's get started!

## Creating the Mint NFT Script

### Step 1: Create an Alchemy Provider using ethers

Open the repository from Part 1 in your favorite code editor (e.g. VSCode), and create a new file in the `scripts` folder called `mint-nft.js`. We will be using the `ethers` library from Part 1 to connect to the Alchemy Provider. Add the following code to the file:

```javascript
require('dotenv').config();
const ethers = require('ethers');

// Get Alchemy API Key
const API_KEY = process.env.API_KEY;

// Define an Alchemy Provider
const provider = new ethers.providers.AlchemyProvider('goerli', API_URL)
```

Note that we are using `API_KEY` and not `API_URL`. Make sure you add this to your `.env` file so that it looks something like this:

```
API_URL = "https://eth-ropsten.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
API_KEY = "your-api-key"
```

### Step 2: Grab your contract ABI <a href="#step-3-grab-your-contract-abi" id="step-3-grab-your-contract-abi"></a>

The contract ABI (Application Binary Interface) is an interface to interact with our smart contract. You can learn more about Contract ABIs [here](https://docs.alchemyapi.io/alchemy/guides/eth\_getlogs#what-are-ab-is). Hardhat automatically generates an ABI for us and saves it in the `MyNFT.json` file. In order to use this we'll need to parse out the contents by adding the following code to the `mint-nft.js` file:

```javascript
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
```

If you want to see the ABI you can print it to your console:

```javascript
console.log(JSON.stringify(contract.abi));
```

To run  and see your ABI printed to the console navigate to your terminal and run

```bash
node scripts/mint-nft.js
```

### Step 3: Configure the metadata of your NFT using IPFS <a href="#step-4-configure-the-metadata-for-your-nft-using-ipfs" id="step-4-configure-the-metadata-for-your-nft-using-ipfs"></a>

Our `mintNFT` smart contract function takes in a `tokenURI` parameter that should resolve to a JSON document describing the NFT's metadata— which is really what brings the NFT to life, allowing it to have configurable properties, such as a name, description, image, and other attributes.

> Interplanetary File System (IPFS) is a decentralized protocol and peer-to-peer network for storing and sharing data in a distributed file system.

We will use [Pinata](https://pinata.cloud), a convenient IPFS API and toolkit, to store our NFT asset and metadata and ensure that our NFT is truly decentralized. If you don't have a Pinata account, sign up for a free account [here](https://pinata.cloud/signup).

Once you've created an account:

* Navigate to the _Pinata Upload_ button on the top right
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

Feel free to change the data in the json. You can add or remove attributes. Most importantly, make sure the image field points to the location of your IPFS image— otherwise, your NFT will not include a photo of a (very cute!) dog.

Once you're done editing the json file, save it and upload it to Pinata, following the same steps we did for uploading the image.

![](https://static.slab.com/prod/uploads/7adb25ff/posts/images/77NWEdyRHvtY4Da2CGi2S4SW.gif)

### Step 4: Create a Signer and an Instance of the Contract <a href="#step-5-create-an-instance-of-your-contract" id="step-5-create-an-instance-of-your-contract"></a>

In order to be able to call the functions on our deployed contract, we need to define an ethers `Signer` using our wallet's private key. Next we need to use the contract's deployed address, the contract ABI, and the aforementioned signer to define a `contract` instance.

In the `mint-nft.js` file, add the following code:

```javascript
// Create a signer
const privateKey = process.env.PRIVATE_KEY
const signer = new ethers.Wallet(privateKey, provider)

// Get contract ABI and address
const abi = contract.abi
const contractAddress = '0xA4766Ceb9E84a71D282A4CED9fB8Fe93C49b2Ff7'

// Create a contract instance
const myNftContract = new ethers.Contract(contractAddress, abi, signer)
```

In the snippet above, you can see that our contract's deployed address is `0xA4766Ceb9E84a71D282A4CED9fB8Fe93C49b2Ff7`. If you don't remember your contract address or can't find it on Etherscan, simply re-deploy the contract from Part 1 again and note down the new address.

### Step 5: Call mintNFT function of the contract

Remember the metadata.json you uploaded to Pinata? Get its hashcode from Pinata and pass the following into a call to `mintNFT` [https://gateway.pinata.cloud/ipfs/\<metadata-hash-code>](https://gateway.pinata.cloud/ipfs/%3Chash-code%3E)

Here's how to get the hashcode:

![](https://static.slab.com/prod/uploads/7adb25ff/posts/images/AnI4KrRVhT6RWzcXcivtp9ig.gif)

{% hint style="warning" %}
Double check that the hashcode you copied links to your **metadata.json** by loading [https://gateway.pinata.cloud/ipfs/\<metadata-hash-code>](https://gateway.pinata.cloud/ipfs/%3Chash-code%3E) into a separate window. The page should look similar to the screenshot below:
{% endhint %}

![](<../../.gitbook/assets/image (5).png>)

Now add the following piece of code to `mint-nft.js` to call the `mintNFT` function:

```javascript
// Get the NFT Metadata IPFS URL
const tokenUri = "https://gateway.pinata.cloud/ipfs/QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP"

// Call mintNFT function
const mintNFT = async () => {
    let nftTxn = await myNftContract.mintNFT(signer.address, tokenUri)
    await nftTxn.wait()
    console.log(`NFT Minted! Check it out at: https://goerli.etherscan.io/tx/${nftTxn.hash}`)
}

mintNFT()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });java
```

The final `mint-nft.js` file should look something like this:

```javascript
require('dotenv').config();
const ethers = require('ethers');

// Get Alchemy App URL
const API_KEY = process.env.API_KEY;

// Define an Alchemy Provider
const provider = new ethers.providers.AlchemyProvider('goerli', API_KEY)

// Get contract ABI file
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");

// Create a signer
const privateKey = process.env.PRIVATE_KEY
const signer = new ethers.Wallet(privateKey, provider)

// Get contract ABI and address
const abi = contract.abi
const contractAddress = '0xA4766Ceb9E84a71D282A4CED9fB8Fe93C49b2Ff7'

// Create a contract instance
const myNftContract = new ethers.Contract(contractAddress, abi, signer)

// Get the NFT Metadata IPFS URL
const tokenUri = "https://gateway.pinata.cloud/ipfs/QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP"

// Call mintNFT function
const mintNFT = async () => {
    let nftTxn = await myNftContract.mintNFT(signer.address, tokenUri)
    await nftTxn.wait()
    console.log(`NFT Minted! Check it out at: https://goerli.etherscan.io/tx/${nftTxn.hash}`)
}

mintNFT()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });


```

We're all set. Let's mint our NFT by running the following command:

```bash
node scripts/mint-nft.js
```

You should get output that looks something like this:

```
NFT Minted! Check it out at: https://goerli.etherscan.io/tx/0x06a7a06aea5d55eb6e7a0f0f17bfeaad2fb4e310de55f5a884e1b623a3fab080
```

You can check out your NFT mint on Etherscan by following the URL above.&#x20;

![NFT Minting Transactions](<../../.gitbook/assets/Screenshot 2022-07-12 at 7.32.31 PM.png>)

You can view your NFT on OpenSea by searching for your contract address. Check out [our NFT here](https://testnets.opensea.io/collection/mynft-zmdehpzacz).

Using the `mint-nft.js` you can mint as many NFT's as your heart (and wallet) desires! Just be sure to pass in a new `tokenURI` describing the NFT's metadata --otherwise, you'll just end up making a bunch of identical ones with different IDs.

Presumably, you'd like to be able to show off your NFT in your wallet 😉— so be sure to check out Part III: [How to View Your NFT in Your Wallet](https://docs.alchemyapi.io/alchemy/tutorials/how-to-write-and-deploy-a-nft-smart-contract/how-to-view-your-nft-in-your-wallet).
