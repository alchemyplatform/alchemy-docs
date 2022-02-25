---
description: Gets all NFTs for a given NFT contract
---

# getNFTsForCollection

## Parameters

* `contractAddress`: _**\[string]**_ - contract address for the NFT collection
* `withMetadata`: _**\[boolean] -**_ (optional)  _****_  If set to `True`, returns NFT metadata; otherwise will only return tokenIds
* `cursorKey` : _**\[string]**_ - an offset used for pagination
* `contractAddresses[]`:  _**\[arrray of strings]**_ (optional) array of contract addresses to filter the responses with. Max limit 20 contracts.

