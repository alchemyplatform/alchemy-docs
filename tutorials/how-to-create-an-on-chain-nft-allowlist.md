---
description: Learn how to create on-chain allowlists for NFT PFP projects
---

# How to Create an On-Chain NFT Allowlist

If you're launching your very own NFT PFP collection, chances are that you want generate some hype and create a community that is interested in your project.&#x20;

It may also be the case that your project has already generated a huge amount of interest, and the demand for your NFTs far outstrip supply. In such cases, you would want to implement a system that only allows the most active or desirable members to mint first before opening sale to the public.

![Cryptopunks, one of the world's most popular NFT PFP project](<../.gitbook/assets/image (48).png>)

An allowlist is an excellent solution for both the aforementioned cases. An allowlist is a mechanism that allows only certain wallets to mint NFTs from a collection for a certain period of time. Allowlist mints almost always precede public sales.

In this tutorial, we will write an NFT collectible smart contract using Solidity and Hardhat that implements an allowlist on-chain (i.e within the contract itself).

## Creating the NFT Allowlist Contract

### Step 1: Install Node and npm

In case you haven't already, [install node and npm](https://nodejs.org/en/download/) on your local machine.

Make sure that node is at least v14 or higher by typing the following in your terminal:

```bash
node -v
```

### Step 2: Create a Hardhat project

We're going to set up our project using [Hardhat](https://hardhat.org/), the industry-standard development environment for Ethereum smart contracts. Additionally, we'll also install [OpenZeppelin](https://www.openzeppelin.com/) contracts.

_**To set up Hardhat, run the following commands in your terminal:**_

```bash
mkdir nft-allowlist && cd nft-allowlist
npm init -y
npm install --save-dev hardhat
npx hardhat
```

Choose `Create a Javascript project` __ from the menu and accept all defaults. To ensure everything is installed correctly, run the following command in your terminal:

```bash
npx hardhat test
```

_**To install OpenZeppelin:**_

```bash
npm install @openzeppelin/contracts
```

### Step 3: Write the smart contract

Let's now write a smart contract that implements an allowlist. To do this on-chain, we need three things:

1. A Solidity mapping `isAllowlistAddress` that keeps track of all allowed addresses.
2. A function `allowListAddresses` that allows the contract owner to add addresses to the allowlist.
3. A function `preSale` that only allows a wallet to mint if it is part of the allowlist.

Open the project in your favorite code editor (e.g., VS Code), and create a new file called `NFTAllowlist.sol` in the `contracts` folder. Add the following code to this file:

```solidity
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract NFTAllowlist is ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIds;

    // Allowlist mapping
    mapping(address => bool) public isAllowlistAddress;
    
    constructor() ERC721("NFT Allowlist Demo", "NAD") {
        console.log("Contract has been deployed!");
    }

    // Allowlist addresses
    function allowlistAddresses(address[] calldata wAddresses) public onlyOwner {
        for (uint i = 0; i < wAddresses.length; i++) {
            isAllowlistAddress[wAddresses[i]] = true;
        }
    }

    // Presale mint
    function preSale() public {
        require(isAllowlistAddress[msg.sender], "Address is not allowlisted");

        for (uint i = 0; i < 2; i++) {
            _mintSingleNFT();
        }

        console.log("2 NFTs minted using allowlist.");

        isAllowlistAddress[msg.sender] = false;        
    }
    
    function _mintSingleNFT() private {
        uint newTokenID = _tokenIds.current();
        _safeMint(msg.sender, newTokenID);
        _tokenIds.increment();
    }
}
```

{% hint style="info" %}
**Tip:** To learn more about the code, check out the commented sections above.
{% endhint %}

Compile the contract and make sure everything works by running:

```bash
npx hardhat compile
```

### Step 4: Test the allowlist locally

Next, write a script that allows us to test the allowlist locally. To do this, create a new file called `run.js` in the scripts folder, then add the following code::

```javascript
const hre = require("hardhat");

async function main() {

    const factory = await hre.ethers.getContractFactory("NFTAllowlist");
    const [owner, address1, address2] = await hre.ethers.getSigners();
    const contract = await factory.deploy();

    await contract.deployed();
    console.log("Contract deployed to: ", contract.address);
    console.log("Contract deployed by: ", owner.address, "\n");

    // Add address1 to allowlist   
    let txn;
    txn = await contract.allowlistAddresses([address1.address]);
    await txn.wait()
    console.log("Address 1 added to allowlist. \n")

    // Let address1 mint presale NFTs
    console.log("Address 1 (allowlisted) is minting...")
    txn = await contract.connect(address1).preSale();
    await txn.wait();
    console.log();

    // Let address2 mint presale NFTs
    console.log("Address 2 (not allowlisted) is minting...")
    txn = await contract.connect(address2).preSale();
    await txn.wait();
    console.log();
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

```

Run this script by running the following command in your terminal:

```bash
npx hardhat run scripts/run.js
```

You should see output that looks like this:

```bash
Contract has been deployed!
Contract deployed to:  0x5FbDB2315678afecb367f032d93F642f64180aa3
Contract deployed by:  0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 

Address 1 added to allowlist. 

Address 1 (allowlisted) is minting...
2 NFTs minted using allowlist.

Address 2 (not allowlisted) is minting...
Error: VM Exception while processing transaction: reverted with reason string 'Address is not allowlisted'
    at NFTAllowlist.preSale (contracts/NFTAllowlist.sol:30)
    at HardhatNode._mineBlockWithPendingTxs (/Users/rounakbanik/alchemy-tut/nft-allowlist/node_modules/hardhat/src/internal/hardhat-network/provider/node.ts:1773:23)
    at HardhatNode.mineBlock (/Users/rounakbanik/alchemy-tut/nft-allowlist/node_modules/hardhat/src/internal/hardhat-network/provider/node.ts:466:16)
    at EthModule._sendTransactionAndReturnHash (/Users/rounakbanik/alchemy-tut/nft-allowlist/node_modules/hardhat/src/internal/hardhat-network/provider/modules/eth.ts:1504:18)
    at HardhatNetworkProvider.request (/Users/rounakbanik/alchemy-tut/nft-allowlist/node_modules/hardhat/src/internal/hardhat-network/provider/provider.ts:118:18)
    at EthersProviderWrapper.send (/Users/rounakbanik/alchemy-tut/nft-allowlist/node_modules/@nomiclabs/hardhat-ethers/src/internal/ethers-provider-wrapper.ts:13:20)
```

Above, you can see that the allowlisted address (`Address 1`) was able to mint the NFTs but the other address (`Address 2`) wasn't!

### Conclusion

Congratulations! You now know how to implement an on-chain NFT allowlist.

If you enjoyed this tutorial about creating on-chain allowlists, tweet us at [@AlchemyPlatform](https://twitter.com/AlchemyPlatform) and give the authors [@rounak\_banik](https://twitter.com/Rounak\_Banik) and [@ankg404](https://twitter.com/ankg404) a shoutout!

Don't forget to join our [Discord server](https://www.alchemy.com/discord) to meet other blockchain devs, builders, and entrepreneurs!

Ready to start building your NFT collection?

[Create a free Alchemy account](https://alchemy.com/?a=22e42c85f0) and do share your project with us!
