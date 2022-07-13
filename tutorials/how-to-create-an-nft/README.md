---
description: >-
  This tutorial will walk you through writing and deploying a Non Fungible
  (ERC721) Token smart contract using Ethereum and Inter Planetary File System
  (IPFS).
---

# How to Create an NFT Tutorial

_Estimated time to complete this guide: \~15 minutes_

Even if you've been living under a rock, you'll have noticed that every major news outlet has been profiling the rise of NFTs.

With NFTs bringing blockchain into the public eye, now is an excellent opportunity to understand the hype yourself by publishing your own NFT (ERC-721 Token) on the Ethereum blockchain!

In this tutorial, we will walk through creating and deploying an ERC-721 smart contract on the Goerli test network using [Metamask](https://metamask.io), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org), [Pinata](https://pinata.cloud) and [Alchemy](https://alchemy.com/?r=affiliate:68212b46-a5c5-4f4c-bc8b-73f50536fcaf) (don’t fret if you don’t understand what any of this means yet— we will explain it). In Part II of this tutorial\_,\_ we’ll go through how we can use our smart contract to [mint an NFT](https://docs.alchemyapi.io/alchemy/tutorials/how-to-write-and-deploy-a-nft-smart-contract/how-to-mint-a-nft), and in Part III we’ll cover how to [view your NFT on Metamask](https://docs.alchemyapi.io/alchemy/tutorials/how-to-write-and-deploy-a-nft-smart-contract/how-to-view-your-nft-in-your-wallet).

And of course, if you have questions at any point, don't hesitate to reach out in the [Alchemy Discord](https://discord.gg/gWuC7zB)!

## Creating an NFT

### Prerequisites

Before you begin the steps in this tutorial, ensure you complete the following steps:&#x20;

* Install both[ Node.js ](https://nodejs.org/en/)(> 14) and [npm](https://www.npmjs.com/) on your local machine. To check your Node version, run the following command in your terminal:

```bash
node -v
```

* [Create a free Alchemy account.](https://alchemy.com/?r=affiliate:68212b46-a5c5-4f4c-bc8b-73f50536fcaf)

### Step 1: Create an Alchemy app

To create an Alchemy app, check out [this video](https://www.youtube.com/watch?v=tfggWxfG9o0) or follow the instructions below:

1. From [Alchemy's dashboard](https://dashboard.alchemyapi.io/), hover over the **Apps** drop-down menu and choose **Create App**.
2. Provide a **Name** and **Description** for your app.&#x20;
3. For **Chain**, select **Ethereum** and for **Network** select **Goerli**.&#x20;
4. Click the **Create App** button.&#x20;

![Creating an Alchemy App](<../../.gitbook/assets/Screenshot 2022-07-12 at 3.21.22 PM.png>)

Once you have created your app, click on your app's **View Key** button in the dashboard and save the **API KEY**. We will use this later.

### Step 2: Create a Metamask Wallet

We need an Ethereum wallet to send and receive transactions. For this tutorial, we’ll use Metamask, a virtual wallet in the browser. If you want to understand more about how transactions on Ethereum work, check out [this page](https://ethereum.org/en/developers/docs/transactions/) from the Ethereum foundation.

You can download and create a Metamask account for free [here](https://metamask.io/download.html). Once you have an account, make sure to switch to the “Goerli Test Network” in the upper right (so that we’re not dealing with real money).

![](<../../.gitbook/assets/Screenshot 2022-07-12 at 2.18.11 PM.png>)

### Step 3: Add GoerliETH from a Faucet

In order to deploy our smart contract to the test network, we’ll need some fake GoerliETH. The easiest way to acquire this is by using Alchemy's [Goerli faucet](https://goerlifaucet.com/). Depending on traffic, the faucet may ask you to sign in with your Alchemy account.

If all goes well, you should see your GoerliETH balance update on Metamask.

### Step 4: Create a Node Project

Let's create an empty node project. Navigate to your [command line](https://www.computerhope.com/jargon/c/commandi.htm) and type:

```bash
mkdir my-nft && cd my-nft
npm init -y
```

We are now in a good position to set up and install Hardhat, the industry standard Ethereum development environment.

### Step 5: Create a [Hardhat](https://hardhat.org/getting-started/#overview) Project

Hardhat is a development environment to compile, deploy, test, and debug smart contracts. It helps developers create dApps locally before deploying them to a live chain.

In your terminal, run the following commands:

```bash
npm install --save-dev hardhat
npx hardhat
```

You should then see a welcome message and options on what you can do. Select `Create a sample project`:

```
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888
👷 Welcome to Hardhat v2.0.11 👷‍
? What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

Agree to all the defaults (project root, adding a `.gitignore`, and installing all sample project dependencies).

To check if everything works properly, run:

```bash
npx hardhat test
```

We now have our hardhat development environment successfully configured. Let us now install the OpenZeppelin contracts package. This will give us access to ERC721 implementations (the standard for NFTs) on top of which we will build our contract.

```bash
npm install @openzeppelin/contracts
```

### Step 6: Write the smart contract

Open the project in your favorite editor (e.g. [VSCode](https://code.visualstudio.com)). We will use a language called Solidity to write our contract.

Navigate to the `contracts` folder and create a new file called `MyNFT.sol`. Add the following code to the file.

{% hint style="warning" %}
**NOTE:** If you want to attach a price to the NFT through the smart contract check out [this tutorial](nft-price.md).
{% endhint %}

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract MyNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() public ERC721("MyNFT", "NFT") {}

    function mintNFT(address recipient, string memory tokenURI)
        public onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}
```

Let's break down the code line by line.

In lines 5-7, our code inherits three [OpenZepplin](https://openzeppelin.com) smart contract classes:

* `@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol` contains the implementation of the ERC721 standard, which our NFT smart contract will inherit. (To be a valid NFT, your smart contract must implement all the methods of the ERC721 standard.) To learn more about the inherited ERC721 functions, check out the interface definition [here](https://eips.ethereum.org/EIPS/eip-721).
* `@openzeppelin/contracts/utils/Counters.sol`provides counters that can only be incremented or decremented by one. Our smart contract uses a counter to keep track of the total number of NFTs minted and set the unique ID to our new NFT. Each NFT minted using a smart contract must be assigned a unique ID—here our unique ID is just determined by the total number of NFTs in existance. For example, the first NFT we mint with our smart contract has an ID of "1," our second NFT has an ID of "2," etc.
* `@openzeppelin/contracts/access/Ownable.sol` sets up [access control](https://docs.openzeppelin.com/contracts/3.x/access-control) on our smart contract, so only the owner of the smart contract (you) can mint NFTs. Note, including access control is entirely a preference. If you'd like anyone to be able to mint an NFT using your smart contract, remove the word `Ownable` on line 9 and `onlyOwner` on line 16.

In Lines 9-27, we have our custom NFT smart contract, which is surprisingly short —it only contains a counter, a constructor, and single function! This is thanks to our inherited OpenZepplin contracts, which implement most of the methods we need to create an NFT, such as `ownerOf` (returns the owner of the NFT) and `transferFrom`(transfers ownership of the NFT).

On line 13, you'll notice we pass 2 strings, "MyNFT" and "NFT" into the ERC721 constructor. The first variable is the smart contract's name, and the second is its symbol. You can name each of these variables whatever you wish!

Finally, starting on line 15, we have our function `mintNFT()` that allows us to mint an NFT! You'll notice this function takes in two variables:

* `address recipient` specifies the address that will receive your freshly minted NFT
* `string memory tokenURI` is a string that should resolve to a JSON document that describes the NFT's metadata. An NFT's metadata is really what brings it to life, allowing it to have additional properties, such as a name, description, image, and other attributes. In part 2 of this tutorial, we will describe how to configure this metadata.

`mintNFT` calls some methods from the inherited ERC721 library, and ultimately returns a number that represents the ID of the freshly minted NFT.

### Step 7: Connect Metamask & Alchemy to your project

Now that we've created a Metamask wallet, an Alchemy account, and a smart contract, it’s time to connect the three.

Every transaction sent from your virtual wallet requires a signature using your unique private key. To provide our program with this permission, we can safely store our private key (and Alchemy API key) in an environment file.

Install the dotenv package in your project directory by running:

```bash
npm install dotenv --save
```

Then, create a `.env` file in the root directory of our project, and add your Metamask private key and HTTP Alchemy API Key (from Step 1) to it.

{% hint style="danger" %}
**NOTE:** Your `.env` file must be named `.env` ! Do not change the name to `xx.env`
{% endhint %}

Follow [these instructions](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) to export your private key from Metamask

Your `.env` should look like this:

```
API_URL = "https://eth-ropsten.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

### Step 8: Update hardhat.config.js

We’ve added several dependencies and plugins so far, now we need to update `hardhat.config.js` so that our project knows about all of them.

Replace the contents of `hardhat.config.js` with the following:

```javascript
/**
* @type import('hardhat/config').HardhatUserConfig
*/
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY } = process.env;
module.exports = {
   solidity: "0.8.4",
   defaultNetwork: "goerli",
   networks: {
      hardhat: {},
      goerli: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
}
```

### Step 9: Write the deployment script

Now that our contract is written and our configuration file is good to go, it’s time to write the contract deploy script.

Navigate to the `scripts/` folder and create a new file called `deploy.js` , and add the following:

```javascript
async function main() {
   // Grab the contract factory 
   const MyNFT = await ethers.getContractFactory("MyNFT");

   // Start deployment, returning a promise that resolves to a contract object
   const myNFT = await MyNFT.deploy(); // Instance of the contract 
   console.log("Contract deployed to address:", myNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

Hardhat does an amazing job of explaining what each of these lines of code does in their [Contracts tutorial](https://hardhat.org/tutorial/testing-contracts.html#writing-tests), we’ve adopted their explanations here.

```
const MyNFT = await ethers.getContractFactory("MyNFT");
```

A `ContractFactory` in `ethers.js` is an abstraction used to deploy new smart contracts, so `MyNFT` here is a factory for instances of our NFT contract. When using the `hardhat-ethers` plugin `ContractFactory` and `Contract` instances are connected to the first signer by default.

```
 const myNFT = await MyNFT.deploy();
```

Calling `deploy()` on a `ContractFactory` will start the deployment, and return a `Promise` that resolves to a `Contract`. This is the object that has a method for each of our smart contract functions.

### Step 10: Deploy the contract

We’re finally ready to deploy our smart contract! Navigate back to the root of your project directory, and in the command line run:

```bash
npx hardhat run scripts/deploy.js --network goerli
```

You should then see something like:

```
Contract deployed to address: 0xA4766Ceb9E84a71D282A4CED9fB8Fe93C49b2Ff7
```

If we go to [Goerli Etherscan](https://goerli.etherscan.io/) and search for our contract address we should be able to see that it has been deployed successfully. The transaction will look something like this:

![Contract page on Goerli Etherscan](<../../.gitbook/assets/Screenshot 2022-07-12 at 3.17.04 PM.png>)

The `From` address should match your Metamask account address and the To address will say _Contract Creation_. If we click into the transaction, we’ll see our contract address in the _To_ field:

![Contract Creation page on Goerli Etherscan](<../../.gitbook/assets/Screenshot 2022-07-12 at 3.17.42 PM.png>)

Yasssss! You just deployed your NFT smart contract to the Ethereum chain 🎉

To understand what’s going on under the hood, let’s navigate to the Explorer tab in our [Alchemy dashboard ](https://dashboard.alchemyapi.io/signup?referral=affiliate:68212b46-a5c5-4f4c-bc8b-73f50536fcaf). If you have multiple Alchemy apps make sure to filter by app and select “MyNFT”.

![Alchemy Explorer](<../../.gitbook/assets/Screenshot 2022-07-12 at 3.18.54 PM.png>)

Here you’ll see a handful of JSON-RPC calls that Hardhat/Ethers made under the hood for us when we called the `.deploy()` function.

Two important ones to call out here are [`eth_sendRawTransaction`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth\_sendrawtransaction), which is the request to actually write our smart contract onto the Goerli chain, and [`eth_getTransactionByHash`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth\_gettransactionbyhash) which is a request to read information about our transaction given the hash (a typical pattern when sending transactions).

That’s all for Part I of this tutorial. In Part II, we’ll actually interact with our smart contract by [minting an NFT](https://docs.alchemyapi.io/alchemy/tutorials/how-to-write-and-deploy-a-nft-smart-contract/how-to-mint-a-nft), and in Part III we'll explain how to [view your NFT in Metamask](https://docs.alchemyapi.io/alchemy/tutorials/how-to-write-and-deploy-a-nft-smart-contract/how-to-view-your-nft-in-your-wallet)! 🤑
