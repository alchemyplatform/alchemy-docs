---
description: >-
  This tutorial describes how to mint an NFT on Ethereum using Ethers via the
  ethers.js library, and our smart contract from Part I: How to Create an NFT.
  We'll also explore basic test setup.
---

# 🏗 How to Mint an NFT with Ethers.js (option 2)

_Estimated time to complete this guide: \~10 minutes_\
__

{% hint style="warning" %}
If you've already completed "How to Mint an NFT Using Web3.js (option 1)", you can skip this tutorial!
{% endhint %}

In [another tutorial](how-to-mint-a-nft.md), we learned how to mint an NFT using Web3 and the [OpenZeppelin contracts library](https://docs.openzeppelin.com/contracts/erc721). In this exercise, we're going to walk you through an alternative implementation using version 4 of the [OpenZeppelin library](https://docs.openzeppelin.com/contracts/4.x/erc721) as well as the [Ethers.js](https://docs.ethers.io) Ethereum library instead of Web3.

We'll also cover the basics of testing your contract with [Hardhat and Waffle](https://hardhat.org/plugins/nomiclabs-hardhat-waffle.html). For this tutorial I'm using Yarn, but you can use npm/npx if you prefer.

Lastly, we'll use TypeScript. This is fairly [well documented](https://hardhat.org/guides/typescript.html#typescript-support), so we won't cover it here.

In all other respects, this tutorial works the same as the Web3 version, including tools such as Pinata and IPFS.

## A Quick Reminder

As a reminder, "minting an NFT" is the act of publishing a unique instance of your ERC721 token on the blockchain. This tutorial assumes that that you've successfully [deployed a smart contract to the Ropsten network in Part I](./) of the NFT tutorial series, which includes [installing Ethers](./#step-12-install-ethersjs).

### Step 1: Create your Solidity contract

OpenZeppelin is library for secure smart contract development. You simply inherit their implementations of popular standards such as ERC20 or ERC721, and extend the behavior to your needs. We're going to put this file at `contracts/MyNFT.sol`.

```
// Contract based on https://docs.openzeppelin.com/contracts/4.x/erc721
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("MyNFT", "MNFT") {}

    function mintNFT(address recipient, string memory tokenURI)
    public
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

### Step 2: Create Hardhat tasks to deploy our contract and mint NFT's

Create the file `tasks/nft.ts` containing the following:

```typescript
import { task, types } from "hardhat/config";
import { Contract } from "ethers";
import { TransactionResponse } from "@ethersproject/abstract-provider";
import { env } from "../lib/env";
import { getContract } from "../lib/contract";
import { getWallet } from "../lib/wallet";

task("deploy-contract", "Deploy NFT contract").setAction(async (_, hre) => {
  return hre.ethers
    .getContractFactory("MyNFT", getWallet())
    .then((contractFactory) => contractFactory.deploy())
    .then((result) => {
      process.stdout.write(`Contract address: ${result.address}`);
    });
});

task("mint-nft", "Mint an NFT")
  .addParam("tokenUri", "Your ERC721 Token URI", undefined, types.string)
  .setAction(async (tokenUri, hre) => {
    return getContract("MyNFT", hre)
      .then((contract: Contract) => {
        return contract.mintNFT(env("ETH_PUBLIC_KEY"), tokenUri, {
          gasLimit: 500_000,
        });
      })
      .then((tr: TransactionResponse) => {
        process.stdout.write(`TX hash: ${tr.hash}`);
      });
  });
```

### Step 3: Create helpers

You'll notice our tasks imported a few helpers. Here they are.

`contract.ts`

```typescript
import { Contract, ethers } from "ethers";
import { getContractAt } from "@nomiclabs/hardhat-ethers/internal/helpers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { env } from "./env";
import { getProvider } from "./provider";

export function getContract(
  name: string,
  hre: HardhatRuntimeEnvironment
): Promise<Contract> {
  const WALLET = new ethers.Wallet(env("ETH_PRIVATE_KEY"), getProvider());
  return getContractAt(hre, name, env("NFT_CONTRACT_ADDRESS"), WALLET);
}
```

`env.ts`

```typescript
export function env(key: string): string {
  const value = process.env[key];
  if (value === undefined) {
    throw `${key} is undefined`;
  }
  return value;
}
```

`provider.ts`

Note that the final `getProvider()` function uses the ropsten network. This argument is optional and defaults to "homestead" if omitted. We're using Alchemy of course, but there are several [supported alternatives](https://docs.ethers.io/v5/api/providers/#providers-getDefaultProvider).

```typescript
import { ethers } from "ethers";

export function getProvider(): ethers.providers.Provider {
  return ethers.getDefaultProvider("ropsten", {
    alchemy: process.env.ALCHEMY_API_KEY,
  });
}
```

`wallet.ts`

```typescript
import { ethers } from "ethers";
import { env } from "./env";
import { getProvider } from "./provider";

export function getWallet(): ethers.Wallet {
  return new ethers.Wallet(env("ETH_PRIVATE_KEY"), getProvider());
}
```

### Step 4: Create tests

Under your `test` directory, create these files. Note that these tests are not comprehensive. They test a small subset of the ERC721 functionality offered by the OpenZeppelin library, and are intended to provide you with the building blocks to create more robust tests.

`test/MyNFT.spec.ts` (unit tests)

```typescript
import { ethers, waffle } from "hardhat";
import { Contract, Wallet } from "ethers";
import { expect } from "chai";
import { TransactionResponse } from "@ethersproject/abstract-provider";
import sinon from "sinon";
import { deployTestContract } from "./test-helper";
import * as provider from "../lib/provider";

describe("MyNFT", () => {
  const TOKEN_URI = "http://example.com/ip_records/42";
  let deployedContract: Contract;
  let wallet: Wallet;

  beforeEach(async () => {
    sinon.stub(provider, "getProvider").returns(waffle.provider);
    [wallet] = waffle.provider.getWallets();
    deployedContract = await deployTestContract("MyNFT");
  });

  async function mintNftDefault(): Promise<TransactionResponse> {
    return deployedContract.mintNFT(wallet.address, TOKEN_URI);
  }

  describe("mintNft", async () => {
    it("emits the Transfer event", async () => {
      await expect(mintNftDefault())
        .to.emit(deployedContract, "Transfer")
        .withArgs(ethers.constants.AddressZero, wallet.address, "1");
    });

    it("returns the new item ID", async () => {
      await expect(
        await deployedContract.callStatic.mintNFT(wallet.address, TOKEN_URI)
      ).to.eq("1");
    });

    it("increments the item ID", async () => {
      const STARTING_NEW_ITEM_ID = "1";
      const NEXT_NEW_ITEM_ID = "2";

      await expect(mintNftDefault())
        .to.emit(deployedContract, "Transfer")
        .withArgs(
          ethers.constants.AddressZero,
          wallet.address,
          STARTING_NEW_ITEM_ID
        );

      await expect(mintNftDefault())
        .to.emit(deployedContract, "Transfer")
        .withArgs(
          ethers.constants.AddressZero,
          wallet.address,
          NEXT_NEW_ITEM_ID
        );
    });

    it("cannot mint to address zero", async () => {
      const TX = deployedContract.mintNFT(
        ethers.constants.AddressZero,
        TOKEN_URI
      );
      await expect(TX).to.be.revertedWith("ERC721: mint to the zero address");
    });
  });

  describe("balanceOf", () => {
    it("gets the count of NFTs for this address", async () => {
      await expect(await deployedContract.balanceOf(wallet.address)).to.eq("0");

      await mintNftDefault();

      expect(await deployedContract.balanceOf(wallet.address)).to.eq("1");
    });
  });
});
```

`tasks.spec.ts` (integration specs)

```typescript
import { deployTestContract, getTestWallet } from "./test-helper";
import { waffle, run } from "hardhat";
import { expect } from "chai";
import sinon from "sinon";
import * as provider from "../lib/provider";

describe("tasks", () => {
  beforeEach(async () => {
    sinon.stub(provider, "getProvider").returns(waffle.provider);
    const wallet = getTestWallet();
    sinon.stub(process, "env").value({
      ETH_PUBLIC_KEY: wallet.address,
      ETH_PRIVATE_KEY: wallet.privateKey,
    });
  });

  describe("deploy-contract", () => {
    it("calls through and returns the transaction object", async () => {
      sinon.stub(process.stdout, "write");

      await run("deploy-contract");

      await expect(process.stdout.write).to.have.been.calledWith(
        "Contract address: 0x610178dA211FEF7D417bC0e6FeD39F05609AD788"
      );
    });
  });

  describe("mint-nft", () => {
    beforeEach(async () => {
      const deployedContract = await deployTestContract("MyNFT");
      process.env.NFT_CONTRACT_ADDRESS = deployedContract.address;
    });

    it("calls through and returns the transaction object", async () => {
      sinon.stub(process.stdout, "write");

      await run("mint-nft", { tokenUri: "https://example.com/record/4" });

      await expect(process.stdout.write).to.have.been.calledWith(
        "TX hash: 0xd1e60d34f92b18796080a7fcbcd8c2b2c009687daec12f8bb325ded6a81f5eed"
      );
    });
  });
});
```

`test-helpers.ts` Note this require the NPM libraries imported, including sinon, chai, and sinon-chai. The `sinon.restore()` call is necessary due to the use of stubbing.

```typescript
import sinon from "sinon";
import chai from "chai";
import sinonChai from "sinon-chai";
import { ethers as hardhatEthers, waffle } from "hardhat";
import { Contract, Wallet } from "ethers";

chai.use(sinonChai);

afterEach(() => {
  sinon.restore();
});

export function deployTestContract(name: string): Promise<Contract> {
  return hardhatEthers
    .getContractFactory(name, getTestWallet())
    .then((contractFactory) => contractFactory.deploy());
}

export function getTestWallet(): Wallet {
  return waffle.provider.getWallets()[0];
}
```

## Step 5: Configuration

Here's our fairly bare bones `hardhat.config.ts`.

```typescript
import("@nomiclabs/hardhat-ethers");
import("@nomiclabs/hardhat-waffle");
import dotenv from "dotenv";
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const argv = JSON.parse(env("npm_config_argv"));
if (argv.original !== ["hardhat", "test"]) {
  require('dotenv').config();
}

import("./tasks/nft");

import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  solidity: "0.8.6",
};

