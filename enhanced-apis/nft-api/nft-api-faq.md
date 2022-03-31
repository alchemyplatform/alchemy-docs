---
description: A brief overview on common questions surrounding the NFT API
---

# NFT API FAQ

## Understanding NFT Metadata

The primary object within the Alchemy NFT API is the **NFT asset**, which is an on-chain item that lives on the blockchain. Within each NFT, there can be many different fields that describe its on-prescence.&#x20;

### General Metadata Structure

|                    |                                                                                                                                                                                                                                                                   |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `image`            | A URL to the NFT asset image. Can be standard URLs pointing to images on conventional servers, [IPFS](https://github.com/ipfs/is-ipfs), or [Arweave](https://www.arweave.org).  Most types of images (SVGs, PNGs, JPEGs, etc.) are supported by NFT marketplaces. |
| `external_url`     | The image URL that appears alongside the asset image on NFT platforms. It tends to be the full-size, highest resolution media file.                                                                                                                               |
| `background_color` | Background color of the NFT item. Usually must be defined as a six-character hexadecimal.                                                                                                                                                                         |
| `name`             | Name of the NFT asset.                                                                                                                                                                                                                                            |
| `description`      | A human-readable description of the NFT asset. (Markdown is supported/rendered on OpenSea and other NFT platforms)                                                                                                                                                |
| `attributes`       | The traits/attributes/characteristics for each NFT asset.                                                                                                                                                                                                         |

{% hint style="info" %}
Not all metadata fields may be filled out by the NFT creator. NFTs can be published on-chain without these fields and still conform to the ERC721/ERC1155 standards.
{% endhint %}

## Gateway vs. Raw URIs

Gateways are an important part of NFT infrastructure. Behind the scenes, they allow users to access IPFS content without running an IPFS node. With a gateway provider, a third-party service downloads data off of IPFS nodes and then serves it whenever requested. \
\
NFT creators/developers can also choose to "pin" their content, effectively caching and storing their content on gateway nodes/servers. This ensures that the content is always available online.

While NFT gateway and raw URIs tend to be pointed at the same links, gateway URIs generally offer better performance.

