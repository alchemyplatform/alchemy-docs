---
description: Tutorial for deploying your own ERC-20 token on Ethereum (testnet) in 4 steps.
---

# How to Create an ERC-20 Token (4 Steps)

An Ethereum Token is an incredibly powerful feature of the Ethereum virtual machine, as it can represent virtually anything from financial assets, to skills of a game character, to a fiat currency, and so much more.

## Table of Contents

[Why build your Own ERC-20 token?](deploy-your-own-erc20-token.md#why-build-your-own-erc-20-token)

[What is ERC-20?](deploy-your-own-erc20-token.md#what-is-the-erc-20-token-standard)

[How to create your own ERC-20 tokens](deploy-your-own-erc20-token.md#how-to-create-an-erc-20-token)

## Why build your own ERC-20 token?

**The** [**ERC-20 token standard**](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) **is the most popular way to create fungible cryptocurrencies on Ethereum and EVM-compatible blockchains, and therefore allows builders and creators to develop digital assets for their protocol, marketplace, metaverse, or community.**

This tutorial will teach you how to create your own ERC-20 token on Ethereum’s Rinkeby testnet using [Alchemy](https://alchemy.com/?a=c4a776f6dc), MetaMask, HardHat, and Solidity code snippets. At the end of this tutorial you will be able to deploy your own ERC-20 token smart contract. The estimated time to complete this guide is 15 minutes.

## What is the ERC-20 token standard?

**The ERC-20 token standard ensures that all tokens have the same properties, including that all tokens are fungible (any one token is exactly equal to any other token), and no tokens have special properties or rights associated with them.**

This means that for a token to follow the ERC-20 token standard, it must implement the following API methods and events:

* `totalSupply` - a method that defines the total supply of your tokens, and stops creating new tokens when the totalSupply limit is reached
* `balanceOf` - a method that returns the number of tokens a wallet address contains
* `transfer` - a method that transfers in a certain amount of tokens from the total supply and sends it to a user
* `transferFrom` - a transfer method that transfers ERC-20 tokens between users
* `approve` - verifies whether a smart contract is allowed to allocate a certain amount of tokens to a user, considering the total supply
* `allowance` - checks if a user has enough balance to send a tokens to another user

_ERC-20 tokens are fungible (can be interchanged) because they have the same value and properties. There are also non-fungible token standards and semi-fungible token standards such as_ [_ERC-721 and ERC-1155 tokens_](https://www.alchemy.com/blog/comparing-erc-721-to-erc-1155)_._

## How to Create an ERC-20 Token&#x20;

In four steps you’ll create and deploy an ERC-20 token on the Goerli test network, using Metamask, Solidity, Hardhat, and [Alchemy](https://alchemy.com/?a=c4a776f6dc). This Rinkeby ERC-20 token will have all the characteristics required above, making it a valid ERC-20 token.

### 1. Set Up your Developer Environment

First, [create an Alchemy account](https://alchemy.com/?a=c4a776f6dc), setup Metamask, HardHat, and Solidity for this project. For a walkthrough, read through the [ChainShot HardHat guide](https://www.chainshot.com/article/hardhat-guides-setup).&#x20;

Next, enter `mk my-token` and `cd my-token` to create a folder for your project and change directories to your my-token folder, then run `npm init`

If you don't already have NPM installed, use this **** [**developer environment setup guide**](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm)**.**

```
mk my-token
cd my-token
npm init
```

Next, go to the `my-token` project root directory and type `mkdir contracts` and `mkdir scripts` into your command line to create two new folders that will organize your ERC-20 smart contracts and your deployment scripts:

```
mkdir contracts
mkdir scripts
```

### 2. Write ERC-20 Token Smart Contract

Here’s how to write the token contract for your ERC-20 token using Solidity, which is like Java and JavaScript, or C and C++:

1. Open up the `my-token` project in your code editor.
2. Navigate to your `/contracts` folder
3. Open a new .`sol` file and name the .`sol` file the same name as your token
   1. **Note:** To create and work with your smart contract file, you must have a name that matches the name of your token. For example, to create a token named Web3Token, your contract file name should be `Web3Token.sol`.
4. Copy and paste this code snippet based on the [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc20) ERC 20 implementation:

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";  // OpenZeppelin package contains implementation of the ERC 20 standard, which our NFT smart contract will inherit

contract GoofyGoober is ERC20 {
    uint constant _initial_supply = 100 * (10**18);  // setting variable for how many of your own tokens are initially put into your wallet, feel free to edit the first number but make sure to leave the second number because we want to make sure our supply has 18 decimals

    /* ERC 20 constructor takes in 2 strings, feel free to change the first string to the name of your token name, and the second string to the corresponding symbol for your custom token name */
    constructor() ERC20("GoofyGoober", "GG") public {
        _mint(msg.sender, _initial_supply);
    }
}
```

* The token symbol you choose, in our case "GG" can be any arbitrary character length but do keep in mind that some UIs may display ones that are too long differently.
* Feel free to edit the initial supply by changing the `100` to how many tokens you would like your initial supply to be - we put 100 because there are very few true Goofy Goobers in the world! You can put any number you'd like for this - make sure to leave the `(10**18)` as that multiplies the number we want as our supply to have 18 decimals.

### **3. Write a Deployment Script for your ERC-20 Token**

Now that your token contract is written, write your smart contract deployment script by:

1. Navigating to the /scripts folde**r**
2. Creating a new file called `deploy.js`
3. Opening the `deploy.js` file
4. Copying and pasting this ERC-20 deployment code snippet:

{% code title="deploy.js" %}
```javascript
async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const weiAmount = (await deployer.getBalance()).toString();
  
  console.log("Account balance:", (await ethers.utils.formatEther(weiAmount)));

  // make sure to replace the "GoofyGoober" reference with your own ERC-20 name!
  const Token = await ethers.getContractFactory("GoofyGoober");
  const token = await Token.deploy();

  console.log("Token address:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
```
{% endcode %}

### 4. Deploy your ERC-20 Token to Goerli

To deploy your ERC-20 token, navigate to your root directory and run the following command:&#x20;

&#x20;`npx hardhat run scripts/deploy.js --network goerli`

Your contract will be compiled and deployed to the Goerli network! You should see a message appear with information about the smart contracts you are deploying including your account address, account balance, and token address.

![formatEther](https://i.imgur.com/2FXHuVw.png)

Go to [https://goerli.etherscan.io/](https://goerli.etherscan.io/) and input your outputted Token address to see your deployed ERC-20 contract on Goerli!

Now it's time to have the real fun! Send some of your new tokens to your friends and family, stimulate an economy - create the Bitcoin/Ethereum of the future! In this guide, you deployed your own ERC-20 token on Goerli using the OpenZeppelin ERC20 standard - great job!

## Step 4: Send Some Tokens!

We are going to challenge you to send some tokens in one of two ways:

1. **More Challenging Way**: Write your own Hardhat Script to do an airdrop!
2. **Simpler Way**: Add your ERC-20 token to MetaMask and send it to an address via the UI!
