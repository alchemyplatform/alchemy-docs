---
description: Guide for how to set a price on your NFT
---

# 💵 How do I set a price on an NFT?

You've just created an NFT and you want to sell it to your fellow NFT enthusiasts. To do this, we have to put a price on the NFT, and there are two primary ways to attach a price:

1. Within the smart contract (this guide)
2. Listing the NFT on an NFT marketplace or platform (more popular approach)

## **Setting an NFT Price In-Contract**

### **Require a Fee Upon Minting**

{% hint style="danger" %}
NOTE: The following section is not a turnkey solution. In [Step 10](https://docs.alchemy.com/alchemy/tutorials/how-to-create-an-nft#step-10-write-our-contract) of the [NFT Creation Tutorial](https://docs.alchemy.com/alchemy/tutorials/how-to-create-an-nft), we would need to alter the Solidity to accept payments for minting which means that any frontend`web3` / `ethers.js`logic dictating minting would need to include the`msg.value`parameter to allow for the transfer of ETH.  
{% endhint %}

This fee pattern is completely decentralized since it takes place in-contract and bakes the fee mechanism into the minting process itself. To implement a price on minting, you need to alter your smart contract to include this behavior. As a high-level summary, a NFT minting price can be enacted by making the `mint` function `payable` and requiring the user to pay a particular amount of ETH before triggering the transfer of the NFT to the buyer.

Here's a sample piece of code for this type of minting process:

```
function mintToken(address to, uint256 tokenId, string uri) public virtual payable {
  
  require(msg.value >= 10, "Not enough ETH sent; check price!"); 
  
  mint(to, tokenId);
  _setTokenURI(tokenId, uri);
}

```

*   `function mintToken(address to, uint256 tokenId, string uri) public virtual payable`

    *  To allow users to pay ETH to mint an NFT, we need to make this function both `public` and `payable`.  `public` functions can be called internally or via messages to allow anyone to interact with the function.  (We don't want this function to be only callable by the contract's owner since this would lock out prospective buyers!)


*   `require(msg.value >= 10, "Not enough ETH sent; check price!"); `

    * This `require` statement requires that the payable function receive at least 10 wei, else the function will fail and revert. The `msg.value` parameter is the ETH value of amount sent in alongside the mint function.


*   `mint(to, tokenId);`

    * This calls the `mint `function included in OpenZepplin's ERC721 contract file and  instantiates/transfers the selected NFT to the buyer.


* `_setTokenURI(tokenId, uri);`
  * This calls the `_setTokenURI`function included in OpenZepplin's ERC721 contract file and sets the NFT URI to a particular endpoint.  

There are many different variants for implementing fees into minting contracts.  The one listed above is one of the most simple but many protocols also use fee patterns that are significantly more complex.

## **Setting an NFT Price via Auction Platforms**

### **List the NFT on OpenSea or Another NFT Auction Platform**

A non-coding alternative would be to simply list your newly minted NFT on OpenSea or another NFT auction website which would allow you to place a price on it. OpenSea's UI layer running on top of the NFT allows you to place prices, accept bids, or have other more complex auction methods and handles all the logic for you.

For Ethereum mainnet, use: [https://opensea.io/](https://opensea.io)

For a testnet, use: [https://testnets.opensea.io/](https://testnets.opensea.io)

{% hint style="warning" %}
**NOTE: **NFT auction platforms typically charge for listing and handling the auction process. Keep to date with different platforms to find competitive rates and maximize your NFT sales. [Zora](https://zora.co) and [SuperRare](https://superrare.com) are two alternative platforms that also offer similar services to OpenSea.
{% endhint %}
