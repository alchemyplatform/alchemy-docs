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

Here's an example request that queries [@thatguyintech's](https://twitter.com/thatguyintech) wallet:

```
curl 'https://eth-mainnet.g.alchemy.com/demo/v1/getNFTs/?owner=0xF5FFF32CF83A1A614e15F25Ce55B0c0A6b5F8F2c'
```

_See if you can find his_ [_**Crypto Coven**_](https://opensea.io/assets/0x5180db8f5c931aae63c74266b211f580155ecac8/1590)_._

Here's an example response:

```
{
  "ownedNfts": [
    {
      "contract": {
        "address": "0x5180db8f5c931aae63c74266b211f580155ecac8"
      },
      "id": {
        "tokenId": "0x00000000000000000000000000000000000000000000000000000000000025a2"
      },
      "balance": "1"
    },
    {
      "contract": {
        "address": "0x5180db8f5c931aae63c74266b211f580155ecac8"
      },
      "id": {
        "tokenId": "0x0000000000000000000000000000000000000000000000000000000000000636"
      },
      "balance": "1"
    }
  ],
  "totalCount": 2,
  "blockHash": "0x49d7bbfa46304a283cd2e280cb80ef022e34b9ed046dfcc25256730911ec903a"
}
```

View the **full documentation** for getNFTs here:

{% content-ref url="getnfts.md" %}
[getnfts.md](getnfts.md)
{% endcontent-ref %}

### getNFTMetadata

#### Get metadata for a specific NFT token

The `getNFTMetadata` method takes in an NFT contract address and token ID as input and will return the metadata, including traits, and image URIs for displaying that NFT.&#x20;

Here's an example request to fetch metadata for the very first Bored Ape Yacht Club NFT:

```
curl 'https://eth-mainnet.g.alchemy.com/demo/v1/getNFTMetadata?contractAddress=0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d&tokenId=1&tokenType=erc721&&refreshCache=true'
```

Example response:  __ &#x20;

```
{
  "contract": {
    "address": "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"
  },
  "id": {
    "tokenId": "1",
    "tokenMetadata": {
      "tokenType": "ERC721"
    }
  },
  "title": "",
  "description": "",
  "externalDomainViewUrl": "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/1",
  "media": {
    "uri": "ipfs://QmPbxeGcXhYQQNgsC6a36dDyYUcHgMLnGKnF8pVFmGsvqi"
  },
  "alternateMedia": [
    {
      "uri": "https://ipfs.io/ipfs/QmPbxeGcXhYQQNgsC6a36dDyYUcHgMLnGKnF8pVFmGsvqi"
    }
  ],
  "metadata": {
    "image": "ipfs://QmPbxeGcXhYQQNgsC6a36dDyYUcHgMLnGKnF8pVFmGsvqi",
    "attributes": [
      {
        "trait_type": "Mouth",
        "value": "Grin"
      },
      {
        "trait_type": "Clothes",
        "value": "Vietnam Jacket"
      },
      {
        "trait_type": "Background",
        "value": "Orange"
      },
      {
        "trait_type": "Eyes",
        "value": "Blue Beams"
      },
      {
        "trait_type": "Fur",
        "value": "Robot"
      }
    ]
  },
  "timeLastUpdated": "2022-01-25T21:54:23.108Z"
}

```



View the **full documentation** for getNFTMetadata here:

{% content-ref url="getnftmetadata.md" %}
[getnftmetadata.md](getnftmetadata.md)
{% endcontent-ref %}
