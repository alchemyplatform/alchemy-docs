---
description: Gets all NFTs currently owned by a given address
---

# getNFTs

This endpoint is supported on the following chains and networks:

* **Ethereum**: Mainnet, Rinkeby, Kovan, Goerli, Ropsten
* **Polygon**: Mainnet and Mumbai
* **Flow**: Mainnet and Testnet (see docs [here](https://docs.alchemy.com/flow/documentation/flow-nft-apis))

_To see chain support accross all features, check out the_ [_feature matrix_](../../apis/feature-support-by-chain.md)_._

## Parameters

* `owner`: _**\[string]**_ address for NFT owner (can be in _**ENS format**_!)
* `pageKey`: _**\[string]**_ (optional) UUID for pagination. If more results are available, a UUID `pageKey` will be returned in the response. Pass that UUID into `pageKey` to fetch the next 100 NFTs.     _**NOTE:** pageKeys expire after 10 minutes._&#x20;
* `contractAddresses[]`:  _**\[array of strings]**_ (optional) array of contract addresses to filter the responses with. Max limit 20 contracts.
* `withMetadata`:  _**\[boolean]**_ `true` by default (optional); if boolean is set to `true` the query will include metadata for each returned token&#x20;
*   `filters[]`:  _**\[array of strings]**_ (optional) array of filters (as strings) that will be applied to the query. NFTs that are match one or more of these filters will be excluded from the response. &#x20;

    **NOTE:** _This is a beta feature._

    * `"SPAM"`: NFTs that have been classified as spam. Spam classification has a wide range of criteria that includes but is not limited to emitting fake events and copying other well-known NFTs.\
      \
      _**For more info on NFT responses:  check out the**_ [_**NFT API FAQ.**_](nft-api-faq.md#understanding-nft-metadata)_****_

{% hint style="success" %}
**NOTE:**

Setting the`withMetadata`parameter to`false` will reduce payload size and may result in a faster API call.
{% endhint %}

{% hint style="info" %}
#### NOTE on Pagination:&#x20;

We paginate our responses with a default limit of **100 responses**. We've chosen this number via thorough testing to determine the best balance of reliability and speed. In the future, you will be able to specify your own default size. If the owner has more than 100 nfts, we'll provide a `pageKey` you can include in the next request to return the remaining responses. This uses cursor based pagination with an idempotent result. This means if you provide one it serves as a static reference to the NFTs owned at time of the first call. This means if an owner acquires or transfers an NFT in between a paginated call, this will **NOT** be reflected.
{% endhint %}

## Returns (by default)

* `ownedNfts`: list of objects that represent NFTs owned by the address. Max results per response = 100.&#x20;
  * Object schema:
    * `contract`:&#x20;
      * `address`: address of NFT contract
    * `id`:
      * `tokenId`: Id for NFT _**(hex)**_&#x20;
      * `tokenMetadata`
        * `tokenType`: "`ERC721`" or "`ERC1155`"
    * `balance`: token balance
    * `title`: name of the NFT asset
    * `description`: brief human-readable description
    * `tokenUri`:
      * `raw:` uri representing the location of the NFT's original metadata blob. This is a backup for you to parse when the `metadata` field is not automatically populated.
      * `gateway:` public gateway uri for the raw uri above.
    * `media`:
      * `raw:` uri representing the location of the NFT media asset. This is a backup for you to parse when the `metadata` field is not automatically populated.
      * `gateway:` public gateway uri for the raw asset above.&#x20;
    * `metadata`: relevant metadata for NFT contract. This is useful for viewing image url, traits, etc. without having to follow the metadata url in `tokenUri` to parse manually.
      * `image`: URL to the NFT asset image. Can be standard URLs pointing to images on conventional servers, [IPFS](https://github.com/ipfs/is-ipfs), or [Arweave](https://www.arweave.org). Most types of images (SVGs, PNGs, JPEGs, etc.) are supported by NFT marketplaces.
      * `external_url`: The image URL that appears alongside the asset image on NFT platforms.
      * `background_color`: Background color of the NFT item. Usually must be defined as a six-character hexadecimal.
      * `name`Name of the NFT asset.
      * `description`: human-readable description of the NFT asset. (Markdown is supported/rendered on OpenSea and other NFT platforms)
      *   `attributes`: traits/attributes/characteristics for each NFT asset.

          _**For more info on NFT responses: check out the**_ [_**NFT API FAQ.**_](nft-api-faq.md#understanding-nft-metadata)_****_
* `pageKey` : (optional) UUID for pagination - returned if there are more NFTs to fetch. Max NFTs per page = 100.
* `totalCount`: total number of NFTs owned by the given address.&#x20;
* `blockHash`: the canonical head block hash of when your request was received
* `error`: A string describing a particular reason that we were unable to fetch complete metadata for the NFT. \
  **See the** [**Handling Errors**](handling-errors.md) **section for a complete list of potential errors.**

{% hint style="info" %}
**NOTE:**\
****To parse and view an NFT's media asset, use either the `gateway` URI within `media` objector the`external_url`within `metadata`object. [Visit the FAQ](nft-api-faq.md#gateway-vs.-raw-uris) for more info on IPFS gateways.
{% endhint %}

## Returns (`withMetadata` = false)

* `ownedNfts`: list of objects that represent NFTs owned by the address. Max results per response = 100.&#x20;
  * Object schema:
    * `contract`:&#x20;
      * `address`: address of NFT contract
    * `id`:
      * `tokenId`: Id for NFT (integer)&#x20;
    * `balance`: token balance
* `pageKey` : (optional) UUID for pagination - returned if there are more NFTs to fetch. Max NFTs per page = 100.
* `totalCount`: total number of NFTs owned by the given address.&#x20;
* `blockHash`: the canonical head block hash of when your request was received

{% hint style="info" %}
**NOTE:** \
We are working to support edge-case NFTs which don't conform to ERC721 or 1155 standards. As such, the `totalCount` and `ownedNfts`reported may not reflect certain NFTs that we do not current support.  If you notice an NFT that our API does not currently support, please [submit a feature request](https://roadmap.alchemy.com/b/feature-requests) or reach out to us over [Discord](https://www.alchemy.com/discord).
{% endhint %}

## Examples

For an example request with pagination, see [Request (with pagination)](getnfts.md#request-with-pagination).&#x20;

For examples with contract filtering, see [Request (with contract filtering)](getnfts.md#request-with-contract-filtering).

{% hint style="info" %}
The examples below is for Ethereum Mainnet. If you are using Polygon you'll need to use your polygon endpoint instead: \
`https://polygon-mainnet.alchemyapi.io/v2/your-api-key/getNFTs`...
{% endhint %}

### Request

[**Alchemy Composer Example**](https://composer.alchemyapi.io/?composer\_state=%7B%22chain%22%3A0%2C%22network%22%3A0%2C%22methodName%22%3A%22getNFTs%22%2C%22paramValues%22%3A%5B%7B%22Owner%22%3A%220xfAE46f94Ee7B2Acb497CEcAFf6Cff17F621c693D%22%7D%5D%7D)****

{% tabs %}
{% tab title="Alchemy Web3.js" %}
```javascript
// Installation: https://github.com/alchemyplatform/alchemy-web3

import { createAlchemyWeb3 } from "@alch/alchemy-web3";

// Using HTTPS
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/demo",
);

const nfts = await web3.alchemy.getNfts({owner: "0xC33881b8FD07d71098b440fA8A3797886D831061"})

console.log(nfts);
```
{% endtab %}

{% tab title="Fetch (JS)" %}
```javascript
import fetch from 'node-fetch';

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

const baseURL = "https://eth-mainnet.alchemyapi.io/v2/demo/getNFTs/";
const ownerAddr = "0xfAE46f94Ee7B2Acb497CEcAFf6Cff17F621c693D";
const fetchURL = `${baseURL}?owner=${ownerAddr}`;

fetch(fetchURL, requestOptions)
  .then(response => response.json())
  .then(response => JSON.stringify(response, null, 2))
  .then(result => console.log(result))
  .catch(error => console.log('error', error))
```
{% endtab %}

{% tab title="Axios (JS)" %}
```javascript
import axios from 'axios';

// replace with your Alchemy api key
const apiKey = "demo";
const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}/getNFTs/`;
// replace with the wallet address you want to query for NFTs
const ownerAddr = "0xfAE46f94Ee7B2Acb497CEcAFf6Cff17F621c693D";

var config = {
  method: 'get',
  url: `${baseURL}?owner=${ownerAddr}`
};

axios(config)
.then(response => console.log(JSON.stringify(response.data, null, 2)))
.catch(error => console.log(error));
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/demo/getNFTs/?owner=0xfAE46f94Ee7B2Acb497CEcAFf6Cff17F621c693D
RequestType: GET
```
{% endtab %}

{% tab title="Curl" %}
```
curl 'https://eth-mainnet.alchemyapi.io/v2/demo/getNFTs/?owner=0xfAE46f94Ee7B2Acb497CEcAFf6Cff17F621c693D'
```
{% endtab %}
{% endtabs %}

If you're having trouble running requests via Alchemy Web3.js, Fetch, or Axios, please refer to: [**NFT API Quickstart Guide** ](nft-api-quickstart-guide.md)****

### Response (by default)

```json
{
    "ownedNfts": [
        {
            "contract": {
                "address": "0x0beed7099af7514ccedf642cfea435731176fb02"
            },
            "id": {
                "tokenId": "28",
                "tokenMetadata": {
                    "tokenType": "ERC721"
                }
            },
            "title": "DuskBreaker #28",
            "description": "Breakers have the honor of serving humanity through their work on The Dusk. They are part of a select squad of 10,000 recruits who spend their days exploring a mysterious alien spaceship filled with friends, foes, and otherworldly technology.",
            "tokenUri": {
                "raw": "https://duskbreakers.gg/api/breakers/28",
                "gateway": "https://duskbreakers.gg/api/breakers/28"
            },
            "media": [
                {
                    "raw": "https://duskbreakers.gg/breaker_images/28.png",
                    "gateway": "https://duskbreakers.gg/breaker_images/28.png"
                }
            ],
            "metadata": {
                "name": "DuskBreaker #28",
                "description": "Breakers have the honor of serving humanity through their work on The Dusk. They are part of a select squad of 10,000 recruits who spend their days exploring a mysterious alien spaceship filled with friends, foes, and otherworldly technology.",
                "image": "https://duskbreakers.gg/breaker_images/28.png",
                "external_url": "https://duskbreakers.gg",
                "attributes": [
                    {
                        "value": "Locust Rider Armor (Red)",
                        "trait_type": "Clothes"
                    },
                    ......
                    {
                        "value": "Big Smile (Purple)",
                        "trait_type": "Mouth"
                    },
                    {
                        "value": "Yellow",
                        "trait_type": "Background"
                    }
                ]
            },
            "timeLastUpdated": "2022-02-16T22:52:54.719Z"
        },
        ......
        {
            "contract": {
                "address": "0x97597002980134bea46250aa0510c9b90d87a587"
            },
            "id": {
                "tokenId": "5527",
                "tokenMetadata": {
                    "tokenType": "ERC721"
                }
            },
            "title": "Runner #5527",
            "description": "Chain Runners are Mega City renegades 100% generated on chain.",
            "tokenUri": {
                "raw": "https://api.chainrunners.xyz/tokens/metadata/5527?dna=73247164192459371523281785218958151913554625578441142916970699984935810987041",
                "gateway": "https://api.chainrunners.xyz/tokens/metadata/5527?dna=73247164192459371523281785218958151913554625578441142916970699984935810987041"
            },
            "media": [
                {
                    "raw": "https://img.chainrunners.xyz/api/v1/tokens/png/5527",
                    "gateway": "https://img.chainrunners.xyz/api/v1/tokens/png/5527"
                }
            ],
            "metadata": {
                "name": "Runner #5527",
                "description": "Chain Runners are Mega City renegades 100% generated on chain.",
                "image": "https://img.chainrunners.xyz/api/v1/tokens/png/5527",
                "attributes": [
                    {
                        "value": "Purple Green Diag",
                        "trait_type": "Background"
                    },
                    {
                        "value": "Human",
                        "trait_type": "Race"
                    },
                    ....
                    {
                        "value": "Cig",
                        "trait_type": "Mouth Accessory"
                    }
                ]
            },
            "timeLastUpdated": "2022-02-18T00:42:04.401Z"
        }
    ],
    "totalCount": 6,
    "blockHash": "0xeb2d26af5b6175344a14091777535a2cb21c681665a734a8285f889981987630"
}

```

### Response (`withMetadata` = false)

```json
{
    "ownedNfts": [
        {
            "contract": {
                "address": "0x0beed7099af7514ccedf642cfea435731176fb02"
            },
            "id": {
                "tokenId": "0x000000000000000000000000000000000000000000000000000000000000001c"
            },
        },
        {
            "contract": {
                "address": "0x0beed7099af7514ccedf642cfea435731176fb02"
            },
            "id": {
                "tokenId": "0x000000000000000000000000000000000000000000000000000000000000001d"
            },
            "balance": "1"
        },
        ......
        {
            "contract": {
                "address": "0x97597002980134bea46250aa0510c9b90d87a587"
            },
            "id": {
                "tokenId": "0x0000000000000000000000000000000000000000000000000000000000001597"
            },
            "balance": "1"
        }
    ],
    "totalCount": 6,
    "blockHash": "0xf9a2a4e15116680e22b160c734529f62d89d54cde0759daf5135672fad0ecebc"
}
```

### Request (with contract filtering)

Only one contract in filter array:

{% tabs %}
{% tab title="Alchemy Web3.js" %}
```javascript
// Installation: https://github.com/alchemyplatform/alchemy-web3

import { createAlchemyWeb3 } from "@alch/alchemy-web3";

// Using HTTPS
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/demo",
);

const nfts = await web3.alchemy.getNfts({owner: "0xC33881b8FD07d71098b440fA8A3797886D831061", contractAddresses: ["0x39ed051a1a3a1703b5e0557b122ec18365dbc184"]})

console.log(nfts);

```
{% endtab %}

{% tab title="Fetch (JS)" %}
```javascript
import fetch from 'node-fetch';

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

const baseURL = "https://eth-mainnet.alchemyapi.io/v2/demo/getNFTs/";
const ownerAddr = "0xcF3A24407aae7c87bd800c47928C5F20Cd4764D2";
const contractAddr = "0x34d77a17038491a2a9eaa6e690b7c7cd39fc8392";
const fetchURL = `${baseURL}?owner=${ownerAddr}&contractAddresses[]=${contractAddr}`;

fetch(fetchURL, requestOptions)
  .then(response => response.json())
  .then(response => JSON.stringify(response, null, 2))
  .then(result => console.log(result))
  .catch(error => console.log('error', error))

```
{% endtab %}

{% tab title="Axios (JS)" %}
```javascript
import axios from 'axios';

// replace with your Alchemy api key
const apiKey = "demo";
const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}/getNFTs/`;
// replace with the wallet address you want to query for NFTs
const ownerAddr = "0xcF3A24407aae7c87bd800c47928C5F20Cd4764D2";
const contractAddr = "0x34d77a17038491a2a9eaa6e690b7c7cd39fc8392";

var config = {
  method: 'get',
  url: `${baseURL}?owner=${ownerAddr}&contractAddresses[]=${contractAddr}`
};

axios(config)
.then(response => console.log(JSON.stringify(response.data, null, 2)))
.catch(error => console.log(error));

```
{% endtab %}

{% tab title="Postman" %}
```python
URL: https://eth-mainnet.alchemyapi.io/v2/demo/getNFTs/?owner=0xfAE46f94Ee7B2Acb497CEcAFf6Cff17F621c693D&contractAddresses[]=0x39ed051a1a3a1703b5e0557b122ec18365dbc184
RequestType: GET
```
{% endtab %}

{% tab title="Curl" %}
```
curl --location -g --request GET 'https://eth-mainnet.alchemyapi.io/v2/demo/getNFTs/?owner=0xfAE46f94Ee7B2Acb497CEcAFf6Cff17F621c693D&contractAddresses[]=0x39ed051a1a3a1703b5e0557b122ec18365dbc184'
```
{% endtab %}
{% endtabs %}

Multiple contracts in filter array:

{% tabs %}
{% tab title="Alchemy Web3.js" %}
```javascript
// Installation: https://github.com/alchemyplatform/alchemy-web3

import { createAlchemyWeb3 } from "@alch/alchemy-web3";

// Using HTTPS
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.g.alchemy.com/v2/demo",
);

const nfts = await web3.alchemy.getNfts({owner: "0xC33881b8FD07d71098b440fA8A3797886D831061", contractAddresses: ["0x39ed051a1a3a1703b5e0557b122ec18365dbc184", "0x76be3b62873462d2142405439777e971754e8e77"]})

console.log(nfts);

```
{% endtab %}

{% tab title="Fetch (JS)" %}
```javascript
import fetch from 'node-fetch';

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

const baseURL = "https://eth-mainnet.alchemyapi.io/v2/demo/getNFTs/";
const ownerAddr = "0xcF3A24407aae7c87bd800c47928C5F20Cd4764D2";
const contractAddrs = ["0x34d77a17038491a2a9eaa6e690b7c7cd39fc8392", "0x76be3b62873462d2142405439777e971754e8e77"];
const fetchURL = `${baseURL}?owner=${ownerAddr}&contractAddresses[]=${contractAddr[0]}&contractAddresses[]=${contractAddr[1]}`;

fetch(fetchURL, requestOptions)
  .then(response => response.json())
  .then(response => JSON.stringify(response, null, 2))
  .then(result => console.log(result))
  .catch(error => console.log('error', error))

```
{% endtab %}

{% tab title="Axios (JS)" %}
```javascript
import axios from 'axios';

// replace with your Alchemy api key
const apiKey = "demo";
const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}/getNFTs/`;
// replace with the wallet address you want to query for NFTs
const ownerAddr = "0xcF3A24407aae7c87bd800c47928C5F20Cd4764D2";
const contractAddrs = ["0x34d77a17038491a2a9eaa6e690b7c7cd39fc8392", "0x76be3b62873462d2142405439777e971754e8e77"];

var config = {
  method: 'get',
  url: `${baseURL}?owner=${ownerAddr}&contractAddresses[]=${contractAddrs[0]}&contractAddresses[]=${contractAddrs[1]}`
};

axios(config)
.then(response => console.log(JSON.stringify(response.data, null, 2)))
.catch(error => console.log(error));

```
{% endtab %}

{% tab title="Postman" %}
```python
URL: https://eth-mainnet.alchemyapi.io/v2/demo/getNFTs/?owner=0xcF3A24407aae7c87bd800c47928C5F20Cd4764D2&contractAddresses[]=0x34d77a17038491a2a9eaa6e690b7c7cd39fc8392&contractAddresses[]=0x76be3b62873462d2142405439777e971754e8e77
REQUEST: GET
```
{% endtab %}

{% tab title="Curl" %}
```
curl --location -g --request GET 'https://eth-mainnet.alchemyapi.io/v2/demo/getNFTs/?owner=0xcF3A24407aae7c87bd800c47928C5F20Cd4764D2&contractAddresses[]=0x34d77a17038491a2a9eaa6e690b7c7cd39fc8392&contractAddresses[]=0x76be3b62873462d2142405439777e971754e8e77'
```
{% endtab %}
{% endtabs %}

If you're having trouble running requests via Alchemy Web3.js, Fetch, or Axios, please refer to: [**NFT API Quickstart Guide** ](nft-api-quickstart-guide.md)****

### Response (with contract filtering)

```javascript
{
  "ownedNfts": [
    {
      "contract": {
        "address": "0x34d77a17038491a2a9eaa6e690b7c7cd39fc8392"
      },
      "id": {
        "tokenId": "0x0000000000000000000000000000000000000000000000000000000000000277"
      },
    }
  ],
  "totalCount": 1,
  "blockHash": "0x3d8bca59c08e41f55d46ebbe738327eb12955cf280bd06ef7d40352919c188d8"
}
```

### Request (with pagination)&#x20;

{% hint style="warning" %}
This example request will not return anything in the response since the `pageKey` expires after 10 minutes.
{% endhint %}

{% tabs %}
{% tab title="Alchemy Web3.js" %}
```javascript
// Installation: https://github.com/alchemyplatform/alchemy-web3

import { createAlchemyWeb3 } from "@alch/alchemy-web3";

// Using HTTPS
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/demo",
);

const nfts = await web3.alchemy.getNfts({owner: "0xC33881b8FD07d71098b440fA8A3797886D831061", pageKey:"12e032c5-ce4a-4389-8764-b980e1a17da8"})

console.log(nfts);
```
{% endtab %}

{% tab title="Fetch (JS)" %}
```javascript
import fetch from 'node-fetch';

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

const baseURL = "https://eth-mainnet.alchemyapi.io/v2/demo/getNFTs/";
const ownerAddr = "0xfAE46f94Ee7B2Acb497CEcAFf6Cff17F621c693D";
const pageKey = "12e032c5-ce4a-4389-8764-b980e1a17da8";
const fetchURL = `${baseURL}?owner=${ownerAddr}?pageKey=${pageKey}`;

fetch(fetchURL, requestOptions)
  .then(response => response.json())
  .then(response => JSON.stringify(response, null, 2))
  .then(result => console.log(result))
  .catch(error => console.log('error', error))

```
{% endtab %}

{% tab title="Axios (JS)" %}
```javascript
import axios from 'axios';

// replace with your Alchemy api key
const apiKey = "demo";
const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}/getNFTs/`;
// replace with the wallet address you want to query for NFTs
const pageKey = "12e032c5-ce4a-4389-8764-b980e1a17da8";
const ownerAddr = "0xfAE46f94Ee7B2Acb497CEcAFf6Cff17F621c693D";

var config = {
  method: 'get',
  url: `${baseURL}?owner=${ownerAddr}?pageKey=${pageKey}`
};

axios(config)
.then(response => console.log(JSON.stringify(response.data, null, 2)))
.catch(error => console.log(error));

```
{% endtab %}

{% tab title="Postman" %}
```python
URL: https://eth-mainnet.alchemyapi.io/v2/demo/getNFTs/?owner=0x8e7644918b3e280fb3b599ca381a4efcb7ade201&pageKey=12e032c5-ce4a-4389-8764-b980e1a17da8
```
{% endtab %}

{% tab title="Curl" %}
```
curl 'https://eth-mainnet.alchemyapi.io/v2/demo/getNFTs/?owner=0x8e7644918b3e280fb3b599ca381a4efcb7ade201&pageKey=12e032c5-ce4a-4389-8764-b980e1a17da8'
```
{% endtab %}
{% endtabs %}

If you're having trouble running requests via Alchemy Web3.js, Fetch, or Axios, please refer to: [**NFT API Quickstart Guide** ](nft-api-quickstart-guide.md)****

### Response (with pagination)&#x20;

```json
{
    "ownedNfts": [{
        "contract": {
            "address": "0x97597002980134bea46250aa0510c9b90d87a587"
        },
        "id": {
            "tokenId": "0x00000000000000000000000000000000000000000000000000000000000009cb"
        }
    }, {
        "contract": {
            "address": "0x97597002980134bea46250aa0510c9b90d87a587"
        },
        "id": {
            "tokenId": "0x00000000000000000000000000000000000000000000000000000000000009cc"
        }
    }, {
        "contract": {
            "address": "0x5ab21ec0bfa0b29545230395e3adaca7d552c948"
        },
        "id": {
            "tokenId": "0x00000000000000000000000000000000000000000000000000000000000006dc"
        }
    }, {
        "contract": {
            "address": "0x3b3ee1931dc30c1957379fac9aba94d1c48a5405"
        },
        "id": {
            "tokenId": "0x000000000000000000000000000000000000000000000000000000000000001a"
        }
    }, {
        "contract": {
            "address": "0x69c40e500b84660cb2ab09cb9614fa2387f95f64"
        },
        "id": {
            "tokenId": "0x0000000000000000000000000000000000000000000000000000000000000391"
        }
    }, {
        "contract": {
            "address": "0x97597002980134bea46250aa0510c9b90d87a587"
        },
        "id": {
            "tokenId": "0x00000000000000000000000000000000000000000000000000000000000008d5"
        }
    }, {
        "contract": {
            "address": "0x97597002980134bea46250aa0510c9b90d87a587"
        },
        "id": {
            "tokenId": "0x0000000000000000000000000000000000000000000000000000000000000a1d"
        }
    }, {
        "contract": {
            "address": "0x97597002980134bea46250aa0510c9b90d87a587"
        },
        "id": {
            "tokenId": "0x000000000000000000000000000000000000000000000000000000000000002a"
        }
    }, {
        "contract": {
            "address": "0x97597002980134bea46250aa0510c9b90d87a587"
        },
        "id": {
            "tokenId": "0x000000000000000000000000000000000000000000000000000000000000038e"
        }
    }, {
        "contract": {
            "address": "0x97597002980134bea46250aa0510c9b90d87a587"
        },
        "id": {
            "tokenId": "0x000000000000000000000000000000000000000000000000000000000000244b"
        }
    }],
    "pageKey": "88434286-7eaa-472d-8739-32a0497c2a18",
    "totalCount": 277,
    "blockHash": "0x94d5ab52b8a6571733f6b183ef89f31573b82a4e78f8129b0ce90ef0beaf208b"
}
```



### Request (with filters)&#x20;

{% tabs %}
{% tab title="Alchemy Web3.js" %}
```javascript
// Installation: https://github.com/alchemyplatform/alchemy-web3

import { createAlchemyWeb3 } from "@alch/alchemy-web3";

// Using HTTPS
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/demo",
);

const nfts = await web3.alchemy.getNfts({owner: "0xC33881b8FD07d71098b440fA8A3797886D831061", "filters[]":"SPAM"})

console.log(nfts);
```
{% endtab %}

{% tab title="FetchJS" %}
```javascript
import fetch from 'node-fetch';

var requestOptions = {
  method: 'GET',java
  redirect: 'follow'
};

const baseURL = "https://eth-mainnet.alchemyapi.io/v2/demo/getNFTs/";
const ownerAddr = "0xfAE46f94Ee7B2Acb497CEcAFf6Cff17F621c693D";
const fetchURL = `${baseURL}?owner=${ownerAddr}?filters[]=SPAM`;

fetch(fetchURL, requestOptions)
  .then(response => response.json())
  .then(response => JSON.stringify(response, null, 2))
  .then(result => console.log(result))
  .catch(error => console.log('error', error))

```
{% endtab %}

{% tab title="Axios" %}
```javascript
import axios from 'axios';

// replace with your Alchemy api key
const apiKey = "demo";
const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}/getNFTs/`;
// replace with the wallet address you want to query for NFTs
const ownerAddr = "0xfAE46f94Ee7B2Acb497CEcAFf6Cff17F621c693D";

var config = {
  method: 'get',
  url: `${baseURL}?owner=${ownerAddr}?filters[]=SPAM`
};

axios(config)
.then(response => console.log(JSON.stringify(response.data, null, 2)))
.catch(error => console.log(error));

```
{% endtab %}

{% tab title="Postman" %}
```
URL: https://eth-mainnet.alchemyapi.io/v2/demo/getNFTs/?owner=0x8e7644918b3e280fb3b599ca381a4efcb7ade201&filters[]=SPAM
```


{% endtab %}

{% tab title="Curl" %}
```shell
curl 'https://eth-mainnet.alchemyapi.io/v2/demo/getNFTs/?owner=0x8e7644918b3e280fb3b599ca381a4efcb7ade201&filters[]=SPAM'
```


{% endtab %}
{% endtabs %}