export default config;
```

Note the conditional to only invoke dotenv if we're not running tests. You might not want to run this in production, but rest assured that dotenv will silently ignore it if the .env file isn't present.

## Running Our Tasks

Now that we've put these files in place, we can run `hardhat` to see our tasks (excluding the built-in tasks for brevity).

```
AVAILABLE TASKS:

  deploy-contract    Deploy NFT contract
  mint-nft      Mint an NFT
```

Forget the arguments to your task? No problem.

```
$ hardhat help deploy-contract

Usage: hardhat [GLOBAL OPTIONS] deploy-contract

deploy-contract: Deploy NFT contract
```

## Running Our Tests

To run our tests, we run `hardhat test`.

```
  mintNft
    ✓ calls through and returns the transaction object (60ms)

  MyNFT
    mintNft
      ✓ emits the Transfer event (60ms)
      ✓ returns the new item ID
      ✓ increments the item ID (57ms)
      ✓ cannot mint to address zero
    balanceOf
      ✓ gets the count of NFTs for this address


  6 passing (2s)

✨  Done in 5.66s.
```

## Summary

In this tutorial, we've created a firm foundation for a well tested NFT infrastructure based on Solidity. The wallet provided by `waffle.provider.getWallets()` links to a local fake [Hardhat Network](https://hardhat.org/hardhat-network/) account that [conveniently comes preloaded](https://hardhat.org/hardhat-network/reference/#initial-state) with an eth balance that we can use to fund our test transactions.
