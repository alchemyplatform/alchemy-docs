---
description: Follow this guide if you're looking for an Infura alternative for Metamask.
---

# How to Speed Up MetaMask Transactions

## Steps to update your Metamask

1. [Create a free account on Alchemy](connecting-metamask-to-alchemy.md#1.-create-a-free-account-on-alchemy)&#x20;
2. [Create an API key for the desired Network on Metamask](connecting-metamask-to-alchemy.md#2.-create-an-api-key-for-the-desired-network-on-metamask)&#x20;
3. [Choose "Custom RPC" in Metamask](connecting-metamask-to-alchemy.md#3.-choose-custom-rpc-in-metamask)
4. [Fill in the network details](connecting-metamask-to-alchemy.md#4.-fill-in-the-required-information)

## Why is Metamask not working?

MetaMask uses a default node provider to display and send transactions for your account. Because the node provider does not allocate dedicated resources to each user, it may be slow sometimes, i.e. for transaction broadcasting.

Alchemy provides a much better experience when it is used as your MetaMask RPC provider. If you'd like to switch this over to Alchemy to be able to see your transactions in your Alchemy dashboard and use Alchemy specific features and tools, this doc will show you how to integrate your MetaMask account in _two easy steps_.

**NOTE:** This does not mean that Alchemy will have access to your private keys or wallet!

For a video version of this guide, check this out:

{% embed url="https://www.youtube.com/watch?v=VUkhkSgMtdk" %}

## Step 1: Create a free account on [Alchemy](https://alchemy.com/?a=991c4e82df)

We'll need to use an Alchemy API key to replace our Metamask endpoint. You can create a free account [here](https://alchemy.com/?a=991c4e82df).&#x20;

## Step 2: Create an API key for the desired Network on Metamask&#x20;

If we want to replace our Ethereum Mainnet endpoint (most popular) in Metamask we'll need to create an Ethereum Mainnet API key on Alchemy. For instructions on how to do so, check out [step 1 on this guide](../introduction/getting-started/#1.create-an-alchemy-key). Or watch the video below.&#x20;

{% embed url="https://youtu.be/tfggWxfG9o0" %}

## Step 3: Choose "Custom RPC" in Metamask

Navigate to your MetaMask wallet and click the network dropdown at the top, selecting **"Custom RPC"** at the bottom

![Click on "Custom RPC" at the very bottom of the network dropdown.](<../.gitbook/assets/Screen Shot 2021-11-15 at 9.47.25 AM.png>)

## Step 4: Fill in the network details

This is where you'll grab your Alchemy API Key for the desired network.

Here is the information on specific Netoworks:

| Network                 | RPC Base URL                                                                                     | Chain ID | Block Explorer URL                                            | Symbol (optional) |
| ----------------------- | ------------------------------------------------------------------------------------------------ | -------- | ------------------------------------------------------------- | ----------------- |
| Ethereum Mainnet        | [https://eth-mainnet.alchemyapi.io/v2/](https://eth-mainnet.alchemyapi.io/v2/)\<api key>         | 1        | [https://etherscan.io/](https://etherscan.io)                 | ETH               |
| Ropsten Test Network    | [https://eth-ropsten.alchemyapi.io/v2/](https://eth-ropsten.alchemyapi.io/v2/)\<api key>         | 3        | [https://ropsten.etherscan.io/](https://ropsten.etherscan.io) | ETH               |
| Rinkeby Test Network    | [https://eth-rinkeby.alchemyapi.io/v2/](https://eth-rinkeby.alchemyapi.io/v2/)\<api key>         | 4        | [https://rinkeby.etherscan.io/](https://rinkeby.etherscan.io) | ETH               |
| Goerli Test Network     | [https://eth-goerli.alchemyapi.io/v2/](https://eth-goerli.alchemyapi.io/v2/)\<api key>           | 5        | [https://goerli.etherscan.io/](https://goerli.etherscan.io)   | ETH               |
| Kovan Test Network      | [https://eth-kovan.alchemyapi.io/v2/](https://eth-kovan.alchemyapi.io/v2/)\<api key>             | 42       | [https://kovan.etherscan.io/](https://kovan.etherscan.io)     | ETH               |
| Polygon (Matic) Mainnet | [https://polygon-mainnet.g.alchemy.com/v2/](https://polygon-mainnet.g.alchemy.com/v2/)\<api key> | 137      | [https://polygonscan.com/](https://polygonscan.com)           | MATIC             |

![Example Polygon Configuration](<../.gitbook/assets/Screen Shot 2021-11-15 at 10.07.44 AM.png>) ![Example Ethereum Mainnet Configuration](<../.gitbook/assets/Screen Shot 2021-11-15 at 10.11.10 AM.png>)

And thats it! Your MetaMask is now hooked up to Alchemy 🎉 You've now unlocked game changing tools like the [Mempool Visualizer](../introduction/core-products/alchemy-build.md#mempool-visualizer) (where you can view all your transactions as they are being mined), [Alchemy Notify](../introduction/core-products/alchemy-notify.md) (receive notifications about address activity, dropped/mined transactions, etc.), and more!
