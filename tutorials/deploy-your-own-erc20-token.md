---
description: Tutorial for deploying your own ERC-20 token on Rinkeby
---

# How to Deploy Your Own ERC-20 Token

In this guide, we'll be setting up an ERC-20 token on the Rinkeby test network - start thinking what name you would like to name your very own ERC-20!

{% hint style="info" %}
Don't know what an ERC-20 (fungible) token is? Check out this [resource](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) from the Ethereum Foundation for a helpful overview!
{% endhint %}

## Guide Requirements

* [**Hardhat**](https://hardhat.org): Hardhat is an Ethereum development platform that provides all the tools needed to build, debug and deploy smart contracts.
* [**Alchemy**](https://www.alchemy.com): Alchemy is a blockchain development platform from which we will use some APIs to help query the Ethereum blockchain.

## Step 1: Hardhat Guides Setup

Go to [the ChainShot Hardhat guides setup doc](https://www.chainshot.com/article/hardhat-guides-setup) and follow the steps to set up Hardhat and dotenv!

## Step 2: Set Up ERC-20 Contracts And Scripts

1. Once you have scaffolded out your project using the guide in Step #1, let's set up the rest of our project

Now, it is time to name your token! 😱 In the next step, you will create your contract file - you must match the name of your smart contract file with the name of your token, so if you choose `GoofyGooberToken`, you must name your contract file `GoofyGooberToken.sol`.

For this guide and since ChainShot is full of true Goofy Goobers, we will go with `GoofyGoober` for our token name (the same as above, just without the "Token") - thus, we will name our contract `GoofyGoober.sol`:

1. `cd` into your `/contracts` folder (which should be empty right now!), and run `touch GoofyGoober.sol`

> Follow along if you want to create a GoofyGoober token like us but also feel free to replace the name with yours and make your own token!

1. Open the newly-create `.sol` file and copy-paste the following:

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GoofyGoober is ERC20 {
    uint constant _initial_supply = 100 * (10**18);
    constructor() ERC20("GoofyGoober", "GG") public {
        _mint(msg.sender, _initial_supply);
    }
}
```

> The token symbol you choose, in our case "GG" can be any arbitrary character length but do keep in mind that some UIs may display ones that are too long differently.

1. If you are going with an ERC-20 of your own name (you should!), make sure to change all the Goofy Goober references to match the name of your `.sol` file
2. Feel free to edit the initial supply by changing the `100` to how many tokens you would like your initial supply to be - we put 100 because there are very few true Goofy Goobers in the world! You can put any number you'd like for this - make sure to leave the `(10**18)` as that multiplies the number we want as our supply to have 18 decimals.
3. Save and close the file

Now that we've got a whole contract set up, let's create the deployment script for it!

1. `cd ..` back into your project root directory and then `cd` into your `scripts` directory (which should be empty right now!)
2. Run `touch deploy.js`, open the newly-created file and copy-paste the following:

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

1. Just one action item: replace the reference to "GoofyGoober" in the file if you went with another name for your ERC-20 token
2. Save and close the file
3. `cd ..` back into your project root directory

## Step 3: Deploy Your ERC-20 Token!

1. Run `npx hardhat run scripts/deploy.js --network rinkeby`
2. Your contract will be compiled and deployed to the Rinkeby network! You should see something similar to this in your terminal output:

![formatEther](https://i.imgur.com/2FXHuVw.png)

1. Go to https://rinkeby.etherscan.io/ and input your outputted Token address to see your deployed ERC-20 contract on Rinkeby!

Now it's time to have the real fun! Send some of your new tokens to your friends and family, stimulate an economy - create the Bitcoin/Ethereum of the future! In this guide, you deployed your own ERC-20 token on Rinkeby using the OpenZeppelin ERC20 standard - great job!

## Step 4: Send Some Tokens!

We are going to challenge you to send some tokens in one of two ways:

1. **More Challenging Way**: Write your own Hardhat Script to do an airdrop!
2. **Simpler Way**: Add your ERC-20 token to MetaMask and send it to an address via the UI!
