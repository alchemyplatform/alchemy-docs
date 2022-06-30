---
description: A brief overview on common questions surrounding the NFT API
---

# NFT API FAQ

## Understanding NFT Metadata

The primary object within the Alchemy NFT API is the **NFT asset**, which is an on-chain item that lives on the blockchain. Within each NFT, there can be many different fields that describe its on-prescence.&#x20;

### General Metadata Structure

|                    |                                                                                                                                                                                                                                                                    |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `image`            | A URL to the NFT asset image. Can be standard URLs pointing to images on conventional servers, [IPFS](https://github.com/ipfs/is-ipfs), or [Arweave](https://www.arweave.org/).  Most types of images (SVGs, PNGs, JPEGs, etc.) are supported by NFT marketplaces. |
| `external_url`     | The image URL that appears alongside the asset image on NFT platforms. It tends to be the full-size, highest resolution media file.                                                                                                                                |
| `background_color` | Background color of the NFT item. Usually must be defined as a six-character hexadecimal.                                                                                                                                                                          |
| `name`             | Name of the NFT asset.                                                                                                                                                                                                                                             |
| `description`      | A human-readable description of the NFT asset. (Markdown is supported/rendered on OpenSea and other NFT platforms)                                                                                                                                                 |
| `attributes`       | The traits/attributes/characteristics for each NFT asset.                                                                                                                                                                                                          |

{% hint style="info" %}
Not all metadata fields may be filled out by the NFT creator. NFTs can be published on-chain without these fields and still conform to the ERC721/ERC1155 standards.
{% endhint %}

## How Does Alchemy's NFT API Handle Image Caching?

{% content-ref url="nft-image-caching.md" %}
[nft-image-caching.md](nft-image-caching.md)
{% endcontent-ref %}

## Understanding NFT API Error Messages

{% content-ref url="handling-errors.md" %}
[handling-errors.md](handling-errors.md)
{% endcontent-ref %}

## Gateway vs. Raw URIs

Gateways are an important part of NFT infrastructure. Behind the scenes, they allow users to access IPFS content without running an IPFS node. With a gateway provider, a third-party service downloads data off of IPFS nodes and then serves it whenever requested. \
\
NFT creators/developers can also choose to "pin" their content, effectively caching and storing their content on gateway nodes/servers. This ensures that the content is always available online.

While NFT gateway and raw URIs tend to be pointed at the same links, gateway URIs generally offer better performance.

## Understanding differences between `getNFTs` & `getNFTMetadata`

`getNFTs` is most commonly used when querying all NFTs owned by an address. By default, it will return both NFTs and any associated metadata per asset in the response. Common use cases include dashboards/wallets for viewing NFT assets held by a particular address.\
\
`getNFTMetadata` is more specific and is used for querying the metadata of a single NFT. Common use cases include NFT rarity tools and NFT searching applications.

## NFT "Spam" Classification

Given a contract address we look at a few things:

(1) If this contract is ERC721, does this contract egregiously break the ERC721 standard? i.e. Does it have a lot of duplicate tokens.

(2) If this contract is ERC721, does it have any transfer during which it broke the ERC721 standard? i.e. It transferred a token to more than one recipient.

(3) Does this contract mint tokens mostly to honeypots? Honeypots are popular addresses like `vitalik.eth`

(4) Does this contract egregiously lie about its own total supply? i.e. running totalSupply() on the contract is vastly different from the empirical number of tokens in circulation.

If any of these are satisfied, we will mark an NFT as spam.
