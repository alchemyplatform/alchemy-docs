---
description: >-
  Learn how to get a list of ERC-721 and ERC-1155 NFT mints for a user address
  in a single request.
---

# How to find NFT mints

Developers and NFT enthusiasts alike often seek to find NFTs minted by big influencers or to compile a list of NFTs that they may have bought over time.

**In this tutorial, we’ll be using Alchemy’s** [**Transfers API** ](../transfers-api.md)**to fetch all NFTs minted by a particular account address.**

## **Tutorial Overview**

### **Detecting NFT Mint Events**

1. Select an address for finding NFT mints
2. Pick a block range for your query
3. Specify/filter for only ERC-721 and ERC-1155 NFT minting events
4. Send API request!
5. Parse API response

For more detailed information on the [Alchemy Transfers API](https://docs.alchemy.com/alchemy/enhanced-apis/transfers-api), please refer to its [docs page](../transfers-api.md)!

## **Detect NFT Minting Events**

Before using the [Transfers API](../transfers-api.md) for querying a user’s NFT mints, here's a quick recap on what the API is doing behind the scenes. When an NFT is minted by a user, it is transferred from 0x0000000000000000000000000000000000000000, an address that no one holds the private keys for, to the user's address. This on-chain minting emits a standard transfer event since the asset has traveled from one account to another. The [Transfers API](../transfers-api.md) indexes and allows developers like you to filter for specific types of transfers, allowing us to detect mints!\
\
[Check the Composer App for a no-code version of the query we're making togeth](https://composer.alchemyapi.io/?composer\_state=%7B%22chain%22%3A0%2C%22network%22%3A0%2C%22methodName%22%3A%22alchemy\_getAssetTransfers%22%2C%22paramValues%22%3A%5B%7B%22excludeZeroValue%22%3Atrue%2C%22fromBlock%22%3A%220x0%22%2C%22toBlock%22%3A%22latest%22%2C%22fromAddress%22%3A%220x0000000000000000000000000000000000000000%22%2C%22toAddress%22%3A%220x5c43B1eD97e52d009611D89b74fA829FE4ac56b1%22%2C%22category%22%3A%5B%22external%22%2C%22erc721%22%2C%22erc1155%22%5D%7D%5D%7D)er.

#### **1.** _Select an address for finding NFT mints_

* To find **** all NFTs minted by a particular address, we pass it into the **** `toAddress` parameter.
* As explained in the re-cap above, the `fromAddress` parameter should be 0x0000000000000000000000000000000000000000 to find transfers from the 0x00 address to the target address.

#### **2.**  Pick a block range for your query

* The `fromBlock`API parameter determines the start of the block range that you seek to query address information for.&#x20;
* The `toBlock`API parameter determines the end of the block query range. You can use `"latest"` if you want the query to include NFT data up to the most recent block.&#x20;

{% hint style="info" %}
When querying the full history of an address’s on-chain interactions, we suggest looking back to the very beginning or the 0th block (**0x0**).&#x20;
{% endhint %}

#### **3.**  _Specify/filter for only ERC-721 and ERC-1155 NFT minting events_

* The `category` parameter helps us filter for specific types of transfer events.&#x20;
*   Since we are looking for minting events, we pass in the following strings as a list: \["`external`",  "`erc721`", " `erc1155`"]\
    \
    \- We use `external` since we are looking for the transfer of an NFT from an address to another address, both of which are not smart contracts.

    \- We pass in `erc721` & `erc1155` since we are looking for the transfers of NFTs that adhere to the ERC-721 and ERC-1155 standards.&#x20;

#### **4. **_**Send API request!**_

### Querying via Alchemy Web3.js (Recommended)



### Querying via Node-Fetch



### Querying via Axios
