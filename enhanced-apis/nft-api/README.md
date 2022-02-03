---
description: API for fetching NFT data, including ownership, metadata attributes, and more.
---

# NFT API

## Introduction&#x20;

Welcome! If you're here, that means you're looking for a great API to work with to build your next NFT project. Well, you're in the right place! Alchemy powers all major NFT platforms as well a majority of DeFi applications, so you can rest assured -- you're in good company.

![](<../../.gitbook/assets/Screen Shot 2022-01-25 at 2.11.39 PM.png>)

{% embed url="https://www.bloomberg.com/news/articles/2021-03-21/nfts-mushroom-into-billion-dollar-market-with-help-from-alchemy" %}

Before you go any further, please visit the [Getting Started](https://docs.alchemy.com/alchemy/introduction/getting-started) guide to set up your Alchemy account. You will need an API key later!

### What is the NFT API?

Alchemy's NFT API allows you to quickly get all the information you need to know about NFTs from the blockchain (i.e. Ethereum, Polygon, Flow). Rather than searching, indexing, and storing data yourself - you can now make one request to fetch specific NFT information for both ERC-721 and ERC-1155 tokens, like:

* All NFTs owned by an address&#x20;
* Metadata and attributes for a specific NFT token

### What can I make?

Using the Alchemy NFT API allows you to both fetch and display NFTs for your users, making it easy to build all kinds of NFT projects. To take some inspiration from existing products, here are some examples you can explore:

#### Build an NFT Marketplace

![OpenSea](<../../.gitbook/assets/Screen Shot 2022-01-25 at 11.46.21 AM.png>)

#### Build On-chain NFT Games

![CryptoRaiders](<../../.gitbook/assets/Screen Shot 2022-01-25 at 11.50.43 AM.png>)

#### Verify Ownership of Digital Assets

![Twitter NFT Profile Pictures](<../../.gitbook/assets/Screen Shot 2022-01-25 at 11.53.44 AM.png>)

#### Social NFT displays

![Gallery.so](<../../.gitbook/assets/Screen Shot 2022-01-25 at 11.56.05 AM.png>)

#### ... and lots more!

Tell us on [Twitter](https://twitter.com/AlchemyPlatform) what you're trying to build!

### What do requests look like?

You can check out the rest of our docs for more in-depth documentation about our endpoints, but for a quick video walkthrough with some demo scripts, start with this video!

{% embed url="https://www.loom.com/share/d7e85ff04c3441dd8e7c312a9b718acb" %}

Here are the demo NFT API scripts mentioned in the video:

{% embed url="https://github.com/alchemyplatform/nft-api-demo-scripts" %}

Ready to get started building?&#x20;

## What Chains and Networks are Supported?

### Currently Supported Chains

#### Ethereum&#x20;

\-> Mainnet, Rinkeby, Ropsten, Kovan, Goerli

#### Polygon (Matic)

\-> Mainnet, Mumbai

#### Flow - view docs [here](https://docs.alchemy.com/flow/documentation/flow-nft-apis)

\-> Mainnet

### Chains Being Considered

* [Solana](https://roadmap.alchemy.com/b/feature-requests/integrate-with-solana/)
* [Avalanche](https://roadmap.alchemy.com/b/feature-requests/avalanche-support/)
* .. and others!

## What NFTs are supported?

All NFTs made with the ERC721 and ERC1155 standards are supported by the NFT API. At the moment, we supports a select number of ERC20 NFTs that pre-date the existance of standaridized NFT contracts.

Alchemy is actively working on adding support for as many blockchains / NFT standards as we can. To influence our roadmap and let your voice be heard, please upvote or add requests here:&#x20;

{% embed url="https://roadmap.alchemy.com/b/feature-requests" %}

Or join our discord! [https://www.alchemy.com/discord](https://www.alchemy.com/discord)

## API Endpoints Overview

### getNFTs

#### Get all NFTs owned by an address

The `getNFTs` methods takes in a user address as input and will return all of the ERC721 and ERC1155 tokens owned by that address.

View the **full documentation** for getNFTs here:

{% content-ref url="getnfts.md" %}
[getnfts.md](getnfts.md)
{% endcontent-ref %}

### getNFTMetadata

#### Get metadata for a specific NFT token

The `getNFTMetadata` method takes in an NFT contract address and token ID as input and will return the metadata, including traits, and image URIs for displaying that NFT.&#x20;

View the **full documentation** for getNFTMetadata here:

{% content-ref url="getnftmetadata.md" %}
[getnftmetadata.md](getnftmetadata.md)
{% endcontent-ref %}

## Quickstart guides

Check out the guide below to get a quick setup using:

1. [The `alchemy-web3` sdk,](../../guides/nft-api-quickstart-guide.md#alchemy-web3-sdk)
2. [the `node-fetch` module,](../../guides/nft-api-quickstart-guide.md#javascript-fetch)
3. or the `axios`  module.

{% content-ref url="../../guides/nft-api-quickstart-guide.md" %}
[nft-api-quickstart-guide.md](../../guides/nft-api-quickstart-guide.md)
{% endcontent-ref %}

